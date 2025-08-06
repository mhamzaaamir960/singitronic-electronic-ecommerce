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
  href: string;
}

interface RegisterUserType {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

interface LoginUserType {
  emailAddress: string;
  password: string;
}
