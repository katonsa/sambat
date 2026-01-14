import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from '@inertiajs/react';
import type { Post } from '@/types/post';

interface PostDetailCardProps {
    post: Post;
}

export function PostDetailCard({ post }: PostDetailCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <div className="overflow-hidden rounded-lg border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar">
            <div className="p-4">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                    <Link href={`/users/${post.author.public_handle}`}>
                        <Avatar className="h-12 w-12">
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
                    <div>
                        <Link
                            href={`/users/${post.author.public_handle}`}
                            className="font-semibold hover:underline"
                        >
                            {post.author.display_name || post.author.public_handle}
                        </Link>
                        <Link
                            href={`/users/${post.author.public_handle}`}
                            className="block text-sm text-muted-foreground hover:underline"
                        >
                            @{post.author.public_handle}
                        </Link>
                    </div>
                </div>

                {/* Post Content */}
                <div className="mt-4">
                    <p className="whitespace-pre-wrap break-words text-lg text-foreground">
                        {post.content}
                    </p>
                </div>

                {/* Timestamp */}
                <div className="mt-4 border-t border-sidebar-border/50 pt-4 dark:border-sidebar-border/30">
                    <p className="text-sm text-muted-foreground">
                        {formatTime(post.created_at)} · {formatDate(post.created_at)}
                    </p>
                </div>
            </div>
        </div>
    );
}
