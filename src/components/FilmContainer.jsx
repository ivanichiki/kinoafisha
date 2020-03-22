import React, { useContext } from 'react'
import { FilmContext } from '../App'
import { Spring } from 'react-spring/renderprops'
import { NavLink } from 'react-router-dom'


export const FilmContainer = (props) => {

  const { state, dispatch } = useContext(FilmContext)

  return (
    <div>
      {state.load ? 'Loading' :

        <div style={props.props} className='imgcontainer'>
          {state.films.map(el =>
            <div>
              <NavLink to='/other'>
              <img onClick={()=> dispatch({type:'setOtherPage', img:el.poster_path})} src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} />
              </NavLink>
          <div className='filmTitle'> <div className='score'>&#9733; <span> {el.vote_average} </span></div> < span className='title'> {el.title}</span></div>
            </div>)}

        </div>



      }
    </div>
  )
}
