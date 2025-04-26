// src/data/wheelchairs.js

export const wheelchairsData = [
  {
    ID_FAUT: 1,
    type: {
      ID_TYPE: 1,
      NOM_TYPE: "Manual Wheelchair Basic",
      category: "manual"
    },
    PRIX: 299.99,
    PROPULTION: 1,
    QT_STOCK: 10,
    DESCRIPTION: "Basic manual wheelchair for everyday use",
    NEW: true,
    image: "/images/wheelchairs/manual-basic.jpg",
    rating: 4.5,
    reviews: 128,
    options: [
      { NOM_OPTION: "Pliable", price_extra: 0 }
    ],
    specifications: {
      weight: "14 kg",
      maxWeight: "120 kg",
      width: "66 cm",
      foldedWidth: "28 cm"
    }
  },
  {
    ID_FAUT: 2,
    type: {
      ID_TYPE: 2,
      NOM_TYPE: "Electric Wheelchair Premium",
      category: "electric"
    },
    PRIX: 1499.99,
    PROPULTION: 2,
    QT_STOCK: 5,
    DESCRIPTION: "Advanced electric wheelchair with a long-lasting battery",
    BESTSELLER: true,
    image: "/images/wheelchairs/electric-premium.jpg",
    rating: 4.8,
    reviews: 256,
    options: [
      { NOM_OPTION: "Batterie longue durée", price_extra: 200 },
      { NOM_OPTION: "Commande joystick", price_extra: 150 }
    ],
    specifications: {
      weight: "25 kg",
      maxWeight: "150 kg",
      width: "70 cm",
      batteryLife: "20 hours"
    }
  },
  {
    ID_FAUT: 3,
    type: {
      ID_TYPE: 3,
      NOM_TYPE: "Sport Wheelchair Elite",
      category: "sport"
    },
    PRIX: 2499.99,
    PROPULTION: 3,
    QT_STOCK: 3,
    DESCRIPTION: "Lightweight sports wheelchair designed for competitive athletes",
    PROMO: true,
    image: "/images/wheelchairs/sport-elite.jpg",
    rating: 4.7,
    reviews: 98,
    options: [
      { NOM_OPTION: "Dossier réglable", price_extra: 100 },
      { NOM_OPTION: "Cadre ultra-léger", price_extra: 300 }
    ],
    specifications: {
      weight: "10 kg",
      maxWeight: "100 kg",
      width: "60 cm"
    }
  },
  {
    ID_FAUT: 4,
    type: {
      ID_TYPE: 4,
      NOM_TYPE: "All-Terrain Wheelchair",
      category: "manual"
    },
    PRIX: 1799.99,
    PROPULTION: 2,
    QT_STOCK: 7,
    DESCRIPTION: "Wheelchair built for off-road use with all-terrain tires",
    image: "/images/wheelchairs/all-terrain.jpg",
    rating: 4.6,
    reviews: 76,
    options: [
      { NOM_OPTION: "Roues tout-terrain", price_extra: 250 }
    ],
    specifications: {
      weight: "18 kg",
      maxWeight: "130 kg",
      width: "68 cm"
    }
  },
  {
    ID_FAUT: 5,
    type: {
      ID_TYPE: 1,
      NOM_TYPE: "Compact Manual Wheelchair",
      category: "manual"
    },
    PRIX: 399.99,
    PROPULTION: 1,
    QT_STOCK: 8,
    DESCRIPTION: "Compact manual wheelchair ideal for tight spaces and urban environments",
    NEW: true,
    image: "/images/wheelchairs/compact-manual.jpg",
    rating: 4.4,
    reviews: 112,
    options: [
      { NOM_OPTION: "Pliable", price_extra: 0 }
    ],
    specifications: {
      weight: "12 kg",
      maxWeight: "110 kg",
      width: "64 cm",
      foldedWidth: "26 cm"
    }
  },
  {
    ID_FAUT: 6,
    type: {
      ID_TYPE: 2,
      NOM_TYPE: "Electric Wheelchair Basic",
      category: "electric"
    },
    PRIX: 899.99,
    PROPULTION: 2,
    QT_STOCK: 6,
    DESCRIPTION: "Affordable electric wheelchair for those who need basic features",
    BESTSELLER: true,
    image: "/images/wheelchairs/electric-basic.jpg",
    rating: 4.3,
    reviews: 89,
    options: [
      { NOM_OPTION: "Commande joystick", price_extra: 100 }
    ],
    specifications: {
      weight: "22 kg",
      maxWeight: "140 kg",
      width: "72 cm",
      batteryLife: "10 hours"
    }
  },
  {
    ID_FAUT: 7,
    type: {
      ID_TYPE: 3,
      NOM_TYPE: "Sport Wheelchair Pro",
      category: "sport"
    },
    PRIX: 3299.99,
    PROPULTION: 3,
    QT_STOCK: 2,
    DESCRIPTION: "Premium sports wheelchair with custom-fit design for professionals",
    PROMO: true,
    image: "/images/wheelchairs/sport-pro.jpg",
    rating: 4.9,
    reviews: 45,
    options: [
      { NOM_OPTION: "Siège ergonomique", price_extra: 400 }
    ],
    specifications: {
      weight: "9 kg",
      maxWeight: "95 kg",
      width: "58 cm"
    }
  }
];

export const wheelchairCategories = [
  { id: 'manual', name: 'Manual Wheelchairs', count: 12 },
  { id: 'electric', name: 'Electric Wheelchairs', count: 8 },
  { id: 'sport', name: 'Sport Wheelchairs', count: 6 },
  { id: 'pediatric', name: 'Pediatric Wheelchairs', count: 4 },
  { id: 'bariatric', name: 'Bariatric Wheelchairs', count: 3 }
];

export const wheelchairFeatures = [
  { id: 'foldable', name: 'Foldable', count: 15 },
  { id: 'adjustable', name: 'Adjustable', count: 12 },
  { id: 'lightweight', name: 'Lightweight', count: 8 },
  { id: 'elevating', name: 'Elevating Leg Rests', count: 10 }
];
