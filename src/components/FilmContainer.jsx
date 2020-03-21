import React, { useContext } from 'react'
import { FilmContext } from '../App'
import { Spring } from 'react-spring/renderprops'


export const FilmContainer = (props) => {

  const { state, dispatch } = useContext(FilmContext)

  return (
    <div>
      {state.load ? 'Loading' :

        <div style={props.props} className='imgcontainer'>
          {state.films.map(el =>
            <div>
              <a href={`https://www.google.com/search?q=${el.title}&oq=${el.title}`}>
              <img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} />
              </a>
          <div className='filmTitle'> <div className='score'>&#9733; <span> {el.vote_average} </span></div> < span className='title'> {el.title}</span></div>
            </div>)}

        </div>



      }
    </div>
  )
}
