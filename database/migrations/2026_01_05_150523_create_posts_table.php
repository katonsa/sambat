<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('parent_post_id')->nullable()->constrained('posts', 'id')->onDelete('cascade');
            $table->text('content');
            $table->enum('visibility', ['PUBLIC', 'FOLLOWERS', 'PRIVATE']);
            $table->boolean('is_reply')->default(false);

            // denormalized counter
            $table->integer('replies_count')->default(0);
            $table->integer('likes_count')->default(0);
            $table->integer('reposts_count')->default(0);

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
