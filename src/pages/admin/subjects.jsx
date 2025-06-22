import { useEffect, useState } from "react";
import { getSubject, createSubject, updateSubject, deleteSubject,} from "../../_services/subject";
import { getClassroom } from "../../_services/classroom";
import { getMudaris } from "../../_services/mudaris";
import AdminLayout from "../../layouts/AdminLayout";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [mudaris, setMudaris] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    day: "",
    year: "",
    jenjang: "",
    classroom_id: "",
    mudaris_id: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [subjectsData, classroomsData, mudarisData] = await Promise.all([
        getSubject(),
        getClassroom(),
        getMudaris(),
      ]);
      setSubjects(subjectsData);
      setClassrooms(classroomsData);
      setMudaris(mudarisData);
    };

    fetchData();
  }, []);

  const getClassroomName = (id) => {
    const classroom = classrooms.find((c) => c.id === id);
    return classroom ? classroom.name : "-";
  };
  
  const getMudarisName = (id) => {
    const m = mudaris.find((m) => m.id === id);
    return m ? m.name : "-";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      day: "",
      year: "",
      jenjang: "",
      classroom_id: "",
      mudaris_id: "",
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.year || formData.year < 2020 || formData.year > 2030) {
      alert("Tahun ajaran harus antara 2020 - 2030");
      return;
    }

    try {
      if (isEditing) {
        await updateSubject(editId, { ...formData, _method: "PUT" });
        alert("Berhasil memperbarui jadwal");
      } else {
        await createSubject(formData);
        alert("Berhasil menambahkan jadwal");
      }

      // refresh data
      const subjectsData = await getSubject();
      setSubjects(subjectsData);

      resetForm();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan data");
    }
  };

  const handleEdit = (subject) => {
    setFormData({
      name: subject.name,
      day: subject.day,
      year: subject.year,
      jenjang: subject.jenjang,
      classroom_id: subject.classroom_id,
      mudaris_id: subject.mudaris_id,
    });
    setIsEditing(true);
    setEditId(subject.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;

    try {
      await deleteSubject(id);
      setSubjects(subjects.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
    }
  };

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
          border-radius: 10px;
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

        .subject-default {
          background-color: #f3f4f6;
          color: var(--color-gray-dark);
        }

        .day-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          background-color: #f0f9ff;
          color: #0369a1;
        }

        .time-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          background-color: #f0fdf4;
          color: #166534;
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

      <AdminLayout currentPage="/jadwal" >
        <nav className="navbar">
          <h1>Jadwal Mata Pelajaran</h1>
          <div className="profile" tabIndex="0" aria-label="User Profile">
            <img src="https://i.pravatar.cc/40" alt="User Profile" />
            <span>Admin</span>
          </div>
        </nav>

        <div className="page-header fade-in">
          <h2>Manajemen Data Mata Pelajaran</h2>
          <p>
            Kelola data mata pelajaran pondok pesantren dengan mudah dan terorganisir
          </p>
        </div>

        <div className="form-container fade-in">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Nama Mata Pelajaran</label>
                <input 
                  id="name"
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Masukkan Mata Pelajaran" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="day">Hari</label>
                <select
                  id="day"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  required
                >
                  <option value="">---Pilih Hari---</option>
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="year">Tahun Ajaran</label>
                <input 
                  id="year"
                  type="number"
                  name="year" 
                  value={formData.year} 
                  onChange={handleChange} 
                  placeholder="2025"
                  min="2020"
                  max="2030"
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="jenjang">Jenjang</label>
                <select
                  id="jenjang"
                  name="jenjang"
                  value={formData.jenjang}
                  onChange={handleChange}
                  required
                >
                  <option value="">---Pilih Jenjang---</option>
                  <option value="Aliyah">Aliyah</option>
                  <option value="Tsanawiyah">Tsanawiyah</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="classroom_id">Kelas</label>
                <select 
                  id="classroom_id"
                  name="classroom_id" 
                  value={formData.classroom_id} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">---Pilih Kelas---</option>
                  {classrooms.map(classroom => (
                    <option key={classroom.id} value={classroom.id}>
                      {classroom.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="mudaris_id">Pengajar (Mudaris)</label>
                <select 
                  id="mudaris_id"
                  name="mudaris_id" 
                  value={formData.mudaris_id} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">---Pilih Pengajar---</option>
                  {mudaris.map(mudaris => (
                    <option key={mudaris.id} value={mudaris.id}>
                      {mudaris.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <button type="submit" className="btn-primary">
              {isEditing ? 'Update Jadwal' : 'Tambah Jadwal'}
            </button>
          </form>
        </div>

        <div className="table-container fade-in">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Mata Pelajaran</th>
                  <th>Hari</th>
                  <th>Tahun</th>
                  <th>Jenjang</th>
                  <th>Kelas</th>
                  <th>Pengajar</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                 {subjects.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "1rem" }}>
                    Belum ada data jadwal.
                  </td>
                </tr>
              ) : (
                subjects.map((subject, index) => (
                  <tr key={subject.id}>
                    <td>{index + 1}</td>
                    <td>{subject.name}</td>
                    <td>{subject.day}</td>
                    <td>{subject.year}</td>
                    <td>
                      <span className="subject-badge subject-default">
                        {subject.jenjang}
                      </span>
                    </td>
                    <td>{getClassroomName(subject.classroom_id)}</td>
                    <td>{getMudarisName(subject.mudaris_id)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="btn-edit"
                          onClick={() => handleEdit(subject)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-delete"
                          onClick={() => handleDelete(subject.id)}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}