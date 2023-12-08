
// Kontaktformular //

function submitForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name || !email || !message) {
    alert('Bitte füllen Sie alle Felder aus.');
    return;
  }

  console.log('Name:', name);
  console.log('E-Mail:', email);
  console.log('Nachricht:', message);

  zeigeBenachrichtigung('Formular erfolgreich abgeschickt!');

  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

function zeigeBenachrichtigung(text) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = text;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000); // Die Benachrichtigung wird nach 3 Sekunden automatisch entfernt
}


//Secret Dungeon Rätsel//

function überprüfeLösung() {
  var lösungswortEingabe = document.getElementById('lösungswort').value.toLowerCase();
  var nachrichtElement = document.getElementById('nachricht');

  if (lösungswortEingabe === 'schatten') {
    nachrichtElement.textContent = 'Richtig! Du hast Zugang zur geheimen Seite!';
    window.location.href = 'secretdungeon.html';
  } else {
    nachrichtElement.textContent = 'Falsch! Bitte versuche es erneut.';
  }
}

