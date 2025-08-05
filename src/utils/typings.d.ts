interface ProductType {
  id: string;
  title: string;
  price: number;
  rating: number;
  description: string;
  mainImage: string;
  slug: string;
  manufacturer: string;
  category: string;
  inStock: number;
}

interface CategoryType {
  name: string;
}


interface categoryMenuList {
  id: number;
  title: string;
  src: string;
  href: string
}
