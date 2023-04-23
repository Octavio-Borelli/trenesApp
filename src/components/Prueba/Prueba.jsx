import { useState, useEffect, useContext } from "react"
import Ante from '../Ante/Ante';
import useFirestore from '../../hooks/useFirestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { AppContext } from "../../context/Proveedor";


const Prueba = () => {
    const {
        viaje,
        origen,
        destino,
        handleOrigenChange,
        handleDestinoChange,
        inputIncorrecto,
        handleStartDateChange,
        handleEndDateChange,
        startDate,
        endDate,
        handleSubmitForm
    } = useFirestore();

    const { email } = useContext(AppContext)

    const [filtro, setFiltro] = useState([]);
    const [error, setError] = useState(null);
    const [orientacion, setOrientacion] = useState("");

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

    useEffect(() => {
        console.log("email Prueba:", email);
    }, [email]);

    return (
        <>
            <div className="inputs">
                <label>
                    Ida:
                    <input type="radio" value="ida" name="ida" checked={orientacion === "ida"} onChange={(e) => setOrientacion(e.target.value)} />
                    <br />
                </label>
                <label>
                    Ida y vuelta:
                    <input type="radio" value="idaYvuelta" name="idaYvuelta" checked={orientacion === "idaYvuelta"} onChange={(e) => setOrientacion(e.target.value)} />
                </label>
                <br />
                <label>
                    Origen:
                    <input type="text" value={origen} name="origen" onChange={handleOrigenChange} />
                </label>
                <br />
                <label>
                    Destino:
                    <input type="text" value={destino} name="destino" onChange={handleDestinoChange} />
                </label>
                <br />
                <label>
                    Fecha de ida:
                    <DatePicker selected={startDate} name="startDate" onChange={handleStartDateChange} />
                </label>
                <br />
                {orientacion === "idaYvuelta" && (
                    <label>
                        Fecha de vuelta:
                        <DatePicker selected={endDate} name="endDate" onChange={handleEndDateChange} />
                    </label>
                )}
                <br />
                <button onClick={handleFiltro} disabled={!origen || !destino || !startDate || (orientacion === "idaYvuelta" && !endDate)}>Buscar</button>
                <br />
                {email !== '' && email !== undefined ? <button onClick={handleSubmitForm}>Crear alerta</button> : null}
            </div>
            {error && <div>{error}</div>}
            {inputIncorrecto && <div>{inputIncorrecto}</div>}
            <Ante filtro={filtro} />
        </>
    )
}

export default Prueba;

