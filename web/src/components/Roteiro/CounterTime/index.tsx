import React, { useState, useEffect, useCallback, memo } from 'react'

import { Container, Button, IconAddAlarm, IconAlarmOff } from './styles';

interface Props {
  duration: number;
  counterTime: number;
  setCounterTime: Function;
}

const CounterTime: React.FC<Props> = ({
  duration,
  counterTime,
  setCounterTime,
}) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (Number(counterTime) === 0) {
      setSelected(false);
    }
  }, [counterTime]);

  const handleCounterDuration = useCallback((duration: number) => {
    if (selected) {
      const result = Number(counterTime) - Number(duration);

      setSelected(!selected);
      setCounterTime(result);
    } else {
      const result = Number(counterTime) + Number(duration);

      setSelected(!selected);
      setCounterTime(result);
    }
  }, [counterTime, selected, setCounterTime]);

  return (
    <Container>
      <Button
        type="button"
        onClick={() => handleCounterDuration(duration)}>
        {!selected ? (
          <IconAddAlarm />
          ) : (
            <IconAlarmOff />
          )}
      </Button>
    </Container>
  );
}

export default memo(CounterTime);
