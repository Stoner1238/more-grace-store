const products = [
  { id: 1, name: "Plastic Bucket", price: 1000, image: "images/plastic-bucket.jpg" },
  { id: 2, name: "Plastic Plate", price: 500, image: "images/plastic-plate.jpg" },
  { id: 3, name: "Plastic Spoon", price: 200, image: "images/plastic-spoon.jpg" },
  { id: 4, name: "Kitchen Utensils Set", price: 3000, image: "images/kitchen-utensils.jpg" }
];

const productList = document.getElementById('product-list');

// Render products
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
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProduct = cart.find(item => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}
