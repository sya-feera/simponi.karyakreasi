import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [form, setFrom] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      // console.log(data);
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.token);
        navigate("/dashboards");
      } else {
        alert(data.errors || { general: data.message } || "Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
      setErrors({ general: "Terjadi kesalahan pada server" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFrom({
      ...form,
      [name]: value,
    });
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
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email address"
              // value={email}
              onChange={handleChange}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>
          {errors.name && <div style={{ color: "red" }}>{errors.name[0]}</div>}
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              // value={password}
              onChange={handleChange}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>
          {errors.name && <div style={{ color: "red" }}>{errors.name[0]}</div>}
          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
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
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
          <p className="mb-0" style={{ fontSize: "0.9rem" }}>
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="fw-bold"
              style={{
                color: "#1e88e5",
                textDecoration: "underline",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1565c0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#1e88e5")}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
