import React from 'react';
import SimpleCSVLoader from './components/SimpleCSVLoader';
import ScatterPlotComponent from './components/ScatterPlotComponent';

function App() {
  return (
    <div>
      <h1 className="text-2xl font-bold m-4">Data Visualization</h1>
      <div className="grid grid-cols-1 gap-4 m-4">
        <div>
          <h2 className="text-xl font-bold mb-2">CSV Data Preview</h2>
          <SimpleCSVLoader />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Scatter Plot</h2>
          <ScatterPlotComponent />
        </div>
      </div>
    </div>
  );
}

export default App;