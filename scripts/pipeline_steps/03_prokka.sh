#!/bin/bash

###############################################################################
# Step 3: Genome Annotation with Prokka v1.14.6
# 
# From Materials & Methods Section 4.3:
# "annotated using Prokka (version 1.14.6) with default parameters"
#
# Tool: Prokka v1.14.6
# Purpose: Rapid prokaryotic genome annotation
# Parameters: Default
###############################################################################

set -e

# Usage information
if [ "$#" -lt 3 ]; then
    echo "Usage: $0 <assembly.fasta> <output_dir> <sample_name>"
    echo ""
    echo "Arguments:"
    echo "  assembly.fasta  Assembled genome in FASTA format"
    echo "  output_dir      Output directory for annotation"
    echo "  sample_name     Sample identifier (used for file naming)"
    echo ""
    echo "Example:"
    echo "  $0 results/assembly/assembly.fasta results/annotation/ ISO_001"
    echo ""
    exit 1
fi

ASSEMBLY=$1
OUTPUT_DIR=$2
SAMPLE_NAME=$3

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "═══════════════════════════════════════════════════════"
echo "Step 3: Genome Annotation with Prokka v1.14.6"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Sample: $SAMPLE_NAME"
echo "Assembly: $ASSEMBLY"
echo "Output: $OUTPUT_DIR"
echo ""

# Check if Prokka is installed
if ! command -v prokka &> /dev/null; then
    echo "ERROR: Prokka is not installed"
    echo ""
    echo "To install Prokka:"
    echo "  Conda: conda install -c bioconda prokka=1.14.6"
    echo "  Ubuntu/Debian: sudo apt-get install prokka"
    echo ""
    exit 1
fi

# Get Prokka version
PROKKA_VERSION=$(prokka --version 2>&1 | grep -oP 'prokka \K[0-9.]+' || echo "unknown")
echo "Prokka version: $PROKKA_VERSION"
echo ""

# Check input file exists
if [ ! -f "$ASSEMBLY" ]; then
    echo "ERROR: Assembly file not found: $ASSEMBLY"
    exit 1
fi

# Run Prokka with default parameters (as per paper)
# Paper states: "annotated using Prokka (version 1.14.6) with default parameters"
echo "Running Prokka annotation..."
echo ""

prokka \
    --outdir "$OUTPUT_DIR/${SAMPLE_NAME}_prokka" \
    --prefix "$SAMPLE_NAME" \
    --genus Escherichia \
    --species "coli" \
    --strain "$SAMPLE_NAME" \
    --kingdom Bacteria \
    --force \
    "$ASSEMBLY"

echo ""
echo "✓ Annotation completed"
echo ""

# Check if annotation was successful
GBK_FILE="$OUTPUT_DIR/${SAMPLE_NAME}_prokka/${SAMPLE_NAME}.gbk"
GFF_FILE="$OUTPUT_DIR/${SAMPLE_NAME}_prokka/${SAMPLE_NAME}.gff"

if [ -f "$GBK_FILE" ]; then
    echo "Annotation Statistics:"
    echo "────────────────────────────────────────────────────────"
    
    # Parse annotation statistics from the .txt file
    TXT_FILE="$OUTPUT_DIR/${SAMPLE_NAME}_prokka/${SAMPLE_NAME}.txt"
    if [ -f "$TXT_FILE" ]; then
        cat "$TXT_FILE"
    fi
    
    echo ""
    echo "Output files:"
    echo "  GenBank: $GBK_FILE"
    echo "  GFF: $GFF_FILE"
    echo "  Protein FASTA: $OUTPUT_DIR/${SAMPLE_NAME}_prokka/${SAMPLE_NAME}.faa"
    echo "  Nucleotide FASTA: $OUTPUT_DIR/${SAMPLE_NAME}_prokka/${SAMPLE_NAME}.ffn"
    echo "  Log: $OUTPUT_DIR/${SAMPLE_NAME}_prokka/${SAMPLE_NAME}.log"
    echo ""
else
    echo "ERROR: Annotation files not found. Annotation may have failed."
    exit 1
fi
