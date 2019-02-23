import { CircuitBreakerConfig } from '../../configuration';
import CircuitBreakerStatusEnum from './CircuitBreakerStatusEnum';
import CircuitBreakerState from './CircuitBreakerState';

class CircuitBreaker {
    constructor() {
        this.Threshhold = CircuitBreakerConfig.Threshhold;
        this.Timeout = CircuitBreakerConfig.Timeout;
        this.states = [];
    }

    execute(key, promiseAction) {
        let state = this.states[key];
        if(!state) {
            state = new CircuitBreakerState();
            this.states[key] = state;
        }

        //if status is open, so check if time out, then swith to half open and call
        if(state.Status === CircuitBreakerStatusEnum.Open) {
            //timeout
            if(state.FailedTime.getTime() + this.Timeout * 1000 < new Date().getTime()) {
                state.Status = CircuitBreakerStatusEnum.HalfOpen;
                let promise = promiseAction();
                return promise.then(response => {
                    state.Status = CircuitBreakerStatusEnum.Closed;
                    state.RequestCount = 1;
                    state.ErrorCount = 0;
                }).catch(err => {
                    state.Status = CircuitBreakerStatusEnum.Open;
                    state.FailedTime = new Date();
                    throw err;
                });
            }

            return new Promise(() => { throw new Error('Circuit Breaker') });
        }
        else {
            let self = this;
            state.RequestCount++;
            let promise = promiseAction();
            return promise.catch(err => {
                state.ErrorCount++;
                if(state.ErrorCount / state.RequestCount > self.Threshhold) {
                    state.Status = CircuitBreakerStatusEnum.Open;
                    state.FailedTime = new Date();
                    throw err;
                }
            });
        }
    }
}

const circuitBreaker = new CircuitBreaker();
export default circuitBreaker;