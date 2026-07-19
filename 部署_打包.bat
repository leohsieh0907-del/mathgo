@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist dist mkdir dist
copy /y math_desktop_v4.html dist\index.html >nul
echo.
echo  [OK] 已產生 dist\index.html
echo.
echo  接下來：把整個 dist 資料夾拖進瀏覽器開啟的 Netlify Drop 頁面，
echo  數秒後就會得到一個手機可開的網址（可再到 Netlify 改名）。
echo.
echo  之後每次更新 App，重跑這個 bat 再拖一次即可。
echo.
start https://app.netlify.com/drop
pause
