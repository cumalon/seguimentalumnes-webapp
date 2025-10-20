/**
 * config.gs
 * Funcions per llegir les dades de les pestanyes de configuració
 * Aquestes funcions substitueixen les funcions que llegien de la pestanya "webapp"
 */

/**
 * Comprova si un usuari és administrador
 * Llegeix de la pestanya "Admins" si existeix, sinó de "webapp" (per retrocompatibilitat)
 * @return {boolean} True si l'usuari és admin
 */
function amIAdmin_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const email = getUserEmail();
  var isAdmin = false;
  
  // Intentar llegir de la nova pestanya "Admins"
  const adminsSheet = ss.getSheetByName('Admins');
  if (adminsSheet) {
    const data = adminsSheet.getRange(2, 2, adminsSheet.getLastRow() - 1, 1).getValues();
    isAdmin = data.some(function(row) {
      return row[0] == email;
    });
  } else {
    // Retrocompatibilitat: llegir de la pestanya "webapp"
    const webappSheet = ss.getSheetByName('webapp');
    if (webappSheet) {
      isAdmin = webappSheet.getRange("H1:H" + webappSheet.getLastRow()).getValues().some(function(row) {
        return row[0] == email;
      });
    }
  }
  
  Logger.log("isAdmin: " + isAdmin);
  return isAdmin;
}

/**
 * Processa els informes per email d'usuari
 * Llegeix de la pestanya "Informes" si existeix, sinó de "webapp" (per retrocompatibilitat)
 * @param {string} userEmail - Email de l'usuari
 * @return {Array} Llista d'informes disponibles per l'usuari
 */
function processUrlsByEmail(userEmail) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var results = [];
  
  // Intentar llegir de la nova pestanya "Informes"
  var informesSheet = ss.getSheetByName('Informes');
  var data;
  
  if (informesSheet) {
    // Llegir de la nova pestanya "Informes"
    data = informesSheet.getDataRange().getValues();
    // Saltar la capçalera (fila 1)
    data = data.slice(1);
    
    Logger.log("Llegint informes de la pestanya 'Informes'");
  } else {
    // Retrocompatibilitat: llegir de la pestanya "webapp"
    var webappSheet = ss.getSheetByName('webapp');
    if (!webappSheet) {
      Logger.log("No s'ha trobat cap pestanya de configuració");
      return results;
    }
    
    data = webappSheet.getDataRange().getValues();
    // Saltar la capçalera (fila 1)
    data = data.slice(1);
    Logger.log("Llegint informes de la pestanya 'webapp' (mode retrocompatibilitat)");
  }
  
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
 * Llegeix de la pestanya "Alumnes" si existeix, sinó de "webapp" (per retrocompatibilitat)
 * @return {Array} Llista d'objectes amb name i email
 */
function getNamesList() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Intentar llegir de la nova pestanya "Alumnes"
  const alumnesSheet = ss.getSheetByName("Alumnes");
  
  if (alumnesSheet) {
    // Llegir de la nova pestanya "Alumnes"
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
  } else {
    // Retrocompatibilitat: llegir de la pestanya "webapp"
    const webappSheet = ss.getSheetByName("webapp");
    if (!webappSheet) {
      return [];
    }
    
    const range = webappSheet.getRange("J2:L" + webappSheet.getLastRow());
    const values = range.getValues();
    
    return values.map(function(row) {
      return {
        name: row[0],  // Cognoms, Nom (columna J)
        email: row[2]  // Email (columna L)
      };
    }).filter(function(item) {
      return item.name && item.email; // Filtrar files buides
    });
  }
}
