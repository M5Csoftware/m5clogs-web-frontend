"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkIsAdminAuthenticated } from "@/lib/adminAuth";

export default function AdminIndexPage() {
  const router = useRouter();

  useEffect(() => {
    if (checkIsAdminAuthenticated()) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return null;
}
