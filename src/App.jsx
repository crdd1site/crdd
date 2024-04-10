import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import Inicial from './pages/Inicial/Inicial';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/'>
          <Route index element={<Inicial />} />
        </Route>
        <Route exact path='/Dashboard'>
          <Route index element={< Dashboard/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
