import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../_services/auth";
import { getSantriList } from "../../_services/santri";

export default function Register() {
  const navigate = useNavigate();
  const [santri, setSantri] = useState([]);
  const [form, setForm] = useState({
    santri_id: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSantri = async () => {
      try {
        const santriData = await getSantriList();
        setSantri(santriData);
      } catch (err) {
        console.error("Gagal mengambil data santri:", err);
      }
    };

    fetchSantri();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!form.santri_id) {
      alert("Pilih nama santri terlebih dahulu.");
      setLoading(false);
      return;
    }

    try {
      console.log("Form Data:", form); // cek apa yang dikirim
      const response = await register(form);
      console.log("Register response:", response);
      navigate("/login");
    } catch (err) {
      console.log("Register error raw:", err);

      if (err.response) {
        console.log("Error response data:", err.response.data);
        const messages = err.response.data.message || err.response.data.errors;
        setError(JSON.stringify(messages));
      } else {
        setError("Terjadi kesalahan jaringan atau server tidak merespons.");
      }
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center position-relative"
      style={{
        backgroundImage: "url('/images/background-home.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          zIndex: 1,
        }}
      ></div>

      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "16px",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <div className="text-center mb-4">
          <div
            style={{
              width: "100px",
              height: "100px",
              overflow: "hidden",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              marginBottom: "8px",
            }}
          >
            <img
              src="https://i.pinimg.com/736x/4e/6f/31/4e6f312a13e94483051503b23c97ed04.jpg"
              alt="Logo"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                opacity: "0.6",
              }}
            />
          </div>
          <h1
            className="fw-bold mb-0"
            style={{ fontSize: "2rem", color: "#0000CD" }}
          >
            SIMPONI
          </h1>
          <p className="text-muted" style={{ fontSize: "0.85rem" }}>
            DIGITAL BOARDING SCHOOL SOLUTIONS
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <select
              id="santri_id"
              name="santri_id"
              className="form-select"
              value={form.santri_id}
              onChange={handleChange}
              required
              disabled={santri.length === 0} // Disable dropdown jika kosong
              style={{ borderRadius: "8px" }}
            >
              {santri.length === 0 ? (
                <option value="">Semua santri sudah registrasi</option>
              ) : (
                <>
                  <option value="">Pilih Nama Santri</option>
                  {santri.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>

          <div className="mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>

          {error && <div style={{ color: "red" }}>{error}</div>}

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
            disabled={loading}
            style={{
              background: "linear-gradient(45deg, #1e88e5, #42a5f5)",
              border: "none",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(45deg, #1565c0, #2196f3)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(45deg, #1e88e5, #42a5f5)")
            }
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-3 text-center">
          <p className="mb-0" style={{ fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="fw-bold"
              style={{
                color: "#1e88e5",
                textDecoration: "underline",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1565c0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1e88e5")}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
