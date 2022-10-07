export type DayNumbers = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DayInventory = { [DayNumber in DayNumbers]: number };

export interface Category {
  _id?: string;
  name: string;
}

export interface Vendor {
  _id?: string;
  name: string;
  phone: string;
  email: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
  };
  category: Category;
  isCurrentVendor: boolean;
  product_ids: string[]; // PRODUCT ID's
}

export interface Product {
  _id?: string;
  houseName: string;
  orderName: string;
  unitType: string;
  inventoryOrderByDay: DayInventory;
  sort_id: number;
  category_id: string; // CATEGORY ID
  vendor_id: string; // VENDOR ID
}

export interface ProductOrder {
  product_id?: string; // PRODUCT ID
  houseName: string;
  orderName: string;
  quantity: number;
  sort_id: number;
}

export interface Order {
  _id?: string;
  category_id: string; // CATEGORY ID
  vendor_id: string; // VENDOR ID
  date: string;
  ordered: ProductOrder[];
}
