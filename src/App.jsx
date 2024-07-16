import { useEffect, useState, useRef } from 'react';
import './App.css';
import ColorBox from './Components/ColorBox';
import ResultColorBox from './Components/ResultColorBox';
import background from './assets/choose.png';

function App() {
  const [count, setCount] = useState(10);
  const [isMounted, setIsMounted] = useState(false);
  const [activeBox, setActiveBox] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null); // Track the selected color
  const [result, setResult] = useState('Please Select the Color'); // Track the result
  const changeColorRef = useRef(null);

  const handleBoxClick = (color) => {
    setSelectedColor(color);
    setActiveBox(color);
  };

  useEffect(() => {
    if (isMounted) {
      const timer = setInterval(() => {
        setCount(prevCount => {
          if (prevCount <= 0) {
            if (changeColorRef.current && typeof changeColorRef.current.changeColor === 'function') {
              const randomColor = changeColorRef.current.changeColor(); // Call the function to change the color and get the new color
              setActiveBox(null); // clear the background
              // Compare the selected color with the random color
              if(selectedColor){
                if (selectedColor === randomColor) {
                  setResult('Win the Match');
                } else {
                  setResult('Lose the Match');
                }
                setSelectedColor(null);
              }else{
                
                setResult('Please Select the Color again...');
              }
              
            }
            return 10;
          }
          return prevCount - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isMounted, selectedColor]);

  return (
    <>
      <h1>Color Prediction Game</h1>
      <div className="container">
        <h2>Choose color Blue or Red or Violet</h2>
        <section>
          {['blue', 'red', 'violet'].map((color, index) => (
            <ColorBox
              key={index}
              color={color}
              hasBackgroundImage={activeBox === color ? background : null}
              onClick={() => handleBoxClick(color)}
            />
          ))}
        </section>

        <section>
          <h2>Result</h2>
          <span className="time">{count}</span>
        </section>
        <section>
          <ResultColorBox ref={changeColorRef} setIsMounted={setIsMounted} />
          <div className="resultShow">{result}</div>
        </section>
        
      </div>
      <section>
          <div className="developer">
          <a href="https://www.linkedin.com/in/pravesh-mishra-42802b222/" target="_blank" rel="noopener noreferrer">
            Pravesh Mishra
          </a>
          </div>
        </section>
    </>
  );
}

export default App;
