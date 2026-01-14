<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * @property string $uuid
 */
class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'parent_post_id',
        'content',
        'visibility',
        'is_reply',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [];
    }
    
    /**
     * Get route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    protected static function booted(): void
    {
        static::creating(function (Post $post) {
            $post->uuid = (string) Str::uuid();
        });
    }

    /**
     * Get the post's author.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User, Post>
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the post's replies.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Post, Post>
     */
    public function replies()
    {
        return $this->hasMany(Post::class, 'parent_post_id');
    }

    /**
     * Get the post's parent.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<Post, Post>
     */
    public function parent()
    {
        return $this->belongsTo(Post::class, 'parent_post_id');
    }
}
