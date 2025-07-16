// Connect to the database
use libraryDB;

// 1. Insert sample data into 'books' collection
db.books.insertMany([
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genres: ["Classic", "Novel"],
    available: true
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    genres: ["Classic", "Fiction"],
    available: false
  },
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genres: ["Dystopian", "Science Fiction"],
    available: true
  }
]);

// 2. Query: Find all books that are available
print("\nAvailable books:");
printjson(db.books.find({ available: true }).toArray());

// 3. Query: Find all books written before 1950
print("\nBooks written before 1950:");
printjson(db.books.find({ year: { $lt: 1950 } }).toArray());

// 4. Query: Find books that include 'Classic' in genres
print("\nBooks with 'Classic' genre:");
printjson(db.books.find({ genres: "Classic" }).toArray());

// 5. Query: Find the first book by 'Harper Lee'
print("\nFirst book by Harper Lee:");
printjson(db.books.findOne({ author: "Harper Lee" }));

// 6. Update: Set 'To Kill a Mockingbird' as available
db.books.updateOne(
  { title: "To Kill a Mockingbird" },
  { $set: { available: true } }
);

// 7. Update: Add 'Political' genre to '1984'
db.books.updateOne(
  { title: "1984" },
  { $addToSet: { genres: "Political" } }
);

// 8. Delete: Remove 'The Great Gatsby'
db.books.deleteOne({ title: "The Great Gatsby" });

// 9. Aggregation: Count books per genre
print("\nBook count per genre:");
printjson(
  db.books.aggregate([
    { $unwind: "$genres" },
    { $group: { _id: "$genres", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]).toArray()
);
