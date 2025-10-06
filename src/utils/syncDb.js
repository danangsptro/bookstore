const { sequelize, User, Book } = require('../models');
const bcrypt = require('bcrypt');

async function sync() {
  await sequelize.sync({ force: true });
  console.log('DB synced');

  const pass = await bcrypt.hash('password123', 10);
  await User.create({ email: 'admin@gmail.com', passwordHash: pass, role: 'admin', name: 'Admin' });
  await User.create({ email: 'cust@gmail.com', passwordHash: pass, role: 'customer', name: 'Customer' });

  await Book.bulkCreate([
    { title: 'Node.js Design Patterns', author: 'Mario Casciaro', price: 150000, stock: 10 },
    { title: "You Don't Know JS", author: 'Kyle Simpson', price: 90000, stock: 5 },
    { title: 'Clean Code', author: 'Robert C. Martin', price: 120000, stock: 0 }
  ]);

  console.log('Seeded data');
  process.exit(0);
}

sync().catch(e => { console.error(e); process.exit(1); });
