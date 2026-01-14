import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PostDetailCard } from '@/components/posts/post-detail-card';
import type { Post } from '@/types/post';

interface ShowPostProps {
    post: Post;
}

export default function ShowPost({ post }: ShowPostProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Posts',
            href: '/posts',
        },
        {
            title: 'Post',
            href: `/posts/${post.uuid}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto w-full md:w-8/12">
                    <PostDetailCard post={post} />
                </div>
            </div>
        </AppLayout>
    );
}