/* ==========================================================
   Ümit Fettahoğlu — kaydırma sahneleri
   GSAP + ScrollTrigger + Lenis
   ========================================================== */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- yumuşak kaydırma ---------- */
  let lenis = null;
  if (!reduceMotion) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  const scrollToTarget = (target) => {
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else document.querySelector(target)?.scrollIntoView();
  };

  $$("[data-scroll]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.remove("menu-open");
      $(".nav__toggle").setAttribute("aria-expanded", "false");
      scrollToTarget(a.getAttribute("href"));
    });
  });

  $(".nav__toggle").addEventListener("click", (e) => {
    const open = document.body.classList.toggle("menu-open");
    e.currentTarget.setAttribute("aria-expanded", String(open));
    if (lenis) open ? lenis.stop() : lenis.start();
  });

  /* ---------- imleç ---------- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const cursor = $(".cursor");
    const dot = $(".cursor__dot");
    const ring = $(".cursor__ring");
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12 });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12 });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });
    window.addEventListener("pointermove", (e) => {
      dotX(e.clientX); dotY(e.clientY); ringX(e.clientX); ringY(e.clientY);
    });
    $$("a, button, .pcard").forEach((el) => {
      el.addEventListener("pointerenter", () => cursor.classList.add("is-hover"));
      el.addEventListener("pointerleave", () => cursor.classList.remove("is-hover"));
    });
  }

  /* ---------- metin hazırlığı ---------- */
  // Başlık satırlarını maskeli açılış için sar
  $$(".section-title span, .contact__title span").forEach((line) => {
    line.innerHTML = `<span class="line-inner">${line.innerHTML}</span>`;
  });
  // Manifesto kelimelerini ayır
  $$("[data-words]").forEach((el) => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(" ");
  });

  if (reduceMotion) {
    document.body.classList.remove("is-loading");
    $(".loader").remove();
    $$(".stat__num").forEach((el) => {
      const suffix = el.dataset.suffix ? `<small>${el.dataset.suffix.trim()}</small>` : "";
      el.innerHTML = formatNum(+el.dataset.to) + suffix;
    });
    return;
  }

  /* ---------- açılış ---------- */
  const intro = gsap.timeline({ paused: true });
  intro
    .to(".loader__bar i", { scaleX: 1, duration: 1.4, ease: "power2.inOut" })
    .to(".loader__inner", { autoAlpha: 0, y: -20, duration: 0.6, ease: "power2.in" })
    .to(".loader", { yPercent: -100, duration: 1.2, ease: "expo.inOut" })
    .from(".hero__bg img", { scale: 1.45, duration: 2.4, ease: "expo.out" }, "-=0.9")
    .from(".hero__l1", { yPercent: 110, autoAlpha: 0, duration: 1.4, ease: "expo.out" }, "-=2.0")
    .from(".hero__l2", { yPercent: 60, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, "-=1.25")
    .from(".hero__figure", { yPercent: 18, autoAlpha: 0, duration: 1.8, ease: "expo.out" }, "-=1.4")
    .from([".hero__meta", ".hero__scroll", ".nav"], { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08, ease: "power3.out" }, "-=1.1")
    .add(() => {
      document.body.classList.remove("is-loading");
      $(".loader").remove();
      lenis.start();
      ScrollTrigger.refresh();
    });

  const startIntro = () => intro.play();
  if (document.readyState === "complete") startIntro();
  else window.addEventListener("load", startIntro, { once: true });

  /* ---------- I. Hero: kamera geri çekilir, perde iner ---------- */
  gsap.timeline({
    scrollTrigger: { trigger: ".hero", start: "top top", end: "+=160%", scrub: 1, pin: true, anticipatePin: 1 },
  })
    .to(".hero__bg img", { scale: 1.0, yPercent: 6, ease: "none" }, 0)
    .to(".hero__l1", { xPercent: -42, ease: "none" }, 0)
    .to(".hero__l2", { xPercent: 26, ease: "none" }, 0)
    .to(".hero__figure", { scale: 1.14, yPercent: 4, ease: "none" }, 0)
    .to([".hero__meta", ".hero__scroll"], { autoAlpha: 0, y: -40, ease: "none", duration: 0.3 }, 0)
    .to(".hero__curtain", { clipPath: "inset(0% 0 0 0)", ease: "power2.inOut", duration: 0.45 }, 0.55);

  /* ---------- II. Manifesto: kelime kelime aydınlanır ---------- */
  gsap.to(".manifesto__quote .w", {
    opacity: 1,
    stagger: 0.12,
    ease: "none",
    scrollTrigger: { trigger: ".manifesto", start: "top top", end: "+=110%", scrub: 1, pin: true },
  });

  const mm = gsap.matchMedia();

  /* ---------- III. Biyografi: sabitlenmiş üç bölüm ---------- */
  mm.add("(min-width: 901px)", () => {
    const chapters = $$(".chapter");
    const current = $(".bio__current");
    gsap.set(chapters.slice(1), { autoAlpha: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".bio",
        start: "top top",
        end: "+=260%",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const i = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length * 0.999));
          current.textContent = String(i + 1).padStart(2, "0");
        },
      },
    });

    tl.fromTo(".arch", { clipPath: "inset(18% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", ease: "none", duration: 1 }, 0)
      .to(".arch__bg", { scale: 1, ease: "none", duration: 3 }, 0)
      .fromTo(".arch__figure", { yPercent: 10, scale: 0.94 }, { yPercent: 0, scale: 1.02, ease: "none", duration: 3 }, 0)
      .to(".bio__progress b", { scaleX: 1, ease: "none", duration: 3 }, 0);

    chapters.forEach((ch, i) => {
      if (i === 0) return;
      const at = i * 1;
      tl.to(chapters[i - 1], { autoAlpha: 0, y: -50, duration: 0.35, ease: "power2.in" }, at - 0.2)
        .to(ch, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, at + 0.1);
    });
  });

  mm.add("(max-width: 900px)", () => {
    $$(".chapter").forEach((ch) => {
      gsap.from(ch, { y: 50, autoAlpha: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ch, start: "top 85%" } });
    });
    gsap.from(".arch", { clipPath: "inset(30% 0 0 0)", duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: ".arch", start: "top 85%" } });
  });

  /* ---------- IV. Rakamlar ---------- */
  function formatNum(n) {
    return Math.round(n).toLocaleString("tr-TR");
  }

  gsap.fromTo(".stats__bg", { yPercent: -10 }, {
    yPercent: 10,
    ease: "none",
    scrollTrigger: { trigger: ".stats", start: "top bottom", end: "bottom top", scrub: true },
  });

  $$(".stat__num").forEach((el) => {
    const target = +el.dataset.to;
    const suffix = el.dataset.suffix ? `<small>${el.dataset.suffix.trim()}</small>` : "";
    const counter = { v: 0 };
    gsap.to(counter, {
      v: target,
      duration: 2.4,
      ease: "power3.out",
      onUpdate: () => (el.innerHTML = formatNum(counter.v) + suffix),
      scrollTrigger: { trigger: ".stats__grid", start: "top 82%" },
    });
  });

  gsap.from(".stat", {
    y: 40,
    autoAlpha: 0,
    stagger: 0.12,
    duration: 1.3,
    ease: "expo.out",
    scrollTrigger: { trigger: ".stats__grid", start: "top 85%" },
  });

  /* ---------- V. Projeler: yatay sahne ---------- */
  mm.add("(min-width: 901px)", () => {
    const track = $(".projects__track");
    const distance = () => track.scrollWidth - window.innerWidth;

    const move = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".projects",
        start: "top top",
        end: () => "+=" + distance(),
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    $$(".pcard").forEach((card) => {
      gsap.fromTo($(".pcard__media img", card), { xPercent: -7 }, {
        xPercent: 7,
        ease: "none",
        scrollTrigger: { trigger: card, containerAnimation: move, start: "left right", end: "right left", scrub: true },
      });
      gsap.fromTo($(".pcard__media", card), { clipPath: "inset(0 0 0 100%)" }, {
        clipPath: "inset(0 0 0 0%)",
        ease: "none",
        scrollTrigger: { trigger: card, containerAnimation: move, start: "left 100%", end: "left 55%", scrub: true },
      });
    });
  });

  mm.add("(max-width: 900px)", () => {
    $$(".pcard__media").forEach((m) => {
      gsap.fromTo(m, { clipPath: "inset(0 0 100% 0)" }, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: m, start: "top 85%" },
      });
    });
  });

  /* ---------- VI. Sahne: kare genişleyerek tam ekran olur ---------- */
  mm.add({ desktop: "(min-width: 901px)", mobile: "(max-width: 900px)" }, (ctx) => {
    const from = ctx.conditions.desktop ? "inset(24% 32% 24% 32%)" : "inset(18% 10% 18% 10%)";
    gsap.timeline({
      scrollTrigger: { trigger: ".scene", start: "top top", end: "+=130%", scrub: 1, pin: true },
    })
      .fromTo(".scene__frame", { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
      .fromTo(".scene__frame img", { scale: 1.35 }, { scale: 1, ease: "none" }, 0)
      .fromTo(".scene__year", { yPercent: 30, autoAlpha: 0.2 }, { yPercent: -10, autoAlpha: 1, ease: "none" }, 0)
      .from(".scene__caption p", { autoAlpha: 0, y: 30, ease: "none", duration: 0.4 }, 0.55);
  });

  /* ---------- VII. Grup ---------- */
  gsap.from(".sectors li", {
    y: 50,
    autoAlpha: 0,
    stagger: 0.09,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: { trigger: ".sectors", start: "top 82%" },
  });
  gsap.from(".brands img", {
    y: 24,
    autoAlpha: 0,
    stagger: 0.1,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: { trigger: ".brands", start: "top 88%" },
  });
  gsap.from(".group__lead", {
    y: 30, autoAlpha: 0, duration: 1.2, ease: "expo.out",
    scrollTrigger: { trigger: ".group__lead", start: "top 88%" },
  });

  /* ---------- IX. İletişim ---------- */
  gsap.from(".contact__grid > div", {
    y: 30,
    autoAlpha: 0,
    stagger: 0.08,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: { trigger: ".contact__grid", start: "top 90%" },
  });

  /* ---------- Bölüm başlıkları: maskeli satır açılışı ----------
     Sabitlenen sahnelerden sonra oluşturulur ki başlangıç noktaları
     pin boşluklarını hesaba katsın. */
  $$(".section-title, .contact__title").forEach((title) => {
    gsap.from($$(".line-inner", title), {
      yPercent: 110,
      duration: 1.3,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: { trigger: title, start: "top 85%" },
    });
  });

  $$("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      y: 60,
      autoAlpha: 0,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
