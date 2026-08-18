# 📁 AIVIS — Project Structure & Directory Tree

This document provides a complete overview of the directory organization across the frontend, backend, DevOps manifests, and documentation suite for the **AIVIS** platform.

---

## 🌳 Root Directory Structure

```text
x:\AIVIS\
├── docker-compose.yml           # Cloud-native Docker Compose orchestration manifest
├── README.md                    # Master platform overview & quick start guide
│
├── frontend/                    # React 19 + TypeScript + Vite Frontend Application
│   ├── Dockerfile               # Multi-stage Node 20 + Nginx Docker build
│   ├── package.json             # Frontend npm dependencies & scripts
│   ├── index.html               # Main HTML entrypoint
│   ├── vite.config.ts           # Vite bundler configuration
│   ├── tailwind.config.js       # Tailwind CSS design system configuration
│   ├── tsconfig.json            # Strict TypeScript configuration
│   └── src/                     # Source Code
│       ├── main.tsx             # React DOM root render
│       ├── App.tsx              # Main App router matching all 35+ routes
│       ├── index.css            # White Claymorphism design system & CSS variables
│       │
│       ├── components/          # Reusable UI & Layout Components
│       │   ├── ui/              # White Claymorphic UI Primitives
│       │   │   ├── Card.tsx     # Clay card with rounded-[20px] & shadow-clay-md
│       │   │   ├── Button.tsx   # Rounded clay button with micro-interactions
│       │   │   ├── Badge.tsx    # Soft status pills (ClaimStatusBadge, RiskBadge)
│       │   │   ├── Input.tsx    # Rounded floating input with soft focus ring
│       │   │   └── Table.tsx    # Enterprise DataGrid table container
│       │   │
│       │   └── layout/          # Enterprise Navigation Layouts
│       │       ├── EnterpriseLayout.tsx # Main wrapper with sidebar & header
│       │       ├── Sidebar.tsx          # Floating collapsible glass sidebar
│       │       ├── Header.tsx           # Floating glass header with search & Ask AIVIS
│       │       ├── AskAIVISDrawer.tsx   # Microsoft Security Copilot style chat drawer
│       │       ├── NotificationDrawer.tsx # Slide-over notifications center
│       │       └── GlobalSearchModal.tsx  # Command K (⌘K) quick search modal
│       │
│       ├── pages/               # Application Page Views
│       │   ├── DashboardPage.tsx         # Executive SOC Dashboard
│       │   ├── ClaimsPage.tsx            # Claim Investigations List & DataGrid
│       │   ├── ClaimDetailPage.tsx       # Single Claim Dossier & Evidence View
│       │   ├── VehiclesPage.tsx          # Vehicle Registry & VIN Decoder
│       │   ├── CompaniesPage.tsx         # Insurance Tenants Management
│       │   ├── BranchesPage.tsx          # Regional Branch Directory
│       │   ├── UsersPage.tsx             # User Management & Provisioning
│       │   ├── RolesPage.tsx             # RBAC Governance Matrix
│       │   ├── ActivityLogsPage.tsx      # Audit Trail & Activity Logger
│       │   ├── NotificationsPage.tsx     # Notifications Center View
│       │   ├── SettingsPage.tsx          # System Settings & Configuration
│       │   ├── ProfilePage.tsx           # User Profile View
│       │   ├── LoginPage.tsx             # JWT Authentication View
│       │   │
│       │   ├── forensics/                # Phase 2 Digital Forensics Pages
│       │   │   ├── OBDAcquisitionPage.tsx
│       │   │   ├── SensorIntelligencePage.tsx
│       │   │   ├── CANBusForensicsPage.tsx
│       │   │   ├── ECUForensicsPage.tsx
│       │   │   ├── EDRAnalysisPage.tsx
│       │   │   ├── GPSTelematicsPage.tsx
│       │   │   ├── DigitalEvidenceLockerPage.tsx
│       │   │   ├── DocumentOCRPage.tsx
│       │   │   ├── AIDamageAnalysisPage.tsx
│       │   │   ├── AIInvestigationEnginePage.tsx
│       │   │   ├── ForensicTimelinePage.tsx
│       │   │   ├── InvestigatorWorkspacePage.tsx
│       │   │   ├── AICopilotWorkbenchPage.tsx  # Ask AIVIS 11 Experts Chamber
│       │   │   └── ExplainableAIPage.tsx        # SHAP & LIME Feature Attribution
│       │   │
│       │   ├── intelligence/             # Phase 3A Fraud Intelligence Pages
│       │   │   ├── FraudNetworkExplorerPage.tsx
│       │   │   ├── GraphAlgorithmsPage.tsx
│       │   │   ├── VINPolicyDuplicationPage.tsx
│       │   │   ├── WorkshopSurveyorRiskPage.tsx
│       │   │   ├── HighRiskEntitiesPage.tsx
│       │   │   ├── MoneyFlowAnalysisPage.tsx
│       │   │   └── FraudHeatmapPage.tsx
│       │   │
│       │   ├── operations/               # Phase 3C Operations & Compliance Pages
│       │   │   ├── WorkflowTaskEnginePage.tsx
│       │   │   ├── SLAEscalationPage.tsx
│       │   │   ├── DigitalApprovalsPage.tsx
│       │   │   ├── ComplianceDashboardPage.tsx
│       │   │   └── TeamCollaborationPage.tsx
│       │   │
│       │   └── commercial/               # Phase 4 Commercial SaaS Pages
│       │       ├── OEMIntegrationsPage.tsx
│       │       ├── PredictiveIntelligencePage.tsx
│       │       ├── DeveloperPortalPage.tsx
│       │       ├── SaaSLicensingPage.tsx
│       │       └── ExecutivePortfolioDashboardPage.tsx
│       │
│       ├── services/            # API Clients & Data Suppliers
│       │   ├── apiClient.ts            # Phase 1 Core API Client
│       │   ├── forensicsApiClient.ts   # Phase 2 Forensics API Client
│       │   ├── intelligenceApiClient.ts# Phase 3A Intelligence API Client
│       │   ├── copilotApiClient.ts     # Phase 3B Ask AIVIS API Client
│       │   ├── operationsApiClient.ts  # Phase 3C Operations API Client
│       │   └── commercialApiClient.ts  # Phase 4 Commercial API Client
│       │
│       └── types/               # Strict TypeScript Interfaces
│           ├── index.ts               # Phase 1 Core Types
│           ├── forensics.ts           # Phase 2 Forensics Types
│           ├── intelligence.ts        # Phase 3A Intelligence Types
│           ├── copilot.ts             # Phase 3B Ask AIVIS Types
│           ├── operations.ts          # Phase 3C Operations Types
│           └── commercial.ts          # Phase 4 Commercial Types
│
├── backend/                     # FastAPI Python Backend Application
│   ├── Dockerfile               # Python 3.11-slim Docker build
│   ├── requirements.txt         # Backend Python dependencies
│   └── app/
│       ├── main.py              # FastAPI app instance & router mount (45 routes)
│       ├── core/                # Core configuration & JWT settings
│       ├── db/                  # SQLAlchemy Base & Session setup
│       ├── models/              # SQLAlchemy ORM Models
│       │   ├── models.py              # Phase 1 Models
│       │   ├── forensics_models.py    # Phase 2 Forensics Models
│       │   ├── intelligence_models.py # Phase 3A Intelligence Models
│       │   ├── copilot_models.py      # Phase 3B Copilot Models
│       │   ├── operations_models.py   # Phase 3C Operations Models
│       │   └── commercial_models.py   # Phase 4 Commercial Models
│       │
│       ├── schemas/             # Pydantic v2 Validation Schemas
│       │   ├── schemas.py             # Phase 1 Schemas
│       │   ├── forensics_schemas.py   # Phase 2 Schemas
│       │   ├── intelligence_schemas.py# Phase 3A Schemas
│       │   ├── copilot_schemas.py     # Phase 3B Schemas
│       │   ├── operations_schemas.py  # Phase 3C Schemas
│       │   └── commercial_schemas.py  # Phase 4 Schemas
│       │
│       └── api/v1/              # FastAPI REST API Routers
│           ├── auth.py                # JWT Login & Auth
│           ├── claims.py              # Claim Investigations
│           ├── dashboard.py           # SOC Dashboard Metrics
│           ├── vehicles.py            # Vehicle Registry
│           ├── companies.py           # Insurance Tenants
│           ├── branches.py            # Regional Branches
│           ├── users.py              # User Management
│           ├── audit.py              # Audit Trail
│           ├── notifications.py      # Notifications
│           ├── forensics/             # Phase 2 Forensics Router
│           ├── intelligence/          # Phase 3A Intelligence Router
│           ├── copilot/               # Phase 3B Ask AIVIS Router
│           ├── operations/            # Phase 3C Operations Router
│           └── commercial/            # Phase 4 Commercial Router
│
└── docs/                        # Enterprise Technical Documentation Manuals
    ├── PROJECT_STRUCTURE.md
    ├── ARCHITECTURE.md
    ├── INSTALLATION.md
    ├── DEPLOYMENT.md
    ├── API_REFERENCE.md
    ├── DATABASE_SCHEMA.md
    ├── SECURITY.md
    ├── FORENSICS_ENGINE.md
    ├── GRAPH_ENGINE.md
    ├── ASK_AIVIS.md
    └── COMMERCIAL_PLATFORM.md
```
