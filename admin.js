document.getElementById('adminLoginForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const adminLoginError = document.getElementById('adminLoginError');
  const addStaySection = document.getElementById('addStaySection');

  adminLoginError.textContent = '';
  addStaySection.style.display = 'none';

  if (!username || !password) {
    adminLoginError.textContent = 'Username and password are required.';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      addStaySection.style.display = 'block';
      adminLoginError.textContent = '';
      document.getElementById('adminLoginForm').style.display = 'none';
    } else {
      adminLoginError.textContent = data.message || 'Admin login failed.';
    }
  } catch (error) {
    adminLoginError.textContent = 'Error connecting to server.';
  }
});

document.getElementById('addStayForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('stayName').value.trim();
  const locality = document.getElementById('stayLocality').value.trim();
  const price = parseFloat(document.getElementById('stayPrice').value);
  const address = document.getElementById('stayAddress').value.trim();
  const facilities = document.getElementById('stayFacilities').value.split(',').map(f => f.trim()).filter(f => f);
  const map = document.getElementById('stayMap').value.trim();
  const nearby = document.getElementById('stayNearby').value.split(',').map(n => n.trim()).filter(n => n);

  const addStaySuccess = document.getElementById('addStaySuccess');
  const addStayError = document.getElementById('addStayError');

  addStaySuccess.textContent = '';
  addStayError.textContent = '';

  if (!name || !locality || !price || !address) {
    addStayError.textContent = 'Please fill in all required fields.';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/addStay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, locality, price, address, facilities, map, nearby }),
    });

    const data = await response.json();

    if (response.ok) {
      addStaySuccess.textContent = 'Stay added successfully.';
      addStayError.textContent = '';
      this.reset();
    } else {
      addStayError.textContent = data.message || 'Failed to add stay.';
      addStaySuccess.textContent = '';
    }
  } catch (error) {
    addStayError.textContent = 'Error connecting to server.';
    addStaySuccess.textContent = '';
  }
});
