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
            $table->string('display_name')->nullable(false)->change();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('display_name', 'name');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['public_handle']); // Drop the unique constraint
            $table->dropColumn(['bio', 'avatar_url', 'is_suspended']);
        });
    }
};
