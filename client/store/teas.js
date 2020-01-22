import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TEAS = 'GET_TEAS'
const GET_SINGLE_TEA = 'GET_SINGLE_TEA'
const ADD_SINGLE_TEA = 'ADD_SINGLE_TEA'
const REMOVE_SINGLE_TEA = 'REMOVE_SINGLE_TEA'
const UPDATE_SINGLE_TEA = 'UPDATE_SINGLE_TEA'

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

const addSingleTea = newTea => ({
  type: ADD_SINGLE_TEA,
  newTea
})

const updateSingleTea = editedTea => ({
  type: UPDATE_SINGLE_TEA,
  editedTea
})

const removeSingleTea = deletedTea => ({
  type: REMOVE_SINGLE_TEA,
  deletedTea
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

export const createSingleTea = newTea => async dispatch => {
  try {
    const {data} = await axios.post(`/api/teas`, newTea)
    dispatch(addSingleTea(data))
  } catch (err) {
    console.log(err)
  }
}

export const editSingleTea = (id, editedTea) => async dispatch => {
  try {
    const res = await axios.put(`/api/teas/${id}`, editedTea)
    console.log(res, 'response from put request')
    dispatch(updateSingleTea(res.data))
  } catch (err) {
    console.log(err)
  }
}

export const deleteSingleTea = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/teas/${id}`)
    console.log(res, 'response from delete request')
    dispatch(removeSingleTea(res.data))
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
    case GET_SINGLE_TEA:
      return {...state, singleTea: action.tea}
    case ADD_SINGLE_TEA:
      return {...state, allTeas: [...state.allTeas, action.newTea]}
    case REMOVE_SINGLE_TEA:
      return {
        allTeas: [
          ...state.allTeas.filter(
            teaObject => teaObject.id !== action.deletedTea.id
          )
        ],
        singleTea: {}
      }
    case UPDATE_SINGLE_TEA:
      return {
        allTeas: [
          ...state.allTeas.filter(
            teaObject => teaObject.id !== action.editedTea.id
          ),
          action.editedTea
        ],
        singleTea: {}
      }
    default:
      return state
  }
}

export default teasReducer
