import React, { useState, useEffect } from "react";
import {getMudaris, createMudaris, updateMudaris, deleteMudaris,} from "../../_services/mudaris";
import AdminLayout from "../../layouts/AdminLayout";

const Mudaris = () => {
  const [mudarisList, setMudarisList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    no_hp: "",
    pp_mudaris: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchMudaris();
  }, []);

  const fetchMudaris = async () => {
    try {
      const data = await getMudaris();
      setMudarisList(data);
    } catch (error) {
      console.error("Gagal mengambil data mudaris:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "pp_mudaris") {
      setFormData({
        ...formData,
        pp_mudaris: files[0], // ambil file pertama
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const payload = new FormData();
  
      for (const key in formData) {
        // append formData[key] jika bukan null atau undefined
        if (formData[key] !== null && formData[key] !== undefined) {
          payload.append(key, formData[key]);
        }
      }
  
      if (isEditing) {
        payload.append("_method", "PUT");
        await updateMudaris(formData.id, payload);
      } else {
        await createMudaris(payload);
      }
  
      await fetchMudaris();
      resetForm();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Gagal menyimpan data.");
    }
  };  
  
  const handleEdit = (mudaris) => {
    setFormData({
      id: mudaris.id,
      name: mudaris.name,
      address: mudaris.address,
      no_hp: mudaris.no_hp,
      pp_mudaris: null, 
    });
    setIsEditing(true);
  };
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data mudaris ini?");
    if (!confirmDelete) return;

    try {
      await deleteMudaris(id);
      await fetchMudaris();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Gagal menghapus data mudaris.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      no_hp: "",
      pp_mudaris: null
    });
    setIsEditing(false);
  };

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

      <AdminLayout currentPage="/mudaris">
        <nav className="navbar">
          <h1>Data Mudaris (Ustadz)</h1>
          <div className="profile">
            <img src="https://i.pravatar.cc/40" alt="User Profile" />
            <span>Admin</span>
          </div>
        </nav>

        <div className="page-header fade-in">
          <h2>Manajemen Data Mudaris</h2>
          <p>
            Kelola data mudaris pondok pesantren dengan mudah dan terorganisir
          </p>
        </div>

        <div className="form-container fade-in">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Nama Lengkap Mudaris</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>


              <div className="form-group">
                <label htmlFor="address">Alamat</label>
                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Masukkan alamat lengkap"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="no_hp">No. Handphone</label>
                <input
                  id="no_hp"
                  type="tel"
                  name="no_hp"
                  value={formData.no_hp}
                  onChange={handleChange}
                  placeholder="Masukkan nomor handphone"
                  pattern="[0-9]{10,15}"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pp_mudaris">Foto Mudaris (Opsional)</label>
                <input
                  id="pp_mudaris"
                  type="file"
                  name="pp_mudaris"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary">
              {isEditing ? "Update Data Mudaris" : "Tambah Data Mudaris"}
            </button>
          </form>
        </div>

        <div className="table-container fade-in">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Lengkap</th>
                  <th>Alamat</th>
                  <th>No. Handphone</th>
                  <th>Profil</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mudarisList.map((mudaris, index) => (
                  <tr key={mudaris.id}>
                    <td>{index + 1}</td>
                    <td>{mudaris.name}</td>
                    <td>{mudaris.address}</td>
                    <td>{mudaris.no_hp}</td>
                    <td>{mudaris.pp_mudaris}</td>
                    <td className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(mudaris)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(mudaris.id)}
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

export default Mudaris;