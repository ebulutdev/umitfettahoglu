/* ==========================================================
   Ümit Fettahoğlu — kaydırma sahneleri
   GSAP + ScrollTrigger + Lenis
   ========================================================== */
(() => {
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const formatNum = (n) => Math.round(n).toLocaleString("tr-TR");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasLibs = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const motion = hasLibs && !reduceMotion;

  const dropLoader = () => {
    document.body.classList.remove("is-loading");
    $(".loader")?.remove();
  };

  /* ---------- yumuşak kaydırma ---------- */
  let lenis = null;
  if (motion) {
    document.body.classList.add("motion");
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (typeof window.Lenis !== "undefined") {
      lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      lenis.stop();
    }
  }

  const scrollToTarget = (target) => {
    const el = document.querySelector(target);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.6 });
    else el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  };

  /* ---------- menü ---------- */
  const menu = $(".menu");
  const toggle = $(".nav__toggle");

  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    menu.setAttribute("aria-hidden", String(!open));
    menu.inert = !open;
    if (lenis) open ? lenis.stop() : lenis.start();
  };

  toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  $$("[data-scroll]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      if (document.body.classList.contains("menu-open")) setMenu(false);
      scrollToTarget(a.getAttribute("href"));
    });
  });

  /* ---------- imleç: tek dinleyici, olay delegasyonu ---------- */
  if (hasLibs && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.body.classList.add("has-cursor");
    const cursor = $(".cursor");
    const dot = $(".cursor__dot");
    const ring = $(".cursor__ring");
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12 });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12 });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3" });

    window.addEventListener("pointermove", (e) => {
      if (!cursor.classList.contains("is-visible")) {
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        cursor.classList.add("is-visible");
      }
      dotX(e.clientX); dotY(e.clientY); ringX(e.clientX); ringY(e.clientY);
    }, { passive: true });
    document.addEventListener("pointerleave", () => cursor.classList.remove("is-visible"));
    document.addEventListener("pointerover", (e) => {
      cursor.classList.toggle("is-hover", !!e.target.closest("a, button"));
    });
  }

  /* ---------- metin hazırlığı ---------- */
  $$(".section-title > span, .contact__title > span, .values__list > li").forEach((line) => {
    line.innerHTML = `<span class="line-inner">${line.innerHTML}</span>`;
  });
  $$("[data-words]").forEach((el) => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(" ");
  });

  if (!motion) {
    dropLoader();
    return;
  }

  /* ---------- açılış ---------- */
  const figure = $(".hero__figure");
  gsap.set(figure, { x: 0, xPercent: -50 });

  const intro = gsap.timeline({ paused: true });
  intro
    .to(".loader__bar i", { scaleX: 1, duration: 1.3, ease: "power2.inOut" })
    .to(".loader__inner", { autoAlpha: 0, y: -20, duration: 0.6, ease: "power2.in" })
    .to(".loader", { yPercent: -100, duration: 1.2, ease: "expo.inOut" })
    .from(".hero__bg", { scale: 1.25, duration: 2.4, ease: "expo.out" }, "-=0.9")
    .from(".hero__l1", { yPercent: 110, autoAlpha: 0, duration: 1.4, ease: "expo.out" }, "-=2.0")
    .from(".hero__l2", { yPercent: 60, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, "-=1.25")
    .from(figure, { yPercent: 18, autoAlpha: 0, duration: 1.8, ease: "expo.out" }, "-=1.4")
    .from([".hero__meta > *", ".hero__scroll > *", ".nav"], { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08, ease: "power3.out" }, "-=1.1")
    .add(() => {
      dropLoader();
      lenis?.start();
      ScrollTrigger.refresh();
    });

  let introStarted = false;
  const startIntro = () => {
    if (introStarted) return;
    introStarted = true;
    intro.play();
  };
  if (document.readyState === "complete") startIntro();
  else {
    window.addEventListener("load", startIntro, { once: true });
    setTimeout(startIntro, 3500); // yavaş bağlantıda perdeyi sonsuza kadar tutma
  }

  /* ---------- I. Hero: kamera geri çekilir, perde iner ---------- */
  gsap.timeline({
    scrollTrigger: { trigger: ".hero", start: "top top", end: "+=150%", scrub: 1, pin: true, anticipatePin: 1 },
  })
    .to(".hero__bg img", { scale: 1.0, yPercent: 6, ease: "none" }, 0)
    .to(".hero__l1", { xPercent: -42, ease: "none" }, 0)
    .to(".hero__l2", { xPercent: 26, ease: "none" }, 0)
    .to(".hero__stage", { scale: 1.14, yPercent: 4, ease: "none" }, 0)
    // Unvan, perde inene kadar sahnede kalır ve perdeyle birlikte çekilir
    .to(".hero__scroll", { autoAlpha: 0, ease: "none", duration: 0.15 }, 0)
    .to(".hero__meta", { autoAlpha: 0, y: -30, ease: "power1.in", duration: 0.2 }, 0.42)
    .to(".hero__curtain", { clipPath: "inset(0% 0 0 0)", ease: "power2.inOut", duration: 0.45 }, 0.55);

  /* Üst üste binen paneller: bölüm sonunda sabitlenir, sonraki bölüm
     üstünden geçerken geri çekilip kararır. Boşluk eklemez (pinSpacing: false),
     böylece doğal kaydırma ritmi bozulmaz. */
  const stack = (section, inner, next) => {
    ScrollTrigger.create({
      trigger: section,
      start: "bottom bottom",
      endTrigger: next,
      end: "top top",
      pin: true,
      pinSpacing: false,
    });
    gsap.to(inner, {
      scale: 0.94,
      opacity: 0.2,
      yPercent: -3,
      ease: "none",
      scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
    });
  };

  /* ---------- II. Manifesto: ekrana girerken kelime kelime aydınlanır ---------- */
  gsap.to(".manifesto__quote .w", {
    opacity: 1,
    stagger: 0.12,
    ease: "none",
    scrollTrigger: { trigger: ".manifesto", start: "top 80%", end: "top 5%", scrub: 1 },
  });
  gsap.from(".manifesto__sign", {
    autoAlpha: 0,
    x: -30,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: { trigger: ".manifesto", start: "top 10%" },
  });
  stack(".manifesto", ".manifesto__inner", ".bio");

  const mm = gsap.matchMedia();

  /* ---------- III. Biyografi: sabitlenmiş üç bölüm ---------- */
  const archFigure = $(".arch__figure");
  gsap.set(archFigure, { x: 0, xPercent: -50 });

  mm.add("(min-width: 901px)", () => {
    const chapters = $$(".chapter");
    const current = $(".bio__current");
    let shown = 0;
    gsap.set(chapters.slice(1), { autoAlpha: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".bio",
        start: "top top",
        end: "+=240%",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const i = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length * 0.999));
          if (i !== shown) {
            shown = i;
            current.textContent = String(i + 1).padStart(2, "0");
          }
        },
      },
    });

    tl.fromTo(".arch", { clipPath: "inset(18% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", ease: "none", duration: 1 }, 0)
      .to(".arch__bg", { scale: 1, ease: "none", duration: 3 }, 0)
      .fromTo(archFigure, { yPercent: 10, scale: 0.94 }, { yPercent: 0, scale: 1.02, ease: "none", duration: 3 }, 0)
      .to(".bio__progress b", { scaleX: 1, ease: "none", duration: 3 }, 0);

    chapters.forEach((ch, i) => {
      if (i === 0) return;
      // Önceki bölüm tamamen çıkmadan yenisi girmez: metinler üst üste binmez
      tl.to(chapters[i - 1], { autoAlpha: 0, y: -40, duration: 0.25, ease: "power2.in" }, i - 0.3)
        .to(ch, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, i);
    });

    return () => {
      current.textContent = "01";
    };
  });

  mm.add("(max-width: 900px)", () => {
    $$(".chapter").forEach((ch) => {
      gsap.from(ch, { y: 50, autoAlpha: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ch, start: "top 85%" } });
    });
    gsap.from(".arch", { clipPath: "inset(30% 0 0 0)", duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: ".arch", start: "top 85%" } });
  });

  /* ---------- IV. Rakamlar ---------- */
  gsap.fromTo(".stats__bg", { yPercent: -10 }, {
    yPercent: 10,
    ease: "none",
    scrollTrigger: { trigger: ".stats", start: "top bottom", end: "bottom top", scrub: true },
  });

  $$(".stat__num").forEach((el) => {
    const target = +el.dataset.to;
    const suffix = el.dataset.suffix ? `<small>${el.dataset.suffix}</small>` : "";
    const counter = { v: 0 };
    el.innerHTML = "0" + suffix;
    gsap.to(counter, {
      v: target,
      duration: 2.4,
      ease: "power3.out",
      onUpdate: () => (el.innerHTML = formatNum(counter.v) + suffix),
      scrollTrigger: { trigger: ".stats__grid", start: "top 82%", once: true },
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

  // Arka plan görseli bir objektif diyaframı gibi açılır
  gsap.fromTo(".stats__bg", { clipPath: "inset(16% 12% 16% 12%)" }, {
    clipPath: "inset(0% 0% 0% 0%)",
    ease: "none",
    scrollTrigger: { trigger: ".stats", start: "top bottom", end: "top 10%", scrub: true },
  });
  stack(".stats", ".stats__inner", ".projects");

  /* ---------- V. Projeler: yatay sahne ---------- */
  mm.add("(min-width: 901px)", () => {
    const track = $(".projects__track");
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const count = $(".projects__count");
    const bar = $(".projects__progress b");
    const total = $$(".pcard").length;
    let shownCard = 1;

    const move = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".projects",
        start: "top top",
        end: () => "+=" + distance(),
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          bar.style.transform = `scaleX(${self.progress})`;
          const i = Math.min(total, Math.floor(self.progress * total) + 1);
          if (i !== shownCard) {
            shownCard = i;
            count.textContent = String(i).padStart(2, "0");
          }
        },
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
        scrollTrigger: { trigger: m, start: "top 88%" },
      });
    });
  });

  /* ---------- VI. Sahne: kare genişleyerek tam ekran olur ---------- */
  mm.add({ desktop: "(min-width: 901px)", mobile: "(max-width: 900px)" }, (ctx) => {
    const from = ctx.conditions.desktop ? "inset(24% 32% 24% 32%)" : "inset(18% 10% 18% 10%)";
    gsap.timeline({
      scrollTrigger: { trigger: ".scene", start: "top top", end: "+=120%", scrub: 1, pin: true },
    })
      .fromTo(".scene__frame", { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
      .fromTo(".scene__frame img", { scale: 1.35 }, { scale: 1, ease: "none" }, 0)
      .fromTo(".scene__year", { yPercent: 30, autoAlpha: 0.2 }, { yPercent: -10, autoAlpha: 1, ease: "none" }, 0)
      .fromTo(".scene__caption p", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, ease: "none", duration: 0.4 }, 0.55);
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
  gsap.from(".brands li", {
    y: 24,
    autoAlpha: 0,
    stagger: 0.1,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: { trigger: ".brands", start: "top 90%" },
  });
  gsap.from(".group__lead", {
    y: 30, autoAlpha: 0, duration: 1.2, ease: "expo.out",
    scrollTrigger: { trigger: ".group__lead", start: "top 88%" },
  });

  /* ---------- VIII. İlkeler: iletişim paneli üstünden geçer ---------- */
  stack(".values", ".values__inner", ".contact");

  /* ---------- IX. İletişim ---------- */
  gsap.from(".contact__grid > div", {
    y: 30,
    autoAlpha: 0,
    stagger: 0.08,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: { trigger: ".contact__grid", start: "top 92%" },
  });

  /* ---------- Bölüm başlıkları: maskeli satır açılışı ----------
     Sabitlenen sahnelerden sonra oluşturulur ki başlangıç noktaları
     pin boşluklarını hesaba katsın. */
  $$(".section-title, .contact__title, .values__list").forEach((title) => {
    gsap.from($$(".line-inner", title), {
      yPercent: 110,
      duration: 1.4,
      stagger: 0.12,
      ease: "expo.out",
      scrollTrigger: { trigger: title, start: "top 85%" },
    });
  });

  /* ---------- Editoryal künye: hangi bölümde olduğunu gösterir ---------- */
  const index = $(".chapter-index");
  const idxText = [$(".chapter-index__no b"), $(".chapter-index__label b")];
  let currentChapter = null;
  const setChapter = (sec) => {
    const no = sec ? sec.dataset.chapter : null;
    if (no === currentChapter) return;
    currentChapter = no;
    index.classList.toggle("is-visible", !!sec);
    if (!sec) return;
    gsap.killTweensOf(idxText);
    gsap.timeline()
      .to(idxText, { yPercent: -110, duration: 0.25, ease: "power2.in" })
      .add(() => {
        idxText[0].textContent = no;
        idxText[1].textContent = sec.dataset.chapterLabel;
      })
      .fromTo(idxText, { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.05, ease: "expo.out" });
  };
  $$("[data-chapter]").forEach((sec, i) => {
    ScrollTrigger.create({
      trigger: sec,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => setChapter(sec),
      onEnterBack: () => setChapter(sec),
      onLeaveBack: i === 0 ? () => setChapter(null) : undefined,
    });
  });
  // Sayfa sonunda künye, alt bilgi satırıyla çakışmasın
  ScrollTrigger.create({
    trigger: ".contact__bottom",
    start: "top bottom",
    onToggle: (self) => index.classList.toggle("is-muted", self.isActive),
  });

  /* ---------- Sayfa ilerleme çizgisi ---------- */
  gsap.to(".progress i", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

  /* ---------- Menü: aşağı kaydırırken çekilir, yukarı kaydırırken döner ---------- */
  const nav = $(".nav");
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const hide = self.direction === 1 && self.scroll() > 240;
      if (hide !== nav.classList.contains("is-hidden")) nav.classList.toggle("is-hidden", hide);
    },
  });

  // Web fontları yüklenince satır yükseklikleri değişir: tetik noktalarını yeniden hesapla
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
