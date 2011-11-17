function openDatabase() {
    db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(populateDB, errorCB, populate_success);
}

// Populate the database 
function populateDB(tx) {
	alert("populating");
	var sql = 
		"CREATE TABLE IF NOT EXISTS employee ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"firstName VARCHAR(50), " +
		"lastName VARCHAR(50), " +
		"title VARCHAR(50), " +
		"department VARCHAR(50), " + 
		"managerId INTEGER, " +
		"city VARCHAR(50), " +
		"officePhone VARCHAR(30), " + 
		"cellPhone VARCHAR(30), " +
		"email VARCHAR(30), " +
		"picture VARCHAR(200))";
	 tx.executeSql('DROP TABLE IF EXISTS employee');
     tx.executeSql(sql);
     tx.executeSql('INSERT INTO employee (firstName, lastName) VALUES ("Michael", "Scott")');
     tx.executeSql('INSERT INTO employee (firstName, lastName) VALUES ("John", "Smith")');
}

function getEmployees(tx) {
	 alert("retrieving");
	 tx.executeSql('SELECT * FROM employee', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
	alert("query success");
    // this will be empty since no rows were inserted.
    //console.log("Insert ID = " + results.insertId);
    // this will be 0 since it is a select statement
    //alert("Rows Affected = " + results.rowAffected);
    // the number of rows returned by the select statement
    //console.log("Insert ID = " + results.rows.length);
    var len = results.rows.length;
	alert("rows:"+len);
    for (var i=0; i<len; i++){
    	alert(results.rows.item(i)['firstName']);
    	$("#employeeList").append('<li>' + (results.rows.item(i)['firstName']) + '</li>');
    }
}

function tx_success() {
	
}

// Transaction error callback
function errorCB(tx, err) {
    alert("Error processing SQL: "+err);
}

// Transaction success callback
function populate_success() {
    alert("success!");
    db.transaction(getEmployees, errorCB, tx_success);
}