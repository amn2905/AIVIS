# 🌐 AIVIS — Knowledge Graph & Fraud Intelligence Engine

This document details the **Fraud Knowledge Graph Engine** powered by Neo4j 5 in AIVIS, covering relationship topology, graph algorithms, VIN cloning, body shop risk audits, and organized syndicate detection.

---

## 🕸️ 1. Knowledge Graph Architecture (`/intelligence/graph`)

The Knowledge Graph represents vehicle insurance ecosystems as a heterogeneous multi-relational graph:

- **Entity Types (15 Node Labels)**: Vehicle, Owner, Driver, Policy, Claim, Body Shop, Surveyor, Investigator, Phone Number, Email, Bank Account, GPS Location, IP Address, Device Fingerprint, Document Hash.
- **Interactive SVG Canvas**: Real-time graph node expansion, relationship filtering, and inspector sidebar displaying node metadata and centrality metrics.

---

## 🧮 2. Graph Mining Algorithms (`/intelligence/algorithms`)

1. **PageRank Centrality**: Ranks node influence across the network to identify key orchestrators and suspect body shops.
2. **Louvain Community Modularity**: Detects dense subgraphs representing organized fraud rings and staged collision syndicates.
3. **Shortest Path Tracing**: Uncovers hidden indirect connections between suspect policyholders, shared bank accounts, and fraudulent body shops.

---

## 🚗 3. VIN Cloning & Ghost Policy Detector (`/intelligence/vin-policy`)

- **Cross-Carrier Duplication**: Detects identical VINs registered across multiple insurance carriers simultaneously.
- **State Registry Pings**: Flags stolen vehicles re-registered with cloned VIN tags across state borders.
- **Ghost Policies**: Highlights policies issued for non-existent or previously total-loss scrapped vehicles.

---

## 💰 4. Money Flow & Syndicate Dossiers (`/intelligence/money-flow` & `/intelligence/entities`)

- **Payout Flow Tracer**: Tracks financial flow from carrier payouts through bank accounts to repair shops, tow operators, and kickback accounts.
- **Organized Syndicate Dossiers**: Combines shared IP addresses, phone numbers, and bank accounts to group repeat offenders into named fraud rings with estimated total fraud value ($1.48M USD).
