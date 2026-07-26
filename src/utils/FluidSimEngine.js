/**
 * FluidSimEngine – WebGL fluid-simulation mask reveal.
 *
 * Port of gA class from main.js (byte offset 675780).
 * Uses Three.js for GPU-accelerated fluid simulation that
 * creates a "paint-with-cursor" reveal between two layers.
 *
 * Original functions: dA (create), pA (destroy), mA (setLayers),
 * gA (class), Bo (texture helper), yA (SVG bake), MA (SVG rasterise),
 * _A (extract bg color), NC (video autoplay), yv (create hidden video),
 * vA (attempt play), Jc (dispose video), Hd (1px texture), EA (parse color).
 */

import * as THREE from 'three';

import {
  quadVertexShader,
  meshVertexShader,
  advectionShader,
  splatShader,
  curlShader,
  vorticityShader,
  divergenceShader,
  pressureShader,
  gradientSubShader,
  maskCompositeShader,
} from './fluidShaders.js';

// ─────────────────── Default settings (fA in main.js) ───────────────────

export const DEFAULT_FLUID_SETTINGS = {
  simResolution: 256,
  dyeResolution: 512,
  velocityDissipation: 0.962,
  dyeDissipation: 0.988,
  pressureIterations: 20,
  curlStrength: 0,
  splatRadius: 6e-5,
  splatForce: 5900,
  revealSize: 3.9,
  edgeSoftness: 0.5,
  edgeWidth: 0.01,
};

// ─────────────────── Texture helpers ────────────────────────────────────

/** Create a 1×1 solid-colour DataTexture. */
function make1pxTexture(r, g, b, a) {
  const data = new Uint8Array([r, g, b, a]);
  const tex = new THREE.DataTexture(data, 1, 1, THREE.RGBAFormat, THREE.UnsignedByteType);
  tex.needsUpdate = true;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Parse a CSS color string into [r,g,b,a] (0-255). */
function parseCssColor(str) {
  const div = document.createElement('div');
  div.style.color = '';
  div.style.color = str;
  document.body.appendChild(div);
  const computed = getComputedStyle(div).color;
  document.body.removeChild(div);
  const match = computed.match(/rgba?\(([^)]+)\)/);
  if (!match) return [0, 0, 0, 255];
  const parts = match[1].split(',').map((c) => parseFloat(c.trim()));
  const rr = Math.round(parts[0] || 0);
  const gg = Math.round(parts[1] || 0);
  const bb = Math.round(parts[2] || 0);
  const aa = parts.length === 4 ? Math.round((parts[3] || 0) * 255) : 255;
  return [rr, gg, bb, aa];
}

function isImageUrl(url) {
  return (
    /^(https?:|data:image|\/|\.{0,2}\/)/.test(url) ||
    /\.(png|jpe?g|gif|webp|svg|avif)(\?|#|$)/i.test(url)
  );
}

function isVideoUrl(url) {
  return /\.(mp4|webm|mov|m4v|ogv)(\?|#|$)/i.test(url) || /^data:video\//i.test(url);
}

/** Create an off-screen video element (hidden in body). */
function createHiddenVideo(src) {
  const video = document.createElement('video');
  video.src = src;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('muted', '');
  video.autoplay = true;
  video.preload = 'auto';
  video.crossOrigin = 'anonymous';
  Object.assign(video.style, {
    position: 'absolute',
    left: '-9999px',
    top: '-9999px',
    width: '1px',
    height: '1px',
    opacity: '0',
    pointerEvents: 'none',
  });
  document.body.appendChild(video);
  return video;
}

/** Try to play a video, tolerating browser autoplay restrictions. */
function attemptPlay(video) {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('muted', '');
  const play = () => {
    const p = video.play();
    p && p.catch && p.catch(() => {});
  };
  play();
  video.addEventListener('loadeddata', play, { once: true });
  video.addEventListener('canplay', play, { once: true });
  const userGesture = () => {
    play();
    window.removeEventListener('pointerdown', userGesture);
    window.removeEventListener('touchstart', userGesture);
    window.removeEventListener('keydown', userGesture);
  };
  window.addEventListener('pointerdown', userGesture, { once: true, passive: true });
  window.addEventListener('touchstart', userGesture, { once: true, passive: true });
  window.addEventListener('keydown', userGesture, { once: true });
}

/** Make a VideoTexture from an HTMLVideoElement. */
function makeVideoTexture(video) {
  attemptPlay(video);
  const tex = new THREE.VideoTexture(video);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = false;
  const getAspect = () =>
    video.videoWidth && video.videoHeight ? video.videoWidth / video.videoHeight : 16 / 9;
  return {
    texture: tex,
    aspect: getAspect(),
    onLoaded: (cb) => {
      if (video.videoWidth && video.videoHeight) {
        cb(getAspect());
        return;
      }
      const handler = () => {
        if (video.videoWidth && video.videoHeight) cb(getAspect());
      };
      video.addEventListener('loadedmetadata', handler, { once: true });
      video.addEventListener('loadeddata', handler, { once: true });
    },
  };
}

/** Dispose a hidden video element. */
function disposeVideo(video) {
  if (!video) return;
  try {
    video.pause();
  } catch { /* ignore */ }
  try {
    video.removeAttribute('src');
    video.load();
  } catch { /* ignore */ }
  if (video.parentNode) video.parentNode.removeChild(video);
}

/**
 * Resolve an arbitrary source (string URL, color, SVGElement, HTMLVideoElement,
 * HTMLImageElement, HTMLCanvasElement) into { texture, aspect, onLoaded, ownedVideo }.
 */
function resolveSource(source) {
  if (!source) return { texture: make1pxTexture(0, 0, 0, 0), aspect: 1, onLoaded: null };

  // Plain object with .video or .image or .color
  if (typeof source === 'object' && !Array.isArray(source) && !(source instanceof Element)) {
    if (typeof source.video === 'string') {
      const v = createHiddenVideo(source.video);
      const res = makeVideoTexture(v);
      res.ownedVideo = v;
      return res;
    }
    if (typeof source.image === 'string') return resolveSource(source.image);
    if (typeof source.color === 'string') return resolveSource(source.color);
  }

  // String
  if (typeof source === 'string') {
    if (isVideoUrl(source)) {
      const v = createHiddenVideo(source);
      const res = makeVideoTexture(v);
      res.ownedVideo = v;
      return res;
    }
    if (isImageUrl(source)) {
      const loader = new THREE.TextureLoader();
      let aspect = 1;
      let onLoadedCb = null;
      const tex = loader.load(source, (loaded) => {
        const img = loaded.image;
        if (img && img.naturalWidth) {
          aspect = img.naturalWidth / img.naturalHeight;
          if (onLoadedCb) onLoadedCb(aspect);
        }
      });
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
      return { texture: tex, aspect, onLoaded: (cb) => { onLoadedCb = cb; } };
    }
    // Treat as CSS color
    const rgba = parseCssColor(source);
    return { texture: make1pxTexture(rgba[0], rgba[1], rgba[2], rgba[3]), aspect: 1, onLoaded: null };
  }

  // HTMLVideoElement
  if (source instanceof HTMLVideoElement) return makeVideoTexture(source);

  // HTMLCanvasElement or HTMLImageElement
  if (source instanceof HTMLCanvasElement || source instanceof HTMLImageElement) {
    const tex = new THREE.Texture(source);
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.colorSpace = THREE.SRGBColorSpace;
    const aspect =
      (source.naturalWidth || source.width || 1) / (source.naturalHeight || source.height || 1);
    return { texture: tex, aspect, onLoaded: null };
  }

  return { texture: make1pxTexture(0, 0, 0, 0), aspect: 1, onLoaded: null };
}

/** Rasterise an SVG element to a Canvas for use as a texture. */
function rasteriseSvg(svgEl, width, height) {
  return new Promise((resolve, reject) => {
    const clone = svgEl.cloneNode(true);
    if (!clone.getAttribute('xmlns')) clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', String(Math.max(1, Math.round(width))));
    clone.setAttribute('height', String(Math.max(1, Math.round(height))));
    clone.style.visibility = 'visible';
    clone.style.opacity = '1';
    clone.style.display = '';
    clone.removeAttribute('hidden');
    const color = getComputedStyle(svgEl).color;
    if (color) clone.setAttribute('color', color);
    const xml = new XMLSerializer().serializeToString(clone);
    const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = dataUrl;
  });
}

/** Bake an SVG element into a canvas, positioned relative to a container. */
async function bakeSvgToCanvas(svgEl, container, bgColor = null) {
  const containerRect = container.getBoundingClientRect();
  const svgRect = svgEl.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(1, Math.round(containerRect.width * dpr));
  const h = Math.max(1, Math.round(containerRect.height * dpr));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  if (bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, w, h);
  }
  const rasterised = await rasteriseSvg(svgEl, svgRect.width * dpr, svgRect.height * dpr);
  const offsetX = (svgRect.left - containerRect.left) * dpr;
  const offsetY = (svgRect.top - containerRect.top) * dpr;
  ctx.drawImage(rasterised, offsetX, offsetY, svgRect.width * dpr, svgRect.height * dpr);
  return canvas;
}

/** Extract the background-color of an element, returning null if transparent. */
function extractBgColor(el) {
  if (!el) return null;
  const bg = getComputedStyle(el).backgroundColor;
  if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') return null;
  return bg;
}

// ───────────────────── FluidSimEngine class (gA) ────────────────────────

export default class FluidSimEngine {
  constructor(container, baseSrc, revealSrc, settings) {
    this.container = container;
    this.settings = settings;
    this.disposed = false;
    this.mouse = { x: 0.5, y: 0.5 };
    this.prevMouse = { x: 0.5, y: 0.5 };
    this.mouseHasMoved = false;
    this.size = { width: 1, height: 1 };
    this.baseAspect = 1;
    this.revealAspect = 16 / 9;
    this._ownedVideos = { base: null, reveal: null };
    this._bakedSources = { base: baseSrc, reveal: revealSrc };
    this._svgLayerSources = { base: null, reveal: null };
    this._svgLayerBg = { base: null, reveal: null };

    this._buildCanvas();
    this._buildRenderer();
    this._buildScenes();
    this._buildTextures(baseSrc, revealSrc);
    this._initFluid();
    this._buildMaskMaterial();
    this._buildMeshes();
    this._bindEvents();
    this._resize();
    this._animate = this._animate.bind(this);
    this._rafId = requestAnimationFrame(this._animate);
  }

  // ── Canvas ──

  _buildCanvas() {
    const canvas = document.createElement('canvas');
    canvas.className = 'mask-reveal-canvas';
    Object.assign(canvas.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      display: 'block',
      pointerEvents: 'none',
      zIndex: '1',
    });
    if (getComputedStyle(this.container).position === 'static') {
      this.container.style.position = 'relative';
    }
    const heroSection = this.container.querySelector('.section.hero-home');
    if (heroSection) {
      this.container.insertBefore(canvas, heroSection);
    } else {
      this.container.appendChild(canvas);
    }
    this.canvas = canvas;
  }

  // ── Renderer ──

  _buildRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0, 0);
    this.renderer.autoClear = false;
  }

  // ── Scenes & Cameras ──

  _buildScenes() {
    this.quadScene = new THREE.Scene();
    this.quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    this.camera.position.set(0, 0, 5);
  }

  // ── Render targets ──

  _createRT(w, h, filter) {
    return new THREE.WebGLRenderTarget(w, h, {
      minFilter: filter,
      magFilter: filter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false,
    });
  }

  _createDoubleFBO(w, h, filter) {
    return {
      read: this._createRT(w, h, filter),
      write: this._createRT(w, h, filter),
      swap() {
        const tmp = this.read;
        this.read = this.write;
        this.write = tmp;
      },
    };
  }

  // ── Fluid simulation ──

  _initFluid() {
    const s = this.settings;
    const simW = s.simResolution;
    const simH = s.simResolution;
    const dyeW = s.dyeResolution;
    const dyeH = s.dyeResolution;
    const linear = THREE.LinearFilter;
    const nearest = THREE.NearestFilter;

    this.velocity = this._createDoubleFBO(simW, simH, linear);
    this.pressure = this._createDoubleFBO(simW, simH, nearest);
    this.dye = this._createDoubleFBO(dyeW, dyeH, linear);
    this.curlRT = this._createRT(simW, simH, nearest);
    this.divergenceRT = this._createRT(simW, simH, nearest);

    this.simTexelSize = new THREE.Vector2(1 / simW, 1 / simH);
    this.dyeTexelSize = new THREE.Vector2(1 / dyeW, 1 / dyeH);

    this.quadGeo = new THREE.PlaneGeometry(2, 2);

    this.curlMat = this._makePassMat(curlShader, {
      uVelocity: { value: null },
      uTexelSize: { value: this.simTexelSize },
    });
    this.vorticityMat = this._makePassMat(vorticityShader, {
      uVelocity: { value: null },
      uCurl: { value: null },
      uTexelSize: { value: this.simTexelSize },
      uCurlStrength: { value: s.curlStrength },
      uDt: { value: 0.016 },
    });
    this.advectionMat = this._makePassMat(advectionShader, {
      uVelocity: { value: null },
      uSource: { value: null },
      uTexelSize: { value: this.simTexelSize },
      uDt: { value: 1 },
      uDissipation: { value: s.velocityDissipation },
    });
    this.splatMat = this._makePassMat(splatShader, {
      uTarget: { value: null },
      uAspectRatio: { value: 1 },
      uPoint: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Vector3() },
      uRadius: { value: s.splatRadius },
    });
    this.divergenceMat = this._makePassMat(divergenceShader, {
      uVelocity: { value: null },
      uTexelSize: { value: this.simTexelSize },
    });
    this.pressureMat = this._makePassMat(pressureShader, {
      uPressure: { value: null },
      uDivergence: { value: null },
      uTexelSize: { value: this.simTexelSize },
    });
    this.gradientSubMat = this._makePassMat(gradientSubShader, {
      uPressure: { value: null },
      uVelocity: { value: null },
      uTexelSize: { value: this.simTexelSize },
    });

    this.quadMesh = new THREE.Mesh(this.quadGeo, this.curlMat);
    this.quadScene.add(this.quadMesh);
  }

  _makePassMat(fragmentShader, uniforms) {
    return new THREE.ShaderMaterial({
      vertexShader: quadVertexShader,
      fragmentShader,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
  }

  _renderPass(material, target) {
    this.quadMesh.material = material;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.quadScene, this.quadCamera);
  }

  // ── Textures ──

  _buildTextures(baseSrc, revealSrc) {
    const baseResult = resolveSource(baseSrc);
    this.baseTexture = baseResult.texture;
    this.baseAspect = baseResult.aspect;
    if (baseResult.ownedVideo) this._ownedVideos.base = baseResult.ownedVideo;
    if (baseResult.onLoaded) baseResult.onLoaded((a) => { this.baseAspect = a; });

    const revealResult = resolveSource(revealSrc);
    this.revealTexture = revealResult.texture;
    this.revealAspect = revealResult.aspect;
    if (revealResult.ownedVideo) this._ownedVideos.reveal = revealResult.ownedVideo;
    if (revealResult.onLoaded) revealResult.onLoaded((a) => { this.revealAspect = a; });
  }

  // ── Mask material ──

  _buildMaskMaterial() {
    const s = this.settings;
    this.maskMaterial = new THREE.ShaderMaterial({
      vertexShader: meshVertexShader,
      fragmentShader: maskCompositeShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uBaseTexture: { value: this.baseTexture },
        uRevealTexture: { value: this.revealTexture },
        uDye: { value: null },
        uRevealSize: { value: s.revealSize },
        uEdgeSoftness: { value: s.edgeSoftness },
        uEdgeWidth: { value: s.edgeWidth },
        uBaseImageAspect: { value: this.baseAspect },
        uRevealImageAspect: { value: this.revealAspect },
        uPlaneAspect: { value: 1 },
      },
    });
  }

  // ── Meshes ──

  _buildMeshes() {
    this.planeGeo = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.planeMesh = new THREE.Mesh(this.planeGeo, this.maskMaterial);
    this.scene.add(this.planeMesh);
  }

  // ── Set layers (async) ──

  async setLayers({ base, reveal, hideOriginal = true, baseBg = null, revealBg = null } = {}) {
    if (this.disposed) return;
    const hiddenSvgs = [];

    const maybeRasterise = async (src, bg = null) => {
      if (src instanceof SVGElement) {
        hiddenSvgs.push(src);
        return await bakeSvgToCanvas(src, this.container, bg);
      }
      return src;
    };

    if (base !== undefined) {
      this._svgLayerBg.base = base instanceof SVGElement ? baseBg : null;
      const resolved = await maybeRasterise(base, baseBg);
      this._svgLayerSources.base = base instanceof SVGElement ? base : null;
      const result = resolveSource(resolved);
      if (this.baseTexture?.dispose) this.baseTexture.dispose();
      if (this._ownedVideos.base) disposeVideo(this._ownedVideos.base);
      this.baseTexture = result.texture;
      this.baseAspect = result.aspect;
      this._ownedVideos.base = result.ownedVideo || null;
      this._bakedSources.base = resolved;
      if (result.onLoaded)
        result.onLoaded((a) => {
          this.baseAspect = a;
          this.maskMaterial.uniforms.uBaseImageAspect.value = a;
        });
      this.maskMaterial.uniforms.uBaseTexture.value = this.baseTexture;
      this.maskMaterial.uniforms.uBaseImageAspect.value = this.baseAspect;
    }

    if (reveal !== undefined) {
      this._svgLayerBg.reveal = reveal instanceof SVGElement ? revealBg : null;
      const resolved = await maybeRasterise(reveal, revealBg);
      this._svgLayerSources.reveal = reveal instanceof SVGElement ? reveal : null;
      const result = resolveSource(resolved);
      if (this.revealTexture?.dispose) this.revealTexture.dispose();
      if (this._ownedVideos.reveal) disposeVideo(this._ownedVideos.reveal);
      this.revealTexture = result.texture;
      this.revealAspect = result.aspect;
      this._ownedVideos.reveal = result.ownedVideo || null;
      this._bakedSources.reveal = resolved;
      if (result.onLoaded)
        result.onLoaded((a) => {
          this.revealAspect = a;
          this.maskMaterial.uniforms.uRevealImageAspect.value = a;
        });
      this.maskMaterial.uniforms.uRevealTexture.value = this.revealTexture;
      this.maskMaterial.uniforms.uRevealImageAspect.value = this.revealAspect;
    }

    if (hideOriginal) {
      hiddenSvgs.forEach((svg) => {
        svg.dataset._maskHidden = '1';
        svg.style.visibility = 'hidden';
      });
    }
  }

  // ── Events ──

  _bindEvents() {
    this._onMouseMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = (e.clientX - rect.left) / rect.width;
      this.mouse.y = 1 - (e.clientY - rect.top) / rect.height;
      this.mouseHasMoved = true;
    };
    this._onTouchMove = (e) => {
      if (!e.touches.length) return;
      const t = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = (t.clientX - rect.left) / rect.width;
      this.mouse.y = 1 - (t.clientY - rect.top) / rect.height;
      this.mouseHasMoved = true;
    };
    this._onResize = () => this._resize();

    window.addEventListener('mousemove', this._onMouseMove, { passive: true });
    window.addEventListener('touchmove', this._onTouchMove, { passive: true });
    window.addEventListener('resize', this._onResize);
    if (typeof ResizeObserver !== 'undefined') {
      this._ro = new ResizeObserver(() => this._resize());
      this._ro.observe(this.container);
    }
  }

  // ── Resize ──

  _resize() {
    const rect = this.container.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    this.size = { width: w, height: h };
    this.renderer.setSize(w, h, false);
    const aspect = w / h;
    this.camera.aspect = aspect;
    this.camera.fov = 50;
    this.camera.updateProjectionMatrix();
    const z = this.camera.position.z;
    const fovRad = (this.camera.fov * Math.PI) / 180;
    const planeH = 2 * Math.tan(fovRad / 2) * z;
    const planeW = planeH * aspect;
    this.planeMesh.scale.set(planeW, planeH, 1);
    this.maskMaterial.uniforms.uPlaneAspect.value = aspect;
    this._scheduleSvgRebake();
  }

  _scheduleSvgRebake() {
    if (!this._svgLayerSources) return;
    if (!this._svgLayerSources.base && !this._svgLayerSources.reveal) return;
    clearTimeout(this._rebakeTimeout);
    this._rebakeTimeout = setTimeout(() => {
      const { base, reveal } = this._svgLayerSources;
      const opts = {};
      if (base instanceof SVGElement) {
        opts.base = base;
        opts.baseBg = this._svgLayerBg.base;
      }
      if (reveal instanceof SVGElement) {
        opts.reveal = reveal;
        opts.revealBg = this._svgLayerBg.reveal;
      }
      if (Object.keys(opts).length) {
        opts.hideOriginal = false;
        this.setLayers(opts).catch(() => {});
      }
    }, 120);
  }

  // ── Scroll fade ──

  _computeScrollFade() {
    const rect = this.canvas.getBoundingClientRect();
    const h = rect.height || 1;
    let fade = -rect.top / h;
    if (fade < 0) fade = 0;
    if (fade > 1) fade = 1;
    return fade;
  }

  // ── Showreel check ──

  _getShowreelScaleEl() {
    if (this._showreelScaleEl && this._showreelScaleEl.isConnected)
      return this._showreelScaleEl;
    this._showreelScaleEl = document.querySelector('.section.showreel .video-showreel-full-w');
    return this._showreelScaleEl;
  }

  _isShowreelFull() {
    const el = this._getShowreelScaleEl();
    if (!el) return true;
    const w = el.style.width;
    if (!w) return true;
    const m = w.trim().match(/^([\d.]+)%$/);
    return m ? parseFloat(m[1]) >= 99 : true;
  }

  // ── Clear fluid ──

  _clearFluid() {
    const clear = (rt) => {
      this.renderer.setRenderTarget(rt);
      this.renderer.clear();
    };
    clear(this.dye.read);
    clear(this.dye.write);
    clear(this.velocity.read);
    clear(this.velocity.write);
    clear(this.pressure.read);
    clear(this.pressure.write);
    this.renderer.setRenderTarget(null);
  }

  _renderClean() {
    this.maskMaterial.uniforms.uDye.value = this.dye.read.texture;
    this.renderer.setRenderTarget(null);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
  }

  // ── Animation loop ──

  _animate() {
    if (this.disposed) return;
    this._rafId = requestAnimationFrame(this._animate);
    if (!this._isShowreelFull()) {
      if (!this._maskCleaned) {
        this._clearFluid();
        this._renderClean();
        this._maskCleaned = true;
      }
      return;
    }
    if (this._maskCleaned) {
      this._maskCleaned = false;
      this.prevMouse.x = this.mouse.x;
      this.prevMouse.y = this.mouse.y;
      this.mouseHasMoved = false;
    }
    this._step();
  }

  _step() {
    const s = this.settings;
    const aspect = this.size.width / this.size.height;
    const scrollFade = this._computeScrollFade();
    const fadeSquared = scrollFade * scrollFade;
    const strength = 1 - fadeSquared;

    // Splat from mouse movement
    if (this.mouseHasMoved) {
      const dx = this.mouse.x - this.prevMouse.x;
      const dy = this.mouse.y - this.prevMouse.y;
      if (Math.sqrt(dx * dx + dy * dy) > 0 && strength > 0.001) {
        this.splatMat.uniforms.uTarget.value = this.velocity.read.texture;
        this.splatMat.uniforms.uAspectRatio.value = aspect;
        this.splatMat.uniforms.uPoint.value.set(this.mouse.x, this.mouse.y);
        this.splatMat.uniforms.uColor.value.set(
          dx * s.splatForce * strength,
          dy * s.splatForce * strength,
          0
        );
        this.splatMat.uniforms.uRadius.value = s.splatRadius;
        this._renderPass(this.splatMat, this.velocity.write);
        this.velocity.swap();

        this.splatMat.uniforms.uTarget.value = this.dye.read.texture;
        this.splatMat.uniforms.uColor.value.set(strength, strength, strength);
        this.splatMat.uniforms.uRadius.value = s.splatRadius;
        this._renderPass(this.splatMat, this.dye.write);
        this.dye.swap();
      }
      this.prevMouse.x = this.mouse.x;
      this.prevMouse.y = this.mouse.y;
    }

    // Curl
    this.curlMat.uniforms.uVelocity.value = this.velocity.read.texture;
    this._renderPass(this.curlMat, this.curlRT);

    // Vorticity
    this.vorticityMat.uniforms.uVelocity.value = this.velocity.read.texture;
    this.vorticityMat.uniforms.uCurl.value = this.curlRT.texture;
    this.vorticityMat.uniforms.uCurlStrength.value = s.curlStrength;
    this.vorticityMat.uniforms.uDt.value = 0.016;
    this._renderPass(this.vorticityMat, this.velocity.write);
    this.velocity.swap();

    // Advect velocity
    this.advectionMat.uniforms.uVelocity.value = this.velocity.read.texture;
    this.advectionMat.uniforms.uSource.value = this.velocity.read.texture;
    this.advectionMat.uniforms.uTexelSize.value = this.simTexelSize;
    this.advectionMat.uniforms.uDissipation.value = s.velocityDissipation;
    this._renderPass(this.advectionMat, this.velocity.write);
    this.velocity.swap();

    // Advect dye (with scroll-based dissipation)
    const dyeDissip = s.dyeDissipation + (0.97 - s.dyeDissipation) * fadeSquared;
    this.advectionMat.uniforms.uVelocity.value = this.velocity.read.texture;
    this.advectionMat.uniforms.uSource.value = this.dye.read.texture;
    this.advectionMat.uniforms.uTexelSize.value = this.dyeTexelSize;
    this.advectionMat.uniforms.uDissipation.value = dyeDissip;
    this._renderPass(this.advectionMat, this.dye.write);
    this.dye.swap();

    // Divergence
    this.divergenceMat.uniforms.uVelocity.value = this.velocity.read.texture;
    this._renderPass(this.divergenceMat, this.divergenceRT);

    // Pressure solve
    this.renderer.setRenderTarget(this.pressure.read);
    this.renderer.clear();
    this.renderer.setRenderTarget(null);
    this.pressureMat.uniforms.uDivergence.value = this.divergenceRT.texture;
    for (let i = 0; i < s.pressureIterations; i++) {
      this.pressureMat.uniforms.uPressure.value = this.pressure.read.texture;
      this._renderPass(this.pressureMat, this.pressure.write);
      this.pressure.swap();
    }

    // Gradient subtraction
    this.gradientSubMat.uniforms.uPressure.value = this.pressure.read.texture;
    this.gradientSubMat.uniforms.uVelocity.value = this.velocity.read.texture;
    this._renderPass(this.gradientSubMat, this.velocity.write);
    this.velocity.swap();

    // Update video aspect if needed
    const revealImg = this.revealTexture?.image;
    if (revealImg instanceof HTMLVideoElement && revealImg.videoWidth && revealImg.videoHeight) {
      const vAspect = revealImg.videoWidth / revealImg.videoHeight;
      if (Math.abs(vAspect - this.revealAspect) > 0.001) {
        this.revealAspect = vAspect;
      }
    }

    // Final composite
    const u = this.maskMaterial.uniforms;
    u.uDye.value = this.dye.read.texture;
    u.uRevealSize.value = s.revealSize;
    u.uEdgeSoftness.value = s.edgeSoftness;
    u.uEdgeWidth.value = s.edgeWidth;
    u.uBaseImageAspect.value = this.baseAspect;
    u.uRevealImageAspect.value = this.revealAspect;
    this.renderer.setRenderTarget(null);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
  }

  // ── Public API ──

  updateSettings(newSettings) {
    Object.assign(this.settings, newSettings);
  }

  destroy() {
    if (this.disposed) return;
    this.disposed = true;

    if (this._rafId) cancelAnimationFrame(this._rafId);
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('touchmove', this._onTouchMove);
    window.removeEventListener('resize', this._onResize);
    if (this._ro) this._ro.disconnect();
    clearTimeout(this._rebakeTimeout);

    const disposeFBO = (fbo) => {
      fbo?.read?.dispose();
      fbo?.write?.dispose();
    };
    disposeFBO(this.velocity);
    disposeFBO(this.pressure);
    disposeFBO(this.dye);
    this.curlRT?.dispose();
    this.divergenceRT?.dispose();
    this.quadGeo?.dispose();
    this.planeGeo?.dispose();

    [
      this.curlMat,
      this.vorticityMat,
      this.advectionMat,
      this.splatMat,
      this.divergenceMat,
      this.pressureMat,
      this.gradientSubMat,
      this.maskMaterial,
    ].forEach((m) => m?.dispose());

    this.baseTexture?.dispose?.();
    this.revealTexture?.dispose?.();
    this.renderer?.dispose();

    if (this._ownedVideos) {
      if (this._ownedVideos.base) disposeVideo(this._ownedVideos.base);
      if (this._ownedVideos.reveal) disposeVideo(this._ownedVideos.reveal);
    }

    // Restore hidden SVGs
    if (this._svgLayerSources) {
      for (const src of Object.values(this._svgLayerSources)) {
        if (src instanceof SVGElement && src.dataset._maskHidden) {
          src.style.visibility = '';
          delete src.dataset._maskHidden;
        }
      }
    }

    if (this.canvas?.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// ────────────────── Factory functions (dA / pA / mA from main.js) ───────

let _activeInstance = null;

/**
 * Create a new FluidSimEngine on the given container.
 * Mirrors dA() from main.js.
 */
export function createFluidSim({ containerSelector = '.section-w', base = null, reveal = null, settings = {} } = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return null;

  if (_activeInstance) _activeInstance.destroy();

  const heroSection = container.querySelector('.section.hero-home');
  const resolvedBase = base ?? extractBgColor(heroSection) ?? '#0a0a0a';
  const resolvedReveal = reveal;

  if (heroSection && !base) {
    heroSection.style.backgroundColor = 'white';
  }

  const merged = { ...DEFAULT_FLUID_SETTINGS, ...settings };
  const instance = new FluidSimEngine(container, resolvedBase, resolvedReveal, merged);
  _activeInstance = instance;
  return instance;
}

/**
 * Destroy the active fluid sim instance.
 * Mirrors pA() from main.js.
 */
export function destroyFluidSim() {
  if (_activeInstance) {
    _activeInstance.destroy();
    _activeInstance = null;
  }
}

/**
 * Update layers on the active instance.
 * Mirrors mA() from main.js.
 */
export async function setFluidSimLayers(opts = {}) {
  if (_activeInstance) {
    await _activeInstance.setLayers(opts);
  }
}
