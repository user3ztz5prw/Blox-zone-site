const products = [
{
id: 1,
name: "Conta #01",
price: 20.99,
desc: "V4 FULL, GOD HUMAN, SOULGUITAR, LV 2800+",
icon: "⚔️"
},
{
id: 2,
name: "Conta Exemplo #02",
price: 79.90,
desc: "Anúncio demonstrativo — substitua pelos dados reais.",
icon: "🔥"
},
{
id: 3,
name: "Conta Exemplo #03",
price: 149.90,
desc: "Anúncio demonstrativo — substitua pelos dados reais.",
icon: "👑"
},
{
id: 4,
name: "Conta Exemplo #04",
price: 59.90,
desc: "Anúncio demonstrativo — substitua pelos dados reais.",
icon: "🍎"
},
{
id: 5,
name: "Conta Exemplo #05",
price: 99.90,
desc: "Anúncio demonstrativo — substitua pelos dados reais.",
icon: "🌊"
},
{
id: 6,
name: "Conta Exemplo #06",
price: 199.90,
desc: "Anúncio demonstrativo — substitua pelos dados reais.",
icon: "💜"
}
];

let cart = JSON.parse(localStorage.getItem("bzCart") || "[]");

const WHATSAPP_NUMBER = "559984378163";

const money = (number) => {
return number.toLocaleString("pt-BR", {
style: "currency",
currency: "BRL"
});
};

function render() {
const search = document.querySelector("#search");
const filter = document.querySelector("#filter");
const productsContainer = document.querySelector("#products");
const empty = document.querySelector("#empty");

const q = search.value.toLowerCase();
const f = filter.value;

let list = products.filter((product) =>
product.name.toLowerCase().includes(q) ||
product.desc.toLowerCase().includes(q)
);

if (f === "low") {
list = list.filter((product) => product.price <= 50);
}

if (f === "mid") {
list = list.filter(
(product) => product.price > 50 && product.price <= 100
);
}

if (f === "high") {
list = list.filter((product) => product.price > 100);
}

productsContainer.innerHTML = list
.map(
(product) => `
<article class="card">
<div class="card-top">${product.icon}</div>

      <div class="card-body">
        <span class="tag">BLOX ZONE</span>

        <h3>${product.name}</h3>

        <p>${product.desc}</p>

        <div class="price">${money(product.price)}</div>

        <button
          class="btn primary"
          onclick="add(${product.id})"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  `
)
.join("");


empty.classList.toggle("hidden", list.length > 0);

updateCart();
}

function add(id) {
const product = products.find((item) => item.id === id);

if (!product) {
return;
}

const alreadyInCart = cart.some((item) => item.id === id);

if (!alreadyInCart) {
cart.push(product);
save();
}

openCart();
}

function remove(id) {
cart = cart.filter((item) => item.id !== id);
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
cartItems.innerHTML = <p class="hero-text"> Seu carrinho está vazio. </p> ;
} else {
cartItems.innerHTML = cart
.map(
(product) => `
<div class="cart-row">
<div>
<b>${product.name}</b>
<br>
<small>${money(product.price)}</small>
</div>

        <button onclick="remove(${product.id})">
          Remover
        </button>
      </div>
    `
  )
  .join("");


}

const total = cart.reduce(
(sum, product) => sum + product.price,
0
);

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

const total = cart.reduce(
(sum, product) => sum + product.price,
0
);

let message =
"Olá! 👋 Quero fazer um pedido na Blox Zone.\n\n";

message += "🛒 Meu pedido:\n\n";

cart.forEach((product, index) => {
message += ${index + 1}. ${product.name}\n;
message += 💰 ${money(product.price)}\n;
message += 📋 ${product.desc}\n\n;
});

message += "━━━━━━━━━━━━━━\n";
message += 💵 *Total: ${money(total)}*\n\n;
message +=
"Gostaria de verificar a disponibilidade e finalizar a compra.";

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
