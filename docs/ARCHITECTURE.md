# 🏛️ AIVIS — System Architecture & Design Blueprint

This document details the architectural principles, data flow, security model, multi-tenant isolation, and component interaction across **AIVIS**.

---

## 1. High-Level Architectural Diagram

```text
+-----------------------------------------------------------------------+
|                         PRESENTATION LAYER                            |
|  React 19 + TypeScript + White Claymorphic UI + Framer Motion         |
|  - Floating Glass Navigation Header & Collapsible Sidebar             |
|  - Ask AIVIS Conversational Drawer (Microsoft Security Copilot UI)   |
+----------------------------------- shadow-clay -----------------------+
                                    │
                                    │ HTTPS / REST / WebSockets
                                    ▼
+-----------------------------------------------------------------------+
|                           API GATEWAY                                 |
|  FastAPI (v6.0) + CORS + Rate Limiting + OpenAPI / Swagger Docs      |
+-----------------------------------------------------------------------+
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
+-------------------+      +-------------------+      +-------------------+
| SECURITY & AUTH   |      | FORENSICS ENGINE  |      | GRAPH ANALYTICS   |
| JWT Tokens        |      | OBD-II, CAN Bus,  |      | Neo4j SVG Canvas, |
| RBAC Governance   |      | ECU, EDR, OCR,    |      | PageRank, Louvain |
| Tenant Isolation  |      | Vision Damage     |      | Community Rings   |
+-------------------+      +-------------------+      +-------------------+
         │                          │                          │
         └──────────────────────────┼──────────────────────────┘
                                    │
                                    ▼
+-----------------------------------------------------------------------+
|                           DATA & PERSISTENCE                          |
|  - PostgreSQL 15: Normalized Relational Claims & User Records        |
|  - Redis 7: High-Speed Cache & Celery Background Task Queue           |
|  - Neo4j 5: Graph Database for Fraud Ring Topology & Entity Mining    |
+-----------------------------------------------------------------------+
```

---

## 2. Core Architectural Pillars

### 🔹 Clean Architecture & Separation of Concerns
1. **Presentation Layer (`frontend/src/pages/` & `components/`)**: Pure UI components rendered with White Claymorphism design system rules. Components contain zero direct database access; all interaction flows through typed API Client abstractions (`services/`).
2. **API & Service Layer (`backend/app/api/v1/`)**: FastAPI routers handling HTTP requests, input validation via Pydantic v2 schemas, and dependency injection for security contexts.
3. **Domain & Persistence Layer (`backend/app/models/`)**: SQLAlchemy ORM models enforcing relational integrity, foreign keys, and indexes in PostgreSQL.

### 🔹 Multi-Tenant Isolation Model
- **Company Tiering**: Insurance carriers (`companyId`) operate in logically isolated tenant partitions.
- **Role-Based Access Control (RBAC)**: Users are bound to specific roles (`SUPER_ADMIN`, `INSURANCE_ADMIN`, `LEAD_INVESTIGATOR`, `FIELD_INSPECTOR`, `AUDITOR`).
- **Data Scoping**: Claims, vehicles, and audit trails filter automatically based on user tenant context.

---

## 3. Data Ingestion & Analysis Pipelines

1. **OBD-II & CAN Bus Data Stream**: Raw ASC/BLF/PCAP CAN traces are parsed into structured 11-bit/29-bit CAN frames, decoded into signal telemetry (RPM, Speed, Steering Angle), and passed to the Cyber Attack Vector Detector.
2. **Cryptographic Evidence Vault Pipeline**: Digital evidence files (JPEG, PDF, RAW) calculate SHA-256, SHA-512, and MD5 hashes immediately upon ingestion. EXIF metadata headers extract camera serial numbers and GPS tags for verification.
3. **Multi-Agent AI Debate Pipeline**: 11 Specialized AI Agents evaluate evidence in parallel. The Multi-Agent Conflict Resolution Engine compares dissenting opinions, calculates evidence weight, and synthesizes a unified verdict.
4. **Knowledge Graph Pipeline**: Entities (Vehicles, Policyholders, Body Shops, Surveyors, Bank Accounts, Phone Numbers, IPs) are ingested into Neo4j graph nodes. PageRank and Louvain Modularity algorithms execute periodically to highlight organized fraud rings.
