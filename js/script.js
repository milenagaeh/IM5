// Die Funktion in diesem Eventlistener wird ausgeführt,
// sobald alle Inhalte des DOM geladen wurden.
document.addEventListener("DOMContentLoaded", function(event) {

  var inputVon = document.querySelector('#input-von');
  var inputNach = document.querySelector('#input-nach');
  let buttonSubmit = document.querySelector('#button-submit');
  let buttonLoeschen = document.querySelector('#button-loeschen');

  inputVon.addEventListener('input', function (evt) {

    // console.log("Im Von-Feld wird getippt.");

    let meinInput = inputVon.value;

    fetchStationenVon(meinInput);

  });

  inputNach.addEventListener('input', function (evt) {

    // console.log("Im Nach-Feld wird getippt.");

    let meinInput = inputNach.value;

    fetchStationenNach(meinInput);

  });

  buttonSubmit.addEventListener('click', function (evt) {

    let von = inputVon.value;
    let nach = inputNach.value;

    if (von !== '' && nach !== ''){

      console.log("Der Submit-Button wurde gedrückt!");

      let query = "from='" + von + "'&to='" + nach + "'";
      console.log(query);

      fetchVerbindungen(query);

    } else {

      console.log("Bitte gib Abfahrts- und Ankunftsort ein.")

    }

  });

  buttonLoeschen.addEventListener('click', function (evt) {

    inputVon.value = "";
    inputNach.value = "";
    document.querySelector('#dropdown-von').innerHTML = "";
    document.querySelector('#dropdown-nach').innerHTML = "";
    document.querySelector('#verbindungen').innerHTML = "";

  });

});


// Funktionen fürs Dropdown bei Input-Von
// Funktionen fürs Dropdown bei Input-Von
// Funktionen fürs Dropdown bei Input-Von
// Funktionen fürs Dropdown bei Input-Von
// Funktionen fürs Dropdown bei Input-Von

function fetchStationenVon(meinInput){

  fetch("https://transport.opendata.ch/v1/locations?type='station'&query='" + meinInput)

  .then((response) => {

    return response.json();
  })
  .then((data) => {

    // console.log(data);

    let stationen = data.stations

    // console.log(stationen);

    // remove all elements in the list first

    zeichneDropdownVon(stationen);

  })
  // Nur wenn etwas nicht funktioniert hat ...
  .catch(function(error) {
    // ... wird eine Fehlermeldung ausgegeben.
    console.log('Error: ' + error.message);
  });

}

function zeichneDropdownVon(stationen){

  document.querySelector('#dropdown-von').innerHTML = "";

  // Erstelle ein Dropdown bestehend aus List-Elementen aus allen ge-fetcheten Elementen
  stationen.forEach(function(station) {

    var listelement = document.createElement('li');
    listelement.innerHTML = station.name;
    listelement.id = station.id;
    listelement.classList.add("dropdown-von");

    document.querySelector('#dropdown-von').appendChild(listelement);

  });

  addKlickListenerVon();

}

function addKlickListenerVon() {

  document.querySelectorAll('.dropdown-von')
  .forEach(station => {
    station.addEventListener('click', function() {


      // clear the list on click and write innerHTML to input field
      document.querySelector('#input-von').value = this.innerHTML;
      document.querySelector('#dropdown-von').innerHTML = "";

    })

  });

}

// Gleiche Funktionen fürs Dropdown bei Input-Nach
// Gleiche Funktionen fürs Dropdown bei Input-Nach
// Gleiche Funktionen fürs Dropdown bei Input-Nach
// Gleiche Funktionen fürs Dropdown bei Input-Nach
// Gleiche Funktionen fürs Dropdown bei Input-Nach

function fetchStationenNach(meinInput){

  // Do the fetch
  fetch("https://transport.opendata.ch/v1/locations?type='station'&query='" + meinInput)

  .then((response) => {

    return response.json();
  })
  .then((data) => {

    // console.log(data);

    let stationen = data.stations

    // console.log(stationen);

    zeichneDropdownNach(stationen);

  })
  // Nur wenn etwas nicht funktioniert hat ...
  .catch(function(error) {
    // ... wird eine Fehlermeldung ausgegeben.
    console.log('Error: ' + error.message);
  });

}

function zeichneDropdownNach(stationen){

  document.querySelector('#dropdown-nach').innerHTML = "";

  // Erstelle ein Dropdown bestehend aus List-Elementen aus allen ge-fetcheten Elementen
  stationen.forEach(function(station) {

    var listelement = document.createElement('li');
    listelement.innerHTML = station.name;
    listelement.id = station.id;
    listelement.classList.add("dropdown-nach");

    document.querySelector('#dropdown-nach').appendChild(listelement);

  });

  addKlickListenerNach();

}

function addKlickListenerNach() {

  document.querySelectorAll('.dropdown-nach')
  .forEach(station => {
    station.addEventListener('click', function() {


      // clear the list on click and write innerHTML to input field
      document.querySelector('#input-nach').value = this.innerHTML;
      document.querySelector('#dropdown-nach').innerHTML = "";

    })

  });

}

// Funktionen für die Fahrplanabfrage
// Funktionen für die Fahrplanabfrage
// Funktionen für die Fahrplanabfrage
// Funktionen für die Fahrplanabfrage
// Funktionen für die Fahrplanabfrage

function fetchVerbindungen(query) {

  // Do the fetch
  fetch("https://transport.opendata.ch/v1/connections?" + query)

  .then((response) => {

    return response.json();
  })
  .then((data) => {

    // console.log(data);

    let verbindungen = data.connections;

    console.log(verbindungen);

    zeichneVerbindungen(verbindungen);


  })
  // Nur wenn etwas nicht funktioniert hat ...
  .catch(function(error) {
    // ... wird eine Fehlermeldung ausgegeben.
    console.log('Error: ' + error.message);
  });

}

function zeichneVerbindungen(verbindungen){

  document.querySelector('#verbindungen').innerHTML = "";

  verbindungen.forEach(function(verbindung) {

    var verbindungContainer = document.createElement('div');

    let abfahrt = verbindung.from.departureTimestamp;
    let ankunft = verbindung.to.arrivalTimestamp;
    let dauer = verbindung.duration;
    let gleis = verbindung.from.platform

    abfahrt = konvertiereTimestamp(abfahrt);
    ankunft = konvertiereTimestamp(ankunft);

    dauer = dauer.slice(3,8) + 'h';

    verbindungContainer.innerHTML =
    "<b> Abfahrt: </b>" + abfahrt + "<br>" +
    "<b> Ankunft: </b>" + ankunft + "<br> <br>" +
    "<b> Gleis: </b>" + gleis + "<br> <br>" +
    "<b> Dauer: </b>" + dauer + "<br>";

    verbindungContainer.classList.add("verbindung");

    document.querySelector('#verbindungen').appendChild(verbindungContainer);

  });

}
function konvertiereTimestamp(timestamp) {
  // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  var date = new Date(timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var formattedTime = hours + ':' + minutes.substr(-2);

  return formattedTime + ' Uhr';
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

function überprüfeLösung() {
  var lösungswortEingabe = document.getElementById('lösungswort').value.toLowerCase();
  var nachrichtElement = document.getElementById('nachricht');

  // Überprüfe, ob das eingegebene Lösungswort korrekt ist
  if (lösungswortEingabe === 'schatten') {
    nachrichtElement.textContent = 'Richtig! Du hast Zugang zur geheimen Seite!'; window.location.href = 'secretdungeon.html';
    // Hier könntest du den Benutzer zur nächsten Seite weiterleiten, z.B. window.location.href = 'geheimes.html';
  } else {
    nachrichtElement.textContent = 'Falsch! Bitte versuche es erneut.';
  }
}