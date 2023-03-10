import { useState } from "react"
import Ante from '../Ante/Ante';
import useFirestore from '../../hooks/useFirestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Prueba = () => {
    const {
        viaje,
        origen,
        destino,
        handleOrigenChange,
        handleDestinoChange,
        inputIncorrecto,
        handleOrigenBlur,
        handleDestinoBlur,
    } = useFirestore();

    const [filtro, setFiltro] = useState([]);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };


    // const handleFiltro = () => {
    //     if (origen && destino) {
    //         const viajesFiltrados = viaje.filter((item) => item.Origen === origen && item.Destino === destino);
    //         if (viajesFiltrados.length > 0) {
    //             setFiltro(viajesFiltrados);
    //             setError(null);
    //         } else {
    //             setFiltro([]);
    //             setError(<h3>"No hay viajes disponibles."</h3>);
    //         }
    //     }
    // };

    const handleFiltro = () => {
        if (origen && destino) {
            const viajesFiltrados = viaje.filter((item) => {
                // Convertir la fecha de salida del formato "dd/mm/yyyy" a un objeto Date
                const fechaSalida = new Date(item["Fecha salida"].split('/').reverse().join('-'));

                // Verificar si la fecha de salida es posterior o igual a la fecha seleccionada en el DatePicker de ida
                const fechaIdaValida = startDate.getTime() <= fechaSalida.getTime();

                // Verificar si la fecha de vuelta es anterior o igual a la fecha seleccionada en el DatePicker de vuelta (si está seleccionada)
                const fechaVueltaValida = !endDate || endDate.getTime() >= fechaSalida.getTime();

                // Retornar true si ambas condiciones se cumplen
                return fechaIdaValida && fechaVueltaValida && item.Origen === origen && item.Destino === destino;
            });

            if (viajesFiltrados.length > 0) {
                setFiltro(viajesFiltrados);
                setError(null);
            } else {
                setFiltro([]);
                setError(<h3>"No hay viajes disponibles."</h3>);
            }
        }
    };


    return (
        <>
            <div className="inputs">
                <label>
                    Origen:
                    <input type="text" value={origen} onBlur={handleOrigenBlur} onChange={handleOrigenChange} />
                </label>
                <br />
                <label>
                    Destino:
                    <input type="text" value={destino} onBlur={handleDestinoBlur} onChange={handleDestinoChange} />
                </label>
                <br />
                <label>
                    Fecha de ida:
                    <DatePicker selected={startDate} onChange={handleStartDateChange} />
                </label>
                <br />
                <label>
                    Fecha de vuelta:
                    <DatePicker selected={endDate} onChange={handleEndDateChange} />
                </label>
                <br />
                <button onClick={handleFiltro} disabled={!origen || !destino}>Buscar</button>
            </div>
            {error && <div>{error}</div>}
            {inputIncorrecto && <div>{inputIncorrecto}</div>}
            <Ante filtro={filtro} />
        </>
    )
}

export default Prueba;

