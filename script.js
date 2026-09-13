const products = [
{ id: 1, name: "Conta #01", price: 20.99, desc: "V4 FULL, GOD HUMAN, SOULGUITAR, LV 2800+", icon: "⚔️" },
{ id: 2, name: "Conta Exemplo #02", price: 79.90, desc: "Anúncio demonstrativo — substitua pelos dados reais.", icon: "🔥" },
{ id: 3, name: "Conta Exemplo #03", price: 149.90, desc: "Anúncio demonstrativo — substitua pelos dados reais.", icon: "👑" },
{ id: 4, name: "Conta Exemplo #04", price: 59.90, desc: "Anúncio demonstrativo — substitua pelos dados reais.", icon: "🍎" },
{ id: 5, name: "Conta Exemplo #05", price: 99.90, desc: "Anúncio demonstrativo — substitua pelos dados reais.", icon: "🌊" },
{ id: 6, name: "Conta Exemplo #06", price: 199.90, desc: "Anúncio demonstrativo — substitua pelos dados reais.", icon: "💜" }
];

let cart = JSON.parse(localStorage.getItem("bzCart") || "[]");

const WHATSAPP_NUMBER = "559984378163";

const money = (number) =>
number.toLocaleString("pt-BR", {
style: "currency",
currency: "BRL"
});

function render() {
const q = document.querySelector("#search").value.toLowerCase();
const f = document.querySelector("#filter").value;

let list = products.filter(
(p) =>
p.name.toLowerCase().includes(q) ||
p.desc.toLowerCase().includes(q)
);

if (f === "low") {
list = list.filter((p) => p.price <= 50);
}

if (f === "mid") {
list = list.filter((p) => p.price > 50 && p.price <= 100);
}

if (f === "high") {
list = list.filter((p) => p.price > 100);
}

document.querySelector("#products").innerHTML = list
.map(
(p) => `
<article class="card">
<div class="card-top">${p.icon}</div>

      <div class="card-body">
        <span class="tag">BLOX ZONE</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price">${money(p.price)}</div>

        <button class="btn primary" onclick="add(${p.id})">
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  `
)
.join("");


document.querySelector("#empty").classList.toggle("hidden", list.length > 0);

updateCart();
}

function add(id) {
const product = products.find((p) => p.id === id);

if (!product) return;

if (!cart.some((p) => p.id === id)) {
cart.push(product);
save();
}

openCart();
}

function remove(id) {
cart = cart.filter((p) => p.id !== id);
save();
}

function save() {
localStorage.setItem("bzCart", JSON.stringify(cart));
updateCart();
}

function updateCart() {
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const checkout = document.querySelector("#checkout");

cartCount.textContent = cart.length;

if (cart.length === 0) {
cartItems.innerHTML = `
  <p class="hero-text">
    Seu carrinho está vazio.
  </p>
`;

} else {
cartItems.innerHTML = cart
.map(
(p) => `
<div class="cart-row">
<div>
<b>${p.name}</b>
<br>
<small>${money(p.price)}</small>
</div>

        <button onclick="remove(${p.id})">
          Remover
        </button>
      </div>
    `
  )
  .join("");


}

const total = cart.reduce((sum, p) => sum + p.price, 0);

cartTotal.textContent = money(total);

checkout.disabled = cart.length === 0;
checkout.style.opacity = cart.length === 0 ? "0.5" : "1";
checkout.style.cursor = cart.length === 0
? "not-allowed"
: "pointer";
}

function openCart() {
document.querySelector("#cart").classList.add("open");
document.querySelector("#overlay").classList.add("show");
}

function closeCart() {
document.querySelector("#cart").classList.remove("open");
document.querySelector("#overlay").classList.remove("show");
}

function checkoutWhatsApp() {
if (cart.length === 0) {
alert("Seu carrinho está vazio.");
return;
}

const total = cart.reduce((sum, p) => sum + p.price, 0);

let message = "Olá! 👋 Quero fazer um pedido na Blox Zone.\n\n";

message += "🛒 Meu pedido:\n\n";

cart.forEach((p, index) => {
message += ${index + 1}. ${p.name}\n;
message += 💰 ${money(p.price)}\n;
message += 📋 ${p.desc}\n\n;
});

message += "━━━━━━━━━━━━━━\n";
message += 💵 *Total: ${money(total)}*\n\n;
message += "Gostaria de verificar a disponibilidade e finalizar a compra.";

const whatsappURL =
https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)};

window.open(whatsappURL, "_blank");
}

document.querySelector("#openCart").onclick = openCart;
document.querySelector("#closeCart").onclick = closeCart;
document.querySelector("#overlay").onclick = closeCart;

document.querySelector("#search").oninput = render;
document.querySelector("#filter").onchange = render;

document.querySelector(".menu-btn").onclick = () => {
document.querySelector(".nav").classList.toggle("mobile");
};

document.querySelector("#checkout").onclick = checkoutWhatsApp;

render();
