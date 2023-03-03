import React from 'react'

const Final = ({ item }) => {

    return (
        <div className="container" >
            <div className="item">
                <h4 >{item.Destino}</h4>
                <h4 >{item.Origen}</h4>
                <h4 >{item['Fecha salida']}</h4>
                <h4 >{item.Servicio}</h4>
                <h4 >{item['Hora salida']}</h4>
                <h4 >{item['Hora llegada']}</h4>
                <h4 >{item['Trenes orientación']}</h4>
                <h4>
                    {item.Disponibilidad === "Disponible" ? (
                        <span className="disponibilidad">Disponible</span>
                    ) : (
                        <span className="no-disponibilidad">No disponible</span>
                    )}
                </h4>
                <h4 >{item.Pullman}</h4>
                <h4 >{item.Primera}</h4>
                <h4 >{item['Pullman(D)']}</h4>
                <h4 >{item['Precio Primera']}</h4>
                <h4 >{item['Precio Pullman']}</h4>
            </div>
        </div>)
};

export default Final


