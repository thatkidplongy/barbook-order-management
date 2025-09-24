const { initDatabase, insertOrder } = require('./database');

const seedData = [
  { product: 'MacBook Pro', qty: 2, price: 2499.99 },
  { product: 'iPhone 15', qty: 5, price: 999.99 },
  { product: 'AirPods Pro', qty: 8, price: 249.99 },
  { product: 'iPad Air', qty: 3, price: 599.99 },
  { product: 'Apple Watch', qty: 4, price: 399.99 },
  { product: 'MacBook Pro', qty: 1, price: 2499.99 },
  { product: 'Magic Mouse', qty: 6, price: 79.99 },
  { product: 'Magic Keyboard', qty: 2, price: 99.99 },
  { product: 'Studio Display', qty: 1, price: 1599.99 },
  { product: 'iPhone 15', qty: 2, price: 999.99 }
];

async function seedDatabase() {
  try {
    console.log('Initializing database...');
    await initDatabase();
    
    console.log('Seeding database with sample data...');
    
    for (const order of seedData) {
      await insertOrder(order);
      console.log(`Inserted: ${order.product} x${order.qty} @ $${order.price}`);
    }
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
