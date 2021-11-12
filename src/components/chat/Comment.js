import { useState } from 'react';
import style from './Comment.module.css'

export default function Comment() {

    function handleComment(e) {
        e.preventDefault();
        comments.push(comment)
        setComments(comments);
        setComment('');
    }

    const [comment, setComment] = useState();
    const [comments, setComments] = useState([]);

    return (
        <>
            <div>
                {comments.map((c, index) => (
                    <p key={index}>{c}</p>
                )).reverse()}
            </div>
            <form onSubmit={handleComment}>
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                <button type="submit" className="btn">Comentar</button>
            </form>
        </>
    )
}