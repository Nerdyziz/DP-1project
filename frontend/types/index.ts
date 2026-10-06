export interface RoleProfile {
  id: string;
  name: string;
  role: "PATIENT" | "RECEPTIONIST" | "DOCTOR" | "NURSE" | "ADMIN";
  title: string;
  patientId?: string; // For patients: e.g. 'REC-101'
  assignedDoctor?: string;
  allowedTabs: string[];
  defaultTab: string;
}

export const ROLE_PROFILES: Record<string, RoleProfile> = {
  "DOC-1": {
    id: "DOC-1",
    name: "Dr. Robert Smith",
    role: "DOCTOR",
    title: "Cardiology Attending",
    allowedTabs: ["dashboard", "records", "triage", "reports", "department", "staff"],
    defaultTab: "dashboard",
  },
  "DOC-2": {
    id: "DOC-2",
    name: "Dr. Gregory Jones",
    role: "DOCTOR",
    title: "Orthopedics Attending",
    allowedTabs: ["dashboard", "records", "triage", "reports", "department", "staff"],
    defaultTab: "dashboard",
  },
  "NURSE-1": {
    id: "NURSE-1",
    name: "Sarah Jenkins, RN",
    role: "NURSE",
    title: "Head Nurse (ICU Ward 2)",
    allowedTabs: ["dashboard", "records", "triage", "reports", "staff"],
    defaultTab: "dashboard",
  },
  "REC-1": {
    id: "REC-1",
    name: "Emily Clark",
    role: "RECEPTIONIST",
    title: "Admissions Receptionist",
    allowedTabs: ["dashboard", "triage", "staff"],
    defaultTab: "dashboard",
  },
  "P-1": {
    id: "P-1",
    name: "Alice Henderson",
    role: "PATIENT",
    title: "Inpatient #P-1 (Cardiac Ward)",
    patientId: "REC-101",
    assignedDoctor: "Dr. Robert Smith",
    allowedTabs: ["patient_portal", "records", "reports"],
    defaultTab: "patient_portal",
  },
  "P-2": {
    id: "P-2",
    name: "Bob Vance",
    role: "PATIENT",
    title: "Inpatient #P-2 (Orthopedic Ward)",
    patientId: "REC-102",
    assignedDoctor: "Dr. Gregory Jones",
    allowedTabs: ["patient_portal", "records", "reports"],
    defaultTab: "patient_portal",
  },
  "ADMIN-1": {
    id: "ADMIN-1",
    name: "Hospital Chief Administrator",
    role: "ADMIN",
    title: "Chief Compliance Officer",
    allowedTabs: ["dashboard", "records", "triage", "reports", "department", "staff", "audit"],
    defaultTab: "dashboard",
  },
};

export interface DashboardStats {
  inpatients: number;
  bedCapacity: string;
  staffCount: number;
  triageCount: number;
  auditEvents: number;
  hospitalStatus: string;
  recentLogs?: string[];
}

export interface MedicalRecord {
  recordId: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  prescription: string;
  confidential: boolean;
  timestamp: string;
}

export interface TriageItem {
  id: string;
  patient: string;
  type: string;
  resolvedBy: string;
  resolved: boolean;
  complaint: string;
}

export interface StaffMember {
  name: string;
  role: string;
  department: string;
  specialization: string;
  duty: string;
  salary: number;
  showSalary?: boolean;
}

export interface DepartmentSuite {
  department: string;
  tool: string;
  scanResult: string;
  reportStandard: string;
  sampleReport: string;
  consentTitle: string;
  disclosures: string[];
}
