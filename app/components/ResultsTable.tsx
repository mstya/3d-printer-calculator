import React from 'react';
import { CalculationOutput } from '../services/calculationService';
import './ResultsTable.css'; // We will create this file for styling if needed, or add to app.css

interface ResultsTableProps {
  results: CalculationOutput[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  if (results.length === 0) {
    return <p className="no-results-message">No calculations yet. Fill the form above and click Calculate.</p>;
  }

  const formatNumber = (num: number, fractionDigits = 2) => num.toFixed(fractionDigits);

  return (
    <div className="results-table-container">
      <h2>Calculation Results</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Printing Date</th>
            <th>Model Name</th>
            <th>Model Weight (g)</th>
            <th>Printing Time (min)</th>
            <th>Layer Height</th>
            <th>Material Spool Weight (g)</th>
            <th>Material Spool Price</th>
            <th>Price per Gram</th>
            <th>Material Cost (Model)</th>
            <th>Printing Time Cost</th>
            <th>Final Price (UAH)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.printingDate}</td>
              <td>{result.modelName}</td>
              <td>{formatNumber(result.modelWeight, 1)}</td>
              <td>{result.printingTime}</td>
              <td>{result.layerHeight}</td>
              <td>{result.materialWeightInput}</td>
              <td>{formatNumber(result.priceOfMaterialInput)}</td>
              <td>{formatNumber(result.priceOfGram, 4)}</td> 
              <td>{formatNumber(result.priceOfMaterialCalculated)}</td>
              <td>{formatNumber(result.printingTimePrice)}</td>
              <td>{formatNumber(result.finalPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
