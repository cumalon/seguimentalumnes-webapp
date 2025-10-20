# Setup Menu Implementation - Technical Summary

## Overview
This document provides a technical overview of the setup menu and configuration sheets implementation for the webapp d'informes d'avaluació.

## Architecture

### File Structure
The implementation consists of three new Google Apps Script files:

1. **menu.js** - Menu management and user interface
2. **setup.js** - Sheet creation and formatting logic
3. **config.js** - Configuration data reading

### Key Components

#### 1. Menu System (menu.js)

**onOpen() Trigger**
- Automatically creates the "⚙️ Setup Webapp" menu when the spreadsheet is opened
- Only visible to users with edit permissions
- Contains three menu items:
  - 📋 Crear pestanyes de configuració
  - 🌐 Obrir webapp
  - ℹ️ Informació

**Menu Functions**
- `createConfigSheets()`: Prompts user and calls setupConfigSheets()
- `openWebappDialog()`: Displays dialog with webapp URL
- `showAboutDialog()`: Shows version and system information
- `getWebappUrl()`: Retrieves the deployed webapp URL

#### 2. Sheet Setup System (setup.js)

**Reserved Sheet Names**
- Alumnes
- Informes
- Admins

**Sheet Creation Functions**
- `setupConfigSheets()`: Main orchestrator function
  - Checks for existing reserved sheet names
  - Creates all three sheets
  - Shows success/error dialogs

- `createAlumnesSheet()`: Creates student configuration sheet
  - Headers: "Cognoms, Nom", EMAIL
  - Sample data included
  
- `createInformesSheet()`: Creates reports configuration sheet
  - Headers: Nom informe, Full de dades, URL del full, Pestanya Merge, Header row
  - Sample data included
  
- `createAdminsSheet()`: Creates admin configuration sheet
  - Headers: Admin, Email
  - Sample data included

**Formatting Features**
- Header background: #4CAF50 (green)
- Header text: bold, white, centered
- Alternating row colors: #FFFFFF and #F5F5F5
- Frozen header row
- Optimized column widths
- Sheets positioned at leftmost position (index 0)

#### 3. Configuration Reading (config.js)

**Configuration Functions**
All functions read directly from the dedicated configuration sheets:

- `amIAdmin_()`: Checks if user is admin
  - Reads from 'Admins' sheet, column 2 (Email)
  
- `processUrlsByEmail(userEmail)`: Gets reports for a user
  - Reads from 'Informes' sheet
  
- `getNamesList()`: Gets list of students
  - Reads from 'Alumnes' sheet, columns 1-2

## Setup Process

### Phase 1: Initial Deployment
- Deploy new files to Google Apps Script project
- Menu appears for users with edit permissions

### Phase 2: Configuration Sheet Creation
- User clicks "📋 Crear pestanyes de configuració"
- System checks for existing reserved sheet names
- If clear, creates three new sheets with sample data
- User replaces sample data with actual configuration

### Phase 3: System Operation
- System reads configuration from the three dedicated sheets
- Old 'webapp' sheet is no longer used by the system
- Can be hidden or deleted by user

## Error Handling

### Reserved Sheet Name Conflicts
- System checks if any reserved names already exist
- If found, shows alert with list of conflicting names
- User must rename or delete conflicting sheets before proceeding

### Permission Issues
- Menu only visible with edit permissions
- Graceful failure if permissions insufficient

## Data Validation

### Sheet Structure
Each sheet has a specific structure that must be maintained:

**Alumnes Sheet**
- Column 1: "Cognoms, Nom" (student full name)
- Column 2: EMAIL (student email address)

**Informes Sheet**
- Column 1: Nom informe (report name)
- Column 2: Full de dades (spreadsheet name)
- Column 3: URL del full (spreadsheet URL)
- Column 4: Pestanya Merge (sheet name within spreadsheet)
- Column 5: Header row (row number of header)

**Admins Sheet**
- Column 1: Admin (admin name)
- Column 2: Email (admin email address)

## Testing Considerations

### Manual Testing Checklist
- [ ] Menu appears when spreadsheet opens
- [ ] Menu only visible to users with edit permissions
- [ ] Creating config sheets prompts for confirmation
- [ ] Config sheets are created at leftmost position
- [ ] Headers are formatted correctly (green background, white text, bold)
- [ ] Sample data is present and formatted with alternating colors
- [ ] Reserved name conflicts are detected and reported
- [ ] Webapp URL dialog displays correctly
- [ ] About dialog shows version information
- [ ] System reads from new configuration sheets correctly

### Functional Testing
- [ ] Admin view works correctly
- [ ] Student view works correctly
- [ ] Report loading works correctly

## Future Enhancements

Potential improvements for future versions:
- Data validation rules on configuration sheets
- Batch import from CSV files
- Configuration export/backup functionality
- Multi-language support for menu items
- Custom sheet templates beyond sample data

## Version History

**Version 2.0** (Current)
- Initial setup menu implementation
- Three-sheet configuration system
- Automatic formatting and sample data
