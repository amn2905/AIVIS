from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.base import Base

def generate_uuid():
    return str(uuid.uuid4())

class InvestigationTaskRecord(Base):
    __tablename__ = "investigation_tasks"

    id = Column(String, primary_key=True, default=generate_uuid)
    claim_id = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text)
    status = Column(String, default="BACKLOG")
    priority = Column(String, default="MEDIUM")
    assignee_name = Column(String)
    assignee_role = Column(String)
    due_date = Column(DateTime)
    checklist_items = Column(JSON, default=list)

class DigitalSignatureEntity(Base):
    __tablename__ = "digital_signatures"

    id = Column(String, primary_key=True, default=generate_uuid)
    claim_id = Column(String, nullable=False)
    signer_name = Column(String, nullable=False)
    signer_role = Column(String, nullable=False)
    signature_algorithm = Column(String, default="RSA-2048")
    signature_hash_hex = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

class CaseCommentEntity(Base):
    __tablename__ = "case_comments"

    id = Column(String, primary_key=True, default=generate_uuid)
    claim_id = Column(String, nullable=False)
    author_name = Column(String, nullable=False)
    author_role = Column(String, nullable=False)
    comment_text = Column(Text, nullable=False)
    mentions = Column(JSON, default=list)
    timestamp = Column(DateTime, default=datetime.utcnow)
