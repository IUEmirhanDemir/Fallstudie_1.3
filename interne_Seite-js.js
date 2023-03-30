
//Lädt Daten die spendenDaten aus dem lokalen Speicher

function datenAusLokalenSpeicherLaden_Funktion() {
  var datenAusLokalenSpeicherLaden = localStorage.getItem('spendenDaten');
  if (datenAusLokalenSpeicherLaden) {
    return JSON.parse(datenAusLokalenSpeicherLaden);
  } else {
    return [];
  }
}
//------------------------------------------





//Entfernt den Index aus dem Lokalen Speicher und aktuallisert den lokalen Speicher

  function datenAusLokalemSpeicherEntfernen_Funktion(index) {
    var datenAusLokalenSpeicherLaden = datenAusLokalenSpeicherLaden_Funktion();
    if (datenAusLokalenSpeicherLaden && index >= 0 && index < datenAusLokalenSpeicherLaden.length) {
      datenAusLokalenSpeicherLaden.splice(index, 1);
      localStorage.setItem('spendenDaten', JSON.stringify(datenAusLokalenSpeicherLaden));
    }
  }
  
  //------------------------------------------






    /*
Diese Funktion fügt Klickereignisse für die "name-vorname"-Elemente hinzu, um die Details des Elements anzuzeigen, 
und den  löschButton, um das Element aus dem lokalen Speicher zu entfernen, und die Anzeige zu aktualisieren.
    */
  
function klickbareNameVorname_Funktion(datenArray) {
  $('.name-vorname').click(function () {
    var datenIndexAusDatenArray = $(this).data('index');
    var details = datenArray[datenIndexAusDatenArray];
    if (details) {
      var details_Inhalt = `Abholungsoption: ${details.abholung}<br>`;
      details_Inhalt += details.abholung === 'Übergabe an der Geschäftsstelle' ? 'Adresse: -<br>Plz: -<br>' : `Adresse: ${details.adresse}<br>Plz: ${details.Plz}<br>`;
      details_Inhalt += `Kleidungsstück: ${details.kleidungsstueck}<br>Krisengebiet: ${details.krisengebiet}`;
      $('#details-' + datenIndexAusDatenArray).html(details_Inhalt).toggle();
    }
  });





  $('.löschButton').click(function () {
    var datenIndexAusDatenArray = $(this).data('index');
    datenAusLokalemSpeicherEntfernen_Funktion(datenIndexAusDatenArray);
    datenAnzeigen_Funktion(datenAusLokalenSpeicherLaden_Funktion());
  });


}


//------------------------------------------







/*
Die Funktion datenAnzeigen_Funktion zeigt das übergebene Datenarray auf der Webseite an, 
indem sie jedes Element des Arrays in eine HTML-Formatvorlage einfügt und es in das Element mit der ID "zeigeDatenAn" einfügt. 
Zudem bindet sie die Funktion klickbareNamenVornamen an jedes Element.
*/
  function datenAnzeigen_Funktion(datenArray) {
    var content = datenArray.length > 0 ? '' : '<p>Keine Spendendaten vorhanden.</p>';
    datenArray.forEach(function (data, index) {
      content += `<div class="grid">
                    <div class="name-vorname" data-index="${index}">${data.vorname} ${data.name}</div>
                    <button class="löschButton" data-index="${index}">Löschen</button>
                  </div>
                  <div class="details" id="details-${index}" style="display:none;"></div><br>`;
    });
    $('#zeigeDatenAn').html(content);
    klickbareNameVorname_Funktion(datenArray);
  }

    //------------------------------------------






  /*
Wartet, dass die komplette Datei vollständig geladen ist,  und fügt ein Klickereignis für die Schaltfläche "ladeDaten" hinzu, 
um die Funktion "datenAnzeigen_Funktion" aufzurufen und die gespeicherten Daten anzuzeigen.
  */

  $(document).ready(function () {
    $('#ladeDaten').click(function () {
      datenAnzeigen_Funktion(datenAusLokalenSpeicherLaden_Funktion());
    });
  });

   //------------------------------------------
