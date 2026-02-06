#!/bin/bash
echo "=== COMPREHENSIVE ROUTE TESTING ==="
echo ""

BASE_URL="https://3008-ir3rlkk8worb6q2l2frk6-ad490db5.sandbox.novita.ai"

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
)

pass=0
fail=0

for route in "${routes[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$route")
  if [ "$status" = "200" ]; then
    echo "✅ $route - HTTP $status"
    ((pass++))
  else
    echo "❌ $route - HTTP $status"
    ((fail++))
  fi
done

echo ""
echo "=== RESULTS ==="
echo "✅ Passed: $pass"
echo "❌ Failed: $fail"
echo "Pass Rate: $(( pass * 100 / (pass + fail) ))%"
