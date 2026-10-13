# Wachtlijst voor Combifit Online

Deze branch voegt een aparte pagina `/wachtlijst/` toe met het formulier. De bestaande landingspagina krijgt een link in de navigatie en een aanmeldsectie vóór de footer. Bestaande foto's, pakketten, betaallinks en overige functionaliteit blijven behouden.

De aanmelding gaat naar `https://crm.jjscombifitdriel.nl/api/waitlist/public`. Dat endpoint staat op de bijbehorende `feat/combifit-waitlist` branch van `Solveire/jjscombifit-crm-pages` en gebruikt dezelfde D1-database als het CRM. De frontend bevat geen secrets en kan geen CRM-contactgegevens ophalen.

Publiceer eerst de CRM-uitbreiding nadat de D1-migratie en Turnstile-variabelen zijn geconfigureerd. Controleer vervolgens dat deze repository de bedoelde bestaande landingspagina publiceert en merge pas daarna deze websitebranch. Zonder werkende CRM-/Turnstile-configuratie toont het formulier een foutmelding en blijft verzenden geblokkeerd.

De volledige implementatie-, database- en configuratiebeschrijving staat in `WACHTLIJST-OPLEVERING.md` in de CRM-repository. De CRM-uitbreiding is inmiddels gepubliceerd en de productie-D1-migratie is door de beheerder uitgevoerd. De gebruiker heeft bevestigd dat de drie beveiligingsvariabelen zijn opgeslagen. De websitewijziging moet na build- en interfacecontrole worden gepubliceerd. Responsieve styling is geïmplementeerd; een visuele test in een echte mobiele/desktopbrowser moet nog plaatsvinden.

Test: `node tests/waitlist-form.test.mjs`. De tests doen geen externe requests en schrijven geen productiegegevens. Er is geen bevestigingsmail actief.
