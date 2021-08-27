import { v4 as uuid4 } from 'uuid';

export class ConcurrentTask {
  constructor(
    callback,
    lockTimeout = 3000,
    taskName = callback.name,
    maxAttempts = 3
  ) {
    this.id = uuid4();
    this.lockTimeout = lockTimeout;
    this.callback = callback;
    this.taskName = taskName;
    this.maxAttempts = maxAttempts;
    this.currentAttempt = 0;
    this.exceptionChannel = new BroadcastChannel(
      `${taskName}-channel-exception`
    );
    this.exceptionChannel.onmessage = (ev) => {
      this.error = ev.data; // exception must be stored here due to async callback usage
      // https://stackoverflow.com/questions/3677783/is-it-possible-to-catch-exceptions-thrown-in-a-javascript-async-callback
      this.exceptionChannel.close();
    };
  }

  sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  lock() {
    localStorage[`${this.taskName}.LockExpiration`] =
      new Date().getTime() + this.lockTimeout;
  }

  unlock() {
    localStorage[`${this.taskName}.LockExpiration`] = '';
  }

  onSuccess() {
    // abs method
    return new Promise(() => {});
  }

  onError(error) {
    // abs method
    return new Promise(() => {
      throw error;
    });
  }

  get isFinished() {
    return localStorage[`${this.taskName}.LockExpiration`] === '';
  }

  get isLocked() {
    const timeout =
      parseInt(localStorage[`${this.taskName}.LockExpiration`]) -
      new Date().getTime();
    return timeout >= 0;
  }

  get isFailed() {
    return !this.isFinished && !this.isLocked;
  }

  async voteForLeader() {
    // a delayed task can be selected and started before original leader finishes the work
    // it can be fixed with vote timeout?
    localStorage[`${this.taskName}.LeaderId`] = this.id;
    await this.sleep(50);
  }

  get isLeader() {
    return localStorage[`${this.taskName}.LeaderId`] === this.id;
  }

  get result() {
    // result should be send by broadcast channel and handled by client
    return localStorage[`${this.taskName}.Result`];
  }

  set result(value) {
    return (localStorage[`${this.taskName}.Result`] = value);
  }

  async run() {
    if (this.currentAttempt > this.maxAttempts) {
      this.error = new Error(
        `Task failed to finish more than ${this.maxAttempts} times`
      );
      return await this.onError(this.error);
    }
    await this.voteForLeader();
    if (this.isLeader) {
      this.lock();
      try {
        this.result = await this.callback();
        this.unlock();
        return await this.onSuccess();
      } catch (error) {
        this.exceptionChannel.postMessage(error);
        this.unlock();
        return await this.onError(error);
      }
    } else {
      const wait = setInterval(async () => {
        if (this.error) {
          clearInterval(wait);
          return await this.onError(this.error);
        }
        if (this.isFinished) {
          clearInterval(wait);
          return await this.onSuccess();
        } else if (this.isFailed) {
          clearInterval(wait);
          this.currentAttempt = +1;
          return await this.run();
        }
      }, 100);
    }
  }
}
