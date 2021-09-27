import { csrfFetch } from "./csrf"

const GET_ALL_VENUES = 'venues/GET_ALL_VENUES'
const GET_ONE_VENUE = 'venues/GET_ONE_VENUE'

const getAllVeunes = (venues) => ({
    type: GET_ALL_VENUES,
    venues
})

const getOneVenue = (venue) => ({
    type: GET_ONE_VENUE,
    venue
})

export const getVenues = () => async (dispatch) => {
    const res = await fetch('/api/venues')
    console.log(res)
    if (res.ok) {
        const allVenues = await res.json()
        dispatch(getAllVeunes(allVenues))
        return allVenues
    }
}

export const getIndividualVenue = (venueId) => async (dispatch) => {
    const res = await csrfFetch(`/api/venues/${venueId}`)
    if (res.ok) {
        const venue = await res.json()
        console.log(venue)
        dispatch(getOneVenue(venue))
    }
}


const initialState = { all: {} }
const venueReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_VENUES:
            Object.values(action.venues).forEach(venue => {
                newState.all[venue.id] = venue
            })
            return newState
        case GET_ONE_VENUE:
            newState.all[action.venue.id] = action.venue
            return newState
        default: return state
    }
}

export default venueReducer