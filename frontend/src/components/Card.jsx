// src/components/Card.jsx
import './Card.css';

function Card(props) {
  return (
    <>
      <div className="card">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <button>{props.buttonText || 'View Details'}</button>
      </div>
    </>
  );
}

export default Card;
