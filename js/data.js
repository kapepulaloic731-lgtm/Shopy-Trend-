// ===== CONFIGURATION — à modifier =====
const CONFIG = {
  whatsapp: "243000000000", // numéro WhatsApp de la boutique (format international, sans + ni espaces)
  currency: "$",
  payments: ["Paiement à la livraison", "Mobile Money", "Carte bancaire"]
};
const TAGS = { new: "Nouveau", best: "Best-seller", promo: "Promo" };
const CATEGORIES = [
  { id: "bijoux", name: "Bijoux", icon: "💍" },
  { id: "parfums", name: "Parfums", icon: "🧴" },
  { id: "cosmetiques", name: "Cosmétiques", icon: "💄" },
  { id: "vetements", name: "Vêtements", icon: "👕" },
  { id: "accessoires", name: "Accessoires", icon: "👜" },
  { id: "collections", name: "Collections", icon: "🎁" }
];
// img: chemin vers la photo (ex. "img/bague.jpg"). Vide = visuel par défaut.
const PRODUCTS = [
  { id: "b1", name: "Bague Éclat Or", cat: "bijoux", price: 25, stock: 12, tag: "new", img: "", desc: "Bague finition dorée, design épuré et lumineux." },
  { id: "b2", name: "Collier Perle Royale", cat: "bijoux", price: 38, old: 48, stock: 6, tag: "promo", img: "", desc: "Collier élégant orné de perles, parfait pour toutes les occasions." },
  { id: "p1", name: "Parfum Nuit d'Ambre", cat: "parfums", price: 59, stock: 9, tag: "best", img: "", desc: "Notes chaudes d'ambre et de vanille, tenue longue durée." },
  { id: "p2", name: "Eau de Parfum Velours", cat: "parfums", price: 45, stock: 3, tag: "new", img: "", desc: "Un sillage doux et raffiné aux accents floraux." },
  { id: "c1", name: "Sérum Éclat Visage", cat: "cosmetiques", price: 29, stock: 20, tag: "best", img: "", desc: "Sérum hydratant pour une peau lumineuse au quotidien." },
  { id: "c2", name: "Rouge à Lèvres Bordeaux", cat: "cosmetiques", price: 18, stock: 15, tag: "new", img: "", desc: "Couleur intense, texture satinée confortable." },
  { id: "c3", name: "Palette Glow", cat: "cosmetiques", price: 34, old: 42, stock: 0, tag: "promo", img: "", desc: "Palette de teintes dorées pour un regard sublimé." },
  { id: "v1", name: "Ensemble Streetwear Noir", cat: "vetements", price: 65, stock: 8, tag: "best", img: "", desc: "Ensemble confortable à la coupe moderne." },
  { id: "v2", name: "T-shirt Oversize Signature", cat: "vetements", price: 28, stock: 25, tag: "new", img: "", desc: "Coton épais, coupe ample, logo discret doré." },
  { id: "a1", name: "Sac Bandoulière Noir", cat: "accessoires", price: 42, stock: 7, img: "", desc: "Sac compact et pratique, finitions dorées." },
  { id: "a2", name: "Lunettes Soleil Gold", cat: "accessoires", price: 22, old: 30, stock: 10, tag: "promo", img: "", desc: "Monture fine dorée, verres protection UV." },
  { id: "k1", name: "Coffret Cadeau Prestige", cat: "collections", price: 89, stock: 5, tag: "best", img: "", desc: "Coffret personnalisable : parfum, bijou et soin." }
];
