import React, { useContext } from 'react'
import { FilmContext } from '../App'
import { FilmContainer } from './FilmContainer'
import { TVContainer } from './TVContainer'
import { Spring } from 'react-spring/renderprops'
import { SliderContainer } from './SliderContainer'
import { Header } from './Header'

const Main = props => {



  const { state, dispatch } = useContext(FilmContext)
  console.log(state.films)
  return (
    <div className='wrapper'>


<div className='slider'>
  <div className='horizontal slider'>
    <Spring
      from={{ right: 0 }}
      to={{ right: state.vRight }}
      config={{ duration: 300 }}
    >
      {props =>
        <SliderContainer type={state.films} props={props} />
      }
    </Spring>
  </div>
  <div style={state.Vrightbtn ? { display: 'block' } : { display: 'none' }} onClick={() => dispatch({ type: 'Videoscroll', value: 1300 })} className='rightButton sl'> <span className='stelka'> &rsaquo; </span> </div>

  {state.Vleftbtn && <div onClick={() => dispatch({ type: 'Videoscroll', value: -1300 })} className='rightButton left lsl'> <span className='stelka'> &lsaquo; </span> </div>}
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
