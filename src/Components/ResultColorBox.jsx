import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';

const ResultColorBox = forwardRef((props, ref) => {
  const [color, setColor] = useState('');

  const getRandomColor = () => {
    const colors = ["red", "blue", "violet"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const changeColor = () => {
    const newColor = getRandomColor();
    setColor(newColor);
    return newColor; // Return the new color
  };

  useImperativeHandle(ref, () => ({
    changeColor
  }));

  useEffect(() => {
    props.setIsMounted(true);
  }, [props]);

  return (
    <div className={`box result ${color}`}>
      {/* Content */}
    </div>
  );
});

export default ResultColorBox;
