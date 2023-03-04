import React from 'react'
import Final from '../Final/Final'


const Ante = ({ filtro }) => {

  return (
    <>
      {filtro.map((item) => (<Final key={item.id} item={item} />))}
    </>

  )
}

export default Ante



