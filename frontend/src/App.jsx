import Navbar from './components/Navbar';
import Card from './components/Card';
import './App.css';

function App() {
  return (
    <>
      <div className="app-container">
        <Navbar />
        <main className="container">
          <h1>Student Life Dashboard</h1>
          <div className="card-grid">
            <Card 
              title="Study Tasks" 
              description="Manage your assignments and exam prep." 
              buttonText="Manage Tasks"
            />
            <Card 
              title="Work Tasks" 
              description="Keep track of your part-time job duties." 
              buttonText="Manage Work"
            />
            <Card 
              title="Self-Care" 
              description="Daily routines: meals, breaks, and exercise." 
              buttonText="Manage routines"
            />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
