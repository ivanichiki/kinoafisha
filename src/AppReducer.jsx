export const filmReducer = (state, action) => {
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
        vRight: state.vRight+action.value<=1300*18?state.vRight + action.value: 0,
        Vleftbtn: state.vRight + action.value == 0 ? false : true,
        
        Vrightbtn: state.vRight + action.value == action.value * 18 ? false : true,

      }
    case 'linkforvideo':
 
      return {
        ...state,
        hot: state.hot.map(el => {
          if (el.id == action.id) {
            return { ...el, link: action.value,ystate:action.ystate }
          }
          else return el
        })
      }
      case 'autoscroll': {
       
        return {
          ...state, 
          toggle:true
        }
      }
      case 'againautoscroll': {
        return {
          ...state, 
          toggle:false
        }
      }
    
    default:
      return state;
  }

}
