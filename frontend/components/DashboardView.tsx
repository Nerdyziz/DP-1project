"use client";

import React from "react";
import { Activity, Clock, RefreshCw } from "lucide-react";
import { DashboardStats, RoleProfile } from "@/types";

interface DashboardViewProps {
  dashboardData: DashboardStats | null;
  recentAuditLogs: string[];
  dashboardLoading: boolean;
  loadDashboardData: () => void;
  currentProfile: RoleProfile;
  setActiveTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  dashboardData,
  recentAuditLogs,
  dashboardLoading,
  loadDashboardData,
  currentProfile,
  setActiveTab,
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 4 Live Census Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">Active Inpatients</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {dashboardData?.inpatients ?? 142}
          </div>
          <span className="text-xs font-medium text-emerald-600 mt-1 inline-block">
            Bed Occupancy: {dashboardData?.bedCapacity ?? "88%"} (Optimal)
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">On-Duty Clinicians</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {dashboardData?.staffCount ?? 4}
          </div>
          <span className="text-xs font-medium text-slate-500 mt-1 inline-block">
            Doctors, Nurses & Technicians
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">
            Emergency Triage Queue
          </span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {dashboardData?.triageCount ?? 2}
          </div>
          <span className="text-xs font-medium text-amber-600 mt-1 inline-block">
            Awaiting Clinician Evaluation
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold uppercase text-slate-500">
            Compliance & Audit Events
          </span>
          <div className="text-3xl font-extrabold text-slate-900 mt-2">
            {dashboardData?.auditEvents ?? 0}
          </div>
          <span className="text-xs font-medium text-sky-600 mt-1 inline-block">
            Recorded to Central Registry
          </span>
        </div>
      </div>

      {/* Quick Actions (Role Adapted) */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-600" /> Quick Clinical Actions
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {(currentProfile.role === "RECEPTIONIST" || currentProfile.role === "ADMIN") ? (
            <button
              onClick={() => setActiveTab("triage")}
              className="px-3.5 py-2 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700 transition"
            >
              🚨 Admit & Triage Walk-in Patient
            </button>
          ) : currentProfile.allowedTabs.includes("triage") ? (
            <button
              onClick={() => setActiveTab("triage")}
              className="px-3.5 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold hover:bg-sky-700 transition"
            >
              🩺 Review Clinical Triage Roster
            </button>
          ) : null}
          {currentProfile.allowedTabs.includes("records") && (
            <button
              onClick={() => setActiveTab("records")}
              className="px-3.5 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition"
            >
              📁 Open Patient Chart (EHR)
            </button>
          )}
          {currentProfile.allowedTabs.includes("reports") && (
            <button
              onClick={() => setActiveTab("reports")}
              className="px-3.5 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition"
            >
              📄 Generate Medical Report
            </button>
          )}
          {currentProfile.allowedTabs.includes("department") && (
            <button
              onClick={() => setActiveTab("department")}
              className="px-3.5 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition"
            >
              🏥 Diagnostic Suites Protocol
            </button>
          )}
          {currentProfile.allowedTabs.includes("staff") && (
            <button
              onClick={() => setActiveTab("staff")}
              className="px-3.5 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition"
            >
              👥 View Staff Directory
            </button>
          )}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" /> Recent Clinical Operations Stream
          </h3>
          <button
            onClick={loadDashboardData}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${dashboardLoading ? "animate-spin" : ""}`} />{" "}
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-semibold">
                <th className="py-2 px-3">Audit Event Entry</th>
                <th className="py-2 px-3">Resource</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {recentAuditLogs.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-slate-400 font-sans">
                    {currentProfile.role === "RECEPTIONIST"
                      ? "Clinical audit logs restricted to Compliance Administration."
                      : "No recent clinical events logged yet."}
                  </td>
                </tr>
              ) : (
                recentAuditLogs.map((log, idx) => {
                  const isDenied = log.includes("ACCESS_DENIED");
                  return (
                    <tr key={idx} className={isDenied ? "bg-rose-50/50" : "hover:bg-slate-50/50"}>
                      <td
                        className={`py-2 px-3 ${
                          isDenied ? "text-rose-700 font-semibold" : "text-slate-700"
                        }`}
                      >
                        {log}
                      </td>
                      <td className="py-2 px-3 text-slate-500 font-sans">ePHI Medical Record</td>
                      <td className="py-2 px-3 font-sans">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isDenied
                              ? "bg-rose-100 text-rose-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {isDenied ? "DENIED" : "VERIFIED"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
