import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import {
  FaUserGraduate,
  FaUserTie,
  FaChalkboardTeacher,
  FaBookOpen,
  FaStar,
  FaBuilding,
  FaUserCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { logout, useDecodeToken } from "../_services/auth";

const AdminLayout = ({ children, currentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userProfile") || '{}');
  const decodeData = useDecodeToken(token);

  useEffect(() => {
    if (!token || !decodeData?.success || userInfo?.role !== "mudaris") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userProfile");
      navigate("/login"); // pakai navigate bukan window
    }
  }, [token, decodeData, userInfo, navigate]);

  return (
    <div className="app-layout" style={{ display: 'flex' }}>
      <Sidebar
        currentPage={currentPage}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <main
        style={{
          marginLeft: isSidebarOpen ? '250px' : '70px',
          padding: '20px',
          width: isSidebarOpen ? 'calc(100% - 250px)' : 'calc(100% - 70px)',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </main>
    </div>
  );
};

const Sidebar = ({ currentPage, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem("accessToken");

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    if (window.confirm('Yakin ingin logout?')) {
      try {
        await logout({ token }); // jika ada API logout
      } catch (err) {
        console.error("Logout error:", err);
      } finally {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userProfile");
        navigate("/login"); // pakai navigate, bukan window.location
      }
    }
  };

  const menuItems = [
    { label: 'Dashboard', icon: <MdDashboard />, path: '/dashboard' },
    { label: 'Data Santri', icon: <FaUserGraduate />, path: '/santri' },
    { label: 'Data Mudaris', icon: <FaUserTie />, path: '/ustadz' },
    { label: 'Data Ruang Kelas', icon: <FaChalkboardTeacher />, path: '/ruang-kelas' },
    { label: 'Data Mata Pelajaran', icon: <FaBookOpen />, path: '/jadwal' },
    { label: 'Nilai', icon: <FaStar />, path: '/nilai' },
    { label: 'Data Asrama', icon: <FaBuilding />, dropdown: true },
    { label: 'User', icon: <FaUserCog />, path: '/publicDashboard' },
  ];

  const handleNavigate = (path) => navigate(path);

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="top">
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
        </button>
        {isOpen && <h2>SIMPONI</h2>}
      </div>

      <div className="menu">
        {menuItems.map((item, idx) => (
          <div key={idx}>
            {!item.dropdown ? (
              <button
                className={`menu-item ${currentPage === item.path ? 'active' : ''}`}
                onClick={() => handleNavigate(item.path)}
              >
                {item.icon}
                {isOpen && <span>{item.label}</span>}
              </button>
            ) : (
              <>
                <button
                  className="menu-item"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {item.icon}
                  {isOpen && <span>{item.label}</span>}
                  {isOpen && (
                    <span className={`arrow ${dropdownOpen ? 'open' : ''}`}>▶</span>
                  )}
                </button>
                {dropdownOpen && isOpen && (
                  <div className="dropdown">
                    <button
                      onClick={() => handleNavigate('/asrama')}
                      className={currentPage === '/asrama' ? 'active' : ''}
                    >
                      Kamar
                    </button>
                    <button
                      onClick={() => handleNavigate('/pembagian-kamar')}
                      className={currentPage === '/pembagian-kamar' ? 'active' : ''}
                    >
                      Pembagian Kamar
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="logout">
        <button className="menu-item" onClick={handleLogout}>
          <FaSignOutAlt />
          {isOpen && <span>Logout</span>}
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          background: #4f46e5;
          color: white;
          height: 100vh;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: fixed;
          transition: width 0.3s ease;
        }

        .sidebar.open {
          width: 250px;
        }

        .sidebar.closed {
          width: 70px;
        }

        .top {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .toggle-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .menu {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: none;
          border: none;
          color: white;
          padding: 0.75rem;
          font-size: 1rem;
          text-align: left;
          width: 100%;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .menu-item:hover,
        .menu-item.active {
          background: #4338ca;
        }

        .dropdown {
          margin-left: 2rem;
          margin-top: 0.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .dropdown button {
          background: none;
          border: none;
          color: #e5e7eb;
          font-size: 0.95rem;
          text-align: left;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
        }

        .dropdown button.active,
        .dropdown button:hover {
          background-color: #3730a3;
          color: white;
        }

        .logout {
          margin-top: auto;
        }

        .arrow {
          margin-left: auto;
          transition: transform 0.3s ease;
        }

        .arrow.open {
          transform: rotate(90deg);
        }

        @media (max-width: 768px) {
          .sidebar {
            position: absolute;
            z-index: 1000;
            height: 100%;
            top: 0;
            left: 0;
          }
        }
      `}</style>
    </aside>
  );
};

export default AdminLayout;
