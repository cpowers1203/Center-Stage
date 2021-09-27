 import { csrfFetch } from "./csrf"

const GET_ALL_ARTISTS = 'artists/GET_ALL_ARTISTS'
const GET_ONE_ARTIST = 'artists/GET_ONE_ARTIST'
const GET_FOLLOW = 'artists/GET_FOLLOW'
const ADD_FOLLOW = 'artists/ADD_FOLLOW'
const REMOVE_FOLLOW = 'artists/REMOVE_FOLLOW'

const getAllArtist = (artists) => ({
    type: GET_ALL_ARTISTS,
    artists
})
const getOneArtist = (artist) => ({
    type: GET_ONE_ARTIST,
    artist
})

const addFollow = (userId, artist) => ({
    type: ADD_FOLLOW,
    payload:{
        userId, artist
    }
})

const removeFollow = (userId, artistId) => ({
    type: REMOVE_FOLLOW,
    payload:{
        userId, artistId
    }
})

const getFollow = (userId, artistId) => ({
    type: GET_FOLLOW,
    payload: {
        userId, artistId
    }
    
})

export const getArtists = () => async (dispatch) => {
    const res = await fetch('/api/artists')
    if (res.ok) {
        const allArtisits = await res.json()
        dispatch(getAllArtist(allArtisits))
        return allArtisits
    }
}

export const getIndividualArtist = (artistId) => async (dispatch) => {
    const res = await fetch(`/api/artists/${artistId}`)
    if (res.ok) {
        const artist = await res.json()
        dispatch(getOneArtist(artist))
        return artist
    }
}

export const getFollowInfo = (userId, artistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/follow-artist/${artistId}`, {
        method: 'POST',
        body: JSON.stringify({userId})
    })
    if (res.ok) {
        const {userId, artistId} = await res.json()
        dispatch(getFollow(userId, artistId))
    }
}

export const postFollow = (userId, artist) => async(dispatch) => {
    const res = await csrfFetch(`/api/artists/${artist.id}/follow`, {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId})
    })
    if (res.ok) {
        dispatch(addFollow(userId, artist.id))
    }
    return
}

export const destroyFollow = (userId, artist) => async(dispatch) => {
    const res = await csrfFetch(`/api/artists/${artist.id}/unfollow`, {
        method: 'POST',
        body: JSON.stringify({userId})
    })
    if (res.ok) {
        dispatch(removeFollow( userId, artist.id))
    }
    return
}

const initialState = { all: {}, following: {} }
const artistReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_ARTISTS:
            Object.values(action.artists).forEach(artist => {
                newState.all[artist.id] = artist
            })
            return newState
        case GET_ONE_ARTIST:
            newState.all[action.artist.id] = action.artist
            return newState
        case GET_FOLLOW:
            const userId = action.payload.userId
            const artistId = action.payload.artistId
            console.log("AWAWAWAWAWAWA", artistId)
            newState.following[artistId] = {userId, artistId}
            return newState
        case ADD_FOLLOW:
            const userId2 = action.payload.userId
            const artistId2 = action.payload.artist
            newState.following[artistId2] =  {userId: userId2, artistId: artistId2}
            return newState
        case REMOVE_FOLLOW:
            console.log(action.payload.artistId)
            delete newState.following[action.payload.artistId]
            return newState

        default: return state
    }
}

export default artistReducer