export interface ICategory {
  id: number,
  name: string,
}

export interface IBrand {
  id: number,
  name: string,
}

export interface IImage {
  id: number,
  image_path: string,
}

export interface IProductVariant {
  id: number,
  product_id: number,
  name: string,
  sku: string,
  price: number,
  inventory: number,
  images: IImage[],
}

export interface IProduct {
  id: number,
  name: string,
  category: ICategory,
  brand: IBrand,
  description: string,
  product_variants: IProductVariant[],
}