
export async function register(credentials) {
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
            return attemptLoginWithToken();
        } else {
            return null;
        }
    } catch (error) {
         console.error(error)
         return null;
    }
}

export async function login(credentials) {
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
            return attemptLoginWithToken();
        } else {
            return null;
        }
    } catch (error) {
         console.error(error);
         return null;
    }
}

export async function attemptLoginWithToken() {
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
            return result;
        } else {
         window.localStorage.removeItem('token');
         return result;
        }
    } catch (error) {
         console.error(error)
         window.localStorage.removeItem('token');
         return null;
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

export async function addToCart(user_id, product_id, count) {
    const token = window.localStorage.getItem('token');
    try {
        const response = await fetch(`api/users/${user_id}/cart`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
            body: JSON.stringify({ product_id: product_id, count: count }),
        })
        const result = await response.json();
        return result;
    } catch (error) {
         console.error(error)
    }
}

export async function removeFromCart(user_id, product_id) {
    const token = window.localStorage.getItem('token');
    try {
        const response = await fetch(`api/users/${user_id}/cart/${product_id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: token
            },
            body: JSON.stringify({ user_id: user_id, product_id: product_id }),
        })
        const result = await response.json();
        return result;
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