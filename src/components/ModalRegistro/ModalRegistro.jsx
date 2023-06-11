import { useContext } from "react"
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/Proveedor';

const ModalRegistro = () => {

    const { setMostrarModal } = useContext(AppContext)

    return (
        <div className="modalRegistro">
            <div className="contenidoModal">
                <h3>Usuario registrado exitosamente</h3>
                <Link className='btnItem' onClick={() => setMostrarModal(false)} type="button" to={"/prueba"}>Cerrar</Link>
            </div>
        </div>
    )
}

export default ModalRegistro