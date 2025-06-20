import React, { useState } from 'react';

export default function Asrama() {
    const [kamarData] = useState([
        { id: 1, nama_kamar: "Ar-Rahman", capacity: 15, mudaris: "Ustadz Ahmad Fadli" },
        { id: 2, nama_kamar: "Ar-Rahim", capacity: 12, mudaris: "Ustadz Muhammad Rizki" },
        { id: 3, nama_kamar: "Al-Malik", capacity: 18, mudaris: "Ustadz Abdullah Rahman" },
        { id: 4, nama_kamar: "Al-Quddus", capacity: 10, mudaris: "Ustadz Ali Hidayat" },
        { id: 5, nama_kamar: "As-Salam", capacity: 16, mudaris: "Ustadz Junaidi Rahman" },
        { id: 6, nama_kamar: "Al-Mu'min", capacity: 14, mudaris: "Ustadz Budi Santoso" },
        { id: 7, nama_kamar: "Al-Muhaymin", capacity: 20, mudaris: "Ustadz Hilmi Syarif" },
        { id: 8, nama_kamar: "Al-Aziz", capacity: 13, mudaris: "Ustadz Luthfi Rahmat" },
        { id: 9, nama_kamar: "Al-Jabbar", capacity: 11, mudaris: "Ustadz Burhan Majid" },
        { id: 10, nama_kamar: "Al-Mutakabbir", capacity: 17, mudaris: "Ustadz Zaki Wahyudi" },
        { id: 11, nama_kamar: "Al-Khaliq", capacity: 19, mudaris: "Ustadz Faisal Nurhadi" },
        { id: 12, nama_kamar: "Al-Bari", capacity: 8, mudaris: "Ustadz Ridho Ramadhan" },
        { id: 13, nama_kamar: "Al-Musawwir", capacity: 15, mudaris: "Ustadz Salim Hidayat" },
        { id: 14, nama_kamar: "Al-Ghaffar", capacity: 12, mudaris: "Ustadz Hanafi Ridwan" },
        { id: 15, nama_kamar: "Al-Qahhar", capacity: 16, mudaris: "Ustadz Yusuf Maulana" }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterCapacity, setFilterCapacity] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [isHovered, setIsHovered] = useState(false);

    const filteredData = kamarData.filter(kamar => {
        const matchesSearch = kamar.nama_kamar.toLowerCase().includes(searchTerm.toLowerCase()) || kamar.mudaris.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCapacity = filterCapacity === '' || (filterCapacity === 'small' && kamar.capacity <= 10) || (filterCapacity === 'medium' && kamar.capacity > 10 && kamar.capacity <= 15) || (filterCapacity === 'large' && kamar.capacity > 15);
        return matchesSearch && matchesCapacity;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const getCapacityBadge = (capacity) => {
        if (capacity <= 10) return { class: 'bg-info', text: 'Kecil' };
        if (capacity <= 15) return { class: 'bg-warning', text: 'Sedang' };
        return { class: 'bg-success', text: 'Besar' };
    };

    const totalCapacity = kamarData.reduce((sum, kamar) => sum + kamar.capacity, 0);

    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css" rel="stylesheet" />

            <div style={{ backgroundColor: 'rgb(239, 244, 252)' }} className="min-vh-100 py-4">
                <div className="container-fluid">

                    {/* Header */}
                    <div className="mb-4 mt-4 mx-4">
                        <div className="d-flex align-items-center mb-4">
                            <div className="p-3 rounded me-3 text-white" style={{ backgroundColor: '#D4A574' }}>
                                <i className="bi bi-house-door-fill fs-4" style={{ color: '#F9F9F9' }}></i>
                            </div>
                            <div>
                                <h3 className="mb-1 text-dark fw-bold">Informasi Data Kamar Asrama</h3>
                                <p className="text-muted mb-0">Lihat informasi kamar asrama di pesantren</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="row mb-4 mx-2">
                        <div className="col-md-4 mb-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body d-flex align-items-center">
                                    <div className="p-2 rounded text-white me-3" style={{ backgroundColor: '#D4A574' }}>
                                        <i className="bi bi-door-open fs-5" style={{ color: '#F9F9F9' }}></i>
                                    </div>
                                    <div>
                                        <small className="text-muted fw-medium">Total Kamar</small>
                                        <h4 className="mb-0 fw-bold">{kamarData.length}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body d-flex align-items-center">
                                    <div className="p-2 rounded text-white me-3" style={{ backgroundColor: '#D4A574' }}>
                                        <i className="bi bi-people fs-5" style={{ color: '#F9F9F9' }}></i>
                                    </div>
                                    <div>
                                        <small className="text-muted fw-medium">Total Kapasitas</small>
                                        <h4 className="mb-0 fw-bold">{totalCapacity}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body d-flex align-items-center">
                                    <div className="p-2 rounded text-white me-3" style={{ backgroundColor: '#D4A574' }}>
                                        <i className="bi bi-graph-up fs-5" style={{ color: '#F9F9F9' }}></i>
                                    </div>
                                    <div>
                                        <small className="text-muted fw-medium">Rata-rata Kapasitas</small>
                                        <h4 className="mb-0 fw-bold">
                                            {Math.round(totalCapacity / kamarData.length)}
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
                                    <label className="form-label fw-medium">Cari Kamar</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-search"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cari berdasarkan nama kamar atau mudaris..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label fw-medium">Kapasitas</label>
                                    <select className="form-select" value={filterCapacity} onChange={(e) => setFilterCapacity(e.target.value)}>
                                        <option value="">Semua</option>
                                        <option value="small">Kecil (≤10 orang)</option>
                                        <option value="medium">Sedang (11-15 orang)</option>
                                        <option value="large">Besar (&gt;15 orang)</option>
                                    </select>
                                </div>

                                <div className="col-md-4 mb-3 d-flex align-items-end">
                                    <button
                                        className="btn btn-reset w-100"
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
                                            setFilterCapacity('');
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
                                Daftar Kamar Asrama ({filteredData.length} dari {kamarData.length})
                            </h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="fw-semibold">No.</th>
                                            <th className="fw-semibold">Nama Kamar</th>
                                            <th className="fw-semibold">Mudaris (Pengasuh)</th>
                                            <th className="fw-semibold">Kapasitas</th>
                                            <th className="fw-semibold">Kategori</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.length > 0 ? (
                                            currentItems.map((kamar, index) => {
                                                const badge = getCapacityBadge(kamar.capacity);
                                                return (
                                                    <tr key={kamar.id}>
                                                        <td className="fw-medium">{indexOfFirstItem + index + 1}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="p-2 rounded me-3" style={{ backgroundColor: '#F5F5F5' }}>
                                                                    <i className="bi bi-house-door" style={{ color: '#D4A574', fontSize: '1.25rem' }}></i>
                                                                </div>
                                                                <span className="fw-medium">{kamar.nama_kamar}</span>
                                                            </div>
                                                        </td>
                                                        <td>{kamar.mudaris}</td>
                                                        <td>
                                                            <span className="fw-medium">{kamar.capacity} orang</span>
                                                        </td>
                                                        <td>
                                                            <span className={`badge ${badge.class} text-white`}>
                                                                {badge.text}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center py-5">
                                                    <div className="text-muted">
                                                        <i className="bi bi-inbox fs-1 mb-3 d-block"></i>
                                                        <h5 className="text-muted">Tidak ada data kamar yang ditemukan</h5>
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