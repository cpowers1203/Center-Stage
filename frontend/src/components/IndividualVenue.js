import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import { getIndividualVenue } from '../store/venues'


function IndividualVenue() {
    const dispatch = useDispatch()
    const {venueId} = useParams()
    const venue = useSelector(state => Object.values(state.venues.all[venueId]))

    useEffect(() => {
        if (!venueId) return
        (async () => {
            await dispatch(getIndividualVenue(venueId))
        })()
    }, [venueId, dispatch])


    

}