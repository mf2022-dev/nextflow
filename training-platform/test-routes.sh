#!/bin/bash
echo "=== TESTING ALL ROUTES ==="
echo ""

BASE_URL="https://3007-ir3rlkk8worb6q2l2frk6-ad490db5.sandbox.novita.ai"

routes=(
  "/en"
  "/ar"
  "/en/privacy"
  "/ar/privacy"
  "/en/terms"
  "/ar/terms"
  "/en/pricing"
  "/ar/pricing"
  "/en/auth"
  "/ar/auth"
  "/en/dashboard"
  "/ar/dashboard"
)

for route in "${routes[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$route")
  if [ "$status" = "200" ]; then
    echo "✅ $route - HTTP $status"
  else
    echo "❌ $route - HTTP $status"
  fi
done
