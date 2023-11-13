// Get the element with the ID "buttonInstall" and assign it to the variable 'butInstall'
const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the default behavior of the beforeinstallprompt event
  event.preventDefault();
  // Store the event object for later use in the 'deferredPrompt' property of the 'window' object
  window.deferredPrompt = event;
  // Show the install button by removing the "hidden" class
  butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  // Retrieve the stored prompt event from the 'deferredPrompt' property of the 'window' object
  const promptEvent = window.deferredPrompt;
  console.log("deferredprompt", window.deferredPrompt);
  // Check if there is no prompt event stored
  if (!promptEvent) {
    return;
  }
  // Show the installation prompt to the user
  promptEvent.prompt();
  // Clear the stored prompt event after it has been used
  window.deferredPrompt = null;
  // Hide the install button by adding the "hidden" class
  butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  // Clear the stored prompt event when the app is successfully installed
  window.deferredPrompt = null;
});
