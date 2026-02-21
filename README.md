# FleetFlow
## Modular Fleet & Logistics Management System

FleetFlow is a comprehensive, modular fleet and logistics management system designed to optimize transportation operations. It provides real-time tracking, route optimization, maintenance scheduling, and detailed analytics through a scalable, microservices-based architecture.

### **The Tech Stack**

-Frontend: React (Vite) + Tailwind CSS + DaisyUI (for the "Pill Aesthetic").

-Backend: Node.js + Express (handling complex validation).

-Database: Supabase (PostgreSQL) for relational data and local-first dynamics.

-Validation: React-Hot-Toast for robust user input feedback.

### **Key Features**

-Command Center: Dashboard with real-time KPIs (Active Fleet, Maintenance Alerts, Pending Cargo).

-Vehicle Registry: Full CRUD for asset management including model, license, and capacity.

-Driver Profiles: Managing compliance and duty status.

-Dispatcher Workflow: Creating trips with automated weight-capacity validation.

-Service Logs: Automated state-switching (Vehicles move to "In Shop" when logged).

-Expense Tracker: Monitoring fuel and maintenance costs.

-Fleet Analytics: Real-time ROI calculations per vehicle.

-Management/Role Settings: Role-based access control (Manager vs. Dispatcher).

### Business Logic & Robust Validation

-Cargo Overload Prevention: The system cross-references CargoWeight against Vehicle.MaxPayload. If the weight exceeds capacity, the trip is blocked and a toast notification is triggered.

-Dynamic Status Mapping: * Trip Dispatched → Vehicle & Driver set to "On Trip".Maintenance Logged → Vehicle set to "In Shop" (Hidden from Dispatcher selection).

-Financial ROI: Automatically calculates $\frac{Revenue - (Fuel + Maintenance)}{Acquisition Cost}$.

### Installation & Setup
## 🚀 Installation & Setup

> [!IMPORTANT]
> Ensure you have **Node.js (v18+)** and a **Supabase** account ready before starting.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/m-ronak-gh/fleetFlow.git
```
#### Frontend Setup:

```Bash
cd Frontend && npm install && npm run dev
```
#### Backend Setup:

```Bash
cd Backend && npm install && npm start
```
> [!IMPORTANT]
> Environment Variables: Create a .env in both folders with your SUPABASE_URL and SUPABASE_KEY.
<img width="1875" height="871" alt="Screenshot 2026-02-21 172547" src="https://github.com/user-attachments/assets/dd46d2cf-2922-4508-bb4b-d1be33572297" />
<img width="1899" height="872" alt="Screenshot 2026-02-21 172535" src="https://github.com/user-attachments/assets/3ef28f7d-458d-4cdc-9556-0035dfe5e5cf" />
<img width="1884" height="872" alt="Screenshot 2026-02-21 172520" src="https://github.com/user-attachments/assets/20ec78a3-96e4-48bb-84ff-03e8cc44296e" />
<img width="1902" height="850" alt="Screenshot 2026-02-21 172447" src="https://github.com/user-attachments/assets/ccedca65-9a43-413f-a09e-6209b280cdac" />
Odoo Hackathon 2026 (Virtual round)

