@echo off
chcp 65001 >nul
color 0A
title ComfyUI - Instalador Automático

echo.
echo ╔════════════════════════════════════════╗
echo ║     ComfyUI - Setup Automático        ║
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

REM Crear directorio principal
if not exist "ComfyUI" (
    echo 📁 Creando directorio ComfyUI...
    mkdir ComfyUI
    cd ComfyUI
) else (
    echo 📁 Directorio ComfyUI ya existe, entrando...
    cd ComfyUI
)

REM Clonar repositorio
if not exist ".git" (
    echo 📥 Clonando repositorio de ComfyUI...
    git clone https://github.com/comfyanonymous/ComfyUI.git .
    if errorlevel 1 (
        echo ❌ Error al clonar. Instala Git desde: https://git-scm.com/download/win
        pause
        exit /b 1
    )
) else (
    echo ✓ Repositorio ya existe
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
) else (
    echo ⚠ requirements.txt no encontrado
)

REM Instalar torch con CUDA support
echo.
echo 🔧 Instalando PyTorch con CUDA...
python -m pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
if errorlevel 1 (
    echo ⚠ Error en PyTorch CUDA, instalando versión CPU...
    python -m pip install torch torchvision torchaudio
)

REM Crear directorio de modelos si no existe
if not exist "models" mkdir models
if not exist "models\checkpoints" mkdir models\checkpoints
if not exist "models\loras" mkdir models\loras
if not exist "models\vae" mkdir models\vae

echo.
echo ✓ Instalación completada
echo.
echo 📝 Para ejecutar ComfyUI, usa: run_comfyui.bat
echo.
pause
