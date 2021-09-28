import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../store/venues';
// import "./SingleComment.css"
import EditCommentForm from './EditCommentForm';

function SingleComment({ comment }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    const [showEdit, setShowEdit] = useState(false)

    const displayEdit = (e) => {
        e.preventDefault()
        setShowEdit(true)
    }

    const hideEdit = (e) => {
        e.preventDefault()
        setShowEdit(false)
    }

    const handleDelete = async(e) => {
        e.preventDefault();
        await dispatch(deleteComment(comment.id, comment.venueId))
    }

    let commentContent;
    if (showEdit){
        commentContent = <EditCommentForm oldComment={comment.comment} hideEdit={hideEdit} commentId={comment.id}/>
    }
    else{
        commentContent = (
            <>
                <div className="comment-body-container">
                    <div className="comment-body-p">{comment.comment}</div>
                </div>
            {
                comment?.userId === user.id &&
                <div className="edit-comment-btns">
                    <button className="edit-comment-btn" onClick={displayEdit}>edit</button>
                    <button onClick={(e) => handleDelete(e)}>delete</button>
                </div>
            }
        </>
        )
    }


    return (
        <>
            {commentContent}
        </>
    )
}

export default SingleComment