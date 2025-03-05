const fs = require('fs');
const path = require('path');

function ensureIndexHtml() {
  const srcIndexPath = path.resolve(__dirname, 'src', 'index.html');
  const distIndexPath = path.resolve(__dirname, 'dist', 'harmonizer', 'index.html');

  try {
    // Ensure dist directory exists
    const distDir = path.dirname(distIndexPath);
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Copy index.html if it exists in src
    if (fs.existsSync(srcIndexPath)) {
      fs.copyFileSync(srcIndexPath, distIndexPath);
      console.log('index.html copied successfully');
      return true;
    } else {
      console.error('Source index.html not found');
      return false;
    }
  } catch (error) {
    console.error('Error copying index.html:', error);
    return false;
  }
}

// Run the script
const success = ensureIndexHtml();
process.exit(success ? 0 : 1);
