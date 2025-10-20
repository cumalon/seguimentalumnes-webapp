# Webapp d'informes d'avaluació

Aquesta webapp permet als usuaris consultar els informes d'avaluació generats i compartits mitjançant Google Drive. El sistema està pensat perquè cada alumne o usuari accedeixi a través d'una pàgina web personalitzada, on es mostra la llista d'informes que té disponibles.

## Característiques

- **Visualització personalitzada:** Cada usuari pot veure només els informes que li han estat compartits en mode lectura.
- **Vista admin:** Els usuaris administradors poden accedir a la llista completa d'informes i consultar els informes d'alumnes de forma agregada.
- **Integració amb Google Sheets:** La webapp s'executa a partir d'un full de càlcul de Google que conté la taula de referència d'informes i usuaris.
- **Compartició segura:** Els informes són documents de Google (Google Docs) compartits automàticament amb cada usuari.
- **No requereix acció de l'alumne:** Els alumnes no han d'autoritzar permisos ni modificar res al seu Drive, només accedeixen a la web i veuen els enllaços als seus informes.
- **Configuració automàtica:** Menú de setup per crear automàticament les pestanyes de configuració amb el format adequat.

## Configuració

### Configuració automàtica (Recomanat)

A partir de la versió 2.0, la webapp inclou un menú de setup que facilita la creació de les pestanyes de configuració:

1. Obriu el full de càlcul associat a la webapp.
2. Al menú superior, seleccioneu **⚙️ Setup Webapp** > **📋 Crear pestanyes de configuració**.
3. Confirmeu la creació de les pestanyes.
4. El sistema crearà automàticament tres pestanyes amb el format adequat:
   - **Alumnes**: Llista d'alumnes amb accés als informes
   - **Informes**: Configuració dels fulls d'informes
   - **Admins**: Usuaris amb permisos d'administració

**Nota:** Les pestanyes creades inclouen dades d'exemple que podeu substituir per les vostres pròpies dades.

### Estructura de les pestanyes de configuració

#### Pestanya "Alumnes"
| "Cognoms, Nom" | EMAIL |
|----------------|-------|
| Nom complet de l'alumne | email@domini.cat |

#### Pestanya "Informes"
| Nom informe | Full de dades | URL del full | Pestanya Merge | Header row |
|-------------|---------------|--------------|----------------|------------|
| Nom descriptiu | Nom del full de càlcul | URL completa | Nom de la pestanya | Número de fila de capçalera |

#### Pestanya "Admins"
| Admin | Email |
|-------|-------|
| Nom de l'administrador | email@domini.cat |

### Configuració manual (Mètode antic)

Si preferiu configurar manualment, podeu continuar utilitzant la pestanya `webapp` amb l'estructura original (vegeu versió anterior del README).

**Important:** El sistema és retrocompatible. Si no existeixen les pestanyes de configuració noves (Alumnes, Informes, Admins), la webapp continuarà llegint de la pestanya `webapp` antiga.

## Funcionament

1. L'administrador genera informes d'avaluació i els comparteix amb els alumnes.
2. Les referències als informes i als usuaris amb accés s'anoten a les pestanyes de configuració (`Alumnes`, `Informes`, `Admins`).
3. La webapp llegeix aquestes pestanyes i mostra a cada usuari la llista d'informes disponibles segons el seu correu Google.
4. Els usuaris accedeixen a la webapp i poden consultar els seus informes de forma fàcil i segura.

## Menú Setup Webapp

El menú de setup està disponible només per a usuaris amb permisos d'edició del full de càlcul i inclou les següents opcions:

- **📋 Crear pestanyes de configuració**: Crea automàticament les tres pestanyes de configuració amb el format adequat i dades d'exemple.
- **🌐 Obrir webapp**: Mostra un diàleg amb l'enllaç a la webapp desplegada.
- **ℹ️ Informació**: Mostra informació sobre la versió i les funcionalitats de la webapp.

## Requisits

- Accés a un compte Google.
- El full de càlcul ha de tenir les pestanyes de configuració (`Alumnes`, `Informes`, `Admins`) o la pestanya `webapp` (mètode antic).
- Permisos d'edició al full de càlcul per accedir al menú de setup.

## Exemple d'ús

- Un professor genera informes per a cada alumne i els comparteix automàticament amb el correu de cada alumne.
- El professor configura les pestanyes de configuració utilitzant el menú de setup.
- Els alumnes accedeixen a la webapp i veuen només els seus informes.

## Instal·lació

La webapp s'ha de desplegar com a Google Apps Script associat al full de càlcul on es gestionen els informes.

1. Creeu un nou projecte de Google Apps Script associat al vostre full de càlcul.
2. Copieu tots els fitxers `.js`, `.html` i `.json` del repositori al vostre projecte.
3. Desplegeu la webapp com a aplicació web.
4. Utilitzeu el menú de setup per configurar les pestanyes de configuració.

## Versió

**Versió actual: 2.0**

Canvis principals en la versió 2.0:
- Afegit menú de setup amb opcions de configuració automàtica
- Separació de la configuració en tres pestanyes independents
- Format automàtic de les pestanyes amb capçalera i colors alternats
- Retrocompatibilitat amb la configuració antiga
- Diàleg per accedir directament a la webapp
