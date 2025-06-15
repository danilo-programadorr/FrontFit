/**
 * Validation utilities for the fitness app
 */

// Validate full name (at least two parts, letters only)
export const validateFullName = (name: string): string => {
  if (!name) return 'Name is required';
  
  // Check if name has at least two parts (first and last)
  const nameParts = name.trim().split(' ').filter(part => part.length > 0);
  if (nameParts.length < 2) return 'Please enter your full name';
  
  // Check if name contains only letters and spaces
  if (!/^[A-Za-z\s]+$/.test(name)) return 'Name should contain only letters';
  
  return '';
};

// Validate weight (between 30kg and 300kg)
export const validateWeight = (weight: number | string): string => {
  if (!weight) return 'Weight is required';
  
  const weightValue = typeof weight === 'string' ? parseFloat(weight) : weight;
  
  if (isNaN(weightValue)) return 'Please enter a valid number';
  if (weightValue < 30) return 'Weight should be at least 30kg';
  if (weightValue > 300) return 'Weight should be less than 300kg';
  
  return '';
};

// Validate height (between 100cm and 250cm)
export const validateHeight = (height: number | string): string => {
  if (!height) return 'Height is required';
  
  const heightValue = typeof height === 'string' ? parseFloat(height) : height;
  
  if (isNaN(heightValue)) return 'Please enter a valid number';
  if (heightValue < 100) return 'Height should be at least 100cm';
  if (heightValue > 250) return 'Height should be less than 250cm';
  
  return '';
};

// Calculate BMI
export const calculateBMI = (weight: number, height: number): number => {
  if (!weight || !height) return 0;
  
  // Convert height from cm to meters
  const heightInMeters = height / 100;
  
  // Calculate BMI: weight (kg) / (height (m) * height (m))
  const bmi = weight / (heightInMeters * heightInMeters);
  
  // Round to one decimal place
  return Math.round(bmi * 10) / 10;
};

// Get BMI category
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

// Validate file upload (PDF only, max 5MB)
export const validateFileUpload = (file: File | null): string => {
  if (!file) return '';
  
  if (file.type !== 'application/pdf') {
    return 'Only PDF files are allowed';
  }
  
  if (file.size > 5 * 1024 * 1024) {
    return 'File size should be less than 5MB';
  }
  
  return '';
};

// Validate form step completeness
export const validateStep = (step: number, userData: any): boolean => {
  switch (step) {
    case 1:
      return !!userData.fullName && !!userData.weight && !!userData.height && !!userData.gender;
    case 2:
      return !!userData.goal && !!userData.experienceLevel;
    case 3:
      return true; // No required fields in step 3
    case 4:
      return !!userData.dietPreference;
    default:
      return false;
  }
};