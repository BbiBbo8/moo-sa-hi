const convertDMSToDecimal = (degrees: string | number, minutes: string | number, seconds: string | number): number => {
    const d = Number(degrees);
    const m = Number(minutes);
    const s = Number(seconds);
  
    if (isNaN(d) || isNaN(m) || isNaN(s)) {
      throw new Error(`잘못된 좌표 값: ${degrees}°${minutes}'${seconds}"`);
    }
  
    return d + m / 60 + s / 3600;
  };
export default convertDMSToDecimal;