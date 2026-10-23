
export const initialProducts = [
  {
    id: "PRD-1001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    stock: 86,
    status: "Active"
  },
  {
    id: "PRD-1002",
    name: "Smart Watch Pro",
    category: "Electronics",
    price: 4999,
    stock: 12,
    status: "Active"
  },
  {
    id: "PRD-1003",
    name: "Everyday Backpack",
    category: "Accessories",
    price: 1599,
    stock: 0,
    status: "Out of Stock"
  },
  {
    id: "PRD-1004",
    name: "Cotton T-Shirt",
    category: "Fashion",
    price: 799,
    stock: 45,
    status: "Active"
  },
  {
    id: "PRD-1005",
    name: "Running Shoes",
    category: "Footwear",
    price: 3299,
    stock: 8,
    status: "Low Stock"
  }
];

export const initialOrders = [
  {
    id: "ORD-2001",
    customer: "Arun Kumar",
    date: "2026-10-20",
    total: 4999,
    status: "Delivered"
  },
  {
    id: "ORD-2002",
    customer: "Priya S",
    date: "2026-10-21",
    total: 2499,
    status: "Processing"
  },
  {
    id: "ORD-2003",
    customer: "Karthik R",
    date: "2026-10-21",
    total: 1599,
    status: "Pending"
  },
  {
    id: "ORD-2004",
    customer: "Divya M",
    date: "2026-10-22",
    total: 3299,
    status: "Cancelled"
  }
];

export const initialCustomers = [
  {
    id: "CUS-3001",
    name: "Arun Kumar",
    email: "arun@example.com",
    orders: 8,
    spent: 15490,
    status: "Active"
  },
  {
    id: "CUS-3002",
    name: "Priya S",
    email: "priya@example.com",
    orders: 5,
    spent: 9800,
    status: "Active"
  },
  {
    id: "CUS-3003",
    name: "Karthik R",
    email: "karthik@example.com",
    orders: 2,
    spent: 3200,
    status: "Inactive"
  },
  {
    id: "CUS-3004",
    name: "Divya M",
    email: "divya@example.com",
    orders: 6,
    spent: 12750,
    status: "Active"
  }
];
