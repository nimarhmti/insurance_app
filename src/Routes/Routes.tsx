// src/App.tsx
import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/layouts";
import InsuranceFormsPage from "../modules/insurances/page/InsuranceFormsPage";
import SubmissionsPage from "../modules/submitions/page/SubmissionsPage";
import NotFoundPage from "../modules/notFound/page/NotFoundPage";

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
