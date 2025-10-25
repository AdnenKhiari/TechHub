import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import CurriculumDetailPage from "./pages/CurriculumDetailPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SplashCursor from './components/FluidCursor'
import GradualBlur from "./components/GradualBlur";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <SplashCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curriculum/:id" element={<CurriculumDetailPage />} />
        </Routes>
        <Footer />
        <GradualBlur
          target="page"
          position="bottom"
          height="6rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
      </>
    </Suspense>
  );
}

export default App;