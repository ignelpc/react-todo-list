import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Task from './pages/Task';
import About from './pages/About';
import Navbar from './components/NavBar';
import Footer from './components/Footer';

import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/"
            element={<Home/>}
          />
          <Route exact path="/task"
            element={<Task/>}
          />
          <Route exact path="/task/:id"
            element={<Task/>}
          />
          <Route exact path="/about"
            element={<About/>}
          />
        </Routes>
        {/* <Footer /> */}
      </Router>

    </>
  );
}

export default App;
