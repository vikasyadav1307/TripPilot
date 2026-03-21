import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ onClose, mode = 'login', onAuthSuccess }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(() => {
    if (mode === 'signup') {
      return true;
    }

    if (mode === 'login') {
      return false;
    }

    try {
      const users = localStorage.getItem('users');
      if (!users) {
        return true;
      }
      const parsedUsers = JSON.parse(users);
      return !Array.isArray(parsedUsers) || parsedUsers.length === 0;
    } catch {
      return true;
    }
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(() => {
    try {
      const users = localStorage.getItem('users');
      if (!users) {
        return 'No account found. Please sign up first.';
      }
      const parsedUsers = JSON.parse(users);
      return Array.isArray(parsedUsers) && parsedUsers.length > 0
        ? ''
        : 'No account found. Please sign up first.';
    } catch {
      return 'No account found. Please sign up first.';
    }
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getStoredUsers = () => {
    try {
      const users = localStorage.getItem('users');
      if (!users) {
        return [];
      }

      const parsedUsers = JSON.parse(users);
      return Array.isArray(parsedUsers) ? parsedUsers : [];
    } catch {
      return [];
    }
  };

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '' });
    setShowPassword(false);
  };

  const switchMode = (signUpMode) => {
    setIsSignUpMode(signUpMode);
    clearMessages();
    resetForm();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => emailRegex.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUpMode) {
      handleRegister();
      return;
    }

    handleLogin();
  };

  const handleRegister = () => {
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();
    const password = formData.password;

    clearMessages();

    if (!trimmedName) {
      setErrorMessage('Name is required.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address (example: user@example.com).');
      return;
    }

    if (!password) {
      setErrorMessage('Password should not be empty.');
      return;
    }

    try {
      const users = getStoredUsers();
      const alreadyRegistered = users.some((user) => user.email === trimmedEmail);

      if (alreadyRegistered) {
        setErrorMessage('This email is already registered. Please log in.');
        return;
      }

      const newUser = {
        name: trimmedName,
        email: trimmedEmail,
        password,
      };

      localStorage.setItem('users', JSON.stringify([...users, newUser]));
      setIsSignUpMode(false);
      resetForm();
      setErrorMessage('');
      setSuccessMessage('Registration successful. Please log in.');
    } catch {
      setErrorMessage('Unable to save your account. Please try again.');
    }
  };

  const handleLogin = () => {
    const trimmedEmail = formData.email.trim().toLowerCase();
    const password = formData.password;

    clearMessages();

    if (!validateEmail(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address (example: user@example.com).');
      return;
    }

    if (!password) {
      setErrorMessage('Password should not be empty.');
      return;
    }

    try {
      const users = getStoredUsers();

      if (users.length === 0) {
        setErrorMessage('No registered users found. Redirecting to Sign Up.');
        setIsSignUpMode(true);
        return;
      }

      const user = users.find((storedUser) => storedUser.email === trimmedEmail);

      if (!user) {
        setErrorMessage('User not found. Please sign up first.');
        setIsSignUpMode(true);
        return;
      }

      if (user.password !== password) {
        setErrorMessage('Incorrect password. Please try again.');
        return;
      }

      const loggedInUser = { name: user.name, email: user.email };
      sessionStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      if (onAuthSuccess) {
        onAuthSuccess(loggedInUser);
      }
      navigate('/dashboard');
      onClose();
    } catch {
      setErrorMessage('Unable to log in. Please try again.');
    }
  };

  return (
    <>
      <style>{`
        .tp-login-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background:
            radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.9) 0, transparent 55%),
            radial-gradient(circle at 80% 75%, rgba(255, 255, 255, 0.8) 0, transparent 55%),
            linear-gradient(135deg, #c7f9f5, #a5c7f7);
          backdrop-filter: blur(18px);
          z-index: 9999;
        }

        .tp-login-bg-icon {
          position: absolute;
          font-size: 64px;
          opacity: 0.12;
          filter: blur(1px);
          pointer-events: none;
        }

        .tp-login-bg-icon--plane {
          top: 8%;
          left: 10%;
        }

        .tp-login-bg-icon--palm {
          bottom: 12%;
          left: 16%;
          font-size: 52px;
        }

        .tp-login-bg-icon--pin {
          bottom: 14%;
          right: 18%;
          font-size: 52px;
        }

        .tp-login-bg-icon--globe {
          top: 16%;
          right: 12%;
        }

        .tp-login-modal {
          position: relative;
          width: 100%;
          max-width: 460px;
          border-radius: 25px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(18px) saturate(140%);
          transform-origin: center;
          animation: tp-login-fade-scale 0.3s ease-out;
        }

        .tp-login-close {
          position: absolute;
          top: 12px;
          right: 14px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          background: rgba(15, 23, 42, 0.25);
          color: #ecfeff;
          width: 30px;
          height: 30px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
          box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.5);
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          z-index: 3;
        }

        .tp-login-close:hover {
          background: rgba(15, 23, 42, 0.7);
          box-shadow: 0 0 0 1px rgba(45, 212, 191, 0.7), 0 10px 30px rgba(15, 23, 42, 0.65);
          transform: translateY(-1px);
        }

        .tp-login-header {
          position: relative;
          padding: 28px 28px 40px;
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          color: #ecfeff;
          overflow: hidden;
        }

        .tp-login-header::after {
          content: '';
          position: absolute;
          left: -10%;
          right: -10%;
          bottom: -42px;
          height: 90px;
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          border-radius: 50%;
          opacity: 0.95;
        }

        .tp-login-brand {
          position: relative;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .tp-login-welcome {
          position: relative;
          margin-top: 4px;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.9;
        }

        .tp-login-header-plane {
          position: absolute;
          right: 28px;
          top: 22px;
          font-size: 32px;
          opacity: 0.2;
          transform: rotate(-10deg);
        }

        .tp-login-body {
          padding: 22px 26px 24px;
          background: transparent;
        }

        .tp-login-subtitle {
          font-size: 13px;
          color: rgba(15, 23, 42, 0.78);
          margin-bottom: 18px;
        }

        .tp-login-message {
          margin-bottom: 12px;
          border-radius: 10px;
          padding: 8px 10px;
          font-size: 12px;
          line-height: 1.4;
        }

        .tp-login-message--error {
          background: rgba(220, 38, 38, 0.1);
          border: 1px solid rgba(220, 38, 38, 0.35);
          color: #991b1b;
        }

        .tp-login-message--success {
          background: rgba(13, 148, 136, 0.12);
          border: 1px solid rgba(13, 148, 136, 0.35);
          color: #115e59;
        }

        .tp-login-field-group {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 18px;
        }

        .tp-login-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .tp-login-label {
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
        }

        .tp-login-forgot {
          font-size: 12px;
          color: #0f766e;
          cursor: pointer;
          text-decoration: none;
          background: transparent;
          border: none;
          padding: 0;
        }

        .tp-login-forgot:hover {
          text-decoration: underline;
        }

        .tp-login-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.55);
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.12);
        }

        .tp-login-input-icon {
          padding-left: 12px;
          padding-right: 6px;
          font-size: 16px;
          color: #0f766e;
          opacity: 0.9;
        }

        .tp-login-input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 10px 12px 10px 6px;
          font-size: 14px;
          color: #0f172a;
          outline: none;
        }

        .tp-login-input::placeholder {
          color: #94a3b8;
        }

        .tp-login-eye {
          border: none;
          background: transparent;
          padding: 0 10px 0 4px;
          cursor: pointer;
          color: #64748b;
          font-size: 16px;
        }

        .tp-login-actions-main {
          margin-top: 4px;
          margin-bottom: 16px;
        }

        .tp-login-actions-row {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .tp-login-btn {
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.01em;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 16px;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .tp-login-btn-primary {
          flex: 1;
          background: linear-gradient(135deg, #0f766e, #14b8a6);
          color: #ecfeff;
          box-shadow: 0 14px 36px rgba(15, 118, 110, 0.5);
        }

        .tp-login-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 44px rgba(15, 118, 110, 0.6);
        }

        .tp-login-btn-admin {
          background: #facc15;
          color: #78350f;
          padding-inline: 18px;
          box-shadow: 0 10px 26px rgba(202, 138, 4, 0.45);
        }

        .tp-login-btn-admin:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 32px rgba(202, 138, 4, 0.6);
        }

        .tp-login-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 11px;
          color: #64748b;
        }

        .tp-login-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, rgba(148, 163, 184, 0.2), rgba(148, 163, 184, 0.6), rgba(148, 163, 184, 0.2));
        }

        .tp-login-divider-text {
          white-space: nowrap;
        }

        .tp-login-btn-google {
          width: 100%;
          margin-top: 4px;
          background: #ffffff;
          color: #0f172a;
          border-radius: 999px;
          box-shadow: 0 14px 32px rgba(15, 23, 42, 0.18);
        }

        .tp-login-btn-google:hover {
          background: #f9fafb;
          transform: translateY(-1px);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.24);
        }

        .tp-login-google-icon {
          width: 18px;
          height: 18px;
          border-radius: 4px;
          background: conic-gradient(from 180deg at 50% 50%, #ea4335 0deg, #fbbc05 90deg, #34a853 180deg, #4285f4 270deg, #ea4335 360deg);
        }

        .tp-login-footer-row {
          margin-top: 16px;
          display: flex;
          justify-content: center;
          gap: 4px;
          font-size: 12px;
          color: #64748b;
        }

        .tp-login-signup {
          border: none;
          padding: 0;
          background: none;
          color: #0f766e;
          font-weight: 600;
          cursor: pointer;
        }

        .tp-login-signup:hover {
          text-decoration: underline;
        }

        @keyframes tp-login-fade-scale {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(16px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 480px) {
          .tp-login-modal {
            max-width: 100%;
          }

          .tp-login-body {
            padding: 18px 18px 20px;
          }
        }
      `}</style>

      <div className="tp-login-overlay">
        <div className="tp-login-bg-icon tp-login-bg-icon--plane">✈️</div>
        <div className="tp-login-bg-icon tp-login-bg-icon--palm">🌴</div>
        <div className="tp-login-bg-icon tp-login-bg-icon--pin">📍</div>
        <div className="tp-login-bg-icon tp-login-bg-icon--globe">🌍</div>

        <div className="tp-login-modal">
          <button
            className="tp-login-close"
            onClick={onClose}
            aria-label="Close login"
          >
            ×
          </button>

          <div className="tp-login-header">
            <div className="tp-login-header-plane">✈️</div>
            <div className="tp-login-brand">TripPilot</div>
            <div className="tp-login-welcome">{isSignUpMode ? 'Create Account' : 'Welcome Back'}</div>
          </div>

          <div className="tp-login-body">
            <div className="tp-login-subtitle">
              {isSignUpMode
                ? 'Join TripPilot and start planning your travel adventures.'
                : 'Sync and explore your journeys across devices with a single login.'}
            </div>

            {errorMessage ? (
              <div className="tp-login-message tp-login-message--error">{errorMessage}</div>
            ) : null}
            {successMessage ? (
              <div className="tp-login-message tp-login-message--success">{successMessage}</div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="tp-login-field-group">
                {isSignUpMode ? (
                  <div>
                    <div className="tp-login-label-row">
                      <div className="tp-login-label">Full Name</div>
                    </div>
                    <div className="tp-login-input-wrap">
                      <span className="tp-login-input-icon">👤</span>
                      <input
                        type="text"
                        name="name"
                        className="tp-login-input"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required={isSignUpMode}
                      />
                    </div>
                  </div>
                ) : null}

                <div>
                  <div className="tp-login-label-row">
                    <div className="tp-login-label">Email Address</div>
                  </div>
                  <div className="tp-login-input-wrap">
                    <span className="tp-login-input-icon">✉️</span>
                    <input
                      type="email"
                      name="email"
                      className="tp-login-input"
                      placeholder="users@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="tp-login-label-row">
                    <div className="tp-login-label">Password</div>
                    {!isSignUpMode ? (
                      <button
                        type="button"
                        className="tp-login-forgot"
                      >
                        Forgot Password?
                      </button>
                    ) : null}
                  </div>
                  <div className="tp-login-input-wrap">
                    <span className="tp-login-input-icon">🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className="tp-login-input"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className="tp-login-eye"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="tp-login-actions-main">
                <div className="tp-login-actions-row">
                  <button
                    type="submit"
                    className="tp-login-btn tp-login-btn-primary"
                  >
                    {isSignUpMode ? 'Sign Up' : 'Login'}
                    <span style={{ fontSize: '16px' }}>→</span>
                  </button>
                </div>
              </div>

              <div className="tp-login-footer-row">
                <span>{isSignUpMode ? 'Already have an account?' : "Don't have an account?"}</span>
                <button
                  type="button"
                  className="tp-login-signup"
                  onClick={() => switchMode(!isSignUpMode)}
                >
                  {isSignUpMode ? 'Login' : 'Sign Up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
