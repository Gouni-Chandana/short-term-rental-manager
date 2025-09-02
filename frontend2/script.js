// Updated login logic to use backend API

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const emailError = document.getElementById('emailError');
  const passError = document.getElementById('passError');
  const loginError = document.getElementById('loginError');
  const signupPrompt = document.getElementById('signupPrompt');

  emailError.textContent = '';
  passError.textContent = '';
  loginError.textContent = '';
  if (signupPrompt) signupPrompt.style.display = 'none';

  let valid = true;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = 'Invalid email format.';
    valid = false;
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password)) {
    passError.textContent = 'Min 6 chars, must include a letter and a number.';
    valid = false;
  }

  if (!valid) {
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'home.html';
    } else if (response.status === 404) {
      if (signupPrompt) signupPrompt.style.display = 'block';
    } else {
      loginError.textContent = data.message || 'Login failed.';
    }
  } catch (error) {
    loginError.textContent = 'Error connecting to server.';
  }
});

// Property Search Functionality (unchanged)
const demoProperties = [
  {
    locality: "Banjara Hills",
    name: "Skyline View Homestay",
    photo: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
    address: "Road No. 12, Banjara Hills, Hyderabad",
    facilities: ["WiFi", "AC", "Kitchen", "Parking"],
    costPerNight: 3600,
    map: "https://maps.google.com/?q=Banjara+Hills+Hyderabad",
    nearby: ["Golconda Fort", "Birla Mandir", "Salar Jung Museum"]
  },
  {
    locality: "Madhapur",
    name: "Tech City Residency",
    photo: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    address: "Plot 41, Hitech City Road, Madhapur, Hyderabad",
    facilities: ["WiFi", "Breakfast", "Gym", "TV"],
    costPerNight: 2200,
    map: "https://maps.google.com/?q=Madhapur+Hyderabad",
    nearby: ["Shilparamam", "Durgam Cheruvu", "Inorbit Mall"]
  },
  {
    locality: "Charminar",
    name: "Heritage Old City Stay",
    photo: "https://images.unsplash.com/photo-1505692794403-34d0984388bd?auto=format&fit=crop&w=600&q=80",
    address: "Near Charminar, Old City, Hyderabad",
    facilities: ["WiFi", "Heritage Suite", "Laundry"],
    costPerNight: 2800,
    map: "https://maps.google.com/?q=Charminar+Hyderabad",
    nearby: ["Charminar", "Laad Bazaar", "Mecca Masjid"]
  }
];

function searchProperties() {
  const place = document.getElementById("searchPlace").value.trim().toLowerCase();
  const minPrice = parseInt(document.getElementById("priceMin").value) || 0;
  const maxPrice = parseInt(document.getElementById("priceMax").value) || 10000;
  const msg = document.getElementById("searchMsg");
  const resultsDiv = document.getElementById("properties");
  let results = [];
  resultsDiv.innerHTML = "";
  results = demoProperties.filter(prop =>
    (!place || prop.locality.toLowerCase().includes(place)) &&
    prop.costPerNight >= minPrice &&
    prop.costPerNight <= maxPrice
  );
  if (results.length === 0) {
    msg.innerText = "No properties found for your search. Try a different locality/price!";
    msg.style.color = "red";
    return;
  } else {
    msg.innerText = results.length + " property(s) found!";
    msg.style.color = "green";
  }
  results.forEach(prop => {
    const card = document.createElement("div");
    card.className = "property-card";
    card.innerHTML = `
      <img src="${prop.photo}" alt="${prop.name}">
      <div class="property-content">
        <h3>${prop.name}</h3>
        <div class="address"><strong>Address:</strong> ${prop.address}</div>
        <div class="facilities"><strong>Facilities:</strong> ${prop.facilities.join(", ")}</div>
        <div class="cost">₹${prop.costPerNight}/night</div>
        <div class="nearby"><strong>Nearby:</strong> ${prop.nearby.join(", ")}</div>
        <a class="map-link" target="_blank" href="${prop.map}">See Location on Google Maps</a>
      </div>
    `;
    resultsDiv.appendChild(card);
  });
}

// On Home Page, require login
if (window.location.pathname.includes("home.html") && localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}
