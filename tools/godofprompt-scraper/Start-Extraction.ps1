# God of Prompt Extraction Launcher
$extractorPath = "C:\Users\Administrator\extract_prompts.html"

Write-Host "🚀 Starting God of Prompt Extraction..." -ForegroundColor Cyan

if (!(Test-Path $extractorPath)) {
    Write-Host "❌ Error: File not found" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Found extractor file" -ForegroundColor Green
Write-Host "🌐 Launching Chrome..." -ForegroundColor Yellow

$chromePaths = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
)

$chromePath = $null
foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        $chromePath = $path
        break
    }
}

if ($chromePath) {
    & $chromePath $extractorPath --new-window
    Write-Host "✅ Chrome launched! Check the browser window." -ForegroundColor Green
} else {
    Write-Host "❌ Chrome not found" -ForegroundColor Red
}
