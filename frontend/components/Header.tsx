"use client";

import React from "react";
import { UserCheck, Clock, Bell } from "lucide-react";
import { RoleProfile } from "@/types";

interface HeaderProps {
  activeTab: string;
  currentProfile: RoleProfile;
  currentUser: string;
  onUserRoleChange: (newUserId: string) => void;
  currentTime: string;
  unreadCount: number;
  showDrawer: boolean;
  setShowDrawer: (show: boolean) => void;
  setUnreadCount: (count: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  currentProfile,
  currentUser,
  onUserRoleChange,
  currentTime,
  unreadCount,
  showDrawer,
  setShowDrawer,
  setUnreadCount,
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between flex-shrink-0 shadow-xs">
      <div className="flex items-center gap-4">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          {activeTab === "patient_portal" && "Patient Health & Care Portal"}
          {activeTab === "dashboard" && "Hospital Census & Overview"}
          {activeTab === "records" &&
            (currentProfile.role === "PATIENT" ? "My Medical Record" : "Patient EHR Charts")}
          {activeTab === "triage" &&
            (currentProfile.role === "PATIENT" ? "Care Request & Intake" : "Emergency Triage")}
          {activeTab === "reports" && "Clinical Documents & Laboratory"}
          {activeTab === "department" && "Specialized Department Suites"}
          {activeTab === "staff" && "Medical Personnel Directory"}
          {activeTab === "audit" && "HIPAA Compliance & Security Registry"}
        </h2>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Emergency Level 1: Normal
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Interactive User Role Switcher */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
          <UserCheck className="w-4 h-4 text-sky-600" />
          <span className="text-xs text-slate-500 font-medium">Active User:</span>
          <select
            value={currentUser}
            onChange={(e) => onUserRoleChange(e.target.value)}
            className="bg-transparent text-xs font-semibold text-slate-900 outline-hidden cursor-pointer"
          >
            <option value="P-1">👤 Alice Henderson (Patient #P-1)</option>
            <option value="P-2">👤 Bob Vance (Patient #P-2)</option>
            <option value="REC-1">📋 Emily Clark (Admissions Receptionist)</option>
            <option value="NURSE-1">👩‍⚕️ Sarah Jenkins, RN (Head Nurse)</option>
            <option value="DOC-1">🩺 Dr. Robert Smith (Cardiology Attending)</option>
            <option value="DOC-2">🩺 Dr. Gregory Jones (Orthopedics Attending)</option>
            <option value="ADMIN-1">🛡️ Compliance Officer (Chief Administrator)</option>
          </select>
        </div>

        {/* Clock */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-md border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          {currentTime}
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => {
            setShowDrawer(!showDrawer);
            setUnreadCount(0);
          }}
          className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          title="Clinical Alerts"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
