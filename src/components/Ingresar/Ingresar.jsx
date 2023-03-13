import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFirestore from '../../hooks/useFirestore';

const Ingresar = () => {
    const { handleSubmit, registrarse } = useFirestore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAuth = (event) => {
        event.preventDefault();
        handleSubmit(email, password);
        navigate('/Prueba');
    };

    return (
        <div className='fondoIngresar'>
            <form className="ingresar" onSubmit={handleAuth}>
                <label>Usuario:
                    <input className="usuarioIngresar" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <label>Contraseña:
                    <input className="contraseñaIngresar" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <button className="botonIngresar" type="submit">Ingresar</button>
                {registrarse && <p>Usuario registrado correctamente: {registrarse.email}</p>}
            </form>
        </div>
    );
};

export default Ingresar;
