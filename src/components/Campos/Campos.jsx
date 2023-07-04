import React from "react"

const Campos = ({ item }) => {

    return (
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
    )
}

export default Campos

