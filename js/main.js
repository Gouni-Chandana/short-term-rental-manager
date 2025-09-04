// Store users, listings, and reviews in localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
let listings = JSON.parse(localStorage.getItem("listings")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// Signup
document.getElementById("signupForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (users.find(u => u.email === email)) {
    alert("User already exists!");
    return;
  }

  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful!");
  window.location.href = "login.html";
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    alert("Invalid credentials!");
    return;
  }
  currentUser = user;
  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "index.html";
});

// Add Listing
document.getElementById("listingForm")?.addEventListener("submit", e => {
  e.preventDefault();
  if (!currentUser) {
    alert("Login first!");
    return;
  }

  const title = document.getElementById("listingTitle").value;
  const description = document.getElementById("listingDescription").value;
  const image = document.getElementById("listingImage").value;
  const price = document.getElementById("listingPrice").value;
  const location = document.getElementById("listingLocation").value;

  const newListing = {
    id: Date.now(),
    userId: currentUser.id,
    title,
    description,
    image,
    price,
    location,
    reviews: []
  };

  listings.push(newListing);
  localStorage.setItem("listings", JSON.stringify(listings));
  alert("Listing added!");
  window.location.href = "index.html";
});

// Show Listings on Homepage
const listingsContainer = document.getElementById("listingsContainer");
if (listingsContainer) {
  listingsContainer.innerHTML = listings.map(l => `
    <div class="col-md-4 mb-4">
      <div class="card shadow">
        <img src="${l.image}" class="card-img-top" style="height:200px;object-fit:cover">
        <div class="card-body">
          <h5 class="card-title">${l.title}</h5>
          <p class="text-muted">₹${l.price} / night</p>
          <p class="small">${l.location}</p>
          <a href="listing.html?id=${l.id}" class="btn btn-primary">Show More</a>
        </div>
      </div>
    </div>
  `).join("");
}

// Show Single Listing
const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");
if (listingId) {
  const listing = listings.find(l => l.id == listingId);
  if (listing) {
    document.getElementById("listingDetails").innerHTML = `
      <div class="card shadow">
        <img src="${listing.image}" class="card-img-top" style="height:300px;object-fit:cover">
        <div class="card-body">
          <h3>${listing.title}</h3>
          <p>${listing.description}</p>
          <p><strong>₹${listing.price} / night</strong></p>
          <p><i>${listing.location}</i></p>
          ${currentUser && currentUser.id === listing.userId ? 
            `<button onclick="deleteListing(${listing.id})" class="btn btn-danger">Delete</button>` : ""}
        </div>
      </div>
    `;

    loadReviews(listing);
  }
}

// Delete Listing
function deleteListing(id) {
  listings = listings.filter(l => l.id !== id);
  localStorage.setItem("listings", JSON.stringify(listings));
  alert("Listing deleted!");
  window.location.href = "index.html";
}

// Reviews
function loadReviews(listing) {
  const reviewsList = document.getElementById("reviewsList");
  reviewsList.innerHTML = listing.reviews.map(r => `<li class="list-group-item">${r}</li>`).join("");

  document.getElementById("reviewForm")?.addEventListener("submit", e => {
    e.preventDefault();
    const review = document.getElementById("reviewText").value;
    listing.reviews.push(review);
    localStorage.setItem("listings", JSON.stringify(listings));
    loadReviews(listing);
    document.getElementById("reviewText").value = "";
  });
}
