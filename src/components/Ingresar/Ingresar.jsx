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
        <form className="inputs" onSubmit={handleAuth}>
            <label>
                Usuario:
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button type="submit">Ingresar</button>
            {registrarse && <p>Usuario registrado correctamente: {registrarse.email}</p>}
        </form>
    );
};

export default Ingresar;
