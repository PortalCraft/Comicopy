import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const numberFormatter = new Intl.NumberFormat("zh", {
  notation: 'compact',
  maximumFractionDigits: 2,
});

export const formatNumber = (number: number) => {
  return numberFormatter.format(number);
};