import { faker } from "@faker-js/faker";
import fs from "fs/promises";

// Helper function to generate unique IDs
const generateId = () => faker.string.uuid();

// Generate pharmacy-specific categories
const generatePharmacyCategories = (count) => {
  // Define common pharmacy categories
  const mainCategories = [
    {
      name: "Prescription Medicines",
      description: "Medications that require a valid prescription",
    },
    {
      name: "Over-the-Counter Medicines",
      description: "Medications available without a prescription",
    },
    {
      name: "Vitamins & Supplements",
      description: "Nutritional supplements for health and wellness",
    },
    {
      name: "Personal Care",
      description: "Products for personal hygiene and care",
    },
    {
      name: "First Aid",
      description: "Essential first aid supplies and equipment",
    },
    {
      name: "Baby & Child Health",
      description: "Healthcare products for infants and children",
    },
    {
      name: "Mobility & Daily Living Aids",
      description: "Products to assist with mobility and daily tasks",
    },
    {
      name: "Skin Care",
      description: "Products for skin health and treatment",
    },
    {
      name: "Diabetic Care",
      description: "Supplies and medications for diabetes management",
    },
    {
      name: "Medical Devices",
      description: "Health monitoring and medical equipment",
    },
  ];

  const categories = [];

  for (let i = 0; i < count; i++) {
    const categoryData =
      i < mainCategories.length
        ? mainCategories[i]
        : {
            name: `${faker.commerce.productAdjective()} ${
              faker.science.chemicalElement().name
            }`,
            description: faker.lorem.sentence(),
          };

    const category = {
      id: generateId(),
      name: categoryData.name,
      description: categoryData.description,
      parentId:
        i > 5 && faker.datatype.boolean(0.3)
          ? categories[faker.number.int({ min: 0, max: 4 })].id
          : null,
      image: faker.image.url(),
      isActive: faker.datatype.boolean(0.9),
      displayOrder: i + 1,
      metaTitle: categoryData.name,
      metaDescription: categoryData.description.substring(0, 160),
      createdAt: faker.date.past({ years: 1 }).toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };

    categories.push(category);
  }

  return categories;
};

// Generate pharmaceutical suppliers
const generatePharmacySuppliers = (count) => {
  // Real-world inspired pharmaceutical suppliers
  const pharmaCompanyNames = [
    "MediPharm Labs",
    "HealthCure Pharmaceuticals",
    "VitaWell Supplies",
    "PharmaPlus Distribution",
    "MediCore Supply Co.",
    "WellCare Pharma",
    "GlobalHealth Industries",
    "PrimeMed Solutions",
    "EssentialRx Distributors",
    "MediTrust Supplies",
    "CarePlus Pharmaceuticals",
    "PharmaTech Industries",
  ];

  const suppliers = [];

  for (let i = 0; i < count; i++) {
    const supplier = {
      id: generateId(),
      name:
        i < pharmaCompanyNames.length
          ? pharmaCompanyNames[i]
          : `${faker.company.name()} Pharmaceuticals`,
      code: faker.string.alphanumeric(6).toUpperCase(),
      contactName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      paymentTerms: faker.helpers.arrayElement([
        "Net 30",
        "Net 60",
        "Net 90",
        "Immediate",
      ]),
      minOrderValue: faker.number.float({
        min: 500,
        max: 10000,
        precision: 0.01,
      }),
      leadTime: faker.number.int({ min: 2, max: 14 }),
      qualityRating: faker.number.float({ min: 3, max: 5, precision: 0.1 }),
      reliabilityScore: faker.number.float({ min: 3, max: 5, precision: 0.1 }),
      active: faker.datatype.boolean(0.9),
      notes: faker.lorem.paragraph(),
      taxId: faker.string.alphanumeric(10).toUpperCase(),
      createdAt: faker.date.past({ years: 1 }).toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };

    suppliers.push(supplier);
  }

  return suppliers;
};

// Update generatePharmacyDiscounts to set applicableProducts and excludedProductIds after products are created
const generatePharmacyDiscounts = (count, products) => {
  const discounts = [];

  const discountNames = [
    "First Prescription Discount",
    "Senior Citizen Special",
    "Healthcare Worker Appreciation",
    "Monthly Vitamin Sale",
    "Diabetes Care Bundle",
    "Allergy Season Relief",
    "Family Health Pack",
    "Loyalty Program Bonus",
    "New Customer Welcome Offer",
    "Flu Season Essentials",
    "Chronic Medication Discount",
    "Baby Care Bundle",
  ];

  for (let i = 0; i < count; i++) {
    const discountType = faker.helpers.arrayElement([
      "percentage",
      "fixed",
      "free_shipping",
      "buy_x_get_y",
    ]);
    const startDate = faker.date.past({ years: 1 });

    const discount = {
      id: generateId(),
      code: faker.string.alphanumeric(8).toUpperCase(),
      name:
        i < discountNames.length
          ? discountNames[i]
          : `${faker.commerce.productAdjective()} Health Savings`,
      description: faker.lorem.sentence(),
      type: discountType,
      value:
        discountType === "percentage"
          ? faker.number.int({ min: 5, max: 25 })
          : faker.number.float({ min: 5, max: 50, precision: 0.01 }),
      minOrderAmount: faker.number.float({
        min: 20,
        max: 200,
        precision: 0.01,
      }),
      maxDiscountAmount:
        discountType === "percentage"
          ? faker.number.float({ min: 50, max: 200, precision: 0.01 })
          : null,
      applicableProducts: [], // Set later
      excludedProductIds: [], // Set later
      applicableCategories: faker.datatype.boolean(0.7)
        ? "all"
        : Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
            generateId()
          ),
      userGroups: faker.datatype.boolean(0.6)
        ? []
        : [
            "seniors",
            "healthcare_workers",
            "chronic_patients",
            "new_customers",
          ],
      usageLimit: faker.number.int({ min: 50, max: 1000 }),
      usageCount: faker.number.int({ min: 0, max: 50 }),
      perUserLimit: faker.number.int({ min: 1, max: 5 }),
      startDate: startDate.toISOString(),
      endDate: faker.datatype.boolean(0.2)
        ? null
        : faker.date.future({ years: 1, refDate: startDate }).toISOString(),
      active: faker.datatype.boolean(0.8),
      createdAt: faker.date.past({ years: 1 }).toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };

    discounts.push(discount);
  }

  // Assign applicableProducts and excludedProductIds after products are created
  discounts.forEach((discount) => {
    if (faker.datatype.boolean(0.7)) {
      discount.applicableProducts = Array.from(
        { length: faker.number.int({ min: 1, max: 5 }) },
        () => {
          const product = faker.helpers.arrayElement(products);
          product.discountIds.push(discount.id); // Add discount to the product
          return product.id;
        }
      );
    }
    discount.excludedProductIds = Array.from(
      { length: faker.number.int({ min: 0, max: 3 }) },
      () => faker.helpers.arrayElement(products).id
    );
  });

  return discounts;
};

// Generate pharmacy users
const generatePharmacyUsers = (count) => {
  const users = [];

  for (let i = 0; i < count; i++) {
    // Admin should be a small percentage
    const role =
      i === 0
        ? "admin"
        : faker.helpers.arrayElement([
            "customer",
            "customer",
            "customer",
            "staff",
            "guest",
          ]);

    const user = {
      id: generateId(),
      email: faker.internet.email().toLowerCase(),
      passwordHash: faker.internet.password({ length: 64 }), // In real app would be a proper hash
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      dateOfBirth: faker.date
        .birthdate({ min: 18, max: 90, mode: "age" })
        .toISOString()
        .split("T")[0],
      role: role,
      verificationStatus:
        role === "admin" || role === "staff"
          ? "verified"
          : faker.helpers.arrayElement(["unverified", "pending", "verified"]),
      lastLogin: faker.date.recent().toISOString(),
      addresses: Array.from(
        { length: faker.number.int({ min: 1, max: 3 }) },
        () => ({
          id: generateId(),
          type: faker.helpers.arrayElement(["shipping", "billing"]),
          isPrimary: faker.datatype.boolean(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          postalCode: faker.location.zipCode(),
          country: faker.location.country(),
          phone: faker.phone.number(),
        })
      ),
      createdAt: faker.date.past({ years: 2 }).toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };

    users.push(user);
  }

  return users;
};

// Update generatePharmacyProducts to initialize discountIds
const generatePharmacyProducts = (count, categories, suppliers) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    const category = faker.helpers.arrayElement(categories);
    const supplier = faker.helpers.arrayElement(suppliers);

    const product = {
      id: generateId(),
      name: `${faker.commerce.productName()} ${faker.commerce.productMaterial()}`,
      category: category.id,
      categoryName: category.name,
      subCategory: faker.commerce.productMaterial(),
      sku: `PHARM-${faker.string.alphanumeric(6).toUpperCase()}`,
      requiresPrescription: faker.datatype.boolean(0.5),
      basePrice: faker.number.float({ min: 5, max: 100, precision: 0.01 }),
      salePrice: faker.datatype.boolean(0.3)
        ? faker.number.float({ min: 5, max: 100, precision: 0.01 })
        : null,
      cost: faker.number.float({ min: 3, max: 80, precision: 0.01 }),
      discountIds: [], // Initialize as empty array
      supplierId: supplier.id,
      brand: faker.company.name(),
      images: Array.from(
        { length: faker.number.int({ min: 1, max: 4 }) },
        (_, index) => ({
          id: generateId(),
          url: `https://picsum.photos/seed/${faker.number.int(1000)}/500/500`,
          alt: `${faker.commerce.productName()} - ${
            index === 0 ? "Product" : "Detail"
          } Image`,
          isPrimary: index === 0,
          sortOrder: index,
        })
      ),
      variants: Array.from(
        { length: faker.number.int({ min: 0, max: 2 }) },
        () => ({
          id: generateId(),
          name: `${faker.commerce.productMaterial()} Variant`,
          sku: `PHARM-${faker.string.alphanumeric(10).toUpperCase()}`,
          price: faker.number.float({ min: 5, max: 100, precision: 0.01 }),
          stock: faker.number.int({ min: 0, max: 100 }),
        })
      ),
      stock: {
        total: faker.number.int({ min: 10, max: 1000 }),
        reserved: faker.number.int({ min: 0, max: 10 }),
        available: faker.number.int({ min: 0, max: 990 }),
        lowStockThreshold: faker.number.int({ min: 5, max: 20 }),
        lastRestocked: faker.date.recent().toISOString(),
      },
      description: faker.lorem.paragraph(),
      ingredients: faker.lorem.words(5),
      dosage: faker.lorem.sentence(),
      warnings: faker.lorem.sentence(),
      origin: faker.location.country(),
      manufacturerName: supplier.name,
      status: faker.helpers.weightedArrayElement([
        { weight: 7, value: "active" },
        { weight: 1, value: "inactive" },
        { weight: 1, value: "out_of_stock" },
        { weight: 1, value: "discontinued" },
      ]),
      isFeatured: faker.datatype.boolean(0.2),
      isPopular: faker.datatype.boolean(0.3),
      averageRating: faker.number.float({ min: 3.5, max: 5, precision: 0.1 }),
      reviewCount: faker.number.int({ min: 0, max: 250 }),
      createdAt: faker.date.past({ years: 2 }).toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };

    products.push(product);
  }

  return products;
};

// Generate product-discount relationships
const generateProductDiscounts = (products, discounts) => {
  const productDiscounts = [];

  discounts.forEach((discount) => {
    // Add relationships for applicableProducts
    discount.applicableProducts.forEach((productId) => {
      productDiscounts.push({
        id: generateId(),
        productId,
        discountId: discount.id,
      });
    });

    // Add relationships for excludedProductIds
    discount.excludedProductIds.forEach((productId) => {
      productDiscounts.push({
        id: generateId(),
        productId,
        discountId: discount.id,
        excluded: true, // Mark as excluded
      });
    });
  });

  return productDiscounts;
};

// Generate orders and orderItems
const generateOrders = (count, users, products) => {
  const orders = [];
  const orderItems = [];

  for (let i = 0; i < count; i++) {
    const user = faker.helpers.arrayElement(
      users.filter((u) => u.role === "customer")
    );
    const orderId = generateId();
    const itemsCount = faker.number.int({ min: 1, max: 5 });

    const items = Array.from({ length: itemsCount }, () => {
      const product = faker.helpers.arrayElement(products);
      const quantity = faker.number.int({ min: 1, max: 5 });

      const orderItem = {
        id: generateId(),
        orderId,
        productId: product.id,
        productName: product.name,
        quantity,
        price: product.salePrice || product.basePrice,
        total: (quantity * (product.salePrice || product.basePrice)).toFixed(2),
      };

      orderItems.push(orderItem);
      return orderItem;
    });

    const order = {
      id: orderId,
      userId: user.id,
      items: items.map((item) => item.id),
      total: items
        .reduce((sum, item) => sum + parseFloat(item.total), 0)
        .toFixed(2),
      status: faker.helpers.arrayElement(["pending", "completed", "cancelled"]),
      createdAt: faker.date.past({ years: 1 }).toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    };

    orders.push(order);
  }

  return { orders, orderItems };
};

// Main function to generate all data
const generateData = async () => {
  const dbFilePath = "db.json";

  // Clear the db.json file before generating new data
  await fs.writeFile(dbFilePath, JSON.stringify({}, null, 2));

  const categories = generatePharmacyCategories(10);
  const suppliers = generatePharmacySuppliers(10);
  const users = generatePharmacyUsers(30);
  const products = generatePharmacyProducts(40, categories, suppliers);
  const discounts = generatePharmacyDiscounts(10, products);
  const productDiscounts = generateProductDiscounts(products, discounts);
  const { orders, orderItems } = generateOrders(20, users, products);

  console.log(productDiscounts);

  const data = {
    categories,
    suppliers,
    products,
    users,
    discounts,
    productDiscounts, // Add the join table
    orders,
    orderItems,
    carts: [],
    prescriptions: [],
    reviews: [],
    wishlist: [],
  };

  // Write to db.json
  await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2));
  console.log(
    "Pharmacy e-commerce data generation complete! Written to db.json"
  );
};

generateData().catch(console.error);
