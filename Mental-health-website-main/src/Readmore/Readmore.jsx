import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { blogsData } from "../Data/Data"; // Import the data array of blogs

const Readmore = () => {
  const { id } = useParams(); // Get the 'id' from the route
  const findarray = blogsData.find((item) => item.id === parseInt(id)); // Find the blog with matching id

  // State to manage all comments
  const [comments, setComments] = useState([]);
  // State for the new comment input field
  const [newComment, setNewComment] = useState("");
  // State to store replies for each comment (keyed by comment id)
  const [replyContent, setReplyContent] = useState({});
  // State to filter comments by a specific username
  const [filterUser, setFilterUser] = useState(null);
  // State to track which comment is being edited
  const [editingCommentId, setEditingCommentId] = useState(null);
  // State to store the edited comment text
  const [editedCommentText, setEditedCommentText] = useState("");
  // State to track which reply is being edited
  const [editingReplyId, setEditingReplyId] = useState(null);
  // State to store the edited reply text
  const [editedReplyText, setEditedReplyText] = useState("");

  // Function to add a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1, // Assign an ID based on current length
          username: "currentUser", // Placeholder username
          text: newComment, // The comment text
          time: new Date().toLocaleTimeString(), // Current time
          replies: [], // Initialize with empty replies
        },
      ]);
      setNewComment(""); // Clear input after posting
    }
  };

  // Function to add a reply to a comment
  const handleAddReply = (commentId) => {
    if (!replyContent[commentId]?.trim()) return; // Do nothing if reply is empty

    // Update the specific comment by ID and add a reply
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: comment.replies.length + 1,
                  username: "currentUser",
                  text: replyContent[commentId],
                  time: "Just now",
                },
              ],
            }
          : comment
      )
    );

    // Clear the reply input
    setReplyContent({ ...replyContent, [commentId]: "" });
  };

  // Function to delete a comment
  const handleDeleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    }
  };

  // Function to start editing a comment
  const handleStartEditComment = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditedCommentText(currentText);
  };

  // Function to save edited comment
  const handleSaveEditComment = (commentId) => {
    if (editedCommentText.trim()) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                text: editedCommentText,
                time: comment.time + " (edited)",
              }
            : comment
        )
      );
      setEditingCommentId(null);
      setEditedCommentText("");
    }
  };

  // Function to cancel editing a comment
  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditedCommentText("");
  };

  // Function to delete a reply
  const handleDeleteReply = (commentId, replyId) => {
    if (window.confirm("Are you sure you want to delete this reply?")) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== replyId
                ),
              }
            : comment
        )
      );
    }
  };

  // Function to start editing a reply
  const handleStartEditReply = (commentId, replyId, currentText) => {
    setEditingReplyId(`${commentId}-${replyId}`);
    setEditedReplyText(currentText);
  };

  // Function to save edited reply
  const handleSaveEditReply = (commentId, replyId) => {
    if (editedReplyText.trim()) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === replyId
                    ? {
                        ...reply,
                        text: editedReplyText,
                        time: reply.time + " (edited)",
                      }
                    : reply
                ),
              }
            : comment
        )
      );
      setEditingReplyId(null);
      setEditedReplyText("");
    }
  };

  // Function to cancel editing a reply
  const handleCancelEditReply = () => {
    setEditingReplyId(null);
    setEditedReplyText("");
  };

  // Filter comments if a user is selected
  const filteredComments = filterUser
    ? comments.filter((c) => c.username === filterUser)
    : comments;

  return (
    <>
      <div className="flex justify-center items-center bg-[#bcccdc] p-10 ">
        <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-md">
          {/* Blog Title */}
          <h1 className="text-2xl font-bold mb-4">{findarray?.title}</h1>
          <p className="text-lg">{findarray?.by}</p>

          {/* Blog Image */}
          <img
            src={findarray?.image}
            alt={findarray?.title}
            className="w-[292px] h-[147.28px] rounded-[15px] mt-4 lg:ml-48"
          />

          {/* Blog Content Sections */}
          <p className="text-[#737373] mt-4">{findarray?.d1}</p>
          <h2 className="text-xl mt-4">{findarray?.what}</h2>
          <p className="text-[#737373] mt-4">{findarray?.w1}</p>
          <p className="text-[#737373] mt-4">{findarray?.d2}</p>
          <h2 className="text-xl mt-4">{findarray?.signs}</h2>
          <p className="text-[#737373] mt-4">{findarray?.d3}</p>
          <p className="text-[#737373] mt-4">{findarray?.sy}</p>

          {/* Dynamic List Rendering */}
          {(() => {
            const listCount = findarray?.l9
              ? 9
              : findarray?.l6
              ? 6
              : findarray?.l5
              ? 5
              : findarray?.l0
              ? 0
              : 0;
            return [...Array(listCount)].map((_, i) => (
              <li className="text-[#737373] mt-4" key={i}>
                {findarray?.[`l${i + 1}`]}
              </li>
            ));
          })()}

          {/* More Blog Content */}
          <p className="text-[#737373] mt-4">{findarray?.time}</p>
          <h2 className="text-xl mt-4">{findarray?.work}</h2>
          <p className="text-[#737373] mt-4">{findarray?.p1}</p>
          <p className="text-[#737373] mt-4">{findarray?.p2}</p>
          <p className="text-[#737373] mt-4">{findarray?.p3}</p>
          <p className="text-[#737373] mt-4">{findarray?.p4}</p>
          <p className="text-[#737373] mt-4">{findarray?.p5}</p>

          {/* Headings and Details */}
          <h2 className="text-xl mt-4">{findarray?.h1}</h2>
          <p className="text-[#737373] mt-4">{findarray?.c1}</p>
          <p className="text-[#737373] mt-4">{findarray?.f1}</p>
          <h2 className="text-xl mt-4">{findarray?.h2}</h2>
          <p className="text-[#737373] mt-4">{findarray?.c2}</p>
          <p className="text-[#737373] mt-4">{findarray?.f2}</p>
          <h2 className="text-xl mt-4">{findarray?.h3}</h2>
          <p className="text-[#737373] mt-4">{findarray?.c3}</p>
          <p className="text-[#737373] mt-4">{findarray?.f3}</p>
          <h2 className="text-xl mt-4">{findarray?.h4}</h2>
          <p className="text-[#737373] mt-4">{findarray?.c4}</p>
          <p className="text-[#737373] mt-4">{findarray?.f4}</p>
          <h2 className="text-xl mt-4">{findarray?.h5}</h2>
          <p className="text-[#737373] mt-4">{findarray?.c5}</p>

          {/* Final Content */}
          <h2 className="text-xl mt-4">{findarray?.m}</h2>
          <p className="text-[#737373] mt-4">{findarray?.m1}</p>
          <p className="text-[#737373] mt-4">{findarray?.m2}</p>
          <p className="text-[#737373] mt-4">{findarray?.m3}</p>
          <p className="text-[#737373] mt-4">{findarray?.m4}</p>
          <p className="text-[#737373] mt-4">{findarray?.m5}</p>
          <h2 className="text-xl mt-4">{findarray?.s1}</h2>
          <h2 className="text-xl mt-4">{findarray?.s2}</h2>
          <p className="text-[#737373] mt-4">{findarray?.s3}</p>
          <h2 className="text-xl mt-4">{findarray?.s4}</h2>
          <p className="text-[#737373] mt-4">{findarray?.s5}</p>
          <h2 className="text-xl mt-4">{findarray?.s6}</h2>
          <p className="text-[#737373] mt-4">{findarray?.s7}</p>
          <p className="text-[#737373] mt-4">{findarray?.end}</p>

          {/* Comments Section */}
          <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-2xl border-[1px] mt-5">
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">
                Comments ({filteredComments.length})
              </h2>

              {/* If no comments */}
              {filteredComments.length === 0 ? (
                <p className="text-gray-500">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                // Loop through each comment
                filteredComments.map((comment) => (
                  <div key={comment.id} className="mb-6 border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p
                          className="font-bold text-blue-600 cursor-pointer"
                          onClick={() => setFilterUser(comment.username)}
                        >
                          {comment.username}
                        </p>

                        {/* Comment Text or Edit Input */}
                        {editingCommentId === comment.id ? (
                          <div className="mt-2">
                            <textarea
                              className="w-full p-2 border rounded"
                              rows="3"
                              value={editedCommentText}
                              onChange={(e) =>
                                setEditedCommentText(e.target.value)
                              }
                            />
                            <div className="mt-2">
                              <button
                                onClick={() =>
                                  handleSaveEditComment(comment.id)
                                }
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm mr-2"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelEditComment}
                                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-700 mt-1">{comment.text}</p>
                        )}

                        <p className="text-sm text-gray-400 mt-1">
                          {comment.time}
                        </p>
                      </div>

                      {/* Edit and Delete buttons for comments by currentUser */}
                      {comment.username === "currentUser" &&
                        editingCommentId !== comment.id && (
                          <div className="flex space-x-2 ml-4">
                            <button
                              onClick={() =>
                                handleStartEditComment(comment.id, comment.text)
                              }
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                    </div>

                    {/* Replies Section */}
                    <div className="ml-6 mt-2">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="mb-2 border-l-2 pl-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <p
                                className="font-semibold text-blue-500 cursor-pointer"
                                onClick={() => setFilterUser(reply.username)}
                              >
                                {reply.username}
                              </p>

                              {/* Reply Text or Edit Input */}
                              {editingReplyId ===
                              `${comment.id}-${reply.id}` ? (
                                <div className="mt-2">
                                  <textarea
                                    className="w-full p-2 border rounded"
                                    rows="2"
                                    value={editedReplyText}
                                    onChange={(e) =>
                                      setEditedReplyText(e.target.value)
                                    }
                                  />
                                  <div className="mt-2">
                                    <button
                                      onClick={() =>
                                        handleSaveEditReply(
                                          comment.id,
                                          reply.id
                                        )
                                      }
                                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm mr-2"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={handleCancelEditReply}
                                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-gray-700 mt-1">
                                  {reply.text}
                                </p>
                              )}

                              <p className="text-sm text-gray-400 mt-1">
                                {reply.time}
                              </p>
                            </div>

                            {/* Edit and Delete buttons for replies by currentUser */}
                            {reply.username === "currentUser" &&
                              editingReplyId !==
                                `${comment.id}-${reply.id}` && (
                                <div className="flex space-x-2 ml-4">
                                  <button
                                    onClick={() =>
                                      handleStartEditReply(
                                        comment.id,
                                        reply.id,
                                        reply.text
                                      )
                                    }
                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteReply(comment.id, reply.id)
                                    }
                                    className="text-red-600 hover:text-red-800 text-sm"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                          </div>
                        </div>
                      ))}

                      {/* Reply Input Box */}
                      <textarea
                        className="w-full mt-2 p-2 border rounded"
                        rows="2"
                        value={replyContent[comment.id] || ""}
                        onChange={(e) =>
                          setReplyContent({
                            ...replyContent,
                            [comment.id]: e.target.value,
                          })
                        }
                        placeholder="Write a reply..."
                      />
                      <button
                        onClick={() => handleAddReply(comment.id)}
                        className="mt-1 bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300 text-sm"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* New Comment Box */}
              <div className="mt-6">
                <textarea
                  className="w-full p-2 border rounded"
                  rows="3"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                ></textarea>
                <button
                  onClick={handleAddComment}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Post Comment
                </button>

                {/* Button to clear filter */}
                {filterUser && (
                  <button
                    onClick={() => setFilterUser(null)}
                    className="ml-4 text-sm text-red-600"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Readmore;
