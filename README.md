# Google Apps Scripts JDBC Connect
This script is used to write the contents of a range of cells in a Google Sheets Spreadsheet to a MySQL database as a new row for each sheet row. 

## Usage

Before beginning, ensure the remote database structure has already been created and that the user connecting has the appropriate privileges to access and write to the database as well as MySQL allowing remote access. There is a range of IPs that Google uses in Apps scripts. Those IPs can be found <a href="https://developers.google.com/apps-script/guides/jdbc#setup_for_google_cloud_sql" target="_blank">here</a> if you want to whitelist only that range. 

To use, upate the values for spreadsheet ID, the range to match the range you will be exporting, and update the database credentials. In the loop batching the spreadsheet values, make sure to include a new line for each column you will be exporting and update the SQL string with the field names mapped to the spreadsheet columns. 
