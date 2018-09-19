<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function create(Request $request, Post $post)
    {
        // Create a new post by relationship
        $createdPost = $request->user()->posts()->create([
            'body' => $request->body,
        ]);

        // Return the reponse
        return response()->json($post->with('user')->find($createdPost->id));
    }
}
