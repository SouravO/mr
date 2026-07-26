/**
 * GLSL shader strings for the WebGL fluid-simulation mask reveal.
 *
 * Extracted verbatim from main.js at byte offset 669875.
 * Original constants: nA (quadVert), iA (meshVert), rA (advection),
 * sA (splat), oA (curl), aA (vorticity), lA (divergence),
 * cA (pressure), uA (gradientSub), hA (maskComposite).
 */

// ──────────────────────────── vertex shaders ────────────────────────────

/** Full-screen quad vertex shader (used by fluid passes). */
export const quadVertexShader = `varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`;

/** Standard mesh vertex shader (used by the final composite plane). */
export const meshVertexShader = `varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

// ──────────────────────────── fragment shaders ──────────────────────────

/** Advection pass — moves velocity / dye along the velocity field. */
export const advectionShader = `precision highp float;

uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uTexelSize;
uniform float uDt;
uniform float uDissipation;

varying vec2 vUv;

vec4 bilerp(sampler2D sam, vec2 uv, vec2 tsize) {
  vec2 st = uv / tsize - 0.5;
  vec2 iuv = floor(st);
  vec2 fuv = fract(st);
  vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
  vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
  vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
  vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
  return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}

void main() {
  vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexelSize;
  vec4 result = uDissipation * bilerp(uSource, coord, uTexelSize);
  gl_FragColor = result;
}`;

/** Splat pass — injects velocity or dye at mouse position. */
export const splatShader = `precision highp float;

uniform sampler2D uTarget;
uniform float uAspectRatio;
uniform vec2 uPoint;
uniform vec3 uColor;
uniform float uRadius;

varying vec2 vUv;

void main() {
  vec2 p = vUv - uPoint;
  p.x *= uAspectRatio;
  vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}`;

/** Curl pass — computes the vorticity (curl of velocity). */
export const curlShader = `precision highp float;

uniform sampler2D uVelocity;
uniform vec2 uTexelSize;

varying vec2 vUv;

void main() {
  float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).y;
  float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).y;
  float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).x;
  float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).x;
  float vorticity = R - L - T + B;
  gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}`;

/** Vorticity confinement — adds rotational force to the velocity field. */
export const vorticityShader = `precision highp float;

uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform vec2 uTexelSize;
uniform float uCurlStrength;
uniform float uDt;

varying vec2 vUv;

void main() {
  float L = texture2D(uCurl, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture2D(uCurl, vUv + vec2(uTexelSize.x, 0.0)).x;
  float T = texture2D(uCurl, vUv + vec2(0.0, uTexelSize.y)).x;
  float B = texture2D(uCurl, vUv - vec2(0.0, uTexelSize.y)).x;
  float C = texture2D(uCurl, vUv).x;

  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  float len = length(force) + 0.0001;
  force = force / len * uCurlStrength * C;

  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity += force * uDt;

  gl_FragColor = vec4(velocity, 0.0, 1.0);
}`;

/** Divergence — computes how much the velocity field diverges. */
export const divergenceShader = `precision highp float;

uniform sampler2D uVelocity;
uniform vec2 uTexelSize;

varying vec2 vUv;

void main() {
  float L = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
  float T = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;
  float B = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;

  float div = 0.5 * (R - L + T - B);
  gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}`;

/** Pressure solve (Jacobi iteration). */
export const pressureShader = `precision highp float;

uniform sampler2D uPressure;
uniform sampler2D uDivergence;
uniform vec2 uTexelSize;

varying vec2 vUv;

void main() {
  float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
  float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
  float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
  float C = texture2D(uDivergence, vUv).x;

  float pressure = (L + R + B + T - C) * 0.25;
  gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}`;

/** Gradient subtraction — removes the pressure gradient from velocity. */
export const gradientSubShader = `precision highp float;

uniform sampler2D uPressure;
uniform sampler2D uVelocity;
uniform vec2 uTexelSize;

varying vec2 vUv;

void main() {
  float L = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
  float R = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
  float T = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
  float B = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;

  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity -= vec2(R - L, T - B) * 0.5;
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}`;

/** Mask composite — blends base and reveal textures using the dye field. */
export const maskCompositeShader = `uniform sampler2D uBaseTexture;
uniform sampler2D uRevealTexture;
uniform sampler2D uDye;

uniform float uRevealSize;
uniform float uEdgeSoftness;
uniform float uEdgeWidth;

uniform float uBaseImageAspect;
uniform float uRevealImageAspect;
uniform float uPlaneAspect;

varying vec2 vUv;

vec2 coverUv(vec2 uv, float imageAspect, float planeAspect) {
  vec2 ratio = vec2(
    min(planeAspect / imageAspect, 1.0),
    min(imageAspect / planeAspect, 1.0)
  );
  return vec2(
    uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    uv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
}

void main() {
  float dye = texture2D(uDye, vUv).r;

  vec2 baseUv = coverUv(vUv, uBaseImageAspect, uPlaneAspect);
  baseUv = clamp(baseUv, 0.001, 0.999);
  vec4 baseColor = texture2D(uBaseTexture, baseUv);

  vec2 revealUv = coverUv(vUv, uRevealImageAspect, uPlaneAspect);
  revealUv = clamp(revealUv, 0.001, 0.999);
  vec4 revealColor = texture2D(uRevealTexture, revealUv);

  float raw  = dye * uRevealSize;
  float mask = smoothstep(uEdgeSoftness, uEdgeSoftness + uEdgeWidth, raw);
  mask = clamp(mask, 0.0, 1.0);

  gl_FragColor = mix(baseColor, revealColor, mask);
}`;
