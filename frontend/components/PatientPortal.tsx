"use client";

import React, { useState } from "react";
import { FileText, FlaskConical, BellRing, CheckCircle2 } from "lucide-react";
import { RoleProfile } from "@/types";

interface PatientPortalProps {
  currentProfile: RoleProfile;
  setActiveTab: (tab: string) => void;
  handleOpenRecord: () => void;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({
  currentProfile,
  setActiveTab,
  handleOpenRecord,
}) => {
  const [nurseAlertSent, setNurseAlertSent] = useState<boolean>(false);

  const handleNurseCall = () => {
    setNurseAlertSent(true);
    setTimeout(() => {
      setNurseAlertSent(false);
    }, 6000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Patient Welcome Banner */}
      <div className="bg-gradient-to-r from-sky-700 to-indigo-800 rounded-2xl p-6 text-white shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
              Verified Patient Care Portal
            </span>
            <h3 className="text-2xl font-black mt-2">Welcome back, {currentProfile.name}</h3>
            <p className="text-xs text-sky-100 mt-1">
              MRN: <span className="font-mono font-bold">{currentProfile.id}</span> &bull; Room: 402
              (Cardiac Telemetry) &bull; Attending Physician:{" "}
              <strong>{currentProfile.assignedDoctor}</strong>
            </p>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-sky-200">Next Scheduled Rounding</span>
            <span className="text-sm font-bold">Today at 14:00</span>
          </div>
        </div>
      </div>

      {/* Bedside Assistance Confirmation Banner */}
      {nurseAlertSent && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center justify-between animate-in fade-in duration-200 shadow-xs">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <h5 className="font-bold text-xs text-emerald-900">
                Bedside Nurse Alert Dispatched to Ward 2 Station
              </h5>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                Head Nurse Sarah Jenkins, RN has received your call signal for Room 402. An attending clinician will be with you shortly.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
            SIGNAL SENT
          </span>
        </div>
      )}

      {/* Personal Health Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Blood Pressure</span>
          <div className="text-xl font-black text-slate-900 mt-1">
            120/78 <span className="text-xs font-normal text-slate-500">mmHg</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600">Optimal Range</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Heart Rate</span>
          <div className="text-xl font-black text-slate-900 mt-1">
            72 <span className="text-xs font-normal text-slate-500">bpm</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600">Normal Sinus Rhythm</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Blood Oxygen (SpO2)</span>
          <div className="text-xl font-black text-slate-900 mt-1">98%</div>
          <span className="text-[11px] font-semibold text-emerald-600">Normal Oxygenation</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase text-slate-400">Allergies on Record</span>
          <div className="text-sm font-bold text-rose-700 mt-1">Penicillin (Severe)</div>
          <span className="text-[11px] font-semibold text-slate-500">Flagged in EHR</span>
        </div>
      </div>

      {/* Patient Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => {
            setActiveTab("records");
            handleOpenRecord();
          }}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-sky-500 transition cursor-pointer group"
        >
          <FileText className="w-6 h-6 text-sky-600 group-hover:scale-110 transition-transform mb-2" />
          <h4 className="font-bold text-sm text-slate-900">My Clinical Chart</h4>
          <p className="text-xs text-slate-500 mt-1">
            Review diagnoses, physician clinical notes, and inpatient history.
          </p>
          <span className="text-xs font-bold text-sky-600 mt-3 inline-block">View Chart &rarr;</span>
        </div>

        <div
          onClick={() => setActiveTab("reports")}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-500 transition cursor-pointer group"
        >
          <FlaskConical className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform mb-2" />
          <h4 className="font-bold text-sm text-slate-900">My Laboratory Results</h4>
          <p className="text-xs text-slate-500 mt-1">
            Download official pathology reports and active prescriptions.
          </p>
          <span className="text-xs font-bold text-emerald-600 mt-3 inline-block">
            Download Results &rarr;
          </span>
        </div>

        <div
          onClick={handleNurseCall}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-amber-500 transition cursor-pointer group"
        >
          <BellRing className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform mb-2" />
          <h4 className="font-bold text-sm text-slate-900">Request Bedside Assistance</h4>
          <p className="text-xs text-slate-500 mt-1">
            Send an instant notification directly to Ward 2 nursing station.
          </p>
          <span className="text-xs font-bold text-amber-600 mt-3 inline-block">
            Signal Nurse Station &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
