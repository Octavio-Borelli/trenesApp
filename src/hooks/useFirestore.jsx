import { useState, useEffect } from "react"
import { getDatabase, ref, get, onValue } from "firebase/database";
import app from "../firebase/firebase";

const db = getDatabase(app);

const useFirestore = () => {

    const [viaje, setViaje] = useState([])
    const [origen, setOrigen] = useState("")
    const [destino, setDestino] = useState("")

    const getDataFirebase = async () => {
        try {
            const snapshot = await get(ref(db, "viajes"));
            const info = snapshot.val();
            setViaje(info.data);
            console.log(info.data);
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
        console.log(event.target.value)
        event.preventDefault()
        setOrigen(event.target.value);
    };

    const handleDestinoChange = (event) => {
        console.log(event.target.value)
        event.preventDefault()
        setDestino(event.target.value);
    };

    return {
        viaje,
        origen,
        destino,
        handleOrigenChange,
        handleDestinoChange
    }
}

export default useFirestore;
