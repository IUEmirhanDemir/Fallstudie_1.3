// Testfall für datenAusLokalenSpeicherLaden_Funktion()
test('datenAusLokalenSpeicherLaden_Funktion() gibt ein Array von Daten aus dem lokalen Speicher zurück', () => {
    // Legen Sie zuerst einige Testdaten im lokalen Speicher ab
    const testDaten = [    { name: 'Mustermann', vorname: 'Max' },    { name: 'Musterfrau', vorname: 'Maria' }  ];
    localStorage.setItem('spendenDaten', JSON.stringify(testDaten));
    // Rufen Sie die Funktion auf und überprüfen Sie, ob das zurückgegebene Array den erwarteten Daten entspricht
    expect(datenAusLokalenSpeicherLaden_Funktion()).toEqual(testDaten);
  });
  
  
  // Testfall für datenAusLokalemSpeicherEntfernen_Funktion()
  test('datenAusLokalemSpeicherEntfernen_Funktion() entfernt eine Daten aus dem lokalen Speicher', () => {
    // Legen Sie zuerst einige Testdaten im lokalen Speicher ab
    const testDaten = [    { name: 'Mustermann', vorname: 'Max' },    { name: 'Musterfrau', vorname: 'Maria' }  ];
    localStorage.setItem('spendenDaten', JSON.stringify(testDaten));
    // Rufen Sie die Funktion auf, um das erste Element zu entfernen
    datenAusLokalemSpeicherEntfernen_Funktion(0);
    // Überprüfen Sie, ob das erste Element tatsächlich entfernt wurde
    const erwartetesErgebnis = [{ name: 'Musterfrau', vorname: 'Maria' }];
    expect(JSON.parse(localStorage.getItem('spendenDaten'))).toEqual(erwartetesErgebnis);
  });
  
  
  // Testfall für datenAnzeigen_Funktion()
  test('datenAnzeigen_Funktion() generiert HTML-Code für die Anzeige von Spendendaten', () => {
    // Legen Sie einige Testdaten fest
    const testDaten = [    { name: 'Mustermann', vorname: 'Max', abholung: 'Abholung' },    { name: 'Musterfrau', vorname: 'Maria', abholung: 'Übergabe an der Geschäftsstelle' }  ];
    // Rufen Sie die Funktion auf, um den generierten HTML-Code zu erhalten
    const ergebnis = datenAnzeigen_Funktion(testDaten);
    // Überprüfen Sie, ob der generierte HTML-Code den erwarteten HTML-Code enthält
    expect(ergebnis).toContain('<div class="grid">');
    expect(ergebnis).toContain('<div class="name-vorname"');
    expect(ergebnis).toContain('<button class="löschButton"');
  });
  
  
// Legen Sie einige Testdaten fest
const testDaten = [
    { name: 'Mustermann', vorname: 'Max', abholung: 'Abholung', adresse: 'Musterstraße 1', Plz: '12345', kleidungsstueck: 'Hemd', krisengebiet: 'Syrien' },
    { name: 'Musterfrau', vorname: 'Maria', abholung: 'Übergabe an der Geschäftsstelle', kleidungsstueck: 'Mantel', krisengebiet: 'Afghanistan' }
    ];
    // Legen Sie einige Testelemente im HTML-Code fest, um Klickereignisse zu simulieren
    document.body.innerHTML = <div id="zeigeDatenAn">${datenAnzeigen_Funktion(testDaten)}</div> ;
    // Rufen Sie die Funktion auf, um Details für das erste Element anzuzeigen
    $('.name-vorname')[0].click();
    // Überprüfen Sie, ob die Details angezeigt wurden
    expect($('#details-0').is(':visible')).toBe(true);
    expect($('#details-0').html()).toContain('Abholungsoption: Abholung<br>');
    expect($('#details-0').html()).toContain('Adresse: Musterstraße 1<br>');
    expect($('#details-0').html()).toContain('Plz: 12345<br>');
    expect($('#details-0').html()).toContain('Kleidungsstück: Hemd<br>');
    expect($('#details-0').html()).toContain('Krisengebiet: Syrien');
    // Rufen Sie die Funktion auf, um das zweite Element zu löschen
    $('.löschButton')[1].click();
    // Überprüfen Sie, ob das zweite Element tatsächlich entfernt wurde
    const erwartetesErgebnis = [{ name: 'Mustermann', vorname: 'Max', abholung: 'Abholung', adresse: 'Musterstraße 1', Plz: '12345', kleidungsstueck: 'Hemd', krisengebiet: 'Syrien' }];
    expect(JSON.parse(localStorage.getItem('spendenDaten'))).toEqual(erwartetesErgebnis);
    ;