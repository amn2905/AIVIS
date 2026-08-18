# 🔬 AIVIS — Vehicle Digital Forensics Engine

This document provides a technical overview of the **Vehicle Digital Forensics Engine** in AIVIS, covering hardware acquisition, CAN bus analysis, ECU reflash verification, EDR black box crash reconstruction, and AI computer vision.

---

## 🔌 1. OBD-II Acquisition Module (`/forensics/obd`)

- **Supported Interfaces**: USB OBD adapters, Bluetooth 5.0 adapters, Wi-Fi dongles, and raw log files (CSV, JSON, XML).
- **Identity Verification**: Automatic extraction of VIN from Mode 09 PID 02, ECU Hardware ID, Protocol (ISO 15765-4 CAN, ISO 9141-2, KWP2000), and Calibration Verification Numbers (CVN).
- **DTC Audit**: Active, pending, and permanent Diagnostic Trouble Codes mapped to OBD-II standards (P0300 Misfire, P0700 Transmission, P0420 Catalyst).

---

## ⚡ 2. CAN Bus Forensics & Attack Detection (`/forensics/canbus`)

- **Log Support**: Vector CAN logs (`.asc`, `.blf`), Wireshark network captures (`.pcap`, `.pcapng`).
- **Frame Decoding**: 11-bit standard and 29-bit extended CAN frame ID decoding, payload byte matrix view, bitwise signal extraction.
- **Cyber Attack Vector Detector**:
  - **Replay Attacks**: High-frequency duplicate frame timestamps.
  - **Signal Injection**: Sudden out-of-sequence sensor value jumps (e.g. Speed 0 -> 120 mph in 10ms).
  - **Bus Flooding**: Abnormally high bus utilization (>85%).
  - **Message Spoofing**: Mismatched ECU transmitter IDs.

---

## 💥 3. EDR Black Box Crash Reconstruction (`/forensics/edr`)

- **CDR Crash Parser**: Analyzes Bosch CDR, Kia/Hyundai EDR, and Tesla Crash Data logs.
- **5-Second Pre-Crash Telematics Stream**: Evaluates vehicle speed, accelerator pedal %, brake switch status, engine RPM, and steering wheel angle at 100ms intervals before impact.
- **Collision Metrics**: Delta-V calculation, peak longitudinal/lateral G-force, airbag deployment sequence, and occupant seatbelt status.

---

## 👁️ 4. AI Damage Vision & Document OCR (`/forensics/damage` & `/forensics/ocr`)

- **AI Damage Vision**: Computer vision bounding box detection classifying vehicle damage (Shattered Windshield, Dent, Bumper Scrape, Structural Frame Bent), calculating severity ratings and repair cost estimates.
- **Document OCR & Forgery Detector**: Optical Character Recognition for Repair Invoices, Driver Licenses, FIR Reports. Detects font anomalies, digital splicing, and price inflation discrepancies.
