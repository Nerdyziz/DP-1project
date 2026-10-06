"use client";

import React, { useState, useEffect } from "react";
import {
  Sidebar,
  Header,
  NotificationsDrawer,
  OnboardModal,
  PatientPortal,
  DashboardView,
  RecordsView,
  TriageView,
  ReportsView,
  DepartmentView,
  StaffView,
  AuditView,
} from "@/components";
import {
  ROLE_PROFILES,
  DashboardStats,
  MedicalRecord,
  TriageItem,
  StaffMember,
  DepartmentSuite,
} from "@/types";

export default function HospitalPortal() {
  const [currentUser, setCurrentUser] = useState<string>("DOC-1");
  const currentProfile = ROLE_PROFILES[currentUser] || ROLE_PROFILES["DOC-1"];
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  // 1. Dashboard State
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [recentAuditLogs, setRecentAuditLogs] = useState<string[]>([]);
  const [dashboardLoading, setDashboardLoading] = useState<boolean>(false);

  // 2. Records (EHR) State
  const [selectedRecordId, setSelectedRecordId] = useState<string>("REC-101");
  const [loadedRecord, setLoadedRecord] = useState<MedicalRecord | null>(null);
  const [recordError, setRecordError] = useState<string | null>(null);
  const [recordLoading, setRecordLoading] = useState<boolean>(false);

  // 3. Triage State
  const [triagePatient, setTriagePatient] = useState<string>("Michael Chang");
  const [triageAcuity, setTriageAcuity] = useState<string>("PRIMARY_CARE");
  const [triageComplaint, setTriageComplaint] = useState<string>(
    "Sudden onset radiating substernal chest discomfort, diaphoresis, BP 145/95."
  );
  const [triageQueue, setTriageQueue] = useState<TriageItem[]>([]);
  const [lastTriageResult, setLastTriageResult] = useState<TriageItem | null>(null);
  const [triageLoading, setTriageLoading] = useState<boolean>(false);

  // 4. Lab & Reports State
  const [labPatient, setLabPatient] = useState<string>("Alice Henderson");
  const [labReportId, setLabReportId] = useState<string>("LAB-8891");
  const [reportDocType, setReportDocType] = useState<string>("lab");
  const [reportPatientName, setReportPatientName] = useState<string>("Alice Henderson");
  const [reportFormat, setReportFormat] = useState<string>("pdf");
  const [generatedDoc, setGeneratedDoc] = useState<string>("");
  const [reportLoading, setReportLoading] = useState<boolean>(false);

  // 5. Department Suites State
  const [selectedDept, setSelectedDept] = useState<string>("cardiology");
  const [deptSuite, setDeptSuite] = useState<DepartmentSuite | null>(null);
  const [deptLoading, setDeptLoading] = useState<boolean>(false);
  const [deptError, setDeptError] = useState<string | null>(null);

  // 6. Staff Directory State
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [showOnboardModal, setShowOnboardModal] = useState<boolean>(false);
  const [newStaffName, setNewStaffName] = useState<string>("");
  const [newStaffRole, setNewStaffRole] = useState<string>("DOCTOR");
  const [newStaffDept, setNewStaffDept] = useState<string>("Critical Care");
  const [newStaffSpec, setNewStaffSpec] = useState<string>(
    "Intensivist / Trauma Resuscitation"
  );
  const [staffLoading, setStaffLoading] = useState<boolean>(false);

  // 7. Security Audit State
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [auditLoading, setAuditLoading] = useState<boolean>(false);
  const [auditError, setAuditError] = useState<string | null>(null);

  // Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Notifications helper
  const addNotification = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setNotifications((prev) => [`[${timestamp}] ${msg}`, ...prev]);
    setUnreadCount((c) => c + 1);
  };

  // Handle Role Switch
  const handleUserRoleChange = (newUserId: string) => {
    setCurrentUser(newUserId);
    const profile = ROLE_PROFILES[newUserId] || ROLE_PROFILES["DOC-1"];
    addNotification(`Switched role session to: ${profile.name} (${profile.title})`);

    // Reset records view
    setLoadedRecord(null);
    setRecordError(null);

    // Auto-adjust default record for patient
    if (profile.role === "PATIENT" && profile.patientId) {
      setSelectedRecordId(profile.patientId);
      setReportPatientName(profile.name);
      setTriagePatient(profile.name);
    }

    // If current tab is not permitted for the new role, switch to their default tab
    if (!profile.allowedTabs.includes(activeTab)) {
      setActiveTab(profile.defaultTab);
    }
  };

  // Initial Load
  useEffect(() => {
    loadDashboardData();
  }, []);

  // Tab Changed Trigger
  useEffect(() => {
    if (activeTab === "dashboard") loadDashboardData();
    if (activeTab === "triage") loadTriageData();
    if (activeTab === "staff") loadStaffData();
    if (activeTab === "audit") loadAuditData();
    if (activeTab === "department") loadDepartmentData(selectedDept);
  }, [activeTab, currentUser]);

  // 1. Dashboard API
  const loadDashboardData = async () => {
    setDashboardLoading(true);
    try {
      const res = await fetch("/api/dashboard");
      if (res.ok) {
        const data: DashboardStats = await res.json();
        setDashboardData(data);
        if (data.recentLogs && data.recentLogs.length > 0) {
          setRecentAuditLogs(data.recentLogs.slice().reverse());
        }
      }
      const auditRes = await fetch(
        `/api/audit?userId=${encodeURIComponent(currentUser)}`
      );
      if (auditRes.ok) {
        const logs = await auditRes.json();
        if (Array.isArray(logs) && logs.length > 0) {
          setRecentAuditLogs(logs.slice(-8).reverse());
        }
      }
    } catch (e) {
      console.error("Dashboard load failed", e);
    } finally {
      setDashboardLoading(false);
    }
  };

  // 2. Records (EHR) API
  const handleOpenRecord = async () => {
    setRecordLoading(true);
    setLoadedRecord(null);
    setRecordError(null);
    try {
      const res = await fetch(
        `/api/records?recordId=${encodeURIComponent(selectedRecordId)}&userId=${encodeURIComponent(currentUser)}`
      );
      const data = await res.json();
      if (res.ok && data.success) {
        setLoadedRecord(data.record);
        addNotification(`Patient record #${selectedRecordId} accessed by ${currentProfile.name}.`);
      } else {
        setRecordError(data.error || "Access Denied: Insufficient clinical clearance.");
        addNotification(`⚠️ Security Alert: Access Denied on ${selectedRecordId} for ${currentProfile.name}.`);
      }
    } catch (e) {
      setRecordError("Failed to communicate with records service: " + e);
    } finally {
      setRecordLoading(false);
    }
  };

  // 3. Triage API
  const loadTriageData = async () => {
    try {
      const res = await fetch(`/api/triage?userId=${encodeURIComponent(currentUser)}`);
      if (res.ok) {
        const queue = await res.json();
        setTriageQueue(queue);
      }
    } catch (e) {
      console.error("Triage load failed", e);
    }
  };

  const handleTriageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTriageLoading(true);
    try {
      const res = await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser,
          patientName: triagePatient,
          acuity: triageAcuity,
          complaint: triageComplaint,
        }),
      });
      if (res.ok) {
        const result = await res.json();
        setLastTriageResult(result);
        addNotification(`Patient ${result.patient} triaged &rarr; Assigned to ${result.resolvedBy}.`);
        loadTriageData();
      } else {
        const err = await res.json();
        alert(err.error || "Access Denied: Only Admissions Receptionist can route walk-in patients.");
      }
    } catch (e) {
      alert("Triage dispatch error: " + e);
    } finally {
      setTriageLoading(false);
    }
  };

  // 4. Lab & Reports API
  const handleCompleteLab = async () => {
    try {
      const res = await fetch("/api/lab/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientName: labPatient, reportId: labReportId }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.notifications && Array.isArray(data.notifications)) {
          data.notifications.forEach((msg: string) => addNotification(msg));
        }
        alert("✓ Laboratory assay finalized! Clinical alerts dispatched via SMS and Physician Console.");
      }
    } catch (e) {
      alert("Lab completion failed: " + e);
    }
  };

  const handleGenerateDocument = async () => {
    setReportLoading(true);
    try {
      const res = await fetch(
        `/api/reports?type=${encodeURIComponent(reportDocType)}&format=${encodeURIComponent(
          reportFormat
        )}&patient=${encodeURIComponent(reportPatientName)}`
      );
      if (res.ok) {
        const data = await res.json();
        setGeneratedDoc(data.content);
        addNotification(`Generated ${data.title} (${data.format}).`);
      }
    } catch (e) {
      alert("Document generation failed: " + e);
    } finally {
      setReportLoading(false);
    }
  };

  const handleDownloadDoc = () => {
    if (!generatedDoc) return;
    const filename = `Medical_Document.${
      reportFormat === "html" ? "html" : reportFormat === "json" ? "json" : "pdf.txt"
    }`;
    const blob = new Blob([generatedDoc], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  // 5. Department Suites API
  const loadDepartmentData = async (dept: string) => {
    setDeptLoading(true);
    setDeptError(null);
    try {
      const res = await fetch(
        `/api/department?dept=${encodeURIComponent(dept)}&userId=${encodeURIComponent(currentUser)}`
      );
      if (res.ok) {
        const data = await res.json();
        setDeptSuite(data);
        addNotification(`Calibrated ${data.department} equipment protocols.`);
      } else {
        const err = await res.json();
        setDeptError(err.error || "Access Denied: Only clinical specialists can calibrate suites.");
        setDeptSuite(null);
      }
    } catch (e) {
      console.error("Dept load failed", e);
    } finally {
      setDeptLoading(false);
    }
  };

  // 6. Staff API
  const loadStaffData = async () => {
    setStaffLoading(true);
    try {
      const res = await fetch(`/api/staff?userId=${encodeURIComponent(currentUser)}`);
      const text = await res.text();
      try {
        const list = JSON.parse(text);
        if (Array.isArray(list)) setStaffList(list);
      } catch (ignored) {}
    } catch (e) {
      console.error("Staff load failed", e);
    } finally {
      setStaffLoading(false);
    }
  };

  const handleOnboardStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/staff/onboard?userId=${encodeURIComponent(currentUser)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser,
          name: newStaffName,
          role: newStaffRole,
          department: newStaffDept,
          specialization: newStaffSpec,
        }),
      });

      let data: any = null;
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(text || `Server returned status ${res.status}`);
      }

      if (res.ok && data?.success) {
        alert(
          `✓ Onboarding Successful!\n${data.role}: ${data.name}\nDepartment: ${data.department}\nMonthly Salary: $${Number(data.salary).toFixed(
            2
          )}`
        );
        setShowOnboardModal(false);
        setNewStaffName("");
        loadStaffData();
        addNotification(`Onboarded new clinical personnel: ${data.name} (${data.role}).`);
      } else {
        alert(data?.error || "Access Denied: Only Hospital Administrators can onboard personnel.");
      }
    } catch (e: any) {
      alert("Onboarding notice: " + (e?.message || e));
    }
  };

  // 7. Security Audit API
  const loadAuditData = async () => {
    setAuditLoading(true);
    setAuditError(null);
    try {
      const res = await fetch(`/api/audit?userId=${encodeURIComponent(currentUser)}`);
      const text = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (res.ok && Array.isArray(data)) {
        setAuditLogs(data.slice().reverse());
      } else {
        setAuditError(
          data?.error || "ACCESS DENIED: Inpatient access to hospital compliance logs is restricted."
        );
        setAuditLogs([]);
      }
    } catch (e: any) {
      console.error("Audit load failed", e);
      setAuditError("Failed to communicate with audit registry: " + (e?.message || e));
    } finally {
      setAuditLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* SIDEBAR NAVIGATION */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentProfile={currentProfile}
      />

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOP BAR */}
        <Header
          activeTab={activeTab}
          currentProfile={currentProfile}
          currentUser={currentUser}
          onUserRoleChange={handleUserRoleChange}
          currentTime={currentTime}
          unreadCount={unreadCount}
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          setUnreadCount={setUnreadCount}
        />

        {/* TAB CONTENTS */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* TAB: PATIENT PORTAL (Exclusive for Patient Role) */}
          {activeTab === "patient_portal" && (
            <PatientPortal
              currentProfile={currentProfile}
              setActiveTab={setActiveTab}
              handleOpenRecord={handleOpenRecord}
            />
          )}

          {/* TAB 1: EXECUTIVE / CENSUS DASHBOARD (Staff & Admins) */}
          {activeTab === "dashboard" && (
            <DashboardView
              dashboardData={dashboardData}
              recentAuditLogs={recentAuditLogs}
              dashboardLoading={dashboardLoading}
              loadDashboardData={loadDashboardData}
              currentProfile={currentProfile}
              setActiveTab={setActiveTab}
            />
          )}

          {/* TAB 2: PATIENT CHARTS (EHR) & PROTECTION PROXY */}
          {activeTab === "records" && (
            <RecordsView
              currentProfile={currentProfile}
              selectedRecordId={selectedRecordId}
              setSelectedRecordId={setSelectedRecordId}
              handleOpenRecord={handleOpenRecord}
              recordLoading={recordLoading}
              recordError={recordError}
              loadedRecord={loadedRecord}
            />
          )}

          {/* TAB 3: EMERGENCY TRIAGE & INTAKE (Chain of Responsibility) */}
          {activeTab === "triage" && (
            <TriageView
              currentProfile={currentProfile}
              triagePatient={triagePatient}
              setTriagePatient={setTriagePatient}
              triageAcuity={triageAcuity}
              setTriageAcuity={setTriageAcuity}
              triageComplaint={triageComplaint}
              setTriageComplaint={setTriageComplaint}
              handleTriageSubmit={handleTriageSubmit}
              triageLoading={triageLoading}
              lastTriageResult={lastTriageResult}
              triageQueue={triageQueue}
            />
          )}

          {/* TAB 4: CLINICAL REPORTS & LABS (Bridge + Observer) */}
          {activeTab === "reports" && (
            <ReportsView
              currentProfile={currentProfile}
              labPatient={labPatient}
              setLabPatient={setLabPatient}
              labReportId={labReportId}
              setLabReportId={setLabReportId}
              handleCompleteLab={handleCompleteLab}
              reportDocType={reportDocType}
              setReportDocType={setReportDocType}
              reportPatientName={reportPatientName}
              setReportPatientName={setReportPatientName}
              reportFormat={reportFormat}
              setReportFormat={setReportFormat}
              handleGenerateDocument={handleGenerateDocument}
              handleDownloadDoc={handleDownloadDoc}
              reportLoading={reportLoading}
              generatedDoc={generatedDoc}
            />
          )}

          {/* TAB 5: DEPARTMENT SUITES (Abstract Factory) */}
          {activeTab === "department" && (
            <DepartmentView
              selectedDept={selectedDept}
              setSelectedDept={setSelectedDept}
              loadDepartmentData={loadDepartmentData}
              deptLoading={deptLoading}
              deptError={deptError}
              deptSuite={deptSuite}
            />
          )}

          {/* TAB 6: STAFF DIRECTORY & ONBOARDING (Factory Method) */}
          {activeTab === "staff" && (
            <StaffView
              currentProfile={currentProfile}
              staffList={staffList}
              setShowOnboardModal={setShowOnboardModal}
            />
          )}

          {/* TAB 7: SECURITY AUDIT (Singleton Pattern - Admin Only) */}
          {activeTab === "audit" && (
            <AuditView
              loadAuditData={loadAuditData}
              auditLoading={auditLoading}
              auditError={auditError}
              auditLogs={auditLogs}
            />
          )}
        </main>
      </div>

      {/* NOTIFICATION DRAWER */}
      <NotificationsDrawer
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        notifications={notifications}
      />

      {/* ONBOARDING MODAL (Admin Only) */}
      <OnboardModal
        showOnboardModal={showOnboardModal}
        setShowOnboardModal={setShowOnboardModal}
        newStaffName={newStaffName}
        setNewStaffName={setNewStaffName}
        newStaffRole={newStaffRole}
        setNewStaffRole={setNewStaffRole}
        newStaffDept={newStaffDept}
        setNewStaffDept={setNewStaffDept}
        newStaffSpec={newStaffSpec}
        setNewStaffSpec={setNewStaffSpec}
        handleOnboardStaff={handleOnboardStaff}
        isCurrentAdmin={currentProfile.role === "ADMIN"}
      />
    </div>
  );
}
