import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Ingresar from '../components/Ingresar/Ingresar'
import Prueba from '../components/Prueba/Prueba'

const Rutas = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Ingresar />} />
                    <Route path="/prueba" element={<Prueba />} />
                    <Route path="*" element={<h1>not found</h1>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Rutas