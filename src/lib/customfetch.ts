import { decrypt, encrypt } from './krypt';

export default function customFetch(url: any, options: any) {
    options = options || {};
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        //@ts-ignore
        const keys = [];
        const headers = {};

        const response = () => ({
            ok: ((request.status / 100) | 0) == 2, // 200-299
            statusText: request.statusText,
            status: request.status,
            url: request.responseURL,
            text: () => {
                if (process.env.STAGE === 'production') {
                    let data = decrypt(
                        request.responseText,
                        process.env.SECRET_REQ_RES
                    );

                    return Promise.resolve(data);
                }
                return Promise.resolve(request.responseText);
            },
            json: async () => {
                return Promise.resolve(request.responseText).then(JSON.parse);
            },
            blob: () => Promise.resolve(new Blob([request.response])),
            clone: response,
            headers: {
                //@ts-ignore
                keys: () => keys,
                entries: () =>
                    //@ts-ignore
                    keys.map((n) => [n, request.getResponseHeader(n)]),
                //@ts-ignore
                get: (n) => request.getResponseHeader(n),
                //@ts-ignore
                has: (n) => request.getResponseHeader(n) != null
            }
        });

        request.open(options.method || 'get', url, true);

        request.onload = () => {
            request
                .getAllResponseHeaders()
                .toLowerCase()
                //@ts-ignore
                .replace(/^(.+?):/gm, (m, key) => {
                    //@ts-ignore
                    headers[key] || keys.push((headers[key] = key));
                });
            resolve(response());
        };

        request.onerror = reject;
        request.withCredentials = true;
        for (const i in options.headers) {
            request.setRequestHeader(i, options.headers[i]);
        }

        request.setRequestHeader('ngrok-skip-browser-warning', '1');

        let body =
            process.env.STAGE === 'production'
                ? encrypt(options.body, process.env.SECRET_REQ_RES)
                : options.body;

        request.send(body || null);
    });
}
