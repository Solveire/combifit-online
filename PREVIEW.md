# Gescheiden pagina’s

- `/` en `/index.html` verwijzen nog steeds naar de openbare `/wachtlijst/`.
- `/programma` geeft alleen met een geldige HttpOnly-previewcookie de oorspronkelijke goedgekeurde landingspagina terug. Anders: 404.
- `/preview?key=…` controleert een SHA-256-hash, plaatst de previewcookie voor zeven dagen en verwijdert de sleutel uit de adresbalk via een redirect naar `/programma`.
- De volledige previewlink is een toegangssleutel: deel deze alleen met reviewers. In de repository staat uitsluitend de hash.
- `_worker.js` bevat de oorspronkelijke pagina buiten de openbare statische bestanden. `_routes.json` activeert de Worker alleen voor de previewroutes. Overige assets en de wachtlijst blijven statisch.
- Geen wijziging aan vormgeving, pakketten of betaalbestemmingen. Bonussen zijn nog niet aangeleverd; er zijn geen fictieve bonussen toegevoegd. De inschrijfhandler in de ingesloten pagina is de plek voor de latere bonuskeuze vóór betaling.

Controle: `node tests/waitlist-form.test.mjs` en `node tests/preview-routes.test.mjs`.
