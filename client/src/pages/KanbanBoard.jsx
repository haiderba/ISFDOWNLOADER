import { useState, useEffect } from 'react';
import { LayoutDashboard, Plus, Trash2 } from 'lucide-react';

const initialData = {
  todo: [{ id: '1', content: 'Brainstorm new features' }, { id: '2', content: 'Check analytics' }],
  inProgress: [{ id: '3', content: 'Migrate to mobile layout' }],
  done: [{ id: '4', content: 'Implement Phase 4' }]
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialData);
  const [draggedItem, setDraggedItem] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');

  // Local Storage Sync
  useEffect(() => {
    const saved = localStorage.getItem('isfvd_kanban');
    if (saved) {
      try {
        setColumns(JSON.parse(saved));
      } catch(e) {}
    }
  }, []);

  const updateAndSave = (newCols) => {
    setColumns(newCols);
    localStorage.setItem('isfvd_kanban', JSON.stringify(newCols));
  };

  // Drag Handlers
  const handleDragStart = (e, item, sourceCol) => {
    setDraggedItem({ ...item, sourceCol });
    e.dataTransfer.effectAllowed = 'move';
    // Small delay to make dragged element look standard
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // necessary to allow drop
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetCol) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem.sourceCol === targetCol) return; // dropped in same column

    // Remove from source
    const sourceItems = columns[draggedItem.sourceCol].filter(i => i.id !== draggedItem.id);
    
    // Add to target
    const targetItems = [...columns[targetCol], { id: draggedItem.id, content: draggedItem.content }];

    updateAndSave({
      ...columns,
      [draggedItem.sourceCol]: sourceItems,
      [targetCol]: targetItems
    });
  };

  // Add Task
  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newItem = { id: Date.now().toString(), content: newTaskText };
    updateAndSave({
      ...columns,
      todo: [newItem, ...columns.todo]
    });
    setNewTaskText('');
  };

  // Delete Task
  const deleteTask = (colKey, id) => {
    const filtered = columns[colKey].filter(i => i.id !== id);
    updateAndSave({ ...columns, [colKey]: filtered });
  };

  return (
    <div className="page-container" style={{maxWidth: '1200px'}}>
      <header className="page-header" style={{textAlign: 'center', marginBottom: '2rem'}}>
        <h1><LayoutDashboard style={{display: 'inline', marginRight: '10px'}} /> Local Kanban Board</h1>
        <p className="subtitle">Drag and drop tasks. Everything saves instantly to your browser storage.</p>
      </header>

      {/* Add Task Form */}
      <form onSubmit={addTask} style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
        <input 
          type="text" 
          value={newTaskText} 
          onChange={e => setNewTaskText(e.target.value)}
          placeholder="What needs to be done?" 
          className="search-input" 
          style={{flex: 1, background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px'}}
        />
        <button type="submit" className="btn" style={{padding: '0.8rem 1.5rem', borderRadius: '12px'}}><Plus size={20} /> Add Task</button>
      </form>

      {/* Board Grid */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
        
        {/* Helper function to render a column */}
        {[
          { key: 'todo', title: 'To Do', color: '#3b82f6' },
          { key: 'inProgress', title: 'In Progress', color: '#f59e0b' },
          { key: 'done', title: 'Done', color: '#10b981' }
        ].map(column => (
          
          <div 
            key={column.key}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.key)}
            className="result-card" 
            style={{padding: '1.5rem', minHeight: '500px', display: 'flex', flexDirection: 'column', background: 'rgba(0,0,0,0.2)'}}
          >
            <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1'}}>
              <div style={{width: '12px', height: '12px', borderRadius: '50%', background: column.color}}></div>
              {column.title} <span style={{background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.8rem'}}>{columns[column.key].length}</span>
            </h3>

            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1}}>
              {columns[column.key].map(item => (
                <div 
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, column.key)}
                  onDragEnd={handleDragEnd}
                  style={{
                    background: 'var(--card-bg)', padding: '1rem', borderRadius: '8px', 
                    border: '1px solid var(--card-border)', cursor: 'grab',
                    display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                  }}
                >
                  <p style={{margin: 0, fontSize: '0.95rem', lineHeight: '1.4', color: '#f8fafc', flex: 1, wordBreak: 'break-word'}}>{item.content}</p>
                  <button onClick={() => deleteTask(column.key, item.id)} style={{background: 'none', border: 'none', color: '#64748b', cursor: 'pointer'}}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {columns[column.key].length === 0 && (
                <div style={{textAlign: 'center', padding: '2rem', color: '#475569', border: '2px dashed rgba(255,255,255,0.05)', borderRadius: '8px', flex: 1}}>
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default KanbanBoard;
