import React, { useContext, useState, useEffect } from 'react'
import { FilmContext } from '../App'
import { FilmContainer } from './FilmContainer'
import { TVContainer } from './TVContainer'
import { Spring } from 'react-spring/renderprops'
import { SliderContainer } from './SliderContainer'
import { Header } from './Header'

const Main = props => {

  const [tog, settog] = useState(true)
  const [interv, setInterv] = useState()
  const { state, dispatch } = useContext(FilmContext)


  useEffect(() => {

    if (state.toggle) {
     clearInterval(interv)
    }

    if (state.toggle!==true& tog) {
      const interval =
        setInterval(() => {
          
            dispatch({ type: 'Videoscroll', value: 1300 })
          
        }, 5000)
      setInterv(interval)
    }
    return function cleanup() {
      clearInterval(interv)
    }

  }, [state.toggle])





  console.log(tog)
  return (
    <div className='wrapper'>



      <div className='slider'>
        <div  onMouseLeave={()=> dispatch({type:'againautoscroll'})} onMouseEnter={() => dispatch({ type: 'autoscroll' })}
          className='horizontal slider'>
          <Spring
            from={{ right: 0 }}
            to={{ right: state.vRight }}
            config={{ duration: 200 }}
          >
            {props =>
              <SliderContainer settog={settog} type={state.films} props={props} />
            }
          </Spring>
        </div>
        <div onMouseEnter={() => dispatch({ type: 'autoscroll' })} onClick={()=> settog} style={state.Vrightbtn ? { display: 'block' } : { display: 'none' }} onClick={() => dispatch({ type: 'Videoscroll', value: 1300 })} className={`rightButton sl ${state.toggle && 'active'}`}> <span className='stelka'> &rsaquo; </span> </div>

        {state.Vleftbtn&state.vRight!==0 && <div onMouseEnter={() => dispatch({ type: 'autoscroll' })} onClick={() => dispatch({ type: 'Videoscroll', value: -1300 })} className='rightButton left lsl'> <span className='stelka'> &lsaquo; </span> </div>}
      </div>








      <div className='movieTitle'> This week's top movies </div>

      <div className='brnwrapper'>
        <div className='horizontal'>
          <Spring
            from={{ right: 0 }}
            to={{ right: state.right }}
            config={{ duration: 300 }}
          >
            {props =>
              <FilmContainer type={state.films} props={props} />
            }
          </Spring>
        </div>
        <div style={state.rightbtn ? { display: 'block' } : { display: 'none' }} onClick={() => dispatch({ type: 'scroll', value: 1200 })} className='rightButton'> <span className='stelka'> &rsaquo; </span> </div>

        {state.leftbtn && <div onClick={() => dispatch({ type: 'scroll', value: -1200 })} className='rightButton left'> <span className='stelka'> &lsaquo; </span> </div>}
      </div>

      <div className='movieTitle'> This week's top TV </div>
      <div className='brnwrapper'>

        <div className='horizontal'>

          <Spring
            from={{ right: 0 }}
            to={{ right: state.tvRight }}
            config={{ duration: 300 }}
          >
            {propss =>
              <TVContainer props={propss} />
            }
          </Spring>

        </div>
        <div style={state.TVrightbtn ? { display: 'block' } : { display: 'none' }} onClick={() => dispatch({ type: 'TVscroll', value: 1200 })} className='rightButton TV'> <span className='stelka'> &rsaquo; </span> </div>
        {state.TVleftbtn && <div onClick={() => dispatch({ type: 'TVscroll', value: -1200 })} className='rightButton left TV'> <span className='stelka'> &lsaquo; </span> </div>}

      </div>

    </div>
  )
}



export default Main
