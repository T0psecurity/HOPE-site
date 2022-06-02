import { useEffect, useState } from "react";

const timersfot = () => {
  const [launch, setLaunch] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const target = new Date("03/31/2022 21:00:00");
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m: number = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setLaunch(true)
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="timer-container">
      {launch ? (<div className="launch">Launching now</div>) : (
        <>
          <div className="trade-cryptocurrency-box"
          style={{
            marginTop:"200px",
            width:"fit-content"
          }}>
            <div className="timer-inner">
              <div className="timer-segment">
                <span className="times"> {days}</span>
                <span className="timer-label"> Days </span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="times"> {hours}</span>
                <span className="timer-label"> Hours </span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="times"> {minutes}</span>
                <span className="timer-label"> Minutes </span>
              </div>
              <span className="divider">:</span>
              <div className="timer-segment">
                <span className="times"> {seconds}</span>
                <span className="timer-label"> Seconds </span>
              </div>
            </div>
          </div>
        </>)}
    </div>
  );
};

export default timersfot;
