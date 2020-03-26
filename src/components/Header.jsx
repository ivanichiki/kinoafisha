import React, { useReducer, useEffect, useRef } from 'react'
import './Header.scss'
import { NavLink, Link } from 'react-router-dom'
import { HeaderReducer } from '../headerreducer'
import { API_URL, API_KEY_3 } from '../api'
import { MovieSearch } from './OtherPage/SearchFilters/MovieSearch'
import { TVSearch } from './OtherPage/SearchFilters/TVSeatch'
import { AllSearch } from './OtherPage/SearchFilters/AllSearch'


export const headerContext = React.createContext(null)
export const Header = () => {

  async function fetchSearch(text,buffer) {
    console.log(buffer)
    const response = await fetch(`${API_URL}/search/${buffer}?&api_key=${API_KEY_3}&query=${text}&sort_b=ypopularity.desc`)
 
    const json = await response.json()

    dispatch({ type: 'setHeaderState', value: json.results })
  };
  const initialState = { search: [], inputValue: '', hidden: false, blur: false, styleALL:false, styleMovie:false, styleTV:false, toggleFilter:false, buffer:'All' }
  const [state, dispatch] = useReducer(HeaderReducer, initialState)

  console.log(state.search)
  useEffect(() => {
    let minbuffer = ''
    if (state.buffer=='TV') {
      minbuffer='tv'
    }
    if (state.buffer=='Movie') {
      minbuffer='movie'
    }
   if (state.buffer=='All') {
     minbuffer='multi'
   }
    fetchSearch(state.inputValue, minbuffer)

  }, [state.inputValue,state.buffer])
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch({ type: 'setHiddenFalse' })
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }



  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)

  return (

    <div className='Header'>
      <div className='wrap_header'>
        <div className='littleheader'>
          <NavLink to='/'>      <img src='https://upload.wikimedia.org/wikipedia/commons/6/6a/New-imdb-logo.png' />
          </NavLink>

        </div>
        <div className='filterWrapper'>
        <div   onClick={()=> dispatch({type: 'setToggleFilter'})}  className='filter'>{state.buffer}
    
        </div>
        {state.toggleFilter&&
        <div onMouseLeave={()=> dispatch({type:'disToggleFilter'})} className='hiddenbar'>
        <div  onClick={()=> dispatch({type: 'changeOnAll'})}  onMouseLeave={()=>dispatch({type:'cleareff'})}  onMouseEnter={()=> dispatch({type:'effectALL'})} className={`filterType ${state.styleALL&&'activeted'}`}>All</div>
          <div onClick={()=> dispatch({type: 'changeOnMovie'})}  onMouseLeave={()=>dispatch({type:'cleareff'})} onMouseEnter={()=> dispatch({type:'effectMovie'})}className={`filterType ${state.styleMovie&&'activeted'}`}>Movie</div>
          <div  onClick={()=> dispatch({type: 'changeOnTV'})}  onMouseLeave={()=>dispatch({type:'cleareff'})} onMouseEnter={()=> dispatch({type:'effectTV'})}className={`filterType ${state.styleTV&&'activeted'}`}>TV Serials</div>
        </div>}
        </div>
        <div ref={wrapperRef} className='input'>   <input placeholder='Search KinoAfisha ' onBlur={() => dispatch({ type: 'setBlurFalse' })} onFocus={() => dispatch({ type: 'setHiddenTrue' })} onChange={e => dispatch({ type: 'changeInputValue', value: e.target.value })} value={state.inputValue} type="text" />
          {state.search && state.hidden ?
          <headerContext.Provider
          value={{state,dispatch}}
          >
            {state.buffer=='All'&& <AllSearch/>}
            {state.buffer=='Movie'&& <MovieSearch/>}
            {state.buffer=='TV'&& <TVSearch/> }
        </headerContext.Provider>
        
         : null}

        </div>

      </div>

    </div>
  )
}
