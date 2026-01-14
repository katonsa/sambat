import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@inertiajs/react';
import { PostActionsMenu } from './post-actions-menu';
import type { Post } from '@/types/post';

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
        });
    };

    return (
        <div className="border-b border-sidebar-border/50 transition-colors hover:bg-accent/50 dark:border-sidebar-border/30">
            <div className="flex gap-3 px-4 py-3">
                <Link href={`/users/${post.author.public_handle}`}>
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src={post.author.avatar_url || undefined}
                            alt={post.author.display_name || post.author.public_handle}
                        />
                        <AvatarFallback>
                            {(post.author.display_name || post.author.public_handle)
                                .substring(0, 2)
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Link>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                        <Link href={`/posts/${post.uuid}`} className="flex items-center gap-1 flex-1">
                            <span className="font-semibold hover:underline">
                                {post.author.display_name || post.author.public_handle}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                @{post.author.public_handle}
                            </span>
                            <span className="text-sm text-muted-foreground">·</span>
                            <span className="text-sm text-muted-foreground">
                                {formatDate(post.created_at)}
                            </span>
                        </Link>
                        <PostActionsMenu post={post} />
                    </div>
                    <Link href={`/posts/${post.uuid}`} className="block">
                        <p className="mt-1 whitespace-pre-wrap break-words text-foreground">
                            {post.content}
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
