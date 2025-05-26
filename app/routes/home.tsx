import React, { useState } from 'react';
import type { Route } from "./+types/home";

// Context and Components
import { AdminSettingsProvider, useAdminSettings } from '../contexts/AdminSettingsContext';
import AdminSettingsComponent from '../components/AdminSettings'; // Renamed to avoid conflict
import UserParametersComponent, { UserParametersData } from '../components/UserParameters'; // Renamed
import ResultsTableComponent from '../components/ResultsTable'; // Renamed

// Services and Types
import { CalculationInput, CalculationOutput, calculatePrice } from '../services/calculationService';
import '../app.css'; // Ensure global styles are imported

export function meta({}: Route.MetaArgs) {
  return [
    { title: "3D Print Cost Calculator" },
    { name: "description", content: "Calculate the cost of your 3D prints." },
  ];
}

// Main application content component
const AppContent: React.FC = () => {
  const { adminSettings } = useAdminSettings(); // Get admin settings from context
  const [results, setResults] = useState<CalculationOutput[]>([]);

  const handleCalculate = (userParams: UserParametersData) => {
    if (!adminSettings) {
      // This should ideally not happen if AdminSettingsProvider is correctly set up
      // and AdminSettings has default values.
      console.error("Admin settings not available for calculation.");
      // Optionally, show an error to the user
      return;
    }

    const calculationInput: CalculationInput = {
      ...adminSettings,
      ...userParams,
    };

    const newResult = calculatePrice(calculationInput);
    setResults(prevResults => [newResult, ...prevResults]); // Add new result to the beginning of the array
  };

  return (
    <div className="container">
      <h1>3D Print Cost Calculator</h1>

      <section>
        {/* AdminSettings will be rendered here, but its state is managed by context */}
        <AdminSettingsComponent />
      </section>

      <section>
        {/* UserParameters form */}
        <UserParametersComponent onCalculate={handleCalculate} />
      </section>

      <section>
        {/* ResultsTable to display calculations */}
        <ResultsTableComponent results={results} />
      </section>
    </div>
  );
};

// Home component that wraps the app content with the provider
export default function Home() {
  return (
    <AdminSettingsProvider>
      <AppContent />
    </AdminSettingsProvider>
  );
}
