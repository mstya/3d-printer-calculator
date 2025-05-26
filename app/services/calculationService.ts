import { AdminSettings } from '../contexts/AdminSettingsContext';
import { UserParametersData } from '../components/UserParameters';

// Interface for the combined input parameters for the calculation
export interface CalculationInput extends AdminSettings, UserParametersData {}

// Interface for the output of the calculation (a row in the results table)
export interface CalculationOutput {
  printingDate: string;
  modelName: string;
  modelWeight: number; // grams
  printingTime: number; // minutes
  priceOfMaterialInput: number; // User input: price of material spool/package
  materialWeightInput: number; // User input: weight of material spool/package (grams)
  priceOfGram: number; // Calculated: price per gram of material
  priceOfMaterialCalculated: number; // Calculated: cost of material for the specific model
  printingTimePrice: number; // Calculated: cost of printing time
  finalPrice: number; // Calculated: final price in UAH
  layerHeight: string | number;
}

/**
 * Calculates the printing cost based on admin settings and user parameters.
 * @param input - Combined admin settings and user parameters.
 * @returns CalculationOutput - An object containing all relevant data for the results table.
 */
export const calculatePrice = (input: CalculationInput): CalculationOutput => {
  // Destructure inputs for easier access
  const {
    // Admin Settings
    costPerMinute, // Cost per minute of printer operation
    eurToUah,      // EUR to UAH conversion rate

    // User Parameters
    modelWeight,          // Weight of the 3D model in grams
    printingTime,         // Time taken to print the model in minutes
    priceOfMaterial,      // User input: Cost of a spool/package of material
    materialWeight,       // User input: Weight of the spool/package in grams (e.g., 1000 for 1kg)
    printingDate,
    modelName,
    layerHeight,
  } = input;

  // 1. Calculate the price per gram of the material
  // priceOfMaterialInput is the cost of a spool (e.g., $20)
  // materialWeightInput is the weight of that spool in grams (e.g., 1000g)
  const priceOfGram = priceOfMaterial / materialWeight;

  // 2. Calculate the cost of the material used for the specific model
  // priceOfGram is cost per gram, modelWeight is the weight of the printed model
  const priceOfMaterialCalculated = priceOfGram * modelWeight;

  // 3. Calculate the cost associated with the printing time
  // printingTime is in minutes, costPerMinute is the admin-defined rate
  const printingTimePrice = printingTime * costPerMinute;

  // 4. Calculate the final price
  // This sums the material cost and printing time cost, then converts from EUR (implied base currency for costs) to UAH
  // Assuming priceOfMaterialCalculated and printingTimePrice are in a base currency (e.g., EUR) that needs conversion
  const finalPriceInBaseCurrency = priceOfMaterialCalculated + printingTimePrice;
  const finalPrice = finalPriceInBaseCurrency * eurToUah;

  return {
    printingDate,
    modelName,
    modelWeight,
    printingTime,
    priceOfMaterialInput: priceOfMaterial, // Store the original user input
    materialWeightInput: materialWeight,   // Store the original user input
    priceOfGram,
    priceOfMaterialCalculated,
    printingTimePrice,
    finalPrice, // This is in UAH
    layerHeight,
  };
};
