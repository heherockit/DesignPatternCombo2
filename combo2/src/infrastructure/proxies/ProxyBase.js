export default class ProxyBase {
    baseServiceUrl = '';

    constructor(url) {
        this.baseServiceUrl = url;
    }

    jsonToQueryString(json) {
        return Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
    }

    getMethodName() {
        let stack = new Error().stack;
        let regex = /at [\w]+Proxy.(?<methodName>\w+) \(/g;
        regex.exec(stack); // skip the call from proxy base
        regex.exec(stack); // skip the call from proxy base
        return regex.exec(stack).groups.methodName;
    }

    //return a promiss
    get(data) {
        let methodName = this.getMethodName();
        let url = this.baseServiceUrl + methodName;
        if (data) {
            url = url + '?' + this.jsonToQueryString(data);
        }

        return fetch(url, {
            headers: {
                'Authorization': 'access_token'
            },
            method: 'GET'
        }).then(response => {
            if(response.status === 200) {
                return response.json();
            }
            else {
                throw new Error(response.status);
            }
        });
    }

    //return a promiss
    post(data) {
        let methodName = this.getMethodName();
        let url = this.baseServiceUrl + methodName;
        if (data) {
            url = url + '?' + this.jsonToQueryString(data);
        }

        return fetch(url, {
            headers: {
                'Authorization': 'access_token'
            },
            method: 'POST'
        });
    }
}