<?php

namespace Tests\Feature\Post;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreatePostTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_post_creation(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->post(route('posts.store'), [
                'content' => 'Hello World',
                'visibility' => 'PUBLIC',
            ]);

        $response->assertRedirect(route('posts.index'));
        $this->assertDatabaseHas('posts', [
            'content' => 'Hello World',
            'user_id' => $user->id,
            'is_reply' => false,
        ]);
    }

    public function test_reply_creation_increments_counter(): void
    {
        $user = User::factory()->create();
        $parentPost = Post::factory()->create([
            'user_id' => $user->id,
            'replies_count' => 0,
        ]);

        $response = $this->actingAs($user)
            ->post(route('posts.store'), [
                'content' => 'This is a reply',
                'visibility' => 'PUBLIC',
                'parent_post_id' => $parentPost->id,
            ]);

        $response->assertRedirect(route('posts.index'));

        // Check reply
        $this->assertDatabaseHas('posts', [
            'content' => 'This is a reply',
            'parent_post_id' => $parentPost->id,
            'is_reply' => true,
        ]);

        // Check parent counter
        $this->assertDatabaseHas('posts', [
            'id' => $parentPost->id,
            'replies_count' => 1,
        ]);
    }

    public function test_post_deletion_decrements_counter(): void
    {
        $user = User::factory()->create();
        $parentPost = Post::factory()->create([
            'user_id' => $user->id,
            'replies_count' => 0,
        ]);

        $reply = Post::factory()->create([
            'user_id' => $user->id,
            'parent_post_id' => $parentPost->id,
            'is_reply' => true,
        ]);
        
        // Simulating the observer's effect on creation manually if factories don't trigger it (they usually do if models boot)
        // But since we are testing the observer, we expect it to run.
        // Let's verify start state.
        $this->assertDatabaseHas('posts', [
            'id' => $parentPost->id,
            'replies_count' => 1,
        ]);

        $reply->delete();

        $this->assertDatabaseHas('posts', [
            'id' => $parentPost->id,
            'replies_count' => 0,
        ]);
    }
}
