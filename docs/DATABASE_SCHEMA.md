# 🗄️ AIVIS — Database Schema & Data Models

This document details the multi-database persistence layer across **AIVIS**, covering relational PostgreSQL tables, Redis caching, and Neo4j Graph Database schemas.

---

## 🐘 1. PostgreSQL Relational Tables (SQLAlchemy)

### Core Enterprise Tables (`backend/app/models/models.py`)
- `users`: User accounts, emails, hashed passwords, tenant `company_id`, role.
- `insurance_companies`: Enterprise insurance carrier tenants, country, tax ID.
- `branches`: Regional branches linked to parent insurance company.
- `vehicles`: VIN registry, make, model, year, plate, engine number, stolen check.
- `claims`: Investigation dossiers, claim number, policy number, incident location, estimated loss, status, fraud score.
- `evidence_items`: Digital evidence records, mime type, upload timestamp, AI score.
- `audit_logs`: Immutable SOC system activity trail.

### Forensics Tables (`backend/app/models/forensics_models.py`)
- `obd_sessions`: OBD-II acquisition sessions, VIN, ECU ID, protocol, DTC array.
- `sensor_snapshots`: Sensor readings, health score, deviation %, anomaly score.
- `can_frame_records`: CAN Bus frame payload HEX, bus load, signal frequency.
- `ecu_profiles`: Firmware version, calibration hash, stored vs chassis VIN matching.
- `edr_crash_records`: EDR black box crash stream, peak G-force, airbag deployment.
- `evidence_hashes`: Cryptographic evidence locker signatures (SHA-256, SHA-512, MD5).

---

## 🌐 2. Neo4j Knowledge Graph DB Schema (`Neo4j 5`)

### Node Labels
- `:Vehicle` (vin, makeModel, riskScore)
- `:Owner` (ssnMasked, address, claimsCount)
- `:Claim` (claimNumber, lossAmountUsd, riskLevel)
- `:RepairShop` (shopName, registrationNum, inflationRatio)
- `:Surveyor` (surveyorName, licenseNumber, overrideRate)
- `:BankAccount` (accountMasked, totalPayoutsUsd)
- `:PhoneNumber` (phoneNum, linkedEntitiesCount)
- `:IPAddress` (ipAddress, submissionsCount)

### Relationship Types
- `(:Owner)-[:OWNS]->(:Vehicle)`
- `(:Vehicle)-[:INSURED_BY]->(:InsurancePolicy)`
- `(:Owner)-[:FILED_CLAIM]->(:Claim)`
- `(:Claim)-[:REPAIRED_BY]->(:RepairShop)`
- `(:Claim)-[:INSPECTED_BY]->(:Surveyor)`
- `(:RepairShop)-[:PAYOUT_TO]->(:BankAccount)`
- `(:Owner)-[:SHARED_PHONE]->(:PhoneNumber)`
- `(:RepairShop)-[:SHARED_PHONE]->(:PhoneNumber)` (Fraud Trigger!)

---

## 🔴 3. Redis Data Structures (`Redis 7`)

- `aivis:session:{token}`: Active JWT session cache.
- `aivis:rate_limit:{ip}`: API Gateway sliding window request rate limiting.
- `celery:queue`: Asynchronous background task queue for OCR parsing and AI debates.
