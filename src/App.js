import React from 'react';
import ScatterPlotComponent from './components/ScatterPlotComponent';

function App() {
  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          Data Visualizer
        </h1>
        <ScatterPlotComponent />
      </div>
    </div>
  );
}

export default App;