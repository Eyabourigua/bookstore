// Function to load and display cart items from localStorage
function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartItems");
  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p class="text-center">Your cart is empty.</p>';
    return;
  }

  let totalPrice = 0;

  const tableHeader = `
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price (TND)</th>
            <th>Quantity</th>
            <th>Total (TND)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  `;

  const tableFooter = `
        </tbody>
      </table>
    </div>
  `;

  const tableRows = cartItems
    .map((item, index) => {
      const itemTotal = (item.quantity || 1) * item.price;
      totalPrice += itemTotal;

      return `
        <tr>
          <td>
            <img src="${
              item.img
            }" alt="Book Image" style="width: 50px; height: auto;" />
          </td>
          <td>${item.title}</td>
          <td>${item.author}</td>
          <td>${item.price}</td>
          <td>
            <div class="quantity-controls d-flex align-items-center">
              <button data-index="${index}" class="btn btn-secondary btn-sm btn-add-remove decrease-quantity">-</button>
              <span class="quantity mx-2">${item.quantity || 1}</span>
              <button data-index="${index}" class="btn btn-secondary btn-sm btn-add-remove increase-quantity">+</button>
            </div>
          </td>
          <td>${itemTotal.toFixed(2)}</td>
          <td>
            <button data-index="${index}" class="btn btn-danger btn-sm btn-add-remove remove-from-cart">Remove</button>
          </td>
        </tr>
      `;
    })
    .join("");

  cartContainer.innerHTML = tableHeader + tableRows + tableFooter;

  cartContainer.innerHTML += `
    <div class="col-12 text-center mt-4">
      <h4 class="total-h4">Total Price: ${totalPrice.toFixed(2)} TND</h4>
      <button class="btn btn-danger clear-cart">Clear All</button>
    </div>
  `;
}

// Function to remove item from cart
function removeFromCart(index) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  loadCartItems();
}

// Function to clear all items from cart
function clearCart() {
  localStorage.removeItem("cart");
  loadCartItems();
}

// Function to update item quantity in cart
function updateQuantity(index, change) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartItems[index]) {
    cartItems[index].quantity = (cartItems[index].quantity || 1) + change;
    if (cartItems[index].quantity < 1) {
      cartItems[index].quantity = 1;
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    loadCartItems();
  }
}

// Add event listener for cart item actions using delegation
document.getElementById("cartItems").addEventListener("click", (event) => {
  const index = event.target.getAttribute("data-index");
  if (event.target.classList.contains("remove-from-cart")) {
    removeFromCart(index);
  } else if (event.target.classList.contains("decrease-quantity")) {
    updateQuantity(index, -1);
  } else if (event.target.classList.contains("increase-quantity")) {
    updateQuantity(index, 1);
  } else if (event.target.classList.contains("clear-cart")) {
    clearCart();
  }
});

// Load cart items on page load
loadCartItems();
