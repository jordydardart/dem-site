/* =========================================================
   DEM — front-end logic (bilingue FR / EN)
   Cart (localStorage) · WhatsApp · Nav · Produits · SEO
   La langue est détectée via le chemin /en/.
   ========================================================= */

/* ---- CONFIG ---- */
const DEM = {
  whatsapp: "221780109399",
  instagram: "https://www.instagram.com/__demsn__/",
  site: "www.demsn.sn",
  currency: "FCFA",
  payment: { wave: "+221 78 010 93 99", orangeMoney: "+221 77 824 53 25" },
};

/* ---- Langue ---- */
const LANG = location.pathname.includes("/en/") ? "en" : "fr";
const BASE = LANG === "en" ? "https://www.demsn.sn/en" : "https://www.demsn.sn";
const A = LANG === "en" ? "../" : "";   // préfixe assets pour les pages /en/

/* ---- Traductions ---- */
const I18N = {
  fr: {
    order:"Commander", orderNow:"Commander maintenant", waWrite:"Écrire sur WhatsApp",
    chooseSize:"Choisis une taille d'abord.", sizesLabel:"Tailles", oneSize:"Taille unique",
    size:"Taille", format:"Format", color:"Couleur", addCart:"+ Panier", viewLarge:"⤢ Voir en grand",
    cartEmptyTitle:"Panier vide", cartEmptySub:"Le mouvement t'attend.", shopNow:"Voir la boutique",
    remove:"Retirer", payMethod:"Mode de paiement",
    payModes:["Wave","Orange Money","Paiement à la livraison"], payDefault:"Paiement à la livraison",
    th:{preview:"Aperçu",artwork:"Tableau",size:"Format",price:"Prix",cart:"Panier"},
    footerTag:"Un peuple, une ville, un futur",
    deliveryNote:"Livraison à Dakar · Paiement Wave / OM / à la livraison",
    home:"Accueil", shop:"Boutique", view:"vue",
    dropTee:"Drop 001 · DEM DAKAR", dropCap:"Drop 002 · Casquettes",
    titleTee:"DEM DAKAR", titleCap:"CASQUETTE DAKAR",
    shortTee:"Un t-shirt premium pour porter Dakar autrement.",
    shortCap:"Une casquette premium brodée pour porter Dakar tous les jours.",
    slogan:"Un peuple, une ville, un futur.",
    typeTee:"T-shirt DEM DAKAR", typeCap:"Casquette DAKAR", typeArt:"Tableau DEM DAKAR",
    colors:{blanc:"Blanc",noir:"Noir",vert:"Vert",bleu:"Bleu",rouge:"Rouge",jaune:"Jaune"},
    themes:{"t-renaissance":"Monument de la Renaissance","t-lacrose":"Lac Rose","t-millenaire":"Place du Millénaire","t-carte":"Carte de Dakar"},
    longTee:`
      <p>Le t-shirt DEM DAKAR porte les couleurs, les symboles et l'énergie d'une ville en mouvement.</p>
      <p>Pensé comme une pièce lifestyle, il associe une coupe simple, une identité forte et un design inspiré de Dakar : l'océan, le soleil, les rues, la culture et le mouvement. Manches unies, sans motif.</p>
      <p style="font-family:var(--font-display);font-size:1.6rem;color:var(--ink)">Un peuple, une ville, un futur.</p>`,
    longCap:`
      <p>La casquette DAKAR porte les motifs et l'énergie de la ville : vagues, soleil, chevrons et motifs tissés brodés sur le côté.</p>
      <p>Coupe baseball, structure premium, broderie haute définition. Une pièce pour tous les jours.</p>
      <p style="font-family:var(--font-display);font-size:1.6rem;color:var(--ink)">Un peuple, une ville, un futur.</p>`,
    specTee:`
      <li>T-shirt unisexe — coupe droite</li>
      <li>Impression haute définition · manches unies</li>
      <li>Tailles : S / M / L / XL / XXL</li>
      <li>Couleurs : blanc, noir, vert, bleu, rouge, jaune</li>
      <li>Livraison à Dakar · Commande via WhatsApp</li>`,
    specCap:`
      <li>Casquette unisexe — coupe baseball</li>
      <li>Broderie haute définition sur le côté</li>
      <li>Taille unique réglable</li>
      <li>Couleurs : noir, bleu, vert, jaune</li>
      <li>Livraison à Dakar · Commande via WhatsApp</li>`,
    seoDeliver:"Livraison à Dakar, paiement Wave / Orange Money.",
    wa:{ cartHello:"Bonjour, je veux commander chez DEM DAKAR :", total:"Total", pay:"Mode de paiement",
      zone:"Zone de livraison", prodHello:"Bonjour, je veux commander :", color:"Couleur", size:"Taille",
      qty:"Quantité", artHello:"Bonjour, je veux commander un tableau imprimé DEM DAKAR :",
      format:"Format", price:"Prix", height:"hauteur 85 cm" },
  },
  en: {
    order:"Order", orderNow:"Order now", waWrite:"Message on WhatsApp",
    chooseSize:"Please choose a size first.", sizesLabel:"Sizes", oneSize:"One size",
    size:"Size", format:"Size", color:"Colour", addCart:"+ Cart", viewLarge:"⤢ View large",
    cartEmptyTitle:"Cart empty", cartEmptySub:"The movement awaits.", shopNow:"Go to shop",
    remove:"Remove", payMethod:"Payment method",
    payModes:["Wave","Orange Money","Cash on delivery"], payDefault:"Cash on delivery",
    th:{preview:"Preview",artwork:"Art print",size:"Size",price:"Price",cart:"Cart"},
    footerTag:"One people, one city, one future",
    deliveryNote:"Delivery in Dakar · Wave / OM / cash on delivery",
    home:"Home", shop:"Shop", view:"view",
    dropTee:"Drop 001 · DEM DAKAR", dropCap:"Drop 002 · Caps",
    titleTee:"DEM DAKAR", titleCap:"DAKAR CAP",
    shortTee:"A premium t-shirt to wear Dakar your way.",
    shortCap:"A premium embroidered cap to wear Dakar every day.",
    slogan:"One people, one city, one future.",
    typeTee:"DEM DAKAR T-shirt", typeCap:"DAKAR Cap", typeArt:"DEM DAKAR Art print",
    colors:{blanc:"White",noir:"Black",vert:"Green",bleu:"Blue",rouge:"Red",jaune:"Yellow"},
    themes:{"t-renaissance":"African Renaissance Monument","t-lacrose":"Pink Lake (Lac Rose)","t-millenaire":"Millennium Square","t-carte":"Map of Dakar"},
    longTee:`
      <p>The DEM DAKAR t-shirt carries the colours, symbols and energy of a city in motion.</p>
      <p>Designed as a lifestyle piece, it blends a clean cut, a strong identity and a design inspired by Dakar: the ocean, the sun, the streets, the culture and the movement. Plain sleeves, no pattern.</p>
      <p style="font-family:var(--font-display);font-size:1.6rem;color:var(--ink)">One people, one city, one future.</p>`,
    longCap:`
      <p>The DAKAR cap carries the city's patterns and energy: waves, sun, chevrons and woven motifs embroidered on the side.</p>
      <p>Baseball cut, premium structure, high-definition embroidery. A piece for every day.</p>
      <p style="font-family:var(--font-display);font-size:1.6rem;color:var(--ink)">One people, one city, one future.</p>`,
    specTee:`
      <li>Unisex t-shirt — straight cut</li>
      <li>High-definition print · plain sleeves</li>
      <li>Sizes: S / M / L / XL / XXL</li>
      <li>Colours: white, black, green, blue, red, yellow</li>
      <li>Delivery in Dakar · Order via WhatsApp</li>`,
    specCap:`
      <li>Unisex cap — baseball cut</li>
      <li>High-definition side embroidery</li>
      <li>One size, adjustable</li>
      <li>Colours: black, blue, green, yellow</li>
      <li>Delivery in Dakar · Order via WhatsApp</li>`,
    seoDeliver:"Delivery in Dakar, Wave / Orange Money payment.",
    wa:{ cartHello:"Hello, I'd like to order from DEM DAKAR:", total:"Total", pay:"Payment method",
      zone:"Delivery area", prodHello:"Hello, I'd like to order:", color:"Colour", size:"Size",
      qty:"Quantity", artHello:"Hello, I'd like to order a DEM DAKAR art print:",
      format:"Size", price:"Price", height:"height 85 cm" },
  },
};
const tx = I18N[LANG];

/* ---- Helpers ---- */
const SIZES = ["S","M","L","XL","XXL"];
const ONE_SIZE = "Taille unique";          // jeton interne (panier) — affiché traduit
const fmt = n => n.toLocaleString("fr-FR") + " " + DEM.currency;
const sizeDisplay = s => s===ONE_SIZE ? tx.oneSize : s;
const sizeLabel   = s => s===ONE_SIZE ? tx.oneSize : (/cm|×/.test(s) ? tx.format+" "+s : tx.size+" "+s);

/* ---- T-shirts (Drop 01) ---- */
const PRODUCTS = [
  { id:"blanc", hex:"#f4efe3", images:["assets/products/blanc.jpg"] },
  { id:"noir",  hex:"#161616", images:["assets/products/noir.jpg"] },
  { id:"vert",  hex:"#1f8f4d", images:["assets/products/vert.jpg"] },
  { id:"bleu",  hex:"#16307a", images:["assets/products/bleu.jpg"] },
  { id:"rouge", hex:"#e23b2e", images:["assets/products/rouge.jpg"] },
  { id:"jaune", hex:"#f4b51e", images:["assets/products/jaune.jpg"] },
].map(p=>{ const color=tx.colors[p.id];
  return { ...p, category:"tshirt", color, typeLabel:tx.typeTee,
    name:`${tx.typeTee} — ${color}`, price:15000, sizes:SIZES, main:p.images[0], alt:p.images[0] }; });

/* ---- Casquettes (Drop 02) ---- */
const CAPS = [
  { id:"cap-noir",  ck:"noir",  hex:"#161616", images:["assets/caps/cap-noir.jpg"] },
  { id:"cap-bleu",  ck:"bleu",  hex:"#16307a", images:["assets/caps/cap-bleu.jpg","assets/caps/cap-bleu-worn.jpg"] },
  { id:"cap-vert",  ck:"vert",  hex:"#1f8f4d", images:["assets/caps/cap-vert.jpg","assets/caps/cap-vert-2.jpg"] },
  { id:"cap-jaune", ck:"jaune", hex:"#f4b51e", images:["assets/caps/cap-jaune.jpg","assets/caps/cap-jaune-worn.jpg"] },
].map(p=>{ const color=tx.colors[p.ck];
  return { ...p, category:"casquette", color, typeLabel:tx.typeCap,
    name:`${tx.typeCap} — ${color}`, price:10000, sizes:[ONE_SIZE], main:p.images[0], alt:p.images[1]||p.images[0] }; });

const ALL = [...PRODUCTS, ...CAPS];
const findProduct = id => ALL.find(p => p.id === id) || TIMBRES.find(t => t.id === id);

/* ---- Tableaux imprimés ---- */
const TABLEAU_PRICE = 45000;
const TABLEAU_SIZE  = "68 × 85 cm";
const TIMBRES = [
  { id:"t-renaissance", img:"assets/timbres/renaissance.jpg" },
  { id:"t-lacrose",     img:"assets/timbres/lacrose.jpg" },
  { id:"t-millenaire",  img:"assets/timbres/millenaire.jpg" },
  { id:"t-carte",       img:"assets/timbres/carte.jpg" },
].map(t=>{ const theme=tx.themes[t.id];
  return { ...t, theme, serie:"Série Dakar", name:`${tx.typeArt} — ${theme}`, color:theme,
    typeLabel:tx.typeArt, category:"tableau", main:t.img, images:[t.img],
    price:TABLEAU_PRICE, size:TABLEAU_SIZE, sizes:[TABLEAU_SIZE] }; });

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
    document.querySelectorAll(".cart-count").forEach(el=>{
      const c=this.count(); el.textContent=c; el.setAttribute("data-count",c);
    });
    const body=document.getElementById("cartBody");
    const foot=document.getElementById("cartFoot");
    if(!body) return;
    const items=this.get();
    if(!items.length){
      body.innerHTML=`<div class="drawer__empty">
        <p style="font-family:var(--font-display);font-size:2rem">${tx.cartEmptyTitle}</p>
        <p style="margin-top:.5rem">${tx.cartEmptySub}</p>
        <a href="boutique.html" class="btn btn--solid" style="margin-top:1.4rem">${tx.shopNow}</a>
      </div>`;
      if(foot) foot.style.display="none";
      return;
    }
    if(foot) foot.style.display="grid";
    body.innerHTML=items.map(i=>{
      const p=findProduct(i.id); if(!p) return "";
      return `<div class="citem">
        <img src="${A}${p.main}" alt="${p.name}">
        <div>
          <div class="citem__t">${p.name}</div>
          <div class="citem__m">${sizeLabel(i.size)} · ${fmt(p.price)}</div>
          <div class="qty">
            <button aria-label="−" data-act="dec" data-id="${p.id}" data-size="${i.size}">−</button>
            <span>${i.qty}</span>
            <button aria-label="+" data-act="inc" data-id="${p.id}" data-size="${i.size}">+</button>
          </div>
        </div>
        <div style="text-align:right">
          <div class="citem__price">${fmt(p.price*i.qty)}</div>
          <button class="citem__rm" data-act="rm" data-id="${p.id}" data-size="${i.size}">${tx.remove}</button>
        </div>
      </div>`;
    }).join("");
    const totalEl=document.getElementById("cartTotal");
    if(totalEl) totalEl.textContent=fmt(this.total());
  },

  whatsappMessage(){
    const items=this.get(); const w=tx.wa;
    let raw=w.cartHello+"\n\n";
    items.forEach(i=>{ const p=findProduct(i.id);
      raw+=`• ${p.typeLabel} ${p.color} — ${sizeLabel(i.size)} × ${i.qty} (${fmt(p.price*i.qty)})\n`; });
    raw+=`\n${w.total} : ${fmt(this.total())}\n`;
    raw+=`${w.pay} : ${selectedPayment()}\n`;
    raw+=`${w.zone} : `;
    return encodeURIComponent(raw);
  }
};

/* ---- Paiement ---- */
function selectedPayment(){
  const checked=document.querySelector('input[name="payMode"]:checked');
  return checked ? checked.value : tx.payDefault;
}
function paymentSelectorHTML(){
  return `<div class="pay-select" id="paySelect">
    <p class="pay-select__label">${tx.payMethod}</p>
    ${tx.payModes.map(m=>`
      <label class="pay-opt">
        <input type="radio" name="payMode" value="${m}" ${m===tx.payDefault?'checked':''}>
        <span class="pay-opt__dot"></span>
        <span class="pay-opt__txt">${m}</span>
      </label>`).join("")}
  </div>`;
}

/* ---- Bloc motifs du logo DEM DAKAR ---- */
function motifStrip(){
  return `<svg class="logo-motifs" viewBox="0 0 164 28" height="28" role="img" aria-label="DEM DAKAR">
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
   RENDER : grille produits
   ========================================================= */
function renderGrid(targetId, list, limit){
  const wrap=document.getElementById(targetId);
  if(!wrap || !list) return;
  const items = limit ? list.slice(0,limit) : list;
  wrap.innerHTML=items.map(p=>{
    const sl = p.category==="casquette" ? tx.oneSize : tx.sizesLabel+" "+p.sizes.join(" / ");
    return `
    <article class="pcard">
      <a class="pcard__media" href="produit.html?id=${p.id}" aria-label="${p.name}">
        <img class="main" src="${A}${p.main}" alt="${p.name}" loading="lazy">
        <img class="alt" src="${A}${p.alt}" alt="${p.name}" loading="lazy">
        <span class="pcard__flag">
          <i style="background:#16307a"></i><i style="background:#1f8f4d"></i>
          <i style="background:#f4b51e"></i><i style="background:#e23b2e"></i>
        </span>
      </a>
      <div class="pcard__body">
        <a href="produit.html?id=${p.id}"><h3 class="pcard__name">${p.color}</h3></a>
        <div class="pcard__price">${fmt(p.price)}</div>
        <div class="pcard__sizes">${sl}</div>
        <div class="pcard__actions">
          <a href="produit.html?id=${p.id}" class="btn btn--solid btn--block">${tx.order}</a>
          <a class="btn btn--wa btn--block" target="_blank" rel="noopener"
             href="https://wa.me/${DEM.whatsapp}?text=${waProductMsg(p)}">${waIcon()} WhatsApp</a>
        </div>
      </div>
    </article>`;}).join("");
}
function waProductMsg(p){ const w=tx.wa;
  return encodeURIComponent(
`${w.prodHello} ${p.name}.
${w.color} : ${p.color}
${w.size} :${p.category==="casquette"?" "+tx.oneSize:""}
${w.qty} : 1
${w.zone} :`);
}

/* =========================================================
   RENDER : tableau Tableaux
   ========================================================= */
function renderTimbresTable(targetId){
  const wrap=document.getElementById(targetId);
  if(!wrap) return;
  const h=tx.th;
  wrap.innerHTML=`
    <table class="tbl-timbres">
      <thead>
        <tr><th>${h.preview}</th><th>${h.artwork}</th><th class="col-serie">${h.size}</th><th>${h.price}</th><th class="col-act">${h.cart}</th></tr>
      </thead>
      <tbody>
        ${TIMBRES.map((t,i)=>{
          return `<tr>
            <td class="tbl-thumb" data-lbx="${i}" title="${tx.viewLarge}"><img src="${A}${t.img}" alt="${t.theme}" loading="lazy"><span class="tbl-thumb__zoom">⤢</span></td>
            <td><span class="tbl-name">${t.theme}</span><span class="tbl-serie-m">${t.size} · ${t.serie}</span><button class="tbl-zoom" data-lbx="${i}">${tx.viewLarge}</button></td>
            <td class="col-serie">${t.size}</td>
            <td class="tbl-price">${fmt(t.price)}</td>
            <td class="col-act"><button class="btn btn--solid btn--sm" data-add="${t.id}">${tx.addCart}</button></td>
          </tr>`;
        }).join("")}
      </tbody>
    </table>`;

  wrap.addEventListener("click",e=>{
    const add=e.target.closest("[data-add]");
    if(add){ Cart.add(add.dataset.add, TABLEAU_SIZE, 1); return; }
    const z=e.target.closest("[data-lbx]");
    if(z){ e.preventDefault(); openLightbox(+z.dataset.lbx); }
  });
}

/* ---- RENDER : tableaux en cartes (comme les t-shirts) ---- */
function renderTableaux(targetId, limit){
  const wrap=document.getElementById(targetId);
  if(!wrap) return;
  const list = limit ? TIMBRES.slice(0,limit) : TIMBRES;
  wrap.innerHTML=list.map((t,i)=>`
    <article class="pcard">
      <a class="pcard__media pcard__media--zoom" data-lbx="${i}" aria-label="${t.theme}">
        <img class="main" src="${A}${t.img}" alt="Tableau ${t.theme}" loading="lazy">
        <span class="pcard__zoom">⤢</span>
      </a>
      <div class="pcard__body">
        <h3 class="pcard__name">${t.theme}</h3>
        <div class="pcard__price">${fmt(t.price)}</div>
        <div class="pcard__sizes">${tx.th.artwork} · ${t.size}</div>
        <div class="pcard__actions">
          <button class="btn btn--solid btn--block" data-add="${t.id}">${tx.addCart}</button>
          <button class="btn btn--ghost btn--block" data-lbx="${i}">${tx.viewLarge}</button>
        </div>
      </div>
    </article>`).join("");
  wrap.addEventListener("click",e=>{
    const add=e.target.closest("[data-add]");
    if(add){ Cart.add(add.dataset.add, TABLEAU_SIZE, 1); return; }
    const z=e.target.closest("[data-lbx]");
    if(z){ e.preventDefault(); openLightbox(+z.dataset.lbx); }
  });
}

/* =========================================================
   LIGHTBOX
   ========================================================= */
let lbxIndex=0;
function buildLightbox(){
  if(document.getElementById("tableauLbx")) return;
  const el=document.createElement("div");
  el.className="lbx"; el.id="tableauLbx"; el.setAttribute("aria-hidden","true");
  el.innerHTML=`
    <button class="lbx__close" data-lbx-close aria-label="×">&times;</button>
    <button class="lbx__nav lbx__prev" data-lbx-prev aria-label="‹">&#8249;</button>
    <figure class="lbx__fig">
      <img id="lbxImg" src="" alt="">
      <figcaption class="lbx__cap">
        <div><span class="lbx__name" id="lbxName"></span><span class="lbx__meta" id="lbxMeta"></span></div>
        <div class="lbx__actions">
          <button class="btn btn--solid" data-lbx-add>${tx.addCart}</button>
          <a class="btn btn--wa" id="lbxBuy" target="_blank" rel="noopener">${waIcon()} WhatsApp</a>
        </div>
      </figcaption>
    </figure>
    <button class="lbx__nav lbx__next" data-lbx-next aria-label="›">&#8250;</button>`;
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
  const n=TIMBRES.length; lbxIndex=(i%n+n)%n; const t=TIMBRES[lbxIndex]; const w=tx.wa;
  const msg=encodeURIComponent(
`${w.artHello} ${t.theme}.
${w.format} : ${t.size} (${w.height})
${w.price} : ${fmt(t.price)}
${w.qty} : 1
${w.zone} :`);
  document.getElementById("lbxImg").src=A+t.img;
  document.getElementById("lbxImg").alt=t.theme;
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
  const dropLabel=isCap?tx.dropCap:tx.dropTee;
  const titleType=isCap?tx.titleCap:tx.titleTee;
  const shortDesc=isCap?tx.shortCap:tx.shortTee;
  let sel={ size: p.sizes.length===1 ? p.sizes[0] : null, color:p.id };

  document.title=`${p.name} — ${fmt(p.price)} | DEM DAKAR`;
  (function seo(){
    const url=`${BASE}/produit.html?id=${p.id}`;
    const imgAbs=`https://www.demsn.sn/${p.main}`;
    const desc=`${p.name} — ${shortDesc} ${fmt(p.price)}. ${tx.seoDeliver}`;
    const setMeta=(name,val)=>{let m=document.querySelector(`meta[name="${name}"]`)||document.querySelector(`meta[property="${name}"]`);if(m)m.setAttribute("content",val);};
    document.querySelector('meta[name="description"]')?.setAttribute("content",desc);
    document.getElementById("canonical")?.setAttribute("href",url);
    setMeta("og:title",`${p.name} — ${fmt(p.price)}`);
    setMeta("og:description",desc);
    setMeta("og:url",url);
    setMeta("og:image",imgAbs);
    setMeta("twitter:image",imgAbs);
    const data={ "@context":"https://schema.org","@type":"Product",
      name:p.name, image:imgAbs, description:desc, brand:{"@type":"Brand",name:"DEM DAKAR"},
      category:isCap?"Cap":"T-shirt",
      offers:{"@type":"Offer",url:url,priceCurrency:"XOF",price:p.price,availability:"https://schema.org/InStock",
        seller:{"@type":"Organization",name:"DEM DAKAR"}}};
    let s=document.getElementById("productLd"); if(!s){s=document.createElement("script");s.type="application/ld+json";s.id="productLd";document.head.appendChild(s);}
    s.textContent=JSON.stringify(data);
  })();
  root.innerHTML=`
    <div class="pd">
      <div class="pd__gallery">
        <div class="pd__main"><img id="pdMain" src="${A}${imgs[0]}" alt="${p.name}"></div>
        ${imgs.length>1?`<div class="pd__thumbs" id="pdThumbs">
          ${imgs.map((src,i)=>`<button class="pd__thumb ${i===0?'is-active':''}" data-src="${A}${src}"><img src="${A}${src}" alt="${tx.view} ${i+1}"></button>`).join("")}
        </div>`:``}
      </div>
      <div class="pd__info">
        <p class="breadcrumb"><a href="index.html">${tx.home}</a> / <a href="boutique.html">${tx.shop}</a> / ${p.color}</p>
        <span class="eyebrow">${dropLabel}</span>
        <h1 style="font-size:clamp(2.4rem,6.5vw,4.2rem);margin-top:.4rem">${titleType}<br><span style="color:var(--red)">${p.color}</span></h1>
        <p class="lead" style="margin-top:1rem">${shortDesc}</p>
        <div class="pd__price">${fmt(p.price)}</div>

        <div class="pd__opt">
          <h5>${tx.color} — ${p.color}</h5>
          <div class="color-row" id="pdColors">
            ${siblings.map(c=>`<a href="produit.html?id=${c.id}" class="color-dot ${c.id===p.id?'is-active':''}" title="${c.color}" style="background:${c.hex}"></a>`).join("")}
          </div>
        </div>

        <div class="pd__opt">
          <h5>${tx.size}</h5>
          <div class="size-row" id="pdSizes">
            ${p.sizes.map(s=>`<button class="size ${sel.size===s?'is-active':''}" data-size="${s}">${sizeDisplay(s)}</button>`).join("")}
          </div>
        </div>

        <div class="pd__qtyrow">
          <div class="qty" style="margin-top:0">
            <button id="qtyDec">−</button><span id="qtyVal">1</span><button id="qtyInc">+</button>
          </div>
          <span style="font-size:.85rem;color:var(--muted)">${tx.deliveryNote}</span>
        </div>

        <div class="pd__buy">
          <button class="btn btn--solid btn--lg btn--block" id="addBtn">${tx.orderNow}</button>
          <a class="btn btn--wa btn--lg btn--block" id="waBtn" target="_blank" rel="noopener" href="#">${waIcon()} ${tx.waWrite}</a>
          <p id="selWarn" style="display:none;color:var(--red);font-size:.82rem;font-weight:700">${tx.chooseSize}</p>
        </div>

        <div class="pd__meta">
          <div class="longdesc">${isCap?tx.longCap:tx.longTee}</div>
          <ul style="margin-top:1.4rem">${isCap?tx.specCap:tx.specTee}</ul>
        </div>
      </div>
    </div>`;

  let qty=1;
  const $=s=>root.querySelector(s);
  const w=tx.wa;
  const updateWa=()=>{
    const msg=encodeURIComponent(
`${w.prodHello} ${p.name}.
${w.color} : ${p.color}
${w.size} : ${sel.size?sizeDisplay(sel.size):"—"}
${w.qty} : ${qty}
${w.pay} :
${w.zone} :`);
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
  const w=tx.wa;
  const hello = LANG==="en" ? "Hello, I'd like to order from DEM DAKAR." : "Bonjour, je veux commander chez DEM DAKAR.";
  const nameL = LANG==="en" ? "Name" : "Nom";
  const msgL  = LANG==="en" ? "Message" : "Message";
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const f=new FormData(form);
    const msg=encodeURIComponent(
`${hello}
${nameL} : ${f.get("nom")||""}
${w.color} : ${f.get("couleur")||""}
${w.size} : ${f.get("taille")||""}
${w.qty} : ${f.get("quantite")||"1"}
${w.pay} : ${f.get("paiement")||""}
${w.zone} : ${f.get("zone")||""}
${msgL} : ${f.get("message")||"—"}`);
    window.open(`https://wa.me/${DEM.whatsapp}?text=${msg}`,"_blank");
  });
}

/* =========================================================
   NAV mobile + global wiring
   ========================================================= */
/* ---- Langue : sélecteur + hreflang ---- */
function initLang(){
  let page=(location.pathname.split("/").pop()||"index.html");
  if(!page.endsWith(".html")) page="index.html";
  const qs=location.search||"";
  // sélecteur visible
  const actions=document.querySelector(".nav__actions");
  if(actions && !actions.querySelector(".lang-switch")){
    const frHref = LANG==="en" ? `../${page}${qs}` : `${page}${qs}`;
    const enHref = LANG==="en" ? `${page}${qs}` : `en/${page}${qs}`;
    const sw=document.createElement("div");
    sw.className="lang-switch";
    sw.innerHTML = LANG==="en"
      ? `<a href="${frHref}">FR</a><span class="sep">·</span><span class="lang-active">EN</span>`
      : `<span class="lang-active">FR</span><span class="sep">·</span><a href="${enHref}">EN</a>`;
    actions.insertBefore(sw, actions.firstChild);
  }
  // hreflang (SEO international)
  if(!document.querySelector('link[rel="alternate"][hreflang]')){
    const frAbs=`https://www.demsn.sn/${page}${qs}`;
    const enAbs=`https://www.demsn.sn/en/${page}${qs}`;
    const add=(hl,href)=>{const l=document.createElement("link");l.rel="alternate";l.setAttribute("hreflang",hl);l.href=href;document.head.appendChild(l);};
    add("fr",frAbs); add("en",enAbs); add("x-default",frAbs);
  }
}

function initChrome(){
  initLang();
  document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
  document.querySelectorAll("[data-wa]").forEach(a=>{
    const base=`https://wa.me/${DEM.whatsapp}`;
    a.href = a.dataset.wa ? `${base}?text=${encodeURIComponent(a.dataset.wa)}` : base;
  });
  document.querySelectorAll("[data-ig]").forEach(a=>a.href=DEM.instagram);
  document.querySelectorAll(".footer-brand").forEach(fb=>{
    if(fb.querySelector(".logo-motifs")) return;
    const html = motifStrip() + `<div class="footer-tag">${tx.footerTag}</div>`;
    const payRow = fb.querySelector(".pay-row");
    if(payRow) payRow.insertAdjacentHTML("beforebegin", html);
    else fb.insertAdjacentHTML("beforeend", html);
  });
  document.querySelectorAll("[data-pay-wave]").forEach(el=>el.textContent=DEM.payment.wave);
  document.querySelectorAll("[data-pay-om]").forEach(el=>el.textContent=DEM.payment.orangeMoney);

  const burger=document.getElementById("burger"),links=document.getElementById("navLinks");
  if(burger&&links){
    burger.addEventListener("click",()=>{burger.classList.toggle("open");links.classList.toggle("open");});
    links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{burger.classList.remove("open");links.classList.remove("open");}));
  }
  const page=(location.pathname.split("/").pop()||"index.html");
  document.querySelectorAll(".nav__links a").forEach(a=>{
    if(a.getAttribute("href")===page) a.classList.add("is-active");
  });

  const foot=document.getElementById("cartFoot");
  if(foot && !foot.querySelector("#paySelect")){
    foot.querySelector(".drawer__total")?.insertAdjacentHTML("afterend", paymentSelectorHTML());
  }

  document.querySelectorAll("[data-open-cart]").forEach(b=>b.addEventListener("click",e=>{e.preventDefault();Cart.render();openDrawer();}));
  document.getElementById("overlay")?.addEventListener("click",closeDrawer);
  document.getElementById("cartClose")?.addEventListener("click",closeDrawer);
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDrawer();});

  document.getElementById("cartBody")?.addEventListener("click",e=>{
    const b=e.target.closest("button[data-act]"); if(!b)return;
    const {act,id,size}=b.dataset;
    const line=Cart.get().find(i=>i.id===id&&i.size===size); if(!line&&act!=="rm")return;
    if(act==="inc")Cart.setQty(id,size,line.qty+1);
    if(act==="dec")Cart.setQty(id,size,line.qty-1);
    if(act==="rm")Cart.remove(id,size);
  });
  document.getElementById("cartCheckout")?.addEventListener("click",()=>{
    if(!Cart.count())return;
    window.open(`https://wa.me/${DEM.whatsapp}?text=${Cart.whatsappMessage()}`,"_blank");
  });
}

/* ---- Diaporama hero ---- */
function initHeroSlider(){
  const slides=[...document.querySelectorAll(".hero-slide")];
  if(slides.length<2) return;
  const dotsWrap=document.getElementById("heroDots");
  let idx=0, timer;
  if(dotsWrap){
    dotsWrap.innerHTML=slides.map((_,i)=>`<button class="hero-dot ${i===0?'is-active':''}" data-i="${i}" aria-label="Slide ${i+1}"></button>`).join("");
  }
  const go=i=>{
    idx=(i+slides.length)%slides.length;
    slides.forEach((s,j)=>s.classList.toggle("is-active",j===idx));
    dotsWrap?.querySelectorAll(".hero-dot").forEach((d,j)=>d.classList.toggle("is-active",j===idx));
  };
  const start=()=>{ timer=setInterval(()=>go(idx+1),4500); };
  start();
  dotsWrap?.addEventListener("click",e=>{ const b=e.target.closest("[data-i]"); if(!b)return; clearInterval(timer); go(+b.dataset.i); start(); });
}

/* ---- boot ---- */
document.addEventListener("DOMContentLoaded",()=>{
  initChrome();
  initHeroSlider();
  Cart.render();
  renderGrid("shopGrid", PRODUCTS);
  renderGrid("homeGrid", PRODUCTS, 6);
  renderGrid("capsGrid", CAPS);
  renderGrid("homeCapsGrid", CAPS);
  renderTableaux("tableauxGrid");       // boutique — tableaux en cartes
  renderTableaux("homeTableauxGrid");   // accueil — tableaux en cartes
  renderTimbresTable("timbresTable");   // (compat. ancien tableau si présent)
  initProductPage();
  initOrderForm();
});
