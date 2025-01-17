import React from 'react';
import ScatterPlotComponent from './components/ScatterPlotComponent';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  Visualización de Datos
                </h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Gráfico de Dispersión
            </h2>
            <ScatterPlotComponent />
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-lg mt-auto">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Creado con React y Recharts - {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;