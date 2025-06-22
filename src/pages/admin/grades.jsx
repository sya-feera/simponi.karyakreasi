import React, { useState, useEffect } from "react";
import {getGrades, createGrade, updateGrade, deleteGrade } from "../../_services/grades"; 
import { getSantri } from "../../_services/santri";
import { getSubject } from "../../_services/subject";
import AdminLayout from "../../layouts/AdminLayout";

const Grades = ({ santrisList = [], subjectsList = [] }) => {
  const [gradesList, setGradesList] = useState([]);
  const [santris, setSantris] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    santri_id: "",
    subject_id: "",
    grade: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gradesData, santriData, subjectData] = await Promise.all([
          getGrades(),
          getSantri(),
          getSubject(),
        ]);
        setGradesList(gradesData);
        setSantris(santriData);
        setSubjects(subjectData);
      } catch (err) {
        console.error("Gagal memuat data:", err);
      }
    };
  
    fetchData();
  }, []);
  
  const getSantriName = (id) => {
    const santri = santris.find((s) => s.id === id);
    return santri ? santri.name : "-";
  };
  
  const getSubjectName = (id) => {
    const subject = subjects.find((s) => s.id === id);
    return subject ? subject.name : "-";
  };

  const getSubjectJenjang = (id) => {
    const subject = subjects.find((s) => s.id === id);
    return subject ? subject.jenjang : "-";
  };
  
  
  const fetchGrades = async () => {
    try {
      const data = await getGrades();
      setGradesList(data);
    } catch (err) {
      console.error("Gagal memuat data nilai:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (isEditing) {
        await updateGrade(editId, { ...formData, _method: "PUT" });
      } else {
        await createGrade(formData);
      }
  
      const updated = await getGrades();
      setGradesList(updated);
  
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data nilai");
    }
  };
  

  const handleEdit = (grade) => {
    setFormData({
      santri_id: grade.santri_id.toString(),
      subject_id: grade.subject_id.toString(),
      grade: grade.grade.toString(),
    });
    setEditId(grade.id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus nilai ini?")) {
      try {
        await deleteGrade(id);
        fetchGrades();
      } catch (err) {
        console.error("Gagal menghapus nilai:", err);
        alert("Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  const resetForm = () => {
    setFormData({ santri_id: "", subject_id: "", grade: "" });
    setIsEditing(false);
    setEditId(null);
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString("id-ID", {
      dateStyle: "long",
      timeStyle: "short",
    });
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return "grade-excellent";
    if (grade >= 80) return "grade-good";
    if (grade >= 70) return "grade-fair";
    return "grade-poor";
  };

  const getGradeLabel = (grade) => {
    if (grade >= 90) return "Sangat Baik";
    if (grade >= 80) return "Baik";
    if (grade >= 70) return "Cukup";
    return "Perlu Perbaikan";
  };

  const generateKey = (santri_id, subject_id) =>
    `${santri_id}-${subject_id}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

        :root {
          --color-primary: #4f46e5;
          --color-primary-dark: #4338ca;
          --color-bg: #f9fafb;
          --color-white: #ffffff;
          --color-gray-light: #e5e7eb;
          --color-gray-dark: #374151;
          --color-green: #10b981;
          --color-red: #ef4444;
          --color-blue: #3b82f6;
          --color-purple: #8b5cf6;
          --color-yellow: #f59e0b;
          --color-orange: #ea580c;
          --navbar-height: 60px;
          --sidebar-width: 250px;
        }

        * {
          box-sizing: border-box;
        }

        body, html, #root {
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

        .page-header {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
          padding: 2rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          box-shadow: 0 8px 32px rgba(79, 70, 229, 0.3);
        }

        .page-header h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.8rem;
          font-weight: 700;
        }

        .page-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 1.1rem;
        }

        .form-container {
          background-color: var(--color-white);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }

        .form-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--color-gray-dark);
          font-size: 0.9rem;
        }

        input, select, textarea {
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid var(--color-gray-light);
          font-size: 1rem;
          background-color: var(--color-white);
          color: var(--color-gray-dark);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: 'Inter', sans-serif;
        }

        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        textarea {
          resize: vertical;
          min-height: 80px;
        }

        select option {
          color: var(--color-gray-dark);
          background-color: var(--color-white);
        }

        button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }

        .btn-primary {
          background-color: var(--color-primary);
          color: white;
        }

        .btn-primary:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        .btn-secondary {
          background-color: var(--color-gray-light);
          color: var(--color-gray-dark);
          margin-left: 0.5rem;
        }

        .btn-secondary:hover {
          background-color: #d1d5db;
        }

        .btn-edit {
          background-color: var(--color-green);
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-edit:hover {
          background-color: #059669;
                    transform: translateY(-1px);

        }

        .btn-delete {
          background-color: var(--color-red);
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-delete:hover {
          background-color: #dc2626;
                    transform: translateY(-1px);

        }

        .table-container {
          background-color: var(--color-white);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }

        th {
          background-color: var(--color-primary);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        th:first-child {
          border-top-left-radius: 8px;
        }

        th:last-child {
          border-top-right-radius: 8px;
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid var(--color-gray-light);
          color: var(--color-gray-dark);
        }

        tr:hover {
          background-color: #f8fafc;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .grade-badge {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 700;
          text-align: center;
          min-width: 60px;
          display: inline-block;
        }

        .grade-excellent {
          background-color: #dcfce7;
          color: #166534;
          border: 1px solid #16a34a;
        }

        .grade-good {
          background-color: #dbeafe;
          color: #1e40af;
          border: 1px solid #3b82f6;
        }

        .grade-fair {
          background-color: #fef3c7;
          color: #92400e;
          border: 1px solid #f59e0b;
        }

        .grade-poor {
          background-color: #fee2e2;
          color: #dc2626;
          border: 1px solid #ef4444;
        }

        .subject-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
          display: inline-block;
        }

        .subject-tahfidz {
          background-color: #dcfce7;
          color: #166534;
        }

        .subject-fiqh {
          background-color: #dbeafe;
          color: #1e40af;
        }

        .subject-akidah {
          background-color: #fef3c7;
          color: #92400e;
        }

        .subject-arabic {
          background-color: #ede9fe;
          color: #6b21a8;
        }

        .subject-tafsir {
          background-color: #fce7f3;
          color: #be185d;
        }

        .subject-hadits {
          background-color: #ecfdf5;
          color: #047857;
        }

        .subject-sejarah {
          background-color: #fff7ed;
          color: #c2410c;
        }

        .subject-tajwid {
          background-color: #f0f9ff;
          color: #0369a1;
        }

        .subject-default {
          background-color: #f3f4f6;
          color: var(--color-gray-dark);
        }

        .classroom-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          background-color: #f0f9ff;
          color: #0369a1;
        }

        .form-buttons {
          display: flex;
          align-items: center;
        }

         .wide-field {
          grid-column: span 2;
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
            padding: 8px 16px 16px 16px;
          }

                    .navbar h1 {
            font-size: 1.5rem;
          }

          
          .form-grid {
            display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          margin-bottom: 2rem;
          }

          .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--color-gray-dark);
          font-size: 0.9rem;
        }
          
          .form-container,
          .table-container {
            padding: 1.5rem;
          }

                  input, select {
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid var(--color-gray-light);
          font-size: 1rem;
          background-color: var(--color-white);
          color: var(--color-gray-dark);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: 'Inter', sans-serif;
        }

        input:focus, select:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        select option {
          color: var(--color-gray-dark);
          background-color: var(--color-white);
        }

        input[type="date"] {
          color: var(--color-gray-dark);
        }

                input[type="date"]::-webkit-calendar-picker-indicator {
          filter: opacity(0.7);
        }

                button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s ease;
          font-family: 'Inter', sans-serif;
        }

                .btn-primary {
          background-color: var(--color-primary);
          color: white;
        }

        .btn-primary:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        .btn-edit {
          background-color: var(--color-green);
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-edit:hover {
          background-color: #059669;
          transform: translateY(-1px);
        }

        .btn-delete {
          background-color: var(--color-red);
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .btn-delete:hover {
          background-color: #dc2626;
          transform: translateY(-1px);
        }

        .table-container {
          background-color: var(--color-white);
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.05);
          overflow: hidden;
        }
          
          .table-wrapper {
            overflow-x: auto;
          }
          
          table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
          }

                  th {
          background-color: var(--color-primary);
          color: white;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        th:first-child {
          border-top-left-radius: 8px;
        }

        th:last-child {
          border-top-right-radius: 8px;
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid var(--color-gray-light);
          color: var(--color-gray-dark);
        }

        tr:hover {
          background-color: #f8fafc;
        }

        tr:last-child td {
          border-bottom: none;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }


          h1 {
            font-size: 1.5rem;
          }

          .form-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-secondary {
            margin-left: 0;
            margin-top: 0.5rem;
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
            padding: 8px 16px 16px 16px;
          }
          
          .navbar h1 {
            font-size: 1.5rem;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .form-container,
          .table-container {
            padding: 1.5rem;
          }
          
          .page-header {
            padding: 1.5rem;
          }
          
          .page-header h2 {
            font-size: 1.5rem;
          }
          
          .table-wrapper {
            overflow-x: scroll;
          }
          
          table {
            min-width: 600px;
          }
        }

        @media (max-width: 480px) {
          .main-content {
            padding: calc(var(--navbar-height) + 1rem) 0.75rem 1rem 0.75rem;
          }
          
          .form-container,
          .table-container,
          .page-header {
            padding: 1rem;
          }
          
          .navbar h1 {
            font-size: 1.25rem;
          }
          
          .page-header h2 {
            font-size: 1.25rem;
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

      <AdminLayout currentPage="/penilaian">
        <nav className="navbar">
          <h1>Penilaian Santri</h1>
          <div className="profile">
            <img src="https://i.pravatar.cc/40" alt="User Profile" />
            <span>Admin</span>
          </div>
        </nav>

        <div className="page-header fade-in">
          <h2>Manajemen Penilaian Santri</h2>
          <p>
            Kelola data penilaian santri pondok pesantren dengan mudah dan
            terorganisir
          </p>
        </div>

        <div className="form-container fade-in">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="santri_id">Pilih Santri</label>
                <select
                  id="santri_id"
                  name="santri_id"
                  value={formData.santri_id}
                  onChange={handleChange}
                  required
                  disabled={isEditing}
                >
                  <option value="">Pilih Santri</option>
                  {santris.map((santri) => (
                    <option key={santri.id} value={santri.id}>
                      {santri.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject_id">Mata Pelajaran</label>
                <select
                  id="subject_id"
                  name="subject_id"
                  value={formData.subject_id}
                  onChange={handleChange}
                  required
                  disabled={isEditing}
                >
                  <option value="">Pilih Mata Pelajaran</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name} - {subject.jenjang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="grade">Nilai (0-100)</label>
                <input
                  id="grade"
                  type="number"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="Masukkan nilai"
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-primary">
              {isEditing ? "Update Nilai" : "Tambah Nilai"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn-secondary"
                onClick={resetForm}
              >
                Batal
              </button>
            )}
          </form>
        </div>

        <div className="table-container fade-in">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Santri</th>
                  <th>Mata Pelajaran</th>
                  <th>jenjang</th>
                  <th>Nilai</th>
                  <th>Keterangan</th>
                  <th>Tanggal Input</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {gradesList.map((grade, index) => (
                  <tr key={grade.id}>
                    <td>{index + 1}</td>
                    <td>{getSantriName(grade.santri_id)}</td>
                    <td>{getSubjectName(grade.subject_id)}</td>
                    <td>{getSubjectJenjang(grade.subject_id)}</td>
                    <td>
                      <span
                        className={`grade-badge ${getGradeColor(grade.grade)}`}
                      >
                        {grade.grade}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`grade-badge ${getGradeColor(grade.grade)}`}
                      >
                        {getGradeLabel(grade.grade)}
                      </span>
                    </td>
                    <td>{formatDate(grade.created_at)}</td>
                    <td className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(grade)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(grade.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Grades;
