import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard";
import Santri from "./pages/admin/santri"; 
import Mudaris from "./pages/admin/mudaris"
import Subjects from "./pages/admin/subjects";
import Dorms from "./pages/admin/dorms";
import DormAssignment from "./pages/admin/DormAssignment";
import Classrooms from "./pages/admin/classroom";
import Grades from "./pages/admin/grades";
import PublicDashboard from "./pages/public/dashboard";
import PublicSantri from "./pages/public/santri";
import PublicMudaris from "./pages/public/mudaris";
import PublicSubjects from "./pages/public/subjects";
import PublicDorms from "./pages/public/dorms";
import PublicDormAssignment from "./pages/public/DormAssignment";
import PublicClassroom from "./pages/public/classroom";
import PublicGrades from "./pages/public/grades";
import User from "./pages/public/user";
import PublicLayout from "./layouts/PublicLayout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route index element={<PublicLayout/>}/>
        <Route path="publicDashboard" element={<PublicDashboard/>}/>
        <Route path="/publicSantri" element={<PublicSantri/>}/>
        <Route path="/publicMudaris" element={<PublicMudaris/>}/>
        <Route path="/publicPenjadwalan" element={<PublicSubjects/>}/>
        <Route path="/publicKamar" element={<PublicDorms/>}/>
        <Route path="/publicPembagian-kamar" element={<PublicDormAssignment/>}/>
        <Route path="/publicRuang-kelas" element={<PublicClassroom/>}/>
        <Route path="/publicPenilaian" element={<PublicGrades/>}/>
        <Route path="/account" element={<User/>}/>


        {/* Auth */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>


        {/* Admin */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="/santri" element={<Santri />} /> 
        <Route path="/asrama" element={<Dorms />} />
        <Route path="/pembagian-kamar" element={<DormAssignment />} />
        <Route path="/ustadz" element={<Mudaris />} />
        <Route path="/jadwal" element={<Subjects />} />
        <Route path="/ruang-kelas" element={<Classrooms />} />
        <Route path="/nilai" element={<Grades />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
