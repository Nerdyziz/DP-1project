"use client";

import React from "react";
import { Siren, CheckCircle2, UserCheck, Shield } from "lucide-react";
import { RoleProfile, TriageItem } from "@/types";

interface TriageViewProps {
  currentProfile: RoleProfile;
  triagePatient: string;
  setTriagePatient: (val: string) => void;
  triageAcuity: string;
  setTriageAcuity: (val: string) => void;
  triageComplaint: string;
  setTriageComplaint: (val: string) => void;
  handleTriageSubmit: (e: React.FormEvent) => void;
  triageLoading: boolean;
  lastTriageResult: TriageItem | null;
  triageQueue: TriageItem[];
}

export const TriageView: React.FC<TriageViewProps> = ({
  currentProfile,
  triagePatient,
  setTriagePatient,
  triageAcuity,
  setTriageAcuity,
  triageComplaint,
  setTriageComplaint,
  handleTriageSubmit,
  triageLoading,
  lastTriageResult,
  triageQueue,
}) => {
  // Only Receptionist (Admissions Desk) and Chief Administrator can intake and route walk-in patients!
  const canAdmitPatient =
    currentProfile.role === "RECEPTIONIST" || currentProfile.role === "ADMIN";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 1. ADMISSION INTAKE DESK (Receptionist & Admin Only) */}
      {canAdmitPatient ? (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="pb-3 border-b border-slate-100 mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Siren className="w-5 h-5 text-rose-600" /> Walk-In Patient Admission & Clinical Triage Intake
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Admissions Desk: Register walk-in patient, classify presenting acuity, and route through the hospital triage escalation pipeline.
              </p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" /> Admissions Desk Authorized
            </span>
          </div>

          <form onSubmit={handleTriageSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Walk-in Patient Full Name:
              </label>
              <input
                type="text"
                value={triagePatient}
                onChange={(e) => setTriagePatient(e.target.value)}
                placeholder="e.g. David Williams"
                required
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Acuity Classification:
              </label>
              <select
                value={triageAcuity}
                onChange={(e) => setTriageAcuity(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden"
              >
                <option value="GENERAL_QUERY">🟢 General Inquiry / Billing / Schedule (Admissions Desk)</option>
                <option value="VITALS_TRIAGE">🟡 Routine Vitals / Dressing / Sprain (Triage Nurse)</option>
                <option value="PRIMARY_CARE">🟠 Acute Fever / Severe Pain (Attending Physician)</option>
                <option value="SPECIALIZED_CARE">🔴 Complex Cardiac Trauma / ICU (Sub-Specialist)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Presenting Symptoms & Intake Notes:
              </label>
              <input
                type="text"
                value={triageComplaint}
                onChange={(e) => setTriageComplaint(e.target.value)}
                required
                placeholder="Describe presenting complaints and chief observations..."
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={triageLoading}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-xs"
              >
                <Siren className="w-4 h-4" /> Admit & Route Patient to Clinical Pipeline
              </button>
            </div>
          </form>

          {lastTriageResult && (
            <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 animate-in fade-in duration-150">
              <div className="flex items-center gap-2 font-bold text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Triage Successfully Resolved: Assigned to {lastTriageResult.resolvedBy}
              </div>
              <p className="text-xs text-emerald-700 mt-1">
                Patient <strong>{lastTriageResult.patient}</strong> triaged at acuity tier{" "}
                <strong>{lastTriageResult.type}</strong>.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* 2. CLINICAL QUEUE BANNER (Doctors & Nurses) */
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Siren className="w-5 h-5 text-sky-600" /> Clinical Triage Queue & Assigned Cases
            </h3>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-full text-xs font-semibold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-slate-500" /> Admissions Desk: Emily Clark (Receptionist)
            </span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Walk-in patient registration, acuity evaluation, and initial clinical routing are managed exclusively at the <strong>Admissions Desk</strong>. Review your assigned cases and clinical evaluation queue in the shift roster below.
          </p>
        </div>
      )}

      {/* 3. SHIFT TRIAGE ROSTER TABLE */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-slate-900">Shift Triage Roster</h4>
          <span className="text-xs text-slate-400 font-mono">
            Total Intake Queue: {triageQueue.length} Patients
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-semibold">
                <th className="py-2.5 px-3">Intake ID</th>
                <th className="py-2.5 px-3">Patient</th>
                <th className="py-2.5 px-3">Acuity</th>
                <th className="py-2.5 px-3">Symptoms</th>
                <th className="py-2.5 px-3">Assigned Clinician</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {triageQueue.map((item) => {
                const isAssignedToDoctor =
                  item.resolvedBy.includes("Doctor") || item.resolvedBy.includes("Specialist");
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-700">{item.id}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{item.patient}</td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          item.type === "SPECIALIZED_CARE"
                            ? "bg-rose-100 text-rose-800"
                            : item.type === "PRIMARY_CARE"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-sky-100 text-sky-800"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate">
                      {item.complaint}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">
                      {item.resolvedBy}
                      {currentProfile.role === "DOCTOR" && isAssignedToDoctor && (
                        <span className="ml-2 px-1.5 py-0.5 bg-sky-100 text-sky-700 rounded-sm text-[9px] font-bold uppercase">
                          Your Service
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
                        TRIAGED
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
