import React, { useState } from 'react';

export default function PembagianKamar() {
    const [assignments] = useState([
        { id: 1, santri: "Abdullah Rahman", kamar: "Ar-Rahman" },
        { id: 2, santri: "Agung Wibowo", kamar: "Ar-Rahim" },
        { id: 3, santri: "Ahmad Fauzi", kamar: "Al-Malik" },
        { id: 4, santri: "Ali Imran", kamar: "Al-Quddus" },
        { id: 5, santri: "Bahtiar Habib", kamar: "As-Salam" },
        { id: 6, santri: "Bilal Ibnu Rabah", kamar: "Al-Mu'min" },
        { id: 7, santri: "Fadel Tri Naba", kamar: "Al-Muhaymin" },
        { id: 8, santri: "Fatur Rohman", kamar: "Al-Aziz" },
        { id: 9, santri: "Hasan Al Basri", kamar: "Al-Jabbar" },
        { id: 10, santri: "Jalil Thoriq", kamar: "Al-Mutakabbir" },
        { id: 11, santri: "Khabib Gofur", kamar: "Al-Khaliq" },
        { id: 12, santri: "Kinan Varaby", kamar: "Al-Bari" },
        { id: 13, santri: "Muhammad Reiki", kamar: "Al-Musawwir" },
        { id: 14, santri: "Muhammad Rizki", kamar: "Al-Ghaffar" },
        { id: 15, santri: "Raian Handoko", kamar: "Al-Qahhar" },
        { id: 16, santri: "Umar Faruq", kamar: "Ar-Rahman" },
        { id: 17, santri: "Zaid bin Tsabit", kamar: "Ar-Rahim" },
        { id: 18, santri: "Zhafran Dimas", kamar: "Al-Malik" }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [isHovered, setIsHovered] = useState(false);

    const filteredAssignments = assignments.filter(item =>
        item.santri.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kamar.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAssignments.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);

    // Menghitung statistik kamar yang terisi
    const uniqueRooms = [...new Set(assignments.map(item => item.kamar))];
    const totalAssignedRooms = uniqueRooms.length;

    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css" rel="stylesheet" />

            <div style={{ backgroundColor: 'rgb(239, 244, 252)' }} className="min-vh-100 py-4">
                <div className="container-fluid">

                    {/* Header */}
                    <div className="mb-4 mt-4 mx-4">
                        <div className="d-flex align-items-center mb-4">
                            <div className="p-3 rounded me-3 text-white" style={{ backgroundColor: '#8FBC8F' }}>
                                <i className="bi bi-people-fill fs-4" style={{ color: '#666' }}></i>
                            </div>
                            <div>
                                <h3 className="mb-1 text-dark fw-bold">Pembagian Kamar Asrama</h3>
                                <p className="text-muted mb-0">Lihat informasi santri dan kamar yang ditempati</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="row mb-4 mx-2">
                        <div className="col-md-6 mb-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body d-flex align-items-center">
                                    <div className="p-2 rounded text-white me-3" style={{ backgroundColor: '#8FBC8F' }}>
                                        <i className="bi bi-check2-circle fs-5" style={{ color: '#666' }}></i>
                                    </div>
                                    <div>
                                        <small className="text-muted fw-medium">Total Pembagian</small>
                                        <h4 className="mb-0 fw-bold">{assignments.length}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body d-flex align-items-center">
                                    <div className="p-2 rounded text-white me-3" style={{ backgroundColor: '#8FBC8F' }}>
                                        <i className="bi bi-house-door fs-5" style={{ color: '#666' }}></i>
                                    </div>
                                    <div>
                                        <small className="text-muted fw-medium">Kamar Terisi</small>
                                        <h4 className="mb-0 fw-bold">{totalAssignedRooms}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter */}
                    <div className="card border-0 shadow-sm mb-5 mx-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-medium">Cari Santri / Kamar</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-search"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Ketik nama santri atau nama kamar..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3 d-flex align-items-end">
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
                                Daftar Pembagian Kamar ({filteredAssignments.length} dari {assignments.length})
                            </h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="fw-semibold">No.</th>
                                            <th className="fw-semibold">Nama Santri</th>
                                            <th className="fw-semibold">Nama Kamar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.length > 0 ? (
                                            currentItems.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td className="fw-medium">{indexOfFirstItem + index + 1}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="p-2 rounded me-3" style={{ backgroundColor: '#F5F5F5' }}>
                                                                <i className="bi bi-person-fill" style={{ color: '#8FBC8F', fontSize: '1.25rem' }}></i>
                                                            </div>
                                                            <span className="fw-medium">{item.santri}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <div className="p-2 rounded me-3" style={{ backgroundColor: '#F5F5F5' }}>
                                                                <i className="bi bi-house-door" style={{ color: '#8FBC8F', fontSize: '1.25rem' }}></i>
                                                            </div>
                                                            <span className="fw-medium">{item.kamar}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center py-5">
                                                    <div className="text-muted">
                                                        <i className="bi bi-inbox fs-1 mb-3 d-block"></i>
                                                        <h5 className="text-muted">Tidak ada data ditemukan</h5>
                                                        <p className="small">Silakan ubah pencarian atau filter</p>
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