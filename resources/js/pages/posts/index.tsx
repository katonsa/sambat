import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { PostCard } from '@/components/posts/post-card';
import { CreatePostDialog } from '@/components/posts/create-post-dialog';
import type { Post } from '@/types/post';

interface PostsIndexProps {
    posts: {
        data: Post[];
    };
}

export default function PostsIndexPage({ posts: postsData }: PostsIndexProps) {
    return (
        <AppLayout>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto w-full md:w-8/12">
                    <div className="mb-4">
                        <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
                        <p className="text-sm text-muted-foreground">
                            Express yourself without judgment
                        </p>
                    </div>

                    <div className="space-y-4">
                        <CreatePostDialog />

                        {postsData.data.length === 0 ? (
                            <div className="rounded-lg border border-sidebar-border/70 bg-white p-8 text-center dark:border-sidebar-border dark:bg-sidebar">
                                <p className="text-muted-foreground">
                                    No posts yet. Be the first to share your thoughts!
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-hidden rounded-lg border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar">
                                {postsData.data.map((post) => (
                                    <PostCard key={post.uuid} post={post} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}