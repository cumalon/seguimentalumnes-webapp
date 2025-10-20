/**
 * menu.gs
 * Gestió del menú de configuració de la webapp
 * Aquest menú només es mostra si l'usuari té permisos d'edició al full de càlcul
 */

/**
 * Crea el menú de configuració quan s'obre el full de càlcul
 * Només es mostra si l'usuari té permís d'edició
 */
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Comprovar si l'usuari té permís d'edició
  var protection = ss.getEditors();
  var user = Session.getActiveUser();
  
  // Si l'usuari pot editar, mostrem el menú
  try {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('⚙️ Setup Webapp')
        .addItem('📋 Crear pestanyes de configuració', 'createConfigSheets')
        .addItem('🌐 Obrir webapp', 'openWebappDialog')
        .addSeparator()
        .addItem('ℹ️ Informació', 'showAboutDialog')
        .addToUi();
  } catch (e) {
    // Si no té permisos, el menú no es mostra
    Logger.log('Usuari sense permisos d\'edició: ' + e);
  }
}

/**
 * Crea les pestanyes de configuració
 */
function createConfigSheets() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert(
    'Crear pestanyes de configuració',
    'Aquesta funció crearà automàticament les pestanyes Alumnes, Informes i Admins.\n\n' +
    'Aquestes pestanyes substituiran la configuració actual de la pestanya "webapp".\n\n' +
    'Voleu continuar?',
    ui.ButtonSet.YES_NO
  );
  
  if (response == ui.Button.YES) {
    setupConfigSheets();
  }
}

/**
 * Obre un diàleg amb l'enllaç a la webapp
 */
function openWebappDialog() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var webappUrl = getWebappUrl();
  
  var html = HtmlService.createHtmlOutput(
    '<div style="font-family: Arial, sans-serif; padding: 20px;">' +
    '<h2 style="color: #4CAF50;">Webapp d\'Informes</h2>' +
    '<p>Feu clic a l\'enllaç per obrir la webapp:</p>' +
    '<p><a href="' + webappUrl + '" target="_blank" style="color: #4CAF50; font-size: 16px;">' +
    '🔗 Obrir Webapp d\'Informes</a></p>' +
    '<p style="color: #666; font-size: 12px;">Nota: L\'enllaç s\'obrirà en una nova pestanya del navegador.</p>' +
    '</div>'
  )
  .setWidth(400)
  .setHeight(200);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Accés a la Webapp');
}

/**
 * Obté la URL de la webapp desplegada
 * @return {string} URL de la webapp
 */
function getWebappUrl() {
  // Aquesta URL s'ha de configurar amb la URL real del desplegament
  // Per defecte, retorna un missatge informatiu
  var url = ScriptApp.getService().getUrl();
  return url || 'URL no configurada';
}

/**
 * Mostra informació sobre la webapp i el sistema de configuració
 */
function showAboutDialog() {
  var html = HtmlService.createHtmlOutput(
    '<div style="font-family: Arial, sans-serif; padding: 20px;">' +
    '<h2 style="color: #4CAF50;">Webapp d\'Informes d\'Avaluació</h2>' +
    '<p><strong>Versió:</strong> 2.0</p>' +
    '<p><strong>Descripció:</strong></p>' +
    '<p>Sistema de gestió i visualització d\'informes d\'avaluació per a alumnes.</p>' +
    '<h3>Configuració:</h3>' +
    '<ul>' +
    '<li><strong>Alumnes:</strong> Llista d\'alumnes amb accés als informes</li>' +
    '<li><strong>Informes:</strong> Configuració dels fulls d\'informes</li>' +
    '<li><strong>Admins:</strong> Usuaris amb permisos d\'administració</li>' +
    '</ul>' +
    '<p style="color: #666; font-size: 12px;">Desenvolupat per a la gestió d\'informes escolars</p>' +
    '</div>'
  )
  .setWidth(500)
  .setHeight(350);
  
  SpreadsheetApp.getUi().showModalDialog(html, 'Informació de la Webapp');
}
