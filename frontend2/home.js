// Fetch stays from backend and display
async function loadStays() {
  const staysContainer = document.getElementById('staysContainer');
  staysContainer.innerHTML = 'Loading stays...';

  try {
    const response = await fetch('http://localhost:3000/stays');
    if (!response.ok) {
      staysContainer.innerHTML = 'Failed to load stays.';
      return;
    }
    const stays = await response.json();
    if (stays.length === 0) {
      staysContainer.innerHTML = 'No stays available currently.';
      return;
    }
    staysContainer.innerHTML = '';
    stays.forEach(stay => {
      const div = document.createElement('div');
      div.className = 'stay-card';
      div.innerHTML = `
        <h3>${stay.name} (${stay.locality})</h3>
        <p><strong>Address:</strong> ${stay.address}</p>
        <p><strong>Price:</strong> ₹${stay.price}/night</p>
        <p><strong>Facilities:</strong> ${stay.facilities ? stay.facilities.join(', ') : ''}</p>
        <p><strong>Nearby:</strong> ${stay.nearby ? stay.nearby.join(', ') : ''}</p>
        <a href="${stay.map || '#'}" target="_blank">View on Map</a>
      `;
      staysContainer.appendChild(div);
    });
  } catch (error) {
    staysContainer.innerHTML = 'Error loading stays.';
  }
}

// Call loadStays on page load
window.addEventListener('DOMContentLoaded', loadStays);
