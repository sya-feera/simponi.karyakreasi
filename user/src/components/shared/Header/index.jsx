import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Header() {
  const location = useLocation();
  const hiddenLoginPaths = [
    "/santri",
    "/mudaris",
    "/penjadwalan",
    "/kamar",
    "/pembagian-kamar",
    "/ruang-kelas",
    "/penilaian",
    "/account",
  ];

  const profileImagePaths = [
    "/santri",
    "/mudaris",
    "/penjadwalan",
    "/kamar",
    "/pembagian-kamar",
    "/ruang-kelas",
    "/penilaian",
    "/account",
  ];
  // const showProfileImage = profileImagePaths.includes(location.pathname);

  const [isDataOpen, setIsDataOpen] = useState(false);
  const [isAsramaOpen, setIsAsramaOpen] = useState(false);

  const toggleDataDropdown = () => {
    setIsDataOpen(!isDataOpen);
    setIsAsramaOpen(false);
  };

  const toggleAsramaDropdown = () => {
    setIsAsramaOpen(!isAsramaOpen);
    setIsDataOpen(false);
  };

  // Contoh ambil user dari localStorage atau context (setelah login)
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  // console.log(user);

  return (
    <>
      <style>{`
                .nav-link-animated {
                    position: relative;
                    transition: color 0.3s ease;
                }

                .nav-link-animated::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 0%;
                    height: 2px; 
                    background-color: #0d6efd;
                    transition: width 0.3s ease;
                }

                .nav-link-animated:hover {
                    color: #0d6efd !important;
                }

                .nav-link-animated:hover::after {
                    width: 100%;
                }
                
                .dropdown-menu {
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    border: none;
                    padding: 0.5rem 0;
                }
                
                .dropdown-item {
                    padding: 0.5rem 1.5rem;
                    transition: all 0.2s ease;
                }
                
                .dropdown-item:hover {
                    background-color: #f0f7ff;
                    color: #0d6efd;
                }

                .rotate-180 {
                    transform: rotate(180deg);
                }

                .transition-transform {
                    transition: transform 0.3s ease;
                }
                
                .user-icon {
                    width: 36px;
                    height: 36px;
                    background-color: #e9ecef;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #6c757d;
                    transition: all 0.2s ease;
                }
                
                .user-icon:hover {
                    background-color: #dee2e6;
                }
            `}</style>

      <header className="sticky-top bg-white w-100">
        <div className="container-fluid px-4">
          <nav className="navbar navbar-expand-lg py-2">
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  overflow: "hidden",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://i.pinimg.com/736x/4e/6f/31/4e6f312a13e94483051503b23c97ed04.jpg"
                  alt="Logo"
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="ms-3">
                <span className="fw-bold fs-3" style={{ color: "#0000CD" }}>
                  SIMPONI
                </span>
                <span
                  className="d-block text-secondary"
                  style={{ fontSize: "0.60rem" }}
                >
                  DIGITAL BOARDING SCHOOL SOLUTIONS
                </span>
              </div>
            </Link>

            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link nav-link-animated px-3 fw-medium"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/dashboards"
                    className="nav-link nav-link-animated px-3 fw-medium"
                  >
                    Dashboard
                  </Link>
                </li>

                {user && (
                  <>
                    <li className="nav-item dropdown">
                      <a
                        href="#"
                        className="nav-link nav-link-animated px-3 fw-medium d-flex align-items-center gap-1"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleDataDropdown();
                        }}
                        aria-expanded={isDataOpen}
                      >
                        Data
                        <i
                          className={`fa-solid fa-chevron-down transition-transform ${
                            isDataOpen ? "rotate-180" : ""
                          }`}
                        ></i>
                      </a>
                      <ul
                        className={`dropdown-menu ${isDataOpen ? "show" : ""}`}
                      >
                        <li>
                          <Link to="/santri" className="dropdown-item">
                            Data Santri
                          </Link>
                        </li>
                        <li>
                          <Link to="/mudaris" className="dropdown-item">
                            Data Mudaris
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/penjadwalan"
                        className="nav-link nav-link-animated px-3 fw-medium"
                      >
                        Penjadwalan
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        href="#"
                        className="nav-link nav-link-animated px-3 fw-medium d-flex align-items-center gap-1"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleAsramaDropdown()();
                        }}
                        aria-expanded={isAsramaOpen}
                      >
                        Asrama
                        <i
                          className={`fa-solid fa-chevron-down transition-transform ${
                            isAsramaOpen ? "rotate-180" : ""
                          }`}
                        ></i>
                      </a>
                      <ul
                        className={`dropdown-menu ${
                          isAsramaOpen ? "show" : ""
                        }`}
                      >
                        <li>
                          <Link to="/kamar" className="dropdown-item">
                            Informasi Kamar
                          </Link>
                        </li>
                        <li>
                          <Link to="/pembagian-kamar" className="dropdown-item">
                            Pembagian Kamar
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/ruang-kelas"
                        className="nav-link nav-link-animated px-3 fw-medium"
                      >
                        Ruang Kelas
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/penilaian"
                        className="nav-link nav-link-animated px-3 fw-medium"
                      >
                        Penilaian
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              <div className="d-flex gap-3 align-items-center">
                {user ? (
                  <>
                    <Link
                      to="/account"
                      className="d-flex align-items-center gap-2"
                    >
                      <span className="fw-medium text-black d-none d-md-block">
                        {user.name}
                      </span>
                      <img
                        src={user.avatar || "https://i.pravatar.cc/40?img=1"} // fallback jika avatar tidak tersedia
                        alt="Profile"
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    {!hiddenLoginPaths.includes(location.pathname) && (
                      <Link
                        to="/login"
                        className="btn btn-outline-primary rounded-pill px-3"
                      >
                        Login
                      </Link>
                    )}
                    <Link to="/account" className="user-icon">
                      <i className="fa-solid fa-user"></i>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>

        <div className="d-flex" style={{ height: "3px" }}>
          <div className="flex-grow-1 bg-primary"></div>
          <div className="flex-grow-1 bg-primary"></div>
          <div className="flex-grow-1 bg-primary"></div>
          <div className="flex-grow-1 bg-primary"></div>
          <div className="flex-grow-1 bg-primary"></div>
        </div>
      </header>
    </>
  );
}
