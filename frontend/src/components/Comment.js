import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getIndividualVenueComments } from '../store/venues';
import { useDispatch, useSelector } from 'react-redux';
import SingleComment from './SingleComment';



function Comment() {
    const {venueId} = useParams()
    const dispatch = useDispatch()
    const [comments2, setComments2] = useState([])

    useEffect(() => {
        (async () => {
           await dispatch(getIndividualVenueComments(venueId))
        })()
    }, [venueId, dispatch])
    


    const commentsState = useSelector(state => Object.values(state.venues.comments))
    const comments = commentsState.filter((comment) => {
        console.log(comment, comment.venueId, "I AM THE COMMENT")
        return +comment.venueId === +venueId
    })
    

    return (
        <div>                
            {comments?.map((comment) => {
                
             return  (
                <div className="single-comment-wrapper" key={comment.id}>
                    <SingleComment comment={comment} />
                </div>
            )})}
        </div>
    )
}
export default Comment