export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'pizza' | 'burger' | 'coffee' | 'sides' | 'desserts';
  image: string;
  variants: Variant[];
  addons: Addon[];
  popular?: boolean;
}

export interface Variant {
  id: string;
  name: string;
  priceModifier: number;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: Variant;
  selectedAddons: Addon[];
  notes?: string;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'completed';
  type: 'delivery' | 'takeaway' | 'dining';
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  notes?: string;
  isGift?: boolean;
  giftMessage?: string;
  time: string;
  createdAt: Date;
  kitchenNotes?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'manager' | 'waiter' | 'delivery' | 'chef' | 'cashier';
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  active: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed';
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

// Image URLs
export const IMAGES = {
  hero: 'https://image.qwenlm.ai/generated-images/7d4d0384-d7a3-466c-9c43-77ae235e355d/_result.png',
  categories: {
    pizza: 'https://image.qwenlm.ai/generated-images/185d3de5-c695-421c-9d54-663de07c3559/_result.png',
    burger: 'https://image.qwenlm.ai/generated-images/fb07c9cf-cc3a-4d76-9180-d538808602cb/_result.png',
    coffee: 'https://image.qwenlm.ai/generated-images/c186a140-16ae-4fea-9bc0-9ab7e4825642/_result.png',
    sides: 'https://image.qwenlm.ai/generated-images/be63d158-8040-4312-bcff-dff0495cef64/_result.png',
  },
  products: {
    margherita: 'https://image.qwenlm.ai/generated-images/339f9e76-1ee5-44a0-b19d-7ff8718fc215/_result.png',
    pepperoni: 'https://image.qwenlm.ai/generated-images/e3ea5d8b-40b8-4d15-8052-b1ef732b24c3/_result.png',
    burger: 'https://image.qwenlm.ai/generated-images/10363d38-096a-44e5-a018-53c7773f451d/_result.png',
    espresso: 'https://image.qwenlm.ai/generated-images/cff5c9a2-27ce-4a59-8d6a-1e89f3849506/_result.png',
  },
};

export const products: Product[] = [
  {
    id: 'p1', name: 'Margherita Pizza', description: 'Classic tomato sauce, fresh mozzarella, basil leaves on a crispy thin crust',
    price: 12.99, category: 'pizza', image: IMAGES.products.margherita,
    variants: [{ id: 'v1', name: 'Small (10")', priceModifier: 0 }, { id: 'v2', name: 'Medium (12")', priceModifier: 3 }, { id: 'v3', name: 'Large (14")', priceModifier: 5 }, { id: 'v4', name: 'Family (16")', priceModifier: 8 }],
    addons: [{ id: 'a1', name: 'Extra Cheese', price: 2 }, { id: 'a2', name: 'Mushrooms', price: 1.5 }, { id: 'a3', name: 'Olives', price: 1 }, { id: 'a4', name: 'Pepperoni', price: 2.5 }],
    popular: true,
  },
  {
    id: 'p2', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni slices, mozzarella cheese, and our signature tomato sauce',
    price: 14.99, category: 'pizza', image: IMAGES.products.pepperoni,
    variants: [{ id: 'v1', name: 'Small (10")', priceModifier: 0 }, { id: 'v2', name: 'Medium (12")', priceModifier: 3 }, { id: 'v3', name: 'Large (14")', priceModifier: 5 }],
    addons: [{ id: 'a1', name: 'Extra Cheese', price: 2 }, { id: 'a5', name: 'Jalapeños', price: 1 }, { id: 'a6', name: 'Onions', price: 0.75 }],
    popular: true,
  },
  {
    id: 'p3', name: 'BBQ Chicken Pizza', description: 'Grilled chicken, BBQ sauce, red onions, cilantro on a garlic butter crust',
    price: 15.99, category: 'pizza', image: IMAGES.products.margherita,
    variants: [{ id: 'v1', name: 'Small (10")', priceModifier: 0 }, { id: 'v2', name: 'Medium (12")', priceModifier: 3 }, { id: 'v3', name: 'Large (14")', priceModifier: 5 }],
    addons: [{ id: 'a1', name: 'Extra Cheese', price: 2 }, { id: 'a7', name: 'Bacon Bits', price: 2 }],
  },
  {
    id: 'p4', name: 'Classic Burger', description: 'Juicy beef patty, lettuce, tomato, pickles, and our special sauce',
    price: 9.99, category: 'burger', image: IMAGES.products.burger,
    variants: [{ id: 'v5', name: 'Single', priceModifier: 0 }, { id: 'v6', name: 'Double', priceModifier: 3 }, { id: 'v7', name: 'Triple', priceModifier: 5.5 }],
    addons: [{ id: 'a8', name: 'Extra Patty', price: 3.5 }, { id: 'a9', name: 'Bacon', price: 2 }, { id: 'a10', name: 'Avocado', price: 1.5 }, { id: 'a11', name: 'Fried Egg', price: 1 }],
    popular: true,
  },
  {
    id: 'p5', name: 'Chicken Burger', description: 'Crispy fried chicken breast, coleslaw, mayo, and pickles on a brioche bun',
    price: 10.99, category: 'burger', image: IMAGES.products.burger,
    variants: [{ id: 'v5', name: 'Regular', priceModifier: 0 }, { id: 'v8', name: 'Spicy', priceModifier: 0.5 }],
    addons: [{ id: 'a12', name: 'Extra Sauce', price: 0.5 }, { id: 'a13', name: 'Cheese Slice', price: 1 }, { id: 'a14', name: 'Jalapeños', price: 0.75 }],
  },
  {
    id: 'p6', name: 'Veggie Burger', description: 'Plant-based patty with grilled vegetables, hummus, and fresh greens',
    price: 11.49, category: 'burger', image: IMAGES.products.burger,
    variants: [{ id: 'v5', name: 'Regular', priceModifier: 0 }],
    addons: [{ id: 'a15', name: 'Guacamole', price: 2 }, { id: 'a16', name: 'Vegan Cheese', price: 1.5 }],
  },
  {
    id: 'p7', name: 'Espresso', description: 'Rich and bold single shot of our premium espresso blend',
    price: 3.49, category: 'coffee', image: IMAGES.products.espresso,
    variants: [{ id: 'v9', name: 'Single Shot', priceModifier: 0 }, { id: 'v10', name: 'Double Shot', priceModifier: 1.5 }],
    addons: [{ id: 'a17', name: 'Extra Shot', price: 1.5 }, { id: 'a18', name: 'Vanilla Syrup', price: 0.75 }, { id: 'a19', name: 'Caramel Syrup', price: 0.75 }],
    popular: true,
  },
  {
    id: 'p8', name: 'Cappuccino', description: 'Espresso with steamed milk and a thick layer of foam',
    price: 4.49, category: 'coffee', image: IMAGES.categories.coffee,
    variants: [{ id: 'v11', name: 'Regular', priceModifier: 0 }, { id: 'v12', name: 'Large', priceModifier: 1 }],
    addons: [{ id: 'a17', name: 'Extra Shot', price: 1.5 }, { id: 'a20', name: 'Oat Milk', price: 0.75 }, { id: 'a21', name: 'Hazelnut Syrup', price: 0.75 }],
  },
  {
    id: 'p9', name: 'Iced Latte', description: 'Smooth espresso over ice with cold milk, perfect for hot days',
    price: 4.99, category: 'coffee', image: IMAGES.categories.coffee,
    variants: [{ id: 'v11', name: 'Regular', priceModifier: 0 }, { id: 'v12', name: 'Large', priceModifier: 1 }],
    addons: [{ id: 'a17', name: 'Extra Shot', price: 1.5 }, { id: 'a22', name: 'Coconut Milk', price: 0.75 }, { id: 'a23', name: 'Mocha Syrup', price: 0.75 }],
  },
  {
    id: 'p10', name: 'French Fries', description: 'Crispy golden fries seasoned with sea salt',
    price: 3.99, category: 'sides', image: IMAGES.categories.sides,
    variants: [{ id: 'v13', name: 'Regular', priceModifier: 0 }, { id: 'v14', name: 'Large', priceModifier: 1.5 }],
    addons: [{ id: 'a24', name: 'Cheese Sauce', price: 1 }, { id: 'a25', name: 'Gravy', price: 1 }],
  },
  {
    id: 'p11', name: 'Garlic Bread', description: 'Toasted bread with garlic butter and herbs',
    price: 4.49, category: 'sides', image: IMAGES.categories.sides,
    variants: [{ id: 'v15', name: '4 Pieces', priceModifier: 0 }, { id: 'v16', name: '8 Pieces', priceModifier: 2.5 }],
    addons: [{ id: 'a1', name: 'Extra Cheese', price: 2 }],
  },
  {
    id: 'p12', name: 'Tiramisu', description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone',
    price: 6.99, category: 'desserts', image: IMAGES.categories.coffee,
    variants: [{ id: 'v17', name: 'Single', priceModifier: 0 }, { id: 'v18', name: 'Sharing (2)', priceModifier: 5 }],
    addons: [],
  },
];

export const sampleOrders: Order[] = [
  {
    id: 'ORD-001', items: [
      { product: products[0], quantity: 1, selectedVariant: products[0].variants[1], selectedAddons: [products[0].addons[0]], notes: 'Extra crispy crust', totalPrice: 17.99 },
      { product: products[6], quantity: 2, selectedVariant: products[6].variants[1], selectedAddons: [], notes: '', totalPrice: 9.98 },
    ],
    total: 27.97, status: 'preparing', type: 'delivery', customerName: 'Alex Johnson', customerPhone: '555-0201',
    deliveryAddress: '123 Oak Street, Apt 4B', notes: 'Ring the doorbell twice', isGift: false, time: 'ASAP',
    createdAt: new Date(Date.now() - 10 * 60000), kitchenNotes: 'Extra crispy crust for pizza, double shot for coffee',
  },
  {
    id: 'ORD-002', items: [
      { product: products[3], quantity: 2, selectedVariant: products[3].variants[1], selectedAddons: [products[3].addons[1]], notes: 'No pickles on one', totalPrice: 29.98 },
      { product: products[9], quantity: 1, selectedVariant: products[9].variants[1], selectedAddons: [products[9].addons[0]], notes: '', totalPrice: 6.49 },
    ],
    total: 36.47, status: 'pending', type: 'takeaway', customerName: 'Maria Garcia', customerPhone: '555-0202',
    notes: 'No pickles on one burger', isGift: false, time: '30 min',
    createdAt: new Date(Date.now() - 5 * 60000), kitchenNotes: 'No pickles on one burger',
  },
  {
    id: 'ORD-003', items: [
      { product: products[7], quantity: 1, selectedVariant: products[7].variants[0], selectedAddons: [products[7].addons[1]], notes: 'Oat milk please', totalPrice: 5.24 },
      { product: products[11], quantity: 1, selectedVariant: products[11].variants[0], selectedAddons: [], notes: '', totalPrice: 6.99 },
    ],
    total: 12.23, status: 'ready', type: 'dining', customerName: 'Table 5', customerPhone: '',
    notes: '', isGift: true, giftMessage: 'Happy Birthday!', time: 'ASAP',
    createdAt: new Date(Date.now() - 25 * 60000), kitchenNotes: 'Oat milk for cappuccino',
  },
  {
    id: 'ORD-004', items: [
      { product: products[1], quantity: 1, selectedVariant: products[1].variants[2], selectedAddons: [products[1].addons[0], products[1].addons[1]], notes: '', totalPrice: 23.49 },
    ],
    total: 23.49, status: 'delivered', type: 'delivery', customerName: 'David Lee', customerPhone: '555-0204',
    deliveryAddress: '789 Elm Road', notes: '', isGift: false, time: '45 min',
    createdAt: new Date(Date.now() - 60 * 60000),
  },
];

export const locations: Location[] = [
  { id: 'l1', name: 'Downtown Branch', address: '123 Main Street, Downtown', lat: 40.7128, lng: -74.006 },
  { id: 'l2', name: 'Uptown Branch', address: '456 Park Avenue, Uptown', lat: 40.7831, lng: -73.9712 },
  { id: 'l3', name: 'Westside Branch', address: '789 West Blvd, Westside', lat: 40.7489, lng: -73.9680 },
];
