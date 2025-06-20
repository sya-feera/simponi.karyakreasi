import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout } from "../_services/auth";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate(); // aktifkan navigate

  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isDataOpen, setIsDataOpen] = useState(false);
  const [isAsramaOpen, setIsAsramaOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("userProfile"); // perbaiki key
    setToken(storedToken);
    setUserInfo(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  const hiddenLoginPaths = [
    "/santri", "/mudaris", "/penjadwalan", "/kamar",
    "/pembagian-kamar", "/ruang-kelas", "/penilaian", "/account"
  ];

  const toggleDataDropdown = () => {
    setIsDataOpen(prev => !prev);
    setIsAsramaOpen(false);
  };

  const toggleAsramaDropdown = () => {
    setIsAsramaOpen(prev => !prev);
    setIsDataOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout({ token }); // panggil API jika ada
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userProfile");
      navigate("/login"); // ganti window.location.href dengan navigate
    }
  };

  return (
    <header className="sticky-top bg-white w-100">
      <div className="container-fluid px-4">
        <nav className="navbar navbar-expand-lg py-2">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <div style={{
              width: '60px', height: '60px', overflow: 'hidden',
              borderRadius: '12px', display: 'flex',
              alignItems: 'center', justifyContent: 'center'
            }}>
              <img
                src="https://i.pinimg.com/736x/4e/6f/31/4e6f312a13e94483051503b23c97ed04.jpg"
                alt="Logo"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </div>
            <div className="ms-3">
              <span className="fw-bold fs-3" style={{ color: '#0000CD' }}>SIMPONI</span>
              <span className="d-block text-secondary" style={{ fontSize: "0.60rem" }}>
                DIGITAL BOARDING SCHOOL SOLUTIONS
              </span>
            </div>
          </Link>

          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link px-3 fw-medium">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/publicDashboard" className="nav-link px-3 fw-medium">Dashboard</Link>
              </li>
              <li className="nav-item dropdown">
                <a href="#" className="nav-link px-3 fw-medium d-flex align-items-center gap-1"
                  onClick={(e) => { e.preventDefault(); toggleDataDropdown(); }}
                  aria-expanded={isDataOpen}>
                  Data
                  <i className={`fa-solid fa-chevron-down ${isDataOpen ? 'rotate-180' : ''}`}></i>
                </a>
                <ul className={`dropdown-menu ${isDataOpen ? 'show' : ''}`}>
                  <li><Link to="/publicSantri" className="dropdown-item">Data Santri</Link></li>
                  <li><Link to="/publicMudaris" className="dropdown-item">Data Mudaris</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/publicPenjadwalan" className="nav-link px-3 fw-medium">Penjadwalan</Link>
              </li>
              <li className="nav-item dropdown">
                <a href="#" className="nav-link px-3 fw-medium d-flex align-items-center gap-1"
                  onClick={(e) => { e.preventDefault(); toggleAsramaDropdown(); }}
                  aria-expanded={isAsramaOpen}>
                  Asrama
                  <i className={`fa-solid fa-chevron-down ${isAsramaOpen ? 'rotate-180' : ''}`}></i>
                </a>
                <ul className={`dropdown-menu ${isAsramaOpen ? 'show' : ''}`}>
                  <li><Link to="/publicKamar" className="dropdown-item">Informasi Kamar</Link></li>
                  <li><Link to="/publicPembagian-kamar" className="dropdown-item">Pembagian Kamar</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/publicRuang-kelas" className="nav-link px-3 fw-medium">Ruang Kelas</Link>
              </li>
              <li className="nav-item">
                <Link to="/publicPenilaian" className="nav-link px-3 fw-medium">Penilaian</Link>
              </li>
            </ul>

            <div className="d-flex gap-3 align-items-center">
              {token && userInfo ? (
                <>
                  <Link to="/account" className="btn btn-outline-secondary rounded-pill px-3">
                    {userInfo.name}
                  </Link>
                  <button onClick={handleLogout} className="btn btn-danger rounded-pill px-3">
                    Logout
                  </button>
                </>
              ) : (
                !hiddenLoginPaths.includes(location.pathname) && (
                  <Link to="/login" className="btn btn-outline-primary rounded-pill px-3">
                    Login
                  </Link>
                )
              )}
            </div>
          </div>
        </nav>
      </div>

      <div className="d-flex" style={{ height: '3px' }}>
        <div className="flex-grow-1 bg-primary"></div>
        <div className="flex-grow-1 bg-primary"></div>
        <div className="flex-grow-1 bg-primary"></div>
        <div className="flex-grow-1 bg-primary"></div>
        <div className="flex-grow-1 bg-primary"></div>
      </div>
    </header>
  );
}