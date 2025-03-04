const fs = require('fs');
const path = require('path');

// Read the env.js template
const envFilePath = path.resolve(__dirname, 'dist/your-project-name/env.js');
let content = fs.readFileSync(envFilePath, 'utf8');

// Replace placeholders with actual environment variables
content = content.replace('${API_URL}', process.env.API_URL || 'default-api-url');
content = content.replace('${googleClientId}', process.env.googleClientId || 'default-value');
// Add other replacements as needed

// Write the modified content back
fs.writeFileSync(envFilePath, content);
