document.addEventListener("DOMContentLoaded", function (event) {

  var inputVon = document.querySelector('#input-von');
  var inputNach = document.querySelector('#input-nach');
  let buttonSubmit = document.querySelector('#button-submit');
  let buttonLoeschen = document.querySelector('#button-loeschen');

  inputVon.addEventListener('input', function (evt) {
    fetchStationen(inputVon, 'dropdown-von', addKlickListenerVon);
  });

  inputNach.addEventListener('input', function (evt) {
    fetchStationen(inputNach, 'dropdown-nach', addKlickListenerNach);
  });

  buttonSubmit.addEventListener('click', function (evt) {
    submitForm();
  });

  buttonLoeschen.addEventListener('click', function (evt) {
    loescheEingaben();
  });

});

function fetchStationen(inputElement, dropdownId, clickListenerFunction) {
  let meinInput = inputElement.value;

  fetch("https://transport.opendata.ch/v1/locations?type='station'&query='" + meinInput)
    .then((response) => response.json())
    .then((data) => {
      zeichneDropdown(data.stations, dropdownId, clickListenerFunction);
    })
    .catch(function (error) {
      console.log('Error: ' + error.message);
    });
}

function zeichneDropdown(stationen, dropdownId, clickListenerFunction) {
  let dropdownElement = document.querySelector('#' + dropdownId);
  dropdownElement.innerHTML = "";

  stationen.forEach(function (station) {
    var listelement = document.createElement('li');
    listelement.innerHTML = station.name;
    listelement.id = station.id;
    listelement.classList.add(dropdownId);

    dropdownElement.appendChild(listelement);
  });

  clickListenerFunction();
}

function addKlickListenerVon() {
  addKlickListener('.dropdown-von', '#input-von');
}

function addKlickListenerNach() {
  addKlickListener('.dropdown-nach', '#input-nach');
}

function addKlickListener(selector, inputId) {
  document.querySelectorAll(selector)
    .forEach(station => {
      station.addEventListener('click', function () {
        document.querySelector(inputId).value = this.innerHTML;
        document.querySelector(selector).innerHTML = "";
      });
    });
}

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
  notification.textContent = text;
  notification.className = 'notification';
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

function loescheEingaben() {
  document.getElementById('input-von').value = "";
  document.getElementById('input-nach').value = "";
  document.querySelector('#dropdown-von').innerHTML = "";
  document.querySelector('#dropdown-nach').innerHTML = "";
  document.querySelector('#verbindungen').innerHTML = "";
}

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