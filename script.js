(() => {
  const D = window.PORTFOLIO || PORTFOLIO;
  const $ = (s) => document.querySelector(s);
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const ICONS = {
    github:
      '<path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" fill="currentColor"/>',
    linkedin:
      '<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" fill="currentColor"/>',
    x: '<path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" fill="currentColor"/>',
    instagram:
      '<rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/>',
    youtube:
      '<path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" fill="currentColor"/>',
    mail: '<path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="2"/><path d="m22 6-10 7L2 6" fill="none" stroke="currentColor" stroke-width="2"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  };
  const svg = (name, size = 18) =>
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${ICONS[name] || ICONS.link}</svg>`;

  const initials = D.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  /* ---------- Hero ---------- */
  document.title = `${D.name} — Portfolio`;
  $("[data-name-initials]").textContent = initials;
  $("#heroName").textContent = D.name;
  $("#heroTagline").textContent = D.tagline;
  const avatar = $("#avatar");
  if (D.avatar) avatar.style.backgroundImage = `url("${D.avatar}")`;
  else avatar.innerHTML = `<span class="grad">${esc(initials)}</span>`;
  if (D.resumeUrl) {
    const r = $("#resumeBtn");
    r.href = D.resumeUrl;
    r.hidden = false;
  }

  const socialsHTML = [
    ...D.socials.map(
      (s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}" title="${esc(s.label)}">${svg(s.icon)}</a>`
    ),
    `<a href="mailto:${esc(D.email)}" aria-label="Email" title="Email">${svg("mail")}</a>`,
  ].join("");
  $("#heroSocials").innerHTML = socialsHTML;
  $("#contactSocials").innerHTML = socialsHTML;

  // Typewriter for the role line
  const roleEl = $("#heroRole");
  const roles = Array.isArray(D.role) ? D.role : [D.role];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) roleEl.textContent = roles[0];
  else {
    let ri = 0, ci = 0, deleting = false;
    const tick = () => {
      const word = roles[ri];
      ci += deleting ? -1 : 1;
      roleEl.innerHTML = esc(word.slice(0, ci)) + '<span class="caret"></span>';
      let delay = deleting ? 40 : 80;
      if (!deleting && ci === word.length) {
        if (roles.length === 1) return;
        deleting = true;
        delay = 1800;
      } else if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        delay = 400;
      }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 500);
  }

  /* ---------- About ---------- */
  $("#aboutText").innerHTML = D.about.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#stats").innerHTML = D.stats
    .map((s) => `<div class="stat"><strong class="grad">${esc(s.value)}</strong><span>${esc(s.label)}</span></div>`)
    .join("");
  $("#factLocation").textContent = D.location;
  $("#factEmail").innerHTML = `<a href="mailto:${esc(D.email)}">${esc(D.email)}</a>`;

  /* ---------- Skills ---------- */
  const skillIcons = ["◆", "⚙", "☁", "✦", "★", "●"];
  $("#skillsGrid").innerHTML = D.skills
    .map(
      (g, i) => `
      <div class="skill-card reveal">
        <h3><span class="ic">${skillIcons[i % skillIcons.length]}</span>${esc(g.group)}</h3>
        <div class="chips">${g.items.map((it) => `<span class="chip">${esc(it)}</span>`).join("")}</div>
      </div>`
    )
    .join("");

  /* ---------- Projects ---------- */
  const palettes = [
    ["#6366f1", "#ec4899"],
    ["#0ea5e9", "#22c55e"],
    ["#f59e0b", "#ef4444"],
    ["#8b5cf6", "#06b6d4"],
    ["#14b8a6", "#6366f1"],
  ];
  $("#projectsGrid").innerHTML = D.projects
    .map((p, i) => {
      const [c1, c2] = palettes[i % palettes.length];
      const label = p.title.replace(/[\[\]]/g, "").trim();
      const cover = p.image
        ? `<img src="${esc(p.image)}" alt="${esc(label)} screenshot" loading="lazy" />`
        : esc(label.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase());
      const links = [
        p.live && `<a href="${esc(p.live)}" target="_blank" rel="noopener">${svg("link", 16)} Live demo</a>`,
        p.code && `<a href="${esc(p.code)}" target="_blank" rel="noopener">${svg("github", 16)} Source</a>`,
      ]
        .filter(Boolean)
        .join("");
      return `
      <article class="project reveal" data-tags="${esc(p.tags.join("|"))}">
        <div class="project-cover" style="--c1:${c1};--c2:${c2}">${cover}</div>
        <div class="project-body">
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.description)}</p>
          <div class="chips">${p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
          ${links ? `<div class="project-links">${links}</div>` : ""}
        </div>
      </article>`;
    })
    .join("");

  const allTags = [...new Set(D.projects.flatMap((p) => p.tags))];
  const filters = $("#filters");
  filters.innerHTML = ["All", ...allTags]
    .map((t, i) => `<button class="filter${i === 0 ? " active" : ""}" data-filter="${esc(t)}">${esc(t)}</button>`)
    .join("");
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    filters.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll(".project").forEach((card) => {
      const show = f === "All" || card.dataset.tags.split("|").includes(f);
      card.classList.toggle("hide", !show);
      if (show) card.classList.add("visible");
    });
  });

  /* ---------- Timeline ---------- */
  const tl = (items) =>
    items
      .map(
        (it) => `
      <li class="tl-item reveal">
        <div class="tl-card">
          <span class="tl-period">${esc(it.period)}</span>
          <h4>${esc(it.title)}</h4>
          <div class="tl-org">${esc(it.org)}</div>
          ${it.points && it.points.length ? `<ul>${it.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
        </div>
      </li>`
      )
      .join("");
  $("#experienceList").innerHTML = tl(D.experience);
  $("#educationList").innerHTML = tl(D.education);

  /* ---------- Contact ---------- */
  const ce = $("#contactEmail");
  ce.textContent = D.email;
  ce.href = `mailto:${D.email}`;

  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = encodeURIComponent(`Portfolio contact from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${D.email}?subject=${subject}&body=${body}`;
    $("#formNote").textContent = "Opening your email app… thanks for reaching out!";
    e.target.reset();
  });

  /* ---------- Footer ---------- */
  $("#year").textContent = new Date().getFullYear();
  $("#footerName").textContent = D.name;

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  $("#themeToggle").addEventListener("click", () => {
    const current =
      root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });

  /* ---------- Nav: scroll state, mobile menu, active link ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const menuBtn = $("#menuBtn");
  const navLinks = $("#navLinks");
  const setMenu = (open) => {
    navLinks.classList.toggle("open", open);
    nav.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  };
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  navLinks.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));

  const links = [...navLinks.querySelectorAll("a")];
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting)
          links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${en.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 60}ms`;
    io.observe(el);
  });
})();
