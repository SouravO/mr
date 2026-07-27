import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import SmoothScroll from './components/SmoothScroll';

export default function App() {
  return (
    <SmoothScroll>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </SmoothScroll>
  );
}