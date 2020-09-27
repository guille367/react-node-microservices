import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      const res = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );

      setComments(res.data);
    };

    getComments();
  }, []);

  const renderedComments = comments.map((comment) => (
    <li key={comment.id}>{comment.content}</li>
  ));

  return <ul>{renderedComments}</ul>;
}

CommentList.propTypes = {
  postId: PropTypes.string,
};

export default CommentList;
