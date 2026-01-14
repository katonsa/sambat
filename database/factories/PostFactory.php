<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'content' => $this->faker->sentence(20, true),
            'visibility' => $this->faker->randomElement(['PUBLIC', 'FOLLOWERS', 'PRIVATE']),
            'is_reply' => false,
            'replies_count' => 0,
            'likes_count' => $this->faker->numberBetween(0, 100),
            'reposts_count' => $this->faker->numberBetween(0, 50),
        ];
    }
}
