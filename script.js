const startBtn = document.getElementById('startBtn');
const landing = document.querySelector('.landing');
const mainContent = document.querySelector('.main-content');
const confirmation = document.querySelector('.confirmation');
const purchaseBtn = document.getElementById('purchaseBtn');

startBtn.onclick = () => {
  landing.classList.add('hidden');
  mainContent.classList.remove('hidden');
};

const products = [
  {
    id: 1,
    name: "Bluetooth Speaker",
    price: 1299,
    image: "https://i5.walmartimages.com/asr/ccf61324-84af-44fa-b18f-fa3c59bb64aa_2.d0dca860eaa75d38080c9307e3c4ceb7.jpeg",
    desc: "Portable & Powerful"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 999,
    image: "https://m.media-amazon.com/images/I/71R19tXiIBL._SL1500_.jpg",
    desc: "Noise Cancelling"
  },
  {
    id: 3,
    name: "Smartwatch",
    price: 1599,
    image: "https://m.media-amazon.com/images/I/81EgLiQTDBL._AC_SL1500_.jpg",
    desc: "Track Fitness"
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 599,
    image: "https://th.bing.com/th/id/OIP.SV3_1MA0yV00oBwsjq3FPAHaHa?rs=1&pid=ImgDetMain",
    desc: "Ergonomic & Sturdy"
  },
  {
    id: 5,
    name: "Dress",
    price: 799,
    image: "https://m.media-amazon.com/images/I/61dARUQxfIL.jpg",
    desc: "Trendy & Comfortable"
  },
  {
    id: 6,
    name: "Harry Potter Book",
    price: 499,
    image: "https://th.bing.com/th/id/OIP.gbLUPDDCh6KtcRTY1xEEUAHaHa?rs=1&pid=ImgDetMain",
    desc: "Fantasy Novel"
  },
  {
    id: 7,
    name: "Kinder Joy",
    price: 45,
    image: "https://cdn.dooca.store/239/products/bvklthsyscjskeotrzfvdfc2lbdccnjuv7da_640x640+fill_ffffff.png?v=1712976462&webp=0",
    desc: "Sweet Surprise"
  }
];

let cart = [];

function renderProducts(prodList) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  prodList.forEach(product => {
    productList.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>${product.desc}</p>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>`;
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cartList');
  const total = document.getElementById('total');
  cartList.innerHTML = cart.map(item => `<p>${item.name} - ₹${item.price}</p>`).join('');
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  total.innerHTML = `<strong>Total: ₹${totalPrice}</strong>`;
}

document.getElementById('sortSelect').addEventListener('change', function () {
  let sorted = [...products];
  if (this.value === 'low-high') sorted.sort((a, b) => a.price - b.price);
  else if (this.value === 'high-low') sorted.sort((a, b) => b.price - a.price);
  renderProducts(sorted);
});

document.getElementById('searchBox').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

purchaseBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    mainContent.classList.add('hidden');
    confirmation.classList.remove('hidden');
  }
});

function goHome() {
  cart = [];
  renderCart();
  confirmation.classList.add('hidden');
  landing.classList.remove('hidden');
}

renderProducts(products);
