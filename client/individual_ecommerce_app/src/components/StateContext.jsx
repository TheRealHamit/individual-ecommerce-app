import { createContext, useState } from "react";

const StateContext = createContext({
    auth: null,
    cart: []
});

export function StateProvider({ children }) {
    const [auth, setAuth] = useState(null);
    const [cart, setCart] = useState([]);
    const [productList, setProductList] = useState([]);

    return (
        <StateContext.Provider value={{ auth, setAuth, cart, setCart, productList, setProductList }}>
            {children}
        </StateContext.Provider>
  )
}

export default StateContext;