# Multi-stage build for production
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the client
FROM base AS client-builder
WORKDIR /app
COPY client/package.json ./client/
COPY client/ ./client/
RUN cd client && yarn install --frozen-lockfile && yarn build

# Production image
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy built application
COPY --from=deps /app/node_modules ./node_modules
COPY --from=client-builder /app/client/dist ./client/dist
COPY server/ ./server/
COPY package.json ./

# Verify the build files exist
RUN ls -la ./client/dist/ || echo "Client dist directory not found"

# Create data directory and set permissions
RUN mkdir -p /app/data && chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["yarn", "server:start"]
