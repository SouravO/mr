import { useRef } from 'react';
import useWorksGrid from '../hooks/useWorksGrid';
import useTextReveal from '../hooks/useTextReveal';
import useButtonEffects from '../hooks/useButtonEffects';
import useProjectNav from '../hooks/useProjectNav';

const WORKS = [
  {
    title: 'TV',
    description: 'Where taste meets meaning.',
    href: 'works/utopia.html',
    imgSrc: 'https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bb9740ace5d22b1065c_work-vignette-utopia-V2.webp',
    srcSet: 'https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bb9740ace5d22b1065c_work-vignette-utopia-V2-p-500.webp 500w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bb9740ace5d22b1065c_work-vignette-utopia-V2-p-800.webp 800w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bb9740ace5d22b1065c_work-vignette-utopia-V2-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bb9740ace5d22b1065c_work-vignette-utopia-V2.webp 1600w',
  },
  {
    title: 'Washing Machine',
    description: 'A living instrument for reading territory. ',
    href: 'works/aurbse.html',
    imgSrc: 'https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bce1522d2bb4973451c_work-vignette-aurbse-V2.webp',
    srcSet: 'https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bce1522d2bb4973451c_work-vignette-aurbse-V2-p-500.webp 500w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bce1522d2bb4973451c_work-vignette-aurbse-V2-p-800.webp 800w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bce1522d2bb4973451c_work-vignette-aurbse-V2-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bce1522d2bb4973451c_work-vignette-aurbse-V2.webp 1500w',
  },
  {
    title: 'Home Theater',
    description: 'Seize the unexpected: the invisible, made visible.',
    href: 'works/in-cognita.html',
    imgSrc: 'https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319be381e9a44c6244424b_work-vignette-in-cognita-V3.jpg',
    srcSet: 'https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319be381e9a44c6244424b_work-vignette-in-cognita-V3-p-500.jpg 500w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319be381e9a44c6244424b_work-vignette-in-cognita-V3-p-800.jpg 800w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319be381e9a44c6244424b_work-vignette-in-cognita-V3-p-1080.jpg 1080w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319be381e9a44c6244424b_work-vignette-in-cognita-V3-p-1600.jpg 1600w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319be381e9a44c6244424b_work-vignette-in-cognita-V3.jpg 1800w',
  },
  {
    title: 'Refrigerator',
    description: 'Swiss clarity for French engineering.',
    href: 'works/lgm.html',
    imgSrc: 'https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319c01066b4f2379f3db78_work-vignette-lgm-V2.jpg',
    srcSet: 'https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319c01066b4f2379f3db78_work-vignette-lgm-V2-p-500.jpg 500w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319c01066b4f2379f3db78_work-vignette-lgm-V2-p-800.jpg 800w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319c01066b4f2379f3db78_work-vignette-lgm-V2-p-1080.jpg 1080w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319c01066b4f2379f3db78_work-vignette-lgm-V2.jpg 1400w',
  },
  {
    title: 'Home Appliances',
    description: 'mr plus .',
    href: 'works/haptify.html',
    imgSrc: 'https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bf45a0a1fa70477531a_work-vignette-haptify-V2.webp',
    srcSet: 'https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bf45a0a1fa70477531a_work-vignette-haptify-V2-p-500.webp 500w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bf45a0a1fa70477531a_work-vignette-haptify-V2-p-800.webp 800w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bf45a0a1fa70477531a_work-vignette-haptify-V2-p-1080.webp 1080w, https://cdn.prod.website-files.com/6a2679b9acc91890e34df140/6a319bf45a0a1fa70477531a_work-vignette-haptify-V2.webp 1400w',
  },
];

function ExploreArrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.60254 0.353516L13.1188 4.86981L8.60254 9.3861" stroke="white" />
      <line y1="5.01562" x2="13.1188" y2="5.01562" stroke="white" />
    </svg>
  );
}

function WorkItem({ title, description, href, imgSrc, srcSet }) {
  return (
    <div className="work_item w-dyn-item">
      <h2 line="" className="title-work">{title}</h2>
      <p line="" className="short-p-work">{description}</p>
      <a href={href} className="work-link w-inline-block">
        <div className="img-work-w">
          <img
            src={imgSrc}
            loading="lazy"
            alt=""
            sizes="100vw"
            srcSet={srcSet}
            className="img-work"
          />
        </div>
        <div className="cursor-work">
          <div>explore</div>
          <div className="w-embed">
            <ExploreArrow />
          </div>
        </div>
      </a>
    </div>
  );
}

export default function WorksSection() {
  const sectionRef = useRef(null);

  useWorksGrid(sectionRef);
  useTextReveal(sectionRef);
  useButtonEffects(sectionRef);
  useProjectNav(sectionRef);

  return (
    <section id="works" className="section works" ref={sectionRef}>
      <div className="container works">
        {/* Sticky "WORKS" letters */}
        <div className="works-word-w">
          <div className="div-block-2">
            <div className="works-word-block-state1"><div className="works-word">w</div></div>
            <div className="works-word-block-state1"><div className="works-word o">o</div></div>
            <div className="works-word-block-state1"><div className="works-word r">r</div></div>
            <div className="works-word-block-state1"><div className="works-word k">k</div></div>
            <div className="works-word-block-state1"><div className="works-word">s</div></div>
          </div>
          <div className="div-block-2 hide-tablet">
            <div className="works-word-block-state2"></div>
            <div className="works-word-block-state2"></div>
            <div className="works-word-block-state2"></div>
            <div className="works-word-block-state2"></div>
            <div className="works-word-block-state2"></div>
          </div>
        </div>

        <div className="space-87"></div>

        {/* Section heading */}
        <div className="titile-section-work">
          <h2 line="" className="h3-style">
            Good brands communicate.<br />
            Great brands surprise.
          </h2>
        </div>

        {/* Work items grid */}
        <div className="work_list_w w-dyn-list">
          <div role="list" className="work_list w-dyn-items">
            {WORKS.map((work) => (
              <WorkItem key={work.title} {...work} />
            ))}
          </div>
        </div>

        <div className="space-150 hide-tablet"></div>
        <div className="space-150 mob-100"></div>

        {/* "View all" + project count */}
        <div opacity="" className="work-view-all-w">
          <a href="works.html" className="btn view-all-btn w-inline-block">
            <div>View all</div>
            <div className="code-embed-2 w-embed">
              <svg className="arrow-icon" width="24" height="12" viewBox="-8 -1 26 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline className="arrow-shaft" points="0.5,0 0.5,7.5 15.5,7.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                <polyline className="arrow-head" points="12,4 15.5,7.5 12,11" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>

          <div className="nbr-works-w">
            <div className="div-block-3">
              <div>(</div>
              <div>08</div>
              <div>)</div>
            </div>
            <div className="nbr-projects w-dyn-list">
              <div role="list" className="w-dyn-items">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} role="listitem" className="w-dyn-item"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-block-3">© 24 . 26</div>
        </div>

        <div className="space-150 mob-100"></div>
      </div>
    </section>
  );
}
