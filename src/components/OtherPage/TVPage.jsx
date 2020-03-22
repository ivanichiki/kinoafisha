import React, { useContext, useState, useEffect } from 'react'
import './OtherStyle.scss'
import { API_URL, API_KEY_3 } from '../../api'
import * as SVGLoaders from 'svg-loaders-react';


export const TVPage = ({ match }) => {
  const [results, setresult] = useState()
  const [moviedata, setmoviedata] = useState()


  console.log(match.params.userid)


  useEffect(() => {

    Hotdouble()
    getMovieDetails()
  }, [])

  async function Hotdouble() {
    const response = await fetch(`${API_URL}/tv/${match.params.userid}/videos?api_key=${API_KEY_3}&language=en-US&page=1`);
    const json = await response.json()
    if (json.results) {
      setresult(json.results[0].key)
    }

  };

  async function getMovieDetails() {
    const response = await fetch(`${API_URL}/tv/${match.params.userid}?api_key=${API_KEY_3}&language=en-US`);

    const json = await response.json()


    setmoviedata(json)


  };


  console.log(moviedata)


  return (
    <div className='wrapp'>

      {!moviedata ? <div className='preloader' style={{ width: '990px' }}> <SVGLoaders.Bars /> </div> :
        <div className='wr'>
          <div className='filmHeader'>
            <div className='mtitle'>

              {moviedata.name}
            </div>
            <div className='date'>

              {`(${moviedata.first_air_date.slice(0,-6)})`}
            </div>
          </div>
          <img src={`https://image.tmdb.org/t/p/w500${moviedata.poster_path}`} />

          {!results ? <div className='preloader' style={{ width: '990px' }}> <SVGLoaders.Bars /> </div> : <iframe width="900px" height="515" src={`https://www.youtube-nocookie.com/embed/${results}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
          <h1>About Film</h1>
          <div className='text'>{moviedata.overview} </div>



        </div>}






    </div>
  )
}

