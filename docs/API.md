# Collabify API Documentation

Base URL (local development): `http://localhost:5000/api`

All protected routes require a `Authorization: Bearer <token>` header.

## Auth

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Log in and receive a JWT | No |

## Users

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/users/me` | Get current user's profile | Yes |
| PUT | `/users/me` | Update current user's profile | Yes |
| POST | `/users/me/picture` | Upload profile picture | Yes |
| GET | `/users/:id` | Get a public user profile | No |
| POST | `/users/:id/follow` | Follow a user | Yes |
| DELETE | `/users/:id/follow` | Unfollow a user | Yes |
| GET | `/users/:id/follow-status` | Get follower count and follow status | No |

## Projects

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/projects` | List all projects | No |
| GET | `/projects/:id` | Get project details | No |
| POST | `/projects` | Create a new project | Yes |
| PUT | `/projects/:id` | Edit a project (owner only) | Yes |
| DELETE | `/projects/:id` | Delete a project (owner only) | Yes |

## Team & Join Requests

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/projects/:id/join-requests` | Request to join a project | Yes |
| GET | `/projects/:id/join-requests` | View pending requests (owner only) | Yes |
| PUT | `/join-requests/:id/accept` | Accept a join request | Yes |
| PUT | `/join-requests/:id/reject` | Reject a join request | Yes |
| GET | `/projects/:id/team` | View team members | No |
| DELETE | `/projects/:id/team/:userId` | Remove a team member (owner only) | Yes |

## Posts & Social

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/posts` | Get all posts (with comments) | No |
| POST | `/posts` | Create a post | Yes |
| DELETE | `/posts/:id` | Delete own post | Yes |
| POST | `/posts/:id/like` | Toggle like on a post | Yes |
| POST | `/posts/:id/comments` | Add a comment | Yes |

## Chat

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/projects/:id/messages` | Get chat history for a project | Yes |

Real-time messaging is handled via Socket.io events (`join_room`, `send_message`, `receive_message`, `online_users`).

## Notifications

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/notifications` | Get current user's notifications | Yes |
| PUT | `/notifications/:id/read` | Mark one notification as read | Yes |
| PUT | `/notifications/read-all` | Mark all notifications as read | Yes |