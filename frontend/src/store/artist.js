const GET_ALL_ARTISTS = 'artists/GET_ALL_ARTISTS'
const GET_ONE_ARTIST = 'artists/GET_ONE_ARTIST'
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

const addFollow = (userId, artistId) => ({
    type: ADD_FOLLOW,
    payload:{
        userId, artistId
    }
})

const removeFollow = (userId, artistId) => ({
    type: REMOVE_FOLLOW,
    payload:{
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

export const postFollow = (userId, artistId) => async(dispatch) => {
    const res = await fetch(`/api/artists/${artistId}/follow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId})
    })
    if (res.ok) {
        dispatch(addFollow(userId, artistId))
    }
    return
}

export const destroyFollow = (userId, artistId) => async(dispatch) => {
    const res = await fetch(`/api/artists/${artistId}/unfollow`)
    if (res.ok) {
        dispatch(removeFollow( userId, artistId))
    }
    return
}

const initialState = { artists: {}, venues: {} }
const artistReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_ARTISTS:
            Object.values(action.artists).forEach(artist => {
                newState.artists[artist.id] = artist
            })
            return newState
        case GET_ONE_ARTIST:
            newState.artists[action.artist.id] = action.artist
            return newState
        case ADD_FOLLOW:
            const userId = action.payload.userId
            const artistId = action.payload.artistId
            newState.artists[artistId].followers[userId] = { userId, artistId }
            return newState
        default: return state
    }
}

export default artistReducer