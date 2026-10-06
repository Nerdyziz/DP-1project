"use client";

import React from "react";
import { FlaskConical, FileText, Download } from "lucide-react";
import { RoleProfile } from "@/types";

interface ReportsViewProps {
  currentProfile: RoleProfile;
  labPatient: string;
  setLabPatient: (p: string) => void;
  labReportId: string;
  setLabReportId: (id: string) => void;
  handleCompleteLab: () => void;
  reportDocType: string;
  setReportDocType: (type: string) => void;
  reportPatientName: string;
  setReportPatientName: (p: string) => void;
  reportFormat: string;
  setReportFormat: (f: string) => void;
  handleGenerateDocument: () => void;
  handleDownloadDoc: () => void;
  reportLoading: boolean;
  generatedDoc: string;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  currentProfile,
  labPatient,
  setLabPatient,
  labReportId,
  setLabReportId,
  handleCompleteLab,
  reportDocType,
  setReportDocType,
  reportPatientName,
  setReportPatientName,
  reportFormat,
  setReportFormat,
  handleGenerateDocument,
  handleDownloadDoc,
  reportLoading,
  generatedDoc,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Lab Dispatch (Clinicians & Admins Only) */}
      {currentProfile.role !== "PATIENT" && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <div className="pb-3 border-b border-slate-100 mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-emerald-600" /> Central Pathology Lab & Notification Center
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Upon specimen assay verification, real-time alerts are dispatched automatically to the patient's mobile device via SMS and the attending physician's clinical console.
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Name:
              </label>
              <input
                type="text"
                value={labPatient}
                onChange={(e) => setLabPatient(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden"
              />
            </div>
            <div className="w-48">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lab Specimen Order ID:
              </label>
              <input
                type="text"
                value={labReportId}
                onChange={(e) => setLabReportId(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden"
              />
            </div>
            <button
              onClick={handleCompleteLab}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-xs"
            >
              ⚡ Finalize Lab Order & Dispatch Alerts
            </button>
          </div>
        </div>
      )}

      {/* Medical Document Generator (Bridge Pattern) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="pb-3 border-b border-slate-100 mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-600" /> Clinical Medical Document Generator
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Dynamically renders clinical records across hospital formats (Official PDF, Web HTML, or EHR JSON) on-demand.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Document Type:
            </label>
            <select
              value={reportDocType}
              onChange={(e) => setReportDocType(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden"
            >
              <option value="lab">🔬 Laboratory Assay Report (Troponin I)</option>
              <option value="discharge">📋 Inpatient Discharge Summary</option>
              <option value="prescription">💊 Outpatient Pharmacy Prescription</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Patient Name:
            </label>
            <input
              type="text"
              value={reportPatientName}
              onChange={(e) => setReportPatientName(e.target.value)}
              disabled={currentProfile.role === "PATIENT"}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Export Format:
            </label>
            <select
              value={reportFormat}
              onChange={(e) => setReportFormat(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden"
            >
              <option value="pdf">📄 Official PDF Document Format</option>
              <option value="html">🌐 Clinical Web View (HTML)</option>
              <option value="json">💾 Interoperability JSON (HL7 / FHIR)</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={handleGenerateDocument}
            disabled={reportLoading}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-xs"
          >
            Generate Clinical Document
          </button>
          {generatedDoc && (
            <button
              onClick={handleDownloadDoc}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition flex items-center gap-2 border border-slate-200"
            >
              <Download className="w-3.5 h-3.5" /> Download File
            </button>
          )}
        </div>

        <div className="p-4 bg-slate-900 text-slate-100 font-mono text-xs rounded-xl overflow-x-auto max-h-72 border border-slate-800 whitespace-pre-wrap leading-relaxed">
          {generatedDoc || 'Click "Generate Clinical Document" to view formatted medical output...'}
        </div>
      </div>
    </div>
  );
};
