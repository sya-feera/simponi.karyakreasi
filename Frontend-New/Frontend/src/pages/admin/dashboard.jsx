import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { getClassroom } from '../../_services/classroom';
import { getDorms } from '../../_services/dorms';
import { getMudaris } from '../../_services/mudaris';
import { getSantri } from '../../_services/santri';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalSantri: 0,
    totalUstadz: 0,
    asrama: 0,
    kelas: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [santriData, classroomsData, mudarisData, dormsData] = await Promise.all([
          getSantri(),
          getClassroom(),
          getMudaris(),
          getDorms(),
        ]);

        setStats({
          totalSantri: Array.isArray(santriData) ? santriData.length : 0,
          totalUstadz: Array.isArray(mudarisData) ? mudarisData.length : 0,
          asrama: Array.isArray(dormsData) ? dormsData.length : 0,
          kelas: Array.isArray(classroomsData) ? classroomsData.length : 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  const StatCard = ({ title, value, icon, color, trend }) => (
    <div style={{
      backgroundColor: 'var(--color-white)',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid rgba(0,0,0,0.05)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
    }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '60px',
        height: '60px',
        background: 'linear-gradient(135deg, ${color}20, ${color}10)',
        clipPath: 'polygon(100% 0, 0 100%, 100% 100%)'
      }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ 
            margin: '0 0 0.5rem 0', 
            fontSize: '0.9rem', 
            color: '#6b7280',
            fontWeight: '500'
          }}>
            {title}
          </h3>
          <div style={{ 
            fontSize: '2.2rem', 
            fontWeight: '700', 
            color: color,
            lineHeight: '1'
          }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          {trend && (
            <div style={{
              marginTop: '0.5rem',
              fontSize: '0.8rem',
              color: trend > 0 ? '#10b981' : '#ef4444',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '0.25rem' }}>
                {trend > 0 ? '↗' : '↘'}
              </span>
              {Math.abs(trend)}% from last month
            </div>
          )}
        </div>
        <div style={{
          fontSize: '1.5rem',
          color: color,
          opacity: 0.7
        }}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --color-primary: #4f46e5;
          --color-primary-dark: #4338ca;
          --color-bg: #f8fafc;
          --color-white: #ffffff;
          --color-gray-light: #e5e7eb;
          --color-gray-dark: #374151;
          --color-green: #10b981;
          --color-red: #ef4444;
          --navbar-height: 60px;
          --sidebar-width: 250px;
        }

        * {
          box-sizing: border-box;
        }

        html, body, #root {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background-color: var(--color-bg);
          color: var(--color-gray-dark);
          height: 100%;
          width: 100%;
        }

        .app-layout {
          min-height: 100vh;
          background-color: var(--color-bg);
        }
        
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 32px 16px 32px;
          background: transparent;
          position: relative;
          z-index: 110;
        }

        .navbar h1 {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
          color: #22223b;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
          cursor: pointer;
        }

        .profile img {
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }

        .profile:hover {
          background-color: rgba(79, 70, 229, 0.1);
        }

        .profile span {
          font-weight: 600;
          color: var(--color-gray-dark);
        }

        .main-content {
          margin-left: var(--sidebar-width);
          padding: calc(var(--navbar-height) + 2rem) 2rem 2rem 2rem;
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          transition: margin-left 0.3s ease;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1rem;
        }

        .welcome-section {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          padding: 2rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          box-shadow: 0 8px 32px rgba(79, 70, 229, 0.3);
        }

        .welcome-section h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.8rem;
          font-weight: 700;
        }

        .welcome-section p {
          margin: 0;
          opacity: 0.9;
          font-size: 1.1rem;
        }

        @media (max-width: 768px) {
          :root {
            --sidebar-width: 70px;
          }
          .main-content {
            margin-left: var(--sidebar-width);
            padding: calc(var(--navbar-height) + 1rem) 1rem 1rem 1rem;
          }
          .navbar {
            left: var(--sidebar-width);
            padding: 0 1rem;
          }
          .cards {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>

      <AdminLayout currentPage="/dashboard">
        <nav className="navbar">
          <h1>Dashboard Overview</h1>
          <div className="profile">
            <img src="https://i.pravatar.cc/40" alt="User Profile" />
            <span>Admin</span>
          </div>
        </nav>

        <div className="welcome-section fade-in">
          <h2>Selamat Datang di SIMPONI</h2>
          <p>Sistem Informasi Manajemen Pondok Pesantren Terintegrasi</p>
        </div>

        <section className="cards fade-in">
          <StatCard
            title="Total Santri"
            value={stats.totalSantri}
            icon="👥"
            color="#4f46e5"
          />
          <StatCard
            title="Total Ustadz"
            value={stats.totalUstadz}
            icon="👨‍🏫"
            color="#10b981"
          />
          <StatCard
            title="Asrama"
            value={stats.asrama}
            icon="🏠"
            color="#f59e0b"
          />
          <StatCard
            title="Kelas"
            value={stats.kelas}
            icon="📚"
            color="#8b5cf6"
          />
        </section>
      </AdminLayout>
    </>
  );
};

export default Dashboard