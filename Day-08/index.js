

// MongoDB Data API credentials
const API_KEY = '<your-api-key>';
const APP_ID = '<your-app-id>'; // e.g., "myapp-abcde"
const ENDPOINT = `https://data.mongodb-api.com/app/${APP_ID}/endpoint/data/v1/action/insertOne`;

// Request payload
const payload = {
  dataSource: 'Cluster0',
  database: 'myDB',
  collection: 'myCollection',
  document: {
    name: 'Alice',
    age: 30
  }
};

// Send request using fetch
fetch(ENDPOINT, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'api-key': API_KEY
  },
  body: JSON.stringify(payload)
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch(error => {
  console.error('Error:', error);
});
