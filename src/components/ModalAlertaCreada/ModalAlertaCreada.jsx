import { useContext } from "react"
import { AppContext } from '../../context/Proveedor'

const ModalAlertaCreada = () => {

    const { setMostrarModal } = useContext(AppContext)

    return (
        <div className="modalAlertaCreada">
            <div className="contenidoModal">
                <h3>Alerta enviada exitosamente</h3>
                <button onClick={() => setMostrarModal(false)}>Crear otra alerta</button>
            </div>
        </div>
    )
}

export default ModalAlertaCreada