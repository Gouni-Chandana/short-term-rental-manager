document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  let valid = true;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('emailError').textContent = 'Invalid email format.';
    valid = false;
  } else {
    document.getElementById('emailError').textContent = '';
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
    document.getElementById('passError').textContent = 'Min 6 chars, must include a letter and a number.';
    valid = false;
  } else {
    document.getElementById('passError').textContent = '';
  }

  if (valid) {
    window.location.href = 'home.html';
  } else {
    document.getElementById('loginError').textContent = 'Login failed. Fix errors above.';
  }
});
