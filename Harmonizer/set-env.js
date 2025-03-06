console.log("Running set-env.js... Creating env.js");
require('dotenv').config();
const fs = require('fs');
const path = require('path');

try {
  const distPath = path.resolve(__dirname, 'dist', 'harmonizer', 'browser');
  const destEnvPath = path.resolve(distPath, 'env.js');

  console.log("Google Client Id :",process.env.GOOGLE_CLIENT_ID )

  const envContent = `
(function(window) {
  window["env"] = window["env"] || {};
  window["env"]["apiUrl"] = "${process.env.API_URL || 'http://localhost:7119'}";
  window["env"]["googleClientId"] = "${process.env.GOOGLE_CLIENT_ID || ''}";
  console.log("Environment loaded:", window["env"]);
})(this);
`;

  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  fs.writeFileSync(destEnvPath, envContent);
  console.log('env.js generated successfully');
} catch (error) {
  console.error('Error generating env.js:', error);
  process.exit(1);
}


// console.log('GOOGLE_CLIENT_ID direct:', process.env.GOOGLE_CLIENT_ID);
// console.log('GOOGLE_CLIENT_ID type:', typeof process.env.GOOGLE_CLIENT_ID);
// console.log('GOOGLE_CLIENT_ID length:', process.env.GOOGLE_CLIENT_ID ? process.env.GOOGLE_CLIENT_ID.length : 0);

