import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Importa o nosso sistema completo

// Encontra a div no HTML
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Injeta o sistema nela
root.render(<App />);