"use client";
import {
  Heart,
  MessageSquare,
  BookMarked,
  BookmarkIcon,
  BookMarkedIcon,
} from "lucide-react";
import { favoritePost } from "@/app/actions/bookmark";
import { likePost } from "@/app/actions/likes";
import { useState } from "react";
import PostActionButton from "./PostActionButton";
import CommentModal from "./CommentModal";
interface Props {
  post_id: string;
  likeCount: number;
  commentCount: number;
  liked: boolean;
  favorite: boolean;
}
const PostActionBar = ({
  post_id,
  likeCount,
  commentCount,
  liked,
  favorite,
}: Props) => {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [isFavorite, setIsFavorite] = useState<boolean>(favorite);
  const [postLikeCount, setPostLikeCount] = useState<number>(likeCount);
  const handleLike = async () => {
    const previusLiked = isLiked;
    const newLike = !previusLiked;
    setIsLiked(newLike);
    setPostLikeCount((prev) => (newLike ? prev + 1 : prev - 1));
    try {
      await likePost(post_id);
    } catch (error) {
      setIsLiked(previusLiked);
      setPostLikeCount((prev) => (previusLiked ? prev + 1 : prev - 1));
      console.log(error);
    }
  };
  const handleFavorite = async () => {
    const prevFavorite = isFavorite;
    const newFavorite = !prevFavorite;
    setIsFavorite(newFavorite);
    try {
      await favoritePost(post_id);
    } catch (error) {
      setIsFavorite(prevFavorite);
    }
  };
  const handleComment = async () => {};
  return (
    <div className="flex gap-10">
      <PostActionButton
        icon={Heart}
        active={isLiked}
        onClick={handleLike}
        count={postLikeCount}
      />
      <PostActionButton
        icon={BookMarkedIcon}
        active={isFavorite}
        onClick={handleFavorite}
      />
      <CommentModal post_id={post_id} />
    </div>
  );
};

export default PostActionBar;
