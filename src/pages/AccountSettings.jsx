import React, { useEffect, useRef, useState } from 'react';

const travelChips = ['Adventure', 'Food', 'Relaxation', 'Culture', 'Nightlife'];
const languageOptions = ['English', 'Hindi', 'Spanish', 'French'];
const currencyOptions = [
  { value: 'INR', label: 'Indian Rupee (₹)' },
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
];

const defaultSettings = {
  profile: {
    name: 'Vikas Yadav',
    email: 'vikas@trippilot.com',
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
};

const AccountSettings = () => {
  const storedSettings = (() => {
    try {
      const data = localStorage.getItem('tp-account-settings');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  })();

  const [settings, setSettings] = useState(storedSettings || defaultSettings);
  const [securityForm, setSecurityForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(timer);
  }, [toast]);

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

  const handleSave = (event) => {
    event.preventDefault();
    if (saving) return;

    const { currentPassword, newPassword, confirmPassword } = securityForm;
    if ((newPassword || confirmPassword) && newPassword !== confirmPassword) {
      setToast({ type: 'error', message: 'New password and confirmation must match.' });
      return;
    }

    if ((newPassword || confirmPassword) && !currentPassword) {
      setToast({ type: 'error', message: 'Enter your current password to update it.' });
      return;
    }

    setSaving(true);
    setTimeout(() => {
      try {
        localStorage.setItem('tp-account-settings', JSON.stringify(settings));
        setToast({ type: 'success', message: 'Settings updated successfully' });
        setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } catch {
        setToast({ type: 'error', message: 'Unable to save settings locally.' });
      } finally {
        setSaving(false);
      }
    }, 400);
  };

  const triggerAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="as-root">
      <style>{`
        .as-root {
          min-height: 100vh;
          background: linear-gradient(135deg, #e6fbfb, #d4efef);
          padding: 32px 20px 60px;
          font-family: Inter, 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .as-container {
          max-width: 1180px;
          margin: 0 auto;
        }

        .as-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 28px;
        }

        .as-header h1 {
          margin: 0;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          color: #0f172a;
        }

        .as-header p {
          margin: 6px 0 0;
          color: #475569;
        }

        .as-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }

        .as-save-bar {
          display: flex;
          justify-content: flex-end;
          margin-top: 26px;
        }

        .as-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          min-width: 240px;
          padding: 14px 18px;
          border-radius: 14px;
          color: #fff;
          font-weight: 600;
          box-shadow: 0 20px 40px rgba(15, 118, 110, 0.25);
          animation: fadeIn 250ms ease forwards;
        }

        .as-toast.success { background: linear-gradient(120deg, #0f766e, #22d3ee); }
        .as-toast.error { background: linear-gradient(120deg, #dc2626, #f97316); }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .as-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .as-save-bar {
            justify-content: stretch;
          }
        }
      `}</style>

      {toast && <div className={`as-toast ${toast.type}`}>{toast.message}</div>}

      <div className="as-container">
        <header className="as-header">
          <div>
            <p style={{ textTransform: 'uppercase', letterSpacing: '1px', color: '#0f766e', fontWeight: 600, margin: 0 }}>Account</p>
            <h1>Account Settings</h1>
            <p>Manage your TripPilot identity, privacy, and travel preferences from a single dashboard.</p>
          </div>
          <Button variant="ghost" type="button">Need help?</Button>
        </header>

        <form onSubmit={handleSave}>
          <div className="as-grid">
            <SettingsCard title="Profile" description="Update how you appear across TripPilot.">
              <div className="as-avatar-row">
                <img src={settings.profile.photo} alt={settings.profile.name} className="as-avatar" />
                <div>
                  <p style={{ margin: '0 0 6px', color: '#0f172a', fontWeight: 600 }}>{settings.profile.name}</p>
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
                onChange={(event) => handleProfileChange('email', event.target.value)}
                placeholder="you@trippilot.com"
              />
              <InputField
                label="Bio"
                textarea
                rows={3}
                value={settings.profile.bio}
                onChange={(event) => handleProfileChange('bio', event.target.value)}
                placeholder="Tell travellers about your vibe"
              />
            </SettingsCard>

            <SettingsCard title="Security" description="Keep your account protected.">
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
              <Button type="button" onClick={handleSave} variant="secondary">Update Password</Button>
            </SettingsCard>

            <SettingsCard title="Preferences" description="Customise the way TripPilot feels.">
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
            </SettingsCard>

            <SettingsCard title="Notifications" description="Decide what deserves your attention.">
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
            </SettingsCard>

            <SettingsCard title="Travel Preferences" description="Tell us your style so TripPilot can curate smarter plans.">
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
            </SettingsCard>

            <SettingsCard title="Danger Zone" description="Manage sessions and account removal." tone="danger">
              <div className="as-danger-actions">
                <Button type="button" variant="secondary">Logout</Button>
                <Button type="button" variant="danger">Delete Account</Button>
              </div>
            </SettingsCard>
          </div>

          <div className="as-save-bar">
            <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SettingsCard = ({ title, description, children, tone }) => (
  <section className={`settings-card ${tone || ''}`}>
    <style>{`
      .settings-card {
        background: #fff;
        border-radius: 22px;
        padding: 22px;
        box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .settings-card h2 {
        margin: 0;
        font-size: 1.1rem;
        color: #0f172a;
      }

      .settings-card p {
        margin: 0;
        color: #475569;
        font-size: 0.92rem;
      }

      .settings-card.danger {
        border: 1px solid rgba(220, 38, 38, 0.2);
      }

      .as-avatar-row {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .as-avatar {
        width: 64px;
        height: 64px;
        border-radius: 20px;
        object-fit: cover;
        box-shadow: 0 8px 18px rgba(15, 118, 110, 0.25);
      }

      .as-chip-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .as-chip {
        border-radius: 999px;
        border: 1px solid #cbd5f5;
        padding: 8px 14px;
        background: #f5fbfb;
        color: #0f172a;
        font-weight: 600;
        cursor: pointer;
        transition: all 180ms ease;
      }

      .as-chip.active {
        background: linear-gradient(135deg, #0f766e, #14b8a6);
        border-color: transparent;
        color: #fff;
        box-shadow: 0 10px 20px rgba(15, 118, 110, 0.25);
      }

      .as-budget-row {
        display: flex;
        gap: 10px;
        margin-top: 8px;
      }

      .as-budget-chip {
        border-radius: 12px;
        border: 1px solid #cbd5f5;
        background: #f8fbfb;
        padding: 8px 14px;
        font-weight: 600;
        cursor: pointer;
      }

      .as-budget-chip.active {
        background: #0f766e;
        color: #fff;
        border-color: transparent;
      }

      .as-danger-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
    `}</style>
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
    {children}
  </section>
);

const ToggleSwitch = ({ label, checked, onChange }) => (
  <label className="toggle">
    <style>{`
      .toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 12px 0;
      }

      .toggle span {
        color: #0f172a;
        font-weight: 600;
      }

      .toggle-control {
        width: 48px;
        height: 26px;
        border-radius: 999px;
        background: ${checked ? 'linear-gradient(120deg, #0f766e, #22d3ee)' : '#cbd5f5'};
        position: relative;
        cursor: pointer;
        transition: background 160ms ease;
      }

      .toggle-thumb {
        position: absolute;
        top: 3px;
        left: ${checked ? '24px' : '3px'};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 4px 10px rgba(15, 23, 42, 0.15);
        transition: left 160ms ease;
      }
    `}</style>
    <span>{label}</span>
    <button type="button" className="toggle-control" onClick={onChange} aria-pressed={checked}>
      <span className="toggle-thumb" />
    </button>
  </label>
);

const InputField = ({ label, value, onChange, placeholder, type = 'text', textarea, as, children, ...rest }) => (
  <label className="input-field">
    <style>{`
      .input-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-weight: 600;
        color: #0f172a;
      }

      .input-control {
        border-radius: 14px;
        border: 1px solid #cbd5f5;
        padding: 12px;
        font-size: 0.95rem;
        background: #fdfefe;
        transition: border-color 180ms ease, box-shadow 180ms ease;
      }

      .input-control:focus {
        outline: none;
        border-color: #0f766e;
        box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
        background: #fff;
      }
    `}</style>
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
  <button
    className={`as-btn ${variant}`}
    {...rest}
  >
    <style>{`
      .as-btn {
        border-radius: 999px;
        border: none;
        padding: 10px 20px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 160ms ease, box-shadow 160ms ease;
      }

      .as-btn.primary {
        background: linear-gradient(135deg, #0f766e, #14b8a6);
        color: white;
        box-shadow: 0 14px 32px rgba(15, 118, 110, 0.35);
      }

      .as-btn.secondary {
        background: #e2e8f0;
        color: #0f172a;
      }

      .as-btn.ghost {
        background: rgba(255,255,255,0.7);
        color: #0f172a;
        border: 1px solid rgba(15, 118, 110, 0.15);
      }

      .as-btn.danger {
        background: linear-gradient(135deg, #dc2626, #f87171);
        color: white;
        box-shadow: 0 12px 24px rgba(220, 38, 38, 0.35);
      }

      .as-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        box-shadow: none;
      }

      .as-btn:not(:disabled):hover {
        transform: translateY(-1px);
      }
    `}</style>
    {children}
  </button>
);

export default AccountSettings;
