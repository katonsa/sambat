<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FollowController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

Route::middleware(['auth'])->group(function () {
    Route::get('feed', function () {
        return Inertia::render('feed');
    })->name('feed');

    Route::get('users/{user:public_handle}', [UserController::class, 'show'])->name('users.show');

    Route::post('users/{user:public_handle}/follow', [FollowController::class, 'store'])->name('users.follow');
    Route::delete('users/{user:public_handle}/unfollow', [FollowController::class, 'destroy'])->name('users.unfollow');

    Route::get('me', function () {
        // Redirect to users/{current_user_public_handle}
        return redirect()->route('users.show', auth()->user()->public_handle);
    });

});

require __DIR__ . '/settings.php';
