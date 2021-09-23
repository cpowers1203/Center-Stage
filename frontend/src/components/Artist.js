import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getArtists } from '../store/artist'


function Artists() {
    const dispatch = useDispatch()
    const artists = useSelector(state => Object.values(state.artists.artists))

    useEffect(() => {
        (async () => {
            await dispatch(getArtists());
        })()
    }, [dispatch])

    return (


        <div className="artist__wrapper">
            <div className="artist__allArtists">
                <ul className="artists__ul">
                {artists.map((artist) => 
                    <li key={artist.id} className="artists__li">
                        <NavLink to={`/artists/${artist.id}`}>
                            <img className="artists__image" src={artist.pictureUrl} alt=""></img>
                            <h2 className="artists__name">{ artist.name }</h2>
                        </NavLink>
                    </li>   
                )}
                </ul>
            </div>
        </div>
    )




}

export default Artists