/*
	Renders the one-page resume from window.PORTFOLIO and adds the shared
	behavior used by every page: header, theme toggle, footer, scroll reveal
	and (on case-study pages) previous / next project navigation.
*/
(function () {
	"use strict";

	var D = window.PORTFOLIO;
	var page = document.body.getAttribute("data-page") || "index";
	var isIndex = page === "index";

	/* ---------- Helpers ---------- */
	function $(sel, root) { return (root || document).querySelector(sel); }
	function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
	function esc(s) {
		return String(s).replace(/[&<>"']/g, function (c) {
			return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
		});
	}
	function byId(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; }
	function ym(s) { var p = s.split("-"); return +p[0] + (+p[1] - 1) / 12; }
	function nowYm() { var d = new Date(); return d.getFullYear() + d.getMonth() / 12; }
	function fmtDate(s) { if (!s) return "Present"; var p = s.split("-"); return p[1] + "/" + p[0]; }
	function duration(e) {
		var months = Math.max(1, Math.round(((e.end ? ym(e.end) : nowYm()) - ym(e.start)) * 12));
		var y = Math.floor(months / 12), m = months % 12;
		return (y ? y + " yr" + (y > 1 ? "s" : "") : "") + (y && m ? " " : "") + (m ? m + " mo" : "");
	}
	var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	var ICON = {
		mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
		linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.4V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.5-2.25 3.1V21H9z"/></svg>',
		github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
		whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.24-1.37A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.2 8.2 0 1 1 6.95 3.86Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.16.24-.63.8-.78.96-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.18 3.7c1.56.67 2.17.73 2.95.61.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>',
		pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
		sun: '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
		moon: '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
		right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
		left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
		close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
		play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>'
	};

	/* ---------- Theme ---------- */
	function setTheme(t) {
		document.documentElement.setAttribute("data-theme", t);
		try { localStorage.setItem("theme", t); } catch (e) {}
		if (window.Charts) window.Charts.renderAll();
	}

	/* ---------- Header & footer ---------- */
	var SECTIONS = [["experience", "Experience"], ["projects", "Projects"], ["skills", "Skills"], ["education", "Education"], ["contact", "Contact"]];

	function renderHeader() {
		var host = $("#topbar");
		if (!host) return;
		var base = isIndex ? "" : "index.html";
		host.className = "topbar";
		host.innerHTML =
			'<div class="container">' +
				'<a class="brand" href="' + (isIndex ? "#top" : "index.html") + '"><span class="brand-dot"></span>' + esc(D.profile.name) + '</a>' +
				'<nav class="nav" aria-label="Sections">' +
					SECTIONS.map(function (s) { return '<a href="' + base + "#" + s[0] + '">' + s[1] + "</a>"; }).join("") +
				"</nav>" +
				'<div class="topbar-actions">' +
					'<button class="icon-btn theme-toggle" type="button" aria-label="Toggle light or dark theme">' + ICON.moon + ICON.sun + "</button>" +
					'<a class="btn btn-primary btn-sm" href="mailto:' + D.profile.email + '">' + ICON.mail + "<span>Contact</span></a>" +
				"</div>" +
			"</div>";
		$(".theme-toggle", host).addEventListener("click", function () {
			setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light");
		});
	}

	function renderFooter() {
		var host = $("#footer");
		if (!host) return;
		host.className = "footer";
		host.innerHTML =
			'<div class="container">' +
				"<span>© " + new Date().getFullYear() + " " + esc(D.profile.name) + " · " + esc(D.profile.location) + "</span>" +
				'<span><a href="mailto:' + D.profile.email + '">' + D.profile.email + '</a> · <a href="' + D.profile.linkedin + '" target="_blank" rel="noopener">LinkedIn</a> · <a href="' + D.profile.github + '" target="_blank" rel="noopener">GitHub</a></span>' +
			"</div>";
	}

	/* ---------- Hero topics: jump to the filtered project grid ---------- */
	function renderTopics() {
		var host = $("#topics");
		if (!host) return;
		host.innerHTML = D.categories.map(function (c) {
			return '<button type="button" class="topic" data-cat="' + c.id + '" style="--tc:' + c.color + '">' + esc(c.label) + "</button>";
		}).join("");
		$all(".topic", host).forEach(function (b) {
			b.addEventListener("click", function () {
				setCategory(b.getAttribute("data-cat"));
				$("#projects").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
			});
		});
	}

	/* ---------- Timeline (Gantt, one row per role) ---------- */
	function renderTimeline() {
		var host = $("#timeline");
		if (!host) return;
		var NS = "http://www.w3.org/2000/svg";
		var exps = D.experience;
		var W = Math.max(640, host.clientWidth || 900), labelW = W < 760 ? 170 : 230, rowH = 30, top = 26;
		var H = top + exps.length * rowH + 8;
		var x0 = 2021, x1 = Math.max(nowYm() + 0.25, 2027);
		function sx(v) { return labelW + ((v - x0) / (x1 - x0)) * (W - labelW - 10); }

		var s = '<svg viewBox="0 0 ' + W + " " + H + '" role="group" aria-label="Career timeline">';
		s += '<g class="tl-axis">';
		for (var y = x0; y <= Math.floor(x1); y++) {
			s += '<line x1="' + sx(y) + '" x2="' + sx(y) + '" y1="' + (top - 8) + '" y2="' + H + '"/>';
			s += '<text x="' + (sx(y) + 4) + '" y="' + (top - 12) + '">' + y + "</text>";
		}
		s += "</g>";
		var n = nowYm();
		s += '<g class="tl-now"><line x1="' + sx(n) + '" x2="' + sx(n) + '" y1="' + (top - 8) + '" y2="' + H + '"/><text x="' + (sx(n) - 4) + '" y="' + (top - 12) + '" text-anchor="end">now</text></g>';

		exps.forEach(function (e, i) {
			var a = sx(ym(e.start)), b = sx(e.end ? ym(e.end) : n), yy = top + i * rowH;
			var label = e.title.length > (W < 760 ? 22 : 30) ? e.title.slice(0, W < 760 ? 20 : 28) + "…" : e.title;
			s += '<g class="tl-bar" tabindex="0" role="button" data-exp="' + e.id + '" aria-label="' + esc(e.title + ", " + e.org + ", " + fmtDate(e.start) + " to " + fmtDate(e.end)) + '">';
			s += '<text x="0" y="' + (yy + 15) + '" style="fill:var(--text);font-size:12px;font-weight:600">' + esc(label) + "</text>";
			s += '<text x="0" y="' + (yy + 27) + '" style="fill:var(--muted);font-size:10px">' + esc(e.org.split(" · ")[0].split(" (")[0]) + "</text>";
			s += '<rect x="' + a + '" y="' + (yy + 6) + '" width="' + Math.max(6, b - a) + '" height="' + (rowH - 12) + '" rx="5" style="fill:' + e.color + '"/>';
			s += "</g>";
		});
		s += "</svg>";
		host.innerHTML = s;
		$all(".tl-bar", host).forEach(function (g) {
			g.addEventListener("click", function () { openExp(g.getAttribute("data-exp"), g); });
			g.addEventListener("keydown", function (ev) {
				if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); openExp(g.getAttribute("data-exp"), g); }
			});
		});
	}

	/* ---------- Experience list ---------- */
	function renderExperience() {
		var host = $("#exp-list");
		if (!host) return;
		host.innerHTML = D.experience.map(function (e) {
			var pts = (e.points || []).map(function (t) {
				if (typeof t === "string") return "<li>" + esc(t) + "</li>";
				var p = byId(D.projects, t.p);
				return '<li><a class="exp-link" href="' + p.page + '">' + esc(t.t) + "</a></li>";
			}).join("");
			return '<li class="reveal"><div role="button" tabindex="0" class="exp-item" data-exp="' + e.id + '" style="--ec:' + e.color + '" aria-label="' + esc(e.title + ", " + e.org + ": show details") + '">' +
				'<span class="bar"></span>' +
				"<div>" +
					'<div class="exp-top"><h3>' + esc(e.title) + '</h3><span class="exp-dates">' + fmtDate(e.start) + " – " + fmtDate(e.end) + " · " + duration(e) + "</span></div>" +
					'<div class="exp-org">' + esc(e.org) + '<span class="dot">·</span>' + esc(e.place) + "</div>" +
					'<div class="exp-foot"><ul class="exp-points">' + pts + '</ul><span class="exp-more">Details' + ICON.right + "</span></div>" +
				"</div>" +
			"</div></li>";
		}).join("");
		$all(".exp-link", host).forEach(function (a) {
			["click", "keydown"].forEach(function (n) { a.addEventListener(n, function (ev) { ev.stopPropagation(); }); });
		});
		$all(".exp-item", host).forEach(function (b) {
			b.addEventListener("click", function () { openExp(b.getAttribute("data-exp"), b); });
			b.addEventListener("keydown", function (ev) {
				if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); openExp(b.getAttribute("data-exp"), b); }
			});
		});
	}

	/* ---------- Drawer ---------- */
	var lastTrigger = null;

	function drawerHtml(e) {
		var kpis = (e.kpis || []).map(function (k) {
			return '<div class="kpi" style="--kc:' + e.color + '"><div class="v" style="font-size:1.35rem">' + esc(k.v) + '</div><div class="l">' + esc(k.l) + "</div></div>";
		}).join("");
		var projects = (e.projects || []).map(function (id) {
			var p = byId(D.projects, id);
			return '<a class="drawer-project" href="' + p.page + '"><span class="k">' + esc(p.kpi.v) + '</span><span class="t">' + esc(p.title) + '</span><span class="arrow">' + "→" + "</span></a>";
		}).join("");
		var extras = (e.extras || []).map(function (x) { return '<div class="extra"><b>' + esc(x.t) + "</b><span>" + esc(x.d) + "</span></div>"; }).join("");
		return '<p class="eyebrow">' + fmtDate(e.start) + " – " + fmtDate(e.end) + " · " + duration(e) + "</p>" +
			'<p class="lede">' + esc(e.summary) + "</p>" +
			(kpis ? '<div class="kpis">' + kpis + "</div>" : "") +
			"<h3>What I did</h3>" +
			'<ul class="bullets">' + e.bullets.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") + "</ul>" +
			(projects ? "<h3>Case studies</h3><div class=\"drawer-projects\">" + projects + "</div>" : "") +
			(extras ? "<h3>Also in this role</h3>" + extras : "") +
			"<h3>Industry</h3><p class=\"lede\" style=\"margin:0\">" + esc(e.industry) + "</p>" +
			"<h3>Tools & skills</h3><ul class=\"tags\">" + e.skills.map(function (s) { return '<li class="tag">' + esc(s) + "</li>"; }).join("") + "</ul>";
	}

	function openExp(id, trigger, fromHash) {
		var e = byId(D.experience, id), drawer = $("#drawer");
		if (!e || !drawer) return;
		lastTrigger = trigger || document.activeElement;
		$("#drawer-title").textContent = e.title;
		$("#drawer-org").textContent = e.org + " · " + e.place;
		$("#drawer-body").innerHTML = drawerHtml(e);
		$("#drawer-body").scrollTop = 0;
		drawer.classList.add("open");
		drawer.setAttribute("aria-hidden", "false");
		$("#drawer-backdrop").classList.add("open");
		document.body.classList.add("drawer-open");
		if (!fromHash && location.hash !== "#exp/" + id) history.pushState(null, "", "#exp/" + id);
		setTimeout(function () { $("#drawer .close").focus(); }, 30);
	}

	function closeExp(fromHash) {
		var drawer = $("#drawer");
		if (!drawer || !drawer.classList.contains("open")) return;
		drawer.classList.remove("open");
		drawer.setAttribute("aria-hidden", "true");
		$("#drawer-backdrop").classList.remove("open");
		document.body.classList.remove("drawer-open");
		if (!fromHash && location.hash.indexOf("#exp/") === 0) history.pushState(null, "", "#experience");
		if (lastTrigger && lastTrigger.focus) lastTrigger.focus({ preventScroll: true });
	}

	function initDrawer() {
		var drawer = $("#drawer");
		if (!drawer) return;
		$("#drawer .close").addEventListener("click", function () { closeExp(); });
		$("#drawer-backdrop").addEventListener("click", function () { closeExp(); });
		document.addEventListener("keydown", function (ev) {
			if (!drawer.classList.contains("open")) return;
			if (ev.key === "Escape") closeExp();
			if (ev.key === "Tab") {
				var f = $all('a[href], button, [tabindex]:not([tabindex="-1"])', drawer);
				if (!f.length) return;
				var first = f[0], last = f[f.length - 1];
				if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
				else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
			}
		});
		function fromHash() {
			var m = location.hash.match(/^#exp\/([\w-]+)$/);
			if (m) openExp(m[1], null, true); else closeExp(true);
		}
		window.addEventListener("hashchange", fromHash);
		window.addEventListener("popstate", fromHash);
		fromHash();
	}

	/* ---------- Projects ---------- */
	var activeCat = "all", activeSkill = null;

	function catOf(id) { return byId(D.categories, id); }

	function renderProjects() {
		var host = $("#project-grid");
		if (!host) return;
		host.innerHTML = D.projects.map(function (p) {
			var c = catOf(p.cats[0]);
			return '<a class="pcard reveal" href="' + p.page + '" data-id="' + p.id + '" data-cats="' + p.cats.join(" ") + '" style="--pc:' + c.color + '">' +
				'<div class="pcard-top">' +
					'<div class="ctx"><span class="cat">' + esc(c.label) + "</span></div>" +
					(p.video ? '<span class="media-badge">' + ICON.play + "Video</span>" : "") +
					"<h3>" + esc(p.title) + "</h3>" +
					'<div class="k">' + esc(p.kpi.v) + "</div>" +
					'<div class="kl">' + esc(p.kpi.l) + "</div>" +
				"</div>" +
				'<div class="pcard-body">' +
					'<ul class="pcard-points">' + p.points.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
					'<ul class="tags">' + p.tags.slice(0, 4).map(function (t) { return '<li class="tag">' + esc(t) + "</li>"; }).join("") + "</ul>" +
					'<div class="pcard-foot"><span class="tag" style="background:transparent">' + esc(p.context) + '</span><span class="go">Case study →</span></div>' +
				"</div>" +
			"</a>";
		}).join("");

		var fhost = $("#filters");
		var cats = [{ id: "all", label: "All" }].concat(D.categories);
		fhost.innerHTML = cats.map(function (c) {
			var n = c.id === "all" ? D.projects.length : D.projects.filter(function (p) { return p.cats.indexOf(c.id) > -1; }).length;
			return '<button type="button" class="filter" data-cat="' + c.id + '" aria-pressed="' + (c.id === "all") + '">' + esc(c.label) + '<span class="n">' + n + "</span></button>";
		}).join("");
		$all(".filter", fhost).forEach(function (b) {
			b.addEventListener("click", function () { setCategory(b.getAttribute("data-cat")); });
		});
	}

	function setCategory(id) {
		activeCat = id;
		$all("#filters .filter").forEach(function (x) { x.setAttribute("aria-pressed", String(x.getAttribute("data-cat") === id)); });
		applyFilters();
	}

	function applyFilters() {
		var skillProjects = activeSkill ? activeSkill.p : null;
		$all(".pcard").forEach(function (card) {
			var cats = card.getAttribute("data-cats").split(" ");
			card.classList.toggle("hidden", activeCat !== "all" && cats.indexOf(activeCat) === -1);
			card.classList.toggle("dim", !!skillProjects && skillProjects.indexOf(card.getAttribute("data-id")) === -1);
		});
		var note = $("#skill-note");
		if (note) {
			note.classList.toggle("show", !!activeSkill);
			if (activeSkill) {
				$("#skill-note-text").innerHTML = "Highlighting " + activeSkill.p.length + " project" + (activeSkill.p.length === 1 ? "" : "s") + " that use <b>" + esc(activeSkill.n) + "</b>.";
			}
		}
	}

	/* ---------- Skills ---------- */
	function renderSkills() {
		var host = $("#skills-acc");
		if (!host) return;
		var all = [];
		host.innerHTML = D.skills.map(function (g) {
			return '<details class="skill-acc reveal" style="--sg:' + g.color + '"><summary><i></i><span class="g">' + esc(g.group) + '</span><span class="c">' + g.items.length + '</span><span class="chev">' + ICON.right + "</span></summary>" +
				'<div class="skill-list">' +
				g.items.map(function (s, si) {
					var idx = all.push(s) - 1;
					var train = s.lvl === "train";
					var count = s.p.length;
					var attrs = count ? ' data-count="' + count + '" aria-pressed="false" title="Show the ' + count + ' project' + (count > 1 ? "s" : "") + ' that use ' + esc(s.n) + '"' : ' data-count="0"';
					return (count ? "<button type=\"button\"" : "<span") + ' class="skill' + (train ? " training" : "") + '" data-skill="' + idx + '"' + attrs + ">" +
						esc(s.n) + (count ? '<span class="n">' + count + "</span>" : "") + (train ? ' <span class="n" style="color:var(--muted)">course</span>' : "") +
						(count ? "</button>" : "</span>");
				}).join("") +
			"</div></details>";
		}).join("");
		// One group open at a time.
		$all("details", host).forEach(function (d) {
			d.addEventListener("toggle", function () {
				if (d.open) $all("details[open]", host).forEach(function (o) { if (o !== d) o.open = false; });
			});
		});

		var result = $("#skill-result");
		$all("button.skill", host).forEach(function (b) {
			b.addEventListener("click", function () {
				var s = all[+b.getAttribute("data-skill")];
				var on = activeSkill !== s;
				activeSkill = on ? s : null;
				$all("button.skill", host).forEach(function (x) { x.setAttribute("aria-pressed", String(on && x === b)); });
				applyFilters();
				if (result) {
					result.hidden = !on;
					if (on) {
						result.innerHTML = '<span class="chart-title">' + esc(s.n) + "</span> <span style=\"color:var(--muted);font-size:.85rem\">used in</span> " +
							s.p.map(function (id) { var p = byId(D.projects, id); return '<a class="tag" href="' + p.page + '">' + esc(p.title) + "</a>"; }).join(" ");
					}
				}
			});
		});
		var clear = $("#skill-clear");
		if (clear) clear.addEventListener("click", function () {
			activeSkill = null;
			$all("button.skill", host).forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
			if (result) result.hidden = true;
			applyFilters();
		});
	}

	/* ---------- Education, languages, certifications ---------- */
	function renderEducation() {
		var e = $("#edu"), c = $("#certs"), l = $("#langs");
		if (e) e.innerHTML = D.education.map(function (x) {
			return '<div class="edu-item"><b>' + esc(x.title) + '</b><div class="sub">' + esc(x.school) + '</div><div class="when">' + esc(x.when) + "</div>" + (x.note ? '<div class="note">' + esc(x.note) + "</div>" : "") + "</div>";
		}).join("");
		if (c) c.innerHTML = D.certifications.map(function (x) {
			return "<li><b>" + esc(x.title) + "</b> · " + esc(x.org) + (x.when ? ' · <span class="when">' + esc(x.when) + "</span>" : "") +
				(x.url ? ' · <a href="' + x.url + '" target="_blank" rel="noopener">Verify</a>' : "") + "</li>";
		}).join("");
		if (l) l.innerHTML = D.languages.map(function (x) {
			return '<div class="lang"><div class="lang-top"><b>' + esc(x.name) + "</b><span>" + esc(x.level) + '</span></div><div class="meter" role="img" aria-label="' + esc(x.name + ": " + x.level) + '"><i style="width:' + x.pct + '%"></i></div></div>';
		}).join("");
	}

	/* ---------- Case-study pages: previous / next ---------- */
	function renderCaseNav() {
		var host = $("#case-nav"), id = document.body.getAttribute("data-project");
		if (!host || !id) return;
		var list = D.projects, i = list.findIndex(function (p) { return p.id === id; });
		if (i < 0) return;
		var prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];
		host.innerHTML =
			'<a href="' + prev.page + '"><small>← Previous</small><b>' + esc(prev.title) + "</b></a>" +
			'<a class="next" href="' + next.page + '"><small>Next →</small><b>' + esc(next.title) + "</b></a>";
	}

	/* ---------- Scroll reveal & active nav ---------- */
	function initReveal() {
		var items = $all(".reveal");
		if (!("IntersectionObserver" in window) || reduceMotion) { items.forEach(function (n) { n.classList.add("in"); }); return; }
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
		}, { rootMargin: "0px 0px -40px 0px" });
		items.forEach(function (n) { io.observe(n); });
	}

	function initActiveNav() {
		if (!isIndex || !("IntersectionObserver" in window)) return;
		var links = $all(".nav a");
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (en) {
				if (!en.isIntersecting) return;
				links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id); });
			});
		}, { rootMargin: "-45% 0px -50% 0px" });
		SECTIONS.forEach(function (s) { var n = document.getElementById(s[0]); if (n) io.observe(n); });
	}

	/* ---------- Boot ---------- */
	document.documentElement.classList.remove("no-js");
	renderHeader();
	renderFooter();
	if (isIndex) {
		renderTopics();
		renderTimeline();
		renderExperience();
		renderProjects();
		renderSkills();
		renderEducation();
		initDrawer();
		var lastW = window.innerWidth;
		window.addEventListener("resize", function () {
			if (Math.abs(window.innerWidth - lastW) > 40) { lastW = window.innerWidth; renderTimeline(); }
		});
	} else {
		renderCaseNav();
	}
	initReveal();
	initActiveNav();
})();
