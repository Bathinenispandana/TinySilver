export function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
