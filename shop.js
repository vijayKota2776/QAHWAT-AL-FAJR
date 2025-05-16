const products = {
  coffeeDrinks: [
    {
      name: "Cold Brew",
      price: 4.99,
      image: "https://imgs.search.brave.com/HxvEM0h5XoZgyVAxvBPuaafqvInB0uUC4eBSyf04QU8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzM4LzU2LzMy/LzM2MF9GXzMzODU2/MzI2OF96MnFPYm1q/R2RKUUVXTXFES09s/TmdMeEtqYkVOeFVM/bi5qcGc"
    },
    {
      name: "Iced Latte",
      price: 5.49,
      image: "https://imgs.search.brave.com/rVH7sHTH6IBJ4iT-jtOP0Vsr9dDD1uQgnYZpPQmAov4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9p/Y2VkLWNvZmZlZS1s/YXR0ZV8yMy0yMTUx/OTYxMzM5LmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDA"
    }
  ],
  coffeeBeans: [
    {
      name: "House Blend Beans",
      price: 12.99,
      image: "https://imgs.search.brave.com/q5FYdh558afQ4cLcEn8ugpfWNbrN-wiSdYP9Bz5fPeE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXZv/bHZlcmJhbGkuY29t/L2Nkbi9zaG9wL2Zp/bGVzL0NvZmZlZUJl/YW5zSG91c2VCbGVu/ZDFrZzJfMTQwMHgu/anBnP3Y9MTc0NDk2/MTc3Mg"
    },
    {
      name: "Espresso Roast",
      price: 14.99,
      image: "https://imgs.search.brave.com/8sSA8Pvcu-2eHV7pszW5yVbYbr53CCmI1uVXl3LZveg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y29wcGVybW9vbmNv/ZmZlZS5jb20vY2Ru/L3Nob3AvZmlsZXMv/RXNwcmVzc28tUm9h/c3QtTFMtM183N2Vi/ZTNjOS1iYjc5LTRk/YTUtOGNiOC0wYzZl/N2JhMDAyYWIuanBn/P3Y9MTc0MDY3NzEz/OCZ3aWR0aD0xMDgw"
    }
  ],
  accessories: [
    {
      name: "Alfred Mug",
      price: 9.99,
      image: "https://imgs.search.brave.com/_jkrlOkvzx7d4H1_0LDH8KLwUv40UASdaDkmaECfB9E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzQwOTI5NTkyL3Iv/aWwvNWY3ZjVmLzU4/MDQyNjAzMjIvaWxf/NjAweDYwMC41ODA0/MjYwMzIyX2I5czQu/anBn"
    },
    {
      name: "Reusable Straw",
      price: 3.99,
      image: "https://imgs.search.brave.com/QG-A4VOO7F8rk2PZd1K2hPnoVu3n-PG56LBXfvya9oU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTIz/ODYyNjc4L3Bob3Rv/L2RyaW5raW5nLXN0/cmF3cy5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9WGpGUHcz/OERCaXlydXB2QTZt/UUdaN1ZlSzFDSzlX/TG1sR29GYlB3ZF94/Yz0"
    }
  ]
};

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

function addToCart(productName, section) {
  const product = products[section].find(p => p.name === productName);
  cart.push(product);
  updateCartDisplay();
  alert(`${product.name} added to cart.`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartDisplay();
  renderCartItems();
}

function loadProducts(sectionId, sectionName) {
  const grid = document.getElementById(sectionId);
  products[sectionName].forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart('${product.name}', '${sectionName}')">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

document.getElementById("view-cart-btn").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "block";
  renderCartItems();
});

document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "none";
});

document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Checkout complete! (Demo only)");
  cart = [];
  updateCartDisplay();
  renderCartItems();
  document.getElementById("cart-modal").style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  loadProducts("coffee-drinks", "coffeeDrinks");
  loadProducts("coffee-beans", "coffeeBeans");
  loadProducts("accessories", "accessories");
  updateCartDisplay();
});