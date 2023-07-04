import { useContext } from 'react';
import { AppContext } from '../../context/Proveedor';
import Campos from '../Campos/Campos';

const Final = ({ filtro, ocultarEncabezado }) => {
    const { orientacion, origen, destino } = useContext(AppContext);

    return (
        <>
            {orientacion === 'ida' && (
                <>
                    {ocultarEncabezado ? null : <h3>Trenes ida - {origen} a {destino}</h3>}
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
                    {ocultarEncabezado ? null : <h3>Trenes Vuelta - {destino} a {origen}</h3>}
                    <div>
                        {filtro
                            .filter(item => item['Trenes orientación'] === 'Trenes vuelta')
                            .map((item) => (
                                <Campos item={item} />
                            ))}
                    </div>
                </>
            )}
        </>
    )
}


export default Final
