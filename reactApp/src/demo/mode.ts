// Standalone mode = served via wcindex.html.
// Framework-host mode = wcMain.js is imported by Vue/Angular apps.

export const isStandalone = window.location.pathname.toLowerCase().includes('wcindex.html');
