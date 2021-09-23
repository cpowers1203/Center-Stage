const GET_ALL_ARTISTS = 'artists/GET_ALL_ARTISTS'

const getAllArtist = (artists) => ({
    type: GET_ALL_ARTISTS,
    artists
})

export const getArtists = () => async (dispatch) => {
    const res = await fetch('/api/artists')
    if (res.ok) {
        const allArtisits = await res.json()
        dispatch(getAllArtist(allArtisits))
        return allArtisits
    }
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
        default: return state
    }
}

export default artistReducer