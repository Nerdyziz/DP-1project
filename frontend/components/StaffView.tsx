"use client";

import React from "react";
import { Users, Plus } from "lucide-react";
import { RoleProfile, StaffMember } from "@/types";

interface StaffViewProps {
  currentProfile: RoleProfile;
  staffList: StaffMember[];
  setShowOnboardModal: (show: boolean) => void;
}

export const StaffView: React.FC<StaffViewProps> = ({
  currentProfile,
  staffList,
  setShowOnboardModal,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-600" /> Hospital Clinical Staff Directory
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Registry of attending physicians, registered nursing staff, and specialized technicians.
            </p>
          </div>

          {/* Onboarding Button ONLY visible to Administrator */}
          {currentProfile.role === "ADMIN" ? (
            <button
              onClick={() => setShowOnboardModal(true)}
              className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Onboard Healthcare Personnel
            </button>
          ) : (
            <span className="text-[11px] text-slate-400 italic">
              Staff hiring managed by HR Compliance Administration
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] font-semibold">
                <th className="py-3 px-3">Clinician Name</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Specialization</th>
                <th className="py-3 px-3">Assigned Duty</th>
                <th className="py-3 px-3">Monthly Compensation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staffList.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-bold text-slate-900">{s.name}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full text-[10px] font-bold">
                      {s.role}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700">{s.department}</td>
                  <td className="py-3 px-3 text-slate-600">{s.specialization}</td>
                  <td className="py-3 px-3 text-slate-500 max-w-xs text-[11px] leading-tight">
                    {s.duty}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {s.showSalary ? `$${s.salary.toFixed(2)}` : "Confidential"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
