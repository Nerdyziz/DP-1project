"use client";

import React from "react";
import { FileText, Lock, Shield, FileCheck, AlertTriangle } from "lucide-react";
import { RoleProfile, MedicalRecord } from "@/types";

interface RecordsViewProps {
  currentProfile: RoleProfile;
  selectedRecordId: string;
  setSelectedRecordId: (id: string) => void;
  handleOpenRecord: () => void;
  recordLoading: boolean;
  recordError: string | null;
  loadedRecord: MedicalRecord | null;
}

export const RecordsView: React.FC<RecordsViewProps> = ({
  currentProfile,
  selectedRecordId,
  setSelectedRecordId,
  handleOpenRecord,
  recordLoading,
  recordError,
  loadedRecord,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-600" /> Electronic Health Records (EHR) Patient Chart
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentProfile.role === "PATIENT"
                ? "Confidential personal health record protected under HIPAA Title II privacy protocols."
                : "Attending clinicians only. Access attempts to unassigned patients are intercepted and logged."}
            </p>
          </div>
          <span className="px-2.5 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-xs font-semibold flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> HIPAA Security Clearance
          </span>
        </div>

        {/* Patient Role Lock Notice */}
        {currentProfile.role === "PATIENT" && (
          <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg text-xs text-sky-800 mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-600" />
            Viewing restricted to your personal authenticated patient chart (#{currentProfile.patientId}).
          </div>
        )}

        <div className="flex flex-wrap items-end gap-3 mb-4">
          <div className="flex-1 min-w-[280px]">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Patient Chart:
            </label>
            <select
              value={selectedRecordId}
              onChange={(e) => setSelectedRecordId(e.target.value)}
              disabled={currentProfile.role === "PATIENT"}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden disabled:bg-slate-100 disabled:text-slate-600"
            >
              <option value="REC-101">
                Patient Alice Henderson (#REC-101) - Attending: Dr. Robert Smith
              </option>
              <option value="REC-102">
                Patient Bob Vance (#REC-102) - Attending: Dr. Gregory Jones
              </option>
            </select>
          </div>

          <button
            onClick={handleOpenRecord}
            disabled={recordLoading}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-2 shadow-xs"
          >
            <FileCheck className="w-4 h-4" /> Open Medical Chart
          </button>
        </div>

        {/* HIPAA ACCESS RESTRICTED ALERT (Protection Proxy in Action) */}
        {recordError && (
          <div className="mt-4 p-4 rounded-lg bg-rose-50 border-2 border-rose-400 text-rose-900 animate-in fade-in duration-150">
            <div className="flex items-center gap-2 font-extrabold text-sm text-rose-800">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              RESTRICTED ACCESS: HIPAA PRIVACY & SECURITY RULE ENFORCEMENT
            </div>
            <p className="text-xs mt-1.5 leading-relaxed">{recordError}</p>
            <div className="mt-2 text-[11px] font-semibold text-rose-700">
              Security incident timestamped and permanently registered to Hospital Compliance Audit Registry.
            </div>
          </div>
        )}

        {/* CLINICAL CHART DISPLAY */}
        {loadedRecord && (
          <div className="mt-6 border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-sky-600">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{loadedRecord.patientId}</h4>
                <span className="text-xs font-mono text-slate-500">
                  Record Number: {loadedRecord.recordId}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Attending Physician Clearance Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="font-semibold text-slate-400 uppercase text-[10px]">
                  Attending Physician
                </span>
                <p className="font-semibold text-slate-800 mt-0.5">{loadedRecord.doctorId}</p>
              </div>
              <div>
                <span className="font-semibold text-slate-400 uppercase text-[10px]">
                  Security Tier
                </span>
                <p className="font-semibold text-slate-800 mt-0.5">Confidential Inpatient ePHI</p>
              </div>
              <div>
                <span className="font-semibold text-slate-400 uppercase text-[10px]">
                  Last Evaluated
                </span>
                <p className="font-semibold text-slate-800 mt-0.5">{loadedRecord.timestamp}</p>
              </div>
            </div>

            <div>
              <span className="font-semibold text-slate-400 uppercase text-[10px]">
                Clinical Diagnosis
              </span>
              <div className="mt-1 p-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 border-l-4 border-l-sky-600">
                {loadedRecord.diagnosis}
              </div>
            </div>

            <div>
              <span className="font-semibold text-slate-400 uppercase text-[10px]">
                Prescription Orders
              </span>
              <div className="mt-1 p-3 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 border-l-4 border-l-emerald-600">
                {loadedRecord.prescription}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
