const fs = require('fs');
const path = require('path');

try {
  // Correct path to match angular.json output
  const distPath = path.resolve(__dirname, 'dist', 'harmonizer');

  // Verify source and destination paths
  const srcEnvPath = path.resolve(__dirname, 'src', 'env.js');
  const destEnvPath = path.resolve(distPath, 'env.js');

  // Log paths for debugging
  console.log('Source env.js path:', srcEnvPath);
  console.log('Destination env.js path:', destEnvPath);

  // Ensure the dist directory exists
  if (!fs.existsSync(distPath)) {
    console.error('Distribution directory does not exist:', distPath);
    process.exit(1);
  }

  // Check if source env.js exists
  if (!fs.existsSync(srcEnvPath)) {
    console.error('Source env.js file does not exist:', srcEnvPath);
    process.exit(1);
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
