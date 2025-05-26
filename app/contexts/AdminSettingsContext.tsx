import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the interface for admin settings
export interface AdminSettings {
  printerCost: number;
  upgradesCost: number;
  maintanceCost: number;
  printerAverageLifetimeHrs: number;
  powerUsage: number;
  costPerKwh: number;
  costPerMinute: number;
  eurToUah: number;
}

// Define the context type
interface AdminSettingsContextType {
  adminSettings: AdminSettings;
  updateAdminSettings: (settings: Partial<AdminSettings>) => void;
}

// Create the context
const AdminSettingsContext = createContext<AdminSettingsContextType | undefined>(undefined);

// Define the provider component
export const AdminSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default state
  const defaultSettings: AdminSettings = {
    printerCost: 0,
    upgradesCost: 0,
    maintanceCost: 0,
    printerAverageLifetimeHrs: 0,
    powerUsage: 0,
    costPerKwh: 0,
    costPerMinute: 0,
    eurToUah: 0,
  };

  // State for admin settings
  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    const storedSettings = localStorage.getItem('adminSettings');
    return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
  });

  // Effect to save settings to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('adminSettings', JSON.stringify(adminSettings));
  }, [adminSettings]);

  // Function to update admin settings
  const updateAdminSettings = (settings: Partial<AdminSettings>) => {
    setAdminSettings(prevSettings => ({
      ...prevSettings,
      ...settings,
    }));
  };

  return (
    <AdminSettingsContext.Provider value={{ adminSettings, updateAdminSettings }}>
      {children}
    </AdminSettingsContext.Provider>
  );
};

// Custom hook to use the admin settings context
export const useAdminSettings = () => {
  const context = useContext(AdminSettingsContext);
  if (!context) {
    throw new Error('useAdminSettings must be used within an AdminSettingsProvider');
  }
  return context;
};
