import { useState, useEffect, useContext } from "react"
import { getDatabase, ref, get, onValue } from "firebase/database";
import app from "../firebase/firebase";
import emailjs from "emailjs-com";
import { AppContext } from "../context/Proveedor";

const db = getDatabase(app);

const useFirestore = () => {

    const { email, setEmail, setPassword } = useContext(AppContext)

    const [viaje, setViaje] = useState([])
    const [origen, setOrigen] = useState("")
    const [destino, setDestino] = useState("")
    const [inputIncorrecto, setInputIncorrecto] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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
        event.preventDefault();
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const sendAlert = async () => {
        try {
            const emailContent = {
                subject: "Alerta de viaje",
                to_email: email,
                message_html: `Origen: ${origen}, Destino: ${destino}, Fecha ida: ${startDate}, Fecha vuelta: ${endDate}`
            };
            const result = await emailjs.send('gmail', 'template_eo49qj5', emailContent, 'CPcOPBvvDFM4roihl');
            console.log(result.text);
            console.log(emailContent);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        if (origen !== "" || destino !== "" || startDate !== null || endDate !== null) {
            try {
                await sendAlert();
                setEmail("");
                setPassword("");
            } catch (error) {
                console.log(error)
            }
        }
    };

    return {
        viaje,
        origen,
        destino,
        handleOrigenChange,
        handleDestinoChange,
        setInputIncorrecto,
        inputIncorrecto,
        handleStartDateChange,
        handleEndDateChange,
        startDate,
        endDate,
        handleSubmitForm
    }
}

export default useFirestore;


