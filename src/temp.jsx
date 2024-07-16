// App.jsx
import { useEffect, useState, useRef } from 'react';
import './App.css';
import ColorBox from './Components/ColorBox';
import ResultColorBox from './Components/ResultColorBox';

function App() {
  const [count, setCount] = useState(10);
  const [isMounted, setIsMounted] = useState(false);
  const changeColorRef = useRef(null);

  useEffect(() => {
    if (isMounted) {
      const timer = setInterval(() => {
        setCount(prevCount => {
          if (prevCount <= 0) {
            if (changeColorRef.current && typeof changeColorRef.current.changeColor === 'function') {
              changeColorRef.current.changeColor(); // Call the function to change the color
            }
            return 10;
          }
          return prevCount - 1;
        });
      }, 1000);

      // Cleanup interval on component unmount
      return () => clearInterval(timer);
    }
  }, [isMounted]);

  return (
    <>
      <h1>Color Prediction Game</h1>
      <div className="container">
        <h2>Choose color Blue or Red or Violet</h2>
        <section>
          <ColorBox color="blue" />
          <ColorBox color="red" />
          <ColorBox color="violet" />
        </section>

        <section>
          <h2>Result</h2>
          <span className="time">{count}</span>
        </section>
        <section>
          <ResultColorBox ref={changeColorRef} setIsMounted={setIsMounted} />
          <div className="resultShow"></div>
        </section>
      </div>
    </>
  );
}

export default App;

// ResultColor Box
