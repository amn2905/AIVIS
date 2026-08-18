# 🌐 AIVIS — OpenAPI REST API Reference

This document summarizes all 45 REST API endpoints available under the `/api/v1` namespace in the **AIVIS** FastAPI backend.

---

## 🔑 1. Authentication & Security (`/api/v1/auth`)

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/v1/auth/login` | `POST` | User authentication & JWT token generation | No |
| `/api/v1/auth/refresh` | `POST` | Refresh expired JWT access token | Yes |
| `/api/v1/auth/me` | `GET` | Retrieve current authenticated user profile | Yes |

---

## 📁 2. Claim Investigations (`/api/v1/claims`)

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/v1/claims` | `GET` | List claim dossiers with filtering & pagination | Yes |
| `/api/v1/claims/{id}` | `GET` | Get detailed claim dossier by ID | Yes |
| `/api/v1/claims` | `POST` | Create new claim investigation dossier | Yes |
| `/api/v1/claims/{id}/verdict` | `POST` | Submit forensic verdict for claim | Yes |

---

## 🔬 3. Vehicle Digital Forensics (`/api/v1/forensics`)

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/v1/forensics/obd/session` | `GET` | Get OBD-II acquisition PIDs & DTC codes | Yes |
| `/api/v1/forensics/sensors/intelligence` | `GET` | Get multi-sensor anomaly scoring & correlation | Yes |
| `/api/v1/forensics/canbus/frames` | `GET` | Decode CAN Bus frame log & attack vectors | Yes |
| `/api/v1/forensics/ecu/profile` | `GET` | Audit ECU firmware, calibration hash & stored VIN | Yes |
| `/api/v1/forensics/edr/record` | `GET` | EDR crash reconstruction & 5s pre-crash stream | Yes |
| `/api/v1/forensics/gps/trip` | `GET` | GPS telematics route points & harsh braking flags | Yes |
| `/api/v1/forensics/evidence/locker` | `GET` | Cryptographic evidence locker (SHA-256/512) | Yes |
| `/api/v1/forensics/ocr/scan` | `GET` | OCR document text extraction & font forgery flags | Yes |
| `/api/v1/forensics/damage/assessment` | `GET` | Computer vision damage bounding boxes & cost audit | Yes |
| `/api/v1/forensics/agents/orchestrate` | `GET` | Multi-Agent AI investigation report | Yes |
| `/api/v1/forensics/timeline/events` | `GET` | Chronological event timeline reconstruction | Yes |

---

## 🌐 4. Fraud Intelligence & Knowledge Graph (`/api/v1/intelligence`)

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/v1/intelligence/graph` | `GET` | Neo4j Knowledge Graph nodes & edges topology | Yes |
| `/api/v1/intelligence/algorithms` | `GET` | PageRank centrality & Louvain community rings | Yes |
| `/api/v1/intelligence/vin-policy` | `GET` | VIN cloning & ghost policy duplicate alerts | Yes |
| `/api/v1/intelligence/workshops` | `GET` | Body shop estimate inflation & surveyor audit | Yes |
| `/api/v1/intelligence/syndicates` | `GET` | Fraud syndicate dossiers & shared identity links | Yes |
| `/api/v1/intelligence/money-flow` | `GET` | Payout flow links from carriers to body shops | Yes |

---

## 🤖 5. Ask AIVIS & Multi-Agent Engine (`/api/v1/copilot`)

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/v1/copilot/chat` | `POST` | Ask AIVIS natural language query execution | Yes |
| `/api/v1/copilot/agents/debate` | `GET` | 11 Specialized AI Expert debate findings | Yes |
| `/api/v1/copilot/xai/shap` | `GET` | SHAP & LIME feature risk attribution values | Yes |
| `/api/v1/copilot/reports/generate` | `GET` | Multilingual report generator (EN/ES/DE/FR/SE/JA) | Yes |

---

## ⚙️ 6. Enterprise Operations & Compliance (`/api/v1/operations`)

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/v1/operations/tasks` | `GET` | KanBan task matrix & forensic checklists | Yes |
| `/api/v1/operations/sla` | `GET` | Real-time SLA countdown timers & escalations | Yes |
| `/api/v1/operations/approvals` | `GET` | RSA-2048 / ECDSA PKI digital signatures | Yes |
| `/api/v1/operations/compliance` | `GET` | ISO 27001, ISO 21434, NIST CSF audit scores | Yes |
| `/api/v1/operations/collaboration` | `GET` | Case comments feed with `@mentions` | Yes |

---

## 🏢 7. Commercial Platform & OEM Integrations (`/api/v1/commercial`)

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/v1/commercial/oem` | `GET` | OEM gateway status (Tesla, GM, Ford, Guidewire) | Yes |
| `/api/v1/commercial/predictive` | `GET` | Predictive ML models (Fraud %, Failure Risk) | Yes |
| `/api/v1/commercial/developer` | `GET` | Developer API key manager (`aivis_live_sk_...`) | Yes |
| `/api/v1/commercial/licensing` | `GET` | Multi-Tenant SaaS quota meters & billing | Yes |
| `/api/v1/commercial/portfolio` | `GET` | Executive portfolio risk heatmap & F1 accuracy | Yes |
