"use client";

import React from "react";
import { ShieldAlert, RefreshCw, AlertTriangle } from "lucide-react";

interface AuditViewProps {
  loadAuditData: () => void;
  auditLoading: boolean;
  auditError: string | null;
  auditLogs: string[];
}

export const AuditView: React.FC<AuditViewProps> = ({
  loadAuditData,
  auditLoading,
  auditError,
  auditLogs,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" /> HIPAA & Regulatory Compliance Audit Registry
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Centralized, thread-safe compliance registry recording all chart views, security violations, triage intakes, and lab dispatches.
            </p>
          </div>
          <button
            onClick={loadAuditData}
            disabled={auditLoading}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border border-slate-200"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${auditLoading ? "animate-spin" : ""}`} /> Live Refresh
          </button>
        </div>

        {auditError ? (
          <div className="p-4 bg-rose-50 border border-rose-300 rounded-lg text-xs text-rose-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>{auditError}</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-semibold">
                  <th className="py-2.5 px-3">Registry Audit Entry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {auditLogs.map((log, i) => {
                  const isDenied = log.includes("ACCESS_DENIED");
                  return (
                    <tr key={i} className={isDenied ? "bg-rose-50/60" : "hover:bg-slate-50/50"}>
                      <td
                        className={`py-2 px-3 ${
                          isDenied ? "text-rose-800 font-semibold" : "text-slate-800"
                        }`}
                      >
                        {log}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
