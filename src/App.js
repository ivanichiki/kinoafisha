import React, { useReducer, useEffect } from 'react';
import './App.css';
import Main from './components/main';
import { API_KEY_3, API_URL } from './api';

export const FilmContext = React.createContext(null)


function App() {

  async function fetchMovie() {

    const response = await fetch(`${API_URL}/trending/movie/week?sort_by=popularity.desc&api_key=${API_KEY_3}`);
    const json = await response.json()
    console.log(json)
    dispatch({ type: 'setIstate', value: json })
    dispatch({ type: "setLoad" })
  };
  async function fetchMovie2() {

    const response = await fetch(`${API_URL}/trending/movie/week?sort_by=popularity.desc&page=2&api_key=${API_KEY_3}`);
    const json = await response.json()
    console.log(json)
    dispatch({ type: 'setIstate', value: json })
    dispatch({ type: "setLoad" })
  };

  async function fetchTVShows() {
    const response = await fetch(`${API_URL}/trending/tv/week?sort_by=popularity.desc&api_key=${API_KEY_3}`);
    const json = await response.json()
    console.log(json)
    dispatch({ type: 'setTV', value: json })
    dispatch({ type: "settvLoad" })
  };
  async function fetchTVShows2() {
    const response = await fetch(`${API_URL}/trending/tv/week?sort_by=popularity.desc&page=2&api_key=${API_KEY_3}`);
    const json = await response.json()
    console.log(json)
    dispatch({ type: 'setTV', value: json })
    dispatch({ type: "settvLoad" })
  };

  async function Hot() {
    const response = await fetch(`${API_URL}/tv/on_the_air?api_key=${API_KEY_3}&language=en-US&page=1`);
    const json = await response.json()
    console.log(json)
    dispatch({ type: 'setHot', value: json })
    dispatch({ type: "settvLoad" })
  };
  async function Hotdouble(key) {
    const response = await fetch(`${API_URL}/tv/${key}/videos?api_key=${API_KEY_3}&language=en-US&page=1`);
    const json = await response.json()

    
  };

  useEffect(() => {
  
    Hot()
    fetchMovie()
    fetchMovie2()
    fetchTVShows2()
    fetchTVShows()
    let i=0;
    while (i<10) {
      // Hotdouble(state.hot[i].id)
      i++;
    }
  }, [])

  const initialState = { films: [], tvshows: [], hot: [], load: true, tvload: true, right: 0, rightbtn: true, leftbtn: false, TVrightbtn: true, TVleftbtn: false, tvRight: 0,vRight:0, Vleftbtn:false, Vrightbtn:true }
  const filmReducer = (state, action) => {
    switch (action.type) {
      case 'setIstate':
        return {
          ...state,
          films: [].concat(state.films, action.value.results)

        }
      case 'setTV':
        return {
          ...state,
          tvshows: [].concat(state.tvshows, action.value.results)
        }
      case 'setHot':
        return {
          ...state,
          hot: action.value.results
        }

      case 'setLoad':
        return {
          ...state,
          load: false
        }
      case 'settvLoad':
        return {
          ...state,
          tvload: false
        }
      case 'scroll':
        console.log(state.right)

        return {
          ...state,
          right: state.right + action.value,
          leftbtn: state.right + action.value == 0 ? false : true,
          rightbtn: state.right + action.value == action.value * 4 ? false : true,

        }

      case 'TVscroll':
        return {
          ...state,
          tvRight: state.tvRight + action.value,
          TVleftbtn: state.tvRight + action.value == 0 ? false : true,
          TVrightbtn: state.tvRight + action.value == action.value * 4 ? false : true,

        }
        case 'Videoscroll':
          return {
            ...state,
            vRight: state.vRight + action.value,
            Vleftbtn: state.vRight + action.value == 0 ? false : true,
            Vrightbtn: state.vRight + action.value == action.value * 19 ? false : true,

          }
      case 'linkforvideo': 
      console.log(action.value)
      console.log(action.id)
      return {
        ...state,
        hot: state.hot.map(el=> {
          if (el.id==action.id ) {
          return {...el,link:action.value}
          }
          else return el
        })
      }

      default:
        return state;
    }

  }

  const [state, dispatch] = useReducer(filmReducer, initialState)



  useEffect(() => {
  
    console.log(state.hot)
    let i=0;
    while (i<10) {
      // Hotdouble(state.hot[i].id)
      i++;
    }
  }, [])



  return (
    <FilmContext.Provider
      value={{ state, dispatch }}>
      <div className="App">
        <Main />


      </div>

    </FilmContext.Provider>
  );
}

export default App;
