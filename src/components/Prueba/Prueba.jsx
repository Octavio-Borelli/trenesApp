import { useState, useEffect, useContext } from "react"
import { AppContext } from "../../context/Proveedor";
import useFirestore from '../../hooks/useFirestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import Ante from '../Ante/Ante';
import Final from '../Final/Final';
import moment from 'moment';
import ModalAlertaCreada from "../ModalAlertaCreada/ModalAlertaCreada";
import Button from 'react-bootstrap/Button'

const Prueba = () => {
    const {
        viaje,
        origen,
        destino,
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
        setOrientacion
    } = useContext(AppContext)

    const [filtro, setFiltro] = useState([]);
    const [error, setError] = useState(null);

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
    }

    const handleExternalLink = (url) => {
        window.location.href = url;
    };

    useEffect(() => {
    }, [email]);

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
                <Button variant='danger' onClick={handleFiltro} disabled={!origen || !destino || !startDate || (orientacion === "idaYvuelta" && !endDate)}>Buscar</Button>
                <br />
                {email !== '' && email !== undefined ? <Button variant='danger' onClick={handleSubmitForm}>Crear alerta</Button> : null}
                < Button variant='danger' onClick={() => handleExternalLink('https://webventas.sofse.gob.ar/')} disabled={!origen || !destino || !startDate || (orientacion === "idaYvuelta" && !endDate)}>
                    Comprar pasaje
                </Button>
            </div>
            {mostrarModal === true ? <ModalAlertaCreada /> : null}
            {error && <div>{error}</div>}
            {inputIncorrecto && <div>{inputIncorrecto}</div>}
            {/* {<Ante filtro={filtro} />} */}
            {<Final filtro={filtro} />}
        </div >
    )
}

export default Prueba;

