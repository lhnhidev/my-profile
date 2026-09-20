// Classic script (not type="module") so it also works when index.html is opened via file://
(function () {
  const GH = "https://github.com/lhnhidev/";
  const t = (l, key) => (I18N[l] && I18N[l][key]) || key;
  let lang = "vi";
  try { lang = localStorage.getItem("lang") || (navigator.language.startsWith("vi") ? "vi" : navigator.language.startsWith("ja") ? "ja" : "en"); } catch (e) {}

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const ico = (k, cls = "ico") => {
    const p = ICONS[String(k).toLowerCase()];
    return p ? `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${p}</svg>` : "";
  };
  const chip = (name, cls = "") => `<span class="chip ${cls}">${ico(name)}${name}</span>`;

  function renderDynamic() {
    const ROLE_IMG = "https://media.valorant-api.com/agents/roles/";
    $("#skillGrid").innerHTML = SKILLS.map(g => `
      <div class="card" data-reveal>
        <img class="role-ico" src="${ROLE_IMG}${g.role}/displayicon.png" alt="" loading="lazy" />
        <h3 class="mb-4">${t(lang, g.key)}</h3>
        <div class="flex flex-wrap gap-2">${g.items.map(i => chip(i)).join("")}</div>
      </div>`).join("") + `
      <div class="card" data-reveal>
        <h3 class="mb-4">${t(lang, "skills.badges")}</h3>
        <div class="flex flex-wrap gap-2">${BADGES.map(i => chip(i, "chip-lang")).join("")}</div>
      </div>`;

    $("#langBars").innerHTML = LANGS.map(l => `
      <div data-reveal>
        <div class="flex justify-between font-display tracking-widest uppercase text-sm mb-1">
          <span>${l.name}</span><span class="text-val-red">${l.n} ${t(lang, "skills.repos")}</span>
        </div>
        <div class="bar"><i data-w="${Math.round(l.n / LANGS[0].n * 100)}"></i></div>
      </div>`).join("");

    $("#expList").innerHTML = EXPERIENCE.map(e => `
      <li class="tl-item ${e.current ? "tl-current" : ""}" data-reveal>
        ${e.logo ? `<span class="logo-tile tl-logo"><img src="assets/${e.logo}.png" alt="${e[lang].org}" loading="lazy" /></span>` : ""}
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span class="tl-year">${e.period[lang]}</span>
          ${e.current ? `<span class="badge-live">${t(lang, "exp.current")}</span>` : ""}
          ${e.mode ? `<span class="text-xs tracking-widest uppercase text-val-cream/45">${t(lang, "exp." + e.mode)}</span>` : ""}
        </div>
        <h4 class="font-display text-2xl md:text-3xl uppercase tracking-wide mt-1">${e[lang].role}</h4>
        <p class="text-val-red font-display tracking-widest uppercase text-sm">${e[lang].org}</p>
        <ul class="mt-3 space-y-1.5 text-sm text-val-cream/70 leading-relaxed">${e[lang].points.map(p => `<li class="pt">${p}</li>`).join("")}</ul>
        <div class="flex flex-wrap gap-2 mt-4">${e.tags.map(x => chip(x)).join("")}</div>
      </li>`).join("");

    $("#eduCard").innerHTML = `
      <div class="card edu" data-reveal>
        <span class="logo-tile tl-logo"><img src="assets/ctu.png" alt="${t(lang, "edu.school")}" loading="lazy" /></span>
        <h3 class="sub-title !text-2xl mb-3">${t(lang, "edu.title")}</h3>
        <p class="font-display text-2xl uppercase tracking-wide">${t(lang, "edu.school")}</p>
        <p class="text-val-cream/65 mt-1">${t(lang, "edu.major")}</p>
        <p class="text-xs tracking-widest uppercase text-val-cream/45 mt-1">${t(lang, "edu.years")}</p>
        <div class="mt-6 flex items-end gap-3">
          <span class="font-display font-bold text-7xl leading-none text-val-red">3.83</span>
          <span class="font-display tracking-widest text-val-cream/50 pb-2">/ 4.0 ${t(lang, "edu.gpa")}</span>
        </div>
      </div>`;

    $("#contactGrid").innerHTML = CONTACTS.map(c => `
      <a class="contact ${c.primary ? "contact-primary" : ""}" href="${c.href}" target="_blank" rel="noopener" data-reveal>
        <span class="contact-ico">${ico(c.icon, "ico-lg")}</span>
        <span class="min-w-0 flex flex-col">
          <span class="text-xs tracking-[.25em] uppercase ${c.primary ? "text-white/80" : "text-val-cream/50"}">${c.label || t(lang, c.key)}</span>
          <b class="font-display text-xl tracking-wide break-all">${c.value} ↗</b>
        </span>
      </a>`).join("");

    $("#projectGrid").innerHTML = PROJECTS.map((p, i) => `
      <article class="card proj" data-reveal>
        <span class="proj-no">${String(i + 1).padStart(2, "0")}</span>
        <div class="flex items-start justify-between gap-3 relative">
          <h3>${p.name}</h3>
          <span class="chip chip-lang shrink-0">${p.lang}</span>
        </div>
        <p class="text-sm text-val-cream/65 leading-relaxed mt-3 flex-1 relative">${p[lang]}</p>
        <div class="flex gap-5 mt-5 font-display tracking-widest uppercase text-sm relative">
          ${p.live ? `<a class="text-val-red hover:underline" href="${p.live}" target="_blank" rel="noopener">${t(lang, "projects.live")} ↗</a>` : ""}
          <a class="text-val-cream/70 hover:text-val-cream hover:underline" href="${GH + p.repo}" target="_blank" rel="noopener">${t(lang, "projects.code")} ↗</a>
        </div>
      </article>`).join("");

    $("#ticker").innerHTML = [0, 1].map(() => `<div class="ticker-row">${TICKER.map(x => `<span>${x}</span>`).join("")}</div>`).join("");
  }

  function applyLang(next) {
    lang = next;
    try { localStorage.setItem("lang", lang); } catch (e) {}
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(el => { el.textContent = t(lang, el.dataset.i18n); });
    $$("[data-i18n-aria]").forEach(el => { el.setAttribute("aria-label", t(lang, el.dataset.i18nAria)); });
    $$("[data-mark-i18n]").forEach(el => { el.dataset.mark = t(lang, el.dataset.markI18n); });
    $$(".lang-btn").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
    renderDynamic();
    document.dispatchEvent(new CustomEvent("dynamic-rendered"));
  }

  $$(".lang-btn").forEach(b => b.addEventListener("click", () => applyLang(b.dataset.lang)));
  $("#year").textContent = new Date().getFullYear();

  const menu = $("#mobileMenu");
  $("#menuBtn").addEventListener("click", () => { menu.classList.toggle("hidden"); menu.classList.toggle("flex"); });
  $$("a", menu).forEach(a => a.addEventListener("click", () => { menu.classList.add("hidden"); menu.classList.remove("flex"); }));

  // Header shadow + progress bar on scroll
  const header = $("header"), progress = $("#progress");
  addEventListener("scroll", () => {
    const h = document.documentElement;
    progress.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`;
    header.classList.toggle("scrolled", h.scrollTop > 20);
  }, { passive: true });

  applyLang(lang);

  // ---- Background videos (Riot's own skin showcase clips, looped as 4-5s segments) ----
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const desktop = matchMedia("(min-width: 768px)");
  const videos = $$("video[data-src]").filter(v => !(v.hasAttribute("data-desktop-only") && !desktop.matches));
  const segOf = v => (v.dataset.t || "0,4").split(",").map(Number);

  function syncVideo(v) {
    if (reduced || saveData) return;
    const on = v._vis && v._on !== false && !document.hidden;
    if (on) {
      if (!v.src) {
        v.src = v.dataset.src;
        v.addEventListener("loadedmetadata", () => { v.currentTime = segOf(v)[0]; }, { once: true });
      }
      v.play().then(() => v.classList.add("is-on")).catch(() => {});
    } else {
      v.pause();
      if (v._on === false || !v._vis) v.classList.remove("is-on");
    }
  }

  if (!reduced && !saveData) {
    const io = new IntersectionObserver(es => es.forEach(e => { e.target._vis = e.isIntersecting; syncVideo(e.target); }), { rootMargin: "200px" });
    videos.forEach(v => { if (v.hasAttribute("data-pinned")) v._on = false; io.observe(v); });
    document.addEventListener("visibilitychange", () => videos.forEach(syncVideo));
    // Keep each clip inside its 4-5s segment
    const loop = () => {
      videos.forEach(v => { if (!v.paused) { const [a, b] = segOf(v); if (v.currentTime >= b || v.currentTime < a - .3) v.currentTime = a; } });
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }


  // ---- Music player (header disc) ----
  (function initPlayer() {
    const box = $("#player"), btn = $("#discBtn"), pop = $("#playerPop"), list = $("#trackList");
    const toggle = $("#playToggle"), vol = $("#vol"), note = $("#playerNote");
    if (!box || !window.TRACKS) return;
    const audio = new Audio();
    audio.preload = "auto";
    audio.volume = +vol.value;
    let cur = 0, userPaused = false, autoStartedAt = 0;

    list.innerHTML = TRACKS.map((tr, i) => `
      <li><button class="tr-item" data-i="${i}"><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span><b>${tr.title}</b></button></li>`).join("");
    const items = $$(".tr-item", list);

    function ui() {
      const playing = !audio.paused;
      box.classList.toggle("playing", playing);
      items.forEach((b, i) => b.classList.toggle("is-active", i === cur));
      $$(".track").forEach(el => el.classList.toggle("is-current", +el.dataset.track === cur && playing));
      toggle.classList.toggle("is-playing", playing);
    }
    function load(i) {
      cur = i;
      audio.src = TRACKS[i].src;
      note.classList.add("hidden");
      if ("mediaSession" in navigator) navigator.mediaSession.metadata = new MediaMetadata({ title: TRACKS[i].title });
    }
    let mutedAuto = false;
    function unmute() { audio.muted = false; mutedAuto = false; box.classList.remove("blocked"); }
    function play() {
      return audio.play().then(() => { if (!audio.muted) box.classList.remove("blocked"); ui(); }).catch(err => {
        if (err && err.name === "NotAllowedError" && !audio.muted) {
          // Browsers allow muted autoplay: start silently now, unmute on the visitor's first gesture
          audio.muted = true;
          return audio.play().then(() => { mutedAuto = true; box.classList.add("blocked"); ui(); })
            .catch(() => { audio.muted = false; box.classList.add("blocked"); ui(); });
        }
        ui();
      });
    }
    function select(i) {
      unmute();
      if (i !== cur || !audio.src) load(i);
      userPaused = false;
      play();
      ui();
    }
    // Playlist order: 3 STRIKES -> Bye -> 3 STRIKES -> ...
    audio.addEventListener("ended", () => { load((cur + 1) % TRACKS.length); play(); });
    audio.addEventListener("error", () => { audio.pause(); note.classList.remove("hidden"); box.classList.remove("blocked"); ui(); });
    audio.addEventListener("play", ui);
    audio.addEventListener("pause", ui);

    // Disc opens / closes the track menu
    const setOpen = o => { pop.hidden = !o; btn.setAttribute("aria-expanded", o); };
    btn.addEventListener("click", e => { e.stopPropagation(); setOpen(pop.hidden); });
    pop.addEventListener("click", e => e.stopPropagation());
    document.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });

    items.forEach(b => b.addEventListener("click", () => select(+b.dataset.i)));
    $$(".track[data-track]").forEach(el => { el.addEventListener("click", () => select(+el.dataset.track)); });
    toggle.addEventListener("click", () => {
      if (performance.now() - autoStartedAt < 500) return;   // same click already started playback
      if (audio.paused) { unmute(); userPaused = false; play(); } else if (mutedAuto) { unmute(); } else { userPaused = true; audio.pause(); }
    });
    vol.addEventListener("input", () => { audio.volume = +vol.value; });

    // Default: start with track 0 as soon as the page opens. Browsers only allow sound after a user gesture, so the
    // first click / tap / key press anywhere on the page "clicks" the disc: it starts (or unmutes) the music.
    load(0);
    play().then(() => {
      if (!audio.paused && !mutedAuto) return;
      const evs = ["pointerdown", "mousedown", "click", "touchend", "keydown"];
      const kick = () => {
        autoStartedAt = performance.now();
        if (mutedAuto) unmute();
        if (!userPaused && audio.paused) play();
        // stop listening only once the music is really audible
        if (!audio.paused && !audio.muted) evs.forEach(ev => document.removeEventListener(ev, kick, true));
      };
      evs.forEach(ev => document.addEventListener(ev, kick, true));
    });
    ui();
  })();

  // ---- Hobbies: scroll pinning (sticky stage, scroll progress drives the active panel) ----
  (function initHobbies() {
    const sec = $("#hobbies");
    if (!sec) return;
    const panels = $$(".hobby", sec), bgs = $$(".hobby-bg", sec), nodes = $$(".rail-node", sec);
    const fill = $("#hobbyFill"), no = $("#hobbyNo"), N = panels.length;
    let cur = -1;

    function setActive(i) {
      cur = i;
      sec.dataset.cur = i;
      panels.forEach((p, k) => { p.classList.toggle("is-active", k === i); p.classList.toggle("is-past", k < i); });
      bgs.forEach((b, k) => b.classList.toggle("is-active", k <= i));
      nodes.forEach((n, k) => n.classList.toggle("is-active", k === i));
      no.textContent = String(i + 1).padStart(2, "0");
      bgs.forEach((b, k) => { const v = $("video", b); if (v) { v._on = k === i; syncVideo(v); } });
    }

    function update() {
      const r = sec.getBoundingClientRect(), total = sec.offsetHeight - innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
      const i = Math.min(N - 1, Math.floor(p * N));
      const lp = p * N - i;
      sec.style.setProperty("--p", p.toFixed(4));
      sec.style.setProperty("--lp", Math.min(1, lp).toFixed(4));
      fill.style.transform = `scaleX(${p})`;
      if (i !== cur) setActive(i);
    }

    // Rail buttons scroll to the middle of that panel's slice
    nodes.forEach((n, k) => n.addEventListener("click", () => {
      const total = sec.offsetHeight - innerHeight;
      scrollTo({ top: sec.offsetTop + total * ((k + .5) / N), behavior: reduced ? "auto" : "smooth" });
    }));

    let ticking = false;
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; update(); }); } };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    update();
    setActive(Math.max(0, cur));
  })();

  const fmt = (el, v) => (+v).toFixed(+el.dataset.dec || 0);
  const setCounts = () => $$("[data-count]").forEach(el => { el.textContent = el.dataset.count; });
  const setBars = () => $$(".bar i").forEach(el => { el.style.width = el.dataset.w + "%"; });

  if (reduced) { setCounts(); setBars(); return; }

  // Animation with Motion (Framer Motion's vanilla engine). If the CDN fails, everything stays visible.
  import("https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm").then(({ animate, inView, stagger }) => {
    const seen = new WeakSet();
    const setupReveal = () => {
      $$("[data-reveal]").forEach((el, i) => {
        if (seen.has(el)) return;
        seen.add(el);
        el.style.opacity = 0;
        inView(el, () => {
          animate(el, { opacity: 1, y: [28, 0] }, { duration: 0.6, delay: (i % 4) * 0.07, ease: "easeOut" });
          const bar = $(".bar i", el);
          if (bar) animate(bar, { width: bar.dataset.w + "%" }, { duration: 1.1, ease: "easeOut" });
        }, { margin: "0px 0px -8% 0px" });
      });
    };
    setupReveal();
    document.addEventListener("dynamic-rendered", setupReveal);

    // Hero intro
    animate("[data-hero-art]", { x: [80, 0], scale: [1.05, 1] }, { duration: 1, ease: "easeOut" });
    animate(".hero-word", { opacity: [0, 1], x: [-60, 0] }, { duration: 1.2, ease: "easeOut" });
    $$("[data-count]").forEach(el => {
      animate(0, +el.dataset.count, { duration: 1.6, ease: "easeOut", onUpdate: v => { el.textContent = fmt(el, v); } });
    });

    // Mouse parallax on hero art / big word
    const hero = $("#home"), art = $("[data-hero-art]"), word = $(".hero-word");
    hero.addEventListener("mousemove", e => {
      const x = (e.clientX / innerWidth - 0.5), y = (e.clientY / innerHeight - 0.5);
      art.style.translate = `${x * -24}px ${y * -14}px`;
      word.style.translate = `${x * 30}px ${y * 18}px`;
    });

    // Rotating role text
    const roleEl = $("#rotator");
    let ri = 0;
    setInterval(() => {
      ri = (ri + 1) % ROLES.length;
      animate(roleEl, { opacity: [1, 0], y: [0, -10] }, { duration: 0.25 }).then(() => {
        roleEl.textContent = ROLES[ri][lang];
        animate(roleEl, { opacity: [0, 1], y: [10, 0] }, { duration: 0.3 });
      });
    }, 2600);
  }).catch(() => { setCounts(); setBars(); });

  // Fallback: if the CDN import is slow/blocked, still show numbers and bars
  setTimeout(() => { $$("[data-count]").forEach(el => { if (el.textContent === "0") el.textContent = el.dataset.count; }); }, 2500);
})();
