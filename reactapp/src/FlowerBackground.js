import React, { useEffect, useState } from 'react';
import flower1 from './f1.png';
import flower2 from './f2.png';
import flower3 from './f3.png';
import './FlowerBackground.css';

const FlowerBackground = () => {
  const flowers = [flower1, flower2, flower3];
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const generateRandomPosition = () => ({
      top: `${Math.random() * 100}vh`,
      left: `${Math.random() * 100}vw`,
    });

    const newPositions = Array.from({ length: 10 }, () => generateRandomPosition());
    setPositions(newPositions);
  }, []);

  return (
    <div className="flower-background">
      {positions.map((position, index) => (
        <img
          key={index}
          src={flowers[index % flowers.length]}
          alt="Flower"
          className="flower-image"
          style={{
            top: position.top,
            left: position.left,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FlowerBackground;
