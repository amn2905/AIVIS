# ⚡ AIVIS — Installation & Setup Guide

This guide details the step-by-step installation instructions for setting up **AIVIS** in a local development or staging environment.

---

## 📋 Prerequisites

Before starting, ensure your environment meets the following software requirements:

- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **Python**: `v3.11.x`
- **Docker & Docker Compose**: `v24.x`+ (For containerized setup)
- **Git**: `v2.x`

---

## 🐳 Deployment Option A: Docker Compose (Recommended)

The simplest way to run the entire platform (Frontend, Backend, PostgreSQL, Redis, Neo4j) is using Docker Compose.

```bash
# 1. Clone repository
git clone https://github.com/aivis/aivis.git
cd aivis

# 2. Build and launch all services
docker compose up -d --build

# 3. Verify running containers
docker compose ps
```

### Access URLs:
- **Frontend Application**: `http://localhost:3000`
- **FastAPI REST API Docs**: `http://localhost:8000/docs`
- **Neo4j Graph Browser**: `http://localhost:7474`

---

## 💻 Deployment Option B: Manual Local Development

### 1. Frontend Setup (`frontend/`)

```bash
cd frontend

# Install Node dependencies
npm install

# Start Vite local dev server
npm run dev
```
The frontend will start at `http://localhost:3000/`.

### 2. Backend Setup (`backend/`)

```bash
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows PowerShell:
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Launch FastAPI application
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
The FastAPI backend server will start at `http://localhost:8000/`.

---

## 🔑 Environment Variables Configuration

### Backend Environment Variables (`backend/app/core/config.py`)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PROJECT_NAME` | `AIVIS Enterprise` | Platform Title |
| `API_V1_STR` | `/api/v1` | API Base Route Prefix |
| `SECRET_KEY` | `aivis_super_secret_jwt_key` | JWT Signing Key |
| `DATABASE_URL` | `postgresql://user:pass@localhost:5432/aivis_db` | Relational DB URL |
| `REDIS_URL` | `redis://localhost:6379/0` | Cache & Celery Queue |
| `NEO4J_URI` | `bolt://localhost:7687` | Knowledge Graph DB |

### Frontend Environment Variables (`frontend/.env`)

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | `http://localhost:8000/api/v1` | FastAPI Gateway Endpoint |
