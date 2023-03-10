import { useState, useEffect } from "react"
import { getDatabase, ref, get, onValue } from "firebase/database";
import app from "../firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const db = getDatabase(app);

const useFirestore = () => {

    const [viaje, setViaje] = useState([])
    const [origen, setOrigen] = useState("")
    const [destino, setDestino] = useState("")
    const [inputIncorrecto, setInputIncorrecto] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [registrarse, setRegistrarse] = useState(null);

    const getDataFirebase = async () => {
        try {
            const snapshot = await get(ref(db, "viajes"));
            const info = snapshot.val();
            setViaje(info.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDataFirebase();
        const unsubscribe = onValue(ref(db, "viajes"), (snapshot) => {
            const info = snapshot.val();
            setViaje(info.data);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const handleOrigenChange = (event) => {
        const { value } = event.target;
        if (value.trim() === '') {
            setInputIncorrecto(<span>"El campo origen no puede estar vacío."</span>);
            setOrigen('');
        } else if (viaje && !viaje.some((item) => item.Origen === value)) {
            setInputIncorrecto(<span>"El origen ingresado no es válido."</span>);
            setOrigen(value);
        } else {
            setInputIncorrecto(null);
            setOrigen(value);
        }
        setIsTyping(true);
        event.preventDefault();

    };

    const handleDestinoChange = (event) => {
        const { value } = event.target;
        if (value.trim() === '') {
            setInputIncorrecto(<span>"El campo destino no puede estar vacío."</span>);
            setDestino('');
        } else if (viaje && !viaje.some((item) => item.Origen === value)) {
            setInputIncorrecto(<span>"El destino ingresado no es válido."</span>);
            setDestino(value);
        } else {
            setInputIncorrecto(null);
            setDestino(value);
        }
        setIsTyping(true);
        event.preventDefault();
    };

    const handleOrigenBlur = () => {
        setIsTyping(false);
    };
    const handleDestinoBlur = () => {
        setIsTyping(false);
    };

    const auth = getAuth();

    const registro = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setRegistrarse(user);
            console.log(`El usuario ${user.email} se registró correctamente`);
        } catch (error) {
            console.error(`Error al registrar usuario: ${error.message}`);
        }
    }

    const handleSubmit = async (email, password) => {
        try {
            await registro(email, password);
        } catch (error) {
            console.error(error);
        }
    }

    return {
        viaje,
        origen,
        destino,
        handleOrigenChange,
        handleDestinoChange,
        setInputIncorrecto,
        inputIncorrecto,
        handleOrigenBlur,
        handleDestinoBlur,
        registrarse,
        registro,
        handleSubmit,
        isTyping,
    }
}

export default useFirestore;
