import React, { useContext } from 'react'
import { FilmContext } from '../App'
import { NavLink } from 'react-router-dom'



export const TVContainer = (props) => {

  const { state, dispatch } = useContext(FilmContext)
  console.log(state.tvshows.results)
  return (
    <div>
      {state.tvload ? 'Loading' :

        <div style={props.props} className='imgcontainer'>
          {state.tvshows.map(el =>
            <div > 
               <NavLink to={`/d/${el.id}`}>
                 
              <img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} />
              </NavLink>
          <div className='filmTitle'> <div className='score'>&#9733; <span> {el.vote_average} </span></div> < span className='title'> {el.name}</span></div>




          
            </div>)}






        </div>



      }
    </div>
  )
}
