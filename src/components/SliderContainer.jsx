import React, { useContext, useState } from 'react'
import { FilmContext } from '../App'
import { API_URL, API_KEY_3 } from '../api'


export const SliderContainer = (props) => {

  const { state, dispatch } = useContext(FilmContext)
  console.log(state.hot)
  const [order, setorder] = useState(true)

  async function Hotdouble(id) {
    const response = await fetch(`${API_URL}/tv/${state.hot[id].id}/videos?api_key=${API_KEY_3}&language=en-US&page=1`);
    const responseRU = await fetch(`${API_URL}/tv/${state.hot[id].id}/videos?api_key=${API_KEY_3}&language=ru`);
    const json = await response.json()
    const jsonRU = await responseRU.json()
    console.log(json)
    dispatch({type:'linkforvideo',value:jsonRU.results[0]?jsonRU.results[0].key:json.results[0].key, id:state.hot[id].id})
    
  };

let i=0;
  if (state.hot.length>0&order){
    while (i<19) {
      Hotdouble(i)
      i++;
    
      setorder(false)
    
    }
  }
  
  return (
    <div>
      {state.tvload ? 'Loading' :

        <div style={props.props} className='imgcontainer'>
          {state.hot.map(el =>
            <div className='videocontainer'> 

              <a href={`https://www.google.com/search?q=${el.name}&oq=${el.name}`}>
              <img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} />
              </a>

              <iframe height='500' width='960px' src={`https://www.youtube.com/embed/${el.link}`} frameborder="0" allow="accelerometer; autoplay=1; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         
          
            </div>)}






        </div>



      }
    </div>
  )
}
