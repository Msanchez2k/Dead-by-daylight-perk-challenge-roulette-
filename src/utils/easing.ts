/**
 * Implementación estándar de cubic-bezier (igual a la que usa el motor de CSS)
 * para poder calcular en JS, cuadro a cuadro, el mismo progreso que se ve en
 * pantalla — necesario para saber exactamente cuándo "pasa" cada ítem de la
 * ruleta y así disparar el sonido de tick en el momento correcto.
 */
export function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number) {
  const a = (v1: number, v2: number) => 1.0 - 3.0 * v2 + 3.0 * v1;
  const b = (v1: number, v2: number) => 3.0 * v2 - 6.0 * v1;
  const c = (v1: number) => 3.0 * v1;

  const calcBezier = (t: number, v1: number, v2: number) =>
    ((a(v1, v2) * t + b(v1, v2)) * t + c(v1)) * t;

  const calcSlope = (t: number, v1: number, v2: number) =>
    3.0 * a(v1, v2) * t * t + 2.0 * b(v1, v2) * t + c(v1);

  function getTForX(x: number): number {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const slope = calcSlope(t, p1x, p2x);
      if (slope === 0) return t;
      t -= (calcBezier(t, p1x, p2x) - x) / slope;
    }
    return t;
  }

  return (x: number): number => calcBezier(getTForX(x), p1y, p2y);
}
