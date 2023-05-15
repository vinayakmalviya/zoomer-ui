# Zoomer

A simple vanilla JS based website that allows you to manage meeting rooms on your own.

The rooms are divided into 2 categories: **Available** and **Active**

You can occupy, freeup and join any added rooms directly from the website.

## Functions

1. Add rooms:

   Add a room along with a url to join the room directly

2. Edit rooms:

   Change room details, if needed

3. Occupy room:

   Mark a room as active with a title and duration for activity

4. Join room:

   Opens the link to join the room

5. Freeup room:

   Mark a room as available after your use is done

## Moving parts

There's 2 parts to Zoomer:

1. Website
2. Server

The server lives in the [zoomer-api](https://github.com/vinayakmalviya/zoomer-api) repository. Its a simple rust based web-server with a few routes. The API/endpoint documentation is available in the repository.

## Wishlist/Todos

Please feel free to suggest more stuff to do here:

1. Fix the FAB/Snackbar position bug when scrolling
2. Handle automatic freeup of rooms
3. Create a CLI for interacting with rooms via the command line

## Motivation

I've been working with React and the usual frontend web "stacks" for a significant amount of time. At this point, everything in there feels too clunky or bulky, hence the vanilla JS website. I still love React, Svelte and all the goodies that come with those, but the simplicity of vanilla is something that I missed and super fun to use!

Again in case of CSS, yes Tailwind and the lot is great but nothing beats plain old CSS. Yes, my CSS needs a lot of work but using something other than a library/framework (or whatever they term themselves as) makes a lot of sense and again..its fun to use!
