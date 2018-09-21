@extends('layouts.app')

@section('content')
<div class="container">
    {{ $user->username }}

    <hr>
    @if(Auth::user()->isNotTheUser($user))
        @if(Auth::user()->isFollowing($user))
                <a href="#"> Unfollow </a>
        @else
                <a href={{ Route('users.follow', $user) }}> Follow </a>
        @endif
    @endif
</div>
@endsection