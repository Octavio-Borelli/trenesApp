import React from 'react'
import Final from '../Final/Final'


const Ante = ({ viaje }) => {

  return (
    <>
      {viaje.map((item) => (<Final key={item.id} item={item} />))}
    </>

  )
}

export default Ante



