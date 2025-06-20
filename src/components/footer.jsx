import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <style>{`
                .footer-link-animated {
                    position: relative;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    color: #6c757d;
                    font-weight: 500;
                }

                .footer-link-animated::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: -2px;
                    width: 0%;
                    height: 2px; 
                    background: linear-gradient(45deg, #0d6efd, #4169E1);
                    transition: width 0.3s ease;
                    border-radius: 1px;
                }

                .footer-link-animated:hover {
                    color: #0d6efd !important;
                    transform: translateY(-1px);
                }

                .footer-link-animated:hover::after {
                    width: 100%;
                }
                
                .footer-social-icon {
                    width: 44px;
                    height: 44px;
                    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #6c757d;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    border: 1px solid rgba(13, 110, 253, 0.1);
                }
                
                .footer-social-icon:hover {
                    background: linear-gradient(135deg, #0d6efd, #4169E1);
                    color: white;
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(13, 110, 253, 0.25);
                }

                .footer-gradient-bar {
                    height: 4px;
                    background: linear-gradient(90deg, #0d6efd, #4169E1, #6610f2, #4169E1, #0d6efd);
                    background-size: 200% 100%;
                    animation: gradientShift 3s ease-in-out infinite;
                }

                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                .footer-contact-card {
                    background: linear-gradient(135deg, rgba(13, 110, 253, 0.05), rgba(65, 105, 225, 0.05));
                    border: 1px solid rgba(13, 110, 253, 0.1);
                    border-radius: 16px;
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                }

                .footer-contact-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(13, 110, 253, 0.1);
                }

                .footer-logo-container {
                    position: relative;
                    overflow: hidden;
                    border-radius: 16px;
                    box-shadow: 0 4px 15px rgba(13, 110, 253, 0.2);
                    transition: all 0.3s ease;
                }

                .footer-logo-container:hover {
                    transform: scale(1.05);
                    box-shadow: 0 6px 25px rgba(13, 110, 253, 0.3);
                }

                .footer-wave {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(45deg, rgba(13, 110, 253, 0.1), rgba(65, 105, 225, 0.1));
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .footer-contact-card:hover .footer-wave {
                    opacity: 1;
                }
            `}</style>

            <footer className="bg-white border-top-0 mt-0" style={{ position: 'relative' }}>
                {/* Gradient Bar */}
                <div className="footer-gradient-bar"></div>

                <div className="container-fluid px-4">
                    <div className="py-5">
                        <div className="row g-4 align-items-start">
                            {/* Logo dan Branding */}
                            <div className="col-lg-4 col-md-6">
                                <Link to="/" className="text-decoration-none">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="footer-logo-container me-3" style={{ 
                                            width: '80px', 
                                            height: '80px', 
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                            // borderRadius: '12px' // jika ingin rounded
                                        }}>
                                            <img 
                                                src="https://i.pinimg.com/736x/4e/6f/31/4e6f312a13e94483051503b23c97ed04.jpg"
                                                alt="SIMPONI Logo"
                                                style={{
                                                    width: '110px',
                                                    height: '110px',
                                                    objectFit: 'cover' // ini penting biar gambar nggak ketarik
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="fw-bold mb-1" style={{ color: '#0d6efd', fontSize: '1.8rem' }}>
                                                SIMPONI
                                            </h3>
                                            <p className="text-muted mb-0" style={{ fontSize: '0.85rem', fontWeight: '500' }}>
                                                Digital Boarding School Solutions
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                <p className="text-muted mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    Solusi digital terdepan untuk manajemen pesantren modern. 
                                    Menghubungkan tradisi dengan teknologi untuk pendidikan yang lebih baik.
                                </p>
                                
                                {/* Social Media */}
                                <div className="d-flex gap-3">
                                    <a href="#" className="footer-social-icon" title="Facebook">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </a>
                                    <a href="#" className="footer-social-icon" title="Twitter">
                                        <i className="fa-brands fa-twitter"></i>
                                    </a>
                                    <a href="#" className="footer-social-icon" title="Instagram">
                                        <i className="fa-brands fa-instagram"></i>
                                    </a>
                                    <a href="#" className="footer-social-icon" title="LinkedIn">
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </a>
                                    <a href="#" className="footer-social-icon" title="YouTube">
                                        <i className="fa-brands fa-youtube"></i>
                                    </a>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="col-lg-3 col-md-6">
                                <h5 className="fw-bold mb-4" style={{ color: '#4169E1' }}>
                                    <i className="fa-solid fa-link me-2"></i>
                                    Link Cepat
                                </h5>
                                <ul className="nav flex-column">
                                    <li className="nav-item mb-2">
                                        <Link to="/" className="nav-link footer-link-animated px-0 d-flex align-items-center">
                                            <i className="fa-solid fa-home me-2" style={{ width: '16px' }}></i>
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item mb-2">
                                        <Link to="/dashboards" className="nav-link footer-link-animated px-0 d-flex align-items-center">
                                            <i className="fa-solid fa-chart-pie me-2" style={{ width: '16px' }}></i>
                                            Dashboard
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Information */}
                            <div className="col-lg-5 col-md-12">
                                <div className="footer-contact-card position-relative">
                                    <div className="footer-wave"></div>
                                    <h5 className="fw-bold mb-3" style={{ color: '#4169E1' }}>
                                        <i className="fa-solid fa-phone me-2"></i>
                                        Hubungi Kami
                                    </h5>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-start">
                                                <i className="fa-solid fa-envelope text-primary me-3 mt-1"></i>
                                                <div>
                                                    <h6 className="fw-semibold mb-1" style={{ color: '#495057' }}>Email</h6>
                                                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                                                        info@simponi.com
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="d-flex align-items-start">
                                                <i className="fa-solid fa-phone text-primary me-3 mt-1"></i>
                                                <div>
                                                    <h6 className="fw-semibold mb-1" style={{ color: '#495057' }}>Telepon</h6>
                                                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                                                        +62 812-3456-7890
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex align-items-start">
                                                <i className="fa-solid fa-map-marker-alt text-primary me-3 mt-1"></i>
                                                <div>
                                                    <h6 className="fw-semibold mb-1" style={{ color: '#495057' }}>Alamat</h6>
                                                    <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                                                        Jl. Pendidikan No. 123, Jakarta Selatan 12345
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Copyright dengan style yang lebih menarik */}
                        <div className="text-center pt-4 mt-4" style={{ 
                            borderTop: '2px solid transparent',
                            background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, #0d6efd, #4169E1) border-box'
                        }}>
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                                <p className="text-muted mb-2 mb-md-0" style={{ fontSize: '0.9rem' }}>
                                    &copy; 2025 <span className="fw-semibold" style={{ color: '#0d6efd' }}>SIMPONI</span> - Digital Boarding School Solutions. All rights reserved.
                                </p>
                                <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                                    <i className="fa-solid fa-heart text-danger me-1"></i>
                                    Made with care for better education
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}