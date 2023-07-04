import { useState, useEffect, useContext } from "react"
import { ref, get, onValue } from "firebase/database";
import emailjs from "emailjs-com";
import { AppContext } from "../context/Proveedor";
import { db } from '../firebase/firebase';

const useFirestore = () => {

    const { email,
        setMostrarModal,
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        origen,
        destino,
        setOrigen,
        setDestino
    } = useContext(AppContext)

    const [viaje, setViaje] = useState([])
    const [inputIncorrecto, setInputIncorrecto] = useState(null);

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

    const sendAlert = async () => {
        const currentDate = new Date();
        // const tripDate = startDate;

        if (startDate > currentDate) {
            setTimeout(async () => {
                try {
                    const emailContent = {
                        subject: "Alerta de viaje",
                        to_email: email,
                        message_html: `Origen: ${origen}, Destino: ${destino}, Fecha ida: ${startDate}, Fecha vuelta: ${endDate}`
                    };
                    const result = await emailjs.send('gmail', 'template_eo49qj5', emailContent, 'CPcOPBvvDFM4roihl');
                    console.log(result.text);
                } catch (error) {
                    console.log(error);
                }
            }, 60 * 1000);
        } else {
            try {
                const emailContent = {
                    subject: "Alerta de viaje",
                    to_email: email,
                    message_html: `Origen: ${origen}, Destino: ${destino}, Fecha ida: ${startDate}, Fecha vuelta: ${endDate}`
                };
                const result = await emailjs.send('gmail', 'template_eo49qj5', emailContent, 'CPcOPBvvDFM4roihl');
                console.log(result.text);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        if (origen !== "" || destino !== "" || startDate !== null || endDate !== null) {
            try {
                await sendAlert();
                setMostrarModal(true);
                setOrigen("");
                setDestino("");
                setStartDate(null);
                setEndDate(null);
            } catch (error) {
                console.log(error)
            }
        }
    };

    return {
        viaje,
        handleOrigenChange,
        handleDestinoChange,
        setInputIncorrecto,
        inputIncorrecto,
        handleSubmitForm

    }
}

export default useFirestore;


