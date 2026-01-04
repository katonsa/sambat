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
        $user->is_self = $currentUser ? ($user->id === $currentUser->id) : false;

        return Inertia::render('users/show', ['profileUser' => $user]);
    }
}
