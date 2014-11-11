<?php

function create_cookie($user)
{
	$_COOKIE['author_id'] = sha256($user);
}