#!/bin/bash

echo "🚀 Contact Management App - Setup Helper"
echo "========================================"
echo ""

# Check if .env exists
if [ -f "server/.env" ]; then
    echo "✅ server/.env already exists"
    
    # Check if MONGO_URI is configured
    if grep -q "your_mongodb_connection_string_here" server/.env; then
        echo "⚠️  MongoDB URI is not configured yet!"
        echo ""
        echo "Please update server/.env with your MongoDB connection string:"
        echo "  1. Go to https://cloud.mongodb.com"
        echo "  2. Create a cluster (free tier available)"
        echo "  3. Click Connect → Connect your application"
        echo "  4. Copy the connection string"
        echo "  5. Replace MONGO_URI in server/.env"
        echo ""
    else
        echo "✅ MongoDB URI is configured"
    fi
else
    echo "❌ server/.env not found - creating from example"
    cp server/.env.example server/.env
    echo "⚠️  Please configure server/.env with your MongoDB URI"
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install root dependencies
npm install

# Install server dependencies
echo "Installing server dependencies..."
cd server && npm install && cd ..

# Install client dependencies
echo "Installing client dependencies..."
cd client && npm install && cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Configure server/.env with your MongoDB connection string"
echo "  2. Run 'npm run dev' to start both client and server"
echo "  3. Open http://localhost:5173 in your browser"
echo ""
echo "For deployment instructions, see DEPLOYMENT.md"
echo ""
