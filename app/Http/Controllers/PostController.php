<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;

class PostController extends Controller
{
    public function index(Request $request, Post $post)
    {
        //get all the posts belong to the current authenthicated user and following user posts
        $allPosts = $post->whereIn('user_id', $request->user()->following()->pluck('users.id')->push($request->user()->id))->with('user');  // ->push($request->user()->id) // used to get all the following user posts

        $posts = $allPosts->orderBy('created_at', 'desc')->take(10)->get();
        return response()->json([
            'posts' => $posts,
        ]);
    }

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
