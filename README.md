# BarBook - Full Stack Order Management System

A modern full-stack application for managing orders with real-time analytics, built with Node.js, Express, SQLite, React, and TypeScript.

## 🚀 Tech Stack

- **Backend**: Node.js + Express + SQLite
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Testing**: Jest + Supertest
- **Configuration**: Environment variables (.env)

## 📁 Project Structure

```
barbook/
├── server/                 # Backend API
│   ├── index.js           # Express server
│   ├── database.js        # Database operations
│   ├── utils.ts           # Business logic
│   ├── types.ts           # TypeScript types
│   ├── seed.js            # Database seeding
│   ├── utils.test.ts      # Unit tests
│   └── integration.test.js # Integration tests
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── types.ts       # TypeScript types
│   │   └── api.ts         # API client
│   ├── package.json
│   └── vite.config.ts
├── package.json           # Root package.json
└── config.env            # Environment variables
```

## 🚀 Quick Start

**Want to get running immediately? Follow these steps:**

```bash
# 1. Install all dependencies
yarn install
cd client && yarn install && cd ..

# 2. Set up environment
cp config.env .env

# 3. Seed the database with sample data
yarn seed

# 4. Start both servers
yarn dev
```

**That's it!** 🎉 
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

---

## 🛠️ Detailed Installation & Setup

### Prerequisites
- Node.js (v20.14.0 or higher)
- Yarn package manager

### 1. Install Dependencies

```bash
# Install root dependencies (backend)
yarn install

# Install client dependencies (frontend)
cd client && yarn install && cd ..
```

### 2. Environment Configuration

Copy the environment configuration:
```bash
cp config.env .env
```

The default configuration:
```
PORT=3001
DB_PATH=./data.db
NODE_ENV=development
```

### 3. Database Setup

Seed the database with sample data:
```bash
yarn seed
```

This will create a SQLite database with 10 sample orders including MacBooks, iPhones, and other products.

### 4. Start Development Servers

```bash
# Start both backend and frontend in development mode
yarn dev
```

This will start:
- **Backend API server** on `http://localhost:3001`
- **Frontend React app** on `http://localhost:3000`

### 5. Verify Everything Works

1. Open http://localhost:3000 in your browser
2. You should see the BarBook dashboard with order summary
3. Try adding a new order using the form
4. Check the API directly at http://localhost:3001/api/health

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
yarn test

# Run tests in watch mode
yarn test:watch
```

### Integration Tests
```bash
# Run integration tests
yarn test server/integration.test.js
```

## 📊 API Endpoints

### GET /api/summary
Returns order summary statistics:
```json
{
  "totalRevenue": 3950,
  "medianOrderPrice": 300,
  "topProductByQty": "Laptop",
  "uniqueProductCount": 4
}
```

### GET /api/orders
Get orders with optional filtering and pagination:
- Query params: `product`, `limit`, `offset`
- Example: `/api/orders?product=Laptop&limit=10&offset=0`

### POST /api/orders
Create a new order:
```json
{
  "product": "MacBook Pro",
  "qty": 2,
  "price": 2499.99
}
```

### GET /api/health
Health check endpoint.

## 🎯 Features

### Backend Features
- ✅ RESTful API with Express.js
- ✅ SQLite database with proper schema
- ✅ Request logging middleware
- ✅ CORS enabled
- ✅ Input validation and error handling
- ✅ Comprehensive unit tests
- ✅ Integration tests with Supertest

### Frontend Features
- ✅ Modern React with TypeScript
- ✅ Custom hooks for API integration
- ✅ Real-time order summary dashboard
- ✅ Order creation form with validation
- ✅ Order listing with filtering and pagination
- ✅ Responsive design with Tailwind CSS
- ✅ Loading states and error handling

### Business Logic
- ✅ Order summarization with:
  - Total revenue calculation
  - Median order price
  - Top product by quantity
  - Unique product count
- ✅ Comprehensive test coverage for edge cases

## 🧮 Business Logic Implementation

The `summarizeOrders` function calculates:

1. **Total Revenue**: Sum of all `qty * price` values
2. **Median Order Price**: Median of all `qty * price` values
3. **Top Product by Quantity**: Product with highest total quantity
4. **Unique Product Count**: Number of distinct products

### Test Coverage
- ✅ Empty orders array
- ✅ Typical orders with multiple products
- ✅ Single order edge case
- ✅ Same product multiple times
- ✅ Zero quantity orders
- ✅ Negative price orders (refunds)

## 🚀 Production Deployment

### Build for Production
```bash
# Build the frontend
yarn client:build

# Start production server
yarn server:start
```

### Environment Variables
Set these in your production environment:
- `PORT`: Server port (default: 3001)
- `DB_PATH`: Database file path
- `NODE_ENV`: Environment (production/development)

## 📈 Performance Considerations

- SQLite database for lightweight data storage
- Pagination support for large order lists
- Efficient React hooks with proper dependency arrays
- Tailwind CSS for optimized styling

## 🔧 Development

### Adding New Features
1. Create TypeScript types in `server/types.ts` and `client/src/types.ts`
2. Implement backend logic in `server/utils.ts`
3. Add API endpoints in `server/index.js`
4. Create React components in `client/src/components/`
5. Add custom hooks in `client/src/hooks/`
6. Write tests for new functionality

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Jest for comprehensive testing
- Modular component architecture
- Custom hooks for reusable logic

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT in `config.env`
2. **Database connection issues**: Ensure SQLite file permissions
3. **Frontend build errors**: Check TypeScript compilation
4. **API connection issues**: Verify proxy configuration in `vite.config.ts`

### Debug Mode
```bash
# Run with debug logging
DEBUG=* yarn dev
```

## 📝 License

MIT License - feel free to use this project as a starting point for your own applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

---

**Happy Coding! 🎉**
