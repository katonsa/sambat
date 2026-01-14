import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import posts from '@/routes/posts';
import { useForm } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export function CreatePostDialog() {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
        visibility: 'PUBLIC',
    });

    const [charCount, setCharCount] = useState(0);
    const maxChars = 280;

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setData('content', value);
        setCharCount(value.length);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(posts.store().url, {
            onSuccess: () => {
                reset();
                setCharCount(0);
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="cursor-pointer rounded-lg border border-sidebar-border/70 bg-white p-3 transition-colors hover:bg-accent dark:border-sidebar-border dark:bg-sidebar dark:hover:bg-accent">
                    <div className="flex items-center gap-3">
                        <PlusCircle className="h-5 w-5 text-muted-foreground" />
                        <p className="text-muted-foreground">
                            What's on your mind?
                        </p>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create a post</DialogTitle>
                    <DialogDescription>
                        Express yourself without judgment
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                    <Field>
                        <div className="relative">
                            <Textarea
                                id="content"
                                value={data.content}
                                onChange={handleContentChange}
                                placeholder="What's on your mind?"
                                className="min-h-[150px] resize-none break-all pr-16"
                                maxLength={maxChars}
                                autoFocus
                            />
                            <span
                                className={`absolute bottom-3 right-3 text-sm ${
                                    charCount > maxChars
                                        ? 'text-destructive'
                                        : 'text-muted-foreground'
                                }`}
                            >
                                {charCount}/{maxChars}
                            </span>
                        </div>
                        {errors.content && (
                            <FieldError>{errors.content}</FieldError>
                        )}
                    </Field>

                    <div className="flex items-center justify-end gap-3">
                        <Select
                            value={data.visibility}
                            onValueChange={(value) =>
                                setData('visibility', value)
                            }
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Visibility" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PUBLIC">
                                    Public
                                </SelectItem>
                                <SelectItem value="PRIVATE">
                                    Only Me
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Posting...' : 'Post'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
