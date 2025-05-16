const products = [
    {
      name: "Cold Brew",
      price: 4.99,
      image: "https://cdn.shopify.com/s/files/1/0278/5575/7989/products/alfred-coldbrew-bottle_720x.jpg"
    },
    {
      name: "Alfred Mug",
      price: 9.99,
      image: "https://cdn.shopify.com/s/files/1/0278/5575/7989/products/alfred-mug_720x.jpg"
    },
    {
      name: "Matcha Mix",
      price: 14.99,
      image: "https://cdn.shopify.com/s/files/1/0278/5575/7989/products/alfred-matcha_720x.jpg"
    },
    {
      name: "Vanilla Syrup",
      price: 6.99,
      image: "https://cdn.shopify.com/s/files/1/0278/5575/7989/products/vanilla-syrup_720x.jpg"
    }
  ];
  
  let cart = [];
  
  function updateCartDisplay() {
    document.getElementById("cart-count").textContent = cart.length;
  }
  
  function renderCartItems() {
    const cartList = document.getElementById("cart-items");
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - $${item.price.toFixed(2)} 
        <button onclick="removeFromCart(${index})">Remove</button>`;
      cartList.appendChild(li);
    });
  }
  
  function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    cart.push(product);
    updateCartDisplay();
    alert(`${product.name} added to cart.`);
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
    renderCartItems();
  }
  
  function loadProducts() {
    const grid = document.getElementById("product-grid");
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h2>${product.name}</h2>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="addToCart('${product.name}')">Add to Cart</button>
      `;
      grid.appendChild(card);
    });
  }
  
  // Cart modal
  document.getElementById("view-cart-btn").addEventListener("click", () => {
    document.getElementById("cart-modal").style.display = "block";
    renderCartItems();
  });
  
  document.getElementById("close-cart").addEventListener("click", () => {
    document.getElementById("cart-modal").style.display = "none";
  });
  
  document.getElementById("checkout-btn").addEventListener("click", () => {
    alert("Checkout complete! (Not implemented)");
    cart = [];
    updateCartDisplay();
    renderCartItems();
    document.getElementById("cart-modal").style.display = "none";
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    updateCartDisplay();
  });