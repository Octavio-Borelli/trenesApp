import { useState, createContext } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const AppContext = createContext();

const Proveedor = ({ children }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mostrarModal, setMostrarModal] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [orientacion, setOrientacion] = useState("");
    const [origen, setOrigen] = useState("")
    const [destino, setDestino] = useState("")


    const auth = getAuth();
    const registro = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(`El usuario ${user.email} se registró correctamente`);
            console.log(email)
        } catch (error) {
            console.error(`Error al registrar usuario: ${error.message}`);
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        if (
            email !== '' &&
            password !== '')
            try {
                await registro(email, password);
            } catch (error) {
                console.error(error);
                console.log(error);
            }
    }

    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    return (
        <AppContext.Provider value={{
            email,
            setEmail,
            password,
            setPassword,
            handleSubmit,
            handleEmailChange,
            handlePasswordChange,
            mostrarModal,
            setMostrarModal,
            startDate,
            endDate,
            handleStartDateChange,
            handleEndDateChange,
            setStartDate,
            setEndDate,
            orientacion,
            setOrientacion,
            origen,
            destino,
            setOrigen,
            setDestino

        }}>
            {children}
        </AppContext.Provider >
    )
}

export default Proveedor