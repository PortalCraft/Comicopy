@echo off

:: 脚本所在目录
set SCRIPT_DIR=%~dp0

:: 启动后端服务在一个新的CMD窗口中
start cmd /k "python %SCRIPT_DIR%/backend/search.py"

:: 启动前端服务在一个新的CMD窗口中
start cmd /k "cd %SCRIPT_DIR%/frontend && pnpm dev"