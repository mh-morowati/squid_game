import { Route, Routes } from "react-router";
import IndexPage from "./pages/index";
import RedLightGreenLight from "./Red-light-green-light";


function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<RedLightGreenLight />} path="/red-light-green-light" />
      {/* <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" /> */}
    </Routes>
  );
}

export default App;
