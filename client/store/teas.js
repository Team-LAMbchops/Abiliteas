import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TEAS = 'GET_TEAS'
const GET_SINGLE_TEA = 'GET_SINGLE_TEA'

/**
 * INITIAL STATE
 */
const initialState = {
  allTeas: [],
  singleTea: {}
}

/**
 * ACTION CREATORS
 */
const getTeas = teas => ({
  type: GET_TEAS,
  teas
})

const getSingleTea = tea => ({
  type: GET_SINGLE_TEA,
  tea
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
export const fetchSingleTea = id => async dispatch => {
  try {
    const res = await axios.get(`/api/teas/${id}`)
    dispatch(getSingleTea(res.data))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
function teasReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TEAS:
      return {...state, allTeas: action.teas}
    case GET_SINGLE_TEA: {
      return {...state, singleTea: action.tea}
    }
    default:
      return state
  }
}

export default teasReducer
