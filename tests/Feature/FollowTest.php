<?php

use App\Models\User;

test('user can follow another user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('users.follow', $otherUser));

    $response->assertRedirect();
    $this->assertTrue($user->isFollowing($otherUser));
    $this->assertDatabaseHas('follows', [
        'follower_id' => $user->id,
        'followed_id' => $otherUser->id,
    ]);
});

test('user can unfollow another user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $user->follow($otherUser);

    $response = $this->actingAs($user)
        ->delete(route('users.unfollow', $otherUser));

    $response->assertRedirect();
    $this->assertFalse($user->isFollowing($otherUser));
    $this->assertDatabaseMissing('follows', [
        'follower_id' => $user->id,
        'followed_id' => $otherUser->id,
    ]);
});

test('user cannot follow themselves', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)
        ->post(route('users.follow', $user));

    $response->assertRedirect();
    $this->assertFalse($user->isFollowing($user));
    $this->assertDatabaseMissing('follows', [
        'follower_id' => $user->id,
        'followed_id' => $user->id,
    ]);
});

test('user cannot follow another user twice', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $user->follow($otherUser);
    $this->assertTrue($user->isFollowing($otherUser));

    $response = $this->actingAs($user)
        ->post(route('users.follow', $otherUser));

    $response->assertRedirect();
    // Assuming we might change the message or just ensure no duplicate in DB
    $this->assertEquals(1, $user->following()->where('followed_id', $otherUser->id)->count());
});

test('user cannot unfollow another user they are not following', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    $response = $this->actingAs($user)
        ->delete(route('users.unfollow', $otherUser));

    $response->assertRedirect();
    $this->assertFalse($user->isFollowing($otherUser));
});

test('isFollowing method works correctly', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();

    expect($user->isFollowing($otherUser))->toBeFalse();

    $user->follow($otherUser);

    expect($user->isFollowing($otherUser))->toBeTrue();
});
