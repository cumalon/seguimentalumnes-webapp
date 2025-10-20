# Webapp d'informes d'avaluació

Aquesta webapp permet als usuaris consultar els informes d'avaluació generats i compartits mitjançant Google Drive. El sistema està pensat perquè cada alumne o usuari accedeixi a través d'una pàgina web personalitzada, on es mostra la llista d'informes que té disponibles.

## Característiques

- **Visualització personalitzada:** Cada usuari pot veure només els informes que li han estat compartits en mode lectura.
- **Vista admin:** Els usuaris administradors poden accedir a la llista completa d'informes i consultar els informes d'alumnes de forma agregada.
- **Integració amb Google Sheets:** La webapp s'executa a partir d'un full de càlcul de Google que conté la taula de referència d'informes i usuaris.
- **Compartició segura:** Els informes són documents de Google (Google Docs) compartits automàticament amb cada usuari.
- **No requereix acció de l'alumne:** Els alumnes no han d'autoritzar permisos ni modificar res al seu Drive, només accedeixen a la web i veuen els enllaços als seus informes.

## Funcionament

1. L'administrador genera informes d'avaluació i els comparteix amb els alumnes.
2. Les referències als informes i als usuaris amb accés s'anoten a la pestanya `webapp` d'un full de càlcul de Google.
3. La webapp llegeix aquesta pestanya i mostra a cada usuari la llista d'informes disponibles segons el seu correu Google.
4. Els usuaris accedeixen a la webapp i poden consultar els seus informes de forma fàcil i segura.

## Requisits

- Accés a un compte Google.
- El full de càlcul ha de tenir la pestanya `webapp` amb les referències als informes i als usuaris.

## Exemple d'ús

- Un professor genera informes per a cada alumne i els comparteix automàticament amb el correu de cada alumne.
- Els alumnes accedeixen a la webapp i veuen només els seus informes.

## Instal·lació

La webapp s'ha de desplegar com a Google Apps Script associat al full de càlcul on es gestionen els informes.

