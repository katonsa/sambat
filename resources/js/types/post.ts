export type Post = {
    uuid: string;
    content: string;
    created_at: string;
    author: {
        display_name?: string;
        public_handle: string;
        avatar_url?: string;
    };
    visibility: 'PUBLIC' | 'PRIVATE' | 'FOLLOWERS';
};
