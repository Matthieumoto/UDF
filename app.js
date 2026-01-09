gsap.registerPlugin(ScrollTrigger);

const DATA = [
  {
    key: "energie",
    label: "ENERGY",
    moment: "Morning / Boost",
    subtitle: "A steady kick to start strong—no rollercoaster.",
    accent: "#e1062c",
    accent2: "#ff6a00",
    bottle: "./assets/bottles/energie.png",
    ingredients: [
      "./assets/ingredients/energie_1.png",
      "./assets/ingredients/energie_2.png",
      "./assets/ingredients/energie_2.png",
      "./assets/ingredients/energie_2.png",
      "./assets/ingredients/energie_1.png",
    ],
    bullets: ["Progressive energy", "Zero crash", "Fresh, clean taste"],
    longText:
      "Designed to replace coffee: steadier energy, a cleaner feel, without the brutal drop.",
  },
  {
    key: "concentration",
    label: "FOCUS",
    moment: "Afternoon / Focus",
    subtitle: "Mental clarity + focus, without turning you into a stressed-out robot.",
    accent2: "#ffd400",
    accent: "#ffffff",
    bottle: "./assets/bottles/concentration.png",
    ingredients: [
      "./assets/ingredients/concentration_2.png",
      "./assets/ingredients/concentration_1.png",
      "./assets/ingredients/concentration_1.png",
      "./assets/ingredients/concentration_1.png",
      "./assets/ingredients/concentration_2.png",
    ],
    bullets: ["Crisp focus", "Less brain fog", "Controlled energy"],
    longText:
      "For when you need to be efficient: more “stable” energy, and a long-lasting sense of focus.",
  },
  {
    key: "bienetre",
    label: "WELLNESS",
    moment: "End of day / Smooth",
    subtitle: "Chill mode: steady, gentle, staying good—no crash.",
    accent: "#7b3fe4",
    accent2: "#f700ffff",
    bottle: "./assets/bottles/bienetre.png",
    ingredients: [
      "./assets/ingredients/bienetre_2.png",
      "./assets/ingredients/bienetre_1.png",
      "./assets/ingredients/bienetre_1.png",
      "./assets/ingredients/bienetre_1.png",
      "./assets/ingredients/bienetre_2.png",
    ],
    bullets: ["Light feel", "Calm vibe", "Always steady"],
    longText:
      "Ideal to carry you through the end of the day without over-stimulating you. Softer mood, still effective.",
  },
];

const els = {
  bg: document.documentElement,
  particles: document.getElementById("particles"),

  heroBottle: document.getElementById("heroBottle"),
  heroIngredients: document.getElementById("heroIngredients"),
  heroShadow: document.getElementById("heroShadow"),
  subtitle: document.getElementById("subtitle"),
  chips: document.getElementById("chips"),

  carouselTrack: document.getElementById("carouselTrack"),
  dots: document.getElementById("dots"),

  infoGrid: document.getElementById("infoGrid"),

  btnChoose: document.getElementById("btnChoose"),
  btnGoSection: document.getElementById("btnGoSection"),
  btnScrollInfo: document.getElementById("btnScrollInfo"),
  btnScrollEnergy: document.getElementById("btnScrollEnergy"),
};

let activeIndex = 0;

/* ---------- Helpers ---------- */
function setTheme(item) {
  document.documentElement.style.setProperty("--accent", item.accent);
  document.documentElement.style.setProperty("--accent2", item.accent2);
}

function clearNode(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

function makeIngredientNode(src, opts = {}) {
  const div = document.createElement("div");
  div.className = `ing ${opts.size || ""}`.trim();
  div.style.backgroundImage = `url("${src}")`;
  div.style.left = `${opts.left}%`;
  div.style.top = `${opts.top}%`;
  div.style.animationDuration = `${opts.dur}s`;
  div.style.animationDelay = `${opts.delay}s`;
  return div;
}

function layoutIngredients(container, ingredientList) {
  clearNode(container);

  // “cinematic” positions (you can tweak)
  const spots = [
    { left: 16, top: 52, size: "small" },
    { left: 64, top: 50, size: "" },
    { left: 28, top: 26, size: "" },
    { left: 72, top: 26, size: "small" },
    { left: 44, top: 16, size: "tiny" },
  ];

  ingredientList.slice(0, spots.length).forEach((src, i) => {
    const s = spots[i];
    const node = makeIngredientNode(src, {
      ...s,
      dur: 4.8 + i * 0.35,
      delay: i * 0.12,
    });
    container.appendChild(node);
  });
}

function burstIngredients(container) {
  const items = Array.from(container.querySelectorAll(".ing"));
  gsap.fromTo(
    items,
    { y: 120, scale: 0.6, opacity: 0 },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.85,
      ease: "expo.out",
      stagger: 0.06,
    }
  );
}

/* ---------- Particles background (simple) ---------- */
function spawnParticles() {
  clearNode(els.particles);
  const count = 18;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    const size = 6 + Math.random() * 12;
    p.style.position = "absolute";
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.borderRadius = "999px";
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.background = "rgba(255,255,255,.10)";
    p.style.filter = "blur(0.2px)";
    p.style.opacity = (0.15 + Math.random() * 0.25).toFixed(2);
    els.particles.appendChild(p);

    gsap.to(p, {
      y: -40 - Math.random() * 80,
      x: (Math.random() - 0.5) * 60,
      duration: 6 + Math.random() * 5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: Math.random() * 1.5,
    });
  }
}

/* ---------- Hero update + animation ---------- */
function updateHero(index, animate = true) {
  activeIndex = index;
  const item = DATA[index];

  setTheme(item);

  els.subtitle.textContent = item.subtitle;

  // chips
  clearNode(els.chips);
  item.bullets.forEach((t) => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = t;
    els.chips.appendChild(chip);
  });

  // bottle
  els.heroBottle.src = item.bottle;

  // ingredients
  layoutIngredients(els.heroIngredients, item.ingredients);

  if (!animate) return;

  // bottle rises
  gsap.fromTo(
    els.heroBottle,
    { y: 90, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" }
  );
  gsap.fromTo(
    els.heroShadow,
    { scale: 0.6, opacity: 0.2 },
    { scale: 1, opacity: 0.65, duration: 0.7, ease: "expo.out" }
  );

  // ingredients burst
  burstIngredients(els.heroIngredients);
}

/* ---------- Carousel render ---------- */
function renderCarousel() {
  clearNode(els.carouselTrack);
  clearNode(els.dots);

  DATA.forEach((item, i) => {
    // dot
    const dot = document.createElement("button");
    dot.className = `dot ${i === activeIndex ? "active" : ""}`.trim();
    dot.setAttribute("aria-label", `Go to ${item.label}`);
    dot.addEventListener("click", () => scrollToSlide(i));
    els.dots.appendChild(dot);

    // slide
    const slide = document.createElement("article");
    slide.className = "slide";
    slide.dataset.index = String(i);

    slide.innerHTML = `
      <div class="slide-inner">
        <div>
          <div class="badge">🕒 ${item.moment}</div>
          <h3>${item.label}</h3>
          <p>${item.subtitle}</p>

          <div class="slide-cta">
            <button class="btn primary" data-action="select">Select</button>
            <button class="btn" data-action="info">View details</button>
          </div>
        </div>

        <div class="slide-stage">
          <div class="ground"></div>
          <img class="bottle" alt="${item.label} Bottle" />
          <div class="ingredients"></div>
          <div class="shadow"></div>
        </div>
      </div>
    `;

    // stage
    const stage = slide.querySelector(".slide-stage");
    const bottle = stage.querySelector(".bottle");
    const ing = stage.querySelector(".ingredients");
    const shadow = stage.querySelector(".shadow");

    bottle.src = item.bottle;
    layoutIngredients(ing, item.ingredients);

    // entry animation for stage elements (when slide becomes active we replay)
    slide._animate = () => {
      gsap.fromTo(
        bottle,
        { y: 110, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "expo.out" }
      );
      gsap.fromTo(
        shadow,
        { scale: 0.6, opacity: 0.15 },
        { scale: 1, opacity: 0.65, duration: 0.6, ease: "expo.out" }
      );
      burstIngredients(ing);
    };

    // buttons
    slide
      .querySelector('[data-action="select"]')
      .addEventListener("click", () => setActive(i, true));
    slide.querySelector('[data-action="info"]').addEventListener("click", () => {
      setActive(i, false);
      document.getElementById("info").scrollIntoView({ behavior: "smooth" });
    });

    els.carouselTrack.appendChild(slide);
  });

  // highlight active
  setDotsActive(activeIndex);
}

function setDotsActive(index) {
  Array.from(els.dots.children).forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}

function scrollToSlide(index) {
  const slide = els.carouselTrack.querySelector(
    `.slide[data-index="${index}"]`
  );
  if (!slide) return;
  slide.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });
  setActive(index, true);
}

/* ---------- Info sections render ---------- */
function renderInfo() {
  clearNode(els.infoGrid);

  DATA.forEach((item) => {
    const card = document.createElement("div");
    card.className = "info-card";
    card.id = `section-${item.key}`;

    card.innerHTML = `
      <div class="info-card-inner">
        <div>
          <div class="badge">✨ ${item.label}</div>
          <h3 class="info-title">${item.moment}</h3>
          <p class="info-text">${item.longText}</p>
          <ul class="bullets">
            ${item.bullets.map((b) => `<li>${b}</li>`).join("")}
          </ul>
          <div class="slide-cta" style="margin-top:14px;">
            <button class="btn primary">Pre-order</button>
            <button class="btn">Find a store</button>
          </div>
        </div>

        <div class="slide-stage" data-theme="${item.key}">
          <div class="ground"></div>
          <img class="bottle" alt="${item.label} Bottle" />
          <div class="ingredients"></div>
          <div class="shadow"></div>
        </div>
      </div>
    `;

    const stage = card.querySelector(".slide-stage");
    const bottle = stage.querySelector(".bottle");
    const ing = stage.querySelector(".ingredients");
    const shadow = stage.querySelector(".shadow");

    bottle.src = item.bottle;
    layoutIngredients(ing, item.ingredients);

    // Scroll animation
    gsap.fromTo(
      bottle,
      { y: 120, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: card, start: "top 70%" },
      }
    );
    gsap.fromTo(
      shadow,
      { scale: 0.6, opacity: 0.15 },
      {
        scale: 1,
        opacity: 0.65,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: card, start: "top 70%" },
      }
    );
    ScrollTrigger.create({
      trigger: card,
      start: "top 70%",
      onEnter: () => burstIngredients(ing),
    });

    els.infoGrid.appendChild(card);
  });
}

/* ---------- Active selection ---------- */
function setActive(index, animateHero) {
  activeIndex = index;
  setDotsActive(index);
  updateHero(index, animateHero);

  const slide = els.carouselTrack.querySelector(
    `.slide[data-index="${index}"]`
  );
  if (slide && slide._animate) slide._animate();
}

/* ---------- Listen to carousel scroll (find centered slide) ---------- */
function bindCarouselObserver() {
  const slides = Array.from(els.carouselTrack.querySelectorAll(".slide"));
  const io = new IntersectionObserver(
    (entries) => {
      // take the most visible one
      const best = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!best) return;
      const idx = Number(best.target.dataset.index);
      if (!Number.isNaN(idx) && idx !== activeIndex) {
        setActive(idx, false);
      }
    },
    { root: els.carouselTrack, threshold: [0.55, 0.7, 0.85] }
  );

  slides.forEach((s) => io.observe(s));
}

/* ---------- Buttons ---------- */
els.btnChoose.addEventListener("click", () => {
  document.getElementById("carousel").scrollIntoView({ behavior: "smooth" });
});
els.btnGoSection.addEventListener("click", () => {
  document.getElementById("info").scrollIntoView({ behavior: "smooth" });
});
els.btnScrollInfo.addEventListener("click", () => {
  document.getElementById("carousel").scrollIntoView({ behavior: "smooth" });
});
els.btnScrollEnergy.addEventListener("click", () => {
  document.getElementById("carousel").scrollIntoView({ behavior: "smooth" });
});

/* ---------- Keyboard controls ---------- */
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    const next = Math.min(DATA.length - 1, activeIndex + 1);
    scrollToSlide(next);
  }
  if (e.key === "ArrowLeft") {
    const prev = Math.max(0, activeIndex - 1);
    scrollToSlide(prev);
  }
});

/* ---------- Init ---------- */
spawnParticles();
renderCarousel();
renderInfo();
updateHero(0, false);
bindCarouselObserver();

// Small entry animation
gsap.fromTo(
  ".hero-copy",
  { y: 16, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
);
gsap.fromTo(
  "#heroStage",
  { scale: 0.98, opacity: 0 },
  { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.05 }
);
