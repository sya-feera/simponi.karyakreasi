import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  // const santriList = [
  //   "abdullah",
  //   "adib",
  //   "ahmad",
  //   "ardo",
  //   "khalid",
  //   "umar",
  //   "zainab",
  //   "zhafran",
  // ];
  const [santriList, setSantriList] = useState([]);

  const [selectedSantriId, setSelectedSantri] = useState("");

  const selectedSantri = santriList.find(
    (santri) => santri.name === selectedSantriId
  );
  // console.log(selectedSantri?.name);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/santri")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setSantriList(json.data);
        }
      });
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  //   const Navigate = useNavigate();
  //   const [confirmPassword, setConfirmPassword] = useState("");
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!selectedSantri) {
      alert("Please select a santri name");
      return;
    }

    // if (password !== confirmPassword) {
    //   alert("Password confirmation does not match");
    //   return;
    // }

    // Logika pendaftaran di sini
    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      //   const data = await res.json();

      if (res.ok) {
        alert(
          `Santri ${selectedSantri.name} telah berhasil melakukan Register! Silahkan lanjutkan untuk melakukan Login`
        );
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        console.log("VALIDATION ERRORS:", err.response.data.errors);
      } else {
        console.log("SOMETHING ELSE:", err);
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
              name="name"
              className="form-select"
              value={selectedSantriId}
              onChange={(e) => {
                setSelectedSantri(e.target.value);
                setForm({ ...form, name: e.target.value });
              }}
              required
              style={{ borderRadius: "8px" }}
            >
              <option value="" disabled>
                Nama Santri!
              </option>
              {santriList.map((santri) => (
                <option key={santri.id} value={santri.name}>
                  {santri.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="name@example.com"
              //   value={email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              //   value={password}
              onChange={handleChange}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>

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
            Register
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
