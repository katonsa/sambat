import { Button } from '@/components/ui/button';
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
import { FormEventHandler, useState } from 'react';

interface PostFormProps {
    onSuccess?: () => void;
    initialData?: {
        content: string;
        visibility: 'PUBLIC' | 'PRIVATE' | 'FOLLOWERS';
    };
    updateUrl?: string;
}

export function PostForm({ onSuccess, initialData, updateUrl }: PostFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        content: initialData?.content || '',
        visibility: initialData?.visibility || 'PUBLIC',
    });

    const [charCount, setCharCount] = useState(initialData?.content.length || 0);
    const maxChars = 280;

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setData('content', value);
        setCharCount(value.length);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (updateUrl) {
            put(updateUrl, {
                onSuccess: () => {
                   onSuccess?.();
                },
            });
        } else {
            post(posts.store().url, {
                onSuccess: () => {
                    reset();
                    setCharCount(0);
                    onSuccess?.();
                },
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <Field>
                <div className="relative">
                    <Textarea
                        id="content"
                        value={data.content}
                        onChange={handleContentChange}
                        placeholder="What's on your mind?"
                        className="min-h-[150px] resize-none pr-16 break-all"
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
                        setData('visibility', value as 'PUBLIC' | 'PRIVATE')
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
                    {updateUrl ? (processing ? 'Updating...' : 'Update') : (processing ? 'Posting...' : 'Post')}
                </Button>
            </div>
        </form>
    );
}
