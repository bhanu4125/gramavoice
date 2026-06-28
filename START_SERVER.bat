@echo off
echo ============================================
echo   GramaVoice - Starting Server
echo ============================================
echo.
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo Starting server on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.
node server.js

