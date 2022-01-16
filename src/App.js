import './App.css';
import React, { useState, useEffect } from 'react';
import { interval, Subject } from 'rxjs'
import {takeUntil} from 'rxjs/operators'
import {RenderTime} from './components/RenderTime'

function App() {
  const [time, setTime] = useState(0)
  const [stopwatchStatus, setStopwatchStatus] = useState(false)
  const [isWait, setIsWait] = useState(false)


  useEffect(() => {
    const unsubscribe = new Subject()
    interval(10)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (stopwatchStatus) {
          setTime(prev => prev + 1)
        }
      })
    return () => {
      unsubscribe.next()
      unsubscribe.complete()
    }
  }, [stopwatchStatus])
  
  const handleStart = () => {
    if (isWait) {
      setStopwatchStatus(true)
      return
    }
    setStopwatchStatus(prev => !prev)
  }
  const handleStop = () => {
    if (time !== 0) {
      setStopwatchStatus(prev => !prev)
      setTime(0)
    }
  }
  const handleReset = () => {
    setTime(0)
  }
  const handleWait = () => {
    setStopwatchStatus(false)
    setIsWait(true)
  }

  return (
    <div className="App">
      <h1 className='header'>Stopwatch</h1>
      <RenderTime time={time} />
        <div className="buttons">
          <button onDoubleClick={handleWait} className='stopwatch__btn btn'>Wait</button>
          {stopwatchStatus ? ( <button onClick={handleStop} className='stopwatch__stopBtn btn'>Stop</button>) : (<button onClick={handleStart} className='stopwatch__startBtn btn'>Start</button>) }  
          <button onClick={handleReset} className='stopwatch__btn btn'>Reset</button>
        </div>
    </div>
  );
}

export default App;
