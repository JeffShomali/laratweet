@extends('layouts.app')

@section('content')
<div class="container">
    <h2 class="text-primary"> {{ $user->username }}</h2>
    <hr>
    @if(Auth::user()->isNotTheUser($user))
        @if(Auth::user()->isFollowing($user))
                <a href="{{Route('users.unfollow', $user)}}" class="btn btn-primary"> Unfollow </a>
        @else
                <a href={{ Route('users.follow', $user) }} class="btn btn-primary"> Follow </a>
        @endif
    @endif
</div>
@endsection
