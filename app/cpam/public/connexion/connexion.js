document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form-container form');
    const submitButton = document.querySelector('.btn-submit');
  
    if (form && submitButton) {
      form.addEventListener('submit', function() {
        submitButton.disabled = true;
        submitButton.innerText = 'En cours...';
      });
    }
  });
  