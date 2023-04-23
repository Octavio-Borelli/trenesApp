import { useState, useContext } from "react"
import { AppContext } from "../../context/Proveedor";
import ModalRegistro from "../ModalRegistro/ModalRegistro";

const Ingresar = () => {

    const { handleEmailChange,
        handlePasswordChange,
        handleSubmit,
        email,
        password } = useContext(AppContext)

    const [mostrarModal, setMostrarModal] = useState(false);

    const handleAuth = async (event) => {
        event.preventDefault();
        const success = handleSubmit(email, password);
        if (success) {
            try {
                setMostrarModal(true);
            }
            catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <div className='fondoIngresar'>
            <form className="ingresar">
                <label>Usuario:
                    <input className="usuarioIngresar" type="email" value={email} onChange={handleEmailChange} />
                </label>
                <label>Contraseña:
                    <input className="contraseñaIngresar" type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <button className="botonIngresar" type="submit" onClick={handleAuth} disabled={!email || !password}>Ingresar</button>
            </form>
            {mostrarModal === true ? <ModalRegistro setMostrarModal={setMostrarModal} /> : null}
        </div >
    );
};

export default Ingresar;
