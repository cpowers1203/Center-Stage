import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIndividualArtist, postFollow, destroyFollow, getFollowInfo } from '../store/artist'
import { useParams } from 'react-router'
import './IndividualArtist.css'

function IndividualArtist() {
    const dispatch = useDispatch()
    const { artistId } = useParams()
    const currentUser = useSelector(state => state.session.user)
    const userId = currentUser?.id
    const artist = useSelector(state => state.artists.all[artistId])
    const follow = useSelector(state => state.artists.following[artistId])

    useEffect(() => {
        if (!artistId) return
        if (!userId) return
        (async () => {
            await dispatch(getIndividualArtist(artistId))
            await dispatch(getFollowInfo(userId, artistId))
        })()
    }, [userId, artistId, dispatch])
    


  const handleUnfollow = async(e) => {
    e.preventDefault()
    await dispatch(destroyFollow(currentUser.id, artist))
      
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
                <div className="artist__nameDiv">{artist?.name}</div>
                <div className="artist__followButton">
                    { userId && follow && <button onClick={e => handleUnfollow(e)}>Unfollow</button> }
                    { userId && !follow && <button onClick={e => handleFollow(e)}>Follow</button>}
                </div>
            </div>
        </div>

    )
}

export default IndividualArtist