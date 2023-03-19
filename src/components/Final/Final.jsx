// import React from 'react'

// const Final = ({ item }) => {


//     if (item['Trenes orientación'] === "Trenes ida") {
//         return (
//             <div>
//                 <h3>Trenes ida - {item.Origen} a {item.Destino}</h3>
//                 < div className="container" >
//                     <div className="item">
//                         <h4>Origen: {item.Origen}</h4>
//                         <h4>Destino: {item.Destino}</h4>
//                         <h4>Fecha salida: {item['Fecha salida']}</h4>
//                         <h4>Servicio: {item.Servicio}</h4>
//                         <h4>Hora salida: {item['Hora salida']}</h4>
//                         <h4>Hora llegada: {item['Hora llegada']}</h4>
//                         <h4>Pullman: {item.Pullman}</h4>
//                         <h4>Primera: {item.Primera}</h4>
//                         <h4>Pullman(D): {item['Pullman(D)']}</h4>
//                         <h4>Precio Primera: {item['Precio Primera']}</h4>
//                         <h4>Precio Pullman: {item['Precio Pullman']}</h4>
//                         <h4>Disponibilidad: {item['Disponibilidad']}</h4>
//                     </div>
//                 </div >
//             </div>)
//     } else {
//         return (
//             <div>
//                 <h3>Trenes Vuelta - {item.Destino} a {item.Origen}</h3>
//                 < div className="container" >
//                     <div className="item">
//                         <h4>Origen: {item.Destino}</h4>
//                         <h4>Destino: {item.Origen}</h4>
//                         <h4>Fecha salida: {item['Fecha salida']}</h4>
//                         <h4>Servicio: {item.Servicio}</h4>
//                         <h4>Hora salida: {item['Hora salida']}</h4>
//                         <h4>Hora llegada: {item['Hora llegada']}</h4>
//                         <h4>Pullman: {item.Pullman}</h4>
//                         <h4>Primera: {item.Primera}</h4>
//                         <h4>Pullman(D): {item['Pullman(D)']}</h4>
//                         <h4>Precio Primera: {item['Precio Primera']}</h4>
//                         <h4>Precio Pullman: {item['Precio Pullman']}</h4>
//                         <h4>Disponibilidad: {item['Disponibilidad']}</h4>
//                     </div>
//                 </div >
//             </div>)
//     }
// };

// export default Final



import React from 'react'

const Final = ({ item }) => {

    return (
        <>
            {
                item['Trenes orientación'] === "Trenes ida" &&
                < >
                    <h3>Trenes ida - {item.Origen} a {item.Destino}</h3>
                    < div className="container" >
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
                    </div >
                </ >
            }

            {
                item['Trenes orientación'] === "Trenes vuelta" &&
                <>
                    <h3>Trenes Vuelta - {item.Destino} a {item.Origen}</h3>
                    < div className="container" >
                        <div className="item">
                            <h4>Origen: {item.Destino}</h4>
                            <h4>Destino: {item.Origen}</h4>
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
                </>

            }
        </>)
};

export default Final

