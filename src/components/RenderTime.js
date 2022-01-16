export function RenderTime({ time }) {
    return (<div className="stopwatch__numbers">
      <span className="stopwatch__number">{('0' + Math.floor((time / (1000 * 60 * 60)) % 24)).slice(-2)}&nbsp;:&nbsp;</span>
      <span className="stopwatch__number">{('0' + Math.floor(time / 6000)).slice(-2)}&nbsp;:&nbsp;</span>
      <span className="stopwatch__number">{('0' + Math.floor((time / 100) % 60)).slice(-2)}</span>
    </div>)
}
