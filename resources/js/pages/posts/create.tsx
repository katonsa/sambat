import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PostForm } from '@/components/posts/post-form';
import posts from '@/routes/posts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: posts.index().url,
    },
];

export default function CreatePost() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Post" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-2xl">
                    <p className="mb-4 text-base text-muted-foreground">
                        Express yourself without judgment
                    </p>
                    <PostForm />
                </div>
            </div>
        </AppLayout>
    );
}
