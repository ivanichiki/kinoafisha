import React, { useContext } from 'react'
import { FilmContext } from '../App'



export const TVContainer = (props) => {

  const { state, dispatch } = useContext(FilmContext)
  console.log(state.tvshows.results)
  return (
    <div>
      {state.tvload ? 'Loading' :

        <div style={props.props} className='imgcontainer'>
          {state.tvshows.map(el =>
            <div > 
              <a href={`https://www.google.com/search?q=${el.name}&oq=${el.name}`}>
              <img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} />
              </a>
          <div className='filmTitle'> <div className='score'>&#9733; <span> {el.vote_average} </span></div> < span className='title'> {el.name}</span></div>




          
            </div>)}






        </div>



      }
    </div>
  )
}
