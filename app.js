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
