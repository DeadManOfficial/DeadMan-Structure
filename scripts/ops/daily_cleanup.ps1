# GEMINI HQ - DAILY OPERATIONAL CLEANUP
# AUTOMATED BY: THE GENERAL
# DATE: 2025-12-25

$LogPath = "C:\Users\Administrator\Gemini_HQ\docs\history\session_logs\cleanup_log.txt"
$Date = Get-Date

Function Log-Activity ($Message) {
    $LogMessage = "[$Date] $Message"
    Add-Content -Path $LogPath -Value $LogMessage
    Write-Host $LogMessage -ForegroundColor Cyan
}

Log-Activity "Starting Daily Cleanup Protocol..."

# 1. Clean Downloads (Move to Archive instead of delete for safety)
$DownloadsPath = "C:\Users\Administrator\Downloads"
$ArchiveInbox = "C:\Users\Administrator\Gemini_HQ\_Archive\Downloads_Inbox"

if (!(Test-Path $ArchiveInbox)) {
    New-Item -ItemType Directory -Path $ArchiveInbox -Force | Out-Null
}

$Files = Get-ChildItem -Path $DownloadsPath -File
foreach ($File in $Files) {
    # Move files older than 24 hours
    if ($File.LastWriteTime -lt (Get-Date).AddDays(-1)) {
        Move-Item -Path $File.FullName -Destination $ArchiveInbox -Force
        Log-Activity "Archived: $($File.Name)"
    }
}

# 2. Temp Directory Purge
$TempPath = "C:\Users\Administrator\.gemini\tmp"
if (Test-Path $TempPath) {
    Get-ChildItem -Path $TempPath -Recurse | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
    Log-Activity "Purged Temp Directory."
}

# 3. Root Sanitization (C:\)
# Check for loose text/log files in Root and move to HQ
$RootFiles = Get-ChildItem -Path "C:\" -File | Where-Object { $_.Extension -match "\.(txt|log|md|tmp)$" }
$RootArchive = "C:\Users\Administrator\Gemini_HQ\_Archive\Root_Clutter"

if (!(Test-Path $RootArchive)) {
    New-Item -ItemType Directory -Path $RootArchive -Force | Out-Null
}

foreach ($File in $RootFiles) {
    Move-Item -Path $File.FullName -Destination $RootArchive -Force
    Log-Activity "Moved Root Clutter: $($File.Name)"
}

Log-Activity "Cleanup Protocol Complete. System Optimized."
