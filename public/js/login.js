const loginForm = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#user-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }
};

document.querySelector('#login-form').addEventListener('submit', loginForm);
