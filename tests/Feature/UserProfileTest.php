<?php

use App\Models\User;

test('user can view profile page', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get(route('users.show', $user));

    $response->assertStatus(200);
});