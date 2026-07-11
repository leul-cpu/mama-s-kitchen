// Mama's Kitchen — Branch & Menu Data
// All data is real/verified only. Missing fields are intentionally omitted.

export interface Branch {
  id: string;
  name: string;
  nameAmharic: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  hours?: string;
  hasHours: boolean;
  hasPhone: boolean;
  slug: string;
  description: string;
  isLounge: boolean;
}

export const branches: Branch[] = [
  {
    id: "bole",
    name: "Mama's Kitchen | Bole Medhanialem",
    nameAmharic: "ማማስ ኪችን | ቦሌ መድኃኒኣለም",
    address: "XQWQ+72J, Addis Ababa, Ethiopia",
    lat: 8.9957,
    lng: 38.7875,
    phone: "+251 93 009 9356",
    hours: "Open 24 hours (all days)",
    hasHours: true,
    hasPhone: true,
    slug: "bole-medhanialem",
    description: "The original Mama's Kitchen. Open around the clock in the heart of Bole, serving generous portions of Ethiopian and international fare to anyone who walks through the door.",
    isLounge: false,
  },
  {
    id: "megenagna",
    name: "Mama's Kitchen | Megenagna",
    nameAmharic: "ማማስ ኪችን | መከኛኛ",
    address: "2R94+Q3M, Addis Ababa, Ethiopia",
    lat: 9.0196,
    lng: 38.8051,
    hasHours: false,
    hasPhone: false,
    slug: "megenagna",
    description: "Mama's presence at the busy Megenagna junction. A reliable spot for quick, satisfying meals in one of Addis's most vibrant commercial areas.",
    isLounge: false,
  },
  {
    id: "entoto",
    name: "Mama's Kitchen | Entoto",
    nameAmharic: "ማማስ ኪችን | አንጦጦ",
    address: "Unnamed Road, 3PFV+J7P, Addis Ababa, Ethiopia",
    lat: 9.0741,
    lng: 38.7432,
    hasHours: false,
    hasPhone: false,
    slug: "entoto",
    description: "Perched on the road to Entoto Park, this branch brings Mama's flavors to the northern highlands of the city. Popular with weekend visitors heading to the hills.",
    isLounge: false,
  },
  {
    id: "royal-lounge",
    name: "Royal Lounge by Mama's Kitchen",
    nameAmharic: "ሮያል ላውንጅ ባይ ማማስ ኪችን",
    address: "XQRF+M8F, Addis Ababa, Ethiopia",
    lat: 8.9917,
    lng: 38.7733,
    phone: "+251 91 122 2097",
    hasHours: false,
    hasPhone: true,
    slug: "royal-lounge",
    description: "Where the stage lights come on after ten. Royal Lounge is Mama's nightlife branch — live music, cocktails, and the full dinner menu served late into the evening.",
    isLounge: true,
  },
  {
    id: "mamas-inn",
    name: "Mama's Inn",
    nameAmharic: "ማማስ ኢን",
    address: "2Q6M+5XP, Unnamed Road, Addis Ababa, Ethiopia",
    lat: 9.0105,
    lng: 38.7849,
    phone: "+251 91 122 2099",
    hasHours: false,
    hasPhone: true,
    slug: "mamas-inn",
    description: "More than a restaurant — Mama's Inn is a combined hotel, restaurant, and bar. Rest, dine, and enjoy the same generous portions and warm service under one roof.",
    isLounge: false,
  },
];

export interface MenuItem {
  id: number;
  name: string;
  nameAmharic: string;
  description: string;
  category: string;
  priceRange?: string;
}

export const menuItems: MenuItem[] = [
  // Ethiopian Staples
  { id: 1, name: "Tibs", nameAmharic: "ጥብስ", description: "Sautéed beef cubes with peppers and onions", category: "Ethiopian Staples", priceRange: "ETB 200–400" },
  { id: 2, name: "Kitfo", nameAmharic: "ክትፎ", description: "Minced raw beef seasoned with mitmita and niter kibbeh", category: "Ethiopian Staples", priceRange: "ETB 300–500" },
  { id: 3, name: "Doro Wot", nameAmharic: "ዶሮ ወጥ", description: "Slow-cooked chicken in rich berbere sauce", category: "Ethiopian Staples", priceRange: "ETB 250–400" },
  { id: 4, name: "Shiro Wot", nameAmharic: "ሽሮ ወጥ", description: "Chickpea and broad bean powder stew with spices", category: "Ethiopian Staples", priceRange: "ETB 150–250" },
  { id: 5, name: "Kitfo Tibs", nameAmharic: "ክትፎ ጥብስ", description: "Sautéed kitfo-style beef with garlic and herbs", category: "Ethiopian Staples", priceRange: "ETB 300–500" },
  { id: 6, name: "Yebeg Wot", nameAmharic: "የበግ ወጥ", description: "Tender lamb stew in spiced berbere sauce", category: "Ethiopian Staples", priceRange: "ETB 350–500" },
  { id: 7, name: "Beyaynetu", nameAmharic: "በያይነቱ", description: "Vegan assortment of wots served on injera", category: "Ethiopian Staples", priceRange: "ETB 200–350" },
  { id: 8, name: "Fasolia", nameAmharic: "ፋሶሊያ", description: "Sautéed green beans with tomatoes and onions", category: "Ethiopian Staples", priceRange: "ETB 150–250" },
  { id: 9, name: "Gomen", nameAmharic: "ጎመን", description: "Collard greens cooked with garlic and spices", category: "Ethiopian Staples", priceRange: "ETB 150–250" },
  { id: 10, name: "Injera", nameAmharic: "እንጀራ", description: "Traditional Ethiopian flatbread, served fresh", category: "Ethiopian Staples", priceRange: "ETB 50–80" },

  // Western / International
  { id: 11, name: "Margherita Pizza", nameAmharic: "", description: "Classic tomato, mozzarella, and fresh basil", category: "Western & International", priceRange: "ETB 200–350" },
  { id: 12, name: "Spaghetti Bolognese", nameAmharic: "", description: "Pasta with rich meat sauce and parmesan", category: "Western & International", priceRange: "ETB 200–350" },
  { id: 13, name: "Beef Steak", nameAmharic: "", description: "Grilled steak, served with sides of your choice", category: "Western & International", priceRange: "ETB 400–700" },
  { id: 14, name: "Grilled Chicken", nameAmharic: "", description: "Whole chicken, marinated and flame-grilled", category: "Western & International", priceRange: "ETB 300–500" },
  { id: 15, name: "Fried Chicken", nameAmharic: "", description: "Crispy, golden, served with coleslaw and fries", category: "Western & International", priceRange: "ETB 200–350" },
  { id: 16, name: "Caesar Salad", nameAmharic: "", description: "Crisp romaine, croutons, parmesan, caesar dressing", category: "Western & International", priceRange: "ETB 150–250" },
  { id: 17, name: "Cheeseburger", nameAmharic: "", description: "Beef patty, cheddar, lettuce, tomato, house sauce", category: "Western & International", priceRange: "ETB 200–350" },
  { id: 18, name: "Fish & Chips", nameAmharic: "", description: "Battered fish fillet with crispy fries and tartar sauce", category: "Western & International", priceRange: "ETB 250–400" },

  // Drinks & Cocktails (Royal Lounge)
  { id: 19, name: "Tej (Honey Wine)", nameAmharic: "ጠጅ", description: "Traditional Ethiopian honey wine, sweet and smooth", category: "Drinks & Cocktails", priceRange: "ETB 100–250" },
  { id: 20, name: "St. George Beer", nameAmharic: "", description: "Ethiopia's classic lager, crisp and refreshing", category: "Drinks & Cocktails", priceRange: "ETB 60–120" },
  { id: 21, name: "House Cocktails", nameAmharic: "", description: "Rotating selection of signature cocktails at Royal Lounge", category: "Drinks & Cocktails", priceRange: "ETB 150–300" },
  { id: 22, name: "Fresh Juice", nameAmharic: "", description: "Mango, avocado, papaya — blended fresh to order", category: "Drinks & Cocktails", priceRange: "ETB 80–150" },
  { id: 23, name: "Ethiopian Coffee", nameAmharic: "ቡና", description: "Single-origin beans, brewed in the traditional way", category: "Drinks & Cocktails", priceRange: "ETB 50–120" },
];

export const galleryImages = [
  { id: 1, url: "/manus-storage/food-hero_f659107c.jpg", caption: "Traditional Ethiopian platter" },
  { id: 2, url: "/manus-storage/lounge-night_266234b3.jpg", caption: "Lounge atmosphere at night" },
  { id: 3, url: "/manus-storage/hero-banner_c23ef116.jpg", caption: "Interior dining experience" },
  { id: 4, url: "/manus-storage/menu-background_7f2f3d7b.jpg", caption: "Table setting" },
];
