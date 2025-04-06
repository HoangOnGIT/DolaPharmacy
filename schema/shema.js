const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Pharmacy E-commerce Database Schema",
  description:
    "Schema for a pharmaceutical e-commerce system with products, orders, and user management",
  type: "object",
  properties: {
    products: {
      type: "array",
      items: {
        type: "object",
        required: [
          "id",
          "name",
          "category",
          "basePrice",
          "status",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: { type: "string", description: "Unique product identifier" },
          name: { type: "string", description: "Product name" },
          category: { type: "string", description: "Product category slug" },
          categoryName: {
            type: "string",
            description: "Display name of category",
          },
          subCategory: { type: "string", description: "Sub-category slug" },
          sku: { type: "string", description: "Stock keeping unit" },
          requiresPrescription: {
            type: "boolean",
            description: "Whether product requires prescription",
          },
          basePrice: {
            type: "number",
            description: "Base price of the product",
          },
          salePrice: {
            type: "number",
            description: "Sale price if product is discounted",
          },
          cost: { type: "number", description: "Product cost price" },
          discountIds: { type: "array", items: { type: "string" } },
          supplierId: { type: "string", description: "Reference to supplier" },
          brand: { type: "string", description: "Brand name" },
          images: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                url: { type: "string" },
                alt: { type: "string" },
                isPrimary: { type: "boolean" },
                sortOrder: { type: "integer" },
              },
            },
          },
          variants: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                name: { type: "string" },
                sku: { type: "string" },
                price: { type: "number" },
                stock: { type: "integer" },
              },
            },
          },
          stock: {
            type: "object",
            properties: {
              total: { type: "integer" },
              reserved: { type: "integer" },
              available: { type: "integer" },
              lowStockThreshold: { type: "integer" },
              lastRestocked: { type: "string", format: "date-time" },
            },
          },
          description: { type: "string" },
          ingredients: { type: "string" },
          dosage: { type: "string" },
          warnings: { type: "string" },
          origin: { type: "string" },
          manufacturerName: { type: "string" },
          status: {
            type: "string",
            enum: ["active", "inactive", "out_of_stock", "discontinued"],
          },
          isFeatured: { type: "boolean" },
          isPopular: { type: "boolean" },
          averageRating: { type: "number" },
          reviewCount: { type: "integer" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
    suppliers: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "name", "createdAt", "updatedAt"],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          code: { type: "string" },
          contactName: { type: "string" },
          email: { type: "string", format: "email" },
          phone: { type: "string" },
          website: { type: "string", format: "uri" },
          paymentTerms: { type: "string" },
          minOrderValue: { type: "number" },
          leadTime: { type: "integer" },
          qualityRating: { type: "number" },
          reliabilityScore: { type: "number" },
          active: { type: "boolean" },
          notes: { type: "string" },
          taxId: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },

    categories: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "name", "isActive", "createdAt", "updatedAt"],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          parentId: { type: ["string", "null"] },
          image: { type: "string" },
          isActive: { type: "boolean" },
          displayOrder: { type: "integer" },
          metaTitle: { type: "string" },
          metaDescription: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
    users: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "email", "role", "createdAt", "updatedAt"],
        properties: {
          id: { type: "string" },
          email: { type: "string", format: "email" },
          passwordHash: { type: "string" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          phone: { type: "string" },
          dateOfBirth: { type: "string", format: "date" },
          role: {
            type: "string",
            enum: ["admin", "customer", "staff", "guest"],
          },
          verificationStatus: {
            type: "string",
            enum: ["unverified", "pending", "verified"],
          },
          lastLogin: { type: "string", format: "date-time" },
          addresses: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                type: { type: "string", enum: ["shipping", "billing"] },
                isPrimary: { type: "boolean" },
                firstName: { type: "string" },
                lastName: { type: "string" },
                street: { type: "string" },
                city: { type: "string" },
                state: { type: "string" },
                postalCode: { type: "string" },
                country: { type: "string" },
                phone: { type: "string" },
              },
            },
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
    orders: {
      type: "array",
      items: {
        type: "object",
        required: [
          "id",
          "orderNumber",
          "userId",
          "orderDate",
          "status",
          "total",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: { type: "string" },
          orderNumber: { type: "string" },
          userId: { type: "string" },
          orderDate: { type: "string", format: "date-time" },
          status: {
            type: "string",
            enum: [
              "pending",
              "processing",
              "shipped",
              "delivered",
              "cancelled",
              "refunded",
            ],
          },
          paymentStatus: {
            type: "string",
            enum: [
              "pending",
              "paid",
              "failed",
              "refunded",
              "partially_refunded",
            ],
          },
          paymentMethod: { type: "string" },
          paymentId: { type: "string" },

          subtotal: { type: "number" },
          shippingCost: { type: "number" },
          tax: { type: "number" },
          discountAmount: { type: "number" },
          discountCodes: { type: "array", items: { type: "string" } },
          total: { type: "number" },
          shippingAddress: {
            type: "object",
            properties: {
              firstName: { type: "string" },
              lastName: { type: "string" },
              street: { type: "string" },
              city: { type: "string" },
              state: { type: "string" },
              postalCode: { type: "string" },
              country: { type: "string" },
              phone: { type: "string" },
            },
          },
          billingAddress: {
            type: "object",
            properties: {
              firstName: { type: "string" },
              lastName: { type: "string" },
              street: { type: "string" },
              city: { type: "string" },
              state: { type: "string" },
              postalCode: { type: "string" },
              country: { type: "string" },
              phone: { type: "string" },
            },
          },
          shippingMethod: { type: "string" },
          estimatedDelivery: { type: "string", format: "date-time" },
          actualDelivery: { type: ["string", "null"], format: "date-time" },
          notes: { type: "string" },
          giftMessage: { type: ["string", "null"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
    orderItems: {
      type: "array",
      items: {
        type: "object",
        required: [
          "id",
          "orderId",
          "productId",
          "quantity",
          "unitPrice",
          "total",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: { type: "string" },
          orderId: { type: "string" },
          productId: { type: "string" },
          variantId: { type: ["string", "null"] },
          name: { type: "string" },
          sku: { type: "string" },
          quantity: { type: "integer", minimum: 1 },
          unitPrice: { type: "number" },
          subtotal: { type: "number" },
          discountAmount: { type: "number" },
          tax: { type: "number" },
          total: { type: "number" },
          requiresPrescription: { type: "boolean" },
          prescriptionId: { type: ["string", "null"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
    carts: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "status", "createdAt", "updatedAt"],
        properties: {
          id: { type: "string" },
          userId: { type: ["string", "null"] },
          guestId: { type: ["string", "null"] },
          status: {
            type: "string",
            enum: ["active", "abandoned", "converted"],
          },
          currency: { type: "string" },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                productId: { type: "string" },
                variantId: { type: ["string", "null"] },
                quantity: { type: "integer", minimum: 1 },
                dateAdded: { type: "string", format: "date-time" },
                prescriptionId: { type: ["string", "null"] },
              },
            },
          },
          appliedDiscounts: { type: "array", items: { type: "string" } },
          subtotal: { type: "number" },
          estimatedTax: { type: "number" },
          estimatedShipping: { type: "number" },
          estimatedTotal: { type: "number" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          expiresAt: { type: "string", format: "date-time" },
        },
      },
    },
    prescriptions: {
      type: "array",
      items: {
        type: "object",
        required: [
          "id",
          "userId",
          "referenceNumber",
          "status",
          "issueDate",
          "expiryDate",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: { type: "string" },
          userId: { type: "string" },
          referenceNumber: { type: "string" },
          status: {
            type: "string",
            enum: ["pending", "verified", "rejected", "expired"],
          },
          issueDate: { type: "string", format: "date-time" },
          expiryDate: { type: "string", format: "date-time" },
          doctorName: { type: "string" },
          doctorRegistrationNumber: { type: "string" },
          clinicName: { type: "string" },
          clinicAddress: { type: "string" },
          prescribedItems: {
            type: "array",
            items: {
              type: "object",
              properties: {
                productId: { type: "string" },
                name: { type: "string" },
                dosage: { type: "string" },
                quantity: { type: "integer" },
                repeats: { type: "integer" },
                notes: { type: "string" },
              },
            },
          },
          image: { type: "string" },
          verifiedBy: { type: "string" },
          verifiedAt: { type: "string", format: "date-time" },
          notes: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
    reviews: {
      type: "array",
      items: {
        type: "object",
        required: [
          "id",
          "userId",
          "productId",
          "rating",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: { type: "string" },
          userId: { type: "string" },
          productId: { type: "string" },
          orderId: { type: "string" },
          rating: { type: "integer", minimum: 1, maximum: 5 },
          title: { type: "string" },
          comment: { type: "string" },
          verifiedPurchase: { type: "boolean" },
          helpfulVotes: { type: "integer" },
          unhelpfulVotes: { type: "integer" },
          status: { type: "string", enum: ["pending", "approved", "rejected"] },
          moderationNotes: { type: ["string", "null"] },
          response: {
            type: ["object", "null"],
            properties: {
              author: { type: "string" },
              comment: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
            },
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
    discounts: {
      type: "array",
      items: {
        type: "object",
        required: [
          "id",
          "code",
          "name",
          "type",
          "value",
          "active",
          "createdAt",
          "updatedAt",
        ],
        properties: {
          id: { type: "string" },
          code: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
          type: {
            type: "string",
            enum: ["percentage", "fixed", "free_shipping", "buy_x_get_y"],
          },
          value: { type: "number" },
          minOrderAmount: { type: "number" },
          maxDiscountAmount: { type: "number" },
          applicableProducts: { type: ["string", "array"] },
          excludedProductIds: { type: "array", items: { type: "string" } },
          applicableCategories: { type: ["string", "array"] },
          userGroups: { type: "array", items: { type: "string" } },
          usageLimit: { type: "integer" },
          usageCount: { type: "integer" },
          perUserLimit: { type: "integer" },
          startDate: { type: "string", format: "date-time" },
          endDate: { type: ["string", "null"], format: "date-time" },
          active: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
    },
    wishlist: {
      type: "array",
      items: {
        type: "object",
        required: ["id", "userId", "createdAt", "updatedAt"],
        properties: {
          id: { type: "string" },
          userId: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                productId: { type: "string" },
                variantId: { type: ["string", "null"] },
                addedAt: { type: "string", format: "date-time" },
              },
            },
          },
        },
      },
    },
  },
  required: [
    "products",
    "suppliers",
    "categories",
    "users",
    "orders",
    "orderItems",
    "carts",
    "prescriptions",
    "reviews",
    "discounts",
    "wishlist",
  ],
};

export { schema };
