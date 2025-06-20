import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import { SantriImageStorage } from '../../_api';
import { getSantri } from '../../_services/santri';

export default function PublicSantri() {
    const [santri,setSantri] = useState([]);

    useEffect(()=>{
            const fetchData = async()=>{
              const [santriData] = await Promise.all([
                getSantri(),
              ])
        
              setSantri(santriData)
        
            }
            fetchData()
        
          }, [])

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [isHovered, setIsHovered] = useState(false);

    const filteredData = santri.filter(santri => {
        const matchesSearch = santri.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch
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
        <Header />
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
                        <h4 className="mb-0 fw-bold">{santri.length}</h4>
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
                        {Math.round(santri.reduce((sum, s) => sum + calculateAge(s.tgl_lahir), 0) / santri.length)} tahun
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
                    <div className="col-md-6 mb-3">
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

                    <div className="col-md-6 mb-3 d-flex align-items-end">
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
                    Daftar Santri ({filteredData.length} dari {santri.length})
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
                                    src={`${SantriImageStorage}/${santri.pp_santri}`}
                                    alt={santri.name}
                                    className="rounded-circle me-3"
                                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                />
                                <span className="fw-medium">{santri.name}</span>
                                </div>
                            </td>
                            <td>{santri.address}</td>
                            <td>{santri.no_hp}</td>
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
