from fastapi import APIRouter
from typing import Dict, Any, List

router = APIRouter()

@router.post("/chat")
def chat_with_copilot(query: Dict[str, str]) -> Dict[str, Any]:
    text = query.get("query", "")
    return {
        "id": "msg-reply",
        "sender": "COPILOT_AI",
        "message": f"AIVIS Copilot processed query: '{text}'. High fraud risk (94/100) confirmed by EXIF and CAN bus evidence.",
        "timestamp": "Just now",
        "suggestedFollowups": ["Summarize crash evidence", "Generate executive denial narrative"]
    }

@router.get("/agents/debate")
def get_11_expert_debate() -> Dict[str, Any]:
    return {
        "consensusScore": 97.2,
        "finalUnifiedVerdict": "FRAUDULENT",
        "opinionsCount": 11
    }

@router.get("/xai/shap")
def get_shap_attributions() -> List[Dict[str, Any]]:
    return [
        {"featureName": "EXIF Image Capture Date Mismatch", "category": "IMAGE_EXIF", "shapValue": 0.34, "featureValue": "24 days prior"},
        {"featureName": "CAN Bus Diagnostic Signal Injection", "category": "CAN_BUS", "shapValue": 0.28, "featureValue": "0x7DF @ 250Hz"}
    ]

@router.get("/reports/generate")
def generate_report(lang: str = "EN") -> Dict[str, Any]:
    return {
        "claimId": "clm-8801",
        "language": lang,
        "title": f"AIVIS FORENSIC REPORT ({lang}) — CLM-2026-8801",
        "executiveSummary": "Multi-agent consensus confirms 97.2% confidence on staged collision fraud."
    }
