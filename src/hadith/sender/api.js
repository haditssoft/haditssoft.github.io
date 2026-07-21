const protocol = window.location.protocol;
const hostname = window.location.hostname;

export let switchServer = "";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    switchServer = `${protocol}//${hostname}${process.env.REACT_APP_IP_SUFFIX_DEV}/`;
} else if (process.env.NODE_ENV === 'production') {
    if (isNaN(Number(hostname.replace(/\./g, "")))) {
        switchServer = `${protocol}//${process.env.REACT_APP_DOMAIN_PREFIX_PROD}${process.env.REACT_APP_HOSTNAME_PROD}/`;
    } else {
        switchServer = `${protocol}//${hostname}${process.env.REACT_APP_IP_SUFFIX_PROD}/`;
    }
}

export const getHeaders = () => {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }
    return headers;
};

export const setAuthData = ({ token, refresh_token }) => {
    localStorage.setItem('token', token);
    if (refresh_token) {
        localStorage.setItem('refresh_token', refresh_token);
    }
};

export const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    window.dispatchEvent(new Event('auth:logout'));
};

export const getToken = () => localStorage.getItem('token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

const attemptRefresh = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token');

    const response = await fetch(switchServer + 'auths/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken })
    });

    if (!response.ok) {
        clearAuthData();
        throw new Error('Refresh token reuse detected or expired');
    }

    const data = await response.json();
    setAuthData(data);
    return data.token;
};

export const authFetch = async (input, init = {}, { onLoading } = {}) => {
    if (onLoading) onLoading(true);
    try {
        const token = getToken();
        const headers = { ...(init.headers || {}), 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }

        let response = await fetch(input, { ...init, headers });

        if (response.status === 401) {
            const clonedResponse = response.clone();
            const errorData = await clonedResponse.json().catch(() => ({}));

            if (errorData.message === 'Need email confirmation') {
                window.dispatchEvent(new Event('auth:needVerification'));
                throw new Error('Need email confirmation');
            }

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const newToken = await attemptRefresh();
                    isRefreshing = false;
                    processQueue(null, newToken);
                    headers['Authorization'] = 'Bearer ' + newToken;
                    return fetch(input, { ...init, headers });
                } catch (err) {
                    processQueue(err, null);
                    isRefreshing = false;
                    throw err;
                }
            } else {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (newToken) => {
                            headers['Authorization'] = 'Bearer ' + newToken;
                            resolve(fetch(input, { ...init, headers }));
                        },
                        reject
                    });
                });
            }
        }

        return response;
    } finally {
        if (onLoading) onLoading(false);
    }
};
