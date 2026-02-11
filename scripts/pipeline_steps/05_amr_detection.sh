#!/bin/bash

###############################################################################
# Step 5: AMR Gene Detection with Abricate v0.9.8 + NCBI AMRFinderPlus & PointFinder
# 
# From Materials & Methods Section 4.3:
# "The presence of resistance genes ... were determined using Abricate 
#  (version 0.9.8) with the appropriate databases, i.e., NCBI AMRFinderPlus"
# "Chromosomal mutations defining quinolone resistance were analysed using PointFinder"
#
# Tools: Abricate v0.9.8 + NCBI AMRFinderPlus database, PointFinder
# Purpose: Detection of antimicrobial resistance genes and QRDR mutations
###############################################################################

set -e

# Usage information
if [ "$#" -lt 3 ]; then
    echo "Usage: $0 <assembly.fasta> <output_dir> <sample_name>"
    echo ""
    echo "Arguments:"
    echo "  assembly.fasta  Assembled genome in FASTA format"
    echo "  output_dir      Output directory for AMR results"
    echo "  sample_name     Sample identifier"
    echo ""
    echo "Example:"
    echo "  $0 results/assembly/assembly.fasta results/amr/ ISO_001"
    echo ""
    exit 1
fi

ASSEMBLY=$1
OUTPUT_DIR=$2
SAMPLE_NAME=$3

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "═══════════════════════════════════════════════════════"
echo "Step 5: AMR Gene Detection"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Sample: $SAMPLE_NAME"
echo "Assembly: $ASSEMBLY"
echo "Output: $OUTPUT_DIR"
echo ""

# Check if Abricate is installed
if ! command -v abricate &> /dev/null; then
    echo "ERROR: Abricate is not installed"
    echo ""
    echo "To install Abricate:"
    echo "  Conda: conda install -c bioconda abricate=0.9.8"
    echo ""
    exit 1
fi

# Get Abricate version
ABRICATE_VERSION=$(abricate --version 2>&1 | grep -oP 'abricate \K[0-9.]+' || echo "unknown")
echo "Abricate version: $ABRICATE_VERSION"
echo ""

# Check input file exists
if [ ! -f "$ASSEMBLY" ]; then
    echo "ERROR: Assembly file not found: $ASSEMBLY"
    exit 1
fi

# List available databases
echo "Available Abricate databases:"
abricate --list
echo ""

# Run Abricate with NCBI AMRFinderPlus database (as per paper)
echo "Running AMR gene detection with NCBI AMRFinderPlus database..."
echo ""

abricate --db ncbi "$ASSEMBLY" > "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv"

echo "✓ AMR gene detection completed"
echo ""

# Parse and display results
if [ -f "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv" ]; then
    # Count number of resistance genes found (excluding header)
    NUM_GENES=$(grep -v "^#" "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv" | wc -l)
    
    echo "AMR Gene Detection Results:"
    echo "────────────────────────────────────────────────────────"
    echo "Number of resistance genes detected: $NUM_GENES"
    echo ""
    
    if [ "$NUM_GENES" -gt 0 ]; then
        echo "Top resistance genes found:"
        echo ""
        # Display summary table
        echo -e "GENE\tCOVERAGE\tIDENTITY\tRESISTANCE"
        grep -v "^#" "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv" | \
            awk -F'\t' '{print $6"\t"$10"%\t"$11"%\t"$15}' | \
            head -20
        echo ""
        
        # Check for ESBL genes (as per paper findings)
        if grep -q "CTX-M" "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv"; then
            echo "⚠ ESBL GENES DETECTED:"
            grep "CTX-M" "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv" | \
                awk -F'\t' '{print "  - "$6" (Identity: "$11"%, Coverage: "$10"%)"}'
            echo ""
            
            # Check for specific CTX-M variants mentioned in paper
            if grep -q "CTX-M-15" "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv"; then
                echo "  blaCTX-M-15 detected (most common in study - 79.2%)"
            fi
            if grep -q "CTX-M-27" "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv"; then
                echo "  blaCTX-M-27 detected (second most common - 12.5%)"
            fi
            if grep -q "CTX-M-8" "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv"; then
                echo "  blaCTX-M-8 detected (rare - 2.1%)"
            fi
            echo ""
        fi
        
        # Check for other resistance classes
        if grep -qi "aminoglycoside" "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv"; then
            echo "• Aminoglycoside resistance detected"
        fi
        if grep -qi "fluoroquinolone\|quinolone" "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv"; then
            echo "• Quinolone resistance genes detected"
        fi
        if grep -qi "tetracycline\|tet(" "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv"; then
            echo "• Tetracycline resistance detected"
        fi
        if grep -qi "sulfonamide\|sul" "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv"; then
            echo "• Sulfonamide resistance detected"
        fi
        if grep -qi "trimethoprim\|dfr" "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv"; then
            echo "• Trimethoprim resistance detected"
        fi
        echo ""
    else
        echo "No AMR genes detected with NCBI AMRFinderPlus"
        echo ""
    fi
    
    echo "Full results saved to: $OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv"
    echo ""
    
    # Create a summary report
    cat > "$OUTPUT_DIR/${SAMPLE_NAME}_amr_summary.txt" << EOF
═══════════════════════════════════════════════════════════════
AMR GENE DETECTION SUMMARY
═══════════════════════════════════════════════════════════════

Sample: $SAMPLE_NAME
Analysis Date: $(date)
Database: NCBI AMRFinderPlus (via Abricate v$ABRICATE_VERSION)

Total resistance genes detected: $NUM_GENES

INTERPRETATION:
$(if [ "$NUM_GENES" -gt 0 ]; then
    echo "This isolate carries antimicrobial resistance genes."
    if grep -q "CTX-M" "$OUTPUT_DIR/${SAMPLE_NAME}_amr_ncbi.tsv"; then
        echo "ESBL genes detected - Extended-spectrum β-lactamase producer"
    fi
    echo ""
    echo "Detailed results in: ${SAMPLE_NAME}_amr_ncbi.tsv"
else
    echo "No resistance genes detected."
fi)

REFERENCE:
Aljohani et al., Int J Mol Sci. 2023;24(8):7582
Study findings:
- 79.2% carried blaCTX-M-15
- 12.5% carried blaCTX-M-27
- 77.1% were fluoroquinolone resistant

═══════════════════════════════════════════════════════════════
EOF
    
    echo "Summary report created: $OUTPUT_DIR/${SAMPLE_NAME}_amr_summary.txt"
    echo ""
    
else
    echo "ERROR: AMR output file not found"
    exit 1
fi

# Note about PointFinder (would require additional setup)
echo "────────────────────────────────────────────────────────"
echo "Note: QRDR mutation analysis (PointFinder)"
echo ""
echo "To analyze chromosomal quinolone resistance mutations:"
echo "  PointFinder from CGE: http://genomicepidemiology.org/services/"
echo "  Or: conda install -c bioconda pointfinder"
echo ""
echo "Common QRDR mutations in the study:"
echo "  - gyrA S83L (79.2%)"
echo "  - gyrA D87N (62.5%)"
echo "  - parC S80I (68.8%)"
echo "  - parE I529L (ST131-associated)"
echo "  - parE L416F (ST1193-associated)"
echo "────────────────────────────────────────────────────────"
echo ""
