<?php

use App\Models\User;

test('guests are redirected to the login page when visiting the feed', function () {
    $this->get(route('feed'))->assertRedirect(route('login'));
});

test('authenticated users can visit the feed', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('feed'))->assertOk();
});
