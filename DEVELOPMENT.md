# Development Setup

This project is configured with ESLint, Prettier, and Husky for consistent code quality and formatting.

## Tools Configured

### ESLint

- Lints JavaScript and JSX files
- Integrates with React hooks and React refresh
- Configured to work with Prettier

### Prettier

- Formats code consistently
- Uses single quotes, trailing commas, and CRLF line endings for Windows
- Ignores build files and dependencies

### Husky

- Git hooks for automated code quality checks
- Pre-commit hook runs lint-staged

### Lint-staged

- Runs ESLint and Prettier on staged files before commit
- Ensures only properly formatted and linted code is committed

## Available Scripts

- `npm run lint` - Run ESLint to check for issues
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are properly formatted

## VS Code Configuration

The project includes VS Code settings that:

- Set Prettier as the default formatter
- Enable format on save
- Run ESLint fixes on save
- Recommend useful extensions

## Workflow

1. Write your code
2. Save files (auto-formatting will occur)
3. Commit your changes (pre-commit hook will run lint-staged)
4. If there are any issues, fix them and commit again
