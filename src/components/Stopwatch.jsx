import React, { useState, useEffect } from 'react';
import image from './images/white-modern-eco-electric-kick-scooter-label-tag-with-free-space-your-design-yellow-red-background-3d-rendering_476612-25294.jpg'
function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const lapReset = () => {
    if (isRunning) {
      setLaps(prevLaps => [...prevLaps, time]);
    } else {
      setTime(0);
      setLaps([]);
    }
  };

  const formatTime = milliseconds => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    const pad = number => (number < 10 ? '0' + number : number);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
  };

  return (
    <div className="text-center mt-8 text-white flex border border-sky-500 p-20"> {/* Added p-4 for padding */}

    <div className='max-w-64 mr-20'>
        <img className='' src={image} alt="" />
    </div>
    <div>
        <h1 className='text-lime-100 text-2xl mb-5'>Here is Your StopWatch</h1>
        <h1 className="text-3xl">{formatTime(time)}</h1>
        <button className="btn px-5 mr-2 bg-green-900 mt-5" onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <button className="btn px-5 ml-2 bg-orange-600" onClick={lapReset}>{isRunning ? 'Lap' : 'Reset'}</button>
        <ul className="mt-4">
            {laps.map((lap, index) => (
                <li key={index}>{formatTime(lap)}</li>
            ))}
        </ul>
    </div>
</div>

  );
}

// function App() {
//   return (
//     <div className="App flex justify-center items-center h-screen">
//       <Stopwatch />
//     </div>
//   );
// }

export default Stopwatch;
