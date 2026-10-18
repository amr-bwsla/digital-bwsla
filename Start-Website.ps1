param([switch]$NoBrowser)

$ErrorActionPreference = 'Stop'
$siteUrl = 'http://127.0.0.1:4173/index.html'
$siteRoot = $PSScriptRoot

function Test-SiteReady {
    try {
        $response = Invoke-WebRequest -Uri $siteUrl -UseBasicParsing -TimeoutSec 2
        return $response.StatusCode -eq 200 -and $response.Content -eq [System.IO.File]::ReadAllText((Join-Path $siteRoot 'index.html'))
    } catch { return $false }
}

try {
    if (-not (Test-SiteReady)) {
        $listener = Get-NetTCPConnection -LocalPort 4173 -State Listen -ErrorAction SilentlyContinue
        if ($listener) { throw 'Port 4173 is being used by another application. Close that application and try again.' }
        $nodePath = (Get-Command node -ErrorAction Stop).Source
        $serverPath = Join-Path $siteRoot 'server.cjs'
        $server = Start-Process -FilePath $nodePath -ArgumentList ('"' + $serverPath + '"') -WorkingDirectory $siteRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $siteRoot 'preview-server.log') -RedirectStandardError (Join-Path $siteRoot 'preview-server-error.log') -PassThru
        $ready = $false
        for ($attempt = 0; $attempt -lt 20; $attempt++) {
            if (Test-SiteReady) { $ready = $true; break }
            if ($server.HasExited) { break }
            Start-Sleep -Milliseconds 300
        }
        if (-not $ready) { throw 'The website did not start. See preview-server-error.log in this folder.' }
    }
    Write-Host "Website ready: $siteUrl"
    if (-not $NoBrowser) { Start-Process $siteUrl }
} catch {
    Write-Host ('Unable to start website: ' + $_.Exception.Message) -ForegroundColor Red
    exit 1
}
