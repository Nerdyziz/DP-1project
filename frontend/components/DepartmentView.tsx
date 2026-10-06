"use client";

import React from "react";
import { Building2, AlertTriangle, RefreshCw } from "lucide-react";
import { DepartmentSuite } from "@/types";

interface DepartmentViewProps {
  selectedDept: string;
  setSelectedDept: (dept: string) => void;
  loadDepartmentData: (dept: string) => void;
  deptLoading: boolean;
  deptError: string | null;
  deptSuite: DepartmentSuite | null;
}

export const DepartmentView: React.FC<DepartmentViewProps> = ({
  selectedDept,
  setSelectedDept,
  loadDepartmentData,
  deptLoading,
  deptError,
  deptSuite,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="pb-3 border-b border-slate-100 mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-600" /> Specialized Department Diagnostic & Protocol Suites
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Each clinical department operates a coherent family of diagnostic tools, official study report standards, and regulatory informed consent protocols.
          </p>
        </div>

        {deptError && (
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg text-xs text-rose-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            {deptError}
          </div>
        )}

        <div className="flex flex-wrap items-end gap-3 mb-6">
          <div className="w-80">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Department:
            </label>
            <select
              value={selectedDept}
              onChange={(e) => {
                setSelectedDept(e.target.value);
                loadDepartmentData(e.target.value);
              }}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden"
            >
              <option value="cardiology">Department of Cardiovascular Medicine</option>
              <option value="radiology">Department of Radiology & Medical Imaging</option>
            </select>
          </div>
          <button
            onClick={() => loadDepartmentData(selectedDept)}
            disabled={deptLoading}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${deptLoading ? "animate-spin" : ""}`} /> Run Calibration & Protocols
          </button>
        </div>

        {deptSuite && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tool Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  1. Diagnostic Instrument
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-bold">
                  ONLINE & CALIBRATED
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{deptSuite.tool}</h4>
              <p className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed font-mono text-[11px]">
                {deptSuite.scanResult}
              </p>
            </div>

            {/* Report Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  2. Study Report
                </span>
                <span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full text-[10px] font-bold">
                  {deptSuite.reportStandard}
                </span>
              </div>
              <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed font-mono text-[11px] whitespace-pre-wrap">
                {deptSuite.sampleReport}
              </div>
            </div>

            {/* Consent Form Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  3. Informed Consent
                </span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-[10px] font-bold">
                  MANDATORY
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{deptSuite.consentTitle}</h4>
              <ul className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 space-y-1.5 list-disc list-inside">
                {deptSuite.disclosures.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
