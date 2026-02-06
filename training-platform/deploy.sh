#!/bin/bash

# BioNXA Automated Deployment Script
# This script deploys the platform to Vercel

echo "🚀 Starting BioNXA Deployment..."
echo ""

# Navigate to project directory
cd /home/user/webapp/training-platform

# Check if vercel is installed
if ! command -v npx &> /dev/null; then
    echo "❌ npm not found"
    exit 1
fi

echo "✅ Environment ready"
echo ""

# Create .vercelignore
cat > .vercelignore << EOF
node_modules
.next
.env.local
*.log
EOF

echo "✅ Created .vercelignore"
echo ""

# Build the project first
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📦 Project is ready for deployment"
    echo ""
    echo "⚠️  MANUAL STEP REQUIRED:"
    echo "To complete deployment, you need to:"
    echo "1. Go to: https://vercel.com/dashboard"
    echo "2. Import your GitHub repository 'nextflow'"
    echo "3. Set Root Directory to: training-platform"
    echo "4. Add environment variables (already in vercel.json)"
    echo "5. Click Deploy"
    echo ""
    echo "OR use: npx vercel --prod (requires Vercel login)"
else
    echo "❌ Build failed"
    exit 1
fi
