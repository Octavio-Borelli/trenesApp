import { useState } from "react"
import Ante from '../Ante/Ante';
import useFirestore from '../../hooks/useFirestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

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
    const [orientacion, setOrientacion] = useState("");

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleFiltro = () => {
        try {
            let viajesFiltrados = [...viaje];
            if (orientacion === "ida") {
                viajesFiltrados = viajesFiltrados.filter((item) => {
                    const fechaSalida = moment(item["Fecha salida"], "DD/MM/YYYY");
                    const fechaSeleccionada = moment(startDate);

                    return (
                        item.Origen.toLowerCase() === origen.toLowerCase() &&
                        item.Destino.toLowerCase() === destino.toLowerCase() &&
                        fechaSalida.isSame(fechaSeleccionada, "day")
                    );
                });
                setFiltro(viajesFiltrados);
            } else if (orientacion === "idaYvuelta") {
                viajesFiltrados = viajesFiltrados.filter((item) => {
                    const fechaSalida = moment(item["Fecha salida"], "DD/MM/YYYY");
                    const fechaSeleccionadaInicio = moment(startDate);
                    const fechaSeleccionadaFin = moment(endDate);

                    return (
                        item.Origen.toLowerCase() === origen.toLowerCase() &&
                        item.Destino.toLowerCase() === destino.toLowerCase() &&
                        fechaSalida.isBetween(fechaSeleccionadaInicio, fechaSeleccionadaFin, "day", "[]")
                    );
                });
                setFiltro(viajesFiltrados);
            }

        } catch (error) {
            setError(error.message)
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

