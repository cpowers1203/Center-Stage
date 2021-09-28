import { csrfFetch } from "./csrf"

const GET_ALL_VENUES = 'venues/GET_ALL_VENUES'
const GET_ONE_VENUE = 'venues/GET_ONE_VENUE'
const GET_VENUE_COMMENTS = 'venues/GET_VENUE_COMMENTS'

const getAllVeunes = (venues) => ({
    type: GET_ALL_VENUES,
    venues
})

const getOneVenue = (venue) => ({
    type: GET_ONE_VENUE,
    venue
})

const getVenueComments = (comments) => ({
    type: GET_VENUE_COMMENTS,
    comments
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

export const getIndividualVenueComments = (venueId) => async (dispatch) => {
    const res = await csrfFetch(`/api/venues/${venueId}/comments`)
    if (res.ok) {
        const venueComments = await res.json()
        dispatch(getVenueComments(venueComments))
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
        case GET_VENUE_COMMENTS:
            Object.values(action.comments).forEach(comment => {
                const venueId = comment.venueId
                newState.all[venueId].comments[comment.id] = comment 
            })
            return newState
        default: return state
    }
}

export default venueReducer