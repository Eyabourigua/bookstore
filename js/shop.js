const products = [
  {
    img: "images/product-item1.jpg",
    title: "Simple Way of peace life",
    author: "Armor Ramsey",
    price: 18,
    availability: "instock",
  },
  {
    img: "images/product-item2.jpg",
    title: "Great Travel At Desert",
    author: "Sanchens Howdy",
    price: 22,
    availability: "instock",
  },
  {
    img: "images/product-item3.jpg",
    title: "The Lady Beauty Scarlett",
    author: "Arthur Daylle",
    price: 25,
    availability: "outofstock",
  },
  {
    img: "images/product-item4.jpg",
    title: "Once upon a time",
    author: "Klien Marry",
    price: 19,
    availability: "instock",
  },
  {
    img: "images/product-item5.jpg",
    title: "Way Of Happiness",
    author: "Amanda Kuywat",
    price: 16,
    availability: "instock",
  },
  {
    img: "images/product-item6.jpg",
    title: "Life Of Seacrits",
    author: "Galista Marie",
    price: 20,
    availability: "instock",
  },
  {
    img: "images/product-item7.jpg",
    title: "Fashion System",
    author: "Kevin Spear",
    price: 24,
    availability: "instock",
  },
  {
    img: "images/product-item8.jpg",
    title: "Musical",
    author: "Karim Achard",
    price: 21,
    availability: "outofstock",
  },
  {
    img: "images/single-image.jpg",
    title: "Birds Gonna Be Happy",
    author: "Timber Hood",
    price: 23,
    availability: "instock",
  },
  {
    img: "images/tab-item1.jpg",
    title: "Portrait Photography",
    author: "Adam Silber",
    price: 17,
    availability: "instock",
  },
  {
    img: "images/tab-item3.jpg",
    title: "Tips Of Simple Lifestyle",
    author: "Bratt Smith",
    price: 19,
    availability: "instock",
  },
  {
    img: "images/tab-item4.jpg",
    title: "Just Felt From Outside",
    author: "Nicole Wilson",
    price: 21,
    availability: "outofstock",
  },
  {
    img: "images/tab-item5.jpg",
    title: "Peaceful Enlightment",
    author: "Marmik Lama",
    price: 18,
    availability: "instock",
  },
  {
    img: "images/tab-item7.jpg",
    title: "Once upon a time",
    author: "Klien Marry",
    price: 22,
    availability: "instock",
  },
];

let currentPage = 1;
const productsPerPage = 8;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// RENDER PRODUCTS
function renderProducts(filteredProducts = products) {
  const productContainer = document.getElementById("shopproducts");
  productContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(
    startIndex + productsPerPage,
    filteredProducts.length
  );

  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  currentProducts.forEach((product) => {
    // Create a div for the product card
    const productHTML = document.createElement("div");
    productHTML.className = "col-md-3 shopp";

    productHTML.innerHTML = ` 
      <div class="card book-card position-relative">
        <span class="badge bg-danger position-absolute top-0 start-0 m-2">${
          product.availability === "outofstock" ? "SoldOut" : ""
        }</span>
        <img
          src=${product.img}
          class="card-img-top"
          alt="Book Image"
        />
        <div class="card-body ln">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.author}</p>
          <p class="text-custom text-primary">${product.price}TND</p>
          <button class="btn btn-custom-shop btn-sm">Add to Cart</button>
        </div>
      </div>
    `;

    // Add click event to the button
    const addToCartButton = productHTML.querySelector(".btn-custom-shop");
    addToCartButton.addEventListener("click", () => {
      addToCart(product);
    });

    productContainer.appendChild(productHTML);
  });

  renderPagination(filteredProducts);
}

// ADD TO CART
function addToCart(product) {
  if (product.availability === "instock") {
    const productInCart = cart.find((item) => item.title === product.title);
    if (!productInCart) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`Added "${product.title}" to the cart.`);
    } else {
      alert(`"${product.title}" is already in the cart.`);
    }
  } else {
    alert(`"${product.title}" is out of stock!`);
  }
}

// Function to render pagination buttons
function renderPagination(filteredProducts = products) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    paginationContainer.innerHTML += `
      <button class="btn btn-pagination mx-1 ${
        i === currentPage ? "active" : ""
      }" data-page="${i}">
        ${i}
      </button>
    `;
  }
}

// Function to handle page change
function changePage(page) {
  currentPage = page;
  renderProducts();
}

// Add event listener for pagination buttons
document.getElementById("pagination").addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const page = Number(event.target.getAttribute("data-page"));
    changePage(page);
  }
});

// Function to filter products based on search input
function filterProducts() {
  const searchTerm = document.getElementById("searchBar").value.toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.author.toLowerCase().includes(searchTerm)
  );
  renderProducts(filteredProducts);
}

// Function to sort products based on selected option
function sortProducts() {
  const sortOption = document.getElementById("sortOptions").value;
  let sortedProducts = [...products];

  if (sortOption === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  renderProducts(sortedProducts);
}

// Add event listeners for search bar and sort dropdown
document.getElementById("searchBar").addEventListener("input", filterProducts);
document.getElementById("sortOptions").addEventListener("change", sortProducts);

renderProducts();
