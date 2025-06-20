import React, { useState } from "react";
import { useNavigate } from "react-router";

const Akun = () => {
  const [userProfile, setUserProfile] = useState({
    name: "Abdullah Rahman",
    email: "abdullah.rahman@pesantren.ac.id",
    profileImage: "https://i.pravatar.cc/300?img=1",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...userProfile });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isEditing) {
          setTempProfile({ ...tempProfile, profileImage: e.target.result });
        } else {
          setUserProfile({ ...userProfile, profileImage: e.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setUserProfile({ ...tempProfile });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setTempProfile({ ...userProfile });
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Password baru tidak sama!");
      return;
    }
    // Simulasi perubahan password
    alert("Password berhasil diubah!");
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("Logout berhasil!");
    navigate("/dashboards"); // Ini hanya redirect ke route login di sisi frontend
  };

  const currentData = isEditing ? tempProfile : userProfile;

  return (
    <div
      className="min-vh-100"
      style={{
        backgroundColor: "rgb(239, 244, 252)",
      }}
    >
      {/* Header */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "rgb(239, 244, 252)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="container d-flex justify-content-end align-items-center">
          <button
            className="btn btn-md"
            onClick={handleLogout}
            style={{
              backgroundColor: "#BCAAA4",
              color: "#5D4037",
              border: "1px solid #BCAAA4",
              borderRadius: "10px",
            }}
          >
            <i className="fas fa-sign-out-alt me-1"></i>Keluar
          </button>
        </div>
      </nav>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Profile Card */}
            <div
              className="card shadow-lg border-0"
              style={{ borderRadius: "25px", backgroundColor: "#f7fff7" }}
            >
              <div
                className="card-header text-center py-4"
                style={{
                  backgroundColor: "#daedda",
                  borderRadius: "25px 25px 0 0",
                  color: "#2E7D32",
                }}
              >
                <h3 className="mb-0 fw-bold">
                  <i className="fas fa-user-circle me-2"></i>
                  Akun Saya
                </h3>
              </div>

              <div className="card-body p-5">
                {/* Profile Image Section */}
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block">
                    <img
                      src={currentData.profileImage}
                      alt="Profile"
                      className="rounded-circle shadow-lg"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        border: "4px solid #BCAAA4",
                      }}
                    />
                    <label
                      htmlFor="profileImageUpload"
                      className="position-absolute bottom-0 end-0 btn rounded-circle d-flex justify-content-center align-items-center shadow"
                      style={{
                        width: "40px",
                        height: "40px",
                        aspectRatio: "1",
                        padding: 0,
                        cursor: "pointer",
                        backgroundColor: "#C8E6C9",
                        color: "#2E7D32",
                        border: "2px solid #A5D6A7",
                      }}
                    >
                      <i className="fas fa-camera"></i>
                    </label>
                    <input
                      id="profileImageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>

                {/* Profile Information */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label
                      className="form-label fw-bold"
                      style={{ color: "#6D4C41" }}
                    >
                      <i className="fas fa-user me-2"></i>Nama Lengkap
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={tempProfile.name}
                        onChange={(e) =>
                          setTempProfile({
                            ...tempProfile,
                            name: e.target.value,
                          })
                        }
                        style={{
                          borderColor: "#90CAF9",
                          borderRadius: "15px",
                          backgroundColor: "#E3F2FD",
                        }}
                      />
                    ) : (
                      <div
                        className="form-control-plaintext p-3 rounded"
                        style={{
                          border: "1px solid #D7CCC8",
                          backgroundColor: "#F5E6D3",
                          borderRadius: "15px",
                        }}
                      >
                        {userProfile.name}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 mb-4">
                    <label
                      className="form-label fw-bold"
                      style={{ color: "#6D4C41" }}
                    >
                      <i className="fas fa-envelope me-2"></i>Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        className="form-control"
                        value={tempProfile.email}
                        onChange={(e) =>
                          setTempProfile({
                            ...tempProfile,
                            email: e.target.value,
                          })
                        }
                        style={{
                          borderColor: "#A5D6A7",
                          borderRadius: "15px",
                          backgroundColor: "#E8F5E8",
                        }}
                      />
                    ) : (
                      <div
                        className="form-control-plaintext p-3 rounded"
                        style={{
                          border: "1px solid #D7CCC8",
                          backgroundColor: "#F5E6D3",
                          borderRadius: "15px",
                        }}
                      >
                        {userProfile.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Section */}
                <div className="mb-4">
                  <label
                    className="form-label fw-bold"
                    style={{ color: "#6D4C41" }}
                  >
                    <i className="fas fa-lock me-2"></i>Password
                  </label>
                  <div className="d-flex align-items-center">
                    <div
                      className="form-control-plaintext p-3 rounded flex-grow-1 me-3"
                      style={{
                        border: "1px solid #D7CCC8",
                        backgroundColor: "#F5E6D3",
                        borderRadius: "15px",
                      }}
                    >
                      ••••••••••••
                    </div>
                    <button
                      className="btn"
                      onClick={() => setShowPasswordModal(true)}
                      style={{
                        backgroundColor: "#BCAAA4",
                        color: "#5D4037",
                        border: "1px solid #BCAAA4",
                        borderRadius: "15px",
                      }}
                    >
                      <i className="fas fa-edit me-1"></i>Ubah
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="text-center pt-3">
                  {isEditing ? (
                    <div>
                      <button
                        className="btn me-3 px-4"
                        onClick={handleSaveProfile}
                        style={{
                          backgroundColor: "#C8E6C9",
                          color: "#2E7D32",
                          border: "1px solid #A5D6A7",
                          borderRadius: "20px",
                        }}
                      >
                        <i className="fas fa-save me-2"></i>Simpan
                      </button>
                      <button
                        className="btn px-4"
                        onClick={handleCancelEdit}
                        style={{
                          backgroundColor: "#F0F0F0",
                          color: "#666666",
                          border: "1px solid #D0D0D0",
                          borderRadius: "20px",
                        }}
                      >
                        <i className="fas fa-times me-2"></i>Batal
                      </button>
                    </div>
                  ) : (
                    <button
                      className="btn px-5"
                      onClick={() => setIsEditing(true)}
                      style={{
                        backgroundColor: "#BCAAA4",
                        color: "#5D4037",
                        border: "1px solid #BCAAA4",
                        borderRadius: "25px",
                      }}
                    >
                      <i className="fas fa-edit me-2"></i>Edit Profil
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="row mt-4">
              <div className="col-md-6 mb-3">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{ borderRadius: "20px", backgroundColor: "#F5E6D3" }}
                >
                  <div className="card-body text-center">
                    <div className="mb-3" style={{ color: "#6D4C41" }}>
                      <i className="fas fa-calendar-alt fa-2x"></i>
                    </div>
                    <h6 className="fw-bold" style={{ color: "#6D4C41" }}>
                      Bergabung Sejak
                    </h6>
                    <p className="text-muted mb-0">Januari 2024</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{ borderRadius: "20px", backgroundColor: "#F5E6D3" }}
                >
                  <div className="card-body text-center">
                    <div className="mb-3" style={{ color: "#6D4C41" }}>
                      <i className="fas fa-shield-alt fa-2x"></i>
                    </div>
                    <h6 className="fw-bold" style={{ color: "#6D4C41" }}>
                      Status Akun
                    </h6>
                    <span
                      className="badge"
                      style={{ backgroundColor: "#C8E6C9", color: "#6D4C41" }}
                    >
                      Aktif
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(109, 76, 65, 0.3)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: "20px" }}>
              <div
                className="modal-header text-white"
                style={{
                  backgroundColor: "#F5E6D3",
                  borderRadius: "20px 20px 0 0",
                  color: "#5D4037",
                }}
              >
                <h5 className="modal-title" style={{ color: "#5D4037" }}>
                  <i className="fas fa-lock me-2"></i>Ubah Password
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPasswordModal(false)}
                  style={{ filter: "invert(0.5)" }}
                ></button>
              </div>
              <div
                className="modal-body"
                style={{ backgroundColor: "#FAFAFA" }}
              >
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#1565C0" }}>
                    Password Saat Ini
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    style={{
                      borderColor: "#90CAF9",
                      borderRadius: "10px",
                      backgroundColor: "#E3F2FD",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#2E7D32" }}>
                    Password Baru
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    style={{
                      borderColor: "#A5D6A7",
                      borderRadius: "10px",
                      backgroundColor: "#E8F5E8",
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ color: "#6D4C41" }}>
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    style={{
                      borderColor: "#D7CCC8",
                      borderRadius: "10px",
                      backgroundColor: "#F5E6D3",
                    }}
                  />
                </div>
              </div>
              <div
                className="modal-footer"
                style={{
                  backgroundColor: "#FAFAFA",
                  borderRadius: "0 0 20px 20px",
                }}
              >
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowPasswordModal(false)}
                  style={{
                    backgroundColor: "#F0F0F0",
                    color: "#666666",
                    border: "1px solid #D0D0D0",
                    borderRadius: "15px",
                  }}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={handlePasswordChange}
                  style={{
                    backgroundColor: "#C8E6C9",
                    color: "#2E7D32",
                    border: "1px solid #A5D6A7",
                    borderRadius: "15px",
                  }}
                >
                  <i className="fas fa-save me-1"></i>Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bootstrap CSS & Font Awesome */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        rel="stylesheet"
      />
    </div>
  );
};

export default Akun;
