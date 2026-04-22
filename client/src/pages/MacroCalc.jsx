import { useState } from 'react';
import { Activity } from 'lucide-react';

const MacroCalc = () => {
  const [data, setData] = useState({
    gender: 'male',
    age: 25,
    weight: 75,
    height: 175,
    activity: 1.55,
    goal: 'maintain'
  });

  const [results, setResults] = useState(null);

  const calculateMacros = () => {
    // Mifflin-St Jeor Equation
    let bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age;
    bmr += (data.gender === 'male' ? 5 : -161);

    // TDEE (Maintenance Calories)
    let tdee = bmr * data.activity;

    // Apply Goal Caloric Deficit/Surplus
    let targetCalories = tdee;
    if (data.goal === 'cut') targetCalories -= 500;
    if (data.goal === 'bulk') targetCalories += 500;

    // Macros standard bodybuilder split
    // Protein: 2.2g per kg of bodyweight
    const protein = data.weight * 2.2;
    // Fat: 25% of total calories (9 calories per gram)
    const fat = (targetCalories * 0.25) / 9;
    // Carbs: The rest of the calories (4 calories per gram)
    const carbs = (targetCalories - (protein * 4) - (fat * 9)) / 4;

    setResults({
      calories: Math.round(targetCalories),
      protein: Math.round(protein),
      fat: Math.round(fat),
      carbs: Math.round(carbs)
    });
  };

  return (
    <div className="page-container" style={{maxWidth: '900px'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><Activity style={{display: 'inline', marginRight: '10px'}} /> Macro & Diet Calculator</h1>
        <p className="subtitle">Get a scientifically accurate breakdown of your daily caloric and macronutrient needs.</p>
      </header>

      <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
        
        {/* Input Form */}
        <div className="result-card" style={{flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem'}}>
          
          <div style={{display: 'flex', gap: '1rem'}}>
             <div style={{flex: 1}}>
               <label style={{color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block'}}>Gender</label>
               <select className="search-input" value={data.gender} onChange={e => setData({...data, gender: e.target.value})} style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.5rem'}}>
                 <option value="male">Male</option>
                 <option value="female">Female</option>
               </select>
             </div>
             <div style={{flex: 1}}>
               <label style={{color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block'}}>Age</label>
               <input type="number" value={data.age} onChange={e => setData({...data, age: Number(e.target.value)})} className="search-input" style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.5rem'}} />
             </div>
          </div>

          <div style={{display: 'flex', gap: '1rem'}}>
             <div style={{flex: 1}}>
               <label style={{color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block'}}>Weight (kg)</label>
               <input type="number" value={data.weight} onChange={e => setData({...data, weight: Number(e.target.value)})} className="search-input" style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.5rem'}} />
             </div>
             <div style={{flex: 1}}>
               <label style={{color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block'}}>Height (cm)</label>
               <input type="number" value={data.height} onChange={e => setData({...data, height: Number(e.target.value)})} className="search-input" style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.5rem'}} />
             </div>
          </div>

          <div>
            <label style={{color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block'}}>Activity Level</label>
            <select className="search-input" value={data.activity} onChange={e => setData({...data, activity: Number(e.target.value)})} style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.5rem'}}>
              <option value={1.2}>Sedentary (Office Job)</option>
              <option value={1.375}>Lightly Active (1-2 days/week)</option>
              <option value={1.55}>Moderately Active (3-5 days/week)</option>
              <option value={1.725}>Very Active (6-7 days/week)</option>
            </select>
          </div>

          <div>
            <label style={{color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block'}}>Goal</label>
            <select className="search-input" value={data.goal} onChange={e => setData({...data, goal: e.target.value})} style={{width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', padding: '0.5rem'}}>
              <option value="cut">Lose Weight (Deficit)</option>
              <option value="maintain">Maintain Weight</option>
              <option value="bulk">Build Muscle (Surplus)</option>
            </select>
          </div>

          <button onClick={calculateMacros} className="btn" style={{marginTop: '1rem', width: '100%'}}>Calculate Macros</button>

        </div>

        {/* Results Screen */}
        <div style={{flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column'}}>
           {results ? (
             <div className="result-card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', background: 'linear-gradient(145deg, #1e293b, #0f172a)'}}>
                
                <div style={{textAlign: 'center'}}>
                  <div style={{color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Daily Calories</div>
                  <div style={{fontSize: '3.5rem', fontWeight: 'bold', color: '#10b981', lineHeight: '1'}}>{results.calories}</div>
                  <div style={{color: '#64748b', fontSize: '0.85rem', marginTop: '0.5rem'}}>kcals per day</div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, justifyContent: 'center'}}>
                  <div style={{background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '1rem 1.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{color: '#3b82f6', fontWeight: 'bold', fontSize: '1.2rem'}}>Protein</span>
                    <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'white'}}>{results.protein}g</span>
                  </div>
                  
                  <div style={{background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.2)', padding: '1rem 1.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{color: '#eab308', fontWeight: 'bold', fontSize: '1.2rem'}}>Carbs</span>
                    <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'white'}}>{results.carbs}g</span>
                  </div>

                  <div style={{background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem 1.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{color: '#ef4444', fontWeight: 'bold', fontSize: '1.2rem'}}>Fats</span>
                    <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'white'}}>{results.fat}g</span>
                  </div>
                </div>

             </div>
           ) : (
             <div className="result-card" style={{padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#64748b', fontSize: '1.1rem', textAlign: 'center'}}>
               Enter your physical data and click calculate to see your macro targets.
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default MacroCalc;
