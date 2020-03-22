import React, { useContext } from 'react'
import { FilmContext } from '../../App'
import './OtherStyle.scss'

export const OtherPage = () => {
  const { state, dispatch } = useContext(FilmContext)
  return (
    <div className='wrapp'>
       <img src={`https://image.tmdb.org/t/p/w500${state.img}`} />
    </div>
  )
}
