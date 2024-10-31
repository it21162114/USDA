import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeManagementApp from './Components/EmployeeManagementApp';
import EmployeeDetails from './Components/EmployeeDetails';
import Welcomepage from './Components/Welcomepage';
import Home from './Components/Home';
import FileManagementApp from './Components/FileManagementApp';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcomepage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/employee" element={<EmployeeManagementApp />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/FileManagementApp" element={<FileManagementApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
