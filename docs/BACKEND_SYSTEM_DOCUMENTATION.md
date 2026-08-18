# ⚙️ AIVIS Backend System — Architecture, Features, & Technical Novelty

This document provides a comprehensive, production-grade technical specification of the **AIVIS Backend System**. It explains how the backend works under the hood, details every subsystem feature, outlines the real-world application, and highlights the technical novelties that make AIVIS a state-of-the-art enterprise solution.

---

## 📌 1. Application Overview & Core Purpose

### 🎯 What is AIVIS?
**AIVIS (AI Vehicle Insurance Investigation System)** is an enterprise-grade SaaS backend platform built using **FastAPI (Python 3.11)**, **PostgreSQL 15**, **Redis 7**, and **Neo4j 5**. 

It is designed to solve the multi-billion-dollar global automotive insurance fraud problem. Traditional claims management relies on manual inspection, which fails to detect:
- Staged accidents & coordinated collisions
- Odometer rollback & ECU firmware tampering
- CAN Bus cyber manipulation & signal injection
- Cloned VINs & duplicate ghost insurance policies
- Organized fraud rings operating across body shops, surveyors, and policyholders
- Inflated repair bills & fraudulent damage claims

AIVIS automates vehicle digital forensics, multi-agent AI debates, knowledge graph mining, and OEM telematics integrations to produce **cryptographically vaulted, court-admissible investigation dossiers**.

---

## 🏗️ 2. How the Backend Works (Operational Mechanics)

```text
+-----------------------------------------------------------------------------------+
|                                 FASTAPI API GATEWAY                               |
|               (App Base Route: /api/v1 - Registered Routers: 45 Routes)           |
+-----------------------------------------------------------------------------------+
                                          │
    ┌─────────────────────────────────────┼─────────────────────────────────────┐
    ▼                                     ▼                                     ▼
[Security & Auth]               [Business Logic Services]               [Background Workers]
- OAuth2 + JWT (HMAC-SHA256)    - Forensic Processors                   - Celery Workers
- Sliding Refresh Sessions      - Multi-Agent AI Debate Engine          - Redis Task Queue
- RBAC Middleware (5 Roles)     - Graph Topology Miners                 - Async OCR & Vision
- CORS & Rate Limiter           - OEM Telematics Adapters               - Certificate Exporter
    │                                     │                                     │
    └─────────────────────────────────────┼─────────────────────────────────────┘
                                          │
                                          ▼
+-----------------------------------------------------------------------------------+
|                               PERSISTENCE TRIAD                                   |
|  1. PostgreSQL 15: Relational DB (SQLAlchemy 2.0 ORM) - Claims, Users, Vehicles    |
|  2. Redis 7: High-Speed Cache & Celery Message Broker - Sessions, Sliding Limits |
|  3. Neo4j 5: Graph Database - 15 Node Entity Types & Relationship Mining          |
+-----------------------------------------------------------------------------------+
```

### ⚙️ Core Technical Layers:

1. **Framework & Async Execution**:
   - Built on **FastAPI** leveraging Python's `asyncio` for non-blocking I/O operations.
   - Entrypoint located at [backend/app/main.py](file:///x:/AIVIS/backend/app/main.py) which initializes CORS, middlewares, health endpoints, and mounts 45 REST API endpoints under `/api/v1/`.

2. **Security & Authentication Subsystem**:
   - **OAuth2 with Password Bearer**: Ingests user credentials, verifies bcrypt password hashes, and issues short-lived JWT access tokens (15m) and long-lived refresh tokens.
   - **Role-Based Access Control (RBAC)**: Enforces 5 distinct roles (`SUPER_ADMIN`, `INSURANCE_ADMIN`, `LEAD_INVESTIGATOR`, `FIELD_INSPECTOR`, `AUDITOR`) via custom FastAPI dependency injection handlers.
   - **Multi-Tenant Scoping**: All queries automatically filter by `company_id` (Insurance Carrier Tenant) ensuring zero cross-tenant data leakage.

3. **Data Persistence Triad**:
   - **PostgreSQL 15 (Relational Core)**: Stores normalized relational data using SQLAlchemy 2.0 ORM. Handles user accounts, insurance company tenants, branch offices, vehicle registries, claim dossiers, evidence metadata, and audit logs.
   - **Redis 7 (In-Memory Cache & Queue)**: Stores JWT session tokens, sliding window rate limits (10,000 RPM/tenant), and serves as the message broker for Celery asynchronous task workers.
   - **Neo4j 5 (Knowledge Graph DB)**: Stores multi-relational entity graphs. Runs Cypher queries and graph algorithms (PageRank, Louvain Modularity) to detect organized syndicate rings.

---

## 🛠️ 3. Complete Feature Breakdown by Subsystem

### 🔹 Subsystem 1: Core Enterprise SaaS APIs (`/api/v1/auth`, `/claims`, `/vehicles`, `/companies`, `/users`)
- **Authentication**: JWT token generation, token refresh, current user profile retrieval.
- **Claim Investigations**: Full CRUD operations for claim dossiers, loss estimates, status tracking (`SUBMITTED`, `UNDER_REVIEW`, `FRAUD_SUSPECTED`, `FIELD_INVESTIGATION`, `APPROVED`, `REJECTED`), and forensic verdict submission.
- **Vehicle Registry**: VIN decoding, license plate lookup, engine number verification, stolen check status (`CLEAR`, `FLAGGED`, `PENDING`), and telematics summary.
- **Tenant & Branch Management**: Multi-tenant provisioning for insurance carriers and regional branch hierarchies.
- **Audit Logging**: Immutable logging of every system action (`userId`, `action`, `resource`, `ipAddress`, `timestamp`).

---

### 🔹 Subsystem 2: Vehicle Digital Forensics Engine APIs (`/api/v1/forensics/*`)
- **OBD-II Acquisition**: Ingests raw PIDs, Mode 09 VIN verification, ECU calibration hashes (CVN), and Diagnostic Trouble Codes (Active, Pending, Permanent DTCs).
- **Sensor Intelligence**: Analyzes 7 sensor categories (Engine, Electrical, Transmission, Chassis, Safety, Environmental, TPMS) calculating Anomaly Scores, Deviation %, and Multi-sensor Correlation rules.
- **CAN Bus Cyber Forensics**: Parses ASC/BLF/PCAP CAN traces, decodes 11-bit/29-bit CAN frame payloads, and detects cyber attack vectors (Replay, Signal Injection, Bus Flooding, Message Spoofing).
- **ECU Reflash Verification**: Audits ECU firmware version, SHA-256 calibration hash, stored vs chassis VIN matching, and reflash event counts.
- **EDR Black Box Crash Reconstruction**: Analyzes CDR crash logs, 5-second pre-crash telematics streams (Speed, Throttle, Steering, G-force), impact angle, airbag deployment sequence, and collision severity.
- **GPS & Telematics**: Replays GPX/JSON route points, vehicle stop durations, and calculates harsh braking/acceleration heatmaps.
- **Cryptographic Evidence Locker**: Computes SHA-256, SHA-512, MD5 hashes upon evidence upload, extracts EXIF camera metadata, GPS tags, and maintains an immutable chain of custody.
- **Document OCR & Damage Vision**: OCR text extraction for policy/invoice/police reports with font splicing detection; Computer Vision bounding boxes for vehicle damage classification and repair bill auditing.

---

### 🔹 Subsystem 3: Fraud Intelligence & Knowledge Graph APIs (`/api/v1/intelligence/*`)
- **Knowledge Graph Explorer**: Ingests 15 node types (Vehicle, Owner, Driver, Policy, Claim, Workshop, Surveyor, Investigator, Phone, Email, Bank Account, GPS, IP, Device, Document) into Neo4j graph topology.
- **Graph Mining Algorithms**:
  - **PageRank Centrality**: Ranks node influence to pinpoint mastermind orchestrators in fraud networks.
  - **Louvain Community Modularity**: Detects dense clusters representing organized staged collision syndicates.
  - **Shortest Path**: Traces hidden connection paths between suspect policyholders and fraudulent body shops.
- **VIN Cloning & Ghost Policies**: Cross-carrier registration audit, duplicate policy pings across state databases, and stolen vehicle re-registration flags.
- **Workshop & Surveyor Auditor**: Body shop estimate inflation ratios, total-loss claim anomalies, and compromised field surveyor override rates.
- **Organized Fraud Syndicates**: Identifies shared identity fingerprints (phone, IP, bank account) to assemble syndicate dossiers with total fraud value ($1.48M USD).
- **Money Flow Tracer**: Tracks financial payout flows from insurance carriers through bank accounts to repair shops and kickbacks.

---

### 🔹 Subsystem 4: Ask AIVIS & Multi-Agent Engine APIs (`/api/v1/copilot/*`)
- **Ask AIVIS Conversational Assistant**: Microsoft Security Copilot style natural language Q&A engine over diagnostics, telemetry, CAN frames, crash logs, and claims history.
- **11 Specialized AI Forensic Experts**: Chief Investigator, OBD Expert, CAN Bus Expert, Vehicle Dynamics Expert, Crash Reconstruction Expert, Insurance Compliance Expert, Fraud Analyst, Digital Evidence Examiner, Document Examiner, Computer Vision Expert, Legal Advisor.
- **Multi-Agent Conflict Resolution**: Compares dissenting agent opinions, weighs evidence confidence, and synthesizes a unified verdict.
- **Explainable AI (SHAP / LIME)**: Generates SHAP Waterfall plots and LIME feature attribution matrices justifying model risk scores.

---

### 🔹 Subsystem 5: Enterprise Operations & Compliance APIs (`/api/v1/operations/*`)
- **Workflow & Task Engine**: KanBan task matrix, forensic checklist enforcement, investigator assignment.
- **SLA Breach Engine**: Real-time SLA countdown timers per claim stage and automated escalations to Chief Risk Officer (CRO).
- **Digital Signatures PKI**: RSA-2048 & ECDSA-P256 PKI digital signatures for multi-tier verdict sign-offs.
- **Compliance Audit**: Audits compliance with **ISO 27001**, **ISO 21434**, **NIST CSF v2.0**, and **ISO 27037** (Digital Evidence Handling). Generates downloadable Chain of Custody certificates.
- **Team Collaboration**: Case discussion feed with `@mentions`, access sharing, and version audit history.

---

### 🔹 Subsystem 6: Commercial Platform & OEM Integrations APIs (`/api/v1/commercial/*`)
- **OEM Telematics Gateways**: Connectors for Tesla API Gateway, GM OnStar Insights (AACN), FordPass Connect, BMW ConnectedDrive, Geotab/Samsara Fleet APIs, Guidewire ClaimCenter Bus, and NMVTIS VIN Verification.
- **Predictive Intelligence ML Models**: ML models for Claim Fraud Probability (94.2%), Component Failure Forecast (88.5%), Repair Cost Inflation (+276.3%), and Repair Cycle Duration (4.5 Days).
- **Developer Portal & API Gateway**: API key manager (`aivis_live_sk_...`), rate limit controls, and webhook subscriptions.
- **SaaS Licensing & Executive Portfolio**: Multi-tenant quota meters, active seats, claim capacity monitoring, and executive portfolio risk heatmaps.

---

## 🌟 4. Technical Novelty & Key Innovations

AIVIS introduces **6 major technical novelties** that set it apart from conventional insurance software:

### 💡 Novelty 1: Multi-Agent AI Debate & Conflict Resolution Architecture
Unlike single-model AI solutions that produce opaque risk percentages, AIVIS deploys **11 domain-specialized AI Agents**. Each agent acts as an autonomous forensic persona (e.g. CAN Bus Expert vs Legal Advisor). When agents disagree—such as Computer Vision claiming total loss while OBD Telematics proves low impact—the **Conflict Resolution Engine** conducts an automated weighted debate to resolve discrepancies with transparent reasoning.

### 💡 Novelty 2: Heterogeneous Knowledge Graph Syndicate Mining
AIVIS moves beyond simple database queries by projecting all ecosystem entities (claims, policyholders, body shops, surveyors, bank accounts, devices, IPs) into a **Neo4j Heterogeneous Knowledge Graph**. By executing **PageRank Centrality** and **Louvain Community Modularity** algorithms, the backend automatically uncovers hidden organized fraud rings operating across multiple insurance carriers.

### 💡 Novelty 3: Automotive Cyber Attack Vector Detection
With connected vehicles vulnerable to cyber manipulation, AIVIS includes a specialized CAN Bus parser that inspects raw binary frame logs (`.asc`, `.blf`, `.pcap`). It detects sophisticated cyber-fraud attacks including **CAN Replay Attacks**, **Signal Injection**, **Bus Flooding**, and **Spoofed ECU Transmitters**.

### 💡 Novelty 4: Cryptographic Chain of Custody with PKI Signatures
To guarantee court admissibility, AIVIS enforces **ISO 27037 Digital Evidence Handling**. Every uploaded photo, telemetry file, or document is hashed immediately using **SHA-256 and SHA-512**. Final verdicts require cryptographic **RSA-2048 / ECDSA-P256 PKI digital signatures** from authorized investigators, creating an tamper-proof audit trail.

### 💡 Novelty 5: Mathematical Explainable AI (SHAP / LIME Matrix)
To prevent "black-box" AI liability in legal proceedings, AIVIS integrates mathematical feature attribution via **SHAP (Shapley Additive exPlanations)** and **LIME**. Investigators can inspect exact percentage weights contributing to a high-risk flag (e.g. *EXIF Timestamp Mismatch: +34%*, *G-Force Contradiction: +28%*).

### 💡 Novelty 6: Universal OEM Telematics Gateway Bus
AIVIS features a unified OEM abstraction layer capable of standardizing telematics streams from diverse manufacturers—including **Tesla API**, **GM OnStar**, **FordPass**, **BMW ConnectedDrive**, **Geotab**, and **Guidewire ClaimCenter**—into a single normalized schema.

---

## 🔄 5. Step-by-Step API Execution Cycle

Below is the step-by-step lifecycle of a claim processed through the AIVIS backend:

```text
Step 1: Claim Ingestion
  └─► POST /api/v1/claims (Stores claim in PostgreSQL, validates policy & vehicle VIN)

Step 2: Evidence Vaulting & Hashing
  └─► POST /api/v1/forensics/evidence (Calculates SHA-256/SHA-512, extracts EXIF & GPS metadata)

Step 3: Diagnostics & CAN Telematics Ingestion
  └─► GET /api/v1/forensics/obd/session & /canbus/frames (Parses DTCs, CAN frames, detects attack vectors)

Step 4: Knowledge Graph Ingestion & Syndicate Check
  └─► GET /api/v1/intelligence/graph & /algorithms (Updates Neo4j graph, runs PageRank & Louvain clustering)

Step 5: Multi-Agent AI Debate & Verdict Synthesis
  └─► GET /api/v1/copilot/agents/debate (11 AI Agents debate evidence, resolve conflicts, calculate SHAP)

Step 6: Digital Signature & ISO Compliance Export
  └─► POST /api/v1/operations/approvals (Attaches RSA-2048 PKI signature, exports ISO 27037 Certificate)
```

---

## 🎯 6. Summary

The **AIVIS Backend System** represents a complete, production-ready enterprise software platform. Built on clean architecture principles with strict TypeScript/Pydantic validation, multi-tenant RBAC security, and dual relational/graph databases, it provides insurance carriers and forensic teams with an unassailable AI-driven investigation platform.
