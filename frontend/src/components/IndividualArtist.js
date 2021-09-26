import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIndividualArtist, postFollow, destroyFollow } from '../store/artist'
import { useParams } from 'react-router-dom'


function IndividualArtist() {
    const dispatch = useDispatch()
    const { artistId } = useParams()
    const currentUser = useSelector(state => state.session.user)
    const artist = useSelector(state => state.artists.all[artistId])
    const follow = useSelector(state => state.artists.following[artistId])

    useEffect(() => {
        if (!artistId) return
        (async () => {
            await dispatch(getIndividualArtist(artistId))
        })()
    }, [artistId, dispatch])
    


  const handleUnfollow = async(e) => {
    e.preventDefault()
    await dispatch(destroyFollow(currentUser.id, artistId))
      
    }   

    const handleFollow = async(e) => {
        e.preventDefault()
        await dispatch(postFollow(currentUser.id, artist))
    }


    return (

        <div className="artist__wrapper">
            <div className="artist__oneArtist">
                <div className="artist__imageDiv">
                    <img className="artist__image" src={artist?.pictureUrl} alt =""></img>
                </div>
                <div className="artist__followButton">
                    { currentUser.id && follow && <button onClick={e => handleUnfollow(e)}>Unfollow</button> }
                    { currentUser.id && !follow && <button onClick={e => handleFollow(e)}>Follow</button>}
                </div>
            </div>
        </div>

    )
}

export default IndividualArtist