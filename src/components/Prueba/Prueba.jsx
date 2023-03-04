import { useState } from "react"
import Ante from '../Ante/Ante';
import useFirestore from '../../hooks/useFirestore';

const Prueba = () => {
    const { viaje, origen, destino, handleOrigenChange, handleDestinoChange } = useFirestore();
    const [filtro, setFiltro] = useState([]);
    const [error, setError] = useState(null);

    const handleFiltro = () => {
        if (viaje) {
            const viajesFiltrados = viaje.filter((item) => item.Origen === origen && item.Destino === destino);
            if (viajesFiltrados.length > 0) {
                setFiltro(viajesFiltrados);
                console.log(viajesFiltrados)
                setError(null);
            } else {
                setFiltro([]);
                setError(<h3>"No hay pasajes disponibles."</h3>);
            }
        } else {
            setError(<h3>"Ingrese una localidad válida."</h3>);
        }
    };

    return (
        <>
            <div>
                <label>
                    Origen:
                    <input type="text" value={origen} onChange={handleOrigenChange} />
                </label>
                <label>
                    Destino:
                    <input type="text" value={destino} onChange={handleDestinoChange} />
                </label>
                <button onClick={handleFiltro}>Buscar</button>
            </div>
            {error && <div>{error}</div>}
            <Ante filtro={filtro} />
        </>
    )
}

export default Prueba;

