@echo off
chcp 65001 >nul
color 0B
title SwarmUI - Instalador Automático

echo.
echo ╔════════════════════════════════════════╗
echo ║     SwarmUI - Setup Automático        ║
echo ╚════════════════════════════════════════╝
echo.

REM Verificar si Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Python no está instalado o no está en PATH
    echo.
    echo Descarga Python 3.10 desde: https://www.python.org/downloads/
    echo Asegúrate de marcar "Add Python to PATH" durante la instalación
    echo.
    pause
    exit /b 1
)

echo ✓ Python detectado
python --version
echo.

REM Verificar si Node.js está instalado (necesario para SwarmUI)
node --version >nul 2>&1
if errorlevel 1 (
    echo ⚠ Node.js no detectado
    echo.
    echo SwarmUI necesita Node.js para la interfaz web
    echo Descarga desde: https://nodejs.org/ (versión LTS recomendada)
    echo.
    echo Continúa solo si ya lo tienes instalado
    pause
)

REM Crear directorio principal
if not exist "SwarmUI" (
    echo 📁 Creando directorio SwarmUI...
    mkdir SwarmUI
    cd SwarmUI
) else (
    echo 📁 Directorio SwarmUI ya existe, entrando...
    cd SwarmUI
)

REM Clonar repositorio
if not exist ".git" (
    echo 📥 Clonando repositorio de SwarmUI...
    git clone https://github.com/mcmonkeyprojects/SwarmUI.git .
    if errorlevel 1 (
        echo ❌ Error al clonar. Instala Git desde: https://git-scm.com/download/win
        pause
        exit /b 1
    )
) else (
    echo ✓ Repositorio ya existe
    echo 🔄 Actualizando...
    git pull
)

echo.
echo 📦 Instalando dependencias Python...
python -m pip install --upgrade pip

REM Instalar requirements
if exist "requirements.txt" (
    python -m pip install -r requirements.txt
    if errorlevel 1 (
        echo ⚠ Algunos paquetes fallaron, intentando instalación alternativa...
        python -m pip install --no-cache-dir -r requirements.txt
    )
)

REM Instalar torch con CUDA support
echo.
echo 🔧 Instalando PyTorch con CUDA...
python -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
if errorlevel 1 (
    echo ⚠ Error en PyTorch CUDA, instalando versión CPU...
    python -m pip install torch torchvision torchaudio
)

REM Instalar dependencias Node.js si existe package.json
if exist "package.json" (
    echo.
    echo 📦 Instalando dependencias Node.js...
    npm install
)

REM Crear directorios necesarios
if not exist "Models" mkdir Models
if not exist "Backends" mkdir Backends
if not exist "SwarmData" mkdir SwarmData

echo.
echo ✓ Instalación completada
echo.
echo 📝 Para ejecutar SwarmUI, usa: run_swarmui.bat
echo.
pause
