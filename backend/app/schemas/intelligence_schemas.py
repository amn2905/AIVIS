from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class GraphNodeOut(BaseModel):
    id: str
    node_type: str
    label: str
    sub_label: Optional[str] = None
    risk_score: int
    fraud_network_score: int
    is_suspect: bool
    metadata_attributes: Dict[str, Any] = {}

    class Config:
        from_attributes = True

class GraphEdgeOut(BaseModel):
    id: str
    source_id: str
    target_id: str
    relation_type: str
    weight: float
    is_suspicious: bool

    class Config:
        from_attributes = True

class PageRankOut(BaseModel):
    node_id: str
    node_label: str
    node_type: str
    page_rank_score: float
    centrality_rank: int
    is_mastermind_candidate: bool

    class Config:
        from_attributes = True

class LouvainCommunityOut(BaseModel):
    id: str
    community_name: str
    member_node_ids: List[str]
    primary_territory: str
    syndicate_risk_score: int
    total_fraud_value_usd: float

    class Config:
        from_attributes = True

class FraudSyndicateOut(BaseModel):
    id: str
    ring_name: str
    code_name: str
    risk_score: int
    member_count: int
    total_claim_loss_usd: float
    primary_location: str
    shared_attributes: List[str] = []

    class Config:
        from_attributes = True

class MoneyFlowOut(BaseModel):
    id: str
    source_entity: str
    target_entity: str
    bank_account_masked: str
    amount_usd: float
    timestamp: datetime
    is_flagged: bool
    flag_reason: Optional[str] = None

    class Config:
        from_attributes = True
