const signupForm = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#user-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    try {
      const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
        console.log(errorMessage);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupForm);
