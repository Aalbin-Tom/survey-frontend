import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import AdminHP from './Pages/AdminHP';
import AdminLP from './Pages/AdminLP';
import UserH from './Pages/UserH';
import UserL from './Pages/UserL';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path='/' element={<UserL />} />
          <Route path='/home' element={<UserH />} />


          
          <Route path='/admin' element={<AdminHP />} />
          <Route path='/admin/login' element={<AdminLP />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
