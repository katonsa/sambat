
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import posts from '@/routes/posts';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type PostType = {
    uuid: string;
    content: string;
    author: { display_name?: string, public_handle: string, avatar_url?: string }
}

interface PostsIndexProps {
    posts: {
        data: PostType[]
    }
    [x: string]: unknown;
}

interface PostItemProps {
    post: PostType
}

function PostItem({ post }: PostItemProps) {
    return (
        <div className="rounded border-x p-4 my-2">
            <div>
                <p>{post.author.public_handle} <small>said:</small></p>
                <p className="break-words">{post.content}</p>
            </div>
        </div>
    )
}

function CreatePost() {
    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
        visibility: 'PUBLIC',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(posts.store().url, {
            preserveScroll: true,
            onSuccess: () => reset('content'),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <Textarea
                id="content"
                value={data.content}
                placeholder="What's on your mind?"
                className="mb-2"
                required
                autoComplete="off"
                onChange={(e) => setData('content', e.target.value)}
            />
            <div className="flex items-center justify-between">
                <Select
                    value={data.visibility}
                    onValueChange={(value) => setData('visibility', value)}
                >
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="PUBLIC">Public</SelectItem>
                        <SelectItem value="FOLLOWERS">Followers</SelectItem>
                        <SelectItem value="PRIVATE">Private</SelectItem>
                    </SelectContent>
                </Select>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Creating...' : 'Create Post'}
                </Button>
            </div>
        </form>
    );
}



export default function PostsIndexPage({ posts }: PostsIndexProps) {
    return (
        <AppLayout>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1>Posts</h1>
                <CreatePost />

                {/** Post listing */}
                <div className="flex flex-col gap-2">
                    {posts.data.map((post) => <PostItem key={post.uuid} post={post} />)}
                </div>
            </div>
        </AppLayout>
    )
}