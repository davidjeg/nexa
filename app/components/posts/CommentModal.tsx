"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { commentPost } from "@/app/actions/comments";
interface Props {
  post_id: string;
}
const CommentModal = ({ post_id }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const handleComment = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) return;
    await commentPost(post_id, comment);
    setComment("");
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleComment} id="reply-form">
        <DialogTrigger
          render={
            <Button>
              <MessageSquare size={20} />
            </Button>
          }
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comment</DialogTitle>
          </DialogHeader>
          <textarea
            name="comment"
            onChange={(e) => setComment(e.target.value)}
            className="resize-none h-16 rounded-md border-none outline-none "
            placeholder="Reply comment"
          />

          <Button form="reply-form" type="submit">
            Reply
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CommentModal;
