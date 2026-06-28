@echo off
echo ============================================
echo   GramaVoice - Deployment Setup
echo ============================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from https://git-scm.com
    pause
    exit /b 1
)

echo.
echo Step 1: Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo ERROR: Failed to initialize git
    pause
    exit /b 1
)

echo.
echo Step 2: Adding all files...
git add .
if %errorlevel% neq 0 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)

echo.
echo Step 3: Creating initial commit...
git commit -m "Initial commit - GramaVoice ready for deployment"
if %errorlevel% neq 0 (
    echo ERROR: Failed to commit
    pause
    exit /b 1
)

echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo Next steps:
echo 1. Create a repository on GitHub
echo 2. Run the following commands:
echo    git remote add origin YOUR_GITHUB_REPO_URL
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Then follow QUICK_DEPLOY.md guide
echo.
pause

