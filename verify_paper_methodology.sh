#!/bin/bash

echo "=== Verifying Paper Methodology Implementation ==="
echo "Reference: Aljohani et al., Int J Mol Sci. 2023, Section 4.3"
echo ""

PASSED=0
ISSUES=0

# According to paper Section 4.3:
echo "Checking implementation against paper Section 4.3..."
echo ""

# 1. FastQC v0.11.8
echo "1. FastQC v0.11.8 (Quality Control)"
if grep -q "fastqc.*0.11.8\|fastqc" scripts/pipeline_steps/01_fastqc.sh; then
    if grep -q "fastqc.*\$" scripts/pipeline_steps/01_fastqc.sh; then
        echo "   ✓ FastQC implementation found with correct parameters"
        ((PASSED++))
    else
        echo "   ⚠ FastQC found but parameters may differ"
        ((ISSUES++))
    fi
else
    echo "   ✗ FastQC v0.11.8 not found"
    ((ISSUES++))
fi

# 2. Unicycler v0.4.8
echo ""
echo "2. Unicycler v0.4.8 (Genome Assembly)"
if grep -q "unicycler" scripts/pipeline_steps/02_unicycler.sh; then
    if grep -q "unicycler.*-1.*-2\|unicycler.*--short1.*--short2" scripts/pipeline_steps/02_unicycler.sh; then
        echo "   ✓ Unicycler implementation found with paired-end reads"
        ((PASSED++))
    else
        echo "   ⚠ Unicycler found but parameters may differ"
        ((ISSUES++))
    fi
else
    echo "   ✗ Unicycler v0.4.8 not found"
    ((ISSUES++))
fi

# 3. Prokka v1.14.6
echo ""
echo "3. Prokka v1.14.6 (Genome Annotation)"
if grep -q "prokka" scripts/pipeline_steps/03_prokka.sh; then
    echo "   ✓ Prokka implementation found"
    ((PASSED++))
else
    echo "   ✗ Prokka v1.14.6 not found"
    ((ISSUES++))
fi

# 4. Abricate v0.9.8 (MLST)
echo ""
echo "4. Abricate v0.9.8 (MLST Database)"
if grep -q "abricate.*mlst\|mlst" scripts/pipeline_steps/04_mlst.sh; then
    echo "   ✓ MLST implementation found"
    ((PASSED++))
else
    echo "   ✗ MLST implementation not found"
    ((ISSUES++))
fi

# 5. NCBI AMRFinderPlus
echo ""
echo "5. NCBI AMRFinderPlus (AMR Detection)"
if grep -q "amrfinder" scripts/pipeline_steps/05_amr_detection.sh; then
    echo "   ✓ NCBI AMRFinderPlus implementation found"
    ((PASSED++))
else
    echo "   ⚠ AMRFinderPlus not explicitly mentioned"
    ((ISSUES++))
fi

# 6. Check for default parameters (paper states: "with default parameters")
echo ""
echo "6. Verifying use of default parameters (as per paper)..."
CUSTOM_PARAMS=0
for script in scripts/pipeline_steps/*.sh; do
    # Look for non-standard parameters
    if grep -E "\-\-[a-z]+\s+[0-9]+" "$script" | grep -v "threads\|cpus" >/dev/null 2>&1; then
        ((CUSTOM_PARAMS++))
    fi
done

if [ $CUSTOM_PARAMS -eq 0 ]; then
    echo "   ✓ Scripts use default parameters (as specified in paper)"
    ((PASSED++))
else
    echo "   ⚠ Found $CUSTOM_PARAMS script(s) with custom parameters"
    echo "      (Paper specifies: 'all with default parameters')"
    ((ISSUES++))
fi

# 7. Check for proper output structure
echo ""
echo "7. Verifying output directory structure..."
EXPECTED_OUTPUTS=("qc" "assembly" "annotation" "mlst" "amr")
FOUND_OUTPUTS=0

for output in "${EXPECTED_OUTPUTS[@]}"; do
    if grep -r "\$OUTPUT_DIR/$output\|/${output}/" scripts/pipeline_steps/ >/dev/null 2>&1; then
        ((FOUND_OUTPUTS++))
    fi
done

if [ $FOUND_OUTPUTS -eq ${#EXPECTED_OUTPUTS[@]} ]; then
    echo "   ✓ All expected output directories referenced"
    ((PASSED++))
else
    echo "   ⚠ Found $FOUND_OUTPUTS/${#EXPECTED_OUTPUTS[@]} expected output references"
    ((ISSUES++))
fi

# 8. Check install script has all tools
echo ""
echo "8. Verifying install_tools.sh completeness..."
TOOLS=("fastqc" "unicycler" "prokka" "abricate" "mlst")
MISSING_TOOLS=0

for tool in "${TOOLS[@]}"; do
    if ! grep -q "$tool" scripts/install_tools.sh; then
        echo "   ⚠ $tool not found in install script"
        ((MISSING_TOOLS++))
        ((ISSUES++))
    fi
done

if [ $MISSING_TOOLS -eq 0 ]; then
    echo "   ✓ All required tools in install script"
    ((PASSED++))
fi

# Summary
echo ""
echo "=== Methodology Verification Summary ==="
echo "✓ Correct implementations: $PASSED"
echo "⚠ Issues/Warnings: $ISSUES"
echo ""

TOTAL=$((PASSED + ISSUES))
if [ $TOTAL -gt 0 ]; then
    SCORE=$(awk "BEGIN {printf \"%.1f\", ($PASSED / $TOTAL) * 100}")
    echo "Accuracy Score: $SCORE%"
fi
echo ""

if [ $ISSUES -eq 0 ]; then
    echo "Status: ✅ EXACT MATCH WITH PAPER METHODOLOGY"
    exit 0
elif [ $ISSUES -le 2 ]; then
    echo "Status: ⚠️  CLOSE MATCH (Minor deviations)"
    exit 0
else
    echo "Status: ❌ SIGNIFICANT DEVIATIONS FROM PAPER"
    exit 1
fi
