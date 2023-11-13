// Import the openDB function from the "idb" library.
import { openDB } from "idb";

// Function to initialize the database.
const initdb = async () =>
  openDB("jate", 1, {
    // Specify the upgrade callback for database versioning.
    upgrade(db) {
      // Check if the object store "jate" already exists in the database.
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      // Create an object store named "jate" with a keyPath of "id" and autoIncrement set to true.
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    // Open the "jate" database with version 1.
    const jateDB = await openDB("jate", 1);
    // Start a read-write transaction on the "jate" object store.
    const tx = jateDB.transaction("jate", "readwrite");
    // Get the "jate" object store.
    const store = tx.objectStore("jate");
    // Put the content into the object store with a predefined id of 1.
    const request = store.put({ content: content, id: 1 });
    // Wait for the put operation to complete and log the result.
    const result = await request;
    console.log("Data saved to database", result);
  } catch (err) {
    console.error("putDb not implemented");
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    // Open the "jate" database with version 1.
    const jateDB = await openDB("jate", 1);
    // Start a read-only transaction on the "jate" object store.
    const tx = jateDB.transaction("jate", "readonly");
    // Get the "jate" object store.
    const store = tx.objectStore("jate");
    // Retrieve all records from the object store.
    const request = store.getAll();
    // Wait for the getAll operation to complete and log the result.
    const result = await request;
    console.log("result.value", result);
    // Return the result value (array of records).
    return result.value;
  } catch (err) {
    console.error("getDb not implemented");
  }
};

// Call the initdb function to initialize the database when the module is imported.
initdb();
