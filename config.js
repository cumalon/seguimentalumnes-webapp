/**
 * config.js
 * Funcions per llegir les dades de les pestanyes de configuració
 */

/**
 * Comprova si un usuari és administrador
 * Llegeix de la pestanya "Admins"
 * @return {boolean} True si l'usuari és admin
 */
function amIAdmin_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const email = getUserEmail();
  const adminsSheet = ss.getSheetByName('Admins');
  
  if (!adminsSheet) {
    Logger.log("La pestanya 'Admins' no existeix");
    return false;
  }
  
  const data = adminsSheet.getRange(2, 2, adminsSheet.getLastRow() - 1, 1).getValues();
  const isAdmin = data.some(function(row) {
    return row[0] == email;
  });
  
  Logger.log("isAdmin: " + isAdmin);
  return isAdmin;
}

/**
 * Processa els informes per email d'usuari
 * Llegeix de la pestanya "Informes"
 * @param {string} userEmail - Email de l'usuari
 * @return {Array} Llista d'informes disponibles per l'usuari
 */
function processUrlsByEmail(userEmail) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var results = [];
  var informesSheet = ss.getSheetByName('Informes');
  
  if (!informesSheet) {
    Logger.log("La pestanya 'Informes' no existeix");
    return results;
  }
  
  var data = informesSheet.getDataRange().getValues();
  // Saltar la capçalera (fila 1)
  data = data.slice(1);
  
  Logger.log("Llegint informes de la pestanya 'Informes'");
  Logger.log(data);
  
  data.forEach(function(row) {
    var reportName = row[0];
    var url = row[2];
    var sheetName = row[3];
    var headerRowIndex = row[4] - 1;
    
    Logger.log("row ****");
    Logger.log(row);
    Logger.log("reportName: " + reportName + " sheetName: " + sheetName);
    
    if (url && url.match(/docs.google.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)) {
      try {
        var spreadsheet = SpreadsheetApp.openByUrl(url);
        var mergeSheet = spreadsheet.getSheetByName(sheetName);
        var mergeData = mergeSheet.getDataRange().getValues();
        
        // Cerca l'email de l'usuari a la columna "EMAIL"
        var emailIndex = mergeData[headerRowIndex].indexOf("EMAIL");
        var reportIndex = mergeData[headerRowIndex].indexOf("MERGE_DOC_URL");
        Logger.log("mergeSheet: " + mergeSheet.getName() + " emailIndex: " + emailIndex + " reportIndex: " + reportIndex);
        
        for (var i = headerRowIndex; i < mergeData.length; i++) {
          Logger.log("llegit: " + mergeData[i][emailIndex] + " userEmail: " + userEmail);
          var rowEmail = mergeData[i][emailIndex];
          if (rowEmail === userEmail) {
            var reportUrl = mergeData[i][reportIndex];
            if (reportUrl && reportUrl.match(/docs.google.com\/document\/d\/([a-zA-Z0-9-_]+)/)) {
              results.push({ reportName: reportName, spreadsheetName: spreadsheet.getName(), reportUrl: reportUrl });
            }
            break;
          }
        }
      } catch (error) {
        Logger.log("Error processing URL: " + url + " - " + error);
      }
    }
  });
  
  return results;
}

/**
 * Obté la llista de noms i emails d'alumnes
 * Llegeix de la pestanya "Alumnes"
 * @return {Array} Llista d'objectes amb name i email
 */
function getNamesList() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const alumnesSheet = ss.getSheetByName("Alumnes");
  
  if (!alumnesSheet) {
    Logger.log("La pestanya 'Alumnes' no existeix");
    return [];
  }
  
  const range = alumnesSheet.getRange(2, 1, alumnesSheet.getLastRow() - 1, 2);
  const values = range.getValues();
  
  return values.map(function(row) {
    return {
      name: row[0],  // "Cognoms, Nom" (columna 1)
      email: row[1]  // Email (columna 2)
    };
  }).filter(function(item) {
    return item.name && item.email; // Filtrar files buides
  });
}
