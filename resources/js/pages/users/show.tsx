import { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, User as UserType } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CalendarDays, Pencil } from 'lucide-react';
import { edit as editProfile } from '@/routes/profile'

interface UserShowProps {
    profileUser: UserType & { is_followed: boolean; is_self: boolean };
    tab: 'posts' | 'likes'; // tabs on profile page
}

export default function UserShow({ profileUser: initialUser, tab }: UserShowProps) {
    const [user, setUser] = useState(initialUser);

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '#',
        },
        {
            title: `${user.display_name || user.public_handle}`,
            href: `/users/${user.public_handle}`,
        },
    ];

    // Profile Follow/Unfollow
    const toggleProfileFollow = () => {
        const wasFollowed = user.is_followed;
        setUser((prev) => ({ ...prev, is_followed: !wasFollowed }));

        if (wasFollowed) {
            router.delete(`/users/${user.public_handle}/unfollow`, {
                preserveScroll: true,
                onError: () => setUser(initialUser),
            });
        } else {
            router.post(`/users/${user.public_handle}/follow`, {}, {
                preserveScroll: true,
                onError: () => setUser(initialUser),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`@${user.public_handle}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto w-full md:w-8/12 text-foreground">
                    {/* User Profile Header */}
                    <div className="mb-6 rounded-lg border border-sidebar-border/70 bg-white p-6 dark:border-sidebar-border dark:bg-sidebar">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20 border-2 border-border/50">
                                    <AvatarImage src={user.avatar_url || undefined} alt={user.display_name} />
                                    <AvatarFallback className="text-xl">{user.display_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="text-2xl font-bold">{user.display_name}</h1>
                                    <p className="text-muted-foreground">@{user.public_handle}</p>
                                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                                        <CalendarDays className="h-4 w-4" />
                                        <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            {!user.is_self && (
                                <Button
                                    onClick={toggleProfileFollow}
                                    variant={user.is_followed ? "secondary" : "default"}
                                >
                                    {user.is_followed ? 'Unfollow' : 'Follow'}
                                </Button>
                            )}
                            {user.is_self && (
                                <Button asChild variant="outline" size="sm" className="cursor-pointer gap-2">
                                    <Link href={editProfile.url()}>
                                        <Pencil className="h-4 w-4" />
                                        <span className="hidden sm:inline">Edit Profile</span>
                                    </Link>
                                </Button>
                            )}
                        </div>
                        {user.bio && (
                            <div className="mt-4">
                                <p className="whitespace-pre-wrap">{user.bio}</p>
                            </div>
                        )}
                        <div className="mt-4 flex gap-4 text-sm">
                            <span className="font-semibold text-foreground">{user.following_count ?? 0} <span className="text-muted-foreground font-normal">Following</span></span>
                            <span className="font-semibold text-foreground">{user.followers_count ?? 0} <span className="text-muted-foreground font-normal">Followers</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
