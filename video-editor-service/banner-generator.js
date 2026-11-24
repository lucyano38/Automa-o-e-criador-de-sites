'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');
const execFileAsync = promisify(execFile);
const { BANNER_THEMES } = require('./presets');

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

/**
 * Gera um banner profissional em SVG (ideal para pré-visualização no navegador).
 */
function createProfessionalBannerSvg(opts = {}) {
  const width = opts.width || 980;
  const height = opts.height || (opts.subtitle ? 230 : 180);
  const title = escapeXml((opts.title || 'SEU TÍTULO AQUI').toUpperCase());
  const subtitle = escapeXml(opts.subtitle || '');
  const username = escapeXml(opts.username ? (opts.username.startsWith('@') ? opts.username : '@' + opts.username) : '');

  const themeKey = opts.theme || 'instagram_gradient';
  const theme = BANNER_THEMES[themeKey] || BANNER_THEMES.instagram_gradient;

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.bgStart}" />
      <stop offset="50%" stop-color="${theme.bgMid}" />
      <stop offset="100%" stop-color="${theme.bgEnd}" />
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="${width - 8}" height="${height - 8}" rx="24" fill="url(#cardBg)" stroke="${theme.borderColor}" stroke-width="3" />
  <rect x="${width * 0.15}" y="14" width="${width * 0.7}" height="4" rx="2" fill="${theme.accentColor}" opacity="0.8" />
  ${username ? `<text x="${width - 40}" y="48" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#ffffff" text-anchor="end">${username}</text>` : ''}
  <text x="${width / 2}" y="${subtitle ? 115 : 105}" font-family="Arial, sans-serif" font-size="${title.length > 28 ? 38 : 46}" font-weight="900" fill="${theme.textColor}" text-anchor="middle">${title}</text>
  ${subtitle ? `<text x="${width / 2}" y="175" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="${theme.accentColor}" text-anchor="middle">${subtitle}</text>` : ''}
</svg>`;
}

function getFfmpeg() {
  if (process.env.FFMPEG_PATH) return process.env.FFMPEG_PATH;
  try {
    const winget = path.join(
      process.env.LOCALAPPDATA || '',
      'Microsoft', 'WinGet', 'Packages',
      'Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe',
      'ffmpeg-9.1-full_build', 'bin', 'ffmpeg.exe'
    );
    if (fs.existsSync(winget)) return winget;
  } catch (_) {}
  return 'ffmpeg';
}

/**
 * Fallback quando o GDI+ do PowerShell não está disponível: usa o próprio
 * FFmpeg (drawtext) para gerar um PNG válido, sem depender de decodificador SVG.
 */
async function generateFfmpegBanner(bannerSpec, outPath) {
  const theme = BANNER_THEMES[bannerSpec.theme] || BANNER_THEMES.instagram_gradient;
  const clean = s => String(s).replace(/[':\\]/g, ' ').replace(/%/g, '%%');
  const title = clean(bannerSpec.title || 'SEU TITULO AQUI').toUpperCase();
  const subtitle = clean(bannerSpec.subtitle || '');
  const font = 'C\\:/Windows/Fonts/arialbd.ttf';
  const bg = (theme.bgStart || '#833ab4').replace('#', '0x');
  const accent = (theme.accentColor || '#fcb045').replace('#', '0x');
  const titleSize = title.length > 34 ? 26 : (title.length > 26 ? 32 : 42);

  const filters = [
    `color=c=${bg}:s=980x230:d=1,format=rgba`,
    `drawtext=fontfile=${font}:text='${title}':fontcolor=white:fontsize=${titleSize}:x=(w-text_w)/2:y=66`
  ];
  if (subtitle) {
    filters.push(`drawtext=fontfile=${font}:text='${subtitle}':fontcolor=${accent}:fontsize=24:x=(w-text_w)/2:y=150`);
  }
  filters.push(`drawbox=x=147:y=14:w=686:h=4:color=${accent}@0.8:t=fill`);

  await execFileAsync(
    getFfmpeg(),
    ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-i', filters.join(','), '-frames:v', '1', outPath]
  );
}

/**
 * Gera um banner PNG transparente de alta definição utilizando a API nativa
 * GDI+/Drawing do Windows via PowerShell. O script é gravado em um arquivo
 * .ps1 temporário e executado com -File, forma correta de ligar parâmetros
 * nomeados (com -Command os parâmetros não são ligados ao bloco param()).
 *
 * @param {object} bannerSpec Especificações do banner (title, subtitle, username, theme)
 * @param {string} outDir Diretório de saída
 * @returns {string} Caminho do arquivo PNG gerado
 */
async function generateBannerPng(bannerSpec, outDir) {
  const fileName = `banner_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.png`;
  const outPath = path.join(outDir, fileName);

  const title = bannerSpec.title || 'SEU TÍTULO AQUI';
  const subtitle = bannerSpec.subtitle || '';
  const username = bannerSpec.username
    ? (bannerSpec.username.startsWith('@') ? bannerSpec.username : '@' + bannerSpec.username)
    : '';
  const theme = bannerSpec.theme || 'instagram_gradient';

  const script = `
param([string]$title, [string]$subtitle, [string]$username, [string]$theme, [string]$outPath)
Add-Type -AssemblyName System.Drawing

$width = 980
$height = if ($subtitle) { 230 } else { 180 }

$bmp = New-Object System.Drawing.Bitmap $width, $height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::Transparent)

$c1 = [System.Drawing.ColorTranslator]::FromHtml('#833ab4')
$c2 = [System.Drawing.ColorTranslator]::FromHtml('#fd1d1d')
if ($theme -eq 'dark_neon') {
    $c1 = [System.Drawing.ColorTranslator]::FromHtml('#0f172a')
    $c2 = [System.Drawing.ColorTranslator]::FromHtml('#1e293b')
} elseif ($theme -eq 'gold_luxury') {
    $c1 = [System.Drawing.ColorTranslator]::FromHtml('#1a1813')
    $c2 = [System.Drawing.ColorTranslator]::FromHtml('#2d2619')
} elseif ($theme -eq 'youtube_punch') {
    $c1 = [System.Drawing.ColorTranslator]::FromHtml('#facc15')
    $c2 = [System.Drawing.ColorTranslator]::FromHtml('#eab308')
} elseif ($theme -eq 'clean_white') {
    $c1 = [System.Drawing.ColorTranslator]::FromHtml('#ffffff')
    $c2 = [System.Drawing.ColorTranslator]::FromHtml('#f1f5f9')
}

$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$r = 24
$rect = New-Object System.Drawing.Rectangle 4, 4, ($width - 8), ($height - 8)
$d = $r * 2
$path.AddArc($rect.X, $rect.Y, $d, $d, 180, 90)
$path.AddArc($rect.X + $rect.Width - $d, $rect.Y, $d, $d, 270, 90)
$path.AddArc($rect.X + $rect.Width - $d, $rect.Y + $rect.Height - $d, $d, $d, 0, 90)
$path.AddArc($rect.X, $rect.Y + $rect.Height - $d, $d, $d, 90, 90)
$path.CloseFigure()

$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $rect, $c1, $c2, 45
$g.FillPath($brush, $path)

$borderPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(120, 255, 255, 255)), 3
$g.DrawPath($borderPen, $path)

$accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#fcb045'))
$g.FillRectangle($accentBrush, [int]($width * 0.15), 14, [int]($width * 0.7), 4)

if ($username) {
    $userFont = New-Object System.Drawing.Font('Arial', [float]14, [System.Drawing.FontStyle]::Bold)
    $userBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
    $badgeRect = New-Object System.Drawing.Rectangle ($width - 260), 24, 230, 36
    $badgeBg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(140, 0, 0, 0))
    $g.FillRectangle($badgeBg, $badgeRect)
    $sfR = New-Object System.Drawing.StringFormat
    $sfR.Alignment = [System.Drawing.StringAlignment]::Center
    $sfR.LineAlignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString($username, $userFont, $userBrush, [System.Drawing.RectangleF]$badgeRect, $sfR)
}

$titleText = $title.ToUpper()
$titleFont = New-Object System.Drawing.Font('Arial', [float]30, [System.Drawing.FontStyle]::Bold)
$maxTitleWidth = $width - 60
while ($titleFont.Size -gt 16 -and $g.MeasureString($titleText, $titleFont).Width -gt $maxTitleWidth) {
    $nextSize = [math]::Max(16, [int]($titleFont.Size - 2))
    $titleFont.Dispose()
    $titleFont = New-Object System.Drawing.Font('Arial', [float]$nextSize, [System.Drawing.FontStyle]::Bold)
}
$titleBrush = if ($theme -eq 'clean_white' -or $theme -eq 'youtube_punch') {
    New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#09090b'))
} else {
    New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
}
$sfC = New-Object System.Drawing.StringFormat
$sfC.Alignment = [System.Drawing.StringAlignment]::Center
$sfC.LineAlignment = [System.Drawing.StringAlignment]::Center
$titleTop = if ($subtitle) { 68 } else { 60 }
$titleBox = New-Object System.Drawing.RectangleF 30, $titleTop, ($width - 60), 78
$g.DrawString($titleText, $titleFont, $titleBrush, $titleBox, $sfC)

if ($subtitle) {
    $subFont = New-Object System.Drawing.Font('Arial', [float]18, [System.Drawing.FontStyle]::Bold)
    $subBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#fcb045'))
    $g.DrawString($subtitle, $subFont, $subBrush, ($width / 2), 155, $sfC)
}

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
`;

  const scriptPath = path.join(os.tmpdir(), `openbot-banner-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.ps1`);

  try {
    fs.writeFileSync(scriptPath, script, 'utf8');
    await execFileAsync(
      'powershell',
      [
        '-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', scriptPath,
        '-title', title,
        '-subtitle', subtitle,
        '-username', username,
        '-theme', theme,
        '-outPath', outPath
      ]
    );
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 0) return outPath;
  } catch (_) {
    // Segue para o fallback com FFmpeg
  } finally {
    try { fs.unlinkSync(scriptPath); } catch (_) {}
  }

  await generateFfmpegBanner(bannerSpec, outPath);
  return outPath;
}

module.exports = {
  createProfessionalBannerSvg,
  generateBannerFile: generateBannerPng
};
