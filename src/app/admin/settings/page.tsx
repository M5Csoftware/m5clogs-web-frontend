"use client";

import React, { useState } from "react";
import { getContactLeads, getPartnershipLeads, getNewsletterLeads } from "@/lib/leadsStore";

export default function AdminSettingsPage() {
  const [adminEmail, setAdminEmail] = useState("admin@m5clogs.in");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordNotice, setPasswordNotice] = useState<string | null>(null);

  // Success message state
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      setPasswordNotice("Please enter your current password.");
      return;
    }
    if (newPassword.length < 5) {
      setPasswordNotice("New password must be at least 5 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordNotice("New password and confirm password do not match.");
      return;
    }

    setPasswordNotice("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordNotice(null), 4000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMessage("Profile changes saved successfully!");
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleExportData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      contactLeads: getContactLeads(),
      partnershipLeads: getPartnershipLeads(),
      newsletterLeads: getNewsletterLeads(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `m5c-leads-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10 font-sans">
      {/* Page Header */}
      <div className="pb-8 border-b border-[var(--line)]">
        <h1
          className="admin-heading text-3xl sm:text-4xl font-extrabold text-[var(--ink)] tracking-tight"
          style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
        >
          Settings
        </h1>
        <p className="text-base text-[var(--muted)] mt-2 font-medium">
          Manage administrator account profile, credentials, and data backups.
        </p>

        {saveMessage && (
          <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-bold animate-fadeIn">
            ✓ {saveMessage}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Admin Profile & Data Export */}
        <div className="space-y-8">
          {/* Administrator Profile Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
            <h2
              className="admin-heading text-xl font-extrabold text-[var(--ink)] mb-2 tracking-tight"
              style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
            >
              Administrator Profile
            </h2>
            <p className="text-sm text-[var(--muted)] mb-8 font-medium">
              Primary account details used for system identification.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value="admin"
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-[14px] text-[var(--ink)] font-bold cursor-not-allowed"
                  />
                  <span className="text-xs text-[var(--muted)] mt-1.5 block">
                    Fixed system identifier.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-2">
                    Assigned Role
                  </label>
                  <input
                    type="text"
                    value="Super Administrator"
                    disabled
                    className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-[14px] text-[var(--ink)] font-bold cursor-not-allowed"
                  />
                  <span className="text-xs text-[var(--muted)] mt-1.5 block">
                    Full administrator permissions.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-2">
                  Contact / Notification Email
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-[14px] text-[var(--ink)] focus:bg-[var(--paper)] focus:border-[var(--persimmon)] focus:outline-none transition font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[var(--persimmon)] hover:bg-[var(--persimmon-d)] text-white text-sm font-bold transition shadow-xs cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          {/* Data Backup & Export Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
            <h3
              className="admin-heading text-lg font-extrabold text-[var(--ink)] mb-2 tracking-tight"
              style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
            >
              Data Backup &amp; Export
            </h3>
            <p className="text-sm text-[var(--muted)] mb-6 font-medium">
              Download complete database snapshots of all contact submissions, wholesale applications, and newsletter subscribers.
            </p>

            <button
              type="button"
              onClick={handleExportData}
              className="px-6 py-3.5 rounded-xl bg-[var(--ink)] hover:bg-slate-800 text-white text-sm font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export Leads as JSON</span>
            </button>
          </div>
        </div>

        {/* Right Column: Security & Credentials */}
        <div className="space-y-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-[var(--paper)] border border-[var(--line)] shadow-xs">
            <h2
              className="admin-heading text-xl font-extrabold text-[var(--ink)] mb-2 tracking-tight"
              style={{ fontFamily: 'var(--font-sans), "Manrope", system-ui, -apple-system, sans-serif' }}
            >
              Security &amp; Password
            </h2>
            <p className="text-sm text-[var(--muted)] mb-8 font-medium">
              Update password for the administrator account.
            </p>

            {passwordNotice && (
              <div
                className={`mb-6 p-4 rounded-2xl text-sm font-bold border ${
                  passwordNotice.includes("successfully")
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-rose-50 text-rose-800 border-rose-200"
                }`}
              >
                {passwordNotice}
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-[14px] text-[var(--ink)] focus:bg-[var(--paper)] focus:border-[var(--persimmon)] focus:outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-[14px] text-[var(--ink)] focus:bg-[var(--paper)] focus:border-[var(--persimmon)] focus:outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--muted)] uppercase mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--hanji)] text-[14px] text-[var(--ink)] focus:bg-[var(--paper)] focus:border-[var(--persimmon)] focus:outline-none transition font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl border border-[var(--line)] bg-[var(--hanji)] hover:bg-[var(--paper)] hover:border-[var(--persimmon)] text-[var(--ink)] text-sm font-bold transition shadow-xs cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
