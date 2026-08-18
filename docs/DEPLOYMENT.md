# 🚀 AIVIS — Production Deployment Guide

This document outlines production deployment strategies for **AIVIS**, including Kubernetes cluster setup, SSL/TLS termination, Horizontal Pod Autoscaling (HPA), and CI/CD pipelines.

---

## 📦 Containerization & Docker Builds

AIVIS features multi-stage production Dockerfiles for minimal image footprint:

- **Frontend Container (`frontend/Dockerfile`)**: Multi-stage build using `node:20-alpine` for Vite compilation, served via `nginx:alpine` on port 80.
- **Backend Container (`backend/Dockerfile`)**: Compact `python:3.11-slim` container running Uvicorn ASGI server behind Gunicorn workers.

---

## ☸️ Kubernetes Deployment Architecture

```text
                        [ Ingress Controller (TLS / SSL) ]
                                      │
                 ┌────────────────────┴────────────────────┐
                 ▼                                         ▼
   [ Frontend Deployment (Nginx) ]           [ Backend Deployment (FastAPI) ]
   - HPA: Min 3, Max 10 Pods                 - HPA: Min 4, Max 20 Pods
   - CPU Target: 70%                         - CPU Target: 75%
                 │                                         │
                 └────────────────────┬────────────────────┘
                                      ▼
             [ Database Cluster: PostgreSQL 15 / Redis / Neo4j 5 ]
```

### Sample Kubernetes Horizontal Pod Autoscaler (HPA)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: aivis-backend-hpa
  namespace: aivis-prod
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: aivis-backend
  minReplicas: 4
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 75
```

---

## 🔒 Production Hardening Checklist

1. **TLS / HTTPS Termination**: Enforce TLS 1.3 encryption at the Ingress controller with Let's Encrypt or enterprise PKI certificates.
2. **Secrets Management**: Inject database credentials, JWT secrets, and API keys via AWS Secrets Manager or HashiCorp Vault.
3. **Database Backup & Disaster Recovery**:
   - PostgreSQL point-in-time recovery (PITR) with automated hourly WAL archiving.
   - Neo4j graph data volume snapshots saved to S3 bucket every 6 hours.
4. **CORS Restrictions**: Set explicit backend allowed origins to enterprise domain only.
