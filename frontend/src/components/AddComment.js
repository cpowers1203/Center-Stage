import React, { useState } from 'react';
import { useParams ,useHistory} from 'react-router-dom';
import { addIndividualVenueComment } from '../store/venues';
import { useDispatch, useSelector } from 'react-redux';


function AddComment() {
    const { venueId } = useParams();
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = currentUser.id
    // const userId = useSelector(state => state.session.user.id)

    const [commentBody, setCommentBody] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();
        const comment = {
            commentBody
        }
        if (commentBody.length < 256) {
            setCommentBody('')
            let createdComment = await dispatch(addIndividualVenueComment(userId, comment, venueId))
            if(createdComment) {
                history.push(`/venues/${venueId}`)
            }
        } else {
            alert("Please limit your comment to 255 Characters")
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                className="add-comment-field"
                placeholder="Comment"
                type="text"
                required
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                />
                <button className="add-comment-submit" type="submit" disabled={!commentBody.length} >Post</button>
            </form>
        </section>
    )
}

export default AddComment
