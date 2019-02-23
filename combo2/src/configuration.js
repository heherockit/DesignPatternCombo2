export const ServiceProxyConfig = {
    CMS: {
        Article: {
            ServiceUrl: 'https://jsonplaceholder.typicode.com/'
        },
        Poll: {
            ServiceUrl: 'http://localhost:2003/api/Poll/'
        }
    }
};

export const CircuitBreakerConfig = {
    Threshhold: 0.5,
    Timeout: 10
}