import { useState, useMemo } from 'react';
import Papa from 'papaparse';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { FileUp, BarChart3, LineChart as LineChartIcon, AreaChart as AreaChartIcon, Settings2, Download, Table as TableIcon } from 'lucide-react';
import ToolHeader from '../components/ToolHeader';

const DataVisualizer = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length > 0) {
          const cols = Object.keys(results.data[0]);
          setData(results.data);
          setHeaders(cols);
          setXAxis(cols[0]);
          setYAxis(cols[1] || cols[0]);
          setError('');
        } else {
          setError('The CSV file appears to be empty or malformed.');
        }
      },
      error: (err) => {
        setError('Error parsing CSV: ' + err.message);
      }
    });
  };

  const chartColors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  const renderChart = () => {
    if (data.length === 0) return null;

    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey={xAxis} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
            <Legend />
            <Line type="monotone" dataKey={yAxis} stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} activeDot={{ r: 8 }} />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey={xAxis} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
            <Legend />
            <Area type="monotone" dataKey={yAxis} stroke="#3b82f6" fillOpacity={1} fill="url(#colorY)" />
          </AreaChart>
        );
      default:
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey={xAxis} stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            <Legend />
            <Bar dataKey={yAxis} fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <div className="page-container">
      <ToolHeader 
        title="Visual Chart Deck" 
        description="Turn your CSV data into professional interactive charts instantly."
      />

      <div style={{ display: 'grid', gridTemplateColumns: data.length > 0 ? '300px 1fr' : '1fr', gap: '2rem' }}>
        
        {/* Controls Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <FileUp size={18} color="#3b82f6" /> Import Data
            </h3>
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleFileUpload} 
              id="csv-upload" 
              style={{ display: 'none' }} 
            />
            <label htmlFor="csv-upload" className="btn secondary" style={{ width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {data.length > 0 ? 'Replace CSV' : 'Select CSV File'}
            </label>
            {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.75rem' }}>{error}</p>}
          </div>

          {data.length > 0 && (
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', color: '#f1f5f9', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Settings2 size={18} color="#3b82f6" /> Chart Settings
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Chart Type</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                    <button onClick={() => setChartType('bar')} className={`btn ${chartType === 'bar' ? 'primary' : 'secondary'}`} style={{ padding: '0.5rem' }} title="Bar Chart"><BarChart3 size={18} /></button>
                    <button onClick={() => setChartType('line')} className={`btn ${chartType === 'line' ? 'primary' : 'secondary'}`} style={{ padding: '0.5rem' }} title="Line Chart"><LineChartIcon size={18} /></button>
                    <button onClick={() => setChartType('area')} className={`btn ${chartType === 'area' ? 'primary' : 'secondary'}`} style={{ padding: '0.5rem' }} title="Area Chart"><AreaChartIcon size={18} /></button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>X-Axis (Label)</label>
                  <select value={xAxis} onChange={(e) => setXAxis(e.target.value)} style={{ width: '100%', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9', padding: '0.5rem', borderRadius: '8px' }}>
                    {headers.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Y-Axis (Value)</label>
                  <select value={yAxis} onChange={(e) => setYAxis(e.target.value)} style={{ width: '100%', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9', padding: '0.5rem', borderRadius: '8px' }}>
                    {headers.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chart View Area */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: '500px', background: '#020617' }}>
          {data.length > 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', color: '#f1f5f9', margin: 0 }}>{yAxis} by {xAxis}</h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '6px' }}>{data.length} Rows</span>
                </div>
              </div>
              <div style={{ flex: 1, minHeight: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart()}
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#3b82f6' }}>
                <TableIcon size={32} />
              </div>
              <h3 style={{ color: '#f1f5f9', marginBottom: '0.5rem' }}>No Data Visualized</h3>
              <p style={{ color: '#64748b', maxWidth: '300px' }}>Upload a CSV file to generate interactive charts and explore your data trends.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DataVisualizer;
