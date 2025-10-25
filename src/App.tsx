import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SplashCursor from './components/FluidCursor'
import GradualBlur from "./components/GradualBlur";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
      <SplashCursor />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
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
