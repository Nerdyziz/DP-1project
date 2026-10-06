"use client";

import React from "react";
import {
  LayoutDashboard,
  FileText,
  Siren,
  FlaskConical,
  Building2,
  Users,
  ShieldAlert,
  Heart,
  User,
} from "lucide-react";
import { RoleProfile } from "@/types";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentProfile: RoleProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  currentProfile,
}) => {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0 border-r border-slate-800">
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 bg-sky-600 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-md shadow-sky-600/30">
          ✚
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-tight text-slate-100">Mercy General</h1>
          <p className="text-xs text-slate-400">Clinical Operations Portal</p>
        </div>
      </div>

      {/* Current Role Banner in Sidebar */}
      <div className="px-4 py-3 bg-slate-800/60 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-sky-400 font-semibold">
          <User className="w-3.5 h-3.5" /> {currentProfile.name}
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">{currentProfile.title}</p>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {/* TAB: PATIENT PORTAL (For Patients Only) */}
        {currentProfile.allowedTabs.includes("patient_portal") && (
          <button
            onClick={() => setActiveTab("patient_portal")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "patient_portal"
                ? "bg-sky-600 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-sky-400"
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400" /> My Patient Portal
          </button>
        )}

        {/* TAB: DASHBOARD (Staff & Admins) */}
        {currentProfile.allowedTabs.includes("dashboard") && (
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "dashboard"
                ? "bg-sky-600 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-sky-400"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Hospital Census Dashboard
          </button>
        )}

        {/* TAB: EHR RECORDS */}
        {currentProfile.allowedTabs.includes("records") && (
          <button
            onClick={() => setActiveTab("records")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "records"
                ? "bg-sky-600 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-sky-400"
            }`}
          >
            <FileText className="w-4 h-4" />{" "}
            {currentProfile.role === "PATIENT" ? "My Medical Chart" : "Patient Charts (EHR)"}
          </button>
        )}

        {/* TAB: TRIAGE */}
        {currentProfile.allowedTabs.includes("triage") && (
          <button
            onClick={() => setActiveTab("triage")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "triage"
                ? "bg-sky-600 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-sky-400"
            }`}
          >
            <Siren className="w-4 h-4" />{" "}
            {currentProfile.role === "PATIENT" ? "Request Clinical Care" : "Emergency Triage"}
          </button>
        )}

        {/* TAB: REPORTS & LABS */}
        {currentProfile.allowedTabs.includes("reports") && (
          <button
            onClick={() => setActiveTab("reports")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "reports"
                ? "bg-sky-600 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-sky-400"
            }`}
          >
            <FlaskConical className="w-4 h-4" />{" "}
            {currentProfile.role === "PATIENT" ? "My Lab Results & Orders" : "Clinical Reports & Lab"}
          </button>
        )}

        {/* TAB: DEPARTMENT SUITES (Doctors, Admins) */}
        {currentProfile.allowedTabs.includes("department") && (
          <button
            onClick={() => setActiveTab("department")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "department"
                ? "bg-sky-600 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-sky-400"
            }`}
          >
            <Building2 className="w-4 h-4" /> Department Suites
          </button>
        )}

        {/* TAB: STAFF DIRECTORY (All except Patients) */}
        {currentProfile.allowedTabs.includes("staff") && (
          <button
            onClick={() => setActiveTab("staff")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "staff"
                ? "bg-sky-600 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-sky-400"
            }`}
          >
            <Users className="w-4 h-4" /> Medical Staff Directory
          </button>
        )}

        {/* TAB: AUDIT REGISTRY (Administrator Only) */}
        {currentProfile.allowedTabs.includes("audit") && (
          <button
            onClick={() => setActiveTab("audit")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "audit"
                ? "bg-sky-600 text-white font-semibold shadow-sm"
                : "text-slate-300 hover:bg-slate-800 hover:text-sky-400"
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" /> Security & Audit Log
          </button>
        )}
      </nav>

      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 leading-tight text-center">
        Mercy Health Network &bull; Role-Based Access<br />
        HIPAA Title II Privacy Compliant
      </div>
    </aside>
  );
};
