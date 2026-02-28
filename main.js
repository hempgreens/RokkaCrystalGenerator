window.onload = () => {
  setDefaultParameter();
  loadRokkaParameter();
  drawRokkaCrystal();
  setInputCallback();
};

const $ = id => document.getElementById(id);
function loadRokkaParameter(){
  const params = new URL(window.location.href).searchParams.get('params');
  if (!params) {
  return;
  }
  const splitted = params.split('_');
  if (splitted.length !== 6) {
  return;
  }
  const [RADIUS, LINE_WIDTH, BG_COLOR, PLATE_STROKE, HEX_STROKE, SNOW_FILL] = splitted;
  $('radiusRange').value = RADIUS;
  $('lineWidthRange').value = LINE_WIDTH;
  $('backGroundColorPick').value = `#${BG_COLOR}`;
  $('plateStrokeColorPick').value = `#${PLATE_STROKE}`;
  $('hexStrokeColorPick').value = `#${HEX_STROKE}`;
  $('snowFillColorPick').value = `#${SNOW_FILL}`;
}
function setInputCallback(){
  $('backGroundColorPick').addEventListener('input', drawRokkaCrystal);
  $('plateStrokeColorPick').addEventListener('input', drawRokkaCrystal);
  $('hexStrokeColorPick').addEventListener('input', drawRokkaCrystal);
  $('snowFillColorPick').addEventListener('input', drawRokkaCrystal);
  $('radiusRange').addEventListener('input', drawRokkaCrystal);
  $('lineWidthRange').addEventListener('input', drawRokkaCrystal);
  $('defaultButton').addEventListener('click', defaultButtonCallback);
  $('downloadButton').addEventListener('click', downloadButtonCallback);
  $('shareButton').addEventListener('click', shareButtonCallback);
}
function drawHexagon(cnvId, r, strokeColor, fillColor, lineWidth){
  const cnv = $(cnvId);
  const ctx = cnv.getContext('2d');
  const root3 = Math.sqrt(3);

  ctx.save();
  
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  ctx.lineWidth = lineWidth;

  ctx.translate(cnv.width / 2, cnv.height / 2);
  
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(r / 2, r * root3 / 2);
  ctx.lineTo(-r / 2, r * root3 / 2);
  ctx.lineTo(-r, 0);
  ctx.lineTo(-r / 2, -r * root3 / 2);
  ctx.lineTo(r / 2, -r * root3 / 2);
  ctx.closePath()
  
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}
function drawPlateCrystal(cnvId, r, strokeColor, fillColor, lineWidth){
  const cnv = $(cnvId);
  const ctx = cnv.getContext('2d');
  const root3 = Math.sqrt(3);

  ctx.save();
  
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;
  ctx.lineWidth = lineWidth;

  ctx.translate(cnv.width / 2, cnv.height / 2);
  
  ctx.beginPath();
  ctx.moveTo(r / 2, 3 * (r * root3 / 2));
  ctx.lineTo(r, r * root3);
  ctx.lineTo(2 * r, 2 * (r * root3 / 2));
  ctx.lineTo(2.5 * r, (r * root3 / 2));
  ctx.lineTo(2 * r, 0);
  ctx.lineTo(2.5 * r, -(r * root3 / 2));
  ctx.lineTo(2 * r, -2 * (r * root3 / 2));
  ctx.lineTo(r, -r * root3);
  ctx.lineTo(r / 2, -3 * (r * root3 / 2));
  ctx.lineTo(-r / 2, -3 * (r * root3 / 2));
  ctx.lineTo(-r, -r * root3);
  ctx.lineTo(-2 * r, -2 * (r * root3 / 2));
  ctx.lineTo(-2.5 * r, -(r * root3 / 2));
  ctx.lineTo(-2 * r, 0);
  ctx.lineTo(-2.5 * r, (r * root3 / 2));
  ctx.lineTo(-2 * r, 2 * (r * root3 / 2));
  ctx.lineTo(-r, r * root3);
  ctx.lineTo(-r / 2, 3 * (r * root3 / 2));
  ctx.closePath()
  
  ctx.stroke();
  ctx.fill();
  ctx.restore();
}
function drawBackgroud(cnvId, BG_COLOR){
  const cnv = $(cnvId);
  const ctx = cnv.getContext('2d');
  ctx.save();
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, cnv.width, cnv.height);
  ctx.restore();
}
function drawRokkaCrystal(){
  const RADIUS = $('radiusRange').value;
  const LINE_WIDTH = $('lineWidthRange').value;
  const BG_COLOR = $('backGroundColorPick').value;
  const PLATE_STROKE = $('plateStrokeColorPick').value;
  const HEX_STROKE = $('hexStrokeColorPick').value;
  const SNOW_FILL = $('snowFillColorPick').value;
  drawBackgroud('canvas', BG_COLOR);
  drawPlateCrystal('canvas', RADIUS, PLATE_STROKE, SNOW_FILL, LINE_WIDTH);
  drawHexagon('canvas', RADIUS, HEX_STROKE, SNOW_FILL, LINE_WIDTH);
}
function setDefaultParameter(){
  $('radiusRange').value = '60';
  $('radiusRange').min = '10';
  $('radiusRange').max = '100';
  $('lineWidthRange').value = '20';
  $('lineWidthRange').min = '5';
  $('lineWidthRange').max = '50';
  $('backGroundColorPick').value = '#2C343F';
  $('plateStrokeColorPick').value = '#AAC8E0';
  $('hexStrokeColorPick').value = '#FCFFFF';
  $('snowFillColorPick').value = '#E1E6EA';
}
function defaultButtonCallback(){
  setDefaultParameter();
  drawRokkaCrystal();
}
function downloadButtonCallback(){
  const a = Object.assign(
  document.createElement('a'), {
      href: $('canvas').toDataURL('image.png', 1.0),
      download: 'RokkaCrystalImage.png'
  }
  );
  a.click();
}
function shareButtonCallback(){
  const RADIUS = $('radiusRange').value;
  const LINE_WIDTH = $('lineWidthRange').value;
  const BG_COLOR = $('backGroundColorPick').value.replace('#', '');
  const PLATE_STROKE = $('plateStrokeColorPick').value.replace('#', '');
  const HEX_STROKE = $('hexStrokeColorPick').value.replace('#', '');
  const SNOW_FILL = $('snowFillColorPick').value.replace('#', '');
  const params = (
  `${RADIUS}_${LINE_WIDTH}_${BG_COLOR}_${PLATE_STROKE}_${HEX_STROKE}_${SNOW_FILL}`
  );
  const currentRokkaUrl = Object.assign(
  new URL(window.location.href), {search: `${new URLSearchParams({params})}`}
  );
  navigator.clipboard.writeText(`${currentRokkaUrl}`);
  alert(`URLをクリップボードへコピーしました。\n${currentRokkaUrl}`);
}
