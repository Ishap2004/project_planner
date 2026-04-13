// src/components/Card.jsx
import './Card.css';

/**
 * Reusable card component. 
 * This is great because I can use it 3 times for Study, Work, and Self-Care 
 * without repeating code!
 */
function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{props.title}</h3>
      </div>
      <div className="card-body">
        <p>{props.description}</p>
      </div>
      <button className="card-btn">{props.buttonText || 'View Details'}</button>
    </div>
  );
}

export default Card;
