import React, { useEffect, useState } from "react";
import { getGrades } from "../../_services/grades";
import Header from "../../components/header";

export default function PublicGrades() {
  const [grades, setGrades] = useState([]);
  const [showGrades, setShowGrades] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userProfile") || "{}");
  const userRole = userInfo?.role || "";
  const santriName = userRole === "mudaris"
  ? "ustadz"
  : (grades.map((grade) => grade.santri?.name || "-").join(", "));
  useEffect(() => {
    const fetchData = async () => {
      const [gradeData] = await Promise.all([getGrades()]);
      setGrades(gradeData);
    };
    fetchData();
  }, []);
  const handleShowGrades = () => {
    setShowGrades(true);
  };
  const calculateAverage = () => {
    const total = grades.reduce((sum, grade) => sum + grade.grade, 0);
    return Math.round(total / grades.length);
  };
  const getGradeStatus = (grade) => {
    if (grade >= 85) return { status: "Sangat Baik", color: "#28a745" };
    if (grade >= 75) return { status: "Baik", color: "#17a2b8" };
    if (grade >= 65) return { status: "Cukup", color: "#ffc107" };
    return { status: "Perlu Perbaikan", color: "#dc3545" };
  };
  const resetView = () => {
    setShowGrades(false);
  };
  return (
    <>
      <Header />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css"
        rel="stylesheet"
      />
      <div
        style={{ backgroundColor: "rgb(239, 244, 252)" }}
        className="min-vh-100 py-4"
      >
        <div className="container-fluid">
          {/* Header */}
          <div className="mb-4 mt-4 mx-4">
            <div className="d-flex align-items-center mb-4">
              <div
                className="p-3 rounded me-3 text-white"
                style={{ backgroundColor: "#A8D5BA" }}
              >
                <i
                  className="bi bi-clipboard-data-fill fs-4"
                  style={{ color: "#2d5a41" }}
                ></i>
              </div>
              <div>
                <h3 className="mb-1 text-dark fw-bold">Penilaian</h3>
                <p className="text-muted mb-0">
                  Lihat nilai mata pelajaran anda
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          {showGrades && (
            <div className="row mb-4 mx-2">
              <div className="col-md-6 mb-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body d-flex align-items-center">
                    <div
                      className="p-2 rounded text-white me-3"
                      style={{ backgroundColor: "#A8D5BA" }}
                    >
                      <i
                        className="bi bi-award fs-5"
                        style={{ color: "#2d5a41" }}
                      ></i>
                    </div>
                    <div>
                      <small className="text-muted fw-medium">
                        Rata-rata Nilai
                      </small>
                      <h4 className="mb-0 fw-bold">{calculateAverage()}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card border-0 shadow-sm">
                  <div className="card-body d-flex align-items-center">
                    <div
                      className="p-2 rounded text-white me-3"
                      style={{ backgroundColor: "#A8D5BA" }}
                    >
                      <i
                        className="bi bi-book fs-5"
                        style={{ color: "#2d5a41" }}
                      ></i>
                    </div>
                    <div>
                      <small className="text-muted fw-medium">
                        Total Mata Pelajaran
                      </small>
                      <h4 className="mb-0 fw-bold">{grades.length}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Action Buttons */}
          <div className="card border-0 shadow-sm mb-5 mx-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-medium">Aksi</label>
                  <div className="d-flex gap-2">
                    <button
                      className="btn fw-medium"
                      style={{
                        backgroundColor: "#A8D5BA",
                        color: "#2d5a41",
                        border: "none",
                      }}
                      onClick={handleShowGrades}
                    >
                      <i className="bi bi-eye me-2"></i>
                      Tampilkan Nilai saya
                    </button>
                    {showGrades && (
                      <button
                        className="btn btn-reset"
                        style={{
                          backgroundColor: isHovered ? "#89AEDC" : "#A7C7E7",
                          color: "#000000",
                          border: "none",
                          transition: "background-color 0.3s",
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={resetView}
                      >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Student Info & Grades Table */}
          {showGrades && (
            <div className="card border-0 shadow-sm mb-5 mx-4">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0 fw-bold">Nilai Mata Pelajaran</h5>
                  <small className="text-muted">
                    Nama Santri: <span className="fw-medium">{santriName}</span>
                  </small>
                </div>
                <div className="text-end">
                  <small className="text-muted">Rata-rata:</small>
                  <h6 className="mb-0 fw-bold" style={{ color: "#2d5a41" }}>
                    {calculateAverage()}
                  </h6>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="fw-semibold">No.</th>
                        <th className="fw-semibold">Mata Pelajaran</th>
                        <th className="fw-semibold">Nilai</th>
                        <th className="fw-semibold">Status</th>
                        <th className="fw-semibold">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((grade, index) => {
                        const gradeInfo = getGradeStatus(grade.grade);
                        return (
                          <tr key={grade.id}>
                            <td className="fw-medium">{index + 1}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className="p-2 rounded me-3"
                                  style={{ backgroundColor: "#E8F5E8" }}
                                >
                                  <i
                                    className="bi bi-book-half fs-6"
                                    style={{ color: "#2d5a41" }}
                                  ></i>
                                </div>
                                <span className="fw-medium">
                                  {grade.subject?.name || "-"}
                                </span>
                              </div>
                            </td>
                            <td>
                              <span
                                className="badge fs-6 px-3 py-2"
                                style={{
                                  backgroundColor: "#A8D5BA",
                                  color: "#2d5a41",
                                }}
                              >
                                {grade.grade}
                              </span>
                            </td>
                            <td>
                              <span
                                className="badge fs-6 px-2 py-1"
                                style={{
                                  backgroundColor: gradeInfo.color + "20",
                                  color: gradeInfo.color,
                                  border: `1px solid ${gradeInfo.color}40`,
                                }}
                              >
                                {gradeInfo.status}
                              </span>
                            </td>
                            <td>
                              <div
                                className="progress"
                                style={{ height: "8px" }}
                              >
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  style={{
                                    width: `${grade.grade}%`,
                                    backgroundColor: "#A8D5BA",
                                  }}
                                  aria-valuenow={grade.grade}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <small className="text-muted">
                                {grade.grade}%
                              </small>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Summary Footer */}
              <div className="card-footer bg-light">
                <div className="row text-center">
                  <div className="col-md-3">
                    <small className="text-muted">Nilai Tertinggi</small>
                    <div className="fw-bold" style={{ color: "#2d5a41" }}>
                      {Math.max(...grades.map((g) => g.grade))}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <small className="text-muted">Nilai Terendah</small>
                    <div className="fw-bold" style={{ color: "#2d5a41" }}>
                      {Math.min(...grades.map((g) => g.grade))}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <small className="text-muted">Total Nilai</small>
                    <div className="fw-bold" style={{ color: "#2d5a41" }}>
                      {grades.reduce((sum, g) => sum + g.grade, 0)}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <small className="text-muted">Rata-rata</small>
                    <div className="fw-bold" style={{ color: "#2d5a41" }}>
                      {calculateAverage()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Welcome Card (when grades not shown) */}
          {!showGrades && (
            <div className="card border-0 shadow-sm mb-5 mx-4">
              <div className="card-body text-center py-5">
                <div className="mb-4">
                  <i
                    className="bi bi-clipboard-data display-1"
                    style={{ color: "#A8D5BA" }}
                  ></i>
                </div>
                <h4 className="fw-bold mb-3" style={{ color: "#2d5a41" }}>
                  Selamat Datang, {santriName}!
                </h4>
                <p className="text-muted mb-4">
                  Klik tombol "Tampilkan Nilai saya" untuk melihat hasil
                  penilaian mata pelajaran Anda.
                </p>
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div
                      className="alert alert-info border-0"
                      style={{ backgroundColor: "#E8F5E8", color: "#2d5a41" }}
                    >
                      <i className="bi bi-info-circle me-2"></i>
                      <strong>Info:</strong> Nilai akan ditampilkan dalam bentuk
                      tabel dengan detail status dan progress untuk setiap mata
                      pelajaran.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
