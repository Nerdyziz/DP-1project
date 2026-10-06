"use client";

import React from "react";
import { Bell, X } from "lucide-react";

interface NotificationsDrawerProps {
  showDrawer: boolean;
  setShowDrawer: (show: boolean) => void;
  notifications: string[];
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  showDrawer,
  setShowDrawer,
  notifications,
}) => {
  if (!showDrawer) return null;

  return (
    <div className="fixed right-6 bottom-6 w-96 bg-white border border-slate-200 rounded-xl shadow-2xl p-4 z-50 animate-in slide-in-from-bottom-5 duration-150">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-sky-600" /> Live Clinical Alerts & SMS Dispatch
        </h4>
        <button
          onClick={() => setShowDrawer(false)}
          className="text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {notifications.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">No recent notifications.</p>
        ) : (
          notifications.map((msg, i) => (
            <div
              key={i}
              className="p-2.5 rounded-lg bg-slate-50 border-l-3 border-l-sky-600 text-xs text-slate-700"
            >
              {msg}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
