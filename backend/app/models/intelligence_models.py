from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.base import Base

def generate_uuid():
    return str(uuid.uuid4())

class GraphNodeRecord(Base):
    __tablename__ = "graph_nodes"

    id = Column(String, primary_key=True, default=generate_uuid)
    node_type = Column(String, nullable=False) # VEHICLE, OWNER, REPAIR_SHOP, BANK_ACCOUNT, etc.
    label = Column(String, nullable=False)
    sub_label = Column(String)
    risk_score = Column(Integer, default=0)
    fraud_network_score = Column(Integer, default=0)
    is_suspect = Column(Boolean, default=False)
    metadata_attributes = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)

class GraphEdgeRecord(Base):
    __tablename__ = "graph_edges"

    id = Column(String, primary_key=True, default=generate_uuid)
    source_id = Column(String, nullable=False)
    target_id = Column(String, nullable=False)
    relation_type = Column(String, nullable=False) # OWNS, FILED_CLAIM, REPAIRED_BY, PAYOUT_TO, SHARED_PHONE
    weight = Column(Float, default=1.0)
    is_suspicious = Column(Boolean, default=False)

class FraudSyndicateRecord(Base):
    __tablename__ = "fraud_syndicates"

    id = Column(String, primary_key=True, default=generate_uuid)
    ring_name = Column(String, nullable=False)
    code_name = Column(String, nullable=False)
    risk_score = Column(Integer, default=95)
    member_count = Column(Integer, default=0)
    total_claim_loss_usd = Column(Float, default=0.0)
    primary_location = Column(String)
    shared_attributes = Column(JSON, default=list)

class MoneyFlowRecord(Base):
    __tablename__ = "money_flows"

    id = Column(String, primary_key=True, default=generate_uuid)
    source_entity = Column(String, nullable=False)
    target_entity = Column(String, nullable=False)
    bank_account_masked = Column(String, nullable=False)
    amount_usd = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    is_flagged = Column(Boolean, default=True)
    flag_reason = Column(String)
