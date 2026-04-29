@echo off
chcp 65001 >nul
color 0A
title ComfyUI - Ejecutor

echo.
echo ╔════════════════════════════════════════╗
echo ║      ComfyUI - Iniciando...           ║
echo ╚════════════════════════════════════════╝
echo.

REM Verificar si estamos en el directorio correcto
if not exist "main.py" (
    echo ❌ Error: main.py no encontrado
    echo.
    echo Este script debe ejecutarse desde el directorio de ComfyUI
    echo Ejecuta primero: install_comfyui.bat
    echo.
    pause
    exit /b 1
)

REM Verificar Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Python no está disponible
    pause
    exit /b 1
)

echo ✓ Verificación completada
echo.
echo 🚀 Iniciando ComfyUI...
echo.
echo 💡 Tip: Si solo ves "segmentation fault", intenta con --cpu-only
echo    Abre con: python main.py --cpu-only
echo.
echo URL por defecto: http://127.0.0.1:8188
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Ejecutar ComfyUI - intenta con GPU primero
python main.py

REM Si falla, ofrecer modo CPU
if errorlevel 1 (
    echo.
    echo ⚠ ComfyUI cerró o hubo un error
    echo.
    echo ¿Deseas intentar en modo CPU?
    echo Presiona S para Sí, cualquier otra tecla para salir
    set /p choice="Opción: "
    if /i "%choice%"=="S" (
        echo.
        echo 🔄 Reiniciando en modo CPU...
        python main.py --cpu-only
    )
)

pause
