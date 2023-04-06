export interface ICategoryCreate {
  name: string,
  image: string,
}
export interface ICategoryUpdate {
  name: string,
  image: string,
}
export interface ICategory extends ICategoryCreate {
  id: number,
}
export interface IBrandCreate {
  name: string,
}
export interface IBrandUpdate {
  name: string,
}
export interface IBrand extends IBrandCreate {
  id: number,
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

export interface IProductCreate {
  name: string,
  category_id: number | null,
  brand_id: number | null,
  description: string,
}

export interface IProductUpdate {
  name: string,
  category_id: number,
  brand_id: number,
  description: string,
}

export interface IProduct {
  id: number,
  name: string,
  category: ICategory,
  brand: IBrand,
  description: string,
  product_variants: IProductVariant[],
}

export interface IGetProductListParams {
  category_id?: number[],
  brand_id?: number[],
  keyword?: string,
  page?: number,
  size?: number,
}

export interface IGetCategoryParams {
  keyword?: string,
  skip?: number,
  limit?: number,
}

export interface IGetBrandParams {
  keyword?: string,
  skip?: number,
  limit?: number,
}
