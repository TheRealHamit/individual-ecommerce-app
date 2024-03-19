
export async function register(credentials, setAuth) {
    try {
        const response = await fetch('api/auth/register',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        const result = await response.json();
        if (response.ok) {
            window.localStorage.setItem('token', result.token);
            attemptLoginWithToken(setAuth);
        }
        console.log(result);
    } catch (error) {
         console.error(error)
    }
}

export async function login(credentials, setAuth) {
    try {
        const response = await fetch('api/auth/login',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
        const result = await response.json();
        if (response.ok) {
            window.localStorage.setItem('token', result.token);
            attemptLoginWithToken(setAuth);
        }
    } catch (error) {
         console.error(error);
    }
}

export async function attemptLoginWithToken(setAuth) {
    const token = window.localStorage.getItem('token');
    console.log(token);
    try {
        const response = await fetch('api/auth/me',
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
        })
        const result = await response.json()
        if (response.ok) {
            setAuth(result);
        } else {
            window.localStorage.removeItem('token');
        }
    } catch (error) {
         console.error(error)
    }
}

export async function getProducts() {
    try {
        const response = await fetch('api/products',
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const result = await response.json()
        return result;
    } catch (error) {
         console.error(error)
    }
}