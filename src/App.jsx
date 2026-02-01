import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";

import Home from "./Home";
import Confirmation from "./components/Confirmation";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirm-booking" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
