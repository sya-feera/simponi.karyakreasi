import React, { useState } from 'react';

export default function DataSantri() {
    const [santriData] = useState([
        { id: 1, name: "Abdullah Rahman", tgl_lahir: "2006-09-30", jenjang: '2A', email: "abdullah@example.com", foto: "https://i.pravatar.cc/40?img=1" },
        { id: 2, name: "Agung Wibowo", tgl_lahir: "2006-06-18", jenjang: '2B', email: "agung@example.com", foto: "https://i.pravatar.cc/40?img=2" },
        { id: 3, name: "Ahmad Fauzi", tgl_lahir: "2007-03-15", jenjang: '1A', email: "ahmad@example.com", foto: "https://i.pravatar.cc/40?img=3" },
        { id: 4, name: "Ali Imran", tgl_lahir: "2005-01-20", jenjang: '3B', email: "ali@example.com", foto: "https://i.pravatar.cc/40?img=4" },
        { id: 5, name: "Bahtiar Habib", tgl_lahir: "2006-06-21", jenjang: '1C', email: "bahtiar@example.com", foto: "https://i.pravatar.cc/40?img=5" },
        { id: 6, name: "Bilal Ibnu Rabah", tgl_lahir: "2006-06-10", jenjang: '2B', email: "bilal@example.com", foto: "https://i.pravatar.cc/40?img=6" },
        { id: 7, name: "Fadel Tri Naba", tgl_lahir: "2006-07-19", jenjang: '2B', email: "fadel@example.com", foto: "https://i.pravatar.cc/40?img=7" },
        { id: 8, name: "Fatur Rohman", tgl_lahir: "2007-09-30", jenjang: '1C', email: "fatur@example.com", foto: "https://i.pravatar.cc/40?img=8" },
        { id: 9, name: "Hasan Al Basri", tgl_lahir: "2005-08-12", jenjang: '3C', email: "hasan@example.com", foto: "https://i.pravatar.cc/40?img=9" },
        { id: 10, name: "Jalil Thoriq", tgl_lahir: "2005-11-03", jenjang: '3A', email: "jalil@example.com", foto: "https://i.pravatar.cc/40?img=10" },
        { id: 11, name: "Khabib Gofur", tgl_lahir: "2005-10-20", jenjang: '2A', email: "khabib@example.com", foto: "https://i.pravatar.cc/40?img=11" },
        { id: 12, name: "Kinan Varaby", tgl_lahir: "2005-12-21", jenjang: '3C', email: "kinan@example.com", foto: "https://i.pravatar.cc/40?img=12" },
        { id: 13, name: "Muhammad Reiki", tgl_lahir: "2005-06-22", jenjang: '3B', email: "muhammad@example.com", foto: "https://i.pravatar.cc/40?img=13" },
        { id: 14, name: "Muhammad Rizki", tgl_lahir: "2007-11-08", jenjang: '1B', email: "rizki@example.com", foto: "https://i.pravatar.cc/40?img=14" },
        { id: 15, name: "Raian Handoko", tgl_lahir: "2007-02-14", jenjang: '1A', email: "raian@example.com", foto: "https://i.pravatar.cc/40?img=15" },
        { id: 16, name: "Umar Faruq", tgl_lahir: "2006-12-03", jenjang: '2C', email: "umar@example.com", foto: "https://i.pravatar.cc/40?img=16" },
        { id: 17, name: "Zaid bin Tsabit", tgl_lahir: "2007-03-05", jenjang: '1C', email: "zaid@example.com", foto: "https://i.pravatar.cc/40?img=17" },
        { id: 18, name: "Zhafran Dimas", tgl_lahir: "2005-09-22", jenjang: '3B', email: "zhafran@example.com", foto: "https://i.pravatar.cc/40?img=18" },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterJenjang, setFilterJenjang] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isHovered, setIsHovered] = useState(false);

    const filteredData = santriData.filter(santri => {
        const matchesSearch = santri.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesJenjang = filterJenjang === '' || santri.jenjang === filterJenjang;
        return matchesSearch && matchesJenjang;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
        }
        return age;
    };

    return (
        <>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css" rel="stylesheet" />

        <div style={{ backgroundColor: 'rgb(239, 244, 252)' }} className="min-vh-100 py-4">
            <div className="container-fluid">
            {/* Header */}
            <div className="mb-4 mt-4 mx-4">
                <div className="d-flex align-items-center mb-4">
                <div className="p-3 rounded me-3 text-white" style={{ backgroundColor: '#A8D5BA' }}>
                    <i className="bi bi-people-fill fs-4" style={{ color: '#666' }}></i>
                </div>
                <div>
                    <h3 className="mb-1 text-dark fw-bold">Data Santri</h3>
                    <p className="text-muted mb-0">Lihat informasi data santri pesantren</p>
                </div>
                </div>
            </div>

            {/* Stats */}
            <div className="row mb-4 mx-2">
                <div className="col-md-6 mb-3">
                <div className="card border-0 shadow-sm">
                    <div className="card-body d-flex align-items-center">
                    <div className="p-2 rounded text-white me-3" style={{ backgroundColor: '#A8D5BA' }}>
                        <i className="bi bi-people fs-5" style={{ color: '#666' }}></i>
                    </div>
                    <div>
                        <small className="text-muted fw-medium">Total Santri</small>
                        <h4 className="mb-0 fw-bold">{santriData.length}</h4>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-md-6 mb-3">
                <div className="card border-0 shadow-sm">
                    <div className="card-body d-flex align-items-center">
                    <div className="p-2 rounded text-white me-3" style={{ backgroundColor: '#A8D5BA' }}>
                        <i className="bi bi-graph-up fs-5" style={{ color: '#666' }}></i>
                    </div>
                    <div>
                        <small className="text-muted fw-medium">Rata-rata Umur</small>
                        <h4 className="mb-0 fw-bold">
                        {Math.round(santriData.reduce((sum, s) => sum + calculateAge(s.tgl_lahir), 0) / santriData.length)} tahun
                        </h4>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card border-0 shadow-sm mb-5 mx-4">
                <div className="card-body">
                <div className="row">
                    <div className="col-md-4 mb-3">
                    <label className="form-label fw-medium">Cari Santri</label>
                    <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-search"></i></span>
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Cari berdasarkan nama..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    </div>

                    <div className="col-md-4 mb-3">
                    <label className="form-label fw-medium">Jenjang</label>
                    <select className="form-select" value={filterJenjang} onChange={(e) => setFilterJenjang(e.target.value)}>
                        <option value="">Semua</option>
                        <option value="1A">1A</option>
                        <option value="1B">1B</option>
                        <option value="1C">1C</option>
                        <option value="2A">2A</option>
                        <option value="2B">2B</option>
                        <option value="2C">2C</option>
                        <option value="3A">3A</option>
                        <option value="3B">3B</option>
                        <option value="3C">3C</option>
                    </select>
                    </div>

                    <div className="col-md-4 mb-3 d-flex align-items-end">
                    <button
                        className="btn w-100"
                        style={{
                        backgroundColor: isHovered ? '#89AEDC' : '#A7C7E7',
                        color: '#000000',
                        border: 'none',
                        transition: 'background-color 0.3s'
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => {
                        setSearchTerm('');
                        setFilterJenjang('');
                        setCurrentPage(1);
                        }}
                    >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Reset
                    </button>
                    </div>
                </div>
                </div>
            </div>

            {/* Table */}
            <div className="card border-0 shadow-sm mb-5 mx-4">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">
                    Daftar Santri ({filteredData.length} dari {santriData.length})
                </h5>
                </div>
                <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                    <thead className="table-light">
                        <tr>
                        <th className="fw-semibold">No.</th>
                        <th className="fw-semibold">Nama Santri</th>
                        <th className="fw-semibold">Email</th>
                        <th className="fw-semibold">Jenjang</th>
                        <th className="fw-semibold">Umur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                        currentItems.map((santri, index) => (
                            <tr key={santri.id}>
                            <td className="fw-medium">{indexOfFirstItem + index + 1}</td>
                            <td>
                                <div className="d-flex align-items-center">
                                <img
                                    src={santri.foto}
                                    alt={santri.name}
                                    className="rounded-circle me-3"
                                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                />
                                <span className="fw-medium">{santri.name}</span>
                                </div>
                            </td>
                            <td>{santri.email}</td>
                            <td>{santri.jenjang}</td>
                            <td>{calculateAge(santri.tgl_lahir)} tahun</td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-5">
                            <div className="text-muted">
                                <i className="bi bi-inbox fs-1 mb-3 d-block"></i>
                                <h5 className="text-muted">Tidak ada data santri yang ditemukan</h5>
                                <p className="small">Coba ubah filter pencarian Anda</p>
                            </div>
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                </div>
                </div>

                {/* Pagination */}
                <nav className="mt-3">
                <ul className="pagination justify-content-center mb-3">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                        {i + 1}
                        </button>
                    </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
                        Next
                    </button>
                    </li>
                </ul>
                </nav>
            </div>
            </div>
        </div>
        </>
    );
}
