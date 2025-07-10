// userOperations.js

// ✅ 1. Setup Mongoose and User Schema
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

async function runOperations() {
  try {
    // ✅ 2. CREATE (Insert)

    // Insert One Document
    // Definition: Adds a single new document to the collection.
    await User.create({ name: 'John', age: 25 });

    // Insert Many Documents
    // Definition: Adds multiple documents at once.
    await User.insertMany([
      { name: 'Alice', age: 22 },
      { name: 'Bob', age: 17 },
    ]);

    // ✅ 3. READ (Find)

    // Find All Documents
    // Definition: Retrieves all documents from the collection.
    const allUsers = await User.find();
    console.log('All Users:', allUsers);

    // Find One Document
    // Definition: Retrieves the first document matching the criteria.
    const oneUser = await User.findOne({ name: 'Alice' });
    console.log('One User:', oneUser);

    // Find by ID
    // Definition: Retrieves a document by its unique MongoDB ID.
    const userId = oneUser._id; // Example ID
    const userById = await User.findById(userId);
    console.log('User by ID:', userById);

    // ✅ 4. UPDATE

    // Update One Document
    // Definition: Updates the first document that matches the filter.
    await User.updateOne({ name: 'John' }, { age: 30 });

    // Find One and Update
    // Definition: Finds one document and updates it; returns the old or updated document.
    const updatedUser = await User.findOneAndUpdate(
      { name: 'John' },
      { age: 35 },
      { new: true } // returns the updated document
    );
    console.log('Updated User:', updatedUser);

    // ✅ 5. DELETE

    // Delete One Document
    // Definition: Removes the first document that matches the filter.
    await User.deleteOne({ name: 'Alice' });

    // Delete Many Documents
    // Definition: Deletes all documents matching the criteria.
    await User.deleteMany({ age: { $lt: 18 } });

    console.log('Operations complete.');
  } catch (err) {
    console.error('Error during operations:', err);
  } finally {
    mongoose.connection.close(); // Close connection after operations
  }
}

runOperations();
