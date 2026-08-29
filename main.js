document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const mobileMenuLinks = mobileMenu ? [...mobileMenu.querySelectorAll("a")] : [];

function setMenu(open) {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  mobileMenu.hidden = !open;
}

menuButton?.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileMenuLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    menuButton.focus();
  }
});

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = [...document.querySelectorAll(".reveal")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px" },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const navLinks = [...document.querySelectorAll("[data-nav-link]")];
const trackedSections = [...document.querySelectorAll("[data-section]")];

if ("IntersectionObserver" in window && trackedSections.length) {
  const visibleSections = new Map();
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, entry.intersectionRatio);
        else visibleSections.delete(entry.target.id);
      });

      const current = [...visibleSections.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${current}`;
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { threshold: [0.15, 0.35, 0.55], rootMargin: "-15% 0px -55%" },
  );

  trackedSections.forEach((section) => navObserver.observe(section));
}

const drilldown = document.querySelector("[data-drilldown]");

if (drilldown && window.IDV_CASE?.cohortPath) {
  const path = window.IDV_CASE.cohortPath;
  const pathContainer = drilldown.querySelector("[data-drilldown-path]");
  const title = drilldown.querySelector("[data-drilldown-title]");
  const copy = drilldown.querySelector("[data-drilldown-copy]");
  const share = drilldown.querySelector("[data-regression-share]");
  const nextButton = drilldown.querySelector("[data-drilldown-next]");
  let activeIndex = 0;
  let maxReached = 0;

  path.forEach((step, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "drill-step";
    button.dataset.stepIndex = String(index);
    button.setAttribute("aria-label", `${step.label}: ${step.value}`);
    button.innerHTML = `<span>${step.label}</span><strong>${index === 0 ? step.value : "Explore"}</strong>`;
    button.disabled = index > 1;
    button.addEventListener("click", () => {
      activeIndex = index;
      maxReached = Math.max(maxReached, index);
      renderDrilldown();
    });
    pathContainer.appendChild(button);
  });

  function renderDrilldown() {
    const step = path[activeIndex];
    const buttons = [...pathContainer.querySelectorAll(".drill-step")];

    buttons.forEach((button, index) => {
      const stepData = path[index];
      const unlocked = index <= Math.min(maxReached + 1, path.length - 1);
      button.disabled = !unlocked;
      button.classList.toggle("is-active", index === activeIndex);
      button.classList.toggle("is-complete", index < maxReached);
      button.setAttribute("aria-pressed", String(index === activeIndex));
      button.querySelector("strong").textContent = index <= maxReached ? stepData.value : "Explore";
    });

    title.textContent = step.title;
    copy.textContent = step.copy;
    share.hidden = activeIndex !== path.length - 1;

    if (activeIndex === path.length - 1) {
      nextButton.innerHTML = `Restart investigation <span aria-hidden="true">↺</span>`;
    } else {
      nextButton.innerHTML = `Narrow to ${path[activeIndex + 1].label.toLowerCase()} <span aria-hidden="true">→</span>`;
    }
  }

  nextButton.addEventListener("click", () => {
    if (activeIndex === path.length - 1) {
      activeIndex = 0;
      maxReached = 0;
    } else {
      activeIndex += 1;
      maxReached = Math.max(maxReached, activeIndex);
    }
    renderDrilldown();
    pathContainer.querySelector(`[data-step-index="${activeIndex}"]`)?.focus({ preventScroll: true });
  });

  renderDrilldown();
}

const thresholdSlider = document.querySelector("[data-threshold-slider]");
const thresholdOutput = document.querySelector("[data-threshold-output]");
const thresholdMetrics = {
  recall: document.querySelector('[data-metric="recall"]'),
  precision: document.querySelector('[data-metric="precision"]'),
  far: document.querySelector('[data-metric="far"]'),
  frr: document.querySelector('[data-metric="frr"]'),
  conversion: document.querySelector('[data-metric="conversion"]'),
};

function percentage(value) {
  return `${value.toFixed(1)}%`;
}

function updateThreshold() {
  if (!thresholdSlider || !thresholdOutput) return;
  const value = Number(thresholdSlider.value);
  const position = (value - 25) / 60;
  const conceptual = {
    recall: 82 + position * 15,
    precision: 96 - position * 12,
    far: 2.8 - position * 2.4,
    frr: 1.1 + position * 7.5,
    conversion: 98 - position * 9,
  };

  thresholdOutput.value = String(value);
  thresholdOutput.textContent = String(value);
  Object.entries(conceptual).forEach(([key, metricValue]) => {
    if (thresholdMetrics[key]) thresholdMetrics[key].textContent = percentage(metricValue);
  });
}

thresholdSlider?.addEventListener("input", updateThreshold);
updateThreshold();

const roleDialog = document.querySelector("[data-role-dialog]");
const openRoleDialogButton = document.querySelector("[data-open-role-dialog]");
const closeRoleDialogButton = document.querySelector("[data-close-role-dialog]");
let dialogTrigger = null;

openRoleDialogButton?.addEventListener("click", () => {
  if (!roleDialog?.showModal) return;
  dialogTrigger = openRoleDialogButton;
  roleDialog.showModal();
  document.body.classList.add("dialog-open");
  closeRoleDialogButton?.focus();
});

closeRoleDialogButton?.addEventListener("click", () => roleDialog?.close());

roleDialog?.addEventListener("click", (event) => {
  if (event.target === roleDialog) roleDialog.close();
});

roleDialog?.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  dialogTrigger?.focus();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1100) setMenu(false);
});
