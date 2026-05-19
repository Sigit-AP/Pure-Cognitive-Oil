@echo off
setlocal
set SCRIPT_DIR=%~dp0
cd /d "%SCRIPT_DIR%.."
npx tsx scripts/dci/bootstrap.ts --json
