import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  Heart,
  Reply,
  MoreHorizontal,
  Send,
  Flag,
  Trash2,
  Edit3,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import Button from '../Button'

interface User {
  id: string
  username: string
  displayName: string
  avatar?: string
}

interface Comment {
  id: string
  userId: string
  user: User
  content: string
  likeCount: number
  isLiked: boolean
  replies?: Comment[]
  createdAt: string
  isEdited?: boolean
}

interface CommentsProps {
  comments: Comment[]
  currentUserId?: string
  onAddComment?: (content: string) => void
  onReply?: (commentId: string, content: string) => void
  onLike?: (commentId: string) => void
  onDelete?: (commentId: string) => void
  onEdit?: (commentId: string, content: string) => void
}

const mockComments: Comment[] = [
  {
    id: '1',
    userId: '2',
    user: {
      id: '2',
      username: 'webtoon_fan',
      displayName: 'Webtoon Fan',
    },
    content:
      'This episode was absolutely amazing! The plot twist at the end caught me completely off guard. Cannot wait for the next one!',
    likeCount: 156,
    isLiked: false,
    createdAt: '2026-04-25T10:30:00Z',
    replies: [
      {
        id: '1-1',
        userId: '3',
        user: {
          id: '3',
          username: 'manga_lover',
          displayName: 'Manga Lover',
        },
        content: 'I know right! That twist was insane!',
        likeCount: 24,
        isLiked: true,
        createdAt: '2026-04-25T11:45:00Z',
      },
    ],
  },
  {
    id: '2',
    userId: '4',
    user: {
      id: '4',
      username: 'reader_123',
      displayName: 'Book Lover',
    },
    content:
      'The art style in this chapter is incredible. The artist really outdid themselves with those action sequences.',
    likeCount: 89,
    isLiked: true,
    createdAt: '2026-04-25T14:20:00Z',
  },
  {
    id: '3',
    userId: '5',
    user: {
      id: '5',
      username: 'story_fan',
      displayName: 'Story Fan',
    },
    content:
      'Finally! The main character is getting stronger. Been waiting for this power-up for so long!',
    likeCount: 67,
    isLiked: false,
    createdAt: '2026-04-25T16:00:00Z',
  },
]

const Comments = ({
  comments: initialComments = mockComments,
  currentUserId = '1',
  onAddComment,
  onReply,
  onLike,
  onDelete,
  onEdit,
}: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())
  const [editingComment, setEditingComment] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const handleSubmitComment = () => {
    if (!newComment.trim()) return
    const newCommentObj: Comment = {
      id: `new-${Date.now()}`,
      userId: currentUserId,
      user: {
        id: currentUserId,
        username: 'you',
        displayName: 'You',
      },
      content: newComment,
      likeCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
    }
    setComments([newCommentObj, ...comments])
    setNewComment('')
    onAddComment?.(newComment)
  }

  const handleSubmitReply = (commentId: string) => {
    if (!replyContent.trim()) return
    const newReply: Comment = {
      id: `reply-${Date.now()}`,
      userId: currentUserId,
      user: {
        id: currentUserId,
        username: 'you',
        displayName: 'You',
      },
      content: replyContent,
      likeCount: 0,
      isLiked: false,
      createdAt: new Date().toISOString(),
    }
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, replies: [...(c.replies || []), newReply] } : c
      )
    )
    setReplyContent('')
    setReplyingTo(null)
    setExpandedReplies((prev) => new Set(prev).add(commentId))
    onReply?.(commentId, replyContent)
  }

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            isLiked: !c.isLiked,
            likeCount: c.isLiked ? c.likeCount - 1 : c.likeCount + 1,
          }
        }
        if (c.replies) {
          return {
            ...c,
            replies: c.replies.map((r) =>
              r.id === commentId
                ? {
                    ...r,
                    isLiked: !r.isLiked,
                    likeCount: r.isLiked ? r.likeCount - 1 : r.likeCount + 1,
                  }
                : r
            ),
          }
        }
        return c
      })
    )
    onLike?.(commentId)
  }

  const handleDelete = (commentId: string) => {
    setComments(comments.filter((c) => c.id !== commentId))
    setActiveMenu(null)
    onDelete?.(commentId)
  }

  const handleEdit = (commentId: string, content: string) => {
    setComments(
      comments.map((c) =>
        c.id === commentId
          ? { ...c, content, isEdited: true }
          : {
              ...c,
              replies: c.replies?.map((r) =>
                r.id === commentId ? { ...r, content, isEdited: true } : r
              ),
            }
      )
    )
    setEditingComment(null)
    setEditContent('')
    onEdit?.(commentId, content)
  }

  const toggleReplies = (commentId: string) => {
    setExpandedReplies((prev) => {
      const next = new Set(prev)
      if (next.has(commentId)) {
        next.delete(commentId)
      } else {
        next.add(commentId)
      }
      return next
    })
  }

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    const isOwner = comment.userId === currentUserId
    const isEditing = editingComment === comment.id
    const showReplies = expandedReplies.has(comment.id)
    const replyCount = comment.replies?.length || 0

    return (
      <div className={`${isReply ? 'ml-12 sm:ml-16' : ''}`}>
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div
              className={`${
                isReply ? 'w-8 h-8' : 'w-10 h-10'
              } rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center`}
            >
              {comment.user.avatar ? (
                <img
                  src={comment.user.avatar}
                  alt={comment.user.displayName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className={`${isReply ? 'text-sm' : 'text-base'} font-semibold text-white`}>
                  {comment.user.displayName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 text-sm">
                {comment.user.displayName}
              </span>
              <span className="text-xs text-gray-400">{formatTime(comment.createdAt)}</span>
              {comment.isEdited && <span className="text-xs text-gray-400">(edited)</span>}
            </div>

            {isEditing ? (
              <div className="mt-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  aria-label="Edit comment"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
                  rows={2}
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleEdit(comment.id, editContent)}
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingComment(null)
                      setEditContent('')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="mt-1 text-gray-700 text-sm leading-relaxed">{comment.content}</p>
            )}

            <div className="flex items-center gap-4 mt-2">
              <button
                type="button"
                onClick={() => handleLike(comment.id)}
                aria-label={comment.isLiked ? 'Unlike' : 'Like'}
                className={`flex items-center gap-1 text-sm transition-colors ${
                  comment.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-current' : ''}`} />
                <span>{comment.likeCount > 0 ? comment.likeCount : ''}</span>
              </button>

              {!isReply && (
                <button
                  type="button"
                  onClick={() => setReplyingTo(comment.id)}
                  className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Reply className="w-4 h-4" />
                  <span>Reply</span>
                </button>
              )}

              {isOwner && !isEditing && (
                <div className="relative">
                  <button
                    type="button"
                    title="More options"
                    aria-label="More options"
                    onClick={() => setActiveMenu(activeMenu === comment.id ? null : comment.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {activeMenu === comment.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setEditingComment(comment.id)
                            setEditContent(comment.content)
                            setActiveMenu(null)
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(comment.id)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {!isOwner && (
                <button
                  type="button"
                  title="Report"
                  aria-label="Report comment"
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Flag className="w-4 h-4" />
                </button>
              )}
            </div>

            {replyingTo === comment.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    aria-label="Write a reply"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmitReply(comment.id)
                      }
                    }}
                  />
                  <Button size="sm" variant="primary" onClick={() => handleSubmitReply(comment.id)}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {replyCount > 0 && !isReply && (
              <button
                type="button"
                onClick={() => toggleReplies(comment.id)}
                className="flex items-center gap-1 mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {showReplies ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showReplies && comment.replies && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-4"
            >
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Comments ({comments.length})</h3>
        </div>
      </div>

      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <span className="font-semibold text-white">Y</span>
            </div>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              aria-label="Write a comment"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <Button variant="primary" onClick={handleSubmitComment} disabled={!newComment.trim()}>
                <Send className="w-4 h-4 mr-2" />
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}

        {comments.length === 0 && (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Comments
