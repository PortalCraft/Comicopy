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

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/** 对象转FormData */
export const objectToFormData = (params: Record<string, any>) => {
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  return formData;
};

/** URL查询字符串转对象 */
export const queryStringToObject = (queryString: string) => {
  const urlParams = new URLSearchParams(queryString.split('?')[1]);
  const result: Record<string, any> = {};
  for (const [key, value] of urlParams) {
    result[key] = isNaN(Number(value)) ? value : Number(value);
  }
  return result;
}