# Contributing to Collabify

Thanks for your interest in contributing! This project follows a simple, structured workflow.

## Development Workflow

1. Create a new branch from `development` for your feature or fix:
```bash
   git checkout development
   git pull origin development
   git checkout -b feature/your-feature-name
```

2. Make your changes, committing with clear messages:
```bash
   git commit -m "feat: add short description of the change"
```

3. Push your branch and open a Pull Request into `development`:
```bash
   git push origin feature/your-feature-name
```

4. Once reviewed and approved, it will be merged into `development`, and periodically `development` is merged into `main` via a reviewed Pull Request.

## Commit Message Conventions

- `feat:` — a new feature
- `fix:` — a bug fix
- `docs:` — documentation changes
- `refactor:` — code changes that neither fix a bug nor add a feature
- `style:` — formatting, missing semicolons, etc.

## Code Style

- Keep components small and focused
- Reuse existing components where possible (e.g., `ProjectCard`, `PostCard`)
- Match the existing design tokens defined in `frontend/src/index.css`

## Reporting Issues

If you find a bug, please open an issue describing:
- What you expected to happen
- What actually happened
- Steps to reproduce