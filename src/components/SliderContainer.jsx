import React, { useContext, useState } from 'react'
import { FilmContext } from '../App'
import { API_URL, API_KEY_3 } from '../api'
import * as SVGLoaders from 'svg-loaders-react';
import { NavLink } from 'react-router-dom';

export const SliderContainer = (props) => {

  const { state, dispatch } = useContext(FilmContext)

  const [order, setorder] = useState(true)


  async function Hotdouble(id) {
    const response = await fetch(`${API_URL}/tv/${state.hot[id].id}/videos?api_key=${API_KEY_3}&language=en-US&page=1`);
    const responseRU = await fetch(`${API_URL}/tv/${state.hot[id].id}/videos?api_key=${API_KEY_3}&language=ru`);
    const json = await response.json()
    const jsonRU = await responseRU.json()
    
    let results = ''

    if (jsonRU.results[0]) {
      results = jsonRU.results[0].key
    }

    else if (json.results[0]) {
      results = json.results[0].key
    }

    dispatch({ type: 'linkforvideo', value: results, id: state.hot[id].id })
  
  };

  let i = 0;
  if (state.hot.length > 0 & order) {
    while (i < 20) {
      Hotdouble(i)
      i++;

      setorder(false)

    }
  }
  let g = 0;
  return (
    <div>
      {state.tvload ? 'Loading' :

        <div style={props.props} className='imgcontainer sliderimgconainer'>
          {state.hot.map(el =>
            <div >
             {g<19&& <div className='videocontainer'>
             <NavLink to={`/d/${el.id}`}>

                <img className='sliderimg' src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} />
                </NavLink>
              {!el.link ? <div className='preloader' style={{width:'990px'}}> <SVGLoaders.Bars /> </div>:  <iframe onClicck={() => props.settog(false)} height='500' width='960px' src={`https://www.youtube-nocookie.com/embed/${el.link}?autoplay=0`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
              </div>}
            {g++}
              
            </div>)}






        </div>



      }
    </div>
  )
}




