// Load cart from local storage and display it
function loadCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalPrice = 0;

  cartItemsContainer.innerHTML = ''; // Clear previous cart rows

  if (storedCart.length === 0) {
    cartItemsContainer.innerHTML = '<tr><td colspan="5">Your cart is empty!</td></tr>';
  } else {
    storedCart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>₦${item.price}</td>
        <td>
          <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
        </td>
        <td>₦${itemTotal}</td>
        <td><button class="remove-item" data-index="${index}">Remove</button></td>
      `;

      cartItemsContainer.appendChild(row);
    });
  }

  cartTotalElement.textContent = `Total: ₦${totalPrice}`;

  // Attach event listeners for quantity changes
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', updateQuantity);
  });

  // Attach event listeners for item removal
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', removeCartItem);
  });
}

// Update cart quantity
function updateQuantity(event) {
  const index = event.target.dataset.index;
  const newQuantity = parseInt(event.target.value);

  if (newQuantity > 0) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
  } else {
    alert('Quantity must be at least 1');
  }
}

// Remove item from cart
function removeCartItem(event) {
  const index = event.target.dataset.index;
  const cart = JSON.parse(localStorage.getItem('cart'));
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCartItems();
}

// Clear the entire cart
document.getElementById('clear-cart').addEventListener('click', () => {
  if (confirm('Are you sure you want to clear the cart?')) {
    localStorage.removeItem('cart');
    loadCartItems();
  }
});

// Load cart on page load
document.addEventListener('DOMContentLoaded', loadCartItems);

// Handle Paystack Payment
document.getElementById('pay-now').addEventListener('click', initiatePayment);

function initiatePayment() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100; // Convert to kobo

  const handler = PaystackPop.setup({
    key: 'YOUR_PUBLIC_KEY_HERE', // Replace with your Paystack Public Key
    email: 'aregbeakee@gmail.com', // Replace with user's email
    amount: totalAmount,
    currency: 'NGN',
    ref: `MGNE_${Math.floor(Math.random() * 1000000000 + 1)}`,
    callback: function (response) {
      alert(`Payment successful! Reference: ${response.reference}`);
      localStorage.removeItem('cart'); // Clear cart after successful payment
      window.location.reload();
    },
    onClose: function () {
      alert('Payment was not completed.');
    }
  });

  handler.openIframe();
}

// Handle search functionality
document.getElementById('search-bar').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
});

// Product List
const products = [
  {
    id: 1,
    name: "Plastic Bucket",
    price: 500,
    image: "images/Mop & stick.jpg"
  },
  {
    id: 2,
    name: "Plastic Plate",
    price: 200,
    image: "images/plastic-plate.jpg"
  },
  {
    id: 3,
    name: "Spoon Set",
    price: 150,
    image: "images/spoon-set.jpg"
  }
];
