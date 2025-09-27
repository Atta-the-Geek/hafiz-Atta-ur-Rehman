// small JS to animate skill bars and reveal cards on scroll
document.addEventListener('DOMContentLoaded', () => {
  const fills = document.querySelectorAll('.skill-fill');
  const animatedEls = document.querySelectorAll('.animated');

  // intersection observer to reveal elements
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('inview');
        o.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  animatedEls.forEach(el => obs.observe(el));

  // animate skill fills when they are visible
  const obsSkills = new IntersectionObserver((entries, o) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        fills.forEach(f => {
          const v = f.getAttribute('data-fill') || '70%';
          f.style.width = v;
        });
        o.disconnect();
      }
    });
  }, {threshold: 0.25});

  if(fills.length) obsSkills.observe(fills[0]);

  // little fade on load for header
  setTimeout(()=> {
    document.querySelectorAll('.header, .card').forEach((el, idx) => {
      setTimeout(()=> el.classList.add('inview'), idx*80);
    });
  }, 120);
});
