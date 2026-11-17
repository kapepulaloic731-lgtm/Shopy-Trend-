const $ = s => document.querySelector(s);
const money = n => CONFIG.currency + n.toFixed(2);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const P = id => PRODUCTS.find(p => p.id === id);
const C = id => CATEGORIES.find(c => c.id === id);
let Q = "", cart = [];
try { cart = JSON.parse(localStorage.getItem("st_cart")) || []; } catch (e) {}
const save = () => {
  try { localStorage.setItem("st_cart", JSON.stringify(cart)); } catch (e) {}
  $("#cc").textContent = cart.reduce((a, i) => a + i.q, 0);
};
const total = () => cart.reduce((a, i) => a + i.q * P(i.id).price, 0);
cart = cart.filter(i => P(i.id));

function toast(t) {
  const el = document.createElement("div");
  el.className = "toast"; el.textContent = t;
  document.body.appendChild(el); setTimeout(() => el.remove(), 1600);
}
function add(id, q) {
  const p = P(id), it = cart.find(i => i.id === id);
  const n = Math.min((it ? it.q : 0) + q, p.stock);
  if (it) it.q = n; else cart.push({ id, q: n });
  save();
}
const pic = p => p.img ? `<img src="${esc(p.img)}" alt="${esc(p.name)}" loading="lazy">` : `<div class="ph">${C(p.cat).icon}</div>`;
const price = p => `<span class="pr">${money(p.price)}${p.old ? ` <s>${money(p.old)}</s>` : ""}</span>`;
const card = p => `<a class="card" href="#/produit/${p.id}"><div class="pic">${pic(p)}${p.tag ? `<i class="tag">${TAGS[p.tag]}</i>` : ""}</div><h3>${esc(p.name)}</h3>${price(p)}</a>`;
const grid = l => l.length ? `<div class="grid">${l.map(card).join("")}</div>` : `<p class="empty">Aucun produit trouvé.</p>`;
const sec = (t, tag) => `<h2>${t}</h2>${grid(PRODUCTS.filter(p => p.tag === tag).slice(0, 4))}`;

function home() {
  return `<section class="hero"><small>NOUVELLE COLLECTION</small>
<h1>L'élégance,<br>version <em>Trend</em></h1>
<p>Bijoux, parfums, cosmétiques, vêtements et accessoires sélectionnés avec soin. Livraison à domicile.</p>
<a class="btn" href="#/catalogue/tout">Découvrir la boutique</a></section>
<h2>Catégories</h2><div class="cats">${CATEGORIES.map(c => `<a class="cat" href="#/catalogue/${c.id}"><span>${c.icon}</span>${c.name}</a>`).join("")}</div>
${sec("Nouveautés", "new")}${sec("Meilleures ventes", "best")}${sec("Promotions", "promo")}
<div class="about"><b>Shopy Trend</b> — votre boutique tendance : des produits premium, des prix accessibles et une commande simple par WhatsApp.</div>`;
}
function catalogue(c) {
  const l = PRODUCTS.filter(p => (c === "tout" || p.cat === c) && (!Q || (p.name + p.desc).toLowerCase().includes(Q)));
  return `<h2>${c === "tout" ? "Tous les produits" : C(c)?.name || "Catalogue"}${Q ? ` · « ${esc(Q)} »` : ""}</h2>${grid(l)}`;
}
function product(id) {
  const p = P(id); if (!p) return `<p class="empty">Produit introuvable.</p>`;
  const sug = PRODUCTS.filter(x => x.id !== id).sort((a, b) => (b.cat === p.cat) - (a.cat === p.cat)).slice(0, 4);
  const av = p.stock > 5 ? `<span class="ok">● En stock</span>` : p.stock > 0 ? `<span class="ko">● Plus que ${p.stock} en stock</span>` : `<span class="ko">● Épuisé</span>`;
  return `<div class="pd"><div class="pic">${pic(p)}${p.tag ? `<i class="tag">${TAGS[p.tag]}</i>` : ""}</div>
<div><a class="chip" href="#/catalogue/${p.cat}">${C(p.cat).name}</a><h1>${esc(p.name)}</h1>${price(p)}
<p class="d">${esc(p.desc)}</p><p>${av}</p>
<div class="buy"><div class="qty"><button data-a="pm" data-d="-1">−</button><input id="pq" type="number" value="1" min="1" max="${p.stock}"><button data-a="pm" data-d="1">+</button></div>
<button class="btn" data-a="add" data-id="${p.id}" ${p.stock ? "" : "disabled"}>Ajouter au panier</button></div></div></div>
<h2>Vous aimerez aussi</h2>${grid(sug)}`;
}
function cartView() {
  if (!cart.length) return `<h2>Panier</h2><p class="empty">Votre panier est vide.<br><br><a class="btn" href="#/catalogue/tout">Voir la boutique</a></p>`;
  return `<h2>Panier</h2>${cart.map(i => { const p = P(i.id); return `<div class="row"><a class="th" href="#/produit/${p.id}">${pic(p)}</a>
<div class="in"><div>${esc(p.name)}</div>${price(p)}<div class="qty"><button data-a="dec" data-id="${p.id}">−</button><b>${i.q}</b><button data-a="inc" data-id="${p.id}">+</button></div></div>
<button class="del" data-a="del" data-id="${p.id}" aria-label="Supprimer">✕</button></div>`; }).join("")}
<div class="tot"><span>Total</span><b>${money(total())}</b></div><a class="btn w" href="#/commande">Passer la commande</a>`;
}
function checkout() {
  if (!cart.length) return cartView();
  return `<h2>Finaliser la commande</h2>${cart.map(i => `<div class="row"><div class="in">${i.q} × ${esc(P(i.id).name)}</div><b>${money(i.q * P(i.id).price)}</b></div>`).join("")}
<div class="tot"><span>Total</span><b>${money(total())}</b></div>
<form id="of"><label>Nom complet</label><input name="n" required autocomplete="name">
<label>Numéro WhatsApp</label><input name="t" type="tel" required autocomplete="tel" placeholder="+243…">
<label>Adresse de livraison</label><input name="a" required autocomplete="street-address">
<label>Mode de paiement</label><select name="m">${CONFIG.payments.map(m => `<option>${m}</option>`).join("")}</select><br>
<button class="btn w" type="submit">Envoyer la commande sur WhatsApp</button></form>`;
}
function render() {
  const [, r, a] = location.hash.slice(1).split("/");
  const c = r === "catalogue" ? a || "tout" : "";
  $("#nav").innerHTML = [{ id: "tout", name: "Tout" }, ...CATEGORIES].map(x => `<a class="chip${x.id === c ? " on" : ""}" href="#/catalogue/${x.id}">${x.name}</a>`).join("");
  $("#app").innerHTML = r === "catalogue" ? catalogue(c) : r === "produit" ? product(a) : r === "panier" ? cartView() : r === "commande" ? checkout() : home();
  window.scrollTo(0, 0);
}
document.addEventListener("click", e => {
  const t = e.target.closest("[data-a]"); if (!t) return;
  const { a, id, d } = t.dataset, it = cart.find(i => i.id === id);
  if (a === "add") { add(id, Math.max(1, +$("#pq").value || 1)); toast("Ajouté au panier ✓"); }
  if (a === "pm") { const i = $("#pq"); i.value = Math.max(1, Math.min(+i.max, +i.value + +d)); }
  if (a === "inc" && it) it.q = Math.min(it.q + 1, P(id).stock);
  if (a === "dec" && it) it.q--;
  if (a === "del") cart = cart.filter(i => i.id !== id);
  if (["inc", "dec", "del"].includes(a)) { cart = cart.filter(i => i.q > 0); save(); render(); }
});
document.addEventListener("submit", e => {
  e.preventDefault();
  if (e.target.id !== "of") return;
  const f = new FormData(e.target);
  const msg = `🛍 *Nouvelle commande — SHOPY TREND*\n\n👤 Nom : ${f.get("n")}\n📞 WhatsApp : ${f.get("t")}\n📍 Adresse : ${f.get("a")}\n💳 Paiement : ${f.get("m")}\n\n*Produits :*\n` +
    cart.map(i => `- ${i.q} × ${P(i.id).name} (${money(P(i.id).price)}) = ${money(i.q * P(i.id).price)}`).join("\n") + `\n\n*Total : ${money(total())}*`;
  window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  cart = []; save(); location.hash = "#/";
  toast("Commande envoyée sur WhatsApp ✓");
});
$("#q").addEventListener("input", e => {
  Q = e.target.value.trim().toLowerCase();
  if (location.hash.startsWith("#/catalogue")) render(); else location.hash = "#/catalogue/tout";
});
window.addEventListener("hashchange", render);
save(); render();
