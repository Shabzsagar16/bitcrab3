#!/usr/bin/env node
/**
 * Build script for static HTML deployment with environment variables
 * This script reads .env.local and replaces placeholders in the HTML
 */

const fs = require('fs');
const path = require('path');

// Read environment variables
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('Error: .env.local file not found!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

// Parse .env file
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

// Read the template HTML file
const templatePath = path.join(__dirname, 'cashcrab-full-deployment', 'index.html');
let htmlContent = fs.readFileSync(templatePath, 'utf8');

// Replace the hardcoded project ID with a placeholder first
htmlContent = htmlContent.replace(
  /const WALLETCONNECT_PROJECT_ID = '[^']*';/,
  'const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || \'PLACEHOLDER_PROJECT_ID\';'
);

// Now replace the placeholder with the actual environment variable
const projectId = envVars.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
if (!projectId) {
  console.error('Error: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not found in .env.local');
  process.exit(1);
}

htmlContent = htmlContent.replace(
  'PLACEHOLDER_PROJECT_ID',
  projectId
);

// Write the processed file
fs.writeFileSync(templatePath, htmlContent);

console.log('✅ Successfully injected environment variables into static HTML');
console.log(`   WalletConnect Project ID: ${projectId.substring(0, 8)}...`);
