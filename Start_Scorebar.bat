@echo off
setlocal EnableExtensions EnableDelayedExpansion
chcp 65001 >nul
title FGC Open Scorebars - Local Broadcast Server
cd /d "%~dp0"

echo.
echo  ============================================================
echo     FGC OPEN SCOREBARS - Local Broadcast Suite
echo  ============================================================
echo.

call :check_node
if !NODE_OK!==0 (
  if defined NODE_VER (
    echo  [!] Node.js !NODE_VER! is too old. Node.js 18+ LTS is required.
  ) else (
    echo  [!] Node.js is not installed on this PC.
  )
  echo.
  if exist "%~dp0Install_NodeJS.bat" (
    set /p "DO_INSTALL=  Install Node.js LTS automatically right now? [Y/N]: "
    if /i "!DO_INSTALL!"=="Y" (
      call "%~dp0Install_NodeJS.bat" --from-launcher
      if errorlevel 1 (
        echo.
        echo  [!] Automatic installation failed. Install manually at https://nodejs.org/
        echo.
        pause
        exit /b 1
      )
      call :refresh_path
      call :check_node
    )
  )
)

if !NODE_OK!==0 (
  echo.
  echo  [ERROR] Node.js 18+ is required to run FGC Open Scorebars.
  echo          Run Install_NodeJS.bat or download LTS from https://nodejs.org/
  echo.
  pause
  exit /b 1
)

echo  [OK] Node.js !NODE_VER! detected.
echo  [*] Opening Broadcast Control Panel in your default browser...
echo      Overlay (OBS):  http://localhost:8787/
echo      Control Panel:  http://localhost:8787/panel.html
echo.
echo  Keep this window open while streaming. Press Ctrl+C to stop.
echo.

start "" "http://localhost:8787/panel.html"
set "FGC_LAUNCHER=1"

:run_server
node app\server\server.mjs
if %ERRORLEVEL% EQU 42 (
  echo.
  echo  [*] Update applied! Restarting FGC Open Scorebars server...
  echo.
  timeout /t 1 /nobreak >nul
  goto :run_server
)
pause
exit /b 0

:refresh_path
for /f "usebackq delims=" %%P in (`powershell -NoProfile -Command "$m=[Environment]::GetEnvironmentVariable('Path','Machine'); $u=[Environment]::GetEnvironmentVariable('Path','User'); ($m,$u | Where-Object { $_ }) -join ';'"`) do (
  set "PATH=%%P"
)
if exist "%ProgramFiles%\nodejs\node.exe" set "PATH=%ProgramFiles%\nodejs;%PATH%"
if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "PATH=%ProgramFiles(x86)%\nodejs;%PATH%"
exit /b 0

:check_node
set "NODE_OK=0"
set "NODE_VER="
where node >nul 2>nul
if errorlevel 1 exit /b 0
for /f "delims=" %%V in ('node -v 2^>nul') do set "NODE_VER=%%V"
if not defined NODE_VER exit /b 0
set "NODE_MAJOR=!NODE_VER:v=!"
for /f "tokens=1 delims=." %%M in ("!NODE_MAJOR!") do set "NODE_MAJOR=%%M"
if !NODE_MAJOR! GEQ 18 set "NODE_OK=1"
exit /b 0
