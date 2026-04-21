import { useState } from 'react';
import { Database, Download } from 'lucide-react';

const COUNTRIES = {
  US: {
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
    streets: ['Main St', 'Oak St', 'Maple Ave', 'Cedar Ln', 'Elm St', 'Washington Blvd', 'Lakeview Dr', 'River Rd', 'Park Ave', 'Hillside Ct'],
    phonePrefix: '+1',
    phoneFormat: () => `(${Math.floor(200 + Math.random() * 800)}) ${Math.floor(200 + Math.random() * 800)}-${Math.floor(1000 + Math.random() * 9000)}`,
    zipFormat: () => Math.floor(10000 + Math.random() * 90000).toString()
  },
  UK: {
    cities: ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Newcastle', 'Sheffield', 'Liverpool', 'Leeds', 'Bristol', 'Edinburgh'],
    streets: ['High Street', 'Station Road', 'Main Road', 'Park Road', 'Church Road', 'Church Street', 'London Road', 'Victoria Road', 'Green Lane', 'Manor Road'],
    phonePrefix: '+44',
    phoneFormat: () => `7${Math.floor(100 + Math.random() * 900)} ${Math.floor(100000 + Math.random() * 900000)}`,
    zipFormat: () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const c1 = letters[Math.floor(Math.random() * 26)];
      const c2 = letters[Math.floor(Math.random() * 26)];
      const c3 = letters[Math.floor(Math.random() * 26)];
      const c4 = letters[Math.floor(Math.random() * 26)];
      return `${c1}${c2}${Math.floor(1 + Math.random() * 9)} ${Math.floor(1 + Math.random() * 9)}${c3}${c4}`;
    }
  },
  AU: {
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong'],
    streets: ['George St', 'King St', 'Church St', 'Victoria St', 'High St', 'Queen St', 'William St', 'Elizabeth St', 'Albert St', 'Macquarie St'],
    phonePrefix: '+61',
    phoneFormat: () => `4${Math.floor(10 + Math.random() * 90)} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`,
    zipFormat: () => Math.floor(2000 + Math.random() * 8000).toString()
  }
};

const FIRST_NAMES = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];

const DummyDataGen = () => {
  const [country, setCountry] = useState('US');
  const [count, setCount] = useState(10);
  const [data, setData] = useState([]);
  const [format, setFormat] = useState('json');

  const generateData = () => {
    const cData = COUNTRIES[country];
    const generated = [];
    
    for (let i = 0; i < count; i++) {
      const fName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
      const lName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
      const city = cData.cities[Math.floor(Math.random() * cData.cities.length)];
      const street = cData.streets[Math.floor(Math.random() * cData.streets.length)];
      const houseNo = Math.floor(1 + Math.random() * 9999);
      
      const record = {
        id: crypto.randomUUID ? crypto.randomUUID() : `id-${Math.random().toString(36).substr(2, 9)}`,
        name: `${fName} ${lName}`,
        email: `${fName.toLowerCase()}.${lName.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`,
        phone: `${cData.phonePrefix} ${cData.phoneFormat()}`,
        address: `${houseNo} ${street}, ${city}, ${cData.zipFormat()}`,
        country: country
      };
      generated.push(record);
    }
    
    setData(generated);
  };

  const downloadData = () => {
    if (data.length === 0) return;
    
    let content = '';
    let mimeType = '';
    let ext = '';
    
    if (format === 'json') {
      content = JSON.stringify(data, null, 2);
      mimeType = 'application/json';
      ext = 'json';
    } else {
      // CSV
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(obj => 
        Object.values(obj).map(val => `"${val}"`).join(',')
      );
      content = [headers, ...rows].join('\n');
      mimeType = 'text/csv';
      ext = 'csv';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mock_data_${count}_rows.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container" style={{maxWidth: '1000px'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Database style={{display: 'inline', marginRight: '10px'}} /> Dummy Data Generator</h1>
        <p className="subtitle">Generate realistic local user data instantly for database testing.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        
        {/* Controls */}
        <div style={{flex: 1, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Country specific format</label>
              <select className="search-input" value={country} onChange={e => setCountry(e.target.value)} style={{width: '100%', background: 'rgba(0,0,0,0.2)'}}>
                <option value="US">🇺🇸 United States</option>
                <option value="UK">🇬🇧 United Kingdom</option>
                <option value="AU">🇦🇺 Australia</option>
              </select>
            </div>
            
            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Row Count (Max 5000)</label>
              <input type="number" min="1" max="5000" className="search-input" value={count} onChange={e => setCount(Math.min(5000, Math.max(1, parseInt(e.target.value) || 1)))} style={{width: '100%', background: 'rgba(0,0,0,0.2)'}} />
            </div>

            <div>
              <label style={{color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block'}}>Export Format</label>
              <div style={{display: 'flex', gap: '1rem'}}>
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                  <input type="radio" name="format" checked={format === 'json'} onChange={() => setFormat('json')} /> JSON
                </label>
                <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
                  <input type="radio" name="format" checked={format === 'csv'} onChange={() => setFormat('csv')} /> CSV
                </label>
              </div>
            </div>

            <button className="btn" onClick={generateData} style={{marginTop: '1rem', padding: '1rem'}}>Generate Data</button>
            <button className="btn btn-secondary" onClick={downloadData} disabled={data.length === 0} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', padding: '1rem'}}>
              <Download size={18} /> Download Selection
            </button>
          </div>
        </div>

        {/* Preview */}
        <div style={{flex: 2, minWidth: '300px'}}>
          <div className="result-card" style={{padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column'}}>
            <h3 style={{marginBottom: '1rem', color: '#cbd5e1'}}>Preview</h3>
            <div style={{flex: 1, minHeight: '400px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '1rem', overflow: 'auto', border: '1px solid var(--card-border)'}}>
              {data.length > 0 ? (
                <pre style={{margin: 0, color: '#a78bfa', fontFamily: 'monospace', fontSize: '0.85rem'}}>
                  {format === 'json' ? JSON.stringify(data.slice(0, 5), null, 2) : 
                    [
                      Object.keys(data[0]).join(','),
                      ...data.slice(0, 5).map(o => Object.values(o).map(v => `"${v}"`).join(','))
                    ].join('\n')
                  }
                  {data.length > 5 && `\n\n... and ${data.length - 5} more rows.`}
                </pre>
              ) : (
                <p style={{color: '#64748b', textAlign: 'center', marginTop: '4rem'}}>Click generate to view sample data.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DummyDataGen;
