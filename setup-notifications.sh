#!/bin/bash

# LGM Website - Git Push Notification Setup Script
# This script automatically configures iMessage notifications for git pushes

echo "🔧 Setting up iMessage push notifications for LGM Website..."
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Please run this from the LGM_Website_v3 directory."
    exit 1
fi

# Check if we're on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ Error: This script only works on macOS."
    exit 1
fi

# Prompt for chat ID
echo "📱 Please enter the LGM Website group chat ID:"
echo "(Ask a team member for this ID if you don't have it)"
read -p "Chat ID: " CHAT_ID

if [ -z "$CHAT_ID" ]; then
    echo "❌ Error: Chat ID cannot be empty."
    exit 1
fi

# Create the pre-push hook
cat > .git/hooks/pre-push << 'EOF'
#!/bin/bash

CHAT_ID="REPLACE_CHAT_ID"
BRANCH=$(git rev-parse --abbrev-ref HEAD)
LAST_COMMIT_MSG=$(git log -1 --pretty=%B)
AUTHOR=$(git log -1 --pretty=%an)
TIMESTAMP=$(TZ='America/Detroit' date '+%Y-%m-%d %I:%M:%S %p EST')

MESSAGE="🍞 Push to LGM Website!

Branch: $BRANCH
Author: $AUTHOR
Time: $TIMESTAMP
Last commit: $LAST_COMMIT_MSG"

osascript -e "tell application \"Messages\" to send \"$MESSAGE\" to chat id \"$CHAT_ID\""
EOF

# Replace placeholder with actual chat ID
sed -i '' "s/REPLACE_CHAT_ID/$CHAT_ID/" .git/hooks/pre-push

# Make the hook executable
chmod +x .git/hooks/pre-push

echo ""
echo "✅ iMessage push notifications set up successfully!"
echo ""
echo "📱 You will now receive notifications in the LGM Website group chat whenever you push."
echo ""
echo "🧪 Test it by running: git push"
echo ""
