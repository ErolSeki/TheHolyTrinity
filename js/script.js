// ============================================================
// THE HOLY TRINITY — js/script.js
// Modul 293 MP | Interaktive Funktionen
//
// Dieses Skript steuert alle interaktiven Elemente der Website:
// 1. Mobile Navigation (Hamburger-Menü)
// 2. Stat-Balken Animation (Auto-Seiten)
// 3. Sound-Player (Audio-Wiedergabe)
// 4. Formular-Validierung (Kontakt-Seite)
// ============================================================

// Warte, bis die HTML-Seite vollständig geladen ist
document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================================
  // 1. MOBILE NAVIGATION TOGGLE (Hamburger-Menü)
  //
  // Öffnet/Schliesst das Menü auf Mobile-Geräten.
  // Fügt die CSS-Klasse .open hinzu/entfernt sie.
  // ============================================================
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');  // Klasse hinzufügen/entfernen
    });
  }

  // ============================================================
  // 2. STAT-BALKEN ANIMATION (Auto-Seiten)
  //
  // Animiert die Performance-Balken beim Laden der Seite.
  // Liest den Zielwert aus dem data-width Attribut im HTML.
  // Beispiel: <div data-width="85"> wird zu 85% Breite animiert.
  // ============================================================
  const statBars = document.querySelectorAll('.gt-bar-fill');
  
  if (statBars.length > 0) {
    // Nach kurzer Verzögerung Animation starten
    setTimeout(function() {
      statBars.forEach(function(bar) {
        const targetWidth = bar.getAttribute('data-width');  // Zielwert aus HTML lesen
        if (targetWidth) {
          bar.style.width = targetWidth + '%';  // Balken auf Zielbreite setzen
        }
      });
    }, 100);  // 100ms Verzögerung für smooth effect
  }

  // ============================================================
  // 3. SOUND-PLAYER (Echtes Audio)
  //
  // Spielt Motorsounds ab (MP3-Dateien aus audios/ Ordner).
  // Erkennt automatisch, auf welcher Auto-Seite man ist.
  // Zeigt Visualizer-Animation während der Wiedergabe.
  // ============================================================
  const soundBtn = document.querySelector('.sound-btn');
  const soundVisualizer = document.querySelector('.sound-visualizer');
  
  if (soundBtn && soundVisualizer) {
    // Audio-Element erstellen (versteckt im Hintergrund)
    let audioPlayer = null;
    
    // Aktuelle Seite erkennen (ferrari.html, mclaren.html oder porsche.html)
    const currentPage = window.location.pathname.split('/').pop();
    let audioFile = '';
    
    // Passende Audio-Datei wählen basierend auf Seite
    if (currentPage.includes('ferrari')) {
      audioFile = 'audios/ferrari-sound.mp3';
    } else if (currentPage.includes('mclaren')) {
      audioFile = 'audios/mclaren-sound.mp3';
    } else if (currentPage.includes('porsche')) {
      audioFile = 'audios/porsche-sound.mp3';
    }
    
    // Audio-Element vorbereiten, falls Datei gefunden wurde
    if (audioFile) {
      audioPlayer = new Audio(audioFile);  // Neues Audio-Element erstellen
      audioPlayer.volume = 0.7;            // Lautstärke auf 70% setzen
      
      // Event-Listener: Was passiert, wenn Audio zu Ende ist?
      audioPlayer.addEventListener('ended', function() {
        soundBtn.classList.remove('playing');
        soundVisualizer.classList.remove('active');
        soundBtn.innerHTML = '<span class="sound-btn-icon">▶</span> Motorsound abspielen';
      });
    }
    
    // Klick auf Sound-Button
    soundBtn.addEventListener('click', function() {
      const isPlaying = soundBtn.classList.contains('playing');
      
      if (isPlaying) {
        // STOP: Audio anhalten und zurücksetzen
        if (audioPlayer) {
          audioPlayer.pause();           // Audio pausieren
          audioPlayer.currentTime = 0;   // Zurück zum Anfang
        }
        soundBtn.classList.remove('playing');
        soundVisualizer.classList.remove('active');
        soundBtn.innerHTML = '<span class="sound-btn-icon">▶</span> Motorsound abspielen';
        
      } else {
        // PLAY: Audio abspielen
        if (audioPlayer) {
          audioPlayer.play().catch(function(error) {
            // Fehlerbehandlung: Audio konnte nicht abgespielt werden
            alert('Audio-Datei nicht gefunden. Bitte füge die Sounddateien im Ordner "audios/" hinzu.');
          });
          soundBtn.classList.add('playing');
          soundVisualizer.classList.add('active');
          soundBtn.innerHTML = '<span class="sound-btn-icon">⏸</span> Wiedergabe läuft...';
        } else {
          alert('Keine Audio-Datei konfiguriert.');
        }
      }
    });
  }

  // ============================================================
  // 4. FORMULAR-VALIDIERUNG (Kontakt-Seite)
  //
  // Prüft alle Felder beim Absenden des Formulars.
  // Zeigt Fehlermeldungen an, wenn Felder leer/ungültig sind.
  // Verwendet Regex-Pattern für E-Mail-Validierung.
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    // Event-Listener für Form-Submit
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();  // Verhindert normales Absenden (würde Seite neu laden)
      
      // Alle vorherigen Fehler zurücksetzen
      const errorGroups = contactForm.querySelectorAll('.form-group.has-error');
      errorGroups.forEach(function(group) {
        group.classList.remove('has-error');
      });
      
      let isValid = true;  // Flag: Ist das Formular gültig?
      
      // VORNAME prüfen
      const firstname = document.getElementById('firstname');
      if (!firstname.value.trim()) {  // .trim() entfernt Leerzeichen
        showError(firstname, 'Bitte gib deinen Vornamen ein.');
        isValid = false;
      }
      
      // NACHNAME prüfen
      const lastname = document.getElementById('lastname');
      if (!lastname.value.trim()) {
        showError(lastname, 'Bitte gib deinen Nachnamen ein.');
        isValid = false;
      }
      
      // E-MAIL prüfen (mit Regex-Pattern)
      const email = document.getElementById('email');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Muss @ und . enthalten
      if (!email.value.trim()) {
        showError(email, 'Bitte gib deine E-Mail-Adresse ein.');
        isValid = false;
      } else if (!emailPattern.test(email.value)) {  // Pattern-Test
        showError(email, 'Bitte gib eine gültige E-Mail-Adresse ein.');
        isValid = false;
      }
      
      // LIEBLINGSAUTO prüfen (Select-Feld)
      const car = document.getElementById('car');
      if (!car.value) {  // Kein Wert = nichts ausgewählt
        showError(car, 'Bitte wähle ein Auto aus.');
        isValid = false;
      }
      
      // NACHRICHT prüfen
      const message = document.getElementById('message');
      if (!message.value.trim()) {
        showError(message, 'Bitte schreib uns eine Nachricht.');
        isValid = false;
      }
      
      // DATENSCHUTZ-CHECKBOX prüfen
      const privacy = document.getElementById('privacy');
      if (!privacy.checked) {
        showError(privacy, 'Bitte akzeptiere die Datenschutzerklärung.');
        isValid = false;
      }
      
      // Wenn alles gültig: Formular an Onlex absenden
      // contactForm.submit() sendet die Daten als POST-Request an
      // den Onlex-Formmailer, welcher eine E-Mail an den Empfänger
      // (Benutzerkonto: Revandor) weiterleitet.
      if (isValid) {
        contactForm.submit();
      }
    });
  }
  
  // HILFSFUNKTION: Fehler anzeigen
  // Fügt .has-error Klasse hinzu und setzt Fehlertext
  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
      formGroup.classList.add('has-error');  // Roten Rahmen aktivieren
      const errorMsg = formGroup.querySelector('.error-msg');
      if (errorMsg) {
        errorMsg.textContent = message;  // Fehlertext setzen
      }
    }
  }
  
  // Fehler entfernen beim Tippen (UX-Verbesserung)
  const formInputs = document.querySelectorAll('.form-control');
  formInputs.forEach(function(input) {
    input.addEventListener('input', function() {
      const formGroup = input.closest('.form-group');
      if (formGroup && formGroup.classList.contains('has-error')) {
        formGroup.classList.remove('has-error');  // Fehler entfernen
      }
    });
  });
  
  // Datenschutz-Checkbox: Fehler entfernen beim Anklicken
  const privacyCheckbox = document.getElementById('privacy');
  if (privacyCheckbox) {
    privacyCheckbox.addEventListener('change', function() {
      const formGroup = privacyCheckbox.closest('.form-group');
      if (formGroup && formGroup.classList.contains('has-error')) {
        formGroup.classList.remove('has-error');
      }
    });
  }

});

