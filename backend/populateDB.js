const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

// Import models
const Customer = require("./models/customerSchema");
const Seller = require("./models/sellerSchema");
const Product = require("./models/productSchema");

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Sample data
const sampleSellers = [
    {
        name: "TechMart Electronics",
        email: "techmart@example.com",
        password: "password123",
        shopName: "TechMart"
    },
    {
        name: "Fashion Hub",
        email: "fashionhub@example.com", 
        password: "password123",
        shopName: "Fashion Hub"
    },
    {
        name: "Home Essentials",
        email: "homeessentials@example.com",
        password: "password123", 
        shopName: "Home Essentials"
    },
    {
        name: "Sports Central",
        email: "sportscentral@example.com",
        password: "password123",
        shopName: "Sports Central"
    },
    {
        name: "Book World",
        email: "bookworld@example.com",
        password: "password123",
        shopName: "Book World"
    },
    {
        name: "Beauty Corner",
        email: "beautycorner@example.com",
        password: "password123",
        shopName: "Beauty Corner"
    },
    {
        name: "Kitchen Kingdom",
        email: "kitchenkingdom@example.com",
        password: "password123",
        shopName: "Kitchen Kingdom"
    },
    {
        name: "Gadget Galaxy",
        email: "gadgetgalaxy@example.com",
        password: "password123",
        shopName: "Gadget Galaxy"
    }
];

const sampleProducts = [
    // Electronics
    {
        productName: "iPhone 15 Pro",
        price: { mrp: 129900, cost: 119900, discountPercent: 8 },
        subcategory: "Smartphones",
        productImage: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
        category: "Electronics",
        description: "Latest iPhone with advanced camera system and A17 Pro chip",
        tagline: "Pro. Beyond."
    },
    {
        productName: "Samsung Galaxy S24 Ultra",
        price: { mrp: 124999, cost: 114999, discountPercent: 8 },
        subcategory: "Smartphones", 
        productImage: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
        category: "Electronics",
        description: "Premium Android smartphone with S Pen and powerful cameras",
        tagline: "Galaxy AI is here"
    },
    {
        productName: "MacBook Pro 14-inch",
        price: { mrp: 199900, cost: 189900, discountPercent: 5 },
        subcategory: "Laptops",
        productImage: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
        category: "Electronics", 
        description: "Powerful laptop with M3 chip for professionals",
        tagline: "Supercharged for pros"
    },
    {
        productName: "Dell XPS 13",
        price: { mrp: 94990, cost: 89990, discountPercent: 5 },
        subcategory: "Laptops",
        productImage: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        category: "Electronics",
        description: "Ultra-portable laptop with InfinityEdge display",
        tagline: "Innovation that inspires"
    },
    {
        productName: "Sony WH-1000XM5",
        price: { mrp: 29990, cost: 24990, discountPercent: 17 },
        subcategory: "Audio",
        productImage: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500",
        category: "Electronics",
        description: "Industry-leading noise canceling headphones",
        tagline: "The best noise canceling"
    },
    {
        productName: "Apple AirPods Pro",
        price: { mrp: 24900, cost: 22900, discountPercent: 8 },
        subcategory: "Audio",
        productImage: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500",
        category: "Electronics",
        description: "Wireless earbuds with active noise cancellation",
        tagline: "Magic in your ears"
    },
    {
        productName: "Samsung 55-inch QLED TV",
        price: { mrp: 89990, cost: 79990, discountPercent: 11 },
        subcategory: "Television",
        productImage: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500",
        category: "Electronics",
        description: "4K QLED smart TV with vibrant colors",
        tagline: "See every detail"
    },
    {
        productName: "Canon EOS R5",
        price: { mrp: 349999, cost: 329999, discountPercent: 6 },
        subcategory: "Cameras",
        productImage: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500",
        category: "Electronics",
        description: "Professional mirrorless camera with 8K video",
        tagline: "Redefine your story"
    },

    // Fashion & Clothing
    {
        productName: "Levi's 501 Original Jeans",
        price: { mrp: 4999, cost: 3999, discountPercent: 20 },
        subcategory: "Men's Clothing",
        productImage: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        category: "Fashion",
        description: "Classic straight-fit jeans in premium denim",
        tagline: "The original"
    },
    {
        productName: "Nike Air Max 270",
        price: { mrp: 12995, cost: 9995, discountPercent: 23 },
        subcategory: "Footwear",
        productImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
        category: "Fashion",
        description: "Comfortable lifestyle shoes with Max Air unit",
        tagline: "Just Do It"
    },
    {
        productName: "Adidas Ultraboost 22",
        price: { mrp: 16999, cost: 13999, discountPercent: 18 },
        subcategory: "Footwear",
        productImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
        category: "Fashion",
        description: "Running shoes with boost technology",
        tagline: "Impossible is nothing"
    },
    {
        productName: "Zara Blazer",
        price: { mrp: 6999, cost: 5499, discountPercent: 21 },
        subcategory: "Women's Clothing",
        productImage: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
        category: "Fashion",
        description: "Elegant blazer for professional look",
        tagline: "Timeless elegance"
    },
    {
        productName: "H&M Summer Dress",
        price: { mrp: 2999, cost: 1999, discountPercent: 33 },
        subcategory: "Women's Clothing",
        productImage: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
        category: "Fashion",
        description: "Lightweight floral dress perfect for summer",
        tagline: "Fashion and quality"
    },
    {
        productName: "Ray-Ban Aviator Sunglasses",
        price: { mrp: 8999, cost: 7999, discountPercent: 11 },
        subcategory: "Accessories",
        productImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
        category: "Fashion",
        description: "Classic aviator sunglasses with UV protection",
        tagline: "Never hide"
    },

    // Home & Kitchen
    {
        productName: "Instant Pot Duo",
        price: { mrp: 12999, cost: 9999, discountPercent: 23 },
        subcategory: "Kitchen Appliances",
        productImage: "https://images.unsplash.com/photo-1574781330855-d0db0021a455?w=500",
        category: "Home & Kitchen",
        description: "7-in-1 electric pressure cooker",
        tagline: "Cook smart, live better"
    },
    {
        productName: "KitchenAid Stand Mixer",
        price: { mrp: 45999, cost: 39999, discountPercent: 13 },
        subcategory: "Kitchen Appliances",
        productImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
        category: "Home & Kitchen",
        description: "Professional-grade stand mixer for baking",
        tagline: "For the love of making"
    },
    {
        productName: "Dyson V15 Detect",
        price: { mrp: 65900, cost: 59900, discountPercent: 9 },
        subcategory: "Home Appliances",
        productImage: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500",
        category: "Home & Kitchen",
        description: "Cordless vacuum with laser dust detection",
        tagline: "Engineered for deeper cleaning"
    },
    {
        productName: "IKEA Sofa Set",
        price: { mrp: 49999, cost: 39999, discountPercent: 20 },
        subcategory: "Furniture",
        productImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
        category: "Home & Kitchen",
        description: "Modern 3-seater sofa with cushions",
        tagline: "The wonderful everyday"
    },
    {
        productName: "Philips Air Fryer",
        price: { mrp: 14999, cost: 11999, discountPercent: 20 },
        subcategory: "Kitchen Appliances",
        productImage: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=500",
        category: "Home & Kitchen",
        description: "Healthy cooking with little to no oil",
        tagline: "Innovation and you"
    },

    // Sports & Fitness
    {
        productName: "Yoga Mat Premium",
        price: { mrp: 2999, cost: 1999, discountPercent: 33 },
        subcategory: "Fitness Equipment",
        productImage: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
        category: "Sports & Fitness",
        description: "Non-slip yoga mat with extra thickness",
        tagline: "Find your balance"
    },
    {
        productName: "Dumbbells Set 20kg",
        price: { mrp: 8999, cost: 6999, discountPercent: 22 },
        subcategory: "Fitness Equipment",
        productImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
        category: "Sports & Fitness",
        description: "Adjustable dumbbell set for home gym",
        tagline: "Strength in every rep"
    },
    {
        productName: "Football - FIFA Approved",
        price: { mrp: 3499, cost: 2499, discountPercent: 29 },
        subcategory: "Sports Equipment",
        productImage: "https://images.unsplash.com/photo-1486365227551-f3f90034a57c?w=500",
        category: "Sports & Fitness",
        description: "Official FIFA approved football",
        tagline: "Play beautiful"
    },
    {
        productName: "Cricket Bat Professional",
        price: { mrp: 12999, cost: 9999, discountPercent: 23 },
        subcategory: "Sports Equipment",
        productImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=500",
        category: "Sports & Fitness",
        description: "Professional cricket bat made from English willow",
        tagline: "Play with passion"
    },

    // Books & Education
    {
        productName: "The Psychology of Money",
        price: { mrp: 399, cost: 299, discountPercent: 25 },
        subcategory: "Finance",
        productImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
        category: "Books",
        description: "Timeless lessons on wealth, greed, and happiness",
        tagline: "Money wisdom"
    },
    {
        productName: "Atomic Habits",
        price: { mrp: 599, cost: 449, discountPercent: 25 },
        subcategory: "Self Help",
        productImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
        category: "Books",
        description: "Easy & proven way to build good habits",
        tagline: "Small changes, remarkable results"
    },
    {
        productName: "Learn JavaScript",
        price: { mrp: 799, cost: 599, discountPercent: 25 },
        subcategory: "Programming",
        productImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
        category: "Books",
        description: "Complete guide to JavaScript programming",
        tagline: "Code your future"
    },

    // Beauty & Personal Care
    {
        productName: "Neutrogena Face Wash",
        price: { mrp: 299, cost: 249, discountPercent: 17 },
        subcategory: "Skincare",
        productImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500",
        category: "Beauty",
        description: "Deep clean foaming face wash",
        tagline: "Healthy skin starts here"
    },
    {
        productName: "L'Oreal Lipstick",
        price: { mrp: 899, cost: 699, discountPercent: 22 },
        subcategory: "Makeup",
        productImage: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500",
        category: "Beauty",
        description: "Long-lasting matte lipstick",
        tagline: "Because you're worth it"
    },
    {
        productName: "The Body Shop Body Butter",
        price: { mrp: 1299, cost: 999, discountPercent: 23 },
        subcategory: "Body Care",
        productImage: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500",
        category: "Beauty",
        description: "Moisturizing body butter with shea butter",
        tagline: "Enrich not exploit"
    },

    // Additional Electronics Products
    {
        productName: "iPad Air",
        price: { mrp: 59900, cost: 54900, discountPercent: 8 },
        subcategory: "Tablets",
        productImage: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
        category: "Electronics",
        description: "Powerful, colorful, and wonderfully thin",
        tagline: "Powerful. Colorful. Wonderful."
    },
    {
        productName: "Nintendo Switch",
        price: { mrp: 29999, cost: 27999, discountPercent: 7 },
        subcategory: "Gaming",
        productImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
        category: "Electronics",
        description: "Hybrid gaming console for home and portable gaming",
        tagline: "Play anywhere, anytime"
    },
    {
        productName: "Google Pixel 8",
        price: { mrp: 75999, cost: 69999, discountPercent: 8 },
        subcategory: "Smartphones",
        productImage: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        category: "Electronics",
        description: "AI-powered smartphone with amazing camera",
        tagline: "The helpful phone"
    },
    {
        productName: "JBL Bluetooth Speaker",
        price: { mrp: 7999, cost: 5999, discountPercent: 25 },
        subcategory: "Audio",
        productImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        category: "Electronics",
        description: "Portable waterproof Bluetooth speaker",
        tagline: "Dare to listen"
    },

    // Additional Fashion Products
    {
        productName: "Casio G-Shock Watch",
        price: { mrp: 8999, cost: 7499, discountPercent: 17 },
        subcategory: "Watches",
        productImage: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
        category: "Fashion",
        description: "Shock-resistant sports watch",
        tagline: "Shock the world"
    },
    {
        productName: "Leather Wallet",
        price: { mrp: 2999, cost: 1999, discountPercent: 33 },
        subcategory: "Accessories",
        productImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        category: "Fashion",
        description: "Genuine leather wallet with RFID protection",
        tagline: "Style meets security"
    },
    {
        productName: "Polo T-Shirt",
        price: { mrp: 2499, cost: 1899, discountPercent: 24 },
        subcategory: "Men's Clothing",
        productImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        category: "Fashion",
        description: "Classic polo shirt in premium cotton",
        tagline: "Timeless style"
    },

    // Additional Home Products
    {
        productName: "Ceramic Dinner Set",
        price: { mrp: 3999, cost: 2999, discountPercent: 25 },
        subcategory: "Dinnerware",
        productImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500",
        category: "Home & Kitchen",
        description: "24-piece ceramic dinner set for family",
        tagline: "Dine in style"
    },
    {
        productName: "LED Desk Lamp",
        price: { mrp: 2499, cost: 1899, discountPercent: 24 },
        subcategory: "Lighting",
        productImage: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
        category: "Home & Kitchen",
        description: "Adjustable LED desk lamp with USB charging",
        tagline: "Light up your workspace"
    },
    {
        productName: "Non-Stick Cookware Set",
        price: { mrp: 6999, cost: 4999, discountPercent: 29 },
        subcategory: "Cookware",
        productImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
        category: "Home & Kitchen",
        description: "5-piece non-stick cookware set",
        tagline: "Cook with confidence"
    },

    // Additional Sports Products
    {
        productName: "Tennis Racket Pro",
        price: { mrp: 15999, cost: 12999, discountPercent: 19 },
        subcategory: "Sports Equipment",
        productImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500",
        category: "Sports & Fitness",
        description: "Professional tennis racket with graphite frame",
        tagline: "Serve your best"
    },
    {
        productName: "Swim Goggles",
        price: { mrp: 1999, cost: 1299, discountPercent: 35 },
        subcategory: "Swimming",
        productImage: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=500",
        category: "Sports & Fitness",
        description: "Anti-fog swimming goggles with UV protection",
        tagline: "See clearly underwater"
    },
    {
        productName: "Basketball Official Size",
        price: { mrp: 2999, cost: 2299, discountPercent: 23 },
        subcategory: "Sports Equipment",
        productImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500",
        category: "Sports & Fitness",
        description: "Official size basketball for indoor/outdoor",
        tagline: "Shoot for greatness"
    },

    // Additional Books
    {
        productName: "Rich Dad Poor Dad",
        price: { mrp: 450, cost: 350, discountPercent: 22 },
        subcategory: "Finance",
        productImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
        category: "Books",
        description: "What the rich teach their kids about money",
        tagline: "Financial education"
    },
    {
        productName: "Think and Grow Rich",
        price: { mrp: 399, cost: 299, discountPercent: 25 },
        subcategory: "Self Help",
        productImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
        category: "Books",
        description: "The landmark bestseller on wealth mindset",
        tagline: "Success principles"
    },
    {
        productName: "Clean Code",
        price: { mrp: 1299, cost: 999, discountPercent: 23 },
        subcategory: "Programming",
        productImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
        category: "Books",
        description: "A handbook of agile software craftsmanship",
        tagline: "Write better code"
    },

    // Additional Beauty Products
    {
        productName: "Vitamin C Serum",
        price: { mrp: 1999, cost: 1499, discountPercent: 25 },
        subcategory: "Skincare",
        productImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500",
        category: "Beauty",
        description: "Anti-aging vitamin C serum for glowing skin",
        tagline: "Glow naturally"
    },
    {
        productName: "Hair Straightener",
        price: { mrp: 3999, cost: 2999, discountPercent: 25 },
        subcategory: "Hair Care",
        productImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500",
        category: "Beauty",
        description: "Ceramic hair straightener with temperature control",
        tagline: "Straighten your style"
    },
    {
        productName: "Face Mask Set",
        price: { mrp: 899, cost: 699, discountPercent: 22 },
        subcategory: "Skincare",
        productImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500",
        category: "Beauty",
        description: "Hydrating face mask set for all skin types",
        tagline: "Pamper your skin"
    },

    // Additional Miscellaneous Products
    {
        productName: "Backpack Travel",
        price: { mrp: 4999, cost: 3499, discountPercent: 30 },
        subcategory: "Bags",
        productImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        category: "Fashion",
        description: "Durable travel backpack with laptop compartment",
        tagline: "Adventure awaits"
    },
    {
        productName: "Coffee Maker",
        price: { mrp: 8999, cost: 6999, discountPercent: 22 },
        subcategory: "Kitchen Appliances",
        productImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
        category: "Home & Kitchen",
        description: "Automatic drip coffee maker with timer",
        tagline: "Perfect brew every time"
    },
    {
        productName: "Protein Powder",
        price: { mrp: 3999, cost: 2999, discountPercent: 25 },
        subcategory: "Supplements",
        productImage: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=500",
        category: "Sports & Fitness",
        description: "Whey protein powder for muscle building",
        tagline: "Fuel your gains"
    },
    {
        productName: "Essential Oils Set",
        price: { mrp: 2499, cost: 1899, discountPercent: 24 },
        subcategory: "Aromatherapy",
        productImage: "https://images.unsplash.com/photo-1581101767113-1677fc7aadf2?w=500",
        category: "Beauty",
        description: "Set of 6 pure essential oils for aromatherapy",
        tagline: "Nature's wellness"
    }
];

async function populateDatabase() {
    try {
        // Clear existing data
        console.log("Clearing existing data...");
        await Customer.deleteMany({});
        await Seller.deleteMany({});
        await Product.deleteMany({});

        // Create sellers
        console.log("Creating sellers...");
        const sellers = [];
        for (let sellerData of sampleSellers) {
            const hashedPassword = await bcrypt.hash(sellerData.password, 10);
            const seller = new Seller({
                ...sellerData,
                password: hashedPassword
            });
            const savedSeller = await seller.save();
            sellers.push(savedSeller);
            console.log(`Created seller: ${seller.shopName}`);
        }

        // Create products and assign to random sellers
        console.log("Creating products...");
        for (let i = 0; i < sampleProducts.length; i++) {
            const productData = sampleProducts[i];
            const randomSeller = sellers[Math.floor(Math.random() * sellers.length)];
            
            const product = new Product({
                ...productData,
                seller: randomSeller._id,
                quantity: Math.floor(Math.random() * 50) + 10 // Random quantity between 10-60
            });
            
            await product.save();
            console.log(`Created product: ${product.productName} for seller: ${randomSeller.shopName}`);
        }

        // Create some sample customers
        console.log("Creating sample customers...");
        const sampleCustomers = [
            {
                name: "John Doe",
                email: "john@example.com",
                password: await bcrypt.hash("password123", 10)
            },
            {
                name: "Jane Smith", 
                email: "jane@example.com",
                password: await bcrypt.hash("password123", 10)
            },
            {
                name: "Mike Johnson",
                email: "mike@example.com", 
                password: await bcrypt.hash("password123", 10)
            }
        ];

        for (let customerData of sampleCustomers) {
            const customer = new Customer(customerData);
            await customer.save();
            console.log(`Created customer: ${customer.name}`);
        }

        console.log("\n✅ Database populated successfully!");
        console.log(`✅ Created ${sellers.length} sellers`);
        console.log(`✅ Created ${sampleProducts.length} products`);
        console.log(`✅ Created ${sampleCustomers.length} customers`);
        
        process.exit(0);
    } catch (error) {
        console.error("Error populating database:", error);
        process.exit(1);
    }
}

// Run the population script
populateDatabase();