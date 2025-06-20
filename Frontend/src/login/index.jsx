import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim()) {
      setError('Please enter your username.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    alert(`Login submitted!\nUsername: ${username}`);
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(135deg, #667eea, #764ba2);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
        }

        .login-container {
          background: white;
          color: #333;
          width: 360px;
          padding: 2.5rem 3rem;
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(0,0,0,0.2);
          animation: fadeInUp 0.6s ease forwards;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-container h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          font-weight: 600;
          font-size: 1.75rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        input[type="text"],
        input[type="password"] {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1.8px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        input[type="text"]:focus,
        input[type="password"]:focus {
          border-color: #667eea;
          outline: none;
          box-shadow: 0 0 8px #667eea66;
        }

        .btn-login {
          width: 100%;
          padding: 0.85rem 1rem;
          background: #667eea;
          border: none;
          color: white;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-top: 1rem;
        }

        .btn-login:hover {
          background: #5563c1;
        }

        .error-message {
          color: #e74c3c;
          font-size: 0.9rem;
          margin-top: 0.5rem;
          text-align: center;
        }

        .footer-text {
          margin-top: 1.5rem;
          font-size: 0.85rem;
          text-align: center;
          color: #666;
        }

        .footer-text a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .footer-text a:hover {
          color: #5563c1;
        }
      `}</style>

      <div className="login-container">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-login">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
