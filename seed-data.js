const mongoose = require('mongoose');
require('dotenv').config();

// Define Product Schema (same as in server.js)
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true, enum: ['phones', 'laptops', 'earbuds', 'earphones', 'accessories'] },
    condition: { type: String, required: true, enum: ['working', 'not-working', 'for-parts'] },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    sellerName: { type: String, required: true },
    sellerEmail: { type: String, required: true },
    sellerPhone: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    images: [{ type: String }],
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'active', enum: ['active', 'sold', 'removed'] }
});

const Product = mongoose.model('Product', productSchema);

// Sample products with image URLs
const sampleProducts = [
    {
        title: 'iPhone 12 Pro - Screen Cracked But Functional',
        category: 'phones',
        condition: 'not-working',
        price: 299,
        description: 'iPhone 12 Pro with cracked screen but everything else works perfectly. Great camera, battery life still good. Perfect for repair or parts.',
        sellerName: 'Alex Thompson',
        sellerEmail: 'alex.t@example.com',
        sellerPhone: '555-0101',
        images: [
            'https://images.unsplash.com/photo-1603092434339-9a5b1d4c4b3a?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop'
        ],
        date: new Date('2024-01-20'),
        status: 'active'
    },
    {
        title: 'MacBook Air 2020 - Perfect Condition',
        category: 'laptops',
        condition: 'working',
        price: 699,
        description: 'MacBook Air 2020 with M1 chip, 8GB RAM, 256GB SSD. Excellent condition, barely used. Includes original charger and box.',
        sellerName: 'Sarah Chen',
        sellerEmail: 'sarah.chen@example.com',
        sellerPhone: '555-0102',
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'
        ],
        date: new Date('2024-01-19'),
        status: 'active'
    },
    {
        title: 'AirPods Pro - Left Earbud Not Working',
        category: 'earbuds',
        condition: 'not-working',
        price: 89,
        description: 'AirPods Pro where the right earbud works perfectly but left earbud needs repair. Charging case and both earbuds included.',
        sellerName: 'Mike Rodriguez',
        sellerEmail: 'mike.r@example.com',
        sellerPhone: '555-0103',
        images: [
            'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=300&fit=crop'
        ],
        date: new Date('2024-01-18'),
        status: 'active'
    },
    {
        title: 'Samsung Galaxy S21 - Like New',
        category: 'phones',
        condition: 'working',
        price: 449,
        description: 'Samsung Galaxy S21 in excellent condition. No scratches, battery health at 95%. Comes with original box, charger, and case.',
        sellerName: 'Emily Watson',
        sellerEmail: 'emily.w@example.com',
        sellerPhone: '555-0104',
        images: [
            'https://images.unsplash.com/photo-1610945415295-d9bbf067e597?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=300&fit=crop'
        ],
        date: new Date('2024-01-17'),
        status: 'active'
    },
    {
        title: 'Dell XPS 13 - For Parts Only',
        category: 'laptops',
        condition: 'for-parts',
        price: 125,
        description: 'Dell XPS 13 with broken screen but excellent motherboard, RAM, and SSD. Great for parts or repair project.',
        sellerName: 'David Kim',
        sellerEmail: 'david.kim@example.com',
        sellerPhone: '555-0105',
        images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop'
        ],
        date: new Date('2024-01-16'),
        status: 'active'
    },
    {
        title: 'Sony WH-1000XM4 - Battery Dead',
        category: 'earphones',
        condition: 'not-working',
        price: 149,
        description: 'Sony WH-1000XM4 headphones with dead battery but perfect sound quality when used with cable. All accessories included.',
        sellerName: 'Lisa Anderson',
        sellerEmail: 'lisa.a@example.com',
        sellerPhone: '555-0106',
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
        ],
        date: new Date('2024-01-15'),
        status: 'active'
    },
    {
        title: 'iPad Air 4 - Small Crack on Corner',
        category: 'phones',
        condition: 'working',
        price: 379,
        description: 'iPad Air 4 with small crack on corner but screen fully functional. 64GB, Wi-Fi only. Includes Apple Pencil and case.',
        sellerName: 'James Miller',
        sellerEmail: 'james.m@example.com',
        sellerPhone: '555-0107',
        images: [
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1616348416267-5c5571e4c223?w=400&h=300&fit=crop'
        ],
        date: new Date('2024-01-14'),
        status: 'active'
    },
    {
        title: 'JBL Flip 5 - No Sound',
        category: 'accessories',
        condition: 'for-parts',
        price: 25,
        description: 'JBL Flip 5 Bluetooth speaker that powers on but produces no sound. Good for parts or repair.',
        sellerName: 'Tom Wilson',
        sellerEmail: 'tom.w@example.com',
        sellerPhone: '555-0108',
        images: [
            'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
        ],
        date: new Date('2024-01-13'),
        status: 'active'
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/electronics-marketplace');
        console.log('Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products');

        // Insert sample products
        const insertedProducts = await Product.insertMany(sampleProducts);
        console.log(`Inserted ${insertedProducts.length} sample products`);

        // Display inserted products
        insertedProducts.forEach((product, index) => {
            console.log(`${index + 1}. ${product.title} - $${product.price} (${product.condition})`);
        });

        mongoose.connection.close();
        console.log('Database seeding completed!');
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeding function
seedDatabase();
