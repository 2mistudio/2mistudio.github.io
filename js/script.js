// Scroll progress indicator on the "TOP" button
(function () {
    const btn = document.querySelector('.button-top');
    if (!btn) return;

    function updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? Math.max(0, Math.min(1, scrollTop / docHeight)) : 0;
        const angle = progress * 360;

        // Linear gradient on top, conic progress ring underneath
        btn.style.backgroundImage =
            'linear-gradient(135deg, #fff, #fff),' +
            'conic-gradient(' +
                'var(--prime-green) 0deg, ' +
                'var(--prime-green) ' + angle + 'deg, ' +
                'var(--light-gray) ' + angle + 'deg, ' +
                'var(--light-gray) 360deg)';
        // Toggle visibility after 100px scroll
        if (scrollTop > 100) {
            btn.classList.add('is-visible');
        } else {
            btn.classList.remove('is-visible');
        }
    }

    updateProgress();
    window.addEventListener('scroll', updateProgress);
})();


// Button focuse in Mobile view

history.scrollRestoration = "manual";

window.addEventListener("DOMContentLoaded", () => {

  // Reset full page scroll (horizontal + vertical)
  window.scrollTo(0, 0);

  // Scroll active nav button into view
  const activeBtn = document.querySelector(".active");
  if (activeBtn) {
    activeBtn.scrollIntoView({
      behavior: "auto",      // or "smooth"
      inline: "start",
      block: "nearest"
    });
  }

});
