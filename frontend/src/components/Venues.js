import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getVenues } from '../store/venues'
import "./Venues.css"



function Venues() {
    const dispatch = useDispatch()
    const venues = useSelector(state => Object.values(state.venues.all))

    useEffect(() => {
        (async () => {
            await dispatch(getVenues())
        })()
    }, [dispatch])

    return (
        <div className="venues__wrapper">
            <div className="venues__allVenues">
                <ul className="venues_ul">
                {venues.map((venue) =>
                    <li key={venue.id} className="venues__li">
                        <NavLink to={`/venues/${venue.id}`}>
                            <img className="venues__image" src={venue.pictureUrl} alt=""></img>
                            <h2 className="venues__name">{venue.name}</h2>
                        </NavLink>
                    </li>
                )}
                </ul>
            </div>
        </div>
    )
}

export default Venues