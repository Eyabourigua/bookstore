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
];

function renderProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = ""; // Clear existing content

  products.forEach((product) => {
    container.innerHTML += `
        <div class="col-md-4 text-center">
          <div class="card book-card position-relative">
            <span class="badge bg-danger position-absolute top-0 start-0 m-2">${
              product.availability === "outofstock" ? "SoldOut" : ""
            }</span>
            <img
              src="${product.img}"
              class="card-img-top"
              alt="${product.title}"
            />
            <div class="card-body ln">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.author}</p>
              <p class="text-custom text-primary">${product.price} TND</p>
            </div>
          </div>
        </div>
      `;
  });
}

// Call the function to render products
renderProducts(products);
