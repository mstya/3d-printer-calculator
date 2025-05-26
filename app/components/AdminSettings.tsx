import React from 'react';
import { useAdminSettings, AdminSettings } from '../contexts/AdminSettingsContext';
import './AdminSettings.css'; // We will create this file for styling

const AdminSettings: React.FC = () => {
  const { adminSettings, updateAdminSettings } = useAdminSettings();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    updateAdminSettings({ [name]: parsedValue });
  };

  return (
    <div className="admin-settings-container">
      <h2>Admin Settings</h2>
      <form className="admin-settings-form">
        {(Object.keys(adminSettings) as Array<keyof AdminSettings>).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
            <input
              type="number"
              id={key}
              name={key}
              value={adminSettings[key]}
              onChange={handleChange}
              step={key === 'printerAverageLifetimeHrs' ? '1' : '0.01'} // Allow integers for lifetime
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default AdminSettings;
