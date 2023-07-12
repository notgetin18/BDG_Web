export default function ParseFloat(str: string | number, val: number): number {
  str = str.toString();
  str = str.slice(0, str.indexOf(".") + val + 1);
  return Number(str);
}
