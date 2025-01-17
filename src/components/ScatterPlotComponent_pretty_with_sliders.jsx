import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const ScatterPlotComponent = () => {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [squareX, setSquareX] = useState(0);
  const [squareY, setSquareY] = useState(0);
  const [dataRange, setDataRange] = useState({ xMin: 0, xMax: 10, yMin: 0, yMax: 10 });
  const squareSize = 1; // Size of half the square side

  useEffect(() => {
    if (data.length > 0) {
      const xValues = data.map(point => point.x);
      const yValues = data.map(point => point.y);
      setDataRange({
        xMin: Math.min(...xValues),
        xMax: Math.max(...xValues),
        yMin: Math.min(...yValues),
        yMax: Math.max(...yValues)
      });
    }
  }, [data]);

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

  // Function to check if a point is inside the square
  const isPointInSquare = (point) => {
    return (
      point.x >= squareX - squareSize &&
      point.x <= squareX + squareSize &&
      point.y >= squareY - squareSize &&
      point.y <= squareY + squareSize
    );
  };

  // Separate points inside and outside the square
  const pointsInside = data.filter(point => isPointInSquare(point));
  const pointsOutside = data.filter(point => !isPointInSquare(point));

  // Generate the square reference lines
  const squareLines = [
    // Bottom horizontal line
    [
      { x: squareX - squareSize, y: squareY - squareSize },
      { x: squareX + squareSize, y: squareY - squareSize }
    ],
    // Top horizontal line
    [
      { x: squareX - squareSize, y: squareY + squareSize },
      { x: squareX + squareSize, y: squareY + squareSize }
    ],
    // Left vertical line
    [
      { x: squareX - squareSize, y: squareY - squareSize },
      { x: squareX - squareSize, y: squareY + squareSize }
    ],
    // Right vertical line
    [
      { x: squareX + squareSize, y: squareY - squareSize },
      { x: squareX + squareSize, y: squareY + squareSize }
    ]
  ];

  const styles = {
    container: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    fileInput: {
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
      display: 'inline-block'
    },
    sliderContainer: {
      margin: '20px 0',
      padding: '10px',
      backgroundColor: '#f5f5f5',
      borderRadius: '5px'
    },
    slider: {
      width: '100%',
      margin: '10px 0'
    },
    sliderLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '5px'
    },
    stats: {
      textAlign: 'center',
      margin: '10px 0',
      padding: '10px',
      backgroundColor: '#f5f5f5',
      borderRadius: '5px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.fileInput}>
        <label style={styles.label}>
          Choose CSV File
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <div style={styles.sliderContainer}>
        <div style={styles.sliderLabel}>
          <span>X Position: {squareX.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min={dataRange.xMin}
          max={dataRange.xMax}
          step={0.1}
          value={squareX}
          onChange={(e) => setSquareX(parseFloat(e.target.value))}
          style={styles.slider}
        />

        <div style={styles.sliderLabel}>
          <span>Y Position: {squareY.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min={dataRange.yMin}
          max={dataRange.yMax}
          step={0.1}
          value={squareY}
          onChange={(e) => setSquareY(parseFloat(e.target.value))}
          style={styles.slider}
        />
      </div>

      {data.length > 0 && (
        <>
          <div style={styles.stats}>
            Points inside square: {pointsInside.length} / {data.length}
          </div>

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
                <XAxis type="number" dataKey="x" domain={['auto', 'auto']} />
                <YAxis type="number" dataKey="y" domain={['auto', 'auto']} />
                <Tooltip />

                {/* Points outside the square (blue) */}
                <Scatter data={pointsOutside} fill="#4a90e2" />

                {/* Points inside the square (green) */}
                <Scatter data={pointsInside} fill="#4CAF50" />

                {/* Draw the square */}
                {squareLines.map((line, index) => (
                  <ReferenceLine
                    key={index}
                    segment={line}
                    stroke="red"
                    strokeWidth={2}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default ScatterPlotComponent;