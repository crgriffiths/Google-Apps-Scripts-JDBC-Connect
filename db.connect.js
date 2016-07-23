function sqlConnect() { 
  //Get spreadsheet and spreadsheet row length
  var ss = SpreadsheetApp.openById("1234567890abcdefghijklmnopqrstuvwxyz12345678"); //This is a placeholder - replace with spreadsheet ID
  var activeSs = SpreadsheetApp.setActiveSpreadsheet(ss);
  var statusSheet = SpreadsheetApp.setActiveSheet(ss.getSheets()[1]); //If you have multiple sheets in spreadsheet, select the one you want to export
  var numSsRows = statusSheet.getLastRow(); //Store last row to get define range for export
  var rowsRange = numSsRows - 1; //Number of rows for export, removing column header from count
  
  //cache values of status data range for export
  var range = statusSheet.getRange("A2:V" + numSsRows).getValues();
    
  // jdbc connect variables
  var address = '192.168.0.1'; //IP of your external database
  var user = 'MySQL_usr'; // Username for database
  var userPwd = 'password'; // Password for user
  var db = 'MySQL_db'; // Database name

  
  //Connect to remote db
  var dbUrl = 'jdbc:mysql://' + address + ':3306/' + db;
  

    var conn = Jdbc.getConnection(dbUrl, user, userPwd);
    conn.setAutoCommit(false);
  
  //Clear table data prior to importing latest
  var clearTable = conn.prepareStatement('TRUNCATE status_data;');
  clearTable.addBatch();
  clearTable.executeBatch();
  
  //Commit all rows to MySQL database  - 
  var stmt = conn.prepareStatement('INSERT INTO status_data ' + '(column_1, column_2, column_3, column_4, column_5) values (?, ?, ?, ?, ?)'); //SQL statement to write batch to db
  for (var i = 0; i < rowsRange; i++) { 
    stmt.setString(1, range[i][1]); //Column_1
    stmt.setString(2, range[i][0]); //Column_2
    stmt.setString(3, range[i][3]); //Column_3
    stmt.setString(4, range[i][4]); //Column_4
    stmt.setString(5, range[i][2]); //Column_5
    stmt.addBatch();
  }

  stmt.executeBatch();
  conn.commit();
  conn.close();
  
}

