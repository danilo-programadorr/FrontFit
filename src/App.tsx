import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { FitnessAppProvider } from './context/FitnessAppContext';
import Router from './Router';
import './i18n';

export default function App() {
  // Chamada API dentro do componente (executa quando o componente monta)
  useEffect(() => {
  fetch('/api/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userGoal: 'perda de peso',
      dietType: 'low-carb'
    })
  })
    .then(response => {
      if (!response.ok) throw new Error('Erro na resposta da API');
      return response.json();
    })
    .then(data => console.log('Resposta da API:', data))
    .catch(error => console.error('Erro ao chamar API:', error));
}, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <FitnessAppProvider>
            <Router />
          </FitnessAppProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}