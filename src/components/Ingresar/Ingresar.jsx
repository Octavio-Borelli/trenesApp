import { useState, useContext } from "react"
import { AppContext } from "../../context/Proveedor";
import ModalRegistro from "../ModalRegistro/ModalRegistro";

const Ingresar = () => {
    const [isValid, setIsValid] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const { handleEmailChange, handlePasswordChange, handleSubmit, email, password, mostrarModal, setMostrarModal } = useContext(AppContext)

    const handleAuth = async (event) => {
        event.preventDefault();
        const success = handleSubmit(email, password);
        if (success) {
            try {
                setMostrarModal(true);
            } catch (error) {
                console.log(error)
            }
        }
    };

    const emailValid = (email) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    };

    const passwordValid = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    }


    const handleEmailValidation = (event) => {
        const email = event.target.value;
        setEmailError(!emailValid(email));
        setIsValid(emailValid(email) && passwordValid(password));
    };

    const handlePasswordValidation = (event) => {
        const password = event.target.value;
        setPasswordError(!passwordValid(password));
        setIsValid(emailValid(email) && passwordValid(password));
    };

    return (
        <div className="contenedorIngresar">
            <form className="inputsIngresar">
                <div className="camposUsuarioIngresar">
                    <label className="labelUsuarioIngresar">Usuario:
                        <input
                            className={`inputUsuarioIngresar ${emailError ? 'error' : ''}`}
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailValidation}
                        />
                        {emailError && <span className="error-msg">Ingrese un correo electrónico válido</span>}
                    </label>
                </div>
                <label>Contraseña:
                    <input
                        className={`inputContraseñaIngresar ${passwordError ? 'error' : ''}`}
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordValidation}
                    />
                    {passwordError && <span className="error-msg">La contraseña debe tener al menos 8 caracteres, una letra, un número y un carácter especial</span>}
                </label>
                <button className="ingresar" type="submit" onClick={handleAuth} disabled={!isValid}>Ingresar</button>
            </form>
            {mostrarModal === true ? <ModalRegistro /> : null}
        </div>
    );
};

export default Ingresar;

