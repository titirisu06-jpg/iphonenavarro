param(
  [string]$Destination = (Join-Path $PSScriptRoot '..\public\products\catalog'),
  [string[]]$Include = @('*')
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$cdn = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is'
$assets = @(
  @{ File = 'cargador-20w-usb-c.png'; Id = 'MWVV3' },
  @{ File = 'airpods-4.png'; Id = 'airpods-4-select-202409' },
  @{ File = 'airpods-4-anc.png'; Id = 'airpods-4-anc-select-202409' },
  @{ File = 'airpods-max-2.png'; Id = 'airpods-max-select-202409-midnight' },
  @{ File = 'airpods-pro-2.png'; Id = 'MTJV3' },
  @{ File = 'airpods-pro-3.png'; Id = 'airpods-pro-3-hero-select-202509' },
  @{ File = 'apple-watch-se-2-44mm.png'; Id = 'MXLV3ref_FV98_VW_34FR+watch-case-44-aluminum-midnight-nc-se_VW_34FR+watch-face-44-aluminum-midnight-se_VW_34FR' },
  @{ File = 'apple-watch-se-3-40mm.png'; Id = 'MC0F4ref_VW_34FR+watch-case-40-aluminum-midnight-nc-se3_VW_34FR+watch-face-40-aluminum-midnight-se3_VW_34FR' },
  @{ File = 'apple-watch-se-3-44mm.png'; Id = 'MFGX4ref_SR_SE_VW_34FR+watch-case-44-aluminum-midnight-nc-se3_VW_34FR+watch-face-44-aluminum-midnight-se3_VW_34FR' },
  @{ File = 'apple-watch-series-11-42mm.png'; Id = 'MXLJ3ref_VW_34FR+watch-case-42-aluminum-jetblack-nc-s11_VW_34FR+watch-face-42-aluminum-jetblack-s11_VW_34FR' },
  @{ File = 'apple-watch-series-11-46mm.png'; Id = 'MYA33ref_FV99_VW_34FR+watch-case-46-aluminum-jetblack-nc-s11_VW_34FR+watch-face-46-aluminum-jetblack-s11_VW_34FR' },
  @{ File = 'ipad-10.png'; Id = 'refurb-ipad-10th-gen-wifi-blue-202409' },
  @{ File = 'ipad-air-m4-11.png'; Id = 'ipad-air-select-11in-wifi-purple-202405' },
  @{ File = 'ipad-air-m3-13.png'; Id = 'refurb-ipad-air-2nd-gen-wifi-blue-202509' },
  @{ File = 'ipad-air-m4-13.png'; Id = 'ipad-air-select-13in-wifi-spacegray-202405' },
  @{ File = 'ipad-pro-m5-11.png'; Id = 'ipad-pro-11-select-wifi-spaceblack-202405' },
  @{ File = 'ipad-pro-m4-13.png'; Id = 'ipad-pro-13-select-wifi-spaceblack-202405' },
  @{ File = 'ipad-pro-m5-13.png'; Id = 'ipad-pro-13-select-wifi-spaceblack-202405' },
  @{ File = 'macbook-air-m4-15.png'; Id = 'refurb-mba15-m4-starlight-202503' },
  @{ File = 'macbook-air-m5-13.png'; Id = 'macbook-air-specs-select-202601-13inch-midnight' },
  @{ File = 'macbook-air-m5-13-1tb.png'; Id = 'macbook-air-specs-select-202601-13inch-silver' },
  @{ File = 'macbook-air-m5-15.png'; Id = 'macbook-air-specs-select-202601-15inch-skyblue' },
  @{ File = 'macbook-neo-13.png'; Id = 'refurb-mac-neo-a18-pro-indigo-202606' },
  @{ File = 'macbook-pro-m5-14.png'; Id = 'refurb-mbp14-m5-silver-202511' }
)

New-Item -ItemType Directory -Force -Path $Destination | Out-Null

foreach ($asset in $assets | Where-Object {
  $fileName = $_.File
  @($Include | Where-Object { $fileName -like $_ }).Count -gt 0
}) {
  $url = "$cdn/$($asset.Id)?wid=1600&hei=1600&fmt=png-alpha"
  $target = Join-Path $Destination $asset.File
  Invoke-WebRequest -Uri $url -OutFile $target -UseBasicParsing

  $image = [System.Drawing.Image]::FromFile($target)
  try {
    if ($image.Width -lt 500 -or $image.Height -lt 500) {
      throw "Resolucion inesperada para $($asset.File): $($image.Width)x$($image.Height)"
    }
    "$($asset.File): $($image.Width)x$($image.Height)"
  }
  finally {
    $image.Dispose()
  }
}
