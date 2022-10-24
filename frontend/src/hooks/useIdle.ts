import { useEffect } from 'react';

import IdleTimer from 'services/core/IdleTimer';

const useIdle = ({
  timeout,
  onTimeout,
  onExpired,
}: {
  timeout: number;
  onTimeout: () => void;
  onExpired: () => void;
}) => {
  useEffect(() => {
    if (timeout === 0) {
      return;
    }

    const timer = new IdleTimer({
      timeout,
      onTimeout,
      onExpired,
    });

    return () => {
      timer.cleanUp();
    };
  }, []);
};

export default useIdle;
