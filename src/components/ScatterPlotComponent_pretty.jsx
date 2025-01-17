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
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
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

  const fileInputStyles = {
    container: {
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'center'
    },
    label: {
      padding: '10px 20px',
      backgroundColor: '#4a90e2',
      color: 'white',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      display: 'inline-block',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    input: {
      display: 'none'
    },
    fileName: {
      marginTop: '10px',
      color: '#666',
      fontSize: '14px',
      textAlign: 'center'
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={fileInputStyles.container}>
        <div>
          <label style={fileInputStyles.label}>
            Choose CSV File
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              style={fileInputStyles.input}
            />
          </label>
          {fileName && (
            <div style={fileInputStyles.fileName}>
              Selected file: {fileName}
            </div>
          )}
        </div>
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
              <Scatter data={data} fill="#4a90e2" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ScatterPlotComponent;