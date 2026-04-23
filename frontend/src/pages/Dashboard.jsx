import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { 
  BookOpen, Briefcase, Coffee, Plus, CheckCircle, Circle, 
  Trash2, Loader2, Calendar, Bell, TrendingUp, AlertTriangle, Filter
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All'); // All, Pending, Completed
  
  const [newTask, setNewTask] = useState({ title: '', type: 'Study', priority: 'Medium' });
  const [newRoutine, setNewRoutine] = useState({ title: '', scheduled_time: '', end_time: '', day_of_week: 'Monday' });

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      setTasks(res.data.data);
    } catch (err) { console.error('Error fetching tasks:', err); }
  };

  const fetchRoutines = async () => {
    try {
      const res = await axios.get('/api/routines', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      setRoutines(res.data.data);
    } catch (err) { console.error('Error fetching routines:', err); }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchTasks(), fetchRoutines()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Stats Calculation for "Catching Up"
  const stats = useMemo(() => {
    const totalItems = tasks.length + routines.length;
    const completedItems = tasks.filter(t => t.status === 'Completed').length + routines.filter(r => Number(r.status) === 1).length;
    const pendingHigh = tasks.filter(t => t.status === 'Pending' && t.priority === 'High').length;
    const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    
    return { totalItems, completedItems, pendingHigh, progress };
  }, [tasks, routines]);

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Pending') return t.status === 'Pending';
    if (filter === 'Completed') return t.status === 'Completed';
    return true;
  });

  const filteredRoutines = routines.filter(r => {
    const isCompleted = Number(r.status) === 1;
    if (filter === 'Pending') return !isCompleted;
    if (filter === 'Completed') return isCompleted;
    return true;
  });

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tasks', newTask, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      fetchTasks();
      setNewTask({ title: '', type: 'Study', priority: 'Medium' });
    } catch (err) { console.error('Error creating task:', err); }
  };

  const handleToggleTask = async (task) => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    try {
      await axios.put(`/api/tasks/${task.id}`, { status: newStatus }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      fetchTasks();
    } catch (err) { console.error('Error updating task:', err); }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await axios.delete(`/api/tasks/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      fetchTasks();
    } catch (err) { console.error('Error deleting task:', err); }
  }

  const handleCreateRoutine = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/routines', newRoutine, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      fetchRoutines();
      setNewRoutine({ title: '', scheduled_time: '', end_time: '', day_of_week: 'Monday' });
    } catch (err) { console.error('Error creating routine:', err); }
  };

  const handleToggleRoutine = async (routine) => {
    try {
      await axios.put(`/api/routines/${routine.id}`, { status: !routine.status }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      fetchRoutines();
    } catch (err) { console.error('Error updating routine:', err); }
  };

  const handleDeleteRoutine = async (id) => {
    if (!window.confirm('Delete this routine?')) return;
    try {
      await axios.delete(`/api/routines/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }});
      fetchRoutines();
    } catch (err) { console.error('Error deleting routine:', err); }
  };

  if (loading) {
    return (
      <div className="auth-container">
        <Loader2 className="spinner" size={48} color="var(--primary)" />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Smart Reminder Bar */}
      {stats.pendingHigh > 0 && (
        <div className="reminder-banner pulse">
          <Bell className="banner-icon" />
          <span><strong>Action Required:</strong> You have {stats.pendingHigh} high-priority tasks. Let's tackle them first!</span>
        </div>
      )}

      <header className="dashboard-header">
        <div className="header-text">
          <h1>Welcome Back, <span>{user?.name}</span> 👋</h1>
          <p>You've completed {stats.progress}% of today's goals.</p>
        </div>
        <div className="header-stats">
          <div className="motivation-card">
            <TrendingUp size={16} />
            <span>Consistency is Key!</span>
          </div>
          <div className="stat-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className="circle" strokeDasharray={`${stats.progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <text x="18" y="20.35" className="percentage">{stats.progress}%</text>
            </svg>
          </div>
        </div>
      </header>

      {/* Quick Filters */}
      <div className="dashboard-filters">
        <Filter size={18} />
        {['All', 'Pending', 'Completed'].map(f => (
          <button 
            key={f} 
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid-layout">
        
        {/* Tasks Section */}
        <section className="dashboard-card tasks-section">
          <div className="card-header">
            <BookOpen className="header-icon" />
            <h2>Task Schedule</h2>
          </div>
          
          <form onSubmit={handleCreateTask} className="add-form">
            <input 
              type="text" 
              placeholder="Add task details..." 
              value={newTask.title} 
              onChange={e => setNewTask({...newTask, title: e.target.value})}
              required
            />
            <select value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})}>
              <option value="Low">Low</option>
              <option value="Medium">Med</option>
              <option value="High">High</option>
            </select>
            <button type="submit"><Plus size={20} /></button>
          </form>

          <div className="item-list">
            {filteredTasks.map(task => (
              <div key={task.id} className={`list-item ${task.status === 'Completed' ? 'completed' : ''} priority-${task.priority.toLowerCase()}`}>
                <div className="item-content" onClick={() => handleToggleTask(task)}>
                  {task.status === 'Completed' ? <CheckCircle className="check-icon" /> : <Circle className="circle-icon" />}
                  <div className="item-info">
                    <span className="item-title">{task.title}</span>
                    <div className="item-meta">
                      <span className={`badge badge-${task.type.toLowerCase()}`}>{task.type}</span>
                      <span className={`priority-tag p-${task.priority.toLowerCase()}`}>{task.priority}</span>
                    </div>
                  </div>
                </div>
                <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {filteredTasks.length === 0 && <p className="empty-state">No matching tasks found.</p>}
          </div>
        </section>

        {/* Routines Section */}
        <section className="dashboard-card routines-section">
          <div className="card-header">
            <Coffee className="header-icon" />
            <h2>Routine Management</h2>
          </div>
          
          <form onSubmit={handleCreateRoutine} className="add-form routine-grid-form">
            <div className="form-row main-row">
              <input 
                type="text" 
                placeholder="Shift/Habit name..." 
                value={newRoutine.title} 
                onChange={e => setNewRoutine({...newRoutine, title: e.target.value})}
                required
              />
              <select value={newRoutine.day_of_week} onChange={e => setNewRoutine({...newRoutine, day_of_week: e.target.value})}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="form-row time-row">
              <div className="time-input">
                <label>Start</label>
                <input 
                  type="time" 
                  value={newRoutine.scheduled_time} 
                  onChange={e => setNewRoutine({...newRoutine, scheduled_time: e.target.value})}
                  required
                />
              </div>
              <div className="time-input">
                <label>End</label>
                <input 
                  type="time" 
                  value={newRoutine.end_time} 
                  onChange={e => setNewRoutine({...newRoutine, end_time: e.target.value})}
                />
              </div>
              <button type="submit"><Plus size={20} /></button>
            </div>
          </form>

          <div className="item-list">
            {filteredRoutines.map(routine => {
              const isCompleted = Number(routine.status) === 1;
              return (
                <div key={routine.id} className={`list-item ${isCompleted ? 'completed' : ''}`}>
                  <div className="item-content" onClick={() => handleToggleRoutine(routine)}>
                    {isCompleted ? <CheckCircle className="check-icon" /> : <Circle className="circle-icon" />}
                    <div className="item-info">
                      <div className="title-row">
                        <span className="item-title">{routine.title}</span>
                        {routine.day_of_week && <span className="day-tag">{routine.day_of_week}</span>}
                      </div>
                      <div className="item-meta">
                        <span className="time-badge">
                          {routine.scheduled_time.substring(0, 5)}
                          {routine.end_time ? ` - ${routine.end_time.substring(0, 5)}` : ''}
                        </span>
                        {!isCompleted && <span className="due-soon">Upcoming</span>}
                      </div>
                    </div>
                  </div>
                  <button className="delete-btn" onClick={() => handleDeleteRoutine(routine.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
            {filteredRoutines.length === 0 && <p className="empty-state">No matching routines.</p>}
          </div>
        </section>

      </div>
    </div>
  );
}
