import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the user data interface
export interface UserData {
  fullName: string;
  weight: number | '';
  height: number | '';
  bmi: number | null;
  goal: 'weight-loss' | 'muscle-gain' | 'maintenance' | '';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | '';
  limitations: string;
  gender: 'male' | 'female' | 'other' | '';
  dietPreference: 'low-carb' | 'vegan' | 'traditional' | '';
  medicalDocument: File | null;
  step: number;
}

// Define the context interface
interface FitnessAppContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetForm: () => void;
  calculateBMI: () => void;
  submitForm: () => void;
  formSubmitted: boolean;
  loading: boolean;
}

// Initial state
const initialUserData: UserData = {
  fullName: '',
  weight: '',
  height: '',
  bmi: null,
  goal: '',
  experienceLevel: '',
  limitations: '',
  gender: '',
  dietPreference: '',
  medicalDocument: null,
  step: 1,
};

// Create context
const FitnessAppContext = createContext<FitnessAppContextType | undefined>(undefined);

// Provider component
export const FitnessAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update user data
  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  // Calculate BMI
  const calculateBMI = () => {
    if (userData.weight && userData.height) {
      const weightInKg =
  typeof userData.weight === 'number'
    ? userData.weight
    : parseFloat((userData.weight as string).toString());

      const heightInM =
  typeof userData.height === 'number'
    ? userData.height / 100
    : parseFloat((userData.height as string).toString()) / 100;
      const bmi = Number((weightInKg / (heightInM * heightInM)).toFixed(1));
      updateUserData({ bmi });
    }
  };

  // Navigation functions
  const nextStep = () => {
    const nextStep = userData.step + 1;
    updateUserData({ step: nextStep });
  };

  const prevStep = () => {
    const prevStep = Math.max(1, userData.step - 1);
    updateUserData({ step: prevStep });
  };

  const goToStep = (step: number) => {
    updateUserData({ step });
  };

  const resetForm = () => {
    setUserData(initialUserData);
    setFormSubmitted(false);
  };

  // Submit form
  const submitForm = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', userData);
      setFormSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <FitnessAppContext.Provider
      value={{
        userData,
        updateUserData,
        nextStep,
        prevStep,
        goToStep,
        resetForm,
        calculateBMI,
        submitForm,
        formSubmitted,
        loading,
      }}
    >
      {children}
    </FitnessAppContext.Provider>
  );
};

// Custom hook
export const useFitnessApp = () => {
  const context = useContext(FitnessAppContext);
  if (context === undefined) {
    throw new Error('useFitnessApp must be used within a FitnessAppProvider');
  }
  return context;
};