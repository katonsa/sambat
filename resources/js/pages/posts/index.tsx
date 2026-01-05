import PostController from '@/actions/App/Http/Controllers/PostController';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Form, Head } from '@inertiajs/react'

interface PostsIndexProps {
    posts: {
        data: {
            uuid: string;
            content: string;
        }[]
        [x: string]: unknown;
    }
}

interface PostItemProps {
    post: {
        uuid: string;
        content: string;
    }
}

function PostItem({ post }: PostItemProps) {
    return (
        <div className="rounded border-x p-4 my-2">{post.content}</div>
    )
}

export default function PostsIndexPage({ posts }: PostsIndexProps) {
    return (
        <AppLayout>
            <Head title="Posts" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>Posts</h1>
                {/** New post form */}
                <div>
                    <Form
                        {...PostController.store.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        <Textarea
                            placeholder="What's on your mind?"
                            className="mb-2"
                            required
                            name="content"
                        />
                        <div className="flex items-center justify-between">
                            <Select name="visibility" defaultValue="PUBLIC">
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="Select visibility" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PUBLIC">Public</SelectItem>
                                    <SelectItem value="FOLLOWERS">Followers</SelectItem>
                                    <SelectItem value="PRIVATE">Private</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="submit">Post</Button>
                        </div>

                    </Form>
                </div>

                {/** Post listing */}
                <div className="flex flex-col gap-2">
                    {posts.data.map((post) => <PostItem key={post.uuid} post={post} />)}
                </div>
            </div>
        </AppLayout>
    )
}