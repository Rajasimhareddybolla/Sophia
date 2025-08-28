# Google Cloud App Engine Deployment Guide

## Prerequisites

### 1. Install Google Cloud SDK
```bash
# For macOS (using Homebrew)
brew install google-cloud-sdk

# Or download from: https://cloud.google.com/sdk/docs/install
```

### 2. Initialize Google Cloud SDK
```bash
# Initialize gcloud
gcloud init

# Login to your Google account
gcloud auth login

# Set your project ID (create a new project if needed)
gcloud config set project YOUR_PROJECT_ID
```

### 3. Create a Google Cloud Project (if you don't have one)
```bash
# Create a new project
gcloud projects create YOUR_PROJECT_ID --name="Sophia News App"

# Set the project as default
gcloud config set project YOUR_PROJECT_ID

# Link billing account (required for App Engine)
gcloud billing projects link YOUR_PROJECT_ID --billing-account=BILLING_ACCOUNT_ID
```

## Deployment Steps

### Method 1: Using the deployment script (Recommended)
```bash
cd /Users/raja/Desktop/sophia/Sophia
./deploy.sh
```

### Method 2: Manual deployment
```bash
# 1. Install dependencies
npm install

# 2. Build the application
npm run build

# 3. Enable required APIs
gcloud services enable appengine.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# 4. Deploy to App Engine
gcloud app deploy
```

## Post-Deployment

### View your application
```bash
# Open in browser
gcloud app browse

# Get the URL
gcloud app describe --format="value(defaultHostname)"
```

### Monitor your application
```bash
# View logs
gcloud app logs tail -s default

# View logs in browser
gcloud app logs read --limit 50
```

### Manage versions
```bash
# List all versions
gcloud app versions list

# Delete old versions
gcloud app versions delete VERSION_ID
```

## Configuration Files Created

- `app.yaml` - App Engine configuration
- `.gcloudignore` - Files to ignore during deployment
- `deploy.sh` - Automated deployment script
- `next.config.mjs` - Updated for App Engine optimization

## Environment Variables

If you need environment variables, add them to `app.yaml`:

```yaml
env_variables:
  NODE_ENV: production
  CUSTOM_API_KEY: your_api_key_here
```

## Custom Domain (Optional)

To use a custom domain:

```bash
# Map domain
gcloud app domain-mappings create example.com

# Verify domain ownership in Google Search Console
```

## Scaling Configuration

The app is configured with automatic scaling:
- Min instances: 1
- Max instances: 10
- Target CPU utilization: 60%

You can modify these settings in `app.yaml`.

## Troubleshooting

### Common Issues

1. **Build errors**: Make sure all dependencies are in `package.json`
2. **Memory issues**: Increase instance class in `app.yaml`
3. **Timeout errors**: Increase timeout settings in `app.yaml`
4. **Static files**: Ensure proper Next.js configuration for static assets

### Useful Commands

```bash
# View application info
gcloud app describe

# View quotas
gcloud app regions describe

# Stream logs
gcloud app logs tail -s default

# SSH into instance (if needed)
gcloud app instances ssh INSTANCE_ID --service=default
```

## Cost Optimization

- Use automatic scaling with appropriate min/max instances
- Monitor usage in Google Cloud Console
- Set up billing alerts
- Consider using Google Cloud CDN for static assets
