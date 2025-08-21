enum Role {
  "USER" = "user",
  "ADMIN" = "admin",
}

interface Address {
  country: string;
  city: string;
  street: string;
  zip: string;
}

interface User {
  _id?: string
  fullName: string;
  emailAddress: string;
  role: Role;
  phoneNumber?: number;
  profileImage?: string;
  address?: Address;
}

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  productImage: string | File | CategoryImage;
  slug: string;
  manufacturer: string;
  categoryId: string;
  inStock: boolean;
}

interface CategoryImage {
  url: string;
  public_id;
}
interface Category {
  _id?: string
  name: string;
  description?: string;
  categoryImage?: string | File | CategoryImage;
}

interface Wishlist {
  user: User;
  products: Product[];
}

interface Review {
  user: User;
  rating: number;
  comment?: string;
}

interface Cart {
  items: Product[];
}

interface Order {
  user: User;
  items: Product[];
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELED";
  payment: "PENDING" | "PAID" | "REFUNDED";
  totalAmount: number;
  shippingAddress: Address;
}
