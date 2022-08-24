---
title: Note about NestJs
---

# Concepts

Comparing with Laravel.

## Routing and Controller

Laravel:

- Routes route to controller actions.

- Controllers: `app/Http/Controllers/*.php`.

- Routes:

  ```
  routes/web.php
  routes/api.php
  routes/console.php
  routes/channels.php
  ```

NestJs:

- Use class method decorator to specify route of controller actions -- `*.controller.ts`.

- List controllers in `@Module`.

## Dependency Injection Container

Laravel:

- `ServiceContainer`
- `ServiceProvider`

NestJs:

- TODO
