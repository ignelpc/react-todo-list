import Comment from "./Comment";
function Post({ post }) {

    return (
        <div>
            <h2>{post}</h2>
            <Comment />
        </div>
    )
}

export default Post;