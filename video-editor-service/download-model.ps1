# Baixa o modelo Whisper usado pelos banners por assunto.
# Execute uma vez no servidor onde este servico vai rodar.
$ErrorActionPreference = 'Stop'
$dir = Join-Path $PSScriptRoot 'models'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$out = Join-Path $dir 'ggml-small.bin'
if (Test-Path $out) {
  Write-Output "Modelo ja existe: $out"
  exit 0
}
Write-Output 'Baixando ggml-small.bin (~488 MB)...'
curl.exe -L --fail --show-error -o $out 'https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.bin'
Get-Item $out | Select-Object Name, Length
