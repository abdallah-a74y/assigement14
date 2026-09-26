import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PageLayout } from "./components/Layout";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Details from "./pages/Details";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter basename="/assigement14">
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/blog" element={<Blog />} />

          <Route path="/blog/:slug" element={<Details />} />

          <Route path="/about" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}
