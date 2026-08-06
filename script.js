/* ==========================================================================
   Presswright & Co. — script.js
   Vanilla JS: service data render, sticky header, mobile menu,
   scroll-reveal animations, smooth scroll offset fix.
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     1. SERVICES DATA
     Add new services here — the grid renders automatically.
     Icons are small inline SVG path strings (24x24 viewBox friendly).
     --------------------------------------------------------------------- */
  var ICONS = {
    card: '<svg viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M2.5 9.5h19" stroke="currentColor" stroke-width="1.6"/><path d="M6 14h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    flyer: '<svg viewBox="0 0 24 24"><rect x="4" y="2.5" width="16" height="19" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    brochure: '<svg viewBox="0 0 24 24"><path d="M3 5.5l6-1.5 6 1.5 6-1.5v15l-6 1.5-6-1.5-6 1.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 4v15M15 5.5V20" stroke="currentColor" stroke-width="1.6"/></svg>',
    poster: '<svg viewBox="0 0 24 24"><rect x="5" y="2.5" width="14" height="19" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="9" r="2.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 17.5l2.4-3 2 2 2.6-3.5 1 4.5" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    banner: '<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 10.5h12M6 13.5h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    rollup: '<svg viewBox="0 0 24 24"><rect x="8" y="4" width="8" height="14" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 18v2.5M8 21h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="3" r="1" fill="currentColor"/></svg>',
    window: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 12h18M12 3v18" stroke="currentColor" stroke-width="1.6"/></svg>',
    sticker: '<svg viewBox="0 0 24 24"><path d="M13 3a9 9 0 1 0 8 8h-6a2 2 0 0 1-2-2z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    label: '<svg viewBox="0 0 24 24"><path d="M3 11.5L11.5 3H19a2 2 0 0 1 2 2v7.5l-8.5 8.5a2 2 0 0 1-2.8 0L3 14.3a2 2 0 0 1 0-2.8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="16" cy="8" r="1.4" fill="currentColor"/></svg>',
    ncr: '<svg viewBox="0 0 24 24"><rect x="4" y="3" width="14" height="17" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="6.5" y="6" width="14" height="15" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9.5 10h8M9.5 13h8M9.5 16h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    letterhead: '<svg viewBox="0 0 24 24"><rect x="4" y="2.5" width="16" height="19" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 6h10M7 9.5h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M7 14h10M7 17h10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/></svg>',
    envelope: '<svg viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 6.5l9 7 9-7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    booklet: '<svg viewBox="0 0 24 24"><path d="M12 5.5c-2-1-5-1.3-8-1v14c3-.3 6 0 8 1 2-1 5-1.3 8-1v-14c-3-.3-6 0-8 1z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 5.5v14" stroke="currentColor" stroke-width="1.6"/></svg>',
    folder: '<svg viewBox="0 0 24 24"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h5l2 2.5h8A1.5 1.5 0 0 1 21 9v9.5A1.5 1.5 0 0 1 19.5 20h-15A1.5 1.5 0 0 1 3 18.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    hanger: '<svg viewBox="0 0 24 24"><circle cx="12" cy="4.5" r="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 7.5h6l3 13H6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 13h8" stroke="currentColor" stroke-width="1.4"/></svg>',
    postcard: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M13 9h6M13 12h6M13 15h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="7" cy="12" r="2.4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M6 3v18M18 3v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V3M6 3v7M4 3v7" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    sign: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 15v6M9 21h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    coroplast: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 9h18M3 14h18" stroke="currentColor" stroke-width="1.2" opacity="0.6"/></svg>',
    pvc: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 9.3h16M4 14.6h16" stroke="currentColor" stroke-width="1.2" opacity="0.5"/></svg>',
    foam: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="6" y="8" width="12" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.6"/></svg>',
    largeformat: '<svg viewBox="0 0 24 24"><path d="M3 3v14a2 2 0 0 0 2 2h14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><rect x="9" y="9" width="10" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    standee: '<svg viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="16" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 21h6M12 18.5V21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M4 8l3-2M20 8l-3-2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    canvas: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 15l3.5-4.5L13 14l2-2.5L18 15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    magnet: '<svg viewBox="0 0 24 24"><path d="M7 3v8a5 5 0 0 0 10 0V3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M7 3H4v0M17 3h3v0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M7 7H4M17 7h3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    decal: '<svg viewBox="0 0 24 24"><path d="M4 15.5L15.5 4l4.5 4.5L8.5 20H4z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M13 6.5l4.5 4.5" stroke="currentColor" stroke-width="1.6"/></svg>',
    packaging: '<svg viewBox="0 0 24 24"><path d="M3 8l9-5 9 5-9 5-9-5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M3 8v9l9 5 9-5V8M12 13v9" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/></svg>',
    more: '<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg>'
  };

  var SERVICES = [
    { title: "Custom Business Cards", desc: "Premium stocks and finishes that make a sharp first impression.", icon: "card" },
    { title: "Flyers", desc: "Vibrant, full-color flyers for sales, specials, and local promotions.", icon: "flyer" },
    { title: "Brochures", desc: "Bi-fold and tri-fold layouts that present your story with clarity.", icon: "brochure" },
    { title: "Posters", desc: "Bold, large-scale prints for events, retail, and announcements.", icon: "poster" },
    { title: "Vinyl Banners", desc: "Weatherproof outdoor banners for storefronts and grand openings.", icon: "banner" },
    { title: "Roll-Up Banners", desc: "Portable retractable stands perfect for storefronts, markets, and events.", icon: "rollup" },
    { title: "Window Graphics", desc: "Custom cling and perforated vinyl for storefront visibility.", icon: "window" },
    { title: "Stickers", desc: "Die-cut and kiss-cut stickers in any shape, size, or finish.", icon: "sticker" },
    { title: "Labels", desc: "Product and packaging labels built for durability and shelf appeal.", icon: "label" },
    { title: "NCR Forms", desc: "Carbonless multi-part forms for invoices, receipts, and orders.", icon: "ncr" },
    { title: "Letterheads", desc: "Branded stationery that reflects a polished, professional identity.", icon: "letterhead" },
    { title: "Envelopes", desc: "Custom-printed envelopes for mailers, invoices, and everyday correspondence.", icon: "envelope" },
    { title: "Booklets", desc: "Saddle-stitched or perfect-bound booklets for catalogs and guides.", icon: "booklet" },
    { title: "Presentation Folders", desc: "Sturdy branded folders for proposals, welcome kits, and client materials.", icon: "folder" },
    { title: "Door Hangers", desc: "Direct-to-door marketing pieces built to grab attention.", icon: "hanger" },
    { title: "Postcards", desc: "Direct mail and promo postcards in a range of sizes and stocks.", icon: "postcard" },
    { title: "Menus", desc: "Durable, food-safe menu printing for restaurants and cafes.", icon: "menu" },
    { title: "Signs", desc: "Indoor and outdoor signage tailored to your space and brand.", icon: "sign" },
    { title: "Coroplast Signs", desc: "Lightweight corrugated plastic signs for yards and events.", icon: "coroplast" },
    { title: "PVC Signs", desc: "Rigid, weather-resistant PVC boards for long-term display.", icon: "pvc" },
    { title: "Foam Board Printing", desc: "Lightweight rigid boards ideal for displays and presentations.", icon: "foam" },
    { title: "Large Format Printing", desc: "Oversized prints for storefronts, backdrops, and event displays.", icon: "largeformat" },
    { title: "Retractable Banner Stands", desc: "Hardware-included standee kits ready for same-day setup.", icon: "standee" },
    { title: "Canvas Printing", desc: "Gallery-wrapped canvas prints for art, photos, and branding.", icon: "canvas" },
    { title: "Magnets", desc: "Custom promotional and vehicle magnets built to last outdoors.", icon: "magnet" },
    { title: "Decals", desc: "Precision-cut decals for vehicles, walls, and equipment.", icon: "decal" },
    { title: "Custom Packaging", desc: "Branded boxes and packaging inserts for product and retail.", icon: "packaging" },
    { title: "And More…", desc: "Custom project? Tell us the spec — we'll quote it.", icon: "more" }
  ];

  /* ---------------------------------------------------------------------
     2. RENDER SERVICE CARDS
     --------------------------------------------------------------------- */
  function renderServices() {
    var grid = document.getElementById("serviceGrid");
    if (!grid) return;

    var frag = document.createDocumentFragment();

    SERVICES.forEach(function (svc, i) {
      var card = document.createElement("article");
      card.className = "service-card reveal";
      card.style.setProperty("--d", i % 8);

      var iconWrap = document.createElement("div");
      iconWrap.className = "service-icon";
      iconWrap.setAttribute("aria-hidden", "true");
      iconWrap.innerHTML = ICONS[svc.icon] || ICONS.more;

      var title = document.createElement("h3");
      title.textContent = svc.title;

      var desc = document.createElement("p");
      desc.textContent = svc.desc;

      card.appendChild(iconWrap);
      card.appendChild(title);
      card.appendChild(desc);
      frag.appendChild(card);
    });

    grid.appendChild(frag);
  }

  /* ---------------------------------------------------------------------
     3. STICKY HEADER SHADOW ON SCROLL
     --------------------------------------------------------------------- */
  function initHeaderScroll() {
    var header = document.getElementById("siteHeader");
    if (!header) return;

    function update() {
      if (window.scrollY > 8) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------------------------------------------------------------------
     4. MOBILE MENU TOGGLE
     --------------------------------------------------------------------- */
  function initMobileMenu() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("mobileMenu");
    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.remove("open");
      menu.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }

    function openMenu() {
      menu.classList.add("open");
      menu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
    }

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.contains("open");
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    // Close on link click (mobile navigation)
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------------------------------------------------------------------
     5. SCROLL REVEAL (IntersectionObserver)
     --------------------------------------------------------------------- */
  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      // Fallback: just show everything
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------
     6. FOOTER YEAR
     --------------------------------------------------------------------- */
  function setFooterYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------------
     INIT
     --------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderServices();
    initHeaderScroll();
    initMobileMenu();
    initScrollReveal();
    setFooterYear();
  });
})();
