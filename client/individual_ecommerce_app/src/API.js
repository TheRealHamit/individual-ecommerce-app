
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
         setAuth(null);
        }
    } catch (error) {
         console.error(error)
         window.localStorage.removeItem('token');
         setAuth(null);
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

export async function addToCart(product_id, count) {
    const token = window.localStorage.getItem('token');
    try {
        const response = await fetch('api/users/1/cart',
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
            body: JSON.stringify({ product_id: product_id, count: count }),
        })
        const result = await response.json()
    } catch (error) {
         console.error(error)
    }
}

export async function getCart() {
    const token = window.localStorage.getItem('token');
    try {
        const response = await fetch('api/users/1/cart',
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            }
        })
        const result = await response.json()
        return result;
    } catch (error) {
         console.error(error)
    }
}