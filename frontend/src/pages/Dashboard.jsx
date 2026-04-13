import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, Briefcase, Coffee, Plus, CheckCircle, Circle, Trash2, Loader2, Calendar } from 'lucide-react';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [newTask, setNewTask] = useState({ title: '', type: 'Study', priority: 'Medium' });
  const [newRoutine, setNewRoutine] = useState({ title: '', scheduled_time: '' });

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
      setNewRoutine({ title: '', scheduled_time: '' });
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
      <header className="dashboard-header">
        <h1>Welcome Back, <span>{user?.name}</span> 👋</h1>
        <p>Here's what your day looks like.</p>
      </header>

      <div className="grid-layout">
        
        {/* Tasks Section */}
        <section className="dashboard-card tasks-section">
          <div className="card-header">
            <BookOpen className="header-icon" />
            <h2>Your Tasks</h2>
          </div>
          
          <form onSubmit={handleCreateTask} className="add-form">
            <input 
              type="text" 
              placeholder="What do you need to do?" 
              value={newTask.title} 
              onChange={e => setNewTask({...newTask, title: e.target.value})}
              required
            />
            <select value={newTask.type} onChange={e => setNewTask({...newTask, type: e.target.value})}>
              <option value="Study">Study</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
            </select>
            <button type="submit"><Plus size={20} /></button>
          </form>

          <div className="item-list">
            {tasks.map(task => (
              <div key={task.id} className={`list-item ${task.status === 'Completed' ? 'completed' : ''}`}>
                <div className="item-content" onClick={() => handleToggleTask(task)}>
                  {task.status === 'Completed' ? <CheckCircle className="check-icon" /> : <Circle className="circle-icon" />}
                  <div className="item-info">
                    <span className="item-title">{task.title}</span>
                    <div className="item-meta">
                      <span className={`badge badge-${task.type.toLowerCase()}`}>{task.type}</span>
                    </div>
                  </div>
                </div>
                <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {tasks.length === 0 && <p className="empty-state">No tasks pending. You're all caught up!</p>}
          </div>
        </section>

        {/* Routines Section */}
        <section className="dashboard-card routines-section">
          <div className="card-header">
            <Coffee className="header-icon" />
            <h2>Daily Routines</h2>
          </div>
          
          <form onSubmit={handleCreateRoutine} className="add-form">
            <input 
              type="text" 
              placeholder="E.g. Morning Coffee" 
              value={newRoutine.title} 
              onChange={e => setNewRoutine({...newRoutine, title: e.target.value})}
              required
            />
            <input 
              type="time" 
              value={newRoutine.scheduled_time} 
              onChange={e => setNewRoutine({...newRoutine, scheduled_time: e.target.value})}
              required
            />
            <button type="submit"><Plus size={20} /></button>
          </form>

          <div className="item-list">
            {routines.map(routine => (
              <div key={routine.id} className={`list-item ${routine.status ? 'completed' : ''}`}>
                <div className="item-content" onClick={() => handleToggleRoutine(routine)}>
                  {routine.status ? <CheckCircle className="check-icon" /> : <Circle className="circle-icon" />}
                  <div className="item-info">
                    <span className="item-title">{routine.title}</span>
                    <span className="time-badge">{routine.scheduled_time.substring(0, 5)}</span>
                  </div>
                </div>
                <button className="delete-btn" onClick={() => handleDeleteRoutine(routine.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {routines.length === 0 && <p className="empty-state">No routines set for today.</p>}
          </div>
        </section>

      </div>
    </div>
  );
}

