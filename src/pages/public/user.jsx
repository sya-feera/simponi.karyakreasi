import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDecodeToken } from "../../_services/auth"; // pastikan ini memang custom hook

export default function User() {
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");
  const { success, data: decodedUser , message } = useDecodeToken(token); // harus di sini!

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // State untuk mengontrol tampilan password

    useEffect(() => {
        if (!token || !success) {
        localStorage.removeItem("accessToken");
        navigate("/login");
        return;
        }

    const stored = localStorage.getItem("userProfile");
    const parsed = stored ? JSON.parse(stored) : null;
    setUserProfile(parsed);
    setLoading(false);
  }, [token, success, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  if (loading || !userProfile) {
    return <div className="text-center mt-5">Memuat data akun...</div>;
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'rgb(239, 244, 252)' }}>
      {/* Header */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgb(239, 244, 252)', backdropFilter: 'blur(10px)' }}>
        <div className="container d-flex justify-content-end align-items-center">
          <button className="btn btn-md" onClick={handleLogout} style={{ backgroundColor: '#BCAAA4', color: '#5D4037', border: '1px solid #BCAAA4', borderRadius: '10px' }}>
            <i className="fas fa-sign-out-alt me-1"></i>Keluar
          </button>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Profile Card */}
            <div className="card shadow-lg border-0" style={{ borderRadius: '25px', backgroundColor: '#f7fff7' }}>
              <div className="card-header text-center py-4" style={{ backgroundColor: '#daedda', borderRadius: '25px 25px 0 0', color: '#2E7D32' }}>
                <h3 className="mb-0 fw-bold">
                  <i className="fas fa-user-circle me-2"></i>
                  Akun Saya
                </h3>
              </div>

              <div className="card-body p-5">

                {/* Profile Information */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold" style={{ color: '#6D4C41' }}>
                      <i className="fas fa-user me-2"></i>Nama Lengkap
                    </label>
                    <div className="form-control-plaintext p-3 rounded" style={{ border: '1px solid #D7CCC8', backgroundColor: '#F5E6D3', borderRadius: '15px' }}>
                      {userProfile.name}
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold" style={{ color: '#6D4C41' }}>
                      <i className="fas fa-envelope me-2"></i>Email
                    </label>
                    <div className="form-control-plaintext p-3 rounded" style={{ border: '1px solid #D7CCC8', backgroundColor: '#F5E6D3', borderRadius: '15px' }}>
                      {userProfile.email}
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                <div className="mb-4">
                  <label className="form-label fw-bold" style={{ color: '#6D4C41' }}>
                    <i className="fas fa-lock me-2"></i>Password
                  </label>
                  <div className="d-flex align-items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control-plaintext p-3 rounded flex-grow-1 me-3"
                      style={{ border: '1px solid #D7CCC8', backgroundColor: '#F5E6D3', borderRadius: '15px' }}
                      value={userProfile.password} // Pastikan password ada di userProfile
                      readOnly
                    />
                    <button
                      className="btn"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ backgroundColor: '#BCAAA4', color: '#5D4037', border: '1px solid #BCAAA4', borderRadius: '15px' }}
                    >
                      {showPassword ? "Sembunyikan" : "Tampilkan"}
                    </button>
                  </div>
                </div>

                {/* Additional Info Cards */}
                <div className="row mt-4">
                  <div className="col-md-6 mb-3">
                    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '20px', backgroundColor: '#F5E6D3' }}>
                      <div className="card-body text-center">
                        <div className="mb-3" style={{ color: '#6D4C41' }}>
                          <i className="fas fa-calendar-alt fa-2x"></i>
                        </div>
                        <h6 className="fw-bold" style={{ color: '#6D4C41' }}>Bergabung Sejak</h6>
                        <p className="text-muted mb-0">Januari 2024</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '20px', backgroundColor: '#F5E6D3' }}>
                      <div className="card-body text-center">
                        <div className="mb-3" style={{ color: '#6D4C41' }}>
                          <i className="fas fa-shield-alt fa-2x"></i>
                        </div>
                        <h6 className="fw-bold" style={{ color: '#6D4C41' }}>Status Akun</h6>
                        <span className="badge" style={{ backgroundColor: '#C8E6C9', color: '#6D4C41' }}>Aktif</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap CSS & Font Awesome */}
      <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
    </div>
  );
};
