@echo off

:: 脚本所在目录
set SCRIPT_DIR=%~dp0

:: 安装后端 Python 依赖
echo Install backend python dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    exit /b %errorlevel%
)

:: 安装前端依赖
echo Install frontend dependencies...
cd %SCRIPT_DIR%/frontend
pnpm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    exit /b %errorlevel%
)