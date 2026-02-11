#!/bin/bash

###############################################################################
# Step 4: MLST Typing with Abricate v0.9.8
# 
# From Materials & Methods Section 4.3:
# "multilocus sequence typing (MLST) ... were determined using Abricate 
#  (version 0.9.8) with the appropriate databases, i.e., ... mlst"
#
# Tool: Abricate v0.9.8 with mlst database
# Purpose: Multi-locus sequence typing for E. coli
###############################################################################

set -e

# Usage information
if [ "$#" -lt 3 ]; then
    echo "Usage: $0 <assembly.fasta> <output_dir> <sample_name>"
    echo ""
    echo "Arguments:"
    echo "  assembly.fasta  Assembled genome in FASTA format"
    echo "  output_dir      Output directory for MLST results"
    echo "  sample_name     Sample identifier"
    echo ""
    echo "Example:"
    echo "  $0 results/assembly/assembly.fasta results/mlst/ ISO_001"
    echo ""
    exit 1
fi

ASSEMBLY=$1
OUTPUT_DIR=$2
SAMPLE_NAME=$3

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "═══════════════════════════════════════════════════════"
echo "Step 4: MLST Typing with Abricate v0.9.8"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Sample: $SAMPLE_NAME"
echo "Assembly: $ASSEMBLY"
echo "Output: $OUTPUT_DIR"
echo ""

# Check if required tools are installed
if ! command -v abricate &> /dev/null; then
    echo "ERROR: Abricate is not installed"
    echo ""
    echo "To install Abricate:"
    echo "  Conda: conda install -c bioconda abricate=0.9.8"
    echo "  From source: https://github.com/tseemann/abricate"
    echo ""
    exit 1
fi

if ! command -v mlst &> /dev/null; then
    echo "ERROR: mlst tool is not installed"
    echo ""
    echo "To install mlst:"
    echo "  Conda: conda install -c bioconda mlst"
    echo "  Ubuntu/Debian: sudo apt-get install mlst"
    echo ""
    exit 1
fi

# Get tool versions
ABRICATE_VERSION=$(abricate --version 2>&1 | grep -oP 'abricate \K[0-9.]+' || echo "unknown")
MLST_VERSION=$(mlst --version 2>&1 | grep -oP 'mlst \K[0-9.]+' || echo "unknown")

echo "Abricate version: $ABRICATE_VERSION"
echo "mlst version: $MLST_VERSION"
echo ""

# Check input file exists
if [ ! -f "$ASSEMBLY" ]; then
    echo "ERROR: Assembly file not found: $ASSEMBLY"
    exit 1
fi

# Run mlst
echo "Running MLST typing..."
echo ""

mlst --scheme ecoli "$ASSEMBLY" > "$OUTPUT_DIR/${SAMPLE_NAME}_mlst.tsv"

echo "✓ MLST typing completed"
echo ""

# Parse and display results
if [ -f "$OUTPUT_DIR/${SAMPLE_NAME}_mlst.tsv" ]; then
    echo "MLST Results:"
    echo "────────────────────────────────────────────────────────"
    cat "$OUTPUT_DIR/${SAMPLE_NAME}_mlst.tsv"
    echo ""
    
    # Extract ST from results
    ST=$(awk '{print $3}' "$OUTPUT_DIR/${SAMPLE_NAME}_mlst.tsv" | tail -1)
    SCHEME=$(awk '{print $2}' "$OUTPUT_DIR/${SAMPLE_NAME}_mlst.tsv" | tail -1)
    
    if [ "$ST" != "-" ] && [ "$ST" != "ST" ]; then
        echo "Sequence Type: $ST"
        echo "Scheme: $SCHEME"
        echo ""
        
        # Clinical significance based on paper findings
        case "$ST" in
            ST131)
                echo "⚠ Clinical Significance:"
                echo "  ST131 is a globally disseminated pandemic clone"
                echo "  Associated with multidrug resistance and ESBLs"
                echo "  Most common ST in the Aljohani et al. study (39.6%)"
                echo "  Typical serotype: O25:H4-fimH30"
                ;;
            ST1193)
                echo "⚠ Clinical Significance:"
                echo "  ST1193 is an emerging pandemic clone"
                echo "  Second most common in the study (12.5%)"
                echo "  FIRST REPORT in Saudi Arabia"
                echo "  Typical serotype: O75:H5-fimH64"
                ;;
            ST73)
                echo "⚠ Clinical Significance:"
                echo "  ST73 is a high-risk UPEC lineage"
                echo "  Third most common in the study (10.4%)"
                echo "  Associated with ESBLs and virulence"
                ;;
            ST10)
                echo "Clinical Significance:"
                echo "  ST10 detected (8.3% in study)"
                echo "  Belongs to phylogroup A"
                ;;
        esac
    else
        echo "WARNING: Could not determine sequence type"
    fi
    
    echo ""
    echo "Results saved to: $OUTPUT_DIR/${SAMPLE_NAME}_mlst.tsv"
    echo ""
else
    echo "ERROR: MLST output file not found"
    exit 1
fi
