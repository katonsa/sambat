import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { router, usePage } from '@inertiajs/react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { EditPostDialog } from './edit-post-dialog';
import type { Post } from '@/types/post';

interface PostActionsMenuProps {
    post: Post;
}

export function PostActionsMenu({ post }: PostActionsMenuProps) {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const { auth } = usePage().props as any;
    const isAuthor = auth.user?.id === (post as any).user_id; // Need to ensure user_id is in Post type or just compare handles if unique

    // Temporary check using public_handle until user_id is exposed in Post type
    // Better: update Post type to include user_id, or trust the backend authorization
    // ideally frontend should also check if current user is author
    // for now let's show it if auth.user.public_handle matches post.author.public_handle

    const canEdit = auth.user?.public_handle === post.author.public_handle;

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(`/posts/${post.uuid}`, {
                preserveScroll: true,
            });
        }
    };

    if (!canEdit) return null;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowEditDialog(true);
                        }}
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                        className="text-destructive focus:text-destructive"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <EditPostDialog
                open={showEditDialog}
                onOpenChange={setShowEditDialog}
                post={post}
            />
        </>
    );
}
