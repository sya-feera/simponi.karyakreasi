import React, { useState } from 'react';

export default function Classroom() {
    const [classrooms] = useState([
        { id: 1, name: "Ruang Tauhid", location: "Gedung A - Lantai 1" },
        { id: 2, name: "Ruang Fiqih", location: "Gedung A - Lantai 2" },
        { id: 3, name: "Ruang Hadits", location: "Gedung B - Lantai 1" },
        { id: 4, name: "Ruang Tafsir", location: "Gedung B - Lantai 2" },
        { id: 5, name: "Ruang Nahwu", location: "Gedung C - Lantai 1" },
        { id: 6, name: "Ruang Sharaf", location: "Gedung C - Lantai 2" },
        { id: 7, name: "Ruang Balaghah", location: "Gedung D - Lantai 1" },
        { id: 8, name: "Ruang Aqidah", location: "Gedung D - Lantai 2" }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterGedung, setFilterGedung] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [isHovered, setIsHovered] = useState(false);

    const handleReset = () => {
        setSearchTerm('');
        setFilterGedung('');
        setCurrentPage(1);
    };

    const filteredClassrooms = classrooms.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterGedung ? room.location.toLowerCase().includes(filterGedung.toLowerCase()) : true)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredClassrooms.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredClassrooms.length / itemsPerPage);

    const getUniqueBuildings = () => {
        const buildings = [...new Set(classrooms.map(room => room.location.split(' - ')[0]))];
        return buildings;
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
                            <div className="p-3 rounded me-3 text-white" style={{ backgroundColor: '#D4B896' }}>
                                <i className="bi bi-door-closed-fill fs-4" style={{ color: '#F9F9F9' }}></i>
                            </div>
                            <div>
                                <h3 className="mb-1 text-dark fw-bold">Data Ruang Kelas</h3>
                                <p className="text-muted mb-0">Daftar ruang kelas dan lokasi dalam lingkungan pesantren</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="row mb-4 mx-2">
                        <div className="col-md-6 mb-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body d-flex align-items-center">
                                    <div className="p-2 rounded text-white me-3" style={{ backgroundColor: '#D4B896' }}>
                                        <i className="bi bi-door-closed fs-5" style={{ color: '#F9F9F9' }}></i>
                                    </div>
                                    <div>
                                        <small className="text-muted fw-medium">Total Ruang</small>
                                        <h4 className="mb-0 fw-bold">{filteredClassrooms.length}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body d-flex align-items-center">
                                    <div className="p-2 rounded text-white me-3" style={{ backgroundColor: '#D4B896' }}>
                                        <i className="bi bi-building fs-5" style={{ color: '#F9F9F9' }}></i>
                                    </div>
                                    <div>
                                        <small className="text-muted fw-medium">Total Gedung</small>
                                        <h4 className="mb-0 fw-bold">{getUniqueBuildings().length}</h4>
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
                                    <label className="form-label fw-medium">Cari Ruang</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-search"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Cari berdasarkan nama ruang..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label fw-medium">Gedung</label>
                                    <select
                                        className="form-select"
                                        value={filterGedung}
                                        onChange={(e) => setFilterGedung(e.target.value)}
                                    >
                                        <option value="">Semua</option>
                                        <option value="Gedung A">Gedung A</option>
                                        <option value="Gedung B">Gedung B</option>
                                        <option value="Gedung C">Gedung C</option>
                                        <option value="Gedung D">Gedung D</option>
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
                                        onClick={handleReset}
                                    >
                                        <i className="bi bi-arrow-clockwise me-2"></i>
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cards */}
                    <div className="card border-0 shadow-sm mb-5 mx-4">
                        <div className="card-header bg-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0 fw-bold">
                                Daftar Ruang Kelas ({filteredClassrooms.length} dari {classrooms.length})
                            </h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                {currentItems.map((room) => (
                                    <div className="col-md-6 col-lg-4 mb-4" key={room.id}>
                                        <div className="card shadow-sm border-0 h-100" style={{ 
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)';
                                        }}>
                                            <div className="card-body">
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="p-2 rounded me-3" style={{ backgroundColor: '#F4E8D0' }}>
                                                        <i className="bi bi-door-closed fs-5" style={{ color: '#8B5A3C' }}></i>
                                                    </div>
                                                    <h5 className="card-title fw-semibold mb-0" style={{ color: '#8B5A3C' }}>
                                                        {room.name}
                                                    </h5>
                                                </div>
                                                <p className="card-text text-muted mb-0">
                                                    <i className="bi bi-geo-alt me-2" style={{ color: '#A67C5A' }}></i>
                                                    {room.location}
                                                </p>
                                            </div>
                                            <div className="card-footer bg-transparent border-0 pt-0">
                                                <small className="text-muted">
                                                    <i className="bi bi-building me-1"></i>
                                                    {room.location.split(' - ')[0]}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                {currentItems.length === 0 && (
                                    <div className="col-12">
                                        <div className="text-center py-5">
                                            <div className="text-muted">
                                                <i className="bi bi-inbox fs-1 mb-3 d-block" style={{ color: '#D4B896' }}></i>
                                                <h5 className="text-muted">Tidak ada ruang kelas yang ditemukan</h5>
                                                <p className="small">Coba ubah filter pencarian Anda</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
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
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}