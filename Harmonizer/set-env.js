const fs = require('fs');
const path = require('path');

try {
  // Ensure the dist/Harmonizer directory exists
  const distPath = path.resolve(__dirname, 'dist', 'Harmonizer');

  // Path to source env.js
  const srcEnvPath = path.resolve(__dirname, 'src', 'env.js');

  // Path to destination env.js
  const destEnvPath = path.resolve(distPath, 'env.js');

  // Create dist directory if it doesn't exist
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  // Copy env.js
  fs.copyFileSync(srcEnvPath, destEnvPath);
  console.log('env.js copied successfully');

  // Read the env.js file
  let content = fs.readFileSync(destEnvPath, 'utf8');

  // Replace placeholders with actual environment variables
  content = content.replace('${API_URL}', process.env.API_URL || 'https://localhost:7119');
  content = content.replace('${googleClientId}', process.env.googleClientId || '');
  // Add other replacements as needed

  // Write the modified content back
  fs.writeFileSync(destEnvPath, content);
  console.log('Environment variables replaced successfully');

} catch (error) {
  console.error('Error during post-build process:', error);
  process.exit(1);
}
