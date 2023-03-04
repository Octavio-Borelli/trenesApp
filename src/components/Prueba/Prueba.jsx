import { useState } from "react"
import Ante from '../Ante/Ante';
import useFirestore from '../../hooks/useFirestore';

const Prueba = () => {
    const {
        viaje,
        origen,
        destino,
        handleOrigenChange,
        handleDestinoChange,
        inputIncorrecto,
        handleOrigenBlur,
        handleDestinoBlur
    } = useFirestore();

    const [filtro, setFiltro] = useState([]);
    const [error, setError] = useState(null);


    const handleFiltro = () => {
        if (origen && destino) {
            const viajesFiltrados = viaje.filter((item) => item.Origen === origen && item.Destino === destino);
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
                <label>
                    Destino:
                    <input type="text" value={destino} onBlur={handleDestinoBlur} onChange={handleDestinoChange} />
                </label>
                <button onClick={handleFiltro} disabled={!origen || !destino}>Buscar</button>
            </div>
            {error && <div>{error}</div>}
            {inputIncorrecto && <div>{inputIncorrecto}</div>}
            <Ante filtro={filtro} />
        </>
    )
}

export default Prueba;

