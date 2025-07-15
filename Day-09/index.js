/**
 * ----------------------------------------
 * MongoDB Node.js Interaction + Charts
 * ----------------------------------------
 * This script:
 * 1. Connects to a MongoDB database
 * 2. Performs CRUD operations
 * 3. Describes MongoDB Charts
 * 4. Demonstrates how to embed charts
 */

// Import MongoClient from the MongoDB driver
const { MongoClient } = require('mongodb');

// MongoDB connection URI — for local or Atlas
const uri = 'mongodb://localhost:27017'; // Replace with your Atlas URI if needed

// Create MongoDB client
const client = new MongoClient(uri);

async function run() {
  try {
    /**
     * ------------------------------
     * MongoDB: Database Connection
     * ------------------------------
     * Connect to MongoDB using the official driver.
     * The `client.connect()` establishes the connection.
     */
    await client.connect();

    // Access a database and collection
    const db = client.db('myDB');
    const collection = db.collection('users');

    /**
     * ------------------------------
     * MongoDB: Create
     * ------------------------------
     * insertOne() adds a new document to the collection.
     */
    const insertResult = await collection.insertOne({ name: 'Alice', age: 30 });
    console.log('Inserted ID:', insertResult.insertedId);

    /**
     * ------------------------------
     * MongoDB: Read
     * ------------------------------
     * find() returns a cursor, which can be converted to an array.
     */
    const users = await collection.find({ age: { $gte: 18 } }).toArray();
    console.log('Users:', users);

    /**
     * ------------------------------
     * MongoDB: Update
     * ------------------------------
     * updateOne() modifies the first document that matches the filter.
     */
    const updateResult = await collection.updateOne(
      { name: 'Alice' },
      { $set: { age: 31 } }
    );
    console.log('Modified Count:', updateResult.modifiedCount);

    /**
     * ------------------------------
     * MongoDB: Delete
     * ------------------------------
     * deleteOne() removes the first document that matches the filter.
     */
    const deleteResult = await collection.deleteOne({ name: 'Alice' });
    console.log('Deleted Count:', deleteResult.deletedCount);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Always close the connection when done
    await client.close();
  }
}

/**
 * ------------------------------
 * MongoDB Charts: Definition
 * ------------------------------
 * MongoDB Charts is a visualization tool that lets you create charts 
 * directly from your MongoDB collections.
 *
 * - No ETL required
 * - Real-time charts
 * - Can be embedded in web apps
 *
 * Available in MongoDB Atlas or as a self-hosted Docker app.
 */
run();

/**
 * ------------------------------
 * MongoDB Charts Embedding Example (HTML)
 * ------------------------------
 * Below is an example of embedding a MongoDB Chart using the Charts Embed SDK.
 * This section is for reference and should go in an HTML file.
 */

/**
 * HTML Code (for frontend):
 * 
 * <!DOCTYPE html>
 * <html>
 * <head>
 *   <title>MongoDB Chart Embed</title>
 *   <script src="https://charts.mongodb.com/charts-embed.js"></script>
 * </head>
 * <body>
 *   <div id="chart"></div>
 *   <script>
 *     const chart = new ChartsEmbedSDK.Chart({
 *       chartId: 'your-chart-id', // Replace with your Chart ID
 *       height: '400px',
 *       width: '100%',
 *       theme: 'light',
 *       autoRefresh: true
 *     });
 *
 *     chart.render(document.getElementById('chart'));
 *   </script>
 * </body>
 * </html>
 */

