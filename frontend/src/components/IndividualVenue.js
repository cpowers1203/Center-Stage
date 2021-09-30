import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import { getIndividualVenue } from '../store/venues'
import Comment from './Comment'
import AddComment from './AddComment'
import './IndividualVenue.css'

function IndividualVenue() {
    const dispatch = useDispatch()
    const {venueId}= useParams()
    const venue = useSelector(state => state.venues.all[venueId])
    const currentUser = useSelector(state => state.session.user)

    

    useEffect(() => {
        if (!venueId) return
        (async () => {
            await dispatch(getIndividualVenue(venueId))
        })()
    }, [venueId, dispatch])
    if (!currentUser) {
        return (
            <div className="venue__wrapper">
                <h1>{venue?.name}</h1>
                <div className="venue__info-and-pic">
                    <img className="venue__picture" src={venue?.pictureUrl} alt=""></img>
                    <div className="venue__info">{venue?.address}, {venue?.city} {venue?.state} </div>
                </div>
                <div className="venue__comments">
                    <Comment />
                </div>
            </div>
        )
    } else {
        return (
            <div className="venue__wrapper">
                <h1>{venue?.name}</h1>
                <div className="venue__info-and-pic">
                    <img className="venue__picture" src={venue?.pictureUrl} alt=""></img>
                    <div className="venue__info">{venue?.address}, {venue?.city} {venue?.state} </div>
                </div>
                <div className="venue__comments">
                    <Comment />
                    <AddComment className="venue__addComment"/>
                </div>
            </div>
        )
    }


}

export default IndividualVenue