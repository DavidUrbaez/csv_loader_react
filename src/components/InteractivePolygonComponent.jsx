import React, { useState, useEffect } from 'react';
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

const InteractivePolygonComponent = () => {
  const [polygonParams, setPolygonParams] = useState({
    numPoints: 5,
    radius: 2,
    centerX: 3,
    centerY: 3,
    rotation: 0
  });
  const [points, setPoints] = useState([]);

  // This is the JavaScript version of the Python polygon generation function
  const generatePolygonPoints = (params) => {
    const { numPoints, radius, centerX, centerY, rotation } = params;
    const points = [];
    
    for (let i = 0; i < numPoints; i++) {
      // Convert rotation to radians and add to the angle
      const angle = (i * 2 * Math.PI / numPoints) + (rotation * Math.PI / 180);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      points.push({ x, y });
    }
    
    return points;
  };

  // Update points when parameters change
  useEffect(() => {
    const newPoints = generatePolygonPoints(polygonParams);
    setPoints(newPoints);
  }, [polygonParams]);

  // Create line segments for the polygon
  const createPolygonLines = () => {
    if (points.length < 2) return [];
    
    const lines = [];
    for (let i = 0; i < points.length; i++) {
      const nextIndex = (i + 1) % points.length;
      lines.push([
        { x: points[i].x, y: points[i].y },
        { x: points[nextIndex].x, y: points[nextIndex].y }
      ]);
    }
    return lines;
  };

  const styles = {
    container: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
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
    }
  };

  const renderSlider = (param, label, min, max, step) => (
    <div key={param} style={styles.sliderContainer}>
      <div style={styles.sliderLabel}>
        <span>{label}: {polygonParams[param].toFixed(1)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={polygonParams[param]}
        onChange={(e) => setPolygonParams({
          ...polygonParams,
          [param]: parseFloat(e.target.value)
        })}
        style={styles.slider}
      />
    </div>
  );

  return (
    <div style={styles.container}>
      {/* Sliders for all parameters */}
      {renderSlider('numPoints', 'Number of Points', 3, 12, 1)}
      {renderSlider('radius', 'Radius', 0.5, 5, 0.1)}
      {renderSlider('centerX', 'Center X', -5, 5, 0.1)}
      {renderSlider('centerY', 'Center Y', -5, 5, 0.1)}
      {renderSlider('rotation', 'Rotation (degrees)', 0, 360, 1)}

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
            <XAxis 
              type="number" 
              dataKey="x" 
              domain={[-6, 6]} 
              ticks={[-6, -4, -2, 0, 2, 4, 6]}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              domain={[-6, 6]}
              ticks={[-6, -4, -2, 0, 2, 4, 6]}
            />
            <Tooltip />
            
            {/* Plot the vertices */}
            <Scatter 
              data={points} 
              fill="#4a90e2"
              name="Vertex"
            />
            
            {/* Draw the polygon edges */}
            {createPolygonLines().map((line, index) => (
              <ReferenceLine
                key={index}
                segment={line}
                stroke="#4a90e2"
                strokeWidth={2}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InteractivePolygonComponent;