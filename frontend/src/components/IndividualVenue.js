import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import { getIndividualVenue } from '../store/venues'
import Comment from './Comment'
import AddComment from './AddComment'


function IndividualVenue() {
    const dispatch = useDispatch()
    const {venueId}= useParams()
    const venue = useSelector(state => state.venues.all[venueId])

    

    useEffect(() => {
        if (!venueId) return
        (async () => {
            await dispatch(getIndividualVenue(venueId))
        })()
    }, [venueId, dispatch])

    return (
        <div className="venue__wrapper">
            <h1>{venue?.name}</h1>
            <div className="venue__info-and-pic">
                <img className="venue__picture" src={venue?.pictureUrl} alt=""></img>
                <div className="venue__info">{venue?.address}, {venue?.city} {venue?.state} </div>
            </div>
            <div className="venue__comments">
                <Comment />
                <AddComment />
            </div>
        </div>
    )


}

export default IndividualVenue