export type CategorySlug = "phones" | "laptops" | "headsets" | "power-banks";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export interface Variant {
  name: string;
  hex: string;
  stage: string;
}

export interface Spec {
  k: string;
  v: string;
}

export interface GalleryFrame {
  label: string;
  note: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  tagline: string;
  description: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isHero?: boolean;
  specs: Spec[];
  variants: Variant[];
  storageOptions?: string[];
  frames: GalleryFrame[];
  reviews: Review[];
}
