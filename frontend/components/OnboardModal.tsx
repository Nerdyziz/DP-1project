"use client";

import React from "react";
import { X } from "lucide-react";

interface OnboardModalProps {
  showOnboardModal: boolean;
  setShowOnboardModal: (show: boolean) => void;
  newStaffName: string;
  setNewStaffName: (name: string) => void;
  newStaffRole: string;
  setNewStaffRole: (role: string) => void;
  newStaffDept: string;
  setNewStaffDept: (dept: string) => void;
  newStaffSpec: string;
  setNewStaffSpec: (spec: string) => void;
  handleOnboardStaff: (e: React.FormEvent) => void;
  isCurrentAdmin: boolean;
}

export const OnboardModal: React.FC<OnboardModalProps> = ({
  showOnboardModal,
  setShowOnboardModal,
  newStaffName,
  setNewStaffName,
  newStaffRole,
  setNewStaffRole,
  newStaffDept,
  setNewStaffDept,
  newStaffSpec,
  setNewStaffSpec,
  handleOnboardStaff,
  isCurrentAdmin,
}) => {
  if (!showOnboardModal || !isCurrentAdmin) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-100">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h4 className="text-sm font-bold text-slate-900">Onboard Healthcare Professional</h4>
          <button
            onClick={() => setShowOnboardModal(false)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleOnboardStaff} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name:</label>
            <input
              type="text"
              placeholder="Dr. Allison Cameron"
              value={newStaffName}
              onChange={(e) => setNewStaffName(e.target.value)}
              required
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Role:</label>
            <select
              value={newStaffRole}
              onChange={(e) => setNewStaffRole(e.target.value)}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden"
            >
              <option value="DOCTOR">Attending Physician (Doctor)</option>
              <option value="NURSE">Registered Nurse</option>
              <option value="TECHNICIAN">Diagnostic Imaging Technician</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Department:</label>
            <input
              type="text"
              value={newStaffDept}
              onChange={(e) => setNewStaffDept(e.target.value)}
              required
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Specialization:</label>
            <input
              type="text"
              value={newStaffSpec}
              onChange={(e) => setNewStaffSpec(e.target.value)}
              required
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:border-sky-500 focus:outline-hidden"
            />
          </div>

          <div className="pt-2 flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowOnboardModal(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
            >
              Complete Onboarding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
