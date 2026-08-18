from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.db.base import Base

def generate_uuid():
    return str(uuid.uuid4())

class AgentOpinionRecord(Base):
    __tablename__ = "agent_opinions"

    id = Column(String, primary_key=True, default=generate_uuid)
    role = Column(String, nullable=False)
    agent_title = Column(String, nullable=False)
    confidence_pct = Column(Float, default=0.0)
    verdict = Column(String, nullable=False)
    findings_summary = Column(Text)
    reasoning_chain = Column(JSON, default=list)

class CopilotChatMessageRecord(Base):
    __tablename__ = "copilot_chat_messages"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, nullable=False)
    sender = Column(String, nullable=False) # USER, COPILOT_AI
    message = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
