import React from 'react';
import { useFitnessApp } from '../context/FitnessAppContext';
import Button from '../components/ui/Button';
import { CheckCircle, Dumbbell, Utensils, ArrowDown, Download, RefreshCcw } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const { userData, resetForm } = useFitnessApp();

  const workoutPlan = React.useMemo(() => generateWorkoutPlan(userData), [userData]);
  const nutritionPlan = React.useMemo(() => generateNutritionPlan(userData), [userData]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Personalized Plan</h1>

      {/* Workout Plan Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <Dumbbell className="text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold">Workout Plan</h2>
        </div>
        {workoutPlan.map((day, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="font-semibold text-lg">{day.day}</h3>
            <p className="text-sm text-gray-600">Focus: {day.focus}</p>
            <ul className="list-disc list-inside mt-2">
              {day.exercises.map((ex, i) => (
                <li key={i}>
                  <span className="font-medium">{ex.name}</span>: {ex.description} ({ex.sets} sets x {ex.reps} reps)
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm italic text-gray-500">{day.note}</p>
          </div>
        ))}
      </div>

      {/* Nutrition Plan Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex items-center mb-4">
          <Utensils className="text-green-500 mr-2" />
          <h2 className="text-xl font-semibold">Nutrition Plan</h2>
        </div>
        <p className="mb-2">Total Calories: <strong>{nutritionPlan.calories}</strong></p>
        <p className="mb-2">Macros:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Protein: {nutritionPlan.macros.protein}g</li>
          <li>Carbs: {nutritionPlan.macros.carbs}g</li>
          <li>Fats: {nutritionPlan.macros.fats}g</li>
        </ul>
        <p className="mb-2">Meal Timing:</p>
        <ul className="list-disc list-inside mb-4">
          {nutritionPlan.mealTiming.map((meal, i) => (
            <li key={i}>{meal.meal} at {meal.time}</li>
          ))}
        </ul>
        <p className="mb-2">Recommended Foods:</p>
        <ul className="list-disc list-inside">
          <li><strong>Protein:</strong> {nutritionPlan.recommendedFoods.protein.join(', ')}</li>
          <li><strong>Carbs:</strong> {nutritionPlan.recommendedFoods.carbs.join(', ')}</li>
          <li><strong>Fats:</strong> {nutritionPlan.recommendedFoods.fats.join(', ')}</li>
        </ul>
      </div>

      <div className="flex justify-center mt-6">
        <Button onClick={resetForm} icon={<RefreshCcw size={16} />}>
          Start Over
        </Button>
      </div>
    </div>
  );
};

function generateWorkoutPlan(userData: any) {
  return [
    {
      day: 'Day 1: Full Body',
      focus: 'Strength Training',
      exercises: [
        { name: 'Squats', description: 'Bodyweight squats', sets: '3', reps: '12' },
        { name: 'Push-ups', description: 'Standard push-ups', sets: '3', reps: '10' },
      ],
      note: 'Perform with proper form and rest 60 seconds between sets.'
    },
  ];
}

function generateNutritionPlan(userData: any) {
  return {
    macros: {
      protein: 120,
      carbs: 180,
      fats: 60,
    },
    calories: 2000,
    mealTiming: [
      { meal: 'Breakfast', time: '08:00 AM' },
      { meal: 'Lunch', time: '12:30 PM' },
      { meal: 'Dinner', time: '07:00 PM' },
    ],
    recommendedFoods: {
      protein: ['Chicken breast', 'Tofu', 'Eggs'],
      carbs: ['Brown rice', 'Sweet potatoes', 'Oats'],
      fats: ['Avocado', 'Olive oil', 'Nuts'],
    }
  };
}

export default ResultsPage;
