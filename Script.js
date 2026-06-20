(function () {
  const pages = Array.from(document.querySelectorAll(".page"));
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const tocLinks = Array.from(document.querySelectorAll(".toc-link"));
  const turnNext = document.getElementById("turnNext");
  const turnPrev = document.getElementById("turnPrev");
  const indicator = document.getElementById("pageIndicator");
  const total = pages.length;

  if (!total || !turnNext || !turnPrev) {
    console.error(
      "Notebook script.js loaded, but couldn't find .page elements or turn buttons. " +
      "Check that index.html, style.css, and script.js are all in the same folder."
    );
    return;
  }
  console.log(`Notebook ready: ${total} pages found.`);

  let current = 0;
  let animating = false;

  function render(prevIndex, nextIndex, instant) {
    pages.forEach((page, i) => {
      page.classList.remove(
        "is-past", "is-current", "is-future",
        "is-turning-next", "is-turning-prev",
        "is-next-up", "is-prev-up"
      );
      if (i < nextIndex) {
        page.classList.add("is-past");
        if (i === nextIndex - 1) page.classList.add("is-prev-up");
      } else if (i === nextIndex) {
        page.classList.add("is-current");
      } else {
        page.classList.add("is-future");
        if (i === nextIndex + 1) page.classList.add("is-next-up");
      }
    });

    tabs.forEach((tab) => {
      tab.classList.toggle("is-active", Number(tab.dataset.page) === nextIndex);
    });

    indicator.textContent = `page ${nextIndex + 1} of ${total}`;
  }

  function goTo(targetIndex) {
    if (animating) return;
    targetIndex = Math.max(0, Math.min(total - 1, targetIndex));
    if (targetIndex === current) return;

    const goingForward = targetIndex > current;
    animating = true;

    const stagger = 90;
    let count = 0;

    if (goingForward) {
      for (let i = current; i < targetIndex; i++) {
        const page = pages[i];
        const delay = count * stagger;
        if (delay === 0) {
          page.classList.remove("is-current", "is-future", "is-past");
          page.classList.add("is-turning-next");
        } else {
          window.setTimeout(() => {
            page.classList.remove("is-current", "is-future", "is-past");
            page.classList.add("is-turning-next");
          }, delay);
        }
        count++;
      }
    } else {
      const range = [];
      for (let i = targetIndex; i < current; i++) range.push(i);
      range.reverse(); // flip the page nearest 'current' first
      range.forEach((i, idx) => {
        const page = pages[i];
        const delay = idx * stagger;
        if (delay === 0) {
          page.classList.remove("is-past", "is-current", "is-future");
          page.classList.add("is-turning-prev");
        } else {
          window.setTimeout(() => {
            page.classList.remove("is-past", "is-current", "is-future");
            page.classList.add("is-turning-prev");
          }, delay);
        }
      });
      count = range.length;
    }

    const duration = 860 + (count - 1) * stagger;
    window.setTimeout(() => {
      current = targetIndex;
      render(null, current, false);
      animating = false;
    }, duration);
  }

  turnNext.addEventListener("click", () => goTo(current + 1));
  turnPrev.addEventListener("click", () => goTo(current - 1));

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => goTo(Number(tab.dataset.page)));
  });

  tocLinks.forEach((link) => {
    link.addEventListener("click", () => goTo(Number(link.dataset.goto)));
  });

  // keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "PageDown") goTo(current + 1);
    if (e.key === "ArrowLeft" || e.key === "PageUp") goTo(current - 1);
  });

  // basic swipe support for touch devices
  let touchStartX = null;
  const notebook = document.getElementById("notebook");
  notebook.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  notebook.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goTo(current + 1);
      else goTo(current - 1);
    }
    touchStartX = null;
  }, { passive: true });

  // initial paint
  render(null, current, true);
})();