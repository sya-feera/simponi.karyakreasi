import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import { MudarisImageStorage } from '../../_api';
import { getMudaris } from '../../_services/mudaris';

export default function PublicMudaris() {
    const [mudaris, setMudaris] = useState([]);
// const [loading, setLoading] = useState(true);

useEffect(()=>{
        const fetchData = async()=>{
          const [mudarisData] = await Promise.all([
            getMudaris(),
          ])
    
          setMudaris(mudarisData)
    
        }
        fetchData()
    
      }, [])

      console.log(mudaris);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [isHovered, setIsHovered] = useState(false);

const filteredData = mudaris.filter(mudaris => {
    return mudaris.name.toLowerCase().includes(searchTerm.toLowerCase());
});
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
                            <div className="p-3 rounded me-3 text-white" style={{ backgroundColor: '#D4A574' }}>
                                <i className="bi bi-person-badge-fill fs-4" style={{ color: '#F9F9F9' }}></i>
                            </div>
                            <div>
                                <h3 className="mb-1 text-dark fw-bold">Data Mudaris</h3>
                                <p className="text-muted mb-0">Lihat informasi data pengajar (mudaris) pesantren</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="row mb-4 mx-2">
                        <div className="col-md-6 mb-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body d-flex align-items-center">
                                    <div className="p-2 rounded text-white me-3" style={{ backgroundColor: '#D4A574' }}>
                                        <i className="bi bi-people fs-5" style={{ color: '#F9F9F9' }}></i>
                                    </div>
                                    <div>
                                        <small className="text-muted fw-medium">Total Mudaris</small>
                                        <h4 className="mb-0 fw-bold">{mudaris.length}</h4>
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
                                    <label className="form-label fw-medium">Cari Mudaris</label>
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
                                        className="btn btn-reset w-100"
                                        style={{
                                            backgroundColor: isHovered ? '#89AEDC' : '#A7C7E7', color: '#000000', border: 'none', transition: 'background-color 0.3s'
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

                    {/* Header untuk Card Grid */}
                    <div className="mb-4 mx-4">
                        <h5 className="fw-bold">
                            Daftar Mudaris ({filteredData.length} dari {mudaris.length})
                        </h5>
                    </div>

                    {/* Card Grid */}
                    <div className="row mx-2">
                        {currentItems.length > 0 ? (
                            currentItems.map((mudaris) => (
                                <div className="col-md-6 col-lg-4 col-xl-3 mb-4" key={mudaris.id}>
                                    <div className="card border-0 shadow-sm h-100">
                                        <img
                                            src={`${MudarisImageStorage}/${mudaris.pp_mudaris}`}
                                            alt={mudaris.name}
                                            className="card-img-top"
                                            style={{ objectFit: 'cover', height: '200px' }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title fw-bold">{mudaris.name}</h5>
                                            <p className="card-text text-muted mb-2">
                                                <i className="bi bi-telephone-fill me-2"></i>{mudaris.no_hp}
                                            </p>
                                            <p className="card-text mb-2">
                                                <span className="badge rounded-pill" style={{ backgroundColor: '#D4A574', color: '#ffffff' }}>
                                                    {mudaris.address || 'Tidak tersedia'}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5">
                                <i className="bi bi-inbox fs-1 mb-3 text-muted d-block"></i>
                                <h5 className="text-muted">Tidak ada data mudaris ditemukan</h5>
                                <p className="small text-muted">Coba ubah filter pencarian Anda</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4 mb-5">
                            <nav>
                                <ul className="pagination">
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
                    )}
                </div>
            </div>
        </>
    );
}
