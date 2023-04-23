import React from 'react'
import { Link } from 'react-router-dom';


const ModalRegistro = ({ setMostrarModal }) => {
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