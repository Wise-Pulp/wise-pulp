const login = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        id: action.id,
      }
    default:
      return state
  }
}

export default login