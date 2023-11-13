// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
// Import the 'header' variable from './header'
import { header } from './header';

// Create a class for managing the CodeMirror editor
export default class {
  constructor() {
    // Retrieve the content stored in localStorage
    const localData = localStorage.getItem('content');

    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    // Initialize CodeMirror on the element with id 'main'
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '', // Initial value of the editor
      mode: 'javascript', // Set the programming language mode to JavaScript
      theme: 'monokai', // Set the color theme to Monokai
      lineNumbers: true, // Show line numbers in the editor
      lineWrapping: true, // Enable line wrapping in the editor
      autofocus: true, // Automatically focus on the editor
      indentUnit: 2, // Set the number of spaces per indentation level
      tabSize: 2, // Set the number of spaces per tab
    });

    // When the editor is ready, set its value to the data retrieved from indexedDB.
    // If there is no data in indexedDB, use the content from localStorage.
    // If neither is available, set the value to the 'header' variable.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    // Add an event listener for the 'change' event in the editor
    this.editor.on('change', () => {
      // Save the editor content to localStorage whenever it changes
      localStorage.setItem('content', this.editor.getValue());
    });

    // Add an event listener for the 'blur' event in the editor (when it loses focus)
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      // Save the content of the editor to indexedDB using the putDb method
      putDb(localStorage.getItem('content'));
    });
  }
}
