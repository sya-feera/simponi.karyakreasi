import { useEffect, useState } from "react";
import {getDormAssignments, createDormAssignment, updateDormAssignment, deleteDormAssignment,} from "../../_services/dormAssignment";
import { getDorms } from "../../_services/dorms";
import { getSantri } from "../../_services/santri";
import AdminLayout from "../../layouts/AdminLayout";


export default function DormAssignment() {
    const [assignments, setAssignments] = useState([]);
    const [dorms, setDorms] = useState([]);
    const [santris, setSantris] = useState([]);
    const [formData, setFormData] = useState({
      santri_id: "",
      dorm_id: "",
      room_number: "",
      assigned_date: "", 
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
  
    useEffect(() => {
      async function fetchData() {
        const [assignmentsData, dormsData, santrisData] = await Promise.all([
          getDormAssignments(),
          getDorms(),
          getSantri(),
        ]);
        setAssignments(assignmentsData);
        setDorms(dormsData);
        setSantris(santrisData);
      }
      fetchData();
    }, []);
  
    const getDormName = (id) => {
      const dorm = dorms.find((d) => d.id === id);
      return dorm ? dorm.name : "-";
    };
  
    const getSantriName = (id) => {
      const santri = santris.find((s) => s.id === id);
      return santri ? santri.name : "-";
    };
  
    // Hitung jumlah penghuni per dorm
    const countAssignedInDorm = (dorm_id) => {
      return assignments.filter((a) => a.dorm_id === dorm_id).length;
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((f) => ({ ...f, [name]: value }));
    };
  
    const resetForm = () => {
      setFormData({
        santri_id: "",
        dorm_id: "",
        entry_date: "",
        exit_date: "",
      });
      setIsEditing(false);
      setEditId(null);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const dormCapacity = dorms.find(d => d.id === Number(formData.dorm_id))?.capacity || 0;
        const assignedCount = assignments.filter(a => a.dorm_id === Number(formData.dorm_id) && (!isEditing || a.id !== editId)).length;
    
        if (!isEditing && assignedCount >= dormCapacity) {
          alert("Kapasitas asrama sudah penuh, tidak bisa menambah penempatan.");
          return;
        }
    
        if (isEditing) {
          await updateDormAssignment(editId, { ...formData, _method: 'PUT' });
        } else {
          await createDormAssignment(formData);
        }        
    
        const assignmentsData = await getDormAssignments();
        setAssignments(assignmentsData);
    
        resetForm();
      } catch (err) {
        console.error(err);
        alert("Gagal menyimpan data");
      }
    };    
  
    const handleEdit = (assignment) => {
      setFormData({
        santri_id: assignment.santri_id,
        dorm_id: assignment.dorm_id,
        entry_date: assignment.entry_date || "",
        exit_date: assignment.exit_date || "",
      });
      setIsEditing(true);
      setEditId(assignment.id);
    };
    
  
    const handleDelete = async (id) => {
      if (!window.confirm("Yakin ingin menghapus data ini?")) return;
      try {
        await deleteDormAssignment(id);
        setAssignments(assignments.filter((a) => a.id !== id));
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

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background-color: var(--color-white);
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          border-left: 4px solid var(--color-primary);
        }

        .stat-card h3 {
          margin: 0 0 0.5rem 0;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-gray-dark);
          text-transform: uppercase;
        }

        .stat-card .stat-number {
          font-size: 2rem;
          font-weight: 600;
          color: var(--color-primary);
          margin: 0;
        }

        .stat-card .stat-detail {
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.5rem;
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

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-active {
          background-color: #dcfce7;
          color: #166534;
        }

        .status-pending {
          background-color: #fef3c7;
          color: #92400e;
        }

        .status-expired {
          background-color: #fee2e2;
          color: #991b1b;
        }

        .occupancy-info {
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }

        .occupancy-bar {
          width: 100%;
          height: 4px;
          background-color: #e5e7eb;
          border-radius: 2px;
          margin-top: 0.25rem;
          overflow: hidden;
        }

        .occupancy-fill {
          height: 100%;
          background-color: var(--color-primary);
          border-radius: 2px;
          transition: width 0.3s ease;
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

          .stats-container {
            grid-template-columns: 1fr;
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

          .stats-container {
            grid-template-columns: 1fr;
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

      <AdminLayout currentPage="/pembagian-kamar" >
        <nav className="navbar">         
          <h1>Pembagian Kamar Asrama</h1>
          <div className="profile">
            <img src="https://i.pravatar.cc/40" alt="User Profile" />
            <span>Admin</span>
          </div>
        </nav>

        <div className="page-header fade-in">
          <h2>Manajemen Data Pembagian Kamar Asrama</h2>
          <p>
            Kelola data pembagian kamar asrama pondok pesantren dengan mudah dan terorganisir
          </p>
        </div>

        <div className="form-container fade-in">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="santri_id">Nama Santri</label>
                <select 
                  id="santri_id"
                  name="santri_id" 
                  value={formData.santri_id} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">Pilih Santri</option>
                  {santris.map(santri => (
                    <option key={santri.id} value={santri.id}>
                      {santri.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="dorm_id">Asrama</label>
                <select
                  id="dorm_id"
                  name="dorm_id"
                  value={formData.dorm_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">---Pilih Asrama---</option>
                  {dorms.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} (Kapasitas: {d.capacity}, Terisi: {countAssignedInDorm(d.id)})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="entry_date">Tanggal Masuk</label>
                <input
                  type="date"
                  id="entry_date"
                  name="entry_date"
                  value={formData.entry_date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="exit_date">Tanggal Keluar (Opsional)</label>
                <input
                  type="date"
                  id="exit_date"
                  name="exit_date"
                  value={formData.exit_date}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <button type="submit" className="btn-primary">
              {isEditing ? "Update Penempatan" : "Tambah Penempatan"}
            </button>
          </form>
        </div>

        <div className="table-container fade-in">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Santri</th>
                  <th>Asrama</th>
                  <th>Tanggal Masuk</th>
                  <th>Tanggal Keluar</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((a, index) => (
                  <tr key={a.id}>
                    <td>{index + 1}</td>
                    <td>{getSantriName(a.santri_id)}</td>
                    <td>{getDormName(a.dorm_id)}</td>
                    <td>{a.entry_date}</td>
                    <td>{a.exit_date}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="btn-edit"
                          onClick={() => handleEdit(a)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-delete"
                          onClick={() => handleDelete(a.id)}
                        >
                          Hapus
                        </button>
                      </div>
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
}