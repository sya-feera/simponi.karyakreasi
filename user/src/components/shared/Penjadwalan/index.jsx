import React, { useEffect, useState } from "react";
import {
  getSubject,
  showSubject,
} from "../../../../../Frontend-New/Frontend/src/_services/subject";

const dummySubjects = [
  {
    id: 1,
    name: "Tafsir",
    day: "Senin",
    year: 2025,
    classroom: "Tafsir",
    mudaris: "Ust. Ahmad",
    kelas: "1A",
    time: "07:00 - 08:30",
  },
  {
    id: 2,
    name: "Fiqih",
    day: "Selasa",
    year: 2025,
    classroom: "Fiqih",
    mudaris: "Ust. Budi",
    kelas: "1A",
    time: "08:30 - 10:00",
  },
  {
    id: 3,
    name: "Nahwu",
    day: "Rabu",
    year: 2025,
    classroom: "Nahwu",
    mudaris: "Ust. Cholid",
    kelas: "2B",
    time: "10:00 - 11:30",
  },
  {
    id: 4,
    name: "Sharaf",
    day: "Kamis",
    year: 2025,
    classroom: "Sharaf",
    mudaris: "Ust. Dani",
    kelas: "3C",
    time: "07:00 - 08:30",
  },
  {
    id: 5,
    name: "Balaghah",
    day: "Jumat",
    year: 2025,
    classroom: "Balaghah",
    mudaris: "Ust. Elfan",
    kelas: "2A",
    time: "08:30 - 10:00",
  },
  {
    id: 6,
    name: "Aqidah",
    day: "Sabtu",
    year: 2025,
    classroom: "Aqidah",
    mudaris: "Ust. Fikri",
    kelas: "3B",
    time: "10:00 - 11:30",
  },
  {
    id: 7,
    name: "Aqidah",
    day: "Senin",
    year: 2025,
    classroom: "Aqidah",
    mudaris: "Ust. Fikri",
    kelas: "1A",
    time: "13:00 - 14:30",
  },
];

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default function Penjadwalan() {
  const [selectedDay, setSelectedDay] = useState("Senin");
  const [filterKelas, setFilterKelas] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubject(); // hasilnya = data.data
        setSubjects(data);
        // console.log(data);
      } catch (error) {
        console.error("Gagal ambil data subject:", error);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    const jadwal = subjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
      day: subject.day,
      year: subject.year,
      classroom: subject.classroom.location,
      mudaris: subject.mudaris.name,
      kelas: subject.kelas,
      time: subject.time,
    }));
    // console.log(jadwal);
  }, [subjects]);

  const PanjangJadwal = subjects.length;
  //   console.log(PanjangJadwal);

  const uniqueClassroom = [
    ...new Set(subjects.map((subject) => subject.classroom.name)),
  ];
  //   console.log(uniqueClassroom);

  const kelasOptions = [
    ...new Set(subjects.map((subject) => subject.classroom?.name)),
  ];
  //   console.log(kelasOptions);

  const filteredSubjects = subjects.filter(
    (s) =>
      s.day === selectedDay &&
      (filterKelas === "" || s.classroom?.name === filterKelas) &&
      s.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <>
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
                  className="bi bi-calendar-week fs-4"
                  style={{ color: "#666" }}
                ></i>
              </div>
              <div>
                <h3 className="mb-1 text-dark fw-bold">Penjadwalan</h3>
                <p className="text-muted mb-0">
                  Lihat informasi jadwal pelajaran pesantren
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="row mb-4 mx-2">
            <div className="col-md-6 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body d-flex align-items-center">
                  <div
                    className="p-2 rounded text-white me-3"
                    style={{ backgroundColor: "#A8D5BA" }}
                  >
                    <i
                      className="bi bi-calendar-check fs-5"
                      style={{ color: "#666" }}
                    ></i>
                  </div>
                  <div>
                    <small className="text-muted fw-medium">Total Jadwal</small>
                    <h4 className="mb-0 fw-bold">{PanjangJadwal}</h4>
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
                      className="bi bi-house-door fs-5"
                      style={{ color: "#666" }}
                    ></i>
                  </div>
                  <div>
                    <small className="text-muted fw-medium">Kelas Aktif</small>
                    <h4 className="mb-0 fw-bold">{uniqueClassroom.length}</h4>
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
                  <label className="form-label fw-medium">
                    Cari Mata Pelajaran
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cari berdasarkan mapel..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <label className="form-label fw-medium">Kelas</label>
                  <select
                    className="form-select"
                    value={filterKelas}
                    onChange={(e) => setFilterKelas(e.target.value)}
                  >
                    <option value="">Semua Kelas</option>
                    {kelasOptions.map((kelas, index) => (
                      <option key={index} value={kelas}>
                        {kelas}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4 mb-3 d-flex align-items-end">
                  <button
                    className="btn w-100"
                    style={{
                      backgroundColor: isHovered ? "#89AEDC" : "#A7C7E7",
                      color: "#000000",
                      border: "none",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => {
                      setFilterKelas("");
                      setSearchKeyword("");
                      setSelectedDay("Senin");
                    }}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Hari */}
          <div className="card border-0 shadow-sm mb-4 mx-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Pilih Hari</h6>
              <div className="row">
                {days.map((day) => (
                  <div className="col-md-2 col-4 mb-2" key={day}>
                    <button
                      className={`btn w-100 ${
                        selectedDay === day
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setSelectedDay(day)}
                      style={{
                        backgroundColor:
                          selectedDay === day ? "#A8D5BA" : "transparent",
                        borderColor: "#A8D5BA",
                        color: selectedDay === day ? "#000" : "#A8D5BA",
                      }}
                    >
                      {day}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabel Jadwal */}
          <div className="card border-0 shadow-sm mb-5 mx-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">
                {selectedDay} ({filteredSubjects.length} mata pelajaran)
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="fw-semibold">No.</th>
                      <th className="fw-semibold">Mata Pelajaran</th>
                      <th className="fw-semibold">Jam</th>
                      <th className="fw-semibold">Kelas</th>
                      <th className="fw-semibold">Ruang</th>
                      <th className="fw-semibold">Mudaris</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubjects.length > 0 ? (
                      filteredSubjects.map((subject, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div
                                className="p-2 rounded me-3"
                                style={{
                                  backgroundColor: "#A8D5BA",
                                  opacity: 0.3,
                                }}
                              >
                                <i
                                  className="bi bi-book fs-6"
                                  style={{ color: "#666" }}
                                ></i>
                              </div>
                              <span>{subject.name}</span>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-light text-dark border">
                              <i className="bi bi-clock me-1"></i>
                              {subject.time}
                            </span>
                          </td>
                          <td>
                            <span
                              className="badge"
                              style={{
                                backgroundColor: "#A8D5BA",
                                color: "#000",
                              }}
                            >
                              {subject.classroom?.name}
                            </span>
                          </td>
                          <td>
                            <i className="bi bi-geo-alt me-1 text-muted"></i>
                            {subject.classroom?.location}
                          </td>
                          <td>
                            <i className="bi bi-person me-1 text-muted"></i>
                            {subject.mudaris?.name}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-5">
                          <div className="text-muted">
                            <i className="bi bi-calendar-x fs-1 mb-3 d-block"></i>
                            <h5 className="text-muted">
                              Tidak ada jadwal untuk hari {selectedDay}
                            </h5>
                            <p className="small">
                              Coba pilih hari lain atau ubah filter
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
