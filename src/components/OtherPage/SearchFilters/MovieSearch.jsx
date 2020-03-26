import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { headerContext } from '../../Header';

export const MovieSearch = () => {
  const {state,dispatch} = useContext(headerContext)
  let g = 0;
  return (
 
          <div className='search'>{state.search.map(el =>
              <NavLink className='Navlink' to={`/s/${el.id}`}>

                {el.poster_path && g < 8 &&
                  <div onMouseLeave={() => dispatch({ type: 'cleareffect', id: el.id })} onMouseEnter={() => dispatch({ type: 'addeffect', id: el.id })} onClick={() => dispatch({ type: 'setHiddenFalse' })} className={`inSearch ${el.effect && 'activet'}`}> <div><img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} alt="" /></div>
                    <div><div className='title'>{el.title} </div> <div className='title'>{el.release_date.slice(0, -6)}</div> </div><div style={{ display: 'none' }}>{g++}</div>  </div>}
              </NavLink>
            )}</div>

  )
}
