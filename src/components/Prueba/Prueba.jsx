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
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [orientacion, setOrientacion] = useState("ida");


    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleFiltro = () => {
        if (origen && destino && startDate) {
            let filtroViajes = viaje.filter((item) => {
                // Convertir la fecha de salida del formato "dd/mm/yyyy" a un objeto Date
                const fechaSalida = item && item["Fecha salida"] ? new Date(item["Fecha salida"].split('/').reverse().join('-')) : null;

                // Verificar si la fecha de salida es igual a la fecha seleccionada en el DatePicker de ida
                const fechaIdaValida = startDate.toDateString() === fechaSalida.toDateString();

                // Verificar si la fecha de vuelta es posterior o igual a la fecha seleccionada en el DatePicker de vuelta (si está seleccionada)
                // const fechaVueltaValida = !endDate || endDate.getTime() >= fechaSalida.getTime();


                // Verificar si la fecha de regreso del viaje es exactamente igual a la fecha seleccionada en el DatePicker de vuelta (si está seleccionada)
                // const fechaRegresoValida = !endDate || new Date(item["Fecha regreso"].split('/').reverse().join('-')).toDateString() === endDate.toDateString();

                // Verificar si la orientación del viaje es de ida y vuelta solo si la fecha de vuelta está seleccionada
                // const orientacionIdaYvueltaValida = !endDate || orientacion === "idaYvuelta" ? item["Trenes orientación"] === "Trenes idaYvuelta" : true;

                // Verificar si la orientación del viaje es la seleccionada (ida o idaYvuelta)
                // const orientacionValida = orientacion === "ida" ? item["Trenes orientación"] === "Trenes ida" : ["Trenes ida", "Trenes vuelta"].includes(item["Trenes orientación"]);

                // Verificar si el viaje es de ida y vuelta y si la fecha de vuelta está seleccionada y es válida
                // const vueltaValida = orientacion === "idaYvuelta" && endDate && item["Trenes orientación"] === "Trenes idaYvuelta" && endDate.getTime() >= startDate.getTime();

                // Retornar true si todas las condiciones se cumplen
                return fechaIdaValida && item.Origen === origen && item.Destino === destino;
                // // Retornar true si todas las condiciones se cumplen
                // return fechaIdaValida && fechaVueltaValida && fechaRegresoValida && (orientacionValida || vueltaValida) && orientacionIdaYvueltaValida && item.Origen === origen && item.Destino === destino;

                // // Retornar true si todas las condiciones se cumplen
                // return fechaIdaValida && fechaRegresoValida && (orientacionValida || vueltaValida) && item.Origen === origen && item.Destino === destino;
            });

            if (filtroViajes.length > 0) {
                setFiltro(filtroViajes);
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
                    Ida:
                    <input type="radio" value="ida" checked={orientacion === "ida"} onChange={(e) => setOrientacion(e.target.value)} />
                    <br />
                </label>
                <label>
                    Ida y vuelta:
                    <input type="radio" value="idaYvuelta" checked={orientacion === "idaYvuelta"} onChange={(e) => setOrientacion(e.target.value)} />
                </label>
                <br />

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
                {/* <label>
                    Fecha de vuelta:
                    <DatePicker selected={endDate} onChange={handleEndDateChange} />
                </label> */}
                {orientacion === "idaYvuelta" && (
                    <label>
                        Fecha de vuelta:
                        <DatePicker selected={endDate} onChange={handleEndDateChange} />
                    </label>
                )}
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

