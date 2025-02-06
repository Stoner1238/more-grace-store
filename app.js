// Cart storage and display
let cart = [];

// Function to add item to cart
function addToCart(productName, productPrice) {
  // Check if the product already exists in the cart
  const existingProduct = cart.find(item => item.name === productName);

  if (existingProduct) {
    // Increase the quantity if the item already exists
    existingProduct.quantity += 1;
  } else {
    // Add new item to the cart
    cart.push({
      name: productName,
      price: productPrice,
      quantity: 1
    });
  }

  alert(`${productName} has been added to the cart!`);
  saveCart();
}

// Save cart to local storage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from local storage
function loadCart() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}

// Event listeners for "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  const cartButtons = document.querySelectorAll('.add-to-cart');
  cartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const price = parseInt(button.dataset.price);
      addToCart(name, price);
    });
  });
});
const products = [
  { id: 1, name: "Mop & stick", price: 1000, image: "images/plastic bucket.jpg" },
  { id: 2, name: "Mop & Bucketmop", price: 500, image: "images/plastic plate.jpg" },
  { id: 3, name: "original mop", price: 200, image: "images/plastic spoon.jpg" },
  { id: 4, name: "Original mop", price: 3000, image: "images/kitchen-utensils.jpg" }
];

const productList = document.getElementById('product-list');

products.forEach(product => {
  const productCard = `
    <div class="product">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p>Price: ₦${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
  productList.innerHTML += productCard;
});

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  alert(`${product.name} added to cart!`);
}
