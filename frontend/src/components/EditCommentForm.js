import { useState } from "react"
import { useDispatch } from "react-redux"
import { editAComment } from "../store/venues"
import { useParams, useHistory } from "react-router-dom"

function EditCommentForm({ oldComment, hideEdit, commentId }) {
    const { venueId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory()

    const [commentBody, setCommentBody] = useState(oldComment)

    const submitEdit = async(e) => {
        e.preventDefault();
        await dispatch(editAComment(venueId, commentId, commentBody))
        
        hideEdit(e)
    }

    return(
        <div>
            <textarea value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
            <div className="edit-caption-btn">
                <div className="edit-caption-btn" onClick={(e) => submitEdit(e)}><i className="fas fa-sync-alt"></i></div>
                <div className="edit-caption-btn" onClick={hideEdit}><i className="far fa-times-circle"></i></div>
            </div>
        </div>

    )
}

export default EditCommentForm