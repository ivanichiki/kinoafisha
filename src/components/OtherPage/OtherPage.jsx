import React, { useContext, useState, useEffect } from 'react'
import './OtherStyle.scss'
import { API_URL, API_KEY_3 } from '../../api'
import * as SVGLoaders from 'svg-loaders-react';
import { withRouter, useParams, NavLink } from 'react-router-dom'
import Scrollbars from 'react-custom-scrollbars';

export const OtherPage = ({ match }) => {
  const [results, setresult] = useState('')
  const [moviedata, setmoviedata] = useState()
  const [recomendation, setrecomendation] = useState('')

  console.log(match.params.userid)


  useEffect(() => {

    Hotdouble()
    getMovieDetails()
    getRecomendation()
  }, [match.params.userid])

  async function Hotdouble() {
    setresult('')
    const response = await fetch(`${API_URL}/movie/${match.params.userid}/videos?api_key=${API_KEY_3}&language=en-US&page=1`);
    const responseRU = await fetch(`${API_URL}/movie/${match.params.userid}/videos?api_key=${API_KEY_3}&language=ru&page=1`);
    const json = await response.json()

    const jsonRU = await responseRU.json()

    if (json.results[0]) {
      setresult(json.results[0].key)
    }
    else if (jsonRU.results[0]) {
      setresult(jsonRU.results[0].key)
    }



  };

  async function getMovieDetails() {
    const response = await fetch(`${API_URL}/movie/${match.params.userid}?api_key=${API_KEY_3}&language=en-US`);

    const json = await response.json()


    setmoviedata(json)


  };

  async function getRecomendation() {
    setrecomendation('')
    const response = await fetch(`${API_URL}/movie/${match.params.userid}/recommendations?api_key=${API_KEY_3}&language=en-US`);
    const json = await response.json()
    let i = 0
    setrecomendation(json.results.map(el => {
      if (el.poster_path) {
        i++;
        if (i < 7) {
          return el
        }
      }
    }))

  };
  console.log(moviedata)


  return (
    <div className='wrapp'>

      {!moviedata ? <div className='preloader' style={{ width: '990px' }}> <SVGLoaders.Bars /> </div> :
        <div className='wr'>
          <div className='filmHeader'>
            <div className='column'>
              <div className='mtitle'>

                {moviedata.title}
              </div>
              <div className='date'>

                {`(${moviedata.release_date.slice(0, -6)})`}
              </div>
            </div>
            <div className='column'>
              <div className='star'>&#9733;</div>
              <div > <div className='together'> <span className='rate'> {moviedata.vote_average} </span> <span className='podsos'>/10</span></div>
                <div> <span className='count'>{moviedata.vote_count}  </span> </div>
              </div>
            </div>


          </div>
          <img src={`https://image.tmdb.org/t/p/w500${moviedata.poster_path}`} />

          {results === '' ? <div >  </div> : <iframe width="980px" height="515" src={`https://www.youtube-nocookie.com/embed/${results}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen"></iframe>}
          <h1>About Film</h1>
          <div style={{ display: 'flex' }}>
          <img className='hiddenimg' src={`https://image.tmdb.org/t/p/w500${moviedata.poster_path}`} />
          <div className='text'>{moviedata.overview} </div>
          </div>
          {recomendation !== '' &&   
       <h1>More Like This</h1>}

      
   
    {recomendation !== '' &&
  <Scrollbars  style={{height:370}}>


          <div className='recomendation'>
            {recomendation.map(el => <div className='recom_map'>  {el && <NavLink to={`/s/${el.id}`}> <img className='recImg' src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} /> <div className='title_rec' >{el.title}</div> </NavLink>}</div>)}
         
   
          </div>
          </Scrollbars>
      }




        </div>}



    </div>
  )
}


