"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { checkIsAdminAuthenticated } from "@/lib/adminAuth";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authed = checkIsAdminAuthenticated();
    setIsAuthenticated(authed);
    setIsChecking(false);

    const isLoginPage = pathname === "/admin/login";

    if (!authed && !isLoginPage) {
      router.replace("/admin/login");
    } else if (authed && isLoginPage) {
      router.replace("/admin/dashboard");
    }
  }, [pathname, router]);

  // While checking auth on initial mount, show a themed loading state to prevent flash
  if (isChecking) {
    return (
      <div className="min-h-screen bg-[var(--hanji)] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-sm flex items-center justify-center mb-4 animate-pulse">
          <Image
            src="/m5c-logo-noBg.svg"
            alt="M5 Clogs Logo"
            width={38}
            height={42}
            priority
          />
        </div>
        <p className="text-sm font-semibold tracking-wider text-[var(--ink)] uppercase">
          M5 Clogs Admin
        </p>
        <p className="text-xs text-[var(--muted)] mt-1 font-serif italic">
          인증 확인 중 • Verifying authentication...
        </p>
      </div>
    );
  }

  const isLoginPage = pathname === "/admin/login";

  // If not logged in and not on login page, render nothing while redirecting
  if (!isAuthenticated && !isLoginPage) {
    return null;
  }

  return <>{children}</>;
}
