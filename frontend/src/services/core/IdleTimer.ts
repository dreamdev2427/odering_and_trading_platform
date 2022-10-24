import { add } from 'date-fns';

class IdleTimer {
  timeout: number; // expire after 10 minutes

  onTimeout: () => void;

  timeoutTracker?: NodeJS.Timeout;

  interval?: NodeJS.Timeout;

  constructor({ timeout, onTimeout, onExpired }: { timeout: number; onTimeout: () => void; onExpired: () => void }) {
    this.timeout = timeout;
    this.onTimeout = onTimeout;

    const time = localStorage.getItem('_expiredTime');

    if (time) {
      const expiredTime = new Date(time);
      if (expiredTime.getTime() < Date.now()) {
        onExpired(); // do something if expired on load
        return;
      }
    }

    this.tracker();
    this.startInterval();
  }

  startInterval(): void {
    this.updateExpiredTime();

    this.interval = setInterval(() => {
      const time = localStorage.getItem('_expiredTime');

      if (time) {
        const expiredTime = new Date(time);
        if (expiredTime.getTime() < Date.now() && this.onTimeout) {
          this.onTimeout();
          this.cleanUp();
        }
      }
    }, 1000);
  }

  updateExpiredTime(): void {
    if (this.timeoutTracker) {
      clearTimeout(this.timeoutTracker);
    }
    this.timeoutTracker = setTimeout(() => {
      const expiredTime = add(Date.now(), { minutes: this.timeout }).toISOString();
      localStorage.setItem('_expiredTime', expiredTime);
    }, 300);
  }

  tracker(): void {
    window.addEventListener('mousemove', () => this.updateExpiredTime());
    window.addEventListener('scroll', () => this.updateExpiredTime());
    window.addEventListener('keydown', () => this.updateExpiredTime());
  }

  cleanUp(): void {
    localStorage.removeItem('_expiredTime');
    if (this.interval) {
      clearInterval(this.interval);
    }
    window.removeEventListener('mousemove', () => this.updateExpiredTime());
    window.removeEventListener('scroll', () => this.updateExpiredTime());
    window.removeEventListener('keydown', () => this.updateExpiredTime());
  }
}

export default IdleTimer;
