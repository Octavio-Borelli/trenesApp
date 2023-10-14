import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/Proveedor';
import Campos from '../Campos/Campos';
import useFirestore from '../../hooks/useFirestore';
import CamposVUelta from '../CamposVuelta/CamposVUelta';


const Final = ({
    filtro,
    ocultarEncabezado,
    setOcultarEncabezado,
    encabezadoCompleto }) => {
    const {
        orientacion,
        origen,
        destino } = useContext(AppContext);
    const { viaje } = useFirestore();

    useEffect(() => {
        if (filtro.length > 0) {
            setOcultarEncabezado(false);
        }
        else if (
            (origen === '' && destino === '') ||
            (viaje && !viaje.some(item => item.Origen === origen)) ||
            (viaje && !viaje.some(item => item.Destino === destino)) ||
            filtro.length === 0 ||
            (
                (viaje && !viaje.some(item => item.Origen.length !== origen.length)) ||
                (viaje && !viaje.some(item => item.Destino.length !== destino.length))
            )
        ) {
            setOcultarEncabezado(false);
        }
        else {
            setOcultarEncabezado(true);
        }
    }, [viaje, filtro]);

    return (
        <>
            {orientacion === 'ida' && (
                <>
                    {ocultarEncabezado ? null : <h3>{encabezadoCompleto}</h3>}
                    <div>
                        {filtro
                            .filter(item => item['Trenes orientación'] === 'Trenes ida')
                            .map((item) => (
                                <Campos item={item} />
                            ))}
                    </div>
                </>
            )}
            {orientacion === 'idaYvuelta' && (
                <>
                    {ocultarEncabezado ? null : <h3>Trenes ida - {origen} a {destino}</h3>}
                    <div>
                        {filtro
                            .filter(item => item['Trenes orientación'] === 'Trenes ida')
                            .map((item) => (

                                <Campos item={item} />
                            ))}
                    </div>
                    {ocultarEncabezado ? null : <h3>Trenes vuelta - {destino} a {origen}</h3>}
                    {<div>
                        {filtro
                            .filter(item => item['Trenes orientación'] === 'Trenes vuelta')
                            .map((item) => (
                                <CamposVUelta item={item} />
                            ))}
                    </div>}
                </>
            )}
        </>
    )
}

export default Final

