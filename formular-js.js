  
  
  
  // Überprüfen, ob Radioelement Abholung ist, wenn ja Adresse einblenden. 

  $('#abholadresse').hide();
  $('input[type="radio"]').click(function () {
    if ($(this).attr('id') == 'abholung') {
      $('#abholadresse').show();
    } else {
      $('#abholadresse').hide();
    }
  });

//------------------------------------------





  /* 
   Code verarbeitet Spendenformular-Eingaben, prüft Abholbedingungen, 
   erstellt Bestätigungsnachricht und speichert Daten für weitere Verarbeitung.
   */

  $('#Spendenformular').submit(function (event) {

    event.preventDefault();

    var name = $('#name').val();
    var vorname = $('#vorname').val();
    var abholung = $('input[name="abholung"]:checked').val();
    var adresse = $('#adresse').val();
    var Plz = $('#Plz').val();
    var kleidungsstueck = $('#kleidungsstueck').val();
    var krisengebiet = $('#Krisengebiet').val();

    var spendenDaten = {
      name: name,
      vorname: vorname,
      abholung: abholung,
      adresse: adresse,
      Plz: Plz,
      kleidungsstueck: kleidungsstueck,
      krisengebiet: krisengebiet
    };

    if (abholung === 'Abholung' && !Plz.startsWith('59')) {
      $('#main-content').html('<div class="bestaetigung">Sie wohnen außerhalb des Abholbereiches.</div>');
      return;
    }

    if (abholung !== 'abholung') {
      adresse = '-';
      Plz = '-';
    }

    var bestaetigung = 'Vielen Dank für Ihre Spende! <br><br>' +
      'Name: ' + name + '<br>' +
      'Vorname: ' + vorname + '<br>' +
      'Abholungsoption: ' + abholung + '<br>' +
      (adresse ? 'Adresse: ' + adresse + '<br>' + 'Plz: ' + Plz + '<br>' : '') +
      'Kleidungsstück: ' + kleidungsstueck + '<br>' +
      'Krisengebiet: ' + krisengebiet;

    $('#main-content').html('<div class="bestaetigung">' + bestaetigung + '</div>');

    datenInDenLokaenSpeicherSpeichern_Funktion(spendenDaten);
  });


  //------------------------------------------------






  // Fügt Datenobjekt zum localStorage hinzu und aktualisiert vorhandene Daten.

  function datenInDenLokaenSpeicherSpeichern_Funktion(spendenInfos) {
    var datenSpeichern = datenAusLokalenSpeicherLaden_Funktion();

    datenSpeichern.push(spendenInfos);

    localStorage.setItem('spendenDaten', JSON.stringify(datenSpeichern));
  }


  //------------------------------------------------





  // Lädt Daten aus dem localStorage und gibt sie als Objekt oder leeres Array zurück.


  function datenAusLokalenSpeicherLaden_Funktion() {
    var datenAusLokalenSpeicherLaden = localStorage.getItem('spendenDaten');
    if (datenAusLokalenSpeicherLaden) {
      return JSON.parse(datenAusLokalenSpeicherLaden);
    } else {
      return [];
    }
  }

  //------------------------------------------------






