"use client";
import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface WithAuthRoleProps {
  allowedRoles: string[] | null;
  children: ReactNode;
}

export const RouterProtector: React.FC<WithAuthRoleProps> = ({
  allowedRoles,
  children,
}: WithAuthRoleProps) => {
  const router = useRouter();
  if (!allowedRoles && isLoggedIn()) {
    router.push("/");
  }

  useEffect(() => {
    if (allowedRoles && !isLoggedIn()) {
      router.push("/login");
    }
  }, [allowedRoles, router]);

  return children;
};
