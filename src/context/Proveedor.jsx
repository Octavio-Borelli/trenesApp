import { createContext } from "react";

export const AppContext = createContext();

const Proveedor = ({ children }) => {



    return (
        <AppContext.Provider value={{
        }}>
            {children}
        </AppContext.Provider >
    )
}

export default Proveedor