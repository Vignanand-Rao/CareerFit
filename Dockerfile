# Single-stage Multi-target Dockerfile
# Builds the React Frontend and serves both Frontend & FastAPI Backend from a single unified container!

# ── Stage 1: Build React Frontend ─────────────────────────────────────────────
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 2: Unified Python Server ───────────────────────────────────────────
FROM python:3.12-slim
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy built frontend assets
COPY --from=frontend-builder /app/dist ./dist

# Copy backend application
COPY backend ./backend

EXPOSE 8000

ENV PORT=8000
ENV ENVIRONMENT=production

CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
