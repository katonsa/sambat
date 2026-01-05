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
        /**
         * Alter users table to add columns:
         */
        Schema::table('users', function (Blueprint $table) {
            $table->string('public_handle', 48)->unique();
            $table->text('bio')->nullable();
            $table->string('avatar_url')->nullable();
            $table->boolean('is_suspended')->default(false); // Flag to indicate if user is suspended
        });

        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('name', 'display_name');
            $table->string('display_name')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['public_handle']); // Drop the unique constraint
            $table->dropColumn(['bio', 'avatar_url', 'is_suspended']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('display_name', 'name');
        });

        // Update null values to a default value before changing to non-nullable / backfill
        DB::table('users')->whereNull('name')->orderBy('id')
            ->chunkById(1000, function ($rows) {
                $ids = collect($rows)->pluck('id')->all();
                DB::table('users')->whereIn('id', $ids)->update(['name' => 'User']);
            });

        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->nullable(false)->change();
        });
    }
};
