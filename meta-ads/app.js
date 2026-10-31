// Renders brand table, pattern charts and the creative gallery from data.json.
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const nice = v => String(v ?? "").replace(/_/g, " ");
const LIB = id => `https://www.facebook.com/ads/library/?id=${id}`;
const tip = $("#tip");
function bindTips(root) {
  root.querySelectorAll("[data-tip]").forEach(el => {
    el.addEventListener("mousemove", e => { tip.innerHTML = el.dataset.tip; tip.style.display = "block";
      const x = Math.min(e.clientX + 14, innerWidth - tip.offsetWidth - 8); tip.style.left = x + "px"; tip.style.top = (e.clientY + 14) + "px"; });
    el.addEventListener("mouseleave", () => tip.style.display = "none");
  });
}
fetch("data.json").then(r => r.json()).then(D => {
  const S = D.summary;
  document.querySelectorAll("[data-sum]").forEach(el => el.textContent = (S[el.dataset.sum] ?? "").toLocaleString());
  renderBrands(D.brands);
  renderPatterns(D.patterns);
  renderGallery(D.creatives);
  document.querySelectorAll("[data-ex]").forEach(el => exampleStrip(el, D.creatives));
});
function renderBrands(B) {
  const seg = { named: "Named", ai_sdr: "AI SDR / agent", voice_sdr: "Voice agent", outbound_tool: "Outbound tool", data: "Data" };
  let sortKey = "active", dir = -1;
  const cols = [["brand", "Brand"], ["group", "Type"], ["active", "Live ads"], ["new_30d", "New in 30d"], ["med_age", "Median age of live ads (d)"],
    ["max_age", "Oldest live (d)"], ["med_life_stopped", "Median run of 2026 ads that stopped (d)"], ["video_share", "Video share"], ["cta", "Main CTA"], ["landing", "Top landing page"]];
  const draw = () => {
    const rows = [...B].sort((a, b) => ((a[sortKey] ?? -1) > (b[sortKey] ?? -1) ? 1 : -1) * dir);
    $("#brandtable").innerHTML = `<table><tr>${cols.map(([k, l]) => `<th data-k="${k}" class="sortable">${l}${k === sortKey ? (dir < 0 ? " ▾" : " ▴") : ""}</th>`).join("")}</tr>` +
      rows.map(r => `<tr class="${r.active ? "" : "dim"}"><td><b>${esc(r.brand)}</b></td><td>${seg[r.group] || r.group}</td><td class="num">${r.active}</td><td class="num">${r.new_30d}</td>
        <td class="num">${r.med_age ?? "-"}</td><td class="num">${r.max_age ?? "-"}</td><td class="num">${r.med_life_stopped ?? "-"}</td>
        <td class="num">${r.video_share == null ? "-" : Math.round(r.video_share * 100) + "%"}</td><td>${esc((r.cta[0] || [""])[0])}</td>
        <td class="mono small">${esc((r.landing[0] || [""])[0])}</td></tr>`).join("") + "</table>";
    $("#brandtable").querySelectorAll("th").forEach(th => th.onclick = () => { const k = th.dataset.k; dir = k === sortKey ? -dir : -1; sortKey = k; draw(); });
  };
  draw();
}
function renderPatterns(P) {
  const fields = [["angle", "Angle (the argument)"], ["hook_type", "Hook type"], ["format", "Creative format"], ["offer", "Offer"], ["proof", "Proof used"], ["audience", "Audience named"]];
  const host = $("#patterns");
  const pick = { seg: "agent", field: "angle" };
  host.innerHTML = `<div class="filters"><label>Segment <select id="pseg"><option value="agent">AI sales agents (incl. named + voice)</option><option value="tool">Outbound tools + data</option><option value="all">All</option></select></label>
    <label>Dimension <select id="pfield">${fields.map(([k, l]) => `<option value="${k}">${l}</option>`).join("")}</select></label></div><div id="pchart"></div>`;
  const draw = () => {
    const rows = (P[pick.seg][pick.field] || []).filter(r => r.active > 0 || r.stopped > 2).slice(0, 18);
    const maxS = Math.max(...rows.map(r => r.share), 0.01), maxA = Math.max(...rows.map(r => r.med_live_age || 0), 1);
    $("#pchart").innerHTML = `<div class="tw"><table class="pt"><tr><th>${nice(pick.field)}</th><th>Share of live creatives<br><span class="small">each brand weighted equally</span></th><th>Brands using it now</th><th>Median age of live creatives (days)</th><th>Live creatives 30d+</th><th>Median run once stopped (d)</th></tr>` +
      rows.map(r => `<tr><td><b>${esc(nice(r.value))}</b></td>
        <td><div class="bar" data-tip="<b>${esc(nice(r.value))}</b><br>${(r.share * 100).toFixed(1)}% of live creatives (brand-weighted)<br>${r.active} live creatives"><div class="tr"><i class="b1" style="width:${(r.share / maxS * 100).toFixed(1)}%"></i></div><span>${(r.share * 100).toFixed(0)}%</span></div></td>
        <td class="num" data-tip="${esc(r.brand_list.join(", "))}">${r.brands}</td>
        <td><div class="bar" data-tip="<b>${esc(nice(r.value))}</b><br>median live age ${r.med_live_age ?? "-"} days"><div class="tr"><i class="b2" style="width:${((r.med_live_age || 0) / maxA * 100).toFixed(1)}%"></i></div><span>${r.med_live_age ?? "-"}</span></div></td>
        <td class="num">${r.share_30d_plus == null ? "-" : Math.round(r.share_30d_plus * 100) + "%"}</td><td class="num">${r.med_life_stopped ?? "-"}${r.stopped ? ` <span class="small">(n=${r.stopped})</span>` : ""}</td></tr>`).join("") + "</table></div>";
    bindTips($("#pchart"));
  };
  host.querySelector("#pseg").onchange = e => { pick.seg = e.target.value; draw(); };
  host.querySelector("#pfield").onchange = e => { pick.field = e.target.value; draw(); };
  draw();
}
function card(c) {
  const chips = [c.format, c.angle, c.hook_type, c.offer !== "none" ? c.offer : null].filter(Boolean).map(x => `<span class="chip">${esc(nice(x))}</span>`).join("");
  return `<article class="ad ${c.active ? "" : "off"}">
    <a href="${LIB(c.ad_id)}" target="_blank" rel="noopener" class="thumb">${c.has_img ? `<img loading="lazy" src="media/${c.key}.jpg" alt="${esc(c.brand)} ad">` : `<div class="noimg">no still</div>`}${c.kind === "video" ? `<span class="vid">▶ video</span>` : ""}</a>
    <div class="meta"><b>${esc(c.brand)}</b><span class="${c.active ? "live" : "stopped"}">${c.active ? "live" : "stopped"} · ${c.days}d</span>${c.n_ads > 1 ? `<span class="small">${c.n_ads} ads</span>` : ""}</div>
    <div class="hook">${esc(c.hook_line || c.title)}</div><div class="chips">${chips}</div>
    <details><summary>Copy, script and read</summary>${c.title ? `<p><b>Headline:</b> ${esc(c.title)}</p>` : ""}<p>${esc(c.body)}</p>
    ${c.transcript ? `<p class="small"><b>Script:</b> ${esc(c.transcript)}</p>` : ""}${c.why ? `<p class="small"><b>Read:</b> ${esc(c.why)}</p>` : ""}
    <p class="small mono">CTA: ${esc(c.cta)} · ${esc(c.lp)}${c.utm ? " · utm " + esc(c.utm) : ""}</p></details></article>`;
}
function exampleStrip(el, C) {
  const keys = el.dataset.ex.split(/\s+/);
  el.innerHTML = keys.map(k => C.find(c => c.key === k)).filter(Boolean).map(card).join("");
}
function renderGallery(C) {
  const opts = (k) => [...new Set(C.map(c => c[k]).filter(Boolean))].sort();
  const g = $("#gallery");
  g.innerHTML = `<div class="filters">
    <label>Segment <select data-f="seg"><option value="">All</option><option value="agent">AI sales agents</option><option value="tool">Outbound tools + data</option></select></label>
    <label>Brand <select data-f="brand"><option value="">All</option>${opts("brand").map(b => `<option>${esc(b)}</option>`).join("")}</select></label>
    <label>Format <select data-f="format"><option value="">All</option>${opts("format").map(b => `<option value="${b}">${nice(b)}</option>`).join("")}</select></label>
    <label>Angle <select data-f="angle"><option value="">All</option>${opts("angle").map(b => `<option value="${b}">${nice(b)}</option>`).join("")}</select></label>
    <label>Status <select data-f="active"><option value="">All</option><option value="1">Live now</option><option value="0">Stopped</option></select></label>
    <label>Min days <select data-f="days"><option value="0">Any</option><option value="14">14+</option><option value="30">30+</option><option value="60">60+</option><option value="120">120+</option></select></label>
    <label>Sort <select data-f="sort"><option value="days">Longest running</option><option value="n_ads">Most ads using it</option><option value="quality">Best read</option><option value="first">Newest</option></select></label>
    <label class="grow">Search <input data-f="q" placeholder="hook, copy, script..."></label></div><p class="small" id="gcount"></p><div class="grid3" id="gitems"></div><button id="more" class="btn">Show more</button>`;
  const st = { seg: "", brand: "", format: "", angle: "", active: "", days: "0", sort: "days", q: "" }; let shown = 60;
  const draw = () => {
    const q = st.q.toLowerCase();
    let L = C.filter(c => (!st.seg || c.seg === st.seg) && (!st.brand || c.brand === st.brand) && (!st.format || c.format === st.format) &&
      (!st.angle || c.angle === st.angle || c.secondary_angle === st.angle) && (st.active === "" || String(+c.active) === st.active) && c.days >= +st.days &&
      (!q || [c.hook_line, c.title, c.body, c.transcript, c.image_text].join(" ").toLowerCase().includes(q)));
    const s = st.sort;
    L.sort((a, b) => s === "first" ? (b.first > a.first ? 1 : -1) : (b[s] || 0) - (a[s] || 0) || b.days - a.days);
    $("#gcount").textContent = `${L.length} creatives`;
    $("#gitems").innerHTML = L.slice(0, shown).map(card).join("");
    $("#more").style.display = L.length > shown ? "" : "none";
  };
  g.querySelectorAll("[data-f]").forEach(el => el.addEventListener("input", () => { st[el.dataset.f] = el.value; shown = 60; draw(); }));
  $("#more").onclick = () => { shown += 60; draw(); };
  draw();
}
