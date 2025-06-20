import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./components/Pages";
import Login from "./components/Pages/auth/login";
import Register from "./components/Pages/auth/register";
import Dashboards from "./components/Pages/Dashboard";
import Santri from "./components/Pages/Santri";
import Mudaris from "./components/Pages/Mudaris";
import Penjadwalans from "./components/Pages/Penjadwalan";
import Asramas from "./components/Pages/Asrama";
import PembagianAsramas from "./components/Pages/PembagianAsrama";
import Classrooms from "./components/Pages/Classroom";
import Penilaians from "./components/Pages/Penilaian";
import Akuns from "./components/Pages/Akun";



function App() {
  return (
    <>
      <div className="app-wrapper">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path="dashboards" element={<Dashboards/>}/>
            <Route path="santri" element={<Santri/>}/>
            <Route path="mudaris" element={<Mudaris/>}/>
            <Route path="penjadwalan" element={<Penjadwalans/>}/>
            <Route path="kamar" element={<Asramas/>}/>
            <Route path="pembagian-kamar" element={<PembagianAsramas/>}/>
            <Route path="ruang-kelas" element={<Classrooms/>}/>
            <Route path="penilaian" element={<Penilaians/>}/>
            <Route path="account" element={<Akuns/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;