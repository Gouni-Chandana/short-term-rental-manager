const API_URL = "http://localhost:3000"; // change this to your deployed backend URL later

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

// ================== SIGNUP ==================
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const res = await fetch(${API_URL}/users/signup, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    if (!res.ok) throw new Error("Signup failed");
    alert("Signup successful!");
    window.location.href = "login.html";
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// ================== LOGIN ==================
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch(${API_URL}/users/login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Invalid credentials");

    currentUser = data; // store logged in user
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.href = "index.html";
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// ================== ADD LISTING ==================
document.getElementById("listingForm")?.addEventListener("submit", async (e) => {
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

  try {
    const res = await fetch(${API_URL}/listings, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        image,
        price,
        location,
        userId: currentUser._id
      })
    });

    if (!res.ok) throw new Error("Failed to add listing");
    alert("Listing added!");
    window.location.href = "index.html";
  } catch (err) {
    alert("Error: " + err.message);
  }
});

// ================== SHOW LISTINGS ON HOMEPAGE ==================
const listingsContainer = document.getElementById("listingsContainer");
if (listingsContainer) {
  (async () => {
    try {
      const res = await fetch(${API_URL}/listings);
      const listings = await res.json();

      listingsContainer.innerHTML = listings.map(l => `
        <div class="col-md-4 mb-4">
          <div class="card shadow">
            <img src="${l.image}" class="card-img-top" style="height:200px;object-fit:cover">
            <div class="card-body">
              <h5 class="card-title">${l.title}</h5>
              <p class="text-muted">₹${l.price} / night</p>
              <p class="small">${l.location}</p>
              <a href="listing.html?id=${l._id}" class="btn btn-primary">Show More</a>
            </div>
          </div>
        </div>
      `).join("");
    } catch (err) {
      listingsContainer.innerHTML = "Failed to load listings.";
    }
  })();
}

// ================== SHOW SINGLE LISTING ==================
const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");
if (listingId) {
  (async () => {
    try {
      const res = await fetch(${API_URL}/listings/${listingId});
      const listing = await res.json();

      document.getElementById("listingDetails").innerHTML = `
        <div class="card shadow">
          <img src="${listing.image}" class="card-img-top" style="height:300px;object-fit:cover">
          <div class="card-body">
            <h3>${listing.title}</h3>
            <p>${listing.description}</p>
            <p><strong>₹${listing.price} / night</strong></p>
            <p><i>${listing.location}</i></p>
            ${currentUser && currentUser._id === listing.userId ? 
              <button onclick="deleteListing('${listing._id}')" class="btn btn-danger">Delete</button> : ""}
          </div>
        </div>
      `;

      loadReviews(listing);
    } catch (err) {
      alert("Failed to load listing.");
    }
  })();
}

// ================== DELETE LISTING ==================
async function deleteListing(id) {
  try {
    const res = await fetch(${API_URL}/listings/${id}, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
    alert("Listing deleted!");
    window.location.href = "index.html";
  } catch (err) {
    alert("Error: " + err.message);
  }
}

// ================== REVIEWS ==================
async function loadReviews(listing) {
  const reviewsList = document.getElementById("reviewsList");
  reviewsList.innerHTML = listing.reviews.map(r => <li class="list-group-item">${r}</li>).join("");

  document.getElementById("reviewForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const review = document.getElementById("reviewText").value;

    try {
      const res = await fetch(${API_URL}/listings/${listing._id}/reviews, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review })
      });

      const updated = await res.json();
      loadReviews(updated);
      document.getElementById("reviewText").value = "";
    } catch (err) {
      alert("Error adding review: " + err.message);
    }
  });
}
