# 🤖 Ask AIVIS — Conversational AI & Multi-Agent Investigation Engine

This document details **Ask AIVIS** (*"Ask AIVIS — Your AI Vehicle Investigation Assistant"*), the 11 Specialized AI Experts, Explainable AI (SHAP/LIME), and Multi-Agent Conflict Resolution in AIVIS.

---

## 💬 1. Ask AIVIS Conversational Centerpiece (`AskAIVISDrawer.tsx`)

- **Interface Aesthetics**: Inspired by Microsoft Security Copilot, Notion AI, ChatGPT, and Perplexity.
- **Capabilities**: Natural language querying over OBD diagnostics, CAN Bus frames, ECU hashes, EDR crashes, GPS tracks, OCR documents, damage photos, and claims history.
- **Features**:
  - Streaming Markdown responses with code blocks.
  - 14 Quick Prompt Chips (`Analyze Vehicle`, `Explain Fraud Score`, `Review OBD Data`, `Review CAN Bus`, `Analyze ECU`, `Analyze Crash`, `Analyze Sensor Health`, `Verify Documents`, `Review Timeline`, `Generate Report`, `Detect Fraud Patterns`, `Explain AI Findings`).
  - Message Pinning, Copying, Regeneration, Conversation Clearing, and Markdown Export (`Ask_AIVIS_Transcript.md`).

---

## 👩‍⚖️ 2. The 11 Specialized AI Forensic Experts (`/forensics/copilot`)

```text
[ Chief Investigator Agent ]
  ├── [ OBD Expert Agent ]
  ├── [ CAN Bus Expert Agent ]
  ├── [ Vehicle Dynamics Agent ]
  ├── [ Crash Reconstruction Agent ]
  ├── [ Insurance Compliance Agent ]
  ├── [ Fraud Analyst Agent ]
  ├── [ Digital Evidence Examiner Agent ]
  ├── [ Document Examiner Agent ]
  ├── [ Computer Vision Expert Agent ]
  └── [ Legal Advisor Agent ]
```

Each agent independently reviews evidence streams, assigns confidence ratings (0-100%), cites specific telemetry references, and provides reasoning.

---

## ⚖️ 3. Multi-Agent Conflict Resolution Engine

- **Debate Orchestration**: Compares agent findings and flags dissenting opinions (e.g. Computer Vision claims total loss vs OBD Telematics showing minor impact).
- **Consensus Synthesis**: Calculates weighted evidence scores to produce a unified, court-ready investigation conclusion.

---

## 📊 4. Explainable AI (SHAP / LIME Matrix) (`/forensics/explainable-ai`)

- **SHAP Waterfall Plots**: Visualizes positive and negative feature contributions toward final fraud risk scores (e.g. EXIF Timestamp Mismatch +34%, Telematics G-force contradiction +28%).
- **LIME Local Attribution**: Explains individual model predictions for non-technical claims adjusters and legal reviewers.
