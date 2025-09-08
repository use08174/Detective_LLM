import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { GameManager } from "components/GameManager";
import Landing from "components/Landing";
import ProloguePage from "components/ProloguePage"; // <-- 1. ProloguePage를 불러옵니다.

const RedirectToHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* 2. '/prologue' 경로를 여기에 추가합니다. */}
      <Route path="/prologue" element={<ProloguePage />} />
      <Route path="/game" element={<GameManager />} />
      <Route path="*" element={<RedirectToHome />} />
    </Routes>
  );
};

export default AppRoutes;
