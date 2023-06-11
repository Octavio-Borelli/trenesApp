import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/Proveedor';

const Final = ({ filtro }) => {
    const { orientacion, startDate, origen, destino } = useContext(AppContext);
    const [showContent, setShowContent] = useState(false);
    // const [showEncabezado, setShowEncabezado] = useState(false);

    const currentDate = new Date();
    const tripDate = new Date(startDate);

    useEffect(() => {
        if (tripDate > currentDate) {
            const interval = setInterval(() => {
                setShowContent(true);
            }, 10000);
            return () => {
                clearInterval(interval);
            };
        } else {
            setShowContent(true);
        }
    }, []);

    // useEffect(() => {
    //     if (showContent) {
    //         setShowEncabezado(true);
    //     }
    // }, []);

    return (
        <>
            {orientacion === 'ida' && (
                <>
                    <h3>Trenes ida - {origen} a {destino}</h3>
                    <div>
                        {filtro
                            .filter(item => item['Trenes orientación'] === 'Trenes ida')
                            .map((item) => (
                                <div className="container" key={item.id}>
                                    <div className="item">
                                        <h4>Origen: {item.Origen}</h4>
                                        <h4>Destino: {item.Destino}</h4>
                                        <h4>Fecha salida: {item['Fecha salida']}</h4>
                                        <h4>Servicio: {item.Servicio}</h4>
                                        <h4>Hora salida: {item['Hora salida']}</h4>
                                        <h4>Hora llegada: {item['Hora llegada']}</h4>
                                        <h4>Orientación: {item['Trenes orientación']}</h4>
                                        <h4>Pullman: {item.Pullman}</h4>
                                        <h4>Primera: {item.Primera}</h4>
                                        <h4>Pullman(D): {item['Pullman(D)']}</h4>
                                        <h4>Precio Primera: {item['Precio Primera']}</h4>
                                        <h4>Precio Pullman: {item['Precio Pullman']}</h4>
                                        <h4>Disponibilidad: {item['Disponibilidad']}</h4>
                                    </div>
                                </div>
                            ))}
                    </div>
                </>
            )}

            {orientacion === 'idaYvuelta' && (
                <>
                    <h3>Trenes ida - {origen} a {destino}</h3>
                    <div>
                        {filtro
                            .filter(item => item['Trenes orientación'] === 'Trenes ida')
                            .map((item) => (
                                <div className="container" key={item.id}>
                                    <div className="item">
                                        <h4>Origen: {item.Origen}</h4>
                                        <h4>Destino: {item.Destino}</h4>
                                        <h4>Fecha salida: {item['Fecha salida']}</h4>
                                        <h4>Servicio: {item.Servicio}</h4>
                                        <h4>Hora salida: {item['Hora salida']}</h4>
                                        <h4>Hora llegada: {item['Hora llegada']}</h4>
                                        <h4>Orientación: {item['Trenes orientación']}</h4>
                                        <h4>Pullman: {item.Pullman}</h4>
                                        <h4>Primera: {item.Primera}</h4>
                                        <h4>Pullman(D): {item['Pullman(D)']}</h4>
                                        <h4>Precio Primera: {item['Precio Primera']}</h4>
                                        <h4>Precio Pullman: {item['Precio Pullman']}</h4>
                                        <h4>Disponibilidad: {item['Disponibilidad']}</h4>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <h3>Trenes Vuelta - {destino} a {origen}</h3>
                    <div>
                        {filtro
                            .filter(item => item['Trenes orientación'] === 'Trenes vuelta')
                            .map((item) => (
                                <div className="container" key={item.id}>
                                    <div className="item">
                                        <h4>Origen: {item.Origen}</h4>
                                        <h4>Destino: {item.Destino}</h4>
                                        <h4>Fecha salida: {item['Fecha salida']}</h4>
                                        <h4>Servicio: {item.Servicio}</h4>
                                        <h4>Hora salida: {item['Hora salida']}</h4>
                                        <h4>Hora llegada: {item['Hora llegada']}</h4>
                                        <h4>Orientación: {item['Trenes orientación']}</h4>
                                        <h4>Pullman: {item.Pullman}</h4>
                                        <h4>Primera: {item.Primera}</h4>
                                        <h4>Pullman(D): {item['Pullman(D)']}</h4>
                                        <h4>Precio Primera: {item['Precio Primera']}</h4>
                                        <h4>Precio Pullman: {item['Precio Pullman']}</h4>
                                        <h4>Disponibilidad: {item['Disponibilidad']}</h4>
                                    </div>
                                </div>
                            ))}
                    </div>
                </>
            )}
        </>
    )
}


export default Final
