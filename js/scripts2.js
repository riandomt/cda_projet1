(function(){
  const track = document.querySelector('.carousel-track');
  const carousel = document.querySelector('.carousel');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.querySelector('.dots');

  let slides = Array.from(track.querySelectorAll('img'));
  let index = 0;
  let slideWidth = 0;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;

  slides.forEach(img => img.style.flex = '0 0 100%');

  function waitImagesLoaded(images){
    const promises = images.map(img => {
      if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
      return new Promise(res => {
        img.addEventListener('load', res, {once:true});
        img.addEventListener('error', res, {once:true});
      });
    });
    return Promise.all(promises);
  }

  function syncDots(){
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const d = document.createElement('span');
      d.className = 'dot' + (i === index ? ' active' : '');
      d.setAttribute('data-index', i);
      d.addEventListener('click', () => {
        index = i;
        updateCarousel();
      });
      dotsContainer.appendChild(d);
    });
  }
  function updateCarousel(){
    if (!slides[0]) return;
    slideWidth = carousel.getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    dotsContainer.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    const active = dotsContainer.querySelector(`.dot[data-index="${index}"]`);
    if(active) active.classList.add('active');
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    updateCarousel();
  });
  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  let ro;
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(() => updateCarousel());
    ro.observe(carousel);
  } else {
    window.addEventListener('resize', updateCarousel);
  }

  function touchStart(indexedEvent){
    isDragging = true;
    startX = getPositionX(indexedEvent);
    prevTranslate = -index * slideWidth;
    carousel.classList.add('grabbing');
    cancelAnimationFrame(animationID);
  }
  function touchMove(e){
    if(!isDragging) return;
    const currentX = getPositionX(e);
    const diff = currentX - startX;
    currentTranslate = prevTranslate + diff;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }
  function touchEnd(){
    if(!isDragging) return;
    isDragging = false;
    carousel.classList.remove('grabbing');
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -50) index = Math.min(index + 1, slides.length - 1);
    if (movedBy > 50) index = Math.max(index - 1, 0);
    updateCarousel();
  }
  function getPositionX(e){
    return e.type.includes('mouse') ? e.pageX : (e.touches ? e.touches[0].clientX : e.clientX);
  }

  track.addEventListener('touchstart', touchStart, {passive:true});
  track.addEventListener('touchmove', touchMove, {passive:true});
  track.addEventListener('touchend', touchEnd);

  track.addEventListener('mousedown', touchStart);
  track.addEventListener('mousemove', touchMove);
  track.addEventListener('mouseup', touchEnd);
  track.addEventListener('mouseleave', touchEnd);


  waitImagesLoaded(slides).then(() => {

    if (dotsContainer.children.length !== slides.length) {
      syncDots();
    } else {

      dotsContainer.querySelectorAll('.dot').forEach((d,i) => {
        d.setAttribute('data-index', i);
        d.addEventListener('click', () => { index = i; updateCarousel(); });
      });
      updateCarousel();
    }

    setTimeout(updateCarousel, 50);
  });

  window.refreshCarousel = function(){
    slides = Array.from(track.querySelectorAll('img'));
    slides.forEach(img => img.style.flex = '0 0 100%');
    syncDots();
    waitImagesLoaded(slides).then(updateCarousel);
  };

  updateCarousel();
})();