import Navbar from './components/Navbar';
import Card from './components/Card';
import './App.css';

/**
 * Hi! This is the main App component. 
 * I've set it up to show the Navbar at the top and a grid of cards for the dashboard.
 */
function App() {
  return (
    <div className="app-container">
      {/* Our global navigation bar */}
      <Navbar />

      <main className="container">
        <h1>Student Life Dashboard</h1>
        
        {/* I organized these cards in a grid so they look clean on any screen */}
        <div className="card-grid">
          <Card 
            title="Study Time" 
            description="Manage your assignments, exam prep, and homework in one place." 
            buttonText="Open Tasks"
          />
          <Card 
            title="Job Tasks" 
            description="Keep track of your projects and professional responsibilities." 
            buttonText="Manage Tasks"
          />
          <Card 
            title="Self-Care" 
            description="Don't forget to eat and take breaks! Manage your daily routines here." 
            buttonText="Manage Routines"
          />
        </div>
      </main>
    </div>
  );
}

export default App;
