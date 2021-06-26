import { useEffect, useState, useRef } from 'react';
import './App.css';
import { getRandomShape, SHAPES } from './helper';
import Row from './components/Row';

const { HORIZONTAL_LINE, VERTICAL_LINE, BOX } = SHAPES;

const ROWS = Array.from(Array(17).keys());
const COLS = Array.from(Array(19).keys());

function App() {
  const firstRowRef = useRef(null);
  const secondRowRef = useRef(null);

  const [activeRow, setActiveRow] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const prevElement = usePrevious(activeRow);

  useEffect(() => {
    setRowCount(rowCount + 1);
  }, [activeRow]);

  useEffect(() => {
    attachRef();
  }, [rowCount]);

  const attachRef = () => {
    console.log('PreviousRow  = ', prevElement);
    console.log('ActiveRow  = ', activeRow);

    if (activeRow !== prevElement) {
      const element = document.getElementById(`row-${rowCount}`);
      if (element) {
        console.log('element = ', element);
        setActiveRow(element);
      }
    }
  };

  useEffect(() => {
    if (rowCount === 0) {
      const timeInterval = setInterval(() => {
        attachRef();
      }, 1000);
      setIntervalId(timeInterval);
    }
    return () => {
      clearInterval();
    };
  }, [intervalId]);

  // useEffect(() => {
  //   let rowElement = firstRowRef.current;
  //   const shape = getRandomShape();
  //   console.log('SHAPE = ', shape);
  //   if (shape === HORIZONTAL_LINE) {
  //     rowElement.children[7].style.backgroundColor = 'blue';
  //     rowElement.children[8].style.backgroundColor = 'blue';
  //     rowElement.children[9].style.backgroundColor = 'blue';
  //     rowElement.children[10].style.backgroundColor = 'blue';
  //     rowElement.children[11].style.backgroundColor = 'blue';
  //   }
  // }, [firstRowRef]);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  return (
    <div className="App">
      <div className="container">
        <div className="game-layout">
          Game Layout
          <div className="game-container">
            {ROWS.map((item, index) => (
              <Row key={`row-${index}`} cols={COLS} id={`row-${index}`} />
            ))}
          </div>
        </div>
        <div className="score-layout">Score Layout</div>
      </div>
    </div>
  );
}

export default App;
