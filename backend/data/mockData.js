export const mockUsers = [
  {
    id: "u-101",
    name: "Alex Rivera",
    email: "alex.rivera@campus.edu",
    role: "student",
    studentId: "CS-2023-8841",
    department: "Computer Science",
    year: "3rd Year",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    phone: "+1 (555) 234-5678",
    whatsapp: "+15552345678",
    joinedDate: "2023-09-01"
  },
  {
    id: "u-102",
    name: "Sophia Chen",
    email: "sophia.chen@campus.edu",
    role: "student",
    studentId: "EE-2022-4910",
    department: "Electrical Engineering",
    year: "4th Year",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
    phone: "+1 (555) 876-5432",
    whatsapp: "+15558765432",
    joinedDate: "2022-09-01"
  },
  {
    id: "u-103",
    name: "Marcus Vance",
    email: "marcus.vance@campus.edu",
    role: "student",
    studentId: "BUS-2024-1120",
    department: "Business & Finance",
    year: "2nd Year",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    phone: "+1 (555) 345-6789",
    whatsapp: "+15553456789",
    joinedDate: "2024-09-01"
  },
  {
    id: "u-admin",
    name: "Prof. Sarah Jenkins",
    email: "admin.moderator@campus.edu",
    role: "admin",
    studentId: "FACULTY-001",
    department: "Student Affairs & Moderation",
    year: "Staff",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    phone: "+1 (555) 900-0000",
    joinedDate: "2020-01-15"
  }
];

export const mockCategories = [
  { id: "cat-1", name: "Textbooks & Notes", icon: "BookOpen", count: 14 },
  { id: "cat-2", name: "Electronics & Gadgets", icon: "Laptop", count: 18 },
  { id: "cat-3", name: "Dorm & Furniture", icon: "Home", count: 9 },
  { id: "cat-4", name: "Bicycles & Mobility", icon: "Bike", count: 6 },
  { id: "cat-5", name: "Lab & Study Supplies", icon: "Microscope", count: 11 },
  { id: "cat-6", name: "Fashion & Sports Gear", icon: "Shirt", count: 8 }
];

export const mockProducts = [
  {
    id: "prod-1",
    title: "Introduction to Algorithms (CLRS 4th Edition)",
    description: "Mint condition textbook used for CS301 last semester. Includes all solution bookmarks, no highlighting or missing pages. Essential for algorithms course!",
    price: 45,
    originalPrice: 95,
    category: "Textbooks & Notes",
    condition: "Like New",
    location: "Engineering Library / Science Block",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800"
    ],
    sellerId: "u-101",
    sellerName: "Alex Rivera",
    sellerDept: "Computer Science",
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    sellerPhone: "+1 (555) 234-5678",
    status: "approved",
    createdAt: "2026-09-18T10:30:00Z",
    views: 142,
    favorites: 12
  },
  {
    id: "prod-2",
    title: "Apple iPad Air M1 (64GB, Space Gray) + Apple Pencil 2",
    description: "Great for digital note-taking during lectures! Comes pre-installed with GoodNotes paper templates. Screen protector applied on day one. Includes original box and magnetic charger.",
    price: 340,
    originalPrice: 599,
    category: "Electronics & Gadgets",
    condition: "Good",
    location: "North Campus Dorm B",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&q=80&w=800"
    ],
    sellerId: "u-102",
    sellerName: "Sophia Chen",
    sellerDept: "Electrical Engineering",
    sellerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
    sellerPhone: "+1 (555) 876-5432",
    status: "approved",
    createdAt: "2026-09-17T14:15:00Z",
    views: 289,
    favorites: 34
  },
  {
    id: "prod-3",
    title: "Compact Dorm Mini Refrigerator (3.2 Cu. Ft.)",
    description: "Energy Star certified mini fridge with separate freezer compartment. Quiet compressor perfect for hostel rooms. Cleaned, defrosted, ready for pickup!",
    price: 85,
    originalPrice: 180,
    category: "Dorm & Furniture",
    condition: "Good",
    location: "West Hostel Quad - Room 304",
    images: [
      "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=800"
    ],
    sellerId: "u-103",
    sellerName: "Marcus Vance",
    sellerDept: "Business & Finance",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    sellerPhone: "+1 (555) 345-6789",
    status: "approved",
    createdAt: "2026-09-16T09:00:00Z",
    views: 198,
    favorites: 18
  },
  {
    id: "prod-4",
    title: "Trek FX 2 Hybrid Commuter Bicycle + Heavy U-Lock",
    description: "Lightweight aluminum frame bike for riding between main campus and sports complex. 21-speed Shimano gears, newly tuned brakes, includes heavy Kryptonite lock.",
    price: 160,
    originalPrice: 420,
    category: "Bicycles & Mobility",
    condition: "Good",
    location: "Student Center Bike Rack",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=800"
    ],
    sellerId: "u-101",
    sellerName: "Alex Rivera",
    sellerDept: "Computer Science",
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    sellerPhone: "+1 (555) 234-5678",
    status: "approved",
    createdAt: "2026-09-15T16:45:00Z",
    views: 310,
    favorites: 27
  },
  {
    id: "prod-5",
    title: "TI-84 Plus CE Graphing Calculator (Rose Gold)",
    description: "Approved for calculus, statistics, and SAT/ACT exams. Color backlit screen with rechargeable lithium-ion battery and slide case. Works perfectly.",
    price: 65,
    originalPrice: 135,
    category: "Lab & Study Supplies",
    condition: "Like New",
    location: "Math Department Building",
    images: [
      "https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48a?auto=format&fit=crop&q=80&w=800"
    ],
    sellerId: "u-102",
    sellerName: "Sophia Chen",
    sellerDept: "Electrical Engineering",
    sellerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
    sellerPhone: "+1 (555) 876-5432",
    status: "approved",
    createdAt: "2026-09-14T11:20:00Z",
    views: 95,
    favorites: 9
  },
  {
    id: "prod-6",
    title: "Ergonomic Desk Chair with Mesh Lumbar Support",
    description: "Adjustable armrests, 360 swivel, smooth rolling casters. Ideal for late night study sessions in dorm or apartment.",
    price: 50,
    originalPrice: 120,
    category: "Dorm & Furniture",
    condition: "Fair",
    location: "Campus Apartments Block 4",
    images: [
      "https://images.unsplash.com/photo-1580481072645-022f9a6d1276?auto=format&fit=crop&q=80&w=800"
    ],
    sellerId: "u-103",
    sellerName: "Marcus Vance",
    sellerDept: "Business & Finance",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    sellerPhone: "+1 (555) 345-6789",
    status: "approved",
    createdAt: "2026-09-13T08:30:00Z",
    views: 112,
    favorites: 7
  },
  {
    id: "prod-7",
    title: "Organic Chemistry Model Kit + Lab Safety Goggles",
    description: "Darling molecular model set for organic chemistry stereochemistry labs. Includes 150+ ball and stick pieces, quick bond tool, and UV anti-fog safety goggles.",
    price: 25,
    originalPrice: 55,
    category: "Lab & Study Supplies",
    condition: "New",
    location: "Chemistry Lab Annex",
    images: [
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800"
    ],
    sellerId: "u-101",
    sellerName: "Alex Rivera",
    sellerDept: "Computer Science",
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    sellerPhone: "+1 (555) 234-5678",
    status: "pending",
    createdAt: "2026-09-19T07:10:00Z",
    views: 14,
    favorites: 2
  },
  {
    id: "prod-8",
    title: "Keychron K2 Mechanical Keyboard (RGB, Gateron Red Switches)",
    description: "Compact 75% Bluetooth wireless mechanical keyboard. Mac/Windows keycaps included. Quiet linear switches, excellent condition!",
    price: 55,
    originalPrice: 99,
    category: "Electronics & Gadgets",
    condition: "Like New",
    location: "CS Lab 201",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800"
    ],
    sellerId: "u-102",
    sellerName: "Sophia Chen",
    sellerDept: "Electrical Engineering",
    sellerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
    sellerPhone: "+1 (555) 876-5432",
    status: "pending",
    createdAt: "2026-09-19T06:40:00Z",
    views: 8,
    favorites: 1
  }
];

export const mockReports = [
  {
    id: "rep-1",
    productId: "prod-6",
    productTitle: "Ergonomic Desk Chair with Mesh Lumbar Support",
    reportedBy: "Sophia Chen",
    reporterEmail: "sophia.chen@campus.edu",
    reason: "Incorrect condition description (armrest is loose)",
    createdAt: "2026-09-18T18:20:00Z",
    status: "pending"
  }
];
