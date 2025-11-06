# Contributing to Musicminion's Blog

Thank you for your interest in contributing to this blog! This document provides guidelines for contributing.

## How to Contribute

### Reporting Issues

Before creating an issue, please:
1. Search existing issues to avoid duplicates
2. Use the appropriate issue template (Bug Report, Feature Request, or Question)
3. Provide clear and detailed information
4. Include screenshots or examples when applicable

### Suggesting Features

We welcome feature suggestions! Please:
1. Use the Feature Request template
2. Clearly describe the feature and its benefits
3. Explain the problem it solves
4. Provide examples if possible

### Reporting Bugs

If you find a bug:
1. Use the Bug Report template
2. Describe the steps to reproduce
3. Include your environment details (browser, OS, etc.)
4. Add screenshots if relevant

### Questions and Discussions

For questions:
1. Use the Question template
2. Provide context for your question
3. Describe what you've already tried
4. Be specific and clear

## Development Setup

This blog is built with [Hexo](https://hexo.io/). To set up a development environment:

### Prerequisites
- Node.js 20 or higher
- npm

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run server
```

The blog will be available at `http://localhost:4000`

### Building

```bash
npm run build
```

## Using Docker

If you prefer Docker:

### Development
```bash
docker compose -f docker-compose.dev.yml up -d
```

### Production
```bash
docker compose -f docker-compose.yml up -d
```

## Project Structure

- `source/_posts_src/` - Blog post source files
- `themes/` - Hexo themes
- `_config.yml` - Main Hexo configuration
- `_config.fluid.yml` - Fluid theme configuration
- `generate_posts.sh` - Script to generate posts

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Questions?

If you have any questions, feel free to:
- Open an issue using the Question template
- Check existing issues and discussions

Thank you for contributing! 🎉
