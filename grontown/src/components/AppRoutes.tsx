import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { GameManager } from "components/GameManager";
import Landing from "components/Landing";

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
      <Route path="/game" element={<GameManager />} />
      <Route path="*" element={<RedirectToHome />} />
    </Routes>
  );
};

export default AppRoutes;
