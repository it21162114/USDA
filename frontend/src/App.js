import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeManagementApp from './Components/EmployeeManagementApp';
import EmployeeDetails from './Components/EmployeeDetails';
import Welcomepage from './Components/Welcomepage';
import Home from './Components/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcomepage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/employee" element={<EmployeeManagementApp />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
