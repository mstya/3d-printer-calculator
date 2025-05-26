import React, { useState } from 'react';
import './UserParameters.css'; // We will create this file for styling

// Define the interface for user parameters
export interface UserParametersData {
  modelWeight: number;
  printingTime: number; // Assuming this will be in minutes
  priceOfMaterial: number;
  materialWeight: number;
  printingDate: string;
  modelName: string;
  layerHeight: string | number;
}

interface UserParametersProps {
  onCalculate: (params: UserParametersData) => void;
}

const UserParameters: React.FC<UserParametersProps> = ({ onCalculate }) => {
  const [params, setParams] = useState<UserParametersData>({
    modelWeight: 0,
    printingTime: 0,
    priceOfMaterial: 0,
    materialWeight: 1000, // Default to 1kg (1000g)
    printingDate: new Date().toISOString().split('T')[0], // Default to today
    modelName: '',
    layerHeight: '0.2', // Default layer height
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    setParams(prevParams => ({
      ...prevParams,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(params);
  };

  return (
    <div className="user-parameters-container">
      <h2>User Parameters</h2>
      <form onSubmit={handleSubmit} className="user-parameters-form">
        <div className="form-group">
          <label htmlFor="modelName">Model Name:</label>
          <input
            type="text"
            id="modelName"
            name="modelName"
            value={params.modelName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="modelWeight">Model Weight (grams):</label>
          <input
            type="number"
            id="modelWeight"
            name="modelWeight"
            value={params.modelWeight}
            onChange={handleChange}
            step="0.1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="printingTime">Printing Time (minutes):</label>
          <input
            type="number"
            id="printingTime"
            name="printingTime"
            value={params.printingTime}
            onChange={handleChange}
            step="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priceOfMaterial">Price of Material (per spool/kg):</label>
          <input
            type="number"
            id="priceOfMaterial"
            name="priceOfMaterial"
            value={params.priceOfMaterial}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="materialWeight">Material Spool Weight (grams):</label>
          <input
            type="number"
            id="materialWeight"
            name="materialWeight"
            value={params.materialWeight}
            onChange={handleChange}
            step="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="layerHeight">Layer Height (e.g., 0.2 or 0.2mm):</label>
          <input
            type="text" // Using text to allow "mm" suffix, can also be just number
            id="layerHeight"
            name="layerHeight"
            value={params.layerHeight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="printingDate">Printing Date:</label>
          <input
            type="date"
            id="printingDate"
            name="printingDate"
            value={params.printingDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="calculate-button">Calculate</button>
      </form>
    </div>
  );
};

export default UserParameters;
