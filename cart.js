// Load cart from local storage and display it
function loadCart() {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = storedCart;
  displayCartItems();
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = ''; // Clear previous items
  let totalPrice = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<tr><td colspan="5">Your cart is empty!</td></tr>';
  } else {
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      totalPrice += itemTotal;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>₦${item.price}</td>
        <td>${item.quantity}</td>
        <td>₦${itemTotal}</td>
        <td><button data-index="${index}" class="remove-item">Remove</button></td>
      `;
      cartItemsContainer.appendChild(row);
    });
  }
  cartTotalElement.textContent = `Total: ₦${totalPrice}`;
}

// Save the updated cart to local storage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Initiate Payment with Paystack
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

// Event listeners for removing items
document.addEventListener('DOMContentLoaded', () => {
  loadCart();

  // Event listener for removing items
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', event => {
      const index = event.target.dataset.index;
      cart.splice(index, 1);
      saveCart();
      displayCartItems();
    });
  });

  // Event listener for Clear Cart button
  const clearCartButton = document.getElementById('clear-cart');
  if (clearCartButton) {
    clearCartButton.addEventListener('click', () => {
      // Clear the cart array
      cart = [];
      saveCart(); // Save the empty cart to local storage
      displayCartItems(); // Update the cart display
    });
  }

  // Event listener for Proceed to Payment button
  const payNowButton = document.getElementById('pay-now');
  if (payNowButton) {
    payNowButton.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty! Add items before proceeding to payment.');
      } else {
        // Initiate Paystack Payment
        initiatePayment();
      }
    });
  }
});
