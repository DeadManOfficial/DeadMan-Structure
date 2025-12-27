# DEAD MAN STRUCTURE - AI/DEV TOOLKIT REGISTRY SCAN
$DevReport = @()

$DevReport += "=== AI & DEVELOPMENT TOOLKIT SCAN ==="
$DevReport += ""

# AI Tools
$DevReport += "[AI TOOLS]"
$DevReport += "=========="
$aiPaths = @(
    'HKCU:\SOFTWARE\Claude',
    'HKCU:\SOFTWARE\Anthropic',
    'HKLM:\SOFTWARE\Claude',
    'HKLM:\SOFTWARE\Anthropic',
    'HKCU:\SOFTWARE\Gemini',
    'HKCU:\SOFTWARE\Google\Gemini',
    'HKLM:\SOFTWARE\Gemini',
    'HKCU:\SOFTWARE\OpenAI',
    'HKLM:\SOFTWARE\OpenAI',
    'HKCU:\SOFTWARE\Codex',
    'HKLM:\SOFTWARE\Codex',
    'HKCU:\SOFTWARE\Cursor',
    'HKLM:\SOFTWARE\Cursor'
)
foreach ($path in $aiPaths) {
    if (Test-Path $path) {
        $subkeys = Get-ChildItem $path -ErrorAction SilentlyContinue
        $DevReport += "[FOUND] $path - $($subkeys.Count) subkeys"
    }
}
$DevReport += ""

# Development Tools
$DevReport += "[DEVELOPMENT TOOLS]"
$DevReport += "==================="
$devTools = @(
    'HKLM:\SOFTWARE\Node.js',
    'HKCU:\SOFTWARE\npm',
    'HKCU:\SOFTWARE\Python',
    'HKCU:\SOFTWARE\PythonSoftware Foundation',
    'HKLM:\SOFTWARE\Python',
    'HKLM:\SOFTWARE\Golang',
    'HKCU:\SOFTWARE\Golang',
    'HKLM:\SOFTWARE\Rust',
    'HKCU:\SOFTWARE\Rust',
    'HKLM:\SOFTWARE\JavaSoft',
    'HKCU:\SOFTWARE\JavaSoft',
    'HKLM:\SOFTWARE\GitForWindows',
    'HKLM:\SOFTWARE\GitHub'
)
foreach ($tool in $devTools) {
    if (Test-Path $tool) {
        $DevReport += "[+] $tool"
    }
}
$DevReport += ""

# CLIs in PATH
$DevReport += "[INSTALLED CLIS]"
$DevReport += "================"
$envPath = (Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\Environment').Path
$cliTools = @('git', 'npm', 'node', 'python', 'pip', 'gemini', 'codex', 'bd', 'gh', 'code')
foreach ($cli in $cliTools) {
    if ($envPath -like "*$cli*") {
        $DevReport += "[+] $cli - in PATH"
    }
}
$DevReport += ""

# Environment Variables
$DevReport += "[ENVIRONMENT VARIABLES]"
$DevReport += "======================="
$envVars = @('GOPATH', 'GOROOT', 'PYTHONPATH', 'NODE_PATH', 'NPM_CONFIG_PREFIX', 'GEMINI_HOME', 'CODEX_HOME')
foreach ($var in $envVars) {
    $val = [Environment]::GetEnvironmentVariable($var)
    if ($val) {
        $DevReport += "$var = $val"
    }
}
$DevReport += ""

# Visual Studio Code
$DevReport += "[VS CODE]"
$DevReport += "========"
$vscode = 'HKCU:\SOFTWARE\Microsoft\VSCode'
if (Test-Path $vscode) {
    $DevReport += "[+] VS Code Installed"
    $extensions = Get-ChildItem "$vscode\Extensions" -ErrorAction SilentlyContinue
    $DevReport += "Extensions: $($extensions.Count)"
}
$DevReport += ""

# Docker
$DevReport += "[DOCKER]"
$DevReport += "======="
$docker = 'HKLM:\SOFTWARE\Docker'
if (Test-Path $docker) {
    $DevReport += "[+] Docker Installed"
}

$DevReport += ""
$DevReport += "=== END AI/DEV SCAN ==="

$DevReport | Write-Host
$DevReport | Out-File -FilePath "C:/Users/Administrator/ai_toolkit_scan.txt" -Encoding UTF8
