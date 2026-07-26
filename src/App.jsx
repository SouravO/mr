import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Works from './Works';
import SmoothScroll from './components/SmoothScroll';

export default function App() {
  return (
    <SmoothScroll>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works.html" element={<Works />} />
        </Routes>
      </Router>
    </SmoothScroll>
  );
}