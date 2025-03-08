// src/App.tsx
import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { Spin } from "antd";
import AppLayout from "../components/layouts";

const InsuranceFormsPage = withSuspense(
  lazy(() => import("../modules/insurances/page/InsuranceFormsPage"))
);

const SubmissionsPage = withSuspense(
  lazy(() => import("../modules/submitions/page/SubmissionsPage"))
);

const NotFoundPage = withSuspense(
  lazy(() => import("../modules/notFound/page/NotFoundPage"))
);

interface SuspenseProps {
  fallback?: React.ReactNode;
}

const defaultFallback = (
  <div style={{ textAlign: "center", marginTop: "20%" }}>
    <Spin size="large" />
  </div>
);

function withSuspense<Props extends object>(
  WrappedComponent: React.ComponentType<Props>,
  options?: SuspenseProps
) {
  return function SuspendedComponent(props: Props) {
    return (
      <Suspense fallback={options?.fallback || defaultFallback}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  };
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<InsuranceFormsPage />} />
        <Route path="insurances" element={<InsuranceFormsPage />} />
        <Route path="submissions" element={<SubmissionsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
