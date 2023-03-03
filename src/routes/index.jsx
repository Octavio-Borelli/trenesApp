import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Prueba from '../components/Prueba/Prueba'


const Rutas = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<h1>not found</h1>} />
                    <Route path="/" element={<Prueba />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Rutas