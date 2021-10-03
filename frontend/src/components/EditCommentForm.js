import { useState } from "react"
import { useDispatch } from "react-redux"
import { editAComment } from "../store/venues"
import { useParams } from "react-router-dom"
import './EditCommentForm.css'

function EditCommentForm({ oldComment, hideEdit, commentId }) {
    const { venueId } = useParams();
    const dispatch = useDispatch();

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
                <button className="edit-caption-btn-edit" onClick={(e) => submitEdit(e)} disabled={commentBody.trim().length === 0}>Post</button>
                <button className="edit-caption-btn-cancel" onClick={hideEdit}>Cancel</button>
            </div>
        </div>

    )
}

export default EditCommentForm