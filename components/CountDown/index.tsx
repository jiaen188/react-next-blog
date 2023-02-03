import { useEffect, useState } from 'react';

import styles from './index.module.scss';

interface IProps {
  time: number;
  onEnd: Function;
}

const CountDown = ({time, onEnd}: IProps) => {

  const [count, setCount] = useState(time || 60);

  useEffect(() => {
   const times = setInterval(() => {
      setCount((count) => {
        if (count === 0) {
          clearInterval(times);
          onEnd && onEnd();
          return count;
        }
        return count - 1
      });
    }, 1000);

    return () => {
      clearInterval(times)
    }
  }, [time, onEnd])

  return (
    <div className={styles.countdown}>
      {count}
    </div>
  )
}

export default CountDown;