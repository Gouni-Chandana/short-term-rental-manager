document.getElementById('signupForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const emailError = document.getElementById('emailError');
  const passError = document.getElementById('passError');
  const signupError = document.getElementById('signupError');
  const signupSuccess = document.getElementById('signupSuccess');

  emailError.textContent = '';
  passError.textContent = '';
  signupError.textContent = '';
  signupSuccess.textContent = '';

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
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      signupSuccess.textContent = data.message + ' You can now login.';
      signupError.textContent = '';
    } else {
      signupError.textContent = data.message || 'Signup failed.';
      signupSuccess.textContent = '';
    }
  } catch (error) {
    signupError.textContent = 'Error connecting to server.';
    signupSuccess.textContent = '';
  }
});
