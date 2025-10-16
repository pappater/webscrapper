# Deployment Instructions for GitHub Pages

This document provides step-by-step instructions for deploying the Web Scraper application to GitHub Pages.

## Prerequisites

- The PR with all enhancements must be merged to the main branch
- You must have write access to the repository
- Git and Node.js must be installed on your system

## Deployment Steps

### Method 1: Using npm deploy script (Recommended)

1. Clone the repository and navigate to the project directory:
```bash
git clone https://github.com/pappater/webscrapper.git
cd webscrapper
```

2. Install dependencies:
```bash
npm install
```

3. Deploy to GitHub Pages:
```bash
npm run deploy
```

This command will:
- Build the production version of the app
- Create/update the `gh-pages` branch
- Push the built files to GitHub Pages

### Method 2: Manual Deployment

If the automated deployment doesn't work, you can deploy manually:

1. Build the application:
```bash
npm run build
```

2. Create an orphan gh-pages branch:
```bash
git checkout --orphan gh-pages
```

3. Remove all files except build folder:
```bash
git rm -rf .
rm -rf .gitignore
```

4. Copy build contents to root:
```bash
cp -r build/* .
rm -rf build
```

5. Add and commit the files:
```bash
git add .
git commit -m "Deploy to GitHub Pages"
```

6. Force push to gh-pages branch:
```bash
git push origin gh-pages --force
```

7. Switch back to main branch:
```bash
git checkout main
```

## Accessing the Deployed Application

After deployment, the application will be available at:
```
https://pappater.github.io/webscrapper
```

Note: It may take a few minutes for GitHub Pages to build and serve the site after deployment.

## Verifying the Deployment

1. Visit the live URL: https://pappater.github.io/webscrapper
2. Test the functionality:
   - Enter a valid URL (e.g., https://example.com)
   - Click "Scrape" and wait for the content to load
   - Verify the download button appears
   - Test the download functionality
   - Try the dark/light mode toggle
   - Test on mobile devices for responsiveness

## Troubleshooting

### Build Fails
- Ensure all dependencies are installed: `npm install`
- Check Node.js version is compatible (v12+)
- Try clearing cache: `rm -rf node_modules package-lock.json && npm install`

### Deployment Fails
- Verify you have write access to the repository
- Check GitHub Pages settings in repository settings
- Ensure gh-pages branch is set as the source in GitHub Pages settings

### Site Not Loading
- Wait a few minutes after deployment
- Check GitHub Pages status in repository settings
- Verify the gh-pages branch contains the correct files
- Check browser console for errors

### 404 Errors on Assets
- Verify the `homepage` field in package.json is correct
- Rebuild and redeploy the application

## Configuration

The following configuration in `package.json` is required for GitHub Pages:

```json
{
  "homepage": "https://pappater.github.io/webscrapper"
}
```

This ensures all assets are loaded with the correct base path.

## GitHub Pages Settings

To enable GitHub Pages:

1. Go to repository Settings
2. Navigate to Pages section
3. Set Source to "Deploy from branch"
4. Select "gh-pages" branch
5. Set folder to "/ (root)"
6. Click Save

The site will be live at the URL shown in the settings.

## Updating the Deployment

To update the deployed application after making changes:

1. Make your changes and commit them to main branch
2. Run `npm run deploy` again
3. The gh-pages branch will be automatically updated

## Notes

- The gh-pages branch is automatically managed by the deployment script
- Do not manually edit files in the gh-pages branch
- The deployment uses the production build, which is optimized and minified
- The main branch contains the source code, gh-pages contains only built files
