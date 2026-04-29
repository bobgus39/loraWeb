@echo off
chcp 65001 >nul
color 0B
title SwarmUI - Ejecutor

echo.
echo ╔════════════════════════════════════════╗
echo ║      SwarmUI - Iniciando...           ║
echo ╚════════════════════════════════════════╝
echo.

REM Verificar estructura básica
if not exist "src" (
    echo ❌ Error: Estructura de SwarmUI no encontrada
    echo.
    echo Este script debe ejecutarse desde el directorio de SwarmUI
    echo Ejecuta primero: install_swarmui.bat
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
echo 🚀 Iniciando SwarmUI...
echo.
echo 💡 Interfaz web: http://localhost:7801
echo 💡 Presiona CTRL+C para detener el servidor
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Ejecutar servidor backend de SwarmUI
python "src/main.py"

REM Manejo de errores
if errorlevel 1 (
    echo.
    echo ⚠ SwarmUI cerró o hubo un error
    echo.
    echo Causas comunes:
    echo - Puerto 7801 ya está en uso
    echo - Falta de dependencias Python
    echo - Problemas con la GPU/CUDA
    echo.
    echo Soluciones:
    echo 1. Cierra otras aplicaciones que usen el puerto 7801
    echo 2. Ejecuta nuevamente install_swarmui.bat
    echo 3. Verifica que los drivers NVIDIA estén actualizados
    echo.
)

pause
