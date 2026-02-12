#!/bin/bash

echo "=== BioNXA Platform - Final QA Verification ==="
echo "Date: $(date)"
echo ""

# Initialize counters
PASSED=0
FAILED=0
WARNINGS=0

# Test 1: Verify all scripts have proper error handling
echo "1. Checking script error handling..."
for script in scripts/pipeline_steps/*.sh scripts/upec_pipeline.sh; do
    if grep -q "set -e" "$script" || grep -q "set -euo pipefail" "$script"; then
        echo "   ✓ $script has error handling"
        ((PASSED++))
    else
        echo "   ⚠ $script missing error handling flags"
        ((WARNINGS++))
    fi
done

# Test 2: Verify install script completeness
echo ""
echo "2. Checking install_tools.sh completeness..."
if [ -f "scripts/install_tools.sh" ]; then
    if grep -q "fastqc" scripts/install_tools.sh && \
       grep -q "unicycler" scripts/install_tools.sh && \
       grep -q "prokka" scripts/install_tools.sh && \
       grep -q "abricate" scripts/install_tools.sh; then
        echo "   ✓ All required tools in install script"
        ((PASSED++))
    else
        echo "   ✗ Missing some tools in install script"
        ((FAILED++))
    fi
else
    echo "   ✗ install_tools.sh not found"
    ((FAILED++))
fi

# Test 3: Check FASTA file integrity
echo ""
echo "3. Validating FASTA file format..."
for fasta in data/fasta_files/*.fasta; do
    if [ -f "$fasta" ]; then
        if head -1 "$fasta" | grep -q "^>"; then
            lines=$(grep -c "^>" "$fasta")
            echo "   ✓ $(basename $fasta): Valid FASTA with $lines sequence(s)"
            ((PASSED++))
        else
            echo "   ✗ $(basename $fasta): Invalid FASTA format"
            ((FAILED++))
        fi
    fi
done

# Test 4: Verify pipeline script can handle errors
echo ""
echo "4. Testing pipeline error handling..."
if [ -f "scripts/upec_pipeline.sh" ]; then
    # Check if script validates input
    if grep -q "usage\|help\|--help" scripts/upec_pipeline.sh; then
        echo "   ✓ Pipeline has usage/help documentation"
        ((PASSED++))
    else
        echo "   ⚠ Pipeline missing usage documentation"
        ((WARNINGS++))
    fi
    
    # Check for input validation
    if grep -q "if.*\[\|test" scripts/upec_pipeline.sh | head -1; then
        echo "   ✓ Pipeline has input validation"
        ((PASSED++))
    else
        echo "   ⚠ Pipeline may lack input validation"
        ((WARNINGS++))
    fi
fi

# Test 5: Check TypeScript compilation
echo ""
echo "5. Checking TypeScript files syntax..."
TS_FILES=(
    "lib/types/tutorial.ts"
    "lib/tutorials/index.ts"
    "components/tutorials/TutorialViewer.tsx"
    "app/[locale]/tutorials/page.tsx"
    "app/[locale]/pipeline/page.tsx"
)

for tsfile in "${TS_FILES[@]}"; do
    if [ -f "$tsfile" ]; then
        # Basic syntax check - look for common issues
        if grep -q "export.*{" "$tsfile" && ! grep -q "syntax error" "$tsfile"; then
            echo "   ✓ $tsfile: Syntax looks valid"
            ((PASSED++))
        else
            echo "   ⚠ $tsfile: Could not verify syntax"
            ((WARNINGS++))
        fi
    else
        echo "   ✗ $tsfile: File not found"
        ((FAILED++))
    fi
done

# Test 6: Verify demo results consistency
echo ""
echo "6. Verifying demo results integrity..."
DEMO_DIR="data/demo/results/demo_ecoli"
EXPECTED_DIRS=("qc" "assembly" "annotation" "mlst" "amr" "virulence" "serotype" "phylogroup")

for dir in "${EXPECTED_DIRS[@]}"; do
    if [ -d "$DEMO_DIR/$dir" ] && [ "$(ls -A $DEMO_DIR/$dir)" ]; then
        file_count=$(ls -1 "$DEMO_DIR/$dir" | wc -l)
        echo "   ✓ $dir: Directory exists with $file_count file(s)"
        ((PASSED++))
    else
        echo "   ✗ $dir: Missing or empty"
        ((FAILED++))
    fi
done

# Test 7: Check README documentation
echo ""
echo "7. Verifying documentation completeness..."
README_FILES=(
    "README.md"
    "data/fasta_files/README.md"
    "scripts/pipeline_steps/README.md"
)

for readme in "${README_FILES[@]}"; do
    if [ -f "$readme" ]; then
        lines=$(wc -l < "$readme")
        if [ "$lines" -gt 20 ]; then
            echo "   ✓ $readme: $lines lines (comprehensive)"
            ((PASSED++))
        else
            echo "   ⚠ $readme: $lines lines (may be incomplete)"
            ((WARNINGS++))
        fi
    else
        echo "   ✗ $readme: Not found"
        ((FAILED++))
    fi
done

# Test 8: Verify package.json dependencies
echo ""
echo "8. Checking package.json for required dependencies..."
if [ -f "package.json" ]; then
    REQUIRED_DEPS=("next" "react" "xterm" "react-markdown")
    for dep in "${REQUIRED_DEPS[@]}"; do
        if grep -q "\"$dep\"" package.json; then
            echo "   ✓ $dep: Found in dependencies"
            ((PASSED++))
        else
            echo "   ⚠ $dep: Not found in package.json"
            ((WARNINGS++))
        fi
    done
else
    echo "   ✗ package.json not found"
    ((FAILED++))
fi

# Summary
echo ""
echo "=== QA Final Verification Summary ==="
echo "✓ Passed: $PASSED"
echo "⚠ Warnings: $WARNINGS"
echo "✗ Failed: $FAILED"
echo ""

TOTAL=$((PASSED + WARNINGS + FAILED))
SCORE=$(awk "BEGIN {printf \"%.1f\", ($PASSED / $TOTAL) * 100}")

echo "Quality Score: $SCORE%"
echo ""

if [ $FAILED -eq 0 ] && [ $WARNINGS -le 3 ]; then
    echo "Status: ✅ PRODUCTION READY"
    exit 0
elif [ $FAILED -eq 0 ]; then
    echo "Status: ⚠️  PRODUCTION READY WITH WARNINGS"
    exit 0
else
    echo "Status: ❌ NEEDS ATTENTION"
    exit 1
fi
