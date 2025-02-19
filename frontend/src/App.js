import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeManagementApp from './Components/EmployeeManagementApp';
import EmployeeDetails from './Components/EmployeeDetails';
import Welcomepage from './Components/Welcomepage';
import Home from './Components/Home';
import FileManagementApp from './Components/FileManagementApp';
import Folderselect from './Components/Folderselect';
import AccessDenied from './Components/AccessDenied';
import Form from './Components/Form';
import EmpIncrement from './Components/EmpIncrement';

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
          <Route path="/Folderselect" element={<Folderselect />} />
          <Route path="/AccessDenied" element={<AccessDenied />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/EmpIncrement" element={<EmpIncrement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
