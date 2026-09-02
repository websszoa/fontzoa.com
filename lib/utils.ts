import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type FontCatalogItem = {
  name: string;
  koreanName: string | null;
  website?: string[];
  weight: string;
  weightValue: number;
  className: string;
  file: string;
  type?: string[];
};

const weightLabels: Record<string, string> = {
  Thin: "THIN",
  ExtraLight: "EXTRA LIGHT",
  Light: "LIGHT",
  Regular: "REGULAR",
  Medium: "MEDIUM",
  SemiBold: "SEMI BOLD",
  Bold: "BOLD",
  ExtraBold: "EXTRA BOLD",
  Black: "BLACK",
  Heavy: "HEAVY",
  Thic: "THICK",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWeightLabel(weight: string) {
  return weightLabels[weight] ?? weight.toUpperCase();
}

export function getFontPreviewText(font: FontCatalogItem, sample: string) {
  if (font.koreanName === null) return font.name;

  return sample || font.koreanName;
}

export function getFontDisplayName(font: FontCatalogItem) {
  return font.koreanName ? `${font.koreanName} / ${font.name}` : font.name;
}
