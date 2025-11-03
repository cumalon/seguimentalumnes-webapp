/**
 * setup.gs
 * Funcions per a la creació i configuració de les pestanyes de configuració
 */

// Noms de les pestanyes reservades
var RESERVED_SHEET_NAMES = ['Alumnes', 'Informes', 'Admins'];

// Color de la capçalera
var HEADER_COLOR = '#4CAF50';

/**
 * Comprova si existeixen pestanyes amb noms reservats
 * @return {Array} Array amb els noms de les pestanyes reservades que existeixen
 */
function checkReservedSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var existingSheets = [];
  
  RESERVED_SHEET_NAMES.forEach(function(name) {
    if (ss.getSheetByName(name)) {
      existingSheets.push(name);
    }
  });
  
  return existingSheets;
}

/**
 * Crea totes les pestanyes de configuració
 * Comprova primer si existeixen pestanyes amb noms reservats
 */
function setupConfigSheets() {
  var ui = SpreadsheetApp.getUi();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Comprovar si ja existeixen pestanyes amb els noms reservats
  var existingSheets = checkReservedSheets();
  
  if (existingSheets.length > 0) {
    ui.alert(
      'Error: Pestanyes reservades existents',
      'Les següents pestanyes ja existeixen i tenen noms reservats:\n\n' +
      existingSheets.join(', ') + '\n\n' +
      'Si us plau, canvieu el nom o elimineu aquestes pestanyes abans de continuar.',
      ui.ButtonSet.OK
    );
    return false;
  }
  
  try {
    // Crear les tres pestanyes
    createAlumnesSheet();
    createInformesSheet();
    createAdminsSheet();
    
    ui.alert(
      'Èxit',
      'Les pestanyes de configuració s\'han creat correctament:\n\n' +
      '✓ Alumnes\n' +
      '✓ Informes\n' +
      '✓ Admins\n\n' +
      'Ja podeu començar a introduir les dades de configuració.',
      ui.ButtonSet.OK
    );
    
    return true;
  } catch (e) {
    ui.alert('Error', 'Error en crear les pestanyes: ' + e.toString(), ui.ButtonSet.OK);
    return false;
  }
}

/**
 * Crea la pestanya "Alumnes" amb la capçalera i format
 */
function createAlumnesSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.insertSheet('Alumnes', 0); // Insertar a la posició 0 (esquerra)
  
  // Capçalera
  var headers = ['"Cognoms, Nom"', 'EMAIL'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format de capçalera
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground(HEADER_COLOR);
  headerRange.setFontWeight('bold');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setHorizontalAlignment('center');
  
  // Ajustar l'amplada de les columnes
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 250);
  
  // Afegir files d'exemple
  addSampleDataAlumnes(sheet);
  
  // Congelar la fila de capçalera
  sheet.setFrozenRows(1);
  
  return sheet;
}

/**
 * Afegeix dades d'exemple a la pestanya Alumnes
 */
function addSampleDataAlumnes(sheet) {
  var sampleData = [
    ['Alumne Prova1', 'alumne1@inspladelestany.cat'],
    ['Alumne Prova2', 'alumne2@inspladelestany.cat']
  ];
  
  if (sampleData.length > 0) {
    sheet.getRange(2, 1, sampleData.length, 2).setValues(sampleData);
  }
}

/**
 * Crea la pestanya "Informes" amb la capçalera i format
 */
function createInformesSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.insertSheet('Informes', 0);
  
  // Capçalera
  var headers = ['Nom informe', 'Full de dades', 'URL del full', 'Pestanya Merge', 'Header row'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format de capçalera
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground(HEADER_COLOR);
  headerRange.setFontWeight('bold');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setHorizontalAlignment('center');
  
  // Ajustar l'amplada de les columnes
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 400);
  sheet.setColumnWidth(4, 150);
  sheet.setColumnWidth(5, 100);
  
  // Afegir files d'exemple
  addSampleDataInformes(sheet);
  
  // Congelar la fila de capçalera
  sheet.setFrozenRows(1);
  
  return sheet;
}

/**
 * Afegeix dades d'exemple a la pestanya Informes
 */
function addSampleDataInformes(sheet) {
  var sampleData = [
    ['Proves', 'Proves Seguiment Avaluació 25-26', 'https://docs.google.com/spreadsheets/d/1maCNerJbQ0erQbzoXCpeEhGqvmaPmHO8Yv8R1k5RIns/edit?usp=sharing', 'MERGE', 1]
  ];
  
  if (sampleData.length > 0) {
    sheet.getRange(2, 1, sampleData.length, 5).setValues(sampleData);
  }
}

/**
 * Crea la pestanya "Admins" amb la capçalera i format
 */
function createAdminsSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.insertSheet('Admins', 0);
  
  // Capçalera
  var headers = ['Admin', 'Email','Deployment Id'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format de capçalera
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground(HEADER_COLOR);
  headerRange.setFontWeight('bold');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setHorizontalAlignment('center');
  
  // Ajustar l'amplada de les columnes
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 250);
  
  // Afegir files d'exemple
  addSampleDataAdmins(sheet);
  
  // Congelar la fila de capçalera
  sheet.setFrozenRows(1);
  
  return sheet;
}

/**
 * Afegeix dades d'exemple a la pestanya Admins
 */
function addSampleDataAdmins(sheet) {
  var sampleData = ['Joan Lopez', 'joanlopez@inspladelestany.cat','AKDycDyKjQG6g5x7M-ck3g6C4GasJsjNyeQfBgL8k7y_Z0zcLKL9BVg9OWyiStZg0v_5ndZx'];
  sheet.getRange(2, 1, 1, sampleData.length).setValues([sampleData]);
}
