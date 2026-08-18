from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import auth, users, claims, dashboard, vehicles, companies, branches, audit, notifications
from app.api.v1.forensics import forensics_router
from app.api.v1.intelligence import intelligence_router
from app.api.v1.copilot import copilot_router
from app.api.v1.operations import operations_router
from app.api.v1.commercial import commercial_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="5.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Phase 1 Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(claims.router, prefix=f"{settings.API_V1_STR}/claims", tags=["Claim Investigations"])
app.include_router(dashboard.router, prefix=f"{settings.API_V1_STR}/dashboard", tags=["SOC Dashboard"])
app.include_router(vehicles.router, prefix=f"{settings.API_V1_STR}/vehicles", tags=["Vehicle Registry"])
app.include_router(companies.router, prefix=f"{settings.API_V1_STR}/companies", tags=["Insurance Tenants"])
app.include_router(branches.router, prefix=f"{settings.API_V1_STR}/branches", tags=["Regional Branches"])
app.include_router(users.router, prefix=f"{settings.API_V1_STR}/users", tags=["User Management"])
app.include_router(audit.router, prefix=f"{settings.API_V1_STR}/audit", tags=["Audit Trail"])
app.include_router(notifications.router, prefix=f"{settings.API_V1_STR}/notifications", tags=["Notification Center"])

# Phase 2 Forensics Router
app.include_router(forensics_router.router, prefix=f"{settings.API_V1_STR}/forensics", tags=["Vehicle Digital Forensics & AI Engine"])

# Phase 3A Intelligence Router
app.include_router(intelligence_router.router, prefix=f"{settings.API_V1_STR}/intelligence", tags=["Fraud Intelligence & Knowledge Graph"])

# Phase 3B Copilot Router
app.include_router(copilot_router.router, prefix=f"{settings.API_V1_STR}/copilot", tags=["AI Copilot & Multi-Agent Engine"])

# Phase 3C Operations Router
app.include_router(operations_router.router, prefix=f"{settings.API_V1_STR}/operations", tags=["Enterprise Operations & Compliance"])

# Phase 4 Commercial Router
app.include_router(commercial_router.router, prefix=f"{settings.API_V1_STR}/commercial", tags=["Commercial SaaS Platform & OEM Gateways"])

@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "HEALTHY",
        "system": settings.PROJECT_NAME,
        "version": "5.0.0",
        "commercialPlatform": "Production SaaS Platform Online (Tesla, GM OnStar, Guidewire Gateways Active)"
    }
