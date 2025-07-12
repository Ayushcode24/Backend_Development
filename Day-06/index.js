// MongoDB Aggregation Pipeline Example
// Written for humans 👨‍💻👩‍💻
// This script connects to MongoDB, runs an aggregation pipeline, and prints the results.



const { MongoClient } = require('mongodb');

// Connection URL (change if your MongoDB is hosted remotely)
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('shop');
    const orders = db.collection('orders');

    /**
     * Let's say your 'orders' collection looks like this:
     * {
     *   orderId: 1001,
     *   customerId: "C123",
     *   totalAmount: 250,
     *   status: "shipped",
     *   items: [
     *     { product: "Laptop", qty: 1 },
     *     { product: "Mouse", qty: 2 }
     *   ],
     *   date: new Date("2025-07-01")
     * }
     */

    // Now, let's build an aggregation pipeline step by step.

    const pipeline = [

      // 1️⃣ Match only the shipped orders
      {
        $match: { status: "shipped" }
      },

      // 2️⃣ Unwind the items array so each item is treated as a separate document
      {
        $unwind: "$items"
      },

      // 3️⃣ Group by customerId to get order stats per customer
      {
        $group: {
          _id: "$customerId",                     // group by customer ID
          totalOrders: { $sum: 1 },               // count of items (after unwind)
          totalQuantity: { $sum: "$items.qty" },  // total quantity ordered
          totalSpent: { $sum: "$totalAmount" }    // total money spent (duplicate if many items per order)
        }
      },

      // 4️⃣ Sort customers by the quantity they ordered (descending)
      {
        $sort: { totalQuantity: -1 }
      },

      // 5️⃣ Project the final fields we want to return
      {
        $project: {
          _id: 0,                          // hide MongoDB's default _id
          customerId: "$_id",              // rename _id to customerId
          totalOrders: 1,
          totalQuantity: 1,
          totalSpent: 1
        }
      }
    ];

    // Run the pipeline and fetch results
    const result = await orders.aggregate(pipeline).toArray();

    // Display the results
    console.log("📦 Aggregated Customer Order Summary:");
    console.table(result);

  } catch (error) {
    console.error("❌ Something went wrong:", error);
  } finally {
    await client.close();
  }
}

// Start the script
run();
