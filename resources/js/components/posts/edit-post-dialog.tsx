import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { PostForm } from './post-form';
import type { Post } from '@/types/post';

interface EditPostDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    post: Post;
}

export function EditPostDialog({ open, onOpenChange, post }: EditPostDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Edit Post</DialogTitle>
                    <DialogDescription>
                        Make changes to your post
                    </DialogDescription>
                </DialogHeader>
                <PostForm
                    initialData={{
                        content: post.content,
                        visibility: (post as any).visibility || 'PUBLIC', // Type assertion needed until visibility is added to Post type
                    }}
                    updateUrl={`/posts/${post.uuid}`}
                    onSuccess={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
