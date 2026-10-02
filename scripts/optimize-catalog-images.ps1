param(
  [string]$AssetsPath = (Join-Path $PSScriptRoot '..\public\products\catalog'),
  [int]$MaxDimension = 1200,
  [int]$Quality = 92,
  [switch]$RemoveSource
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$ffmpeg = (Get-Command ffmpeg -ErrorAction Stop).Source
$sources = Get-ChildItem -LiteralPath $AssetsPath -Filter '*.png' | Sort-Object Name

foreach ($source in $sources) {
  $image = [System.Drawing.Image]::FromFile($source.FullName)
  try {
    $largestSide = [Math]::Max($image.Width, $image.Height)
    $scale = [Math]::Min([double]1, [double]$MaxDimension / [double]$largestSide)
    $width = [Math]::Max(2, [Math]::Floor($image.Width * $scale / 2) * 2)
    $height = [Math]::Max(2, [Math]::Floor($image.Height * $scale / 2) * 2)
  }
  finally {
    $image.Dispose()
  }

  $target = [System.IO.Path]::ChangeExtension($source.FullName, '.webp')
  & $ffmpeg -y -loglevel error -i $source.FullName -vf "scale=$width`:$height" -c:v libwebp -quality $Quality -compression_level 6 -preset picture $target
  if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $target) -or (Get-Item -LiteralPath $target).Length -lt 1024) {
    throw "No se pudo optimizar $($source.Name)"
  }

  "$($source.Name) -> $([System.IO.Path]::GetFileName($target)) ($width`x$height)"
}

if ($RemoveSource) {
  foreach ($source in $sources) {
    $target = [System.IO.Path]::ChangeExtension($source.FullName, '.webp')
    if (-not (Test-Path -LiteralPath $target) -or (Get-Item -LiteralPath $target).Length -lt 1024) {
      throw "Se conserva $($source.Name): falta una copia WebP valida"
    }
    Remove-Item -LiteralPath $source.FullName
  }
}
