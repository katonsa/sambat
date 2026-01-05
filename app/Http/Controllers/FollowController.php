<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class FollowController extends Controller
{
    /**
     * Store a newly created resource in storage.
     * Follow a user.
     */
    public function store(Request $request, User $user): RedirectResponse
    {
        if (auth()->user()->id === $user->id) {
            return back()->with('error', 'You cannot follow yourself.');
        }

        if (auth()->user()->isFollowing($user)) {
            return back()->with('info', "You are already following {$user->public_handle}.");
        }

        auth()->user()->follow($user);

        return back()->with('success', "You are now following {$user->public_handle}.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, User $user): RedirectResponse
    {
        if (!auth()->user()->isFollowing($user)) {
            return back()->with('info', "You are not following {$user->display_name}.");
        }

        auth()->user()->unfollow($user);

        return back()->with('success', "You have unfollowed {$user->display_name}.");
    }
}
