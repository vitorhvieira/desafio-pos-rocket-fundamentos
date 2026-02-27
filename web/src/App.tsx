import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import RedirectPage from "./pages/RedirectPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="/:shortUrl" element={<RedirectPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
