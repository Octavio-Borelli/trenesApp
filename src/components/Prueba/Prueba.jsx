import { useState, useContext } from "react"
import { AppContext } from "../../context/Proveedor";
import useFirestore from '../../hooks/useFirestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Final from '../Final/Final';
import moment from 'moment';
import ModalAlertaCreada from "../ModalAlertaCreada/ModalAlertaCreada";

const Prueba = () => {
    const {
        viaje,
        handleOrigenChange,
        handleDestinoChange,
        inputIncorrecto,
        handleSubmitForm
    } = useFirestore();

    const {
        email,
        mostrarModal,
        handleStartDateChange,
        handleEndDateChange,
        startDate,
        endDate,
        orientacion,
        setOrientacion,
        origen,
        destino,
        setEndDate
    } = useContext(AppContext)

    const [filtro, setFiltro] = useState([]);
    const [error, setError] = useState(null);
    const [retraso, setRetraso] = useState(true);
    const [spiner, setSpiner] = useState(true);
    const [ocultarEncabezado, setOcultarEncabezado] = useState(true);
    const [encabezadoCompleto, setencabezadoCompleto] = useState(`Trenes ida - ${origen} a ${destino}`);


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
                setEndDate("")
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
    }

    const handleRetrasoViaje = () => {
        try {
            const fechaHoy = new Date();
            if (
                (orientacion === "ida" &&
                    startDate > fechaHoy) ||
                (orientacion === "idaYvuelta" &&
                    startDate <= fechaHoy &&
                    endDate > fechaHoy) ||
                (orientacion === "idaYvuelta" &&
                    startDate > fechaHoy &&
                    endDate > fechaHoy)
            ) {
                const timeout = setTimeout(() => {
                    setRetraso(false);
                }, 10000);
                return () => {
                    clearTimeout(timeout);
                };
            }
            else {
                const timeout = setTimeout(() => {
                    setRetraso(false);
                }, 3000);
                return () => {
                    clearTimeout(timeout);
                }
            };
        } catch (error) {
            console.log(error)
        }
    }

    const handleBuscarClick = () => {
        setSpiner(false);
        handleFiltro();
        handleRetrasoViaje();
        setOcultarEncabezado(false);
        setRetraso(true);
        setencabezadoCompleto("")
    };

    const handleExternalLink = (url) => {
        window.location.href = url;
    };

    return (
        <div>
            <div className="inputs">
                <label>
                    Ida
                    <input type="radio" value="ida" name="ida" checked={orientacion === "ida"} onChange={(e) => setOrientacion(e.target.value)} />
                </label>
                <br />
                <label>
                    Ida y vuelta
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
                <button onClick={handleBuscarClick} disabled={!origen || !destino || !startDate || (orientacion === "idaYvuelta" && !endDate)}>Buscar</button>
                <br />
                {email !== '' && email !== undefined ? <button onClick={handleSubmitForm}>Crear alerta</button> : null}
                < button onClick={() => handleExternalLink('https://webventas.sofse.gob.ar/')} disabled={!origen || !destino || !startDate || (orientacion === "idaYvuelta" && !endDate)}>
                    Comprar pasaje
                </button>
            </div>
            {mostrarModal ? <ModalAlertaCreada /> : null}
            {error && <span>{error}</span>}
            {inputIncorrecto && <span>{inputIncorrecto}</span>}
            {!spiner && retraso ? (
                <h2>Buscando viajes...</h2>)
                : <Final filtro={filtro} ocultarEncabezado={ocultarEncabezado} setOcultarEncabezado={setOcultarEncabezado} encabezadoCompleto={encabezadoCompleto} />}
        </div >
    )
}

export default Prueba;

