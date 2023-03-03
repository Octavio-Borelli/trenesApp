import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, get } from "firebase/database";
import Ante from '../Ante/Ante';
import app from '../../firebase/firebase';


const Prueba = () => {

    const db = getDatabase(app)

    const [viaje, setViaje] = useState([])

    useEffect(() => {
        try {
            const fetchViaje = async () => {
                const snapshot = await get(dbRef)
                const info = snapshot.val();
                setViaje(info.data);
            };
            const dbRef = ref(db, "viajes");
            onValue(dbRef, fetchViaje);

        } catch (error) {
            console.log(error)
        }

    }, []);


    return (
        <>

            <div><Ante viaje={viaje} />
                {/* <label>
                    Origen:
                    <input type="text" value={origen} onChange={handleOrigenChange} />
                </label>
                <label>
                    Destino:
                    <input type="text" value={destino} onChange={handleDestinoChange} />
                </label>
                <button type="button" onClick={buscarViajes}>Buscar</button> */}
            </div>
        </>
    )
}


export default Prueba


// onValue(dbRef, (snapshot) => {
//     const data = snapshot.val();
//     setViaje(data)
// });

