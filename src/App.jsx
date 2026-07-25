import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Home';
import Works from './Works';
import SmoothScroll from './components/SmoothScroll';

export default function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/main.js';
    script.type = 'module';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <SmoothScroll>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works.html" element={<Works />} />
        </Routes>
      </Router>
    </SmoothScroll>
  )
}