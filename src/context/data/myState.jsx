import React from 'react'
import MyContext from './myContext'


const myState = (props) => {

  return (
    <MyContext.Provider value={[]}>
      {props.children}
    </MyContext.Provider>
  )
}

export default myState