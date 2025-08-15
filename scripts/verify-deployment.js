#!/usr/bin/env node

/**
 * Deployment Verification Script
 * Checks if the project is ready for Vercel deployment
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = [
  'package.json',
  'next.config.js',
  'vercel.json',
  '.env.example',
  'app/layout.tsx',
  'app/page.tsx',
  'components/DAMLogo.tsx',
];

const REQUIRED_DIRS = [
  'app',
  'components',
  'lib',
  'contexts',
  'data',
  'hooks',
];

function checkFiles() {
  console.log('🔍 Checking required files...');
  let allFilesExist = true;

  REQUIRED_FILES.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - MISSING`);
      allFilesExist = false;
    }
  });

  return allFilesExist;
}

function checkDirectories() {
  console.log('\n🔍 Checking required directories...');
  let allDirsExist = true;

  REQUIRED_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`✅ ${dir}/`);
    } else {
      console.log(`❌ ${dir}/ - MISSING`);
      allDirsExist = false;
    }
  });

  return allDirsExist;
}

function checkPackageJson() {
  console.log('\n🔍 Checking package.json configuration...');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check required scripts
    const requiredScripts = ['dev', 'build', 'start'];
    const hasAllScripts = requiredScripts.every(script => packageJson.scripts[script]);
    
    if (hasAllScripts) {
      console.log('✅ Required scripts present');
    } else {
      console.log('❌ Missing required scripts');
      return false;
    }

    // Check for Next.js
    if (packageJson.dependencies.next) {
      console.log(`✅ Next.js version: ${packageJson.dependencies.next}`);
    } else {
      console.log('❌ Next.js not found in dependencies');
      return false;
    }

    return true;
  } catch (error) {
    console.log('❌ Error reading package.json');
    return false;
  }
}

function checkEnvironmentExample() {
  console.log('\n🔍 Checking environment configuration...');
  
  if (fs.existsSync('.env.example')) {
    const envExample = fs.readFileSync('.env.example', 'utf8');
    
    const requiredVars = [
      'NEXT_PUBLIC_APP_URL',
      'NEXT_PUBLIC_EMAILJS_SERVICE_ID',
      'NEXT_PUBLIC_BUILDER_KEY'
    ];
    
    const hasAllVars = requiredVars.every(varName => envExample.includes(varName));
    
    if (hasAllVars) {
      console.log('✅ Environment variables template complete');
      return true;
    } else {
      console.log('❌ Missing required environment variables in .env.example');
      return false;
    }
  } else {
    console.log('❌ .env.example file missing');
    return false;
  }
}

function checkVercelConfig() {
  console.log('\n🔍 Checking Vercel configuration...');
  
  try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    
    if (vercelConfig.version === 2) {
      console.log('✅ Vercel configuration version 2');
    } else {
      console.log('❌ Incorrect Vercel configuration version');
      return false;
    }

    if (vercelConfig.functions) {
      console.log('✅ Functions configuration present');
    } else {
      console.log('⚠️  No functions configuration (optional)');
    }

    return true;
  } catch (error) {
    console.log('❌ Error reading vercel.json');
    return false;
  }
}

function generateReport() {
  console.log('\n📋 DEPLOYMENT READINESS REPORT');
  console.log('=====================================');
  
  const checks = [
    { name: 'Required Files', status: checkFiles() },
    { name: 'Required Directories', status: checkDirectories() },
    { name: 'Package Configuration', status: checkPackageJson() },
    { name: 'Environment Setup', status: checkEnvironmentExample() },
    { name: 'Vercel Configuration', status: checkVercelConfig() },
  ];

  const allPassed = checks.every(check => check.status);

  console.log('\n📊 Summary:');
  checks.forEach(check => {
    console.log(`${check.status ? '✅' : '❌'} ${check.name}`);
  });

  if (allPassed) {
    console.log('\n🎉 PROJECT IS READY FOR VERCEL DEPLOYMENT!');
    console.log('\nNext steps:');
    console.log('1. Push your code to GitHub');
    console.log('2. Connect your repository to Vercel');
    console.log('3. Configure environment variables in Vercel dashboard');
    console.log('4. Deploy!');
    
    console.log('\n📖 See VERCEL_DEPLOYMENT.md for detailed instructions');
  } else {
    console.log('\n⚠️  PROJECT NEEDS FIXES BEFORE DEPLOYMENT');
    console.log('Please address the issues marked with ❌ above');
  }

  return allPassed;
}

// Run the verification
const isReady = generateReport();
process.exit(isReady ? 0 : 1);
