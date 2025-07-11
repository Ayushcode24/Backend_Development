/**
 * MongoDB Query, Logical, and Evaluation Operators
 * Definitions, Syntax, and Examples
 */

// ==========================
// Comparison Operators
// ==========================
/**
 * $eq: Matches values that are equal to a specified value.
 * Syntax: { field: { $eq: value } }
 */
db.users.find({ age: { $eq: 25 } });

/**
 * $ne: Not equal
 */
db.users.find({ age: { $ne: 25 } });

/**
 * $gt: Greater than
 */
db.users.find({ age: { $gt: 25 } });

/**
 * $gte: Greater than or equal
 */
db.users.find({ age: { $gte: 25 } });

/**
 * $lt: Less than
 */
db.users.find({ age: { $lt: 25 } });

/**
 * $lte: Less than or equal
 */
db.users.find({ age: { $lte: 25 } });

/**
 * $in: Matches any value in the array
 */
db.users.find({ age: { $in: [25, 30] } });

/**
 * $nin: Not in array
 */
db.users.find({ age: { $nin: [25, 30] } });


// ==========================
// 🔍 Logical Operators
// ==========================
/**
 * $and: Matches all conditions
 * Syntax: { $and: [ { cond1 }, { cond2 } ] }
 */
db.users.find({
  $and: [
    { age: { $gte: 18 } },
    { age: { $lte: 30 } }
  ]
});

/**
 * $or: Matches at least one condition
 */
db.users.find({
  $or: [
    { name: "Alice" },
    { name: "Bob" }
  ]
});

/**
 * $nor: Matches none of the conditions
 */
db.users.find({
  $nor: [
    { age: { $lt: 18 } },
    { name: "Eve" }
  ]
});

/**
 * $not: Inverts the condition
 */
db.users.find({
  age: { $not: { $gt: 30 } }
});

// ==========================
// 📊 Evaluation Operators
// ==========================
/**
 * $regex: Regular expression matching
 * Syntax: { field: { $regex: /pattern/, $options: "i" } }
 */
db.users.find({
  name: { $regex: "^A", $options: "i" }
});

/**
 * $expr: Use aggregation expressions in queries
 */
db.orders.find({
  $expr: { $gt: ["$total", "$paid"] }
});

/**
 * $mod: Matches numeric fields divisible by a value
 * Syntax: { field: { $mod: [divisor, remainder] } }
 */
db.users.find({
  age: { $mod: [2, 0] } // even ages
});

/**
 * $text: Full-text search (requires a text index)
 */
db.articles.createIndex({ content: "text" });
db.articles.find({
  $text: { $search: "mongodb indexing" }
});

/**
 * $where: Use JavaScript in queries (less recommended)
 */
db.collection.find({
  $where: "this.age < this.score"
});


// ==========================
// 🧪 Combined Query Example
// ==========================
db.users.find({
  $and: [
    { age: { $gte: 20 } },
    {
      $or: [
        { city: "New York" },
        { city: "Los Angeles" }
      ]
    }
  ]
});
