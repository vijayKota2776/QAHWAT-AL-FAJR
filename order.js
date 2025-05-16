const menus = {
  "los angeles": [
    { name: "Iced Vanilla Latte", price: 5.50 },
    { name: "Matcha Latte", price: 5.00 },
    { name: "Cold Brew", price: 4.75 }
  ],
  "austin": [
    { name: "Texan Espresso", price: 4.50 },
    { name: "Spicy Mocha", price: 5.25 },
    { name: "Chili Cold Brew", price: 5.00 }
  ],
  "default": [
    { name: "Classic Coffee", price: 4.00 },
    { name: "Oat Milk Latte", price: 5.00 },
    { name: "Iced Americano", price: 4.25 }
  ]
};

const menuContainer = document.getElementById("menu-items");
const cartContainer = document.getElementById("cart-items");
const totalPriceSpan = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");
const locationInput = document.getElementById("location");

let cart = [];

locationInput.addEventListener("input", () => {
  const city = locationInput.value.toLowerCase().trim();
  const menu = menus[city] || menus["default"];
  renderMenu(menu);
  cart = [];
  updateCart();
});

function renderMenu(menuItems) {
  menuContainer.innerHTML = "";
  menuItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>$${item.price.toFixed(2)}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    menuContainer.appendChild(div);
  });

  window.currentMenu = menuItems;
}

function addToCart(index) {
  const item = window.currentMenu[index];
  cart.push(item);
  updateCart();
}

function updateCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartContainer.appendChild(div);
  });

  totalPriceSpan.textContent = total.toFixed(2);
  checkoutBtn.disabled = cart.length === 0;
}