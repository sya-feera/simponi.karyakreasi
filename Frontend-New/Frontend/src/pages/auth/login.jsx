import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, useDecodeToken } from "../../_services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");
  const decodeData = useDecodeToken(token); // ✅ sudah benar sekarang

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(formData);
      localStorage.setItem("accessToken", response.token);
      localStorage.setItem("userInfo", JSON.stringify(response.user));

      const userWithPassword = {
        ...response.user,
        password: formData.password,
      };
      localStorage.setItem("userProfile", JSON.stringify(userWithPassword));

      navigate(
        response.user.role === "mudaris"
          ? "/dashboard"
          : response.user.role === "santri"
          ? "/publicDashboard"
          : "/"
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && decodeData && decodeData.success && decodeData.data) {
      const role = decodeData.data.role;
      if (role === "mudaris") {
        navigate("/dashboard");
      } else if (role === "santri") {
        navigate("/publicDashboard");
      }
    }
  }, [token, decodeData, navigate]);


  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center position-relative" style={{
        backgroundImage: "url('/images/background-home.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(8px)",
      }}>
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          zIndex: 1,
        }}></div>
      <div className="card shadow-lg p-4" style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "16px",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}>
        <div className="text-center mb-4">
          <div style={{
              width: "100px",
              height: "100px",
              overflow: "hidden",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              marginBottom: "8px",
            }}>
            <img src="https://i.pinimg.com/736x/4e/6f/31/4e6f312a13e94483051503b23c97ed04.jpg" alt="Logo" style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                opacity: "0.6",
              }} />
          </div>
          <h1 className="fw-bold mb-0" style={{ fontSize: "2rem", color: "#0000CD" }}>SIMPONI</h1>
          <p className="text-muted" style={{ fontSize: "0.85rem" }}>DIGITAL BOARDING SCHOOL SOLUTIONS</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="email" name="email" className="form-control" placeholder="Email address" value={formData.email} onChange={handleChange} required style={{ borderRadius: "8px" }} />
          </div>
          {error?.email && <div style={{ color: "red" }}>{error.email[0]}</div>}
          <div className="mb-3">
            <input type="password" name="password" className="form-control" placeholder="Password" value={formData.password} onChange={handleChange} required style={{ borderRadius: "8px" }} />
          </div>
          {error?.password && <div style={{ color: "red" }}>{error.password[0]}</div>}
          {typeof error === "string" && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit" className="btn btn-primary w-100 rounded-pill py-2 fw-bold" disabled={loading} style={{
              background: "linear-gradient(45deg, #1e88e5, #42a5f5)",
              border: "none",
              transition: "background 0.3s ease",
            }} onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(45deg, #1565c0, #2196f3)")} onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(45deg, #1e88e5, #42a5f5)")}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-3 text-center">
          <p className="mb-0" style={{ fontSize: "0.9rem" }}>
            Don't have an account yet?{" "}
            <Link to="/register" className="fw-bold" style={{
                color: "#1e88e5",
                textDecoration: "underline",
                transition: "color 0.3s ease",
              }} onMouseEnter={(e) => (e.currentTarget.style.color = "#1565c0")} onMouseLeave={(e) => (e.currentTarget.style.color = "#1e88e5")}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
