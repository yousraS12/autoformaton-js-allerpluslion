const products = [
    { id: 1, name: "Collier cœur", category: "bijoux", price: 19.99, img:"image cetoir.jpg ", description: "Collier délicat avec pendentif en forme de cœur." },
    { id: 2, name: "Bracelet perles", category: "bijoux", price: 14.5, img: "image2.jpg", description: "Bracelet fait main avec perles colorées." },
    { id: 3, name: "Sac à paillettes", category: "accessoires", price: 24.0, img: "image3.jpg", description: "Petit sac brillant pour les sorties." },
    { id: 4, name: "Écharpe douce", category: "accessoires", price: 12.0, img: "iamge4.jpg", description: "Écharpe chaude et légère." },
    { id: 5, name: "Carnet moderne ", category: "carnets", price: 9.99, img: "image5.jpg", description: "Carnet A5 avec couverture rose et pages lignées." },
    { id: 6, name: "Bague élégante", category: "bijoux", price: 11.5, img: "image10.jpg", description: "Carnet décoré, parfait pour les idées créatives." },
    { id: 7, name: "Tasse licorne", category: "tasses", price: 8.5, img: "image7.jpg", description: "Tasse avec motif licorne, compatible micro-ondes." },
    { id: 8, name: "Tasse message", category: "tasses", price: 7.0, img: "image6.jpg", description: "Tasse moderne avec message mignon." }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function formatPrice(p) {
    return p.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function renderProducts(list) {
    if (!list.length) {
        productGrid.innerHTML = `<p class="no-results">Aucun produit trouvé.</p>`;
        return;
    }
    productGrid.innerHTML = list.map(p => `
        <article class="product-card" data-id="${p.id}">
            <img src="${p.img}" alt="${escapeHtml(p.name)}" loading="lazy">
            <div class="product-info">
                <h3>${escapeHtml(p.name)}</h3>
                <p class="desc">${escapeHtml(p.description)}</p>
                <p class="price">${formatPrice(p.price)}</p>

            </div>
        </article>
    `).join("");
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

function filterProducts() {
    const q = searchInput.value.trim().toLowerCase();
    const cat = categoryFilter.value;
    const filtered = products.filter(p => {
        const matchesCat = (cat === "all") || (p.category === cat);
        const text = (p.name + " " + p.description).toLowerCase();
        const matchesQuery = q === "" || text.includes(q);
        return matchesCat && matchesQuery;
    });
    renderProducts(filtered);
}

searchInput.addEventListener("input", debounce(filterProducts, 250));
categoryFilter.addEventListener("change", filterProducts);

// productGrid.addEventListener("click", (e) => {
//     const btn = e.target.closest(".details-btn");
//     if (!btn) return;
//     const id = Number(btn.dataset.id);
//     const p = products.find(x => x.id === id);
//     if (!p) return;
//     showDetailsModal(p);
// });

function showDetailsModal(p) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" aria-label="Fermer">&times;</button>
            <img src="${p.img}" alt="${escapeHtml(p.name)}">
            <h2>${escapeHtml(p.name)}</h2>
            <p>${escapeHtml(p.description)}</p>
            <p class="price">${formatPrice(p.price)}</p>
        </div>
    `;
    modal.addEventListener("click", (ev) => {
        if (ev.target === modal || ev.target.classList.contains("modal-close")) modal.remove();
    });
    document.body.appendChild(modal);
}

// simple debounce
function debounce(fn, wait) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), wait);
    };
}

// initial render
renderProducts(products);

