import { csrfFetch } from "./csrf"

const GET_ALL_VENUES = 'venues/GET_ALL_VENUES'
const GET_ONE_VENUE = 'venues/GET_ONE_VENUE'
const GET_VENUE_COMMENTS = 'venues/GET_VENUE_COMMENTS'
const ADD_VENUE_COMMENT = 'venues/ADD_VENUE_COMMENT'
const EDIT_COMMENT = 'venue/EDIT_COMMENT'
const REMOVE_COMMENT = 'venues/REMOVE_COMMENT'

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

const addVenueComment = ( comment) => ({
    type: ADD_VENUE_COMMENT,
    comment
})

const editVenueComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
})

const deleteVenueComment = (venueId, commentId) => ({
    type: REMOVE_COMMENT,
    payload: {
        venueId, commentId
    }
})

export const getVenues = () => async (dispatch) => {
    const res = await fetch('/api/venues')
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
        dispatch(getOneVenue(venue))
    }
}

export const getIndividualVenueComments = (venueId) => async (dispatch) => {
    const res = await csrfFetch(`/api/venues/${venueId}/comments`)
    
    if (res.ok) {
        const venueComments = await res.json()
        dispatch(getVenueComments(venueComments))
    }
    return
}

export const addIndividualVenueComment = (userId, comment, venueId) => async (dispatch) => {
    const res = await csrfFetch(`/api/venues/${venueId}/comments`, {
        method: 'POST',
        body: JSON.stringify({userId, comment})
    })

    if (res.ok) {
        const newComment = await res.json()
        dispatch(addVenueComment(newComment))
    }
    return
}

export const editAComment = (venueId, commentId, comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/venues/${venueId}/comments/${commentId}`, {
        method: "PUT",
        body: JSON.stringify({comment})
    })
    if (res.ok) {
        const updatedComment = await res.json()
        dispatch(editVenueComment(updatedComment))
        return updatedComment
    }
    
}

export const deleteComment = (venueId, commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/venues/${venueId}/comments/${commentId}`, {
        method: 'POST'
    })
    if (res.ok) {
        dispatch(deleteVenueComment(commentId, venueId))
    }
    return
}

const initialState = { all: {}, comments: {}}
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
                newState.comments[comment.id] = comment 
            })
            return newState
        case ADD_VENUE_COMMENT:
            newState.comments[action.comment.id] = action.comment
            return newState
        case EDIT_COMMENT:
            newState.comments = {...newState.comments}
            newState.comments[action.comment.id] = action.comment
            return newState
        case REMOVE_COMMENT:
            newState.comments = { ...newState.comments }
            delete newState.comments[action.payload.commentId]
            return newState
        default: return state
    }
}

export default venueReducer