/* =========================================================
   DEM — front-end logic
   Cart (localStorage) · WhatsApp commande · Nav · Produits
   ========================================================= */

/* ---- CONFIG : à personnaliser ---- */
const DEM = {
  whatsapp: "221780109399",          // numéro WhatsApp (= numéro de commande)
  instagram: "https://www.instagram.com/__demsn__/",
  site: "www.demsn.sn",
  currency: "FCFA",
  payment: {
    // Numéros qui reçoivent les paiements
    wave: "+221 78 010 93 99",
    orangeMoney: "+221 77 824 53 25",
    modes: ["Wave", "Orange Money", "Paiement à la livraison"],
    default: "Paiement à la livraison",
  },
};

/* ---- Tailles ---- */
const SIZES = ["S","M","L","XL","XXL"];
const fmt = n => n.toLocaleString("fr-FR") + " " + DEM.currency;

/* ---- T-shirts (Drop 01) — manches sans motifs ---- */
const PRODUCTS = [
  { id:"blanc", color:"Blanc", hex:"#f4efe3", images:["assets/products/blanc.jpg"] },
  { id:"noir",  color:"Noir",  hex:"#161616", images:["assets/products/noir.jpg"] },
  { id:"vert",  color:"Vert",  hex:"#1f8f4d", images:["assets/products/vert.jpg"] },
  { id:"bleu",  color:"Bleu",  hex:"#16307a", images:["assets/products/bleu.jpg"] },
  { id:"rouge", color:"Rouge", hex:"#e23b2e", images:["assets/products/rouge.jpg"] },
  { id:"jaune", color:"Jaune", hex:"#f4b51e", images:["assets/products/jaune.jpg"] },
].map(p=>({ ...p, category:"tshirt", typeLabel:"T-shirt DEM DAKAR",
  name:`T-shirt DEM DAKAR — ${p.color}`, price:15000, sizes:SIZES, main:p.images[0], alt:p.images[0] }));

/* ---- Casquettes (Drop 02) ---- */
const CAPS = [
  { id:"cap-noir",  color:"Noir",  hex:"#161616", images:["assets/caps/cap-noir.jpg"] },
  { id:"cap-bleu",  color:"Bleu",  hex:"#16307a", images:["assets/caps/cap-bleu.jpg","assets/caps/cap-bleu-worn.jpg"] },
  { id:"cap-vert",  color:"Vert",  hex:"#1f8f4d", images:["assets/caps/cap-vert.jpg","assets/caps/cap-vert-2.jpg"] },
  { id:"cap-jaune", color:"Jaune", hex:"#f4b51e", images:["assets/caps/cap-jaune.jpg","assets/caps/cap-jaune-worn.jpg"] },
].map(p=>({ ...p, category:"casquette", typeLabel:"Casquette DAKAR",
  name:`Casquette DAKAR — ${p.color}`, price:10000, sizes:["Taille unique"], main:p.images[0], alt:p.images[1]||p.images[0] }));

const ALL = [...PRODUCTS, ...CAPS];
const findProduct = id => ALL.find(p => p.id === id) || TIMBRES.find(t => t.id === id);
const sizeLabel = s => s==="Taille unique" ? "Taille unique" : (/cm|×/.test(s) ? "Format "+s : "Taille "+s);

/* ---- Tableaux imprimés (timbres DEM DAKAR) — hauteur 85 cm, format 68 × 85 cm ---- */
const TABLEAU_PRICE = 45000;   // prix d'un tableau imprimé 68 × 85 cm
const TABLEAU_SIZE  = "68 × 85 cm";
const TIMBRES = [
  { id:"t-renaissance", theme:"Monument de la Renaissance", serie:"Série Dakar", img:"assets/timbres/renaissance.jpg" },
  { id:"t-lacrose",     theme:"Lac Rose",                   serie:"Série Dakar", img:"assets/timbres/lacrose.jpg" },
  { id:"t-millenaire",  theme:"Place du Millénaire",        serie:"Série Dakar", img:"assets/timbres/millenaire.jpg" },
  { id:"t-carte",       theme:"Carte de Dakar",             serie:"Série Dakar", img:"assets/timbres/carte.jpg" },
].map(t=>({ ...t,
  name:`Tableau DEM DAKAR — ${t.theme}`, color:t.theme, typeLabel:"Tableau", category:"tableau",
  main:t.img, images:[t.img], price:TABLEAU_PRICE, size:TABLEAU_SIZE, sizes:[TABLEAU_SIZE] }));

/* =========================================================
   CART
   ========================================================= */
const Cart = {
  key:"dem_cart_v1",
  get(){ try{ return JSON.parse(localStorage.getItem(this.key)) || []; }catch(e){ return []; } },
  save(items){ localStorage.setItem(this.key, JSON.stringify(items)); this.render(); },
  add(id,size,qty=1){
    const items = this.get();
    const line = items.find(i => i.id===id && i.size===size);
    if(line){ line.qty += qty; } else { items.push({id,size,qty}); }
    this.save(items);
    openDrawer();
  },
  setQty(id,size,qty){
    let items = this.get();
    items = items.map(i => (i.id===id && i.size===size) ? {...i, qty} : i).filter(i => i.qty>0);
    this.save(items);
  },
  remove(id,size){ this.save(this.get().filter(i => !(i.id===id && i.size===size))); },
  count(){ return this.get().reduce((n,i)=>n+i.qty,0); },
  total(){ return this.get().reduce((s,i)=>{ const p=findProduct(i.id); return s + (p?p.price:0)*i.qty; },0); },

  render(){
    // badge
    document.querySelectorAll(".cart-count").forEach(el=>{
      const c=this.count(); el.textContent=c; el.setAttribute("data-count",c);
    });
    // drawer body
    const body=document.getElementById("cartBody");
    const foot=document.getElementById("cartFoot");
    if(!body) return;
    const items=this.get();
    if(!items.length){
      body.innerHTML=`<div class="drawer__empty">
        <p style="font-family:var(--font-display);font-size:2rem">Panier vide</p>
        <p style="margin-top:.5rem">Le mouvement t'attend.</p>
        <a href="boutique.html" class="btn btn--solid" style="margin-top:1.4rem">Voir la boutique</a>
      </div>`;
      if(foot) foot.style.display="none";
      return;
    }
    if(foot) foot.style.display="grid";
    body.innerHTML=items.map(i=>{
      const p=findProduct(i.id); if(!p) return "";
      return `<div class="citem">
        <img src="${p.main}" alt="${p.name}">
        <div>
          <div class="citem__t">${p.name}</div>
          <div class="citem__m">${sizeLabel(i.size)} · ${fmt(p.price)}</div>
          <div class="qty">
            <button aria-label="moins" data-act="dec" data-id="${p.id}" data-size="${i.size}">−</button>
            <span>${i.qty}</span>
            <button aria-label="plus" data-act="inc" data-id="${p.id}" data-size="${i.size}">+</button>
          </div>
        </div>
        <div style="text-align:right">
          <div class="citem__price">${fmt(p.price*i.qty)}</div>
          <button class="citem__rm" data-act="rm" data-id="${p.id}" data-size="${i.size}">Retirer</button>
        </div>
      </div>`;
    }).join("");
    const totalEl=document.getElementById("cartTotal");
    if(totalEl) totalEl.textContent=fmt(this.total());
  },

  whatsappMessage(){
    const items=this.get();
    let raw="Bonjour, je veux commander chez DEM DAKAR :\n\n";
    items.forEach(i=>{ const p=findProduct(i.id);
      raw+=`• ${p.typeLabel} ${p.color} — ${sizeLabel(i.size)} × ${i.qty} (${fmt(p.price*i.qty)})\n`; });
    raw+=`\nTotal : ${fmt(this.total())}\n`;
    raw+=`Mode de paiement : ${selectedPayment()}\n`;
    raw+=`Zone de livraison : `;
    return encodeURIComponent(raw);
  }
};

/* ---- Paiement ---- */
function selectedPayment(){
  const checked=document.querySelector('input[name="payMode"]:checked');
  return checked ? checked.value : DEM.payment.default;
}
function paymentSelectorHTML(){
  return `<div class="pay-select" id="paySelect">
    <p class="pay-select__label">Mode de paiement</p>
    ${DEM.payment.modes.map((m,i)=>`
      <label class="pay-opt">
        <input type="radio" name="payMode" value="${m}" ${m===DEM.payment.default?'checked':''}>
        <span class="pay-opt__dot"></span>
        <span class="pay-opt__txt">${m}</span>
      </label>`).join("")}
  </div>`;
}

/* ---- Bloc motifs du logo DEM DAKAR (5 carrés) ---- */
function motifStrip(){
  return `<svg class="logo-motifs" viewBox="0 0 164 28" height="28" role="img" aria-label="Motifs DEM DAKAR">
    <g><rect width="28" height="28" rx="2.5" fill="#16307a"/><g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M5 9q3-3 6 0t6 0t6 0"/><path d="M5 14q3-3 6 0t6 0t6 0"/><path d="M5 19q3-3 6 0t6 0t6 0"/></g></g>
    <g transform="translate(34 0)"><rect width="28" height="28" rx="2.5" fill="#1f8f4d"/><path d="M14 5 16.5 11.5 23 14 16.5 16.5 14 23 11.5 16.5 5 14 11.5 11.5Z" fill="#fff"/></g>
    <g transform="translate(68 0)"><rect width="28" height="28" rx="2.5" fill="#f4b51e"/><g fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8 14 14 22 8"/><path d="M6 14 14 20 22 14"/></g></g>
    <g transform="translate(102 0)"><rect width="28" height="28" rx="2.5" fill="#e23b2e"/><g transform="rotate(45 14 14)"><rect x="7.5" y="7.5" width="13" height="13" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M14 7.5V20.5M7.5 14H20.5" stroke="#fff" stroke-width="1.4"/></g></g>
    <g transform="translate(136 0)"><g fill="none" stroke="#1f8f4d" stroke-width="2.4" stroke-linecap="round"><path d="M2 9q3-3 6 0t6 0t6 0"/><path d="M2 14q3-3 6 0t6 0t6 0"/><path d="M2 19q3-3 6 0t6 0t6 0"/></g></g>
  </svg>`;
}

function openDrawer(){ const o=document.getElementById("overlay"),d=document.getElementById("cartDrawer");
  if(o&&d){o.classList.add("open");d.classList.add("open");document.body.style.overflow="hidden";} }
function closeDrawer(){ const o=document.getElementById("overlay"),d=document.getElementById("cartDrawer");
  if(o&&d){o.classList.remove("open");d.classList.remove("open");document.body.style.overflow="";} }

/* =========================================================
   RENDER : grille produits (générique)
   ========================================================= */
function renderGrid(targetId, list, limit){
  const wrap=document.getElementById(targetId);
  if(!wrap || !list) return;
  const items = limit ? list.slice(0,limit) : list;
  wrap.innerHTML=items.map(p=>{
    const sizeLabel = p.category==="casquette" ? "Taille unique" : "Tailles "+p.sizes.join(" / ");
    return `
    <article class="pcard">
      <a class="pcard__media" href="produit.html?id=${p.id}" aria-label="${p.name}">
        <img class="main" src="${p.main}" alt="${p.name}" loading="lazy">
        <img class="alt" src="${p.alt}" alt="${p.name} — autre vue" loading="lazy">
        <span class="pcard__flag">
          <i style="background:#16307a"></i><i style="background:#1f8f4d"></i>
          <i style="background:#f4b51e"></i><i style="background:#e23b2e"></i>
        </span>
      </a>
      <div class="pcard__body">
        <a href="produit.html?id=${p.id}"><h3 class="pcard__name">${p.color}</h3></a>
        <div class="pcard__price">${fmt(p.price)}</div>
        <div class="pcard__sizes">${sizeLabel}</div>
        <div class="pcard__actions">
          <a href="produit.html?id=${p.id}" class="btn btn--solid btn--block">Commander</a>
          <a class="btn btn--wa btn--block" target="_blank" rel="noopener"
             href="https://wa.me/${DEM.whatsapp}?text=${waProductMsg(p)}">${waIcon()} WhatsApp</a>
        </div>
      </div>
    </article>`;}).join("");
}
function waProductMsg(p){
  return encodeURIComponent(
`Bonjour, je veux commander : ${p.name}.
Couleur : ${p.color}
Taille :${p.category==="casquette"?" Taille unique":""}
Quantité : 1
Zone de livraison :`);
}

/* =========================================================
   RENDER : tableau Timbres à imprimer
   ========================================================= */
function renderTimbresTable(targetId){
  const wrap=document.getElementById(targetId);
  if(!wrap) return;
  wrap.innerHTML=`
    <table class="tbl-timbres">
      <thead>
        <tr><th>Aperçu</th><th>Tableau</th><th class="col-serie">Format</th><th>Prix</th><th class="col-act">Panier</th></tr>
      </thead>
      <tbody>
        ${TIMBRES.map((t,i)=>{
          return `<tr>
            <td class="tbl-thumb" data-lbx="${i}" title="Voir en grand"><img src="${t.img}" alt="Tableau ${t.theme}" loading="lazy"><span class="tbl-thumb__zoom">⤢</span></td>
            <td><span class="tbl-name">${t.theme}</span><span class="tbl-serie-m">${t.size} · ${t.serie}</span><button class="tbl-zoom" data-lbx="${i}">⤢ Voir en grand</button></td>
            <td class="col-serie">${t.size}</td>
            <td class="tbl-price">${fmt(t.price)}</td>
            <td class="col-act"><button class="btn btn--solid btn--sm" data-add="${t.id}">+ Panier</button></td>
          </tr>`;
        }).join("")}
      </tbody>
    </table>`;

  // délégation : miniature -> aperçu plein écran · bouton -> ajout panier
  wrap.addEventListener("click",e=>{
    const add=e.target.closest("[data-add]");
    if(add){ Cart.add(add.dataset.add, TABLEAU_SIZE, 1); return; }
    const z=e.target.closest("[data-lbx]");
    if(z){ e.preventDefault(); openLightbox(+z.dataset.lbx); }
  });
}

/* =========================================================
   LIGHTBOX : aperçu grand format des tableaux
   ========================================================= */
let lbxIndex=0;
function buildLightbox(){
  if(document.getElementById("tableauLbx")) return;
  const el=document.createElement("div");
  el.className="lbx"; el.id="tableauLbx"; el.setAttribute("aria-hidden","true");
  el.innerHTML=`
    <button class="lbx__close" data-lbx-close aria-label="Fermer">&times;</button>
    <button class="lbx__nav lbx__prev" data-lbx-prev aria-label="Précédent">&#8249;</button>
    <figure class="lbx__fig">
      <img id="lbxImg" src="" alt="">
      <figcaption class="lbx__cap">
        <div><span class="lbx__name" id="lbxName"></span><span class="lbx__meta" id="lbxMeta"></span></div>
        <div class="lbx__actions">
          <button class="btn btn--solid" data-lbx-add>+ Panier</button>
          <a class="btn btn--wa" id="lbxBuy" target="_blank" rel="noopener">${waIcon()} WhatsApp</a>
        </div>
      </figcaption>
    </figure>
    <button class="lbx__nav lbx__next" data-lbx-next aria-label="Suivant">&#8250;</button>`;
  document.body.appendChild(el);
  el.addEventListener("click",e=>{
    if(e.target.closest("[data-lbx-add]")){ Cart.add(TIMBRES[lbxIndex].id, TABLEAU_SIZE, 1); closeLightbox(); return; }
    if(e.target===el || e.target.closest("[data-lbx-close]")) closeLightbox();
    else if(e.target.closest("[data-lbx-prev]")) showLightbox(lbxIndex-1);
    else if(e.target.closest("[data-lbx-next]")) showLightbox(lbxIndex+1);
  });
  document.addEventListener("keydown",e=>{
    if(!document.getElementById("tableauLbx").classList.contains("open")) return;
    if(e.key==="Escape") closeLightbox();
    if(e.key==="ArrowLeft") showLightbox(lbxIndex-1);
    if(e.key==="ArrowRight") showLightbox(lbxIndex+1);
  });
}
function showLightbox(i){
  const n=TIMBRES.length; lbxIndex=(i%n+n)%n; const t=TIMBRES[lbxIndex];
  const msg=encodeURIComponent(
`Bonjour, je veux commander un tableau imprimé DEM DAKAR : ${t.theme}.
Format : ${t.size} (hauteur 85 cm)
Prix : ${fmt(t.price)}
Quantité : 1
Zone de livraison :`);
  document.getElementById("lbxImg").src=t.img;
  document.getElementById("lbxImg").alt="Tableau "+t.theme;
  document.getElementById("lbxName").textContent=t.theme;
  document.getElementById("lbxMeta").textContent=`${t.size} · ${fmt(t.price)}`;
  document.getElementById("lbxBuy").href=`https://wa.me/${DEM.whatsapp}?text=${msg}`;
  const el=document.getElementById("tableauLbx");
  el.classList.add("open"); el.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function openLightbox(i){ buildLightbox(); showLightbox(i); }
function closeLightbox(){
  const el=document.getElementById("tableauLbx"); if(!el) return;
  el.classList.remove("open"); el.setAttribute("aria-hidden","true"); document.body.style.overflow="";
}
function waIcon(){ return `<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M.06 24l1.68-6.13A11.86 11.86 0 0 1 .16 11.9 11.94 11.94 0 0 1 12.07 0a11.86 11.86 0 0 1 8.44 3.5 11.82 11.82 0 0 1 3.49 8.42c0 6.56-5.35 11.9-11.93 11.9a12 12 0 0 1-5.7-1.45L.06 24zM6.6 20.13l.36.21a9.86 9.86 0 0 0 5.02 1.38h.01c5.45 0 9.9-4.43 9.9-9.88a9.82 9.82 0 0 0-2.9-6.99 9.8 9.8 0 0 0-6.99-2.9c-5.46 0-9.9 4.44-9.9 9.89a9.83 9.83 0 0 0 1.51 5.26l.24.38-1 3.63 3.75-.98zM17.5 14.3c-.07-.12-.26-.2-.55-.34s-1.74-.86-2-.96-.46-.14-.65.14-.74.95-.9 1.14-.34.21-.62.07a8.06 8.06 0 0 1-2.37-1.46 8.9 8.9 0 0 1-1.64-2.04c-.17-.3 0-.45.13-.6.13-.13.29-.34.43-.5.15-.17.2-.29.29-.48a.54.54 0 0 0-.02-.51c-.07-.14-.65-1.57-.9-2.15-.23-.56-.47-.48-.65-.49h-.55a1.07 1.07 0 0 0-.77.36 3.23 3.23 0 0 0-1 2.4 5.6 5.6 0 0 0 1.17 2.98c.14.19 2.02 3.08 4.9 4.32a16.5 16.5 0 0 0 1.63.6 3.93 3.93 0 0 0 1.81.12c.55-.09 1.74-.71 1.98-1.4.25-.68.25-1.27.18-1.39z"/></svg>`; }

/* =========================================================
   PAGE PRODUIT
   ========================================================= */
function initProductPage(){
  const root=document.getElementById("productRoot");
  if(!root) return;
  const id=new URLSearchParams(location.search).get("id") || "blanc";
  const p=findProduct(id) || PRODUCTS[0];
  const imgs=p.images;
  const isCap=p.category==="casquette";
  const siblings=isCap?CAPS:PRODUCTS;
  const dropLabel=isCap?"Drop 002 · Casquettes":"Drop 001 · DEM DAKAR";
  const titleType=isCap?"CASQUETTE DAKAR":"DEM DAKAR";
  const shortDesc=isCap
    ? "Une casquette premium brodée pour porter Dakar tous les jours."
    : "Un t-shirt premium pour porter Dakar autrement.";
  let sel={ size: p.sizes.length===1 ? p.sizes[0] : null, color:p.id };

  const longCap=`
    <p>La casquette DAKAR porte les motifs et l'énergie de la ville : vagues, soleil, chevrons et motifs tissés brodés sur le côté.</p>
    <p>Coupe baseball, structure premium, broderie haute définition. Une pièce pour tous les jours.</p>
    <p style="font-family:var(--font-display);font-size:1.6rem;color:var(--ink)">Un peuple, une ville, un futur.</p>`;
  const longTee=`
    <p>Le t-shirt DEM DAKAR porte les couleurs, les symboles et l'énergie d'une ville en mouvement.</p>
    <p>Pensé comme une pièce lifestyle, il associe une coupe simple, une identité forte et un design inspiré de Dakar : l'océan, le soleil, les rues, la culture et le mouvement. Manches unies, sans motif.</p>
    <p style="font-family:var(--font-display);font-size:1.6rem;color:var(--ink)">Un peuple, une ville, un futur.</p>`;
  const specCap=`
    <li>Casquette unisexe — coupe baseball</li>
    <li>Broderie haute définition sur le côté</li>
    <li>Taille unique réglable</li>
    <li>Couleurs : bleu, vert, jaune</li>
    <li>Livraison à Dakar · Commande via WhatsApp</li>`;
  const specTee=`
    <li>T-shirt unisexe — coupe droite</li>
    <li>Impression haute définition · manches unies</li>
    <li>Tailles : S / M / L / XL / XXL</li>
    <li>Couleurs : blanc, noir, vert, bleu, rouge, jaune</li>
    <li>Livraison à Dakar · Commande via WhatsApp</li>`;

  document.title=`${p.name} — DEM`;
  root.innerHTML=`
    <div class="pd">
      <div class="pd__gallery">
        <div class="pd__main"><img id="pdMain" src="${imgs[0]}" alt="${p.name}"></div>
        ${imgs.length>1?`<div class="pd__thumbs" id="pdThumbs">
          ${imgs.map((src,i)=>`<button class="pd__thumb ${i===0?'is-active':''}" data-src="${src}"><img src="${src}" alt="vue ${i+1}"></button>`).join("")}
        </div>`:``}
      </div>
      <div class="pd__info">
        <p class="breadcrumb"><a href="index.html">Accueil</a> / <a href="boutique.html">Boutique</a> / ${p.color}</p>
        <span class="eyebrow">${dropLabel}</span>
        <h1 style="font-size:clamp(2.4rem,6.5vw,4.2rem);margin-top:.4rem">${titleType}<br><span style="color:var(--red)">${p.color}</span></h1>
        <p class="lead" style="margin-top:1rem">${shortDesc}</p>
        <div class="pd__price">${fmt(p.price)}</div>

        <div class="pd__opt">
          <h5>Couleur — ${p.color}</h5>
          <div class="color-row" id="pdColors">
            ${siblings.map(c=>`<a href="produit.html?id=${c.id}" class="color-dot ${c.id===p.id?'is-active':''}" title="${c.color}" style="background:${c.hex}"></a>`).join("")}
          </div>
        </div>

        <div class="pd__opt">
          <h5>${isCap?"Taille":"Taille"}</h5>
          <div class="size-row" id="pdSizes">
            ${p.sizes.map(s=>`<button class="size ${sel.size===s?'is-active':''}" data-size="${s}">${s}</button>`).join("")}
          </div>
        </div>

        <div class="pd__qtyrow">
          <div class="qty" style="margin-top:0">
            <button id="qtyDec">−</button><span id="qtyVal">1</span><button id="qtyInc">+</button>
          </div>
          <span style="font-size:.85rem;color:var(--muted)">Livraison à Dakar · Paiement Wave / OM / à la livraison</span>
        </div>

        <div class="pd__buy">
          <button class="btn btn--solid btn--lg btn--block" id="addBtn">Commander maintenant</button>
          <a class="btn btn--wa btn--lg btn--block" id="waBtn" target="_blank" rel="noopener" href="#">${waIcon()} Écrire sur WhatsApp</a>
          <p id="selWarn" style="display:none;color:var(--red);font-size:.82rem;font-weight:700">Choisis une taille d'abord.</p>
        </div>

        <div class="pd__meta">
          <div class="longdesc">${isCap?longCap:longTee}</div>
          <ul style="margin-top:1.4rem">${isCap?specCap:specTee}</ul>
        </div>
      </div>
    </div>`;

  let qty=1;
  const $=s=>root.querySelector(s);
  const updateWa=()=>{
    const msg=encodeURIComponent(
`Bonjour, je veux commander : ${p.name}.
Couleur : ${p.color}
Taille : ${sel.size||"—"}
Quantité : ${qty}
Mode de paiement :
Zone de livraison :`);
    $("#waBtn").href=`https://wa.me/${DEM.whatsapp}?text=${msg}`;
  };
  updateWa();

  $("#pdThumbs")?.addEventListener("click",e=>{
    const b=e.target.closest(".pd__thumb"); if(!b)return;
    $("#pdMain").src=b.dataset.src;
    root.querySelectorAll(".pd__thumb").forEach(t=>t.classList.toggle("is-active",t===b));
  });
  $("#pdSizes").addEventListener("click",e=>{
    const b=e.target.closest(".size"); if(!b)return;
    sel.size=b.dataset.size;
    root.querySelectorAll(".size").forEach(s=>s.classList.toggle("is-active",s===b));
    $("#selWarn").style.display="none"; updateWa();
  });
  $("#qtyDec").onclick=()=>{ qty=Math.max(1,qty-1); $("#qtyVal").textContent=qty; updateWa(); };
  $("#qtyInc").onclick=()=>{ qty++; $("#qtyVal").textContent=qty; updateWa(); };
  $("#addBtn").onclick=()=>{
    if(!sel.size){ $("#selWarn").style.display="block"; return; }
    Cart.add(p.id,sel.size,qty);
  };
}

/* =========================================================
   PAGE CONTACT — formulaire -> WhatsApp
   ========================================================= */
function initOrderForm(){
  const form=document.getElementById("orderForm");
  if(!form) return;
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const f=new FormData(form);
    const msg=encodeURIComponent(
`Bonjour, je veux commander un t-shirt DEM DAKAR.
Nom : ${f.get("nom")||""}
Couleur : ${f.get("couleur")||""}
Taille : ${f.get("taille")||""}
Quantité : ${f.get("quantite")||"1"}
Mode de paiement : ${f.get("paiement")||""}
Zone de livraison : ${f.get("zone")||""}
Message : ${f.get("message")||"—"}`);
    window.open(`https://wa.me/${DEM.whatsapp}?text=${msg}`,"_blank");
  });
}

/* =========================================================
   NAV mobile + global wiring
   ========================================================= */
function initChrome(){
  // année footer
  document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
  // liens whatsapp / instagram dynamiques
  document.querySelectorAll("[data-wa]").forEach(a=>{
    const base=`https://wa.me/${DEM.whatsapp}`;
    a.href = a.dataset.wa ? `${base}?text=${encodeURIComponent(a.dataset.wa)}` : base;
  });
  document.querySelectorAll("[data-ig]").forEach(a=>a.href=DEM.instagram);
  // bloc motifs (logo) dans le pied de page
  document.querySelectorAll(".footer-brand").forEach(fb=>{
    if(fb.querySelector(".logo-motifs")) return;
    const html = motifStrip() + '<div class="footer-tag">Un peuple, une ville, un futur</div>';
    const payRow = fb.querySelector(".pay-row");
    if(payRow) payRow.insertAdjacentHTML("beforebegin", html);
    else fb.insertAdjacentHTML("beforeend", html);
  });
  // numéros de paiement dynamiques
  document.querySelectorAll("[data-pay-wave]").forEach(el=>el.textContent=DEM.payment.wave);
  document.querySelectorAll("[data-pay-om]").forEach(el=>el.textContent=DEM.payment.orangeMoney);

  // burger
  const burger=document.getElementById("burger"),links=document.getElementById("navLinks");
  if(burger&&links){
    burger.addEventListener("click",()=>{burger.classList.toggle("open");links.classList.toggle("open");});
    links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{burger.classList.remove("open");links.classList.remove("open");}));
  }
  // active link
  const page=(location.pathname.split("/").pop()||"index.html");
  document.querySelectorAll(".nav__links a").forEach(a=>{
    if(a.getAttribute("href")===page) a.classList.add("is-active");
  });

  // injecte le sélecteur de paiement dans le panier
  const foot=document.getElementById("cartFoot");
  if(foot && !foot.querySelector("#paySelect")){
    foot.querySelector(".drawer__total")?.insertAdjacentHTML("afterend", paymentSelectorHTML());
  }

  // cart open/close
  document.querySelectorAll("[data-open-cart]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();Cart.render();openDrawer();}));
  document.getElementById("overlay")?.addEventListener("click",closeDrawer);
  document.getElementById("cartClose")?.addEventListener("click",closeDrawer);
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDrawer();});

  // cart body interactions (delegate)
  document.getElementById("cartBody")?.addEventListener("click",e=>{
    const b=e.target.closest("button[data-act]"); if(!b)return;
    const {act,id,size}=b.dataset;
    const line=Cart.get().find(i=>i.id===id&&i.size===size); if(!line&&act!=="rm")return;
    if(act==="inc")Cart.setQty(id,size,line.qty+1);
    if(act==="dec")Cart.setQty(id,size,line.qty-1);
    if(act==="rm")Cart.remove(id,size);
  });
  // checkout via whatsapp
  document.getElementById("cartCheckout")?.addEventListener("click",()=>{
    if(!Cart.count())return;
    window.open(`https://wa.me/${DEM.whatsapp}?text=${Cart.whatsappMessage()}`,"_blank");
  });
}

/* ---- boot ---- */
document.addEventListener("DOMContentLoaded",()=>{
  initChrome();
  Cart.render();
  renderGrid("shopGrid", PRODUCTS);      // boutique — t-shirts
  renderGrid("homeGrid", PRODUCTS, 6);   // accueil — t-shirts
  renderGrid("capsGrid", CAPS);          // boutique + accueil — casquettes
  renderGrid("homeCapsGrid", CAPS);      // accueil — casquettes
  renderTimbresTable("timbresTable");    // boutique — timbres à imprimer
  initProductPage();
  initOrderForm();
});
