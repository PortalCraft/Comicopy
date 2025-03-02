@echo off

:: 脚本所在目录
set SCRIPT_DIR=%~dp0

:: 安装前端依赖
echo Install frontend dependencies...
cd %SCRIPT_DIR%/frontend
call pnpm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    exit /b %errorlevel%
)

:: 安装后端 Python 依赖
echo Install backend python dependencies...
cd %SCRIPT_DIR%/backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    exit /b %errorlevel%
)

:: 回到脚本所在目录
cd %SCRIPT_DIR%/
echo Installation successfully!
pause