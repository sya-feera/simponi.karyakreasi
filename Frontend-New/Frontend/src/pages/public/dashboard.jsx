import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserGraduate, FaChalkboardTeacher, FaHome, FaDoorOpen } from 'react-icons/fa';
import Header from '../../components/header';

import { getClassroom } from '../../_services/classroom';
import { getDorms } from '../../_services/dorms';
import { getMudaris } from '../../_services/mudaris';
import { getSantri } from '../../_services/santri';

export default function PublicDashboard() {
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

  const statCards = [
    { title: 'Total Santri', value: stats.totalSantri, icon: <FaUserGraduate size={24} color="#6c5ce7" /> },
    { title: 'Total Mudaris', value: stats.totalUstadz, icon: <FaChalkboardTeacher size={24} color="#6c5ce7" /> },
    { title: 'Asrama', value: stats.asrama, icon: <FaHome size={24} color="#6c5ce7" /> },
    { title: 'Kelas', value: stats.kelas, icon: <FaDoorOpen size={24} color="#6c5ce7" /> },
  ];

  const chartData = [
    { name: 'Santri', value: stats.totalSantri },
    { name: 'Mudaris', value: stats.totalUstadz },
    { name: 'Asrama', value: stats.asrama },
    { name: 'Kelas', value: stats.kelas },
  ];

  return (
    <>
      <Header />
      <style>
        {`
          body {
            background-color: rgb(239, 244, 252) !important;
          }
          .dashboard-container {
            padding: 60px 20px;
          }
          .dashboard-title {
            font-size: 2rem;
            font-weight: 700;
            color: #2d3436;
            margin-bottom: 40px;
          }
          .stat-card {
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s, box-shadow 0.3s;
            color: #2d3436;
            background: #fff;
          }
          .stat-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
          }
          .chart-container {
            background: #fff;
            border-radius: 15px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
            padding: 20px;
            height: auto;
            margin-top: 60px;
            margin-bottom: 60px;
          }
          .stat-value {
            font-size: 1.8rem;
            font-weight: 700;
          }
          .stat-title {
            font-weight: 500;
            color: #636e72;
          }
        `}
      </style>

      <div className="container-fluid dashboard-container">
        <h1 className="dashboard-title text-start">Dashboard</h1>

        <div className="row mb-4 g-4">
          {statCards.map((stat, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3">
              <div className="stat-card h-100 text-center p-3 d-flex flex-column justify-content-center align-items-center">
                <div className="mb-2">{stat.icon}</div>
                <p className="stat-title mb-1">{stat.title}</p>
                <p className="stat-value mb-0 text-primary">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="chart-container">
          <h5 className="mb-3 text-center fw-bold text-secondary">Statistik</h5>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dfe6e9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#636e72' }} />
              <YAxis hide={true} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                }}
              />
              <Bar dataKey="value" fill="#a29bfe" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
