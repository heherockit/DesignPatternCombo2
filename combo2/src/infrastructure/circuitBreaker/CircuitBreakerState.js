import CircuitBreakerStatusEnum from './CircuitBreakerStatusEnum';

export default class CircuitBreakerState {
    constructor() {
        this.RequestCount = 0;
        this.ErrorCount = 0;
        this.FailedTime = new Date();
        this.Status = CircuitBreakerStatusEnum.Closed;
    }
}