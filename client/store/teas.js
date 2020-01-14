import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TEAS = 'GET_TEAS'

/**
 * INITIAL STATE
 */
const initialState = {
  allTeas: []
}

/**
 * ACTION CREATORS
 */
const getTeas = teas => ({
  type: GET_TEAS,
  teas
})

/**
 * THUNK CREATORS
 */
export const fetchTeas = () => async dispatch => {
  try {
    const res = await axios.get('/api/teas')
    dispatch(getTeas(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
function teasReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEAS:
      return {...state, allTeas: action.teas}
    default:
      return state
  }
}

export default teasReducer
