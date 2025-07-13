

// ------------------------------------
// 1️⃣ Create a collection with schema validation
// ------------------------------------

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",              // Document must be an object
      required: ["name", "email", "age"], // These fields are required
      properties: {
        name: {
          bsonType: "string",
          description: "Name must be a string"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+$",           // Basic email regex
          description: "Must be a valid email address"
        },
        age: {
          bsonType: "int",
          minimum: 18,
          maximum: 100,
          description: "Age must be between 18 and 100"
        },
        address: {
          bsonType: "object",
          required: ["city", "zip"],
          properties: {
            city: { bsonType: "string" },
            zip: {
              bsonType: "string",
              pattern: "^[0-9]{5}$"     // US ZIP code format
            }
          }
        }
      }
    }
  },
  validationLevel: "strict",            // Validate all documents strictly
  validationAction: "error"             // Reject documents that don't match the schema
});

// ------------------------------------
// 2️⃣ Indexing Examples
// ------------------------------------

// Basic index on email field (ascending order)
db.users.createIndex({ email: 1 });

// Compound index on customer ID and order date
db.orders.createIndex({ customerId: 1, orderDate: -1 });

// Text index for full-text search on title and content
db.articles.createIndex({ title: "text", content: "text" });

// TTL (Time To Live) index: delete session after 1 hour
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
);

// Hashed index for efficient sharding
db.customers.createIndex({ customerId: "hashed" });

// Wildcard index: useful for dynamic or flexible schemas
db.logs.createIndex({ "$**": 1 });

// ------------------------------------
// 3️⃣ Search Queries
// ------------------------------------

// Simple query to find users aged 21 or older
db.users.find({ age: { $gte: 21 } });

// Full-text search for articles containing the words "mongodb indexing"
db.articles.find({ $text: { $search: "mongodb indexing" } });

// Sort full-text search results by relevance
db.articles.find(
  { $text: { $search: "mongodb performance" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });

// ------------------------------------
// 4️⃣ Update Schema for Existing Collection
// ------------------------------------

db.runCommand({
  collMod: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: { bsonType: "string" },
        email: { bsonType: "string" }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});

// ------------------------------------
// 5️⃣ Explain a Query to Analyze Performance
// ------------------------------------

db.users.find({ email: "test@example.com" }).explain("executionStats");

// ------------------------------------
// 6️⃣ Try Inserting Invalid Data (Should Fail)
// ------------------------------------

db.users.insertOne({
  name: "John",
  email: "not-an-email",  // This doesn't match the email pattern
  age: 30
});
// This will fail because the email format is invalid
