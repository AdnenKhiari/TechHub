import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SplashCursor from './components/FluidCursor'

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
      <SplashCursor />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
