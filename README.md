# Zum träumenden Federfuchs

Interaktives dreigeschossiges Antiquariat in Buchhaim.

## Projektübergabe – 26.11.2026

Zuletzt im Gespräch dokumentierter Stand: [Version 0.34](https://astraluxreverie.github.io/federfuchs/?v=034). Dieser Stand ist noch erneut technisch zu prüfen.

Bei Chatwechsel zuerst diese README und die aktuellen Quelldateien lesen. Tatsächlichen Repository-Stand prüfen; keine erledigten Aufgaben aus bloßen Gesprächsankündigungen ableiten. Nach jedem größeren Arbeitspaket diese Übergabe aktualisieren: Commit, Versionslink, geprüfte Funktionen, offene Fehler und nächste Schritte.

## Anforderungen und offene Arbeiten

- Drei vollständige Geschosse; Raum-, Tür-, Treppen- und Laufwegprüfung.
- Keine Wendeltreppe. Variante A: Treppe mit integriertem Bücherregal, Goldornamenten, bordeauxrotem Läufer, Büchern, Efeu und Laternen. Freier oberer Austritt zwingend.
- Regal-Binärtransfer und Integration prüfen; Möbelplatzhalter vorbereiten.
- Vollständige Seitentexturen und hochwertige Modelle; fehlerhafte Generatorausgaben nicht unverändert übernehmen.
- Three.js: sichtbare Geometrie und Kollisionsgeometrie getrennt prüfen; Durchgänge und Geschosswechsel testen.
- UI: keine Worttrennung mitten im Wort; Schrift und Rahmen responsiv anpassen.
- Browser- und Darstellungstests ausschließlich durch den Nutzer; technische statische Prüfungen durch den Assistenten; direkte Versionslinks, größere abgeschlossene Updates statt vieler Zwischenversionen.
- Eigenständig Alternativen bei technischen Hindernissen wählen; kein eingeschalteter Nutzer-Laptop vorausgesetzt.

## Wiederverwendbarer Google-Drive-Objektimport (Soll-Workflow)

1. Quelldatei in Google Drive anhand Datei-ID und Name identifizieren; bevorzugt GLB, alternativ glTF mit sämtlichen Texturen und Binärdateien. Keine öffentlichen Drive-Freigaben ohne Zustimmung.
2. Originaldatei binär abrufen, nicht als Text oder Vorschau. Dateigröße, Format und Vollständigkeit prüfen. GLB: Header `glTF`, Version 2 und deklarierte Länge kontrollieren.
3. Bei Bedarf mit Trimesh/geeigneter 3D-Software Geometrie, Maßstab, Orientierung, Ursprung und Materialien korrigieren. Original erhalten. Bei Treppen freie Austrittsfläche und begehbare Kollisionsgeometrie sicherstellen.
4. Geprüftes Modell über binärfähigen GitHub-Transfer in den bestehenden Asset-Ordner übernehmen. Falls Git-Blobs verwendet werden: Base64 korrekt kodieren, Blob/Tree/Commit erzeugen und Branch-Referenz ohne Force aktualisieren. Pfadkonvention vorher im Repository prüfen. Keine Drive-Vorschau-URLs als Laufzeit-Assets verwenden.
5. Objekt in vorhandene Three.js-Ladelogik integrieren, Position, Rotation, Maßstab und Kollision konfigurieren. Ladefehler sichtbar behandeln.
6. Deployment und HTTP-Abruf technisch prüfen; Browser-Abnahme auf Texturen, Perspektiven, Laufwege und Performance ausschließlich durch den Nutzer.
7. Objekt-ID, Drive-Datei-ID, Repository-Pfad, Lizenz/Quelle, Maße, Transformation, Commit und Testergebnis dokumentieren. Keine Zugangsdaten speichern.

Dieser Workflow ist eine technische Vorgabe, noch kein nachgewiesener automatisierter Ende-zu-Ende-Import. Offene Schritte erst nach tatsächlicher Ausführung als erledigt markieren.

## Verifizierter Quellcodebefund

- index.html trägt bereits Version 0.35; Service Worker verwendet Cache v035.
- assets/manifest.json registriert original-regal.glb im Slot ff_shelf_original, freigegeben nach federfuchs-original-v1. Binärdatei und Laufzeitintegration separat prüfen.
- Lokaler GLB-Loader, Inventar-Slots, Möbelplatzhalter, Wandprüfung und Editor-Kollisionen sind vorhanden. Bestehende Funktionen erhalten.
- Browser-Tests und visuelle Abnahme übernimmt ausschließlich der Nutzer. Der Assistent führt statische Prüfungen, Assetvalidierung und Implementierung durch und liefert direkte Versionslinks. Nicht auf Browser-Abnahme warten, um weitere technische Arbeit zu erledigen; keine ungetestete Funktion als visuell bestätigt bezeichnen.
- Offen: tatsächlicher Drive-Binärtransfer, Treppenmodell A, freie Podeste und Durchgänge, robuste Modellintegration, responsive Beschriftungen, technische Release-Prüfung.

## Version 0.36

[Website](https://astraluxreverie.github.io/federfuchs/?v=036). Quellcode-Commit 3224c3675ad58377fa0248efe39189779e89e003: bordeauxrote Treppenläufer mit Messingstangen und Geländerornamenten auf beiden geraden Läufen; responsive einzeilige Schaltflächen, verbreiterter Werkzeugbereich; versionierte GLB-Abrufe und erneuerter Service-Worker-Cache. Bestehende Treppenöffnungen und Navigation unverändert. Browser-Abnahme durch Nutzer ausstehend. Noch offen: integrierte Treppenregale, Efeu, Laternen, tatsächlicher Drive-Transfer, umfassende Kollisionsprüfung. Veröffentlichung über GitHub Pages nicht unabhängig bestätigt.

## Version 0.37 – Eingang

index.html ist jetzt eine eigenständige leichte Startseite; interior.html enthält die vollständige 3D-Welt. Außenumgebung und Garten bleiben im Code, sind ausgeblendet. Mobile initiale Schatten und Antialiasing reduziert. Freigegebene Fassadenvorlage muss noch als assets/facade.webp binär übertragen werden; bis dahin lokale Bildauswahl und direkter Eingang verfügbar. Tür-Hotspot ist relativ zum Bild positioniert. Fassadenabgleich mit tatsächlichen Fenstern/Möbeln, weitere Performance- und Touch-Korrekturen offen. Browser-Abnahme ausschließlich Nutzer.

## Deployment-Diagnose 0.38

main enthält index.html, entrance.html und interior.html. Service Worker trennt Navigationscache nach URL und wird auch aus interior.html mit v038 registriert. Nutzer meldet HTTP 404 für entrance.html; externe Abrufversuche nicht möglich. GitHub Pages Deploymentstatus und Einstellungen sind mit verfügbarem Connector nicht abrufbar. Keine weitere Versionsnummer bis Veröffentlichung geklärt. Fassadenbildtransfer weiterhin offen.

## Eingang und Klangwelt

Nutzer sieht weiterhin alte Live-Version. Veröffentlichung und Fassaden-Binärtransfer bleiben höchste Priorität. Eingang soll Straßenperspektive, fotorealistische Fassade, animierte Tür, Kamerafahrt und direkten Ich-Perspektive-Spawn bieten. Erste synthetische Außenklänge (Rascheln, Schritte, ferne Glockentöne) mit Audio-Opt-in implementiert; keine Originalbuch-Tonaufnahme. Weitere Klanggestaltung: Buchhändler, Papier, Federkiele, Wagen, fantastische Stadtbewohner, dezente Windgeräusche. Mobile Browser benötigen Nutzerinteraktion für Audio. Browser-Abnahme durch Nutzer.

### Weiterentwicklung ohne Live-Abnahme

Commits 6d70e0f und 6f9650c: identische Eingangsseiten, CSS-Türsimulation, Ladeüberblendung, Prefetch erst bei Eintritt, Außenklang blendet aus, lokale Bild-URLs werden freigegeben, reduzierte Bewegung berücksichtigt. Automatische Cache-Löschung entfernt, um wiederholte Downloads zu vermeiden. Beide Inline-JavaScript-Blöcke syntaktisch geprüft. Keine Browser-Abnahme; Fassadenbild fehlt weiterhin, CSS-Tür ist kein echtes 3D-Türmodell. Live-Deployment weiterhin offen.

### Begrenzte Außenansicht

Freigegebene neue Bildkomposition: vollständiges Haus, Buchhaimer Gassen, Himmel und Pflaster. Fester Standort; Wischen, Pfeiltasten und Zentrieren implementiert als begrenztes 2D-Panning mit Zoom, keine echte sphärische Projektion. Bild enthält eingebrannte UI-Symbole und abweichenden Schriftzug; vor finaler Integration bereinigen. Bildtransfer und Live-Abnahme offen. Inline-JS syntaktisch geprüft.

### Grafische Navigation – Nutzerentscheidung

Goldene Pfeile der freigegebenen Panorama-Grafik bleiben sichtbar und erhalten deckungsgleiche transparente Buttons. Buchsymbol öffnet ein Besuchermenü; Zentrierung verfügbar. Tür-Hotspot an neue Komposition angepasst, künstlicher CSS-Türflügel deaktiviert. Zielasset assets/buchhaim-panorama.webp noch nicht übertragen. Bildverschiebung bleibt 2D-Prototyp; echte Panorama-Projektion und Originaltür-Freistellung offen. Syntaxprüfung erfolgreich, keine Browser-Abnahme.
