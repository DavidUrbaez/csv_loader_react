import React, { useState } from 'react';
import Papa from 'papaparse';

const SimpleCSVLoader = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setError(null);

    if (file) {
      if (file.type !== 'text/csv') {
        setError('Please upload a valid CSV file');
        return;
      }

      Papa.parse(file, {
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            setHeaders(results.meta.fields || Object.keys(results.data[0]));
            setData(results.data);
          } else {
            setError('No data found in the CSV file');
          }
        },
        header: true,
        skipEmptyLines: true,
        error: (error) => {
          setError(`Error parsing CSV: ${error.message}`);
        }
      });
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="mb-4"
        />
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-500 bg-red-100 rounded">
          {error}
        </div>
      )}

      {data.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="border p-2 bg-gray-100">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 5).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`} className="border p-2">
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 text-gray-600">
            Showing first 5 rows of {data.length} total rows
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleCSVLoader;