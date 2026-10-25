import { useEffect, useRef } from 'react';

const BRUSH = 34; // scratch width in CSS pixels
const REVEAL_AT = 0.4; // fraction of foil scratched away before the rest clears

function paintFoil(canvas) {
  const { width, height } = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const foil = ctx.createLinearGradient(0, 0, width, height);
  foil.addColorStop(0, '#b8862f');
  foil.addColorStop(0.35, '#f6dc96');
  foil.addColorStop(0.6, '#c9973a');
  foil.addColorStop(1, '#f3d58a');
  ctx.fillStyle = foil;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = 'rgba(90, 40, 10, 0.75)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `${Math.round(width * 0.2)}px serif`;
  ctx.fillText('✦', width / 2, height * 0.42);
  ctx.font = `600 ${Math.max(10, Math.round(width * 0.11))}px Cormorant, serif`;
  ctx.fillText('SCRATCH', width / 2, height * 0.62);
}

function scratchedFraction(canvas) {
  const { data } = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
  let clear = 0;
  let total = 0;
  // Every 16th pixel's alpha is plenty for an estimate.
  for (let i = 3; i < data.length; i += 64) {
    total++;
    if (data[i] === 0) clear++;
  }
  return clear / total;
}

export default function ScratchCard({ label, value, revealed, onReveal }) {
  const canvasRef = useRef(null);
  const last = useRef(null);

  useEffect(() => {
    paintFoil(canvasRef.current);
  }, []);

  const scratch = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = BRUSH;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo((last.current ?? point).x, (last.current ?? point).y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    last.current = point;
  };

  const onPointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    last.current = null;
    scratch(event);
  };

  const onPointerMove = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) scratch(event);
  };

  const onPointerUp = () => {
    if (scratchedFraction(canvasRef.current) >= REVEAL_AT) onReveal();
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onReveal();
    }
  };

  return (
    <div className="scratch">
      <span className="scratch__label">{label}</span>
      <div
        className="scratch__card"
        data-revealed={revealed}
        {...(!revealed && {
          role: 'button',
          tabIndex: 0,
          'aria-label': `Reveal the ${label.toLowerCase()}`,
          onKeyDown,
        })}
      >
        <span className="scratch__value" aria-hidden={!revealed}>
          {value}
        </span>
        <canvas
          ref={canvasRef}
          className="scratch__foil"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        />
      </div>
    </div>
  );
}
