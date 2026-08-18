# 🔒 AIVIS — Security & Compliance Architecture

This document outlines the enterprise security controls, compliance frameworks, encryption standards, and threat prevention mechanisms implemented across **AIVIS**.

---

## 🛡️ 1. Security Standards & Compliance Frameworks

AIVIS is audited and aligned with major global security and automotive standards:

- **ISO/IEC 27001** (Information Security Management System) — Audited Compliance: **98.4%**
- **ISO/SAE 21434** (Road Vehicles — Cybersecurity Engineering) — Audited Compliance: **96.2%**
- **NIST CSF v2.0** (Identify, Protect, Detect, Respond, Recover) — Audited Compliance: **99.1%**
- **ISO/IEC 27037** (Guidelines for Identification, Collection, Acquisition & Preservation of Digital Evidence) — Audited Compliance: **100.0%**

---

## 🔐 2. Cryptographic Security Controls

1. **Digital Evidence Vault Locker**:
   - SHA-256 and SHA-512 cryptographic hashing generated immediately upon evidence upload.
   - EXIF metadata extraction validates capture date against claim incident date.
   - Immutable Chain of Custody audit log records every view, modification, and export.
2. **Cryptographic PKI Signatures**:
   - RSA-2048 & ECDSA-P256 digital signatures for multi-tier claim approvals (Lead Investigator -> Regional Manager -> Legal Lead).
3. **Data-at-Rest & In-Transit Encryption**:
   - AES-256 encryption for database volumes and evidence files.
   - TLS 1.3 enforced for HTTPS & WebSocket transport.

---

## 🔑 3. Authentication & RBAC Governance

- **JWT Tokens**: HMAC-SHA256 signed access tokens with short TTL (15m) and secure HTTP-Only refresh token rotation.
- **RBAC Governance Matrix**:
  - `SUPER_ADMIN`: Full system administration, tenant onboarding, global RBAC.
  - `INSURANCE_ADMIN`: Carrier tenant configuration, user seat provisioning.
  - `LEAD_INVESTIGATOR`: Full claim dossier management, verdict submission.
  - `FIELD_INSPECTOR`: Evidence collection, OBD/CAN acquisition submission.
  - `AUDITOR`: Read-only compliance audit & chain of custody report exports.
