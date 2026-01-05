<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(Request $request, User $user): Response
    {
        $currentUser = $request->user();
        // Load follower/following counts so the frontend can display live numbers
        $user->loadCount(['followers', 'following']);
        $user->is_followed = $currentUser ? $currentUser->isFollowing($user) : false;
        $user->is_self = $currentUser ? ($user->id === $currentUser->id) : false;

        return Inertia::render('users/show', ['profileUser' => $user]);
    }
}
