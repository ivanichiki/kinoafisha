import React, { useReducer, useEffect } from 'react';
import './App.css';
import Main from './components/main';
import { API_KEY_3, API_URL } from './api';
import { Header } from './components/Header';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom';
import { OtherPage } from './components/OtherPage/OtherPage';
import { TVPage } from './components/OtherPage/TVPage';
import { filmReducer } from './AppReducer';


export const FilmContext = React.createContext(null)


function App() {

  async function fetchMovie() {

    const response = await fetch(`${API_URL}/trending/movie/week?sort_by=popularity.desc&api_key=${API_KEY_3}`);
    const json = await response.json()

    dispatch({ type: 'setIstate', value: json })
    dispatch({ type: "setLoad" })
  };
  async function fetchMovie2() {

    const response = await fetch(`${API_URL}/trending/movie/week?sort_by=popularity.desc&page=2&api_key=${API_KEY_3}`);
    const json = await response.json()

    dispatch({ type: 'setIstate', value: json })
    dispatch({ type: "setLoad" })
  };

  async function fetchTVShows() {
    const response = await fetch(`${API_URL}/trending/tv/week?sort_by=popularity.desc&api_key=${API_KEY_3}`);
    const json = await response.json()

    dispatch({ type: 'setTV', value: json })
    dispatch({ type: "settvLoad" })
  };
  async function fetchTVShows2() {
    const response = await fetch(`${API_URL}/trending/tv/week?sort_by=popularity.desc&page=2&api_key=${API_KEY_3}`);
    const json = await response.json()
 
    dispatch({ type: 'setTV', value: json })
    dispatch({ type: "settvLoad" })
  };

  async function Hot() {
    const response = await fetch(`${API_URL}/tv/on_the_air?api_key=${API_KEY_3}&language=en&page=1&sort_b=ypopularity.desc`);
    const json = await response.json()

    dispatch({ type: 'setHot', value: json })
    dispatch({ type: "settvLoad" })
  };


  useEffect(() => {

    Hot()
    fetchMovie()
    fetchMovie2()
    fetchTVShows2()
    fetchTVShows()

  }, [])

  const initialState = { films: [], tvshows: [], hot: [], load: true, tvload: true, right: 0, rightbtn: true, leftbtn: false, TVrightbtn: true, TVleftbtn: false, tvRight: 0, vRight: 0, Vleftbtn: false, Vrightbtn:true,toggle:false }

  const [state, dispatch] = useReducer(filmReducer, initialState)


  return (
    <HashRouter>
    <FilmContext.Provider
      value={{ state, dispatch }}>


      <div className="App">
        <Header />
       <Route exact path='/' render={()=>  <Main />}/>
       <Route exact path="/s/:userid"
        component= {OtherPage}/>  
        <Route exact path="/d/:userid"
        component= {TVPage}/>  
      </div>

    </FilmContext.Provider>
    </HashRouter>
  );
}

export default App;
