import React, { useState } from 'react';
import Papa from 'papaparse';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ScatterPlotComponent = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        Papa.parse(e.target.result, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.data && results.data.length > 0) {
              setData(results.data);
            }
          }
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
        />
      </div>

      {data.length > 0 && (
        <div style={{ height: '400px', width: '100%' }}>
          <ResponsiveContainer>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" />
              <YAxis type="number" dataKey="y" />
              <Tooltip />
              <Scatter data={data} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ScatterPlotComponent;