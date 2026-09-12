const products=[
 {id:1,name:"Conta #01",price:20.99,desc:"V4 FULL,GOD HUMAN,SOULGUITAR,LV 2800+",icon:"⚔️"},
 {id:2,name:"Conta Exemplo #02",price:79.90,desc:"Anúncio demonstrativo — substitua pelos dados reais.",icon:"🔥"},
 {id:3,name:"Conta Exemplo #03",price:149.90,desc:"Anúncio demonstrativo — substitua pelos dados reais.",icon:"👑"},
 {id:4,name:"Conta Exemplo #04",price:59.90,desc:"Anúncio demonstrativo — substitua pelos dados reais.",icon:"🍎"},
 {id:5,name:"Conta Exemplo #05",price:99.90,desc:"Anúncio demonstrativo — substitua pelos dados reais.",icon:"🌊"},
 {id:6,name:"Conta Exemplo #06",price:199.90,desc:"Anúncio demonstrativo — substitua pelos dados reais.",icon:"💜"}
];
let cart=JSON.parse(localStorage.getItem("bzCart")||"[]");
const money=n=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
function render(){
 const q=document.querySelector("#search").value.toLowerCase(), f=document.querySelector("#filter").value;
 let list=products.filter(p=>p.name.toLowerCase().includes(q));
 if(f==="low")list=list.filter(p=>p.price<=50); if(f==="mid")list=list.filter(p=>p.price>50&&p.price<=100); if(f==="high")list=list.filter(p=>p.price>100);
 document.querySelector("#products").innerHTML=list.map(p=>`<article class="card"><div class="card-top">${p.icon}</div><div class="card-body"><span class="tag">BLOX ZONE</span><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)}</div><button class="btn primary" onclick="add(${p.id})">Adicionar ao carrinho</button></div></article>`).join("");
 document.querySelector("#empty").classList.toggle("hidden",list.length>0);
 updateCart();
}
function add(id){const p=products.find(x=>x.id===id);if(!cart.some(x=>x.id===id))cart.push(p);save();openCart()}
function remove(id){cart=cart.filter(x=>x.id!==id);save()}
function save(){localStorage.setItem("bzCart",JSON.stringify(cart));render()}
function updateCart(){
 document.querySelector("#cartCount").textContent=cart.length;
 document.querySelector("#cartItems").innerHTML=cart.length?cart.map(p=>`<div class="cart-row"><div><b>${p.name}</b><br><small>${money(p.price)}</small></div><button onclick="remove(${p.id})">Remover</button></div>`).join(""):"<p class='hero-text'>Seu carrinho está vazio.</p>";
 document.querySelector("#cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
}
function openCart(){document.querySelector("#cart").classList.add("open");document.querySelector("#overlay").classList.add("show")}
function closeCart(){document.querySelector("#cart").classList.remove("open");document.querySelector("#overlay").classList.remove("show")}
document.querySelector("#openCart").onclick=openCart;document.querySelector("#closeCart").onclick=closeCart;document.querySelector("#overlay").onclick=closeCart;
document.querySelector("#search").oninput=render;document.querySelector("#filter").onchange=render;
document.querySelector(".menu-btn").onclick=()=>document.querySelector(".nav").classList.toggle("mobile");
document.querySelector("#checkout").onclick=()=>alert("Para finalizar, entre no Discord oficial da Blox Zone e informe os anúncios do seu carrinho.");
render();
