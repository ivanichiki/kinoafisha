

export const HeaderReducer = (state, action) => {
  switch (action.type) {
    case 'setHeaderState': {
      return {
        ...state,
        search: action.value
      }
    }
    case 'changeInputValue': {
      return {
        ...state,
        inputValue: action.value
      }
    }
    case 'setHiddenTrue': {
      return {
        ...state,
        hidden: true,
        blur: false
      }
    }
    case 'setHiddenFalse': {
      return {
        ...state,
        hidden: false,

      }
    }
    case `setBlurFalse`: {
      return {
        ...state,
        blur: true

      }
    }
    case 'addeffect': {
      return {
        ...state,
        search: state.search.map(el => {
          if (el.id == action.id) {
            return { ...el, effect: true }
          }
          else return { ...el, effect: false }
        })
      }
    }
    case 'cleareffect': {
      return {
        ...state,
        search: state.search.map(el => {
          if (el.id == action.id) {
            return { ...el, effect: false }
          }
          else return { ...el }
        })
      }
    }
    case 'effectALL': {
      return {
        ...state,
        styleALL: true,
        styleMovie: false,
        styleTV: false
      }
    }
    case 'effectMovie': {
      return {
        ...state,
        styleALL: false,
        styleMovie: true,
        styleTV: false
      }
    }
    case 'effectTV': {
      return {
        ...state,
        styleALL: false,
        styleMovie: false,
        styleTV: true
      }
    }
    case 'cleareff': {
      return {
        ...state,
        styleALL: false,
        styleMovie: false,
        styleTV: false
      }
    }
    case 'setToggleFilter': {
      return {
        ...state,
        toggleFilter: true
      }
    }
    case'disToggleFilter': {
      return {
        ...state,
        toggleFilter: false
      }
    }
    case 'changeOnAll': {
     return { ...state, 
      buffer: 'All',
      toggleFilter: false
     }
    }
    case 'changeOnTV': {
      return { ...state, 
       buffer: 'TV',
       toggleFilter: false
      }
     }
     case 'changeOnMovie': {
      return { ...state, 
       buffer: 'Movie',
       toggleFilter: false
      }
     }
    default:
      return state;
  }
}
