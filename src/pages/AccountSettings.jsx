import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const travelChips = ['Adventure', 'Food', 'Relaxation', 'Culture', 'Nightlife'];
const languageOptions = ['English', 'Hindi', 'Spanish', 'French'];
const currencyOptions = [
  { value: 'INR', label: 'Indian Rupee (₹)' },
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
];

const getCurrentUser = () => {
  try {
    const raw = sessionStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const getStoredSettings = () => {
  try {
    const data = localStorage.getItem('tp-account-settings');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const buildDefaultSettings = (user) => ({
  profile: {
    name: user?.name || 'Vikas Yadav',
    email: user?.email || 'vikas@trippilot.com',
    bio: 'Frequent traveller crafting memorable itineraries with TripPilot.',
    photo: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=60',
  },
  preferences: {
    darkMode: false,
    language: 'English',
    currency: 'INR',
    travelPreferences: ['Adventure', 'Food'],
    budgetLevel: 'mid',
  },
  notifications: {
    email: true,
    tripAlerts: true,
    offers: false,
  },
  security: {
    twoFactor: true,
  },
});

const AccountSettings = () => {
  const navigate = useNavigate();
  const currentUser = useMemo(() => getCurrentUser(), []);
  const [settings, setSettings] = useState(() => {
    const stored = getStoredSettings();
    return stored || buildDefaultSettings(currentUser);
  });
  const [securityForm, setSecurityForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [toast, setToast] = useState(null);
  const [sectionSaving, setSectionSaving] = useState({
    profile: false,
    security: false,
    preferences: false,
    notifications: false,
    travel: false,
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!currentUser?.email) {
      return;
    }
    setSettings((prev) => {
      if (prev.profile.email === currentUser.email) {
        return prev;
      }
      return {
        ...prev,
        profile: {
          ...prev.profile,
          email: currentUser.email,
        },
      };
    });
  }, [currentUser?.email]);

  const handleProfileChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const handlePreferenceChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
  };

  const handleNotificationToggle = (field) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field],
      },
    }));
  };

  const handleSecurityToggle = (field) => {
    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: !prev.security[field],
      },
    }));
  };

  const handleChipToggle = (chip) => {
    setSettings((prev) => {
      const exists = prev.preferences.travelPreferences.includes(chip);
      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          travelPreferences: exists
            ? prev.preferences.travelPreferences.filter((item) => item !== chip)
            : [...prev.preferences.travelPreferences, chip],
        },
      };
    });
  };

  const handleBudgetSelect = (level) => {
    handlePreferenceChange('budgetLevel', level);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSecurityForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    handleProfileChange('photo', localUrl);
  };

  const persistSection = (sectionName, sectionKey, sectionValue, successMessage) => {
    if (sectionSaving[sectionName]) return;
    setSectionSaving((prev) => ({ ...prev, [sectionName]: true }));
    setTimeout(() => {
      try {
        const stored = getStoredSettings() || buildDefaultSettings(currentUser);
        const nextSettings = {
          ...stored,
          [sectionKey]: sectionValue,
        };
        localStorage.setItem('tp-account-settings', JSON.stringify(nextSettings));
        setToast({ type: 'success', message: successMessage });
      } catch {
        setToast({ type: 'error', message: 'Unable to save settings locally.' });
      } finally {
        setSectionSaving((prev) => ({ ...prev, [sectionName]: false }));
      }
    }, 320);
  };

  const handleProfileSave = () => {
    persistSection('profile', 'profile', settings.profile, 'Profile updated successfully.');
  };

  const handlePreferencesSave = () => {
    persistSection('preferences', 'preferences', settings.preferences, 'Preferences saved successfully.');
  };

  const handleNotificationsSave = () => {
    persistSection('notifications', 'notifications', settings.notifications, 'Notification settings saved.');
  };

  const handleSecuritySave = async () => {
    if (sectionSaving.security) return;

    const { currentPassword, newPassword, confirmPassword } = securityForm;
    if (!currentPassword || !newPassword || !confirmPassword) {
      setToast({ type: 'error', message: 'Please fill in all password fields.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setToast({ type: 'error', message: 'New password and confirmation must match.' });
      return;
    }

    if (newPassword.length < 6) {
      setToast({ type: 'error', message: 'New password must be at least 6 characters long.' });
      return;
    }

    const payload = {
      email: (currentUser?.email || settings.profile.email || '').toLowerCase(),
      currentPassword,
      newPassword,
    };

    console.log({
      email: payload.email,
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
    });

    setSectionSaving((prev) => ({ ...prev, security: true }));
    try {
      const response = await fetch('/api/auth/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.log('update-password error response:', data);
        setToast({ type: 'error', message: data.message || 'Unable to update password.' });
        return;
      }

      // Persist security preferences (like 2FA) alongside successful password update.
      const stored = getStoredSettings() || buildDefaultSettings(currentUser);
      localStorage.setItem(
        'tp-account-settings',
        JSON.stringify({
          ...stored,
          security: settings.security,
        })
      );

      setToast({ type: 'success', message: 'Password updated successfully' });
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch {
      setToast({ type: 'error', message: 'Server error while updating password.' });
    } finally {
      setSectionSaving((prev) => ({ ...prev, security: false }));
    }
  };

  const handleTravelSave = () => {
    persistSection('travel', 'preferences', settings.preferences, 'Travel preferences saved.');
  };

  const triggerAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch {
      // Ignore storage errors and continue navigation.
    }
    navigate('/');
  };

  return (
    <div className="as-root">
      <style>{`
        .as-root {
          min-height: 100vh;
          padding: 36px 20px 76px;
          background: linear-gradient(to right, #dbeafe, #ecfeff);
          font-family: Inter, 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .as-shell {
          max-width: 1320px;
          margin: 0 auto;
        }

        .as-toast {
          position: fixed;
          top: 22px;
          right: 22px;
          min-width: 240px;
          padding: 14px 18px;
          border-radius: 14px;
          color: #ffffff;
          font-weight: 600;
          box-shadow: 0 18px 34px rgba(15, 118, 110, 0.26);
          animation: asFadeIn 220ms ease forwards;
          z-index: 200;
        }

        .as-toast.success {
          background: linear-gradient(120deg, #0f766e, #14b8a6);
        }

        .as-toast.error {
          background: linear-gradient(120deg, #dc2626, #fb7185);
        }

        @keyframes asFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .as-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 14px;
        }

        .as-kicker {
          margin: 0;
          color: #0f766e;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .as-title {
          margin: 8px 0 0;
          font-size: 34px;
          line-height: 1.08;
          font-weight: 800;
          color: #0f172a;
        }

        .as-subtitle {
          margin: 10px 0 0;
          max-width: 70ch;
          color: #64748b;
          font-size: 0.96rem;
        }

        .as-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .as-col-span-2 {
          grid-column: span 2;
        }

        .as-card-actions {
          margin-top: 16px;
          display: flex;
          justify-content: flex-end;
        }

        .settings-card {
          border-radius: 18px;
          padding: 18px;
          background: #f8fafc;
          border: 1px solid #d1d5db;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .settings-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .settings-card h2 {
          margin: 0;
          font-size: 18px;
          line-height: 1.2;
          color: #0f172a;
          font-weight: 700;
        }

        .settings-card p {
          margin: 0;
          color: #64748b;
          font-size: 0.93rem;
        }

        .settings-card.profile {
          border-top: 4px solid #10b981;
        }

        .settings-card.security {
          border-top: 4px solid #3b82f6;
        }

        .settings-card.preferences {
          border-top: 4px solid #8b5cf6;
        }

        .settings-card.notifications {
          border-top: 4px solid #f59e0b;
        }

        .settings-card.travel {
          border-top: 4px solid #ec4899;
        }

        .settings-card.danger {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-top: 4px solid #ef4444;
        }

        .as-avatar-row {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .as-avatar {
          width: 84px;
          height: 84px;
          border-radius: 999px;
          object-fit: cover;
          border: 3px solid #ffffff;
          box-shadow: 0 12px 24px rgba(15, 118, 110, 0.22);
        }

        .as-avatar-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .as-avatar-name {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
        }

        .as-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .as-chip {
          border-radius: 999px;
          border: 1px solid #d1d5db;
          padding: 9px 14px;
          background: #f1f5f9;
          color: #475569;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 220ms ease;
        }

        .as-chip:hover {
          border-color: #14b8a6;
          background: #ecfeff;
        }

        .as-chip.active {
          background: #10b981;
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 8px 18px rgba(16, 185, 129, 0.28);
        }

        .as-label {
          margin: 2px 0 0;
          color: #334155;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .as-budget-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .as-budget-chip {
          border-radius: 999px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          padding: 9px 15px;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 220ms ease;
        }

        .as-budget-chip.active {
          border-color: transparent;
          background: linear-gradient(130deg, #0f766e, #14b8a6);
          color: #ffffff;
          box-shadow: 0 8px 16px rgba(15, 118, 110, 0.24);
        }

        .toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 12px 0;
        }

        .toggle-label {
          color: #1f2937;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .toggle-control {
          width: 50px;
          height: 28px;
          border-radius: 999px;
          border: none;
          background: #cbd5e1;
          position: relative;
          cursor: pointer;
          transition: background 220ms ease;
        }

        .toggle-control.is-active {
          background: #10b981;
        }

        .toggle-thumb {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 4px 10px rgba(15, 23, 42, 0.18);
          transition: transform 220ms ease;
        }

        .toggle-control.is-active .toggle-thumb {
          transform: translateX(22px);
        }

        .input-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
          color: #334155;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .input-control {
          border-radius: 12px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          color: #0f172a;
          padding: 12px 14px;
          font-size: 0.95rem;
          transition: border-color 220ms ease, box-shadow 220ms ease;
        }

        .input-control:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }

        .as-danger-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .as-btn {
          border-radius: 999px;
          border: none;
          padding: 11px 20px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 220ms ease, box-shadow 220ms ease, opacity 220ms ease;
        }

        .as-btn.primary {
          color: #ffffff;
          background: linear-gradient(135deg, #10b981, #059669);
          box-shadow: 0 10px 24px rgba(16, 185, 129, 0.22);
        }

        .as-btn.secondary {
          color: #0f172a;
          background: #e5e7eb;
        }

        .as-btn.ghost {
          color: #0f172a;
          background: rgba(255, 255, 255, 0.86);
          border: 1px solid rgba(15, 118, 110, 0.2);
        }

        .as-btn.danger {
          color: #ffffff;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          box-shadow: 0 10px 22px rgba(220, 38, 38, 0.24);
        }

        .as-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .as-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .as-btn.danger:not(:disabled):hover {
          box-shadow: 0 20px 34px rgba(220, 38, 38, 0.3);
        }

        @media (max-width: 1100px) {
          .as-col-span-2 {
            grid-column: span 2;
          }
        }

        @media (max-width: 760px) {
          .as-root {
            padding: 26px 14px 64px;
          }

          .as-top {
            align-items: flex-start;
            flex-direction: column;
          }

          .as-title {
            font-size: 2rem;
          }

          .as-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .as-col-span-2 {
            grid-column: span 1;
          }

          .as-card-actions .as-btn {
            width: 100%;
          }

          .as-avatar-row {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>

      {toast && <div className={`as-toast ${toast.type}`}>{toast.message}</div>}

      <div className="as-shell">
        <header className="as-top">
          <div>
            <p className="as-kicker">Account</p>
            <h1 className="as-title">Account Settings</h1>
            <p className="as-subtitle">
              Manage your profile, preferences, security, and alerts from a compact settings workspace.
            </p>
          </div>
          <Button variant="ghost" type="button">Need help?</Button>
        </header>

        <div>
          <div className="as-grid">
            <SettingsCard title="Profile" description="Update how you appear across TripPilot." tone="profile">
              <div className="as-avatar-row">
                <img src={settings.profile.photo} alt={settings.profile.name} className="as-avatar" />
                <div className="as-avatar-meta">
                  <p className="as-avatar-name">{settings.profile.name}</p>
                  <Button type="button" onClick={triggerAvatarUpload}>Change Photo</Button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>

              <InputField
                label="Full Name"
                value={settings.profile.name}
                onChange={(event) => handleProfileChange('name', event.target.value)}
                placeholder="Your full name"
              />
              <InputField
                label="Email"
                type="email"
                value={settings.profile.email}
                placeholder="you@trippilot.com"
                readOnly
              />
              <InputField
                label="Bio"
                textarea
                rows={3}
                value={settings.profile.bio}
                onChange={(event) => handleProfileChange('bio', event.target.value)}
                placeholder="Tell travellers about your style"
              />
              <div className="as-card-actions">
                <Button type="button" onClick={handleProfileSave} disabled={sectionSaving.profile}>
                  {sectionSaving.profile ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </SettingsCard>

            <SettingsCard title="Security" description="Keep your account protected with stronger controls." tone="security">
              <ToggleSwitch
                label="Enable Two-Factor Authentication"
                checked={settings.security.twoFactor}
                onChange={() => handleSecurityToggle('twoFactor')}
              />
              <InputField
                label="Current Password"
                type="password"
                name="currentPassword"
                value={securityForm.currentPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
              />
              <InputField
                label="New Password"
                type="password"
                name="newPassword"
                value={securityForm.newPassword}
                onChange={handleInputChange}
                placeholder="Create a strong password"
              />
              <InputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={securityForm.confirmPassword}
                onChange={handleInputChange}
                placeholder="Repeat new password"
              />
              <div className="as-card-actions">
                <Button type="button" onClick={handleSecuritySave} disabled={sectionSaving.security}>
                  {sectionSaving.security ? 'Updating...' : 'Update Password'}
                </Button>
              </div>
            </SettingsCard>

            <SettingsCard title="Preferences" description="Customize the way TripPilot feels for you." tone="preferences">
              <ToggleSwitch
                label="Dark Mode"
                checked={settings.preferences.darkMode}
                onChange={() => handlePreferenceChange('darkMode', !settings.preferences.darkMode)}
              />
              <InputField
                label="Language"
                as="select"
                value={settings.preferences.language}
                onChange={(event) => handlePreferenceChange('language', event.target.value)}
              >
                {languageOptions.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </InputField>
              <InputField
                label="Currency"
                as="select"
                value={settings.preferences.currency}
                onChange={(event) => handlePreferenceChange('currency', event.target.value)}
              >
                {currencyOptions.map((currency) => (
                  <option key={currency.value} value={currency.value}>{currency.label}</option>
                ))}
              </InputField>
              <div className="as-card-actions">
                <Button type="button" onClick={handlePreferencesSave} disabled={sectionSaving.preferences}>
                  {sectionSaving.preferences ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </SettingsCard>

            <SettingsCard title="Notifications" description="Choose alerts that matter to your travel flow." tone="notifications">
              <ToggleSwitch
                label="Email Notifications"
                checked={settings.notifications.email}
                onChange={() => handleNotificationToggle('email')}
              />
              <ToggleSwitch
                label="Trip Alerts"
                checked={settings.notifications.tripAlerts}
                onChange={() => handleNotificationToggle('tripAlerts')}
              />
              <ToggleSwitch
                label="Offers & Deals"
                checked={settings.notifications.offers}
                onChange={() => handleNotificationToggle('offers')}
              />
              <div className="as-card-actions">
                <Button type="button" onClick={handleNotificationsSave} disabled={sectionSaving.notifications}>
                  {sectionSaving.notifications ? 'Saving...' : 'Save Notifications'}
                </Button>
              </div>
            </SettingsCard>

            <SettingsCard title="Travel Preferences" description="Manage travel tags and budget tuning in one place." tone="travel" className="as-col-span-2">
              <div className="as-chip-row">
                {travelChips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className={`as-chip ${settings.preferences.travelPreferences.includes(chip) ? 'active' : ''}`}
                    onClick={() => handleChipToggle(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <label className="as-label">Budget Range</label>
              <div className="as-budget-row">
                {[
                  { value: 'budget', label: 'Budget' },
                  { value: 'mid', label: 'Mid-range' },
                  { value: 'luxury', label: 'Luxury' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`as-budget-chip ${settings.preferences.budgetLevel === option.value ? 'active' : ''}`}
                    onClick={() => handleBudgetSelect(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="as-card-actions">
                <Button type="button" onClick={handleTravelSave} disabled={sectionSaving.travel}>
                  {sectionSaving.travel ? 'Saving...' : 'Save Travel Preferences'}
                </Button>
              </div>
            </SettingsCard>

            <SettingsCard
              title="Sign Out"
              description="End your TripPilot session securely. This will log you out on this device."
              tone="danger"
              className="as-col-span-2"
            >
              <div className="as-danger-actions">
                <p className="as-subtitle">For account safety, use Sign Out when you finish on shared devices.</p>
                <Button type="button" variant="danger" onClick={handleLogout}>Sign Out</Button>
              </div>
            </SettingsCard>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsCard = ({ title, description, children, tone, className = '' }) => (
  <section className={`settings-card ${tone || ''} ${className}`.trim()}>
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
    {children}
  </section>
);

const ToggleSwitch = ({ label, checked, onChange }) => (
  <label className="toggle">
    <span className="toggle-label">{label}</span>
    <button
      type="button"
      className={`toggle-control ${checked ? 'is-active' : ''}`}
      onClick={onChange}
      aria-pressed={checked}
    >
      <span className="toggle-thumb" />
    </button>
  </label>
);

const InputField = ({ label, value, onChange, placeholder, type = 'text', textarea, as, children, ...rest }) => (
  <label className="input-field">
    {label}
    {textarea ? (
      <textarea className="input-control" value={value} onChange={onChange} placeholder={placeholder} {...rest} />
    ) : as === 'select' ? (
      <select className="input-control" value={value} onChange={onChange} {...rest}>
        {children}
      </select>
    ) : (
      <input className="input-control" type={type} value={value} onChange={onChange} placeholder={placeholder} {...rest} />
    )}
  </label>
);

const Button = ({ children, variant = 'primary', ...rest }) => (
  <button className={`as-btn ${variant}`} {...rest}>
    {children}
  </button>
);

export default AccountSettings;
