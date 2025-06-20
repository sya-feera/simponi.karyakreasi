import { useState, useEffect } from 'react';
import Header from '../../components/header';
import { getDorms } from '../../_services/dorms';

export default function PublicDorms() {
    const [kamarData, setKamarData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCapacity, setFilterCapacity] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [isHovered, setIsHovered] = useState(false);

    // Fetch data from API when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getDorms();
                setKamarData(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching dorms data:', err);
                setError('Gagal memuat data kamar. Silakan coba lagi.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = kamarData.filter(kamar => {
        const matchesSearch = kamar.name.toLowerCase().includes(searchTerm.toLowerCase()) || (kamar.mudaris && kamar.mudaris.name.toLowerCase().includes(searchTerm.toLowerCase()));
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

    // Show loading spinner
    if (loading) {
        return (
            <>
                <Header />
                <div style={{ backgroundColor: 'rgb(239, 244, 252)' }} className="min-vh-100 py-4">
                    <div className="container-fluid">
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                            <div className="text-center">
                                <div className="spinner-border text-primary mb-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="text-muted">Memuat data kamar...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Show error message
    if (error) {
        return (
            <>
                <Header />
                <div style={{ backgroundColor: 'rgb(239, 244, 252)' }} className="min-vh-100 py-4">
                    <div className="container-fluid">
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                            <div className="text-center">
                                <div className="alert alert-danger" role="alert">
                                    <i className="bi bi-exclamation-triangle fs-4 mb-2 d-block"></i>
                                    <h5>Terjadi Kesalahan</h5>
                                    <p className="mb-3">{error}</p>
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => window.location.reload()}
                                    >
                                        <i className="bi bi-arrow-clockwise me-2"></i>
                                        Muat Ulang
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

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
                                            {kamarData.length > 0 ? Math.round(totalCapacity / kamarData.length) : 0}
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
                                                                <span className="fw-medium">{kamar.name}</span>
                                                            </div>
                                                        </td>
                                                        <td>{kamar.mudaris ? kamar.mudaris.name : 'Belum ditentukan'}</td>
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