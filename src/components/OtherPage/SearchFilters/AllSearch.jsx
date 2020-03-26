import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { headerContext } from '../../Header';

export const AllSearch = () => {
  const {state,dispatch} = useContext(headerContext)
  let g = 0;
  return (
 
          <div className='search'>{state.search.map(el =>
              <NavLink className='Navlink' to={`/${el.release_date?'s':'d'}/${el.id}`}>

                {el.poster_path && g < 8 &&
                  <div onMouseLeave={() => dispatch({ type: 'cleareffect', id: el.id })} onMouseEnter={() => dispatch({ type: 'addeffect', id: el.id })} onClick={() => dispatch({ type: 'setHiddenFalse' })} className={`inSearch ${el.effect && 'activet'}`}> <div><img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} alt="" /></div>
                    <div><div className='title'>{el.title} {el.name} </div> <div className='title'> {el.release_date&&el.release_date.slice(0, -6)} {el.first_air_date&&el.first_air_date.slice(0, -6)}  </div> </div><div style={{ display: 'none' }}>{g++}</div>  </div>}
              </NavLink>
            )}</div>

  )
}
