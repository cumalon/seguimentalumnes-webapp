// NOTA: Aquesta funció s'ha mogut a config.gs per mantenir la retrocompatibilitat
// i suportar tant les noves pestanyes de configuració com la pestanya "webapp" antiga

function getIndexPageName_() {
  return amIAdmin_()? "adminIndex" : "webapp"
}

function doGet(e) {
  const filename = getIndexPageName_();
  return HtmlService.createTemplateFromFile(filename)
                    .evaluate()
                    .setTitle("Informes d'avaluació")
                    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL); // Opcional, permet que la pàgina es mostri dins d'un iframe, si cal
}

// funció per incrustar codi de fitxers externs
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function processUrls() {
  var userEmail = getUserEmail();
  return processUrlsByEmail(userEmail);
}

// NOTA: Aquesta funció s'ha mogut a config.gs per mantenir la retrocompatibilitat
// i suportar tant les noves pestanyes de configuració com la pestanya "webapp" antiga

function getUserEmail() {
  return Session.getActiveUser().getEmail(); // Obtenir l'email de l'usuari actual
}

function getUserName() {
    var email = Session.getActiveUser().getEmail();
    var name = email.split('@')[0].replace(/\./g, ' '); // Opcional: substituir punts per espais
    return name;
}

// NOTA: Aquesta funció s'ha mogut a config.gs per mantenir la retrocompatibilitat
// i suportar tant les noves pestanyes de configuració com la pestanya "webapp" antiga
