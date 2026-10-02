param(
  [string]$AssetsPath = (Join-Path $PSScriptRoot '..\public\products')
)

Add-Type -AssemblyName System.Drawing

if (-not ('ProductImageNormalizer' -as [type])) {
  Add-Type -ReferencedAssemblies 'System.Drawing.dll' -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

public static class ProductImageNormalizer
{
    private static int ColorDistance(Color left, Color right)
    {
        return Math.Abs(left.R - right.R) + Math.Abs(left.G - right.G) + Math.Abs(left.B - right.B);
    }

    public static string Normalize(string inputPath)
    {
        int originalWidth;
        int originalHeight;
        int outputWidth;
        int outputHeight;
        string temporaryPath = inputPath + ".normalized.png";

        using (var source = new Bitmap(inputPath))
        {
            originalWidth = source.Width;
            originalHeight = source.Height;
            int minX = source.Width;
            int minY = source.Height;
            int maxX = -1;
            int maxY = -1;
            Color leftEdge = source.GetPixel(0, source.Height / 2);
            Color rightEdge = source.GetPixel(source.Width - 1, source.Height / 2);
            bool hasOpaqueFlatBackground = leftEdge.A > 250
                && rightEdge.A > 250
                && ColorDistance(leftEdge, rightEdge) <= 12;

            for (int y = 0; y < source.Height; y++)
            {
                for (int x = 0; x < source.Width; x++)
                {
                    Color pixel = source.GetPixel(x, y);
                    if (pixel.A <= 8) continue;
                    if (hasOpaqueFlatBackground && ColorDistance(pixel, leftEdge) <= 18) continue;
                    if (x < minX) minX = x;
                    if (y < minY) minY = y;
                    if (x > maxX) maxX = x;
                    if (y > maxY) maxY = y;
                }
            }

            if (maxX < minX || maxY < minY)
            {
                return Path.GetFileName(inputPath) + ": empty image";
            }

            int contentWidth = maxX - minX + 1;
            int contentHeight = maxY - minY + 1;
            int padding = Math.Max(12, (int)Math.Round(Math.Max(contentWidth, contentHeight) * 0.035));
            int left = Math.Max(0, minX - padding);
            int top = Math.Max(0, minY - padding);
            int right = Math.Min(source.Width - 1, maxX + padding);
            int bottom = Math.Min(source.Height - 1, maxY + padding);
            outputWidth = right - left + 1;
            outputHeight = bottom - top + 1;

            using (var output = new Bitmap(outputWidth, outputHeight, PixelFormat.Format32bppArgb))
            using (var graphics = Graphics.FromImage(output))
            {
                graphics.Clear(Color.Transparent);
                graphics.CompositingMode = System.Drawing.Drawing2D.CompositingMode.SourceCopy;
                graphics.DrawImage(
                    source,
                    new Rectangle(0, 0, outputWidth, outputHeight),
                    new Rectangle(left, top, outputWidth, outputHeight),
                    GraphicsUnit.Pixel
                );

                if (hasOpaqueFlatBackground)
                {
                    for (int y = 0; y < output.Height; y++)
                    {
                        for (int x = 0; x < output.Width; x++)
                        {
                            Color pixel = output.GetPixel(x, y);
                            if (pixel.A > 8 && ColorDistance(pixel, leftEdge) <= 18)
                            {
                                output.SetPixel(x, y, Color.FromArgb(0, pixel.R, pixel.G, pixel.B));
                            }
                        }
                    }
                }
                output.Save(temporaryPath, ImageFormat.Png);
            }
        }

        File.Copy(temporaryPath, inputPath, true);
        File.Delete(temporaryPath);
        return Path.GetFileName(inputPath) + ": " + originalWidth + "x" + originalHeight + " -> " + outputWidth + "x" + outputHeight;
    }
}
'@ -ErrorAction Stop
}

Get-ChildItem -LiteralPath $AssetsPath -Filter '*.png' |
  Sort-Object Name |
  ForEach-Object {
    [ProductImageNormalizer]::Normalize($_.FullName)
  }
