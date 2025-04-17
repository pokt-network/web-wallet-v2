export function secondsToTimeString(seconds: number): string {
  let unit = seconds;

  if (unit < 120) {
    return `${seconds} seconds`;
  }
  unit /= 60;

  if (unit < 120) {
    return `${Math.round(unit)} minutes`;
  }
  unit /= 60;

  if (unit < 48) {
    return `${Math.round(unit)} hours`;
  }
  unit /= 24;

  if (unit < 14) {
    return `${Math.round(unit)} days`;
  }
  unit /= 7;

  if (unit < 52) {
    return `${Math.round(unit)} weeks`;
  }
  unit /= 52;

  return `${unit.toFixed(1)} years`;
}
