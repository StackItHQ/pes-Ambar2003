[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/AHFn7Vbn)
# Superjoin Hiring Assignment

### Welcome to Superjoin's hiring assignment! 🚀

### Objective
Build a solution that enables real-time synchronization of data between a Google Sheet and a specified database (e.g., MySQL, PostgreSQL). The solution should detect changes in the Google Sheet and update the database accordingly, and vice versa.

### Problem Statement
Many businesses use Google Sheets for collaborative data management and databases for more robust and scalable data storage. However, keeping the data synchronised between Google Sheets and databases is often a manual and error-prone process. Your task is to develop a solution that automates this synchronisation, ensuring that changes in one are reflected in the other in real-time.

### Requirements:
1. Real-time Synchronisation
  - Implement a system that detects changes in Google Sheets and updates the database accordingly.
   - Similarly, detect changes in the database and update the Google Sheet.
  2.	CRUD Operations
   - Ensure the system supports Create, Read, Update, and Delete operations for both Google Sheets and the database.
   - Maintain data consistency across both platforms.
   
### Optional Challenges (This is not mandatory):
1. Conflict Handling
- Develop a strategy to handle conflicts that may arise when changes are made simultaneously in both Google Sheets and the database.
- Provide options for conflict resolution (e.g., last write wins, user-defined rules).
    
2. Scalability: 	
- Ensure the solution can handle large datasets and high-frequency updates without performance degradation.
- Optimize for scalability and efficiency.

## Submission ⏰
The timeline for this submission is: **Next 2 days**

Some things you might want to take care of:
- Make use of git and commit your steps!
- Use good coding practices.
- Write beautiful and readable code. Well-written code is nothing less than a work of art.
- Use semantic variable naming.
- Your code should be organized well in files and folders which is easy to figure out.
- If there is something happening in your code that is not very intuitive, add some comments.
- Add to this README at the bottom explaining your approach (brownie points 😋)
- Use ChatGPT4o/o1/Github Co-pilot, anything that accelerates how you work 💪🏽. 

Make sure you finish the assignment a little earlier than this so you have time to make any final changes.

Once you're done, make sure you **record a video** showing your project working. The video should **NOT** be longer than 120 seconds. While you record the video, tell us about your biggest blocker, and how you overcame it! Don't be shy, talk us through, we'd love that.

We have a checklist at the bottom of this README file, which you should update as your progress with your assignment. It will help us evaluate your project.

- [ ] My code's working just fine! 🥳
- [✔] I have recorded a video showing it working and embedded it in the README ▶️
- [ ] I have tested all the normal working cases 😎
- [ ] I have even solved some edge cases (brownie points) 💪
- [✔] I added my very planned-out approach to the problem at the end of this README 📜

## Got Questions❓
Feel free to check the discussions tab, you might get some help there. Check out that tab before reaching out to us. Also, did you know, the internet is a great place to explore? 😛

We're available at techhiring@superjoin.ai for all queries. 

All the best ✨.

## Developer's Section
*Add your video here, and your approach to the problem (optional). Leave some comments for us here if you want, we will be reading this :)*

Video: https://youtu.be/cQVKeXvQelI

Note: Couldn't find time to put Approach 3 in the video😅!

Planned-out-approach 
I tried three approaches to solve this problem but none of them worked properly:

1.Using Express.js:
i. I enabled Google Sheets API and linked the sheets with the express.js file After creating a credentials.json by making a service account.
ii. Then I used Insomnia to give an API call after passing the range and value in the Body in json format.
iii. After giving the API call it worked. The Google Sheets got updated! 
iv.But beyond that I was not able to do anything! I tried using Google script to synchronize but it requires a web hook to do that!



2.Using php: 
It consists of two main parts:

PHP Script:

Receives JSON data containing product information from the Google Sheet.
Parses the JSON data into a PHP array.
Inserts each product record into the zstockprod table in the MySQL database.
JavaScript Function:

Reads product data from a specified Google Sheet.
Converts the data into a JSON format.
Sends the JSON data to the PHP script using a POST request.

I also used ngrok so that google App Script can access my localhost server. ngrock makes your localhost server publicly available!

In simple words:
1. Create Google Spreadsheet
2. Create Google App Script
3. Create Table @ MySQL Database
4. Create PHP Program
5. Start ngrok (ngrok http 80)
6. Test

It failed at the fourth step! MySQL wouldn't authorize the credentials and this approrach also failed!

3.Using Node.js and the Express web application framework

I was able to sync Google Sheets to a database via REST API’s. I performed this on a ready made Customer Ordering System Front-End.
These were the following steps I followed:

1.I installed the necessary packages and started the project.


2. I then created a Client ID by turning on Google Sheets API and adding an OAuth client ID to the project.


3.Then I added Google Sign In Button. For signing the user in I wrote this function:
function onSignIn(user) {
  var profile = user.getBasicProfile();
  $('#profile .name').text(profile.getName());
  $('#profile .email').text(profile.getEmail());
}


4.I then added spreadsheet controls in Spreadsheet.js code with the following code:
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Spreadsheet = sequelize.define('Spreadsheet', {
    id: {type: DataTypes.STRING, allowNull: false, primaryKey: true},
    sheetId: {type: DataTypes.INTEGER, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false}
  });

  return Spreadsheet;
};


5.Then I created spreadsheets using sheets.js and routes.js.

6. I then Added a header row. For that I wrote the following code in sheets.js:
   
   var dataSheetId = spreadsheet.sheets[0].properties.sheetId;
var requests = [
  buildHeaderRowRequest(dataSheetId),
];
// TODO: Add pivot table and chart.
var request = {
  spreadsheetId: spreadsheet.spreadsheetId,
  resource: {
    requests: requests
  }
};
self.service.spreadsheets.batchUpdate(request, function(err, response) {
  if (err) {
    return callback(err);
  }
  return callback(null, spreadsheet);

var COLUMNS = [
  { field: 'id', header: 'ID' },
  { field: 'customerName', header: 'Customer Name'},
  { field: 'productCode', header: 'Product Code' },
  { field: 'unitsOrdered', header: 'Units Ordered' },
  { field: 'unitPrice', header: 'Unit Price' },
  { field: 'status', header: 'Status'}
];

function buildHeaderRowRequest(sheetId) {
  var cells = COLUMNS.map(function(column) {
    return {
      userEnteredValue: {
        stringValue: column.header
      },
      userEnteredFormat: {
        textFormat: {
          bold: true
        }
      }
    }
  });
  return {
    updateCells: {
      start: {
        sheetId: sheetId,
        rowIndex: 0,
        columnIndex: 0
      },
      rows: [
        {
          values: cells
        }
      ],
      fields: 'userEnteredValue,userEnteredFormat.textFormat.bold'
    }
  };
}

7.For synchronizing data to the spreadsheet I added a new route to routes.js that will begin a sync.

8.Also we can add pivot table and chart in this excel sheet🥳! But the step to achieve this is a little lengthy to write so I will skip it😅!

9. And Finally I have done around 50% of the problem statement!
