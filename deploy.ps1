Write-Host "➡ Navigating to project folder..." -ForegroundColor Yellow
Set-Location "C:\Users\User\Documents\uspekhi-blog-nextjs" # Update this path to your project folder


# Kill any Node.js process using port 9002
Write-Host "➡ Checking for processes on port 9002..." -ForegroundColor Yellow
$portInUse = Get-NetTCPConnection -LocalPort 9002 -ErrorAction SilentlyContinue
if ($portInUse) {
  $pids = $portInUse.OwningProcess | Select-Object -Unique
  foreach ($proceid in $pids) {
    Write-Host "⚠ Killing process $pid using port 9002" -ForegroundColor Red
    Stop-Process -Id $pid -Force
  }
} else {
  Write-Host "ℹ Port 9002 is free." -ForegroundColor Green
}


# Remove .next folder and .next/trace files
Write-Host "➡ Cleaning .next folder and trace files..." -ForegroundColor Yellow
if (Test-Path ".next") {
  Remove-Item -Recurse -Force ".next"
  Write-Host "✔ .next folder deleted." -ForegroundColor Green
} else {
  Write-Host "ℹ No .next folder found." -ForegroundColor Cyan
}

# Also remove any leftover trace files (if somehow not cleaned)
$traceFiles = Get-ChildItem -Path ".next" -Recurse -Filter "trace" -ErrorAction SilentlyContinue
foreach ($file in $traceFiles) {
  Remove-Item -Force $file
  Write-Host "✔ Removed leftover trace file: $($file.FullName)" -ForegroundColor Green
}


# Install dependencies
Write-Host "➡ Installing dependencies..." -ForegroundColor Yellow
npm install --legacy-peer-deps


# Build Next.js project
Write-Host "➡ Building Next.js project..." -ForegroundColor Yellow
try {
  npm run build
} catch {
  Write-Host "❌ Build failed. Exiting." -ForegroundColor Red
  exit 1
}


# Deploy to Firebase Hosting + Functions
Write-Host "➡ Deploying to Firebase Hosting & Functions (SSR support)..." -ForegroundColor Yellow
try {
  firebase deploy
} catch {
  Write-Host "❌ Firebase deploy failed." -ForegroundColor Red
  exit 1
}
Write-Host "✔ Deployment complete!" -ForegroundColor Green