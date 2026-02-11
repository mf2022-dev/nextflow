#!/bin/bash

###############################################################################
# Step 1: Quality Control with FastQC v0.11.8
# 
# From Materials & Methods Section 4.3:
# "The generated sequence reads were first assessed using the FastQC tool (v.0.11.8)"
#
# Tool: FastQC v0.11.8
# Purpose: Quality assessment of raw sequencing reads
###############################################################################

set -e

# Usage information
if [ "$#" -lt 2 ]; then
    echo "Usage: $0 <input_fastq_dir> <output_dir>"
    echo ""
    echo "Arguments:"
    echo "  input_fastq_dir   Directory containing FASTQ files (or single FASTQ file)"
    echo "  output_dir        Output directory for FastQC reports"
    echo ""
    echo "Example:"
    echo "  $0 data/fastq/ results/qc/"
    echo ""
    exit 1
fi

INPUT_DIR=$1
OUTPUT_DIR=$2

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "═══════════════════════════════════════════════════════"
echo "Step 1: Quality Control with FastQC v0.11.8"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Input: $INPUT_DIR"
echo "Output: $OUTPUT_DIR"
echo ""

# Check if FastQC is installed
if ! command -v fastqc &> /dev/null; then
    echo "ERROR: FastQC is not installed"
    echo ""
    echo "To install FastQC:"
    echo "  Ubuntu/Debian: sudo apt-get install fastqc"
    echo "  macOS: brew install fastqc"
    echo "  Conda: conda install -c bioconda fastqc=0.11.8"
    echo ""
    exit 1
fi

# Get FastQC version
FASTQC_VERSION=$(fastqc --version | grep -oP 'FastQC v\K[0-9.]+' || echo "unknown")
echo "FastQC version: $FASTQC_VERSION"
echo ""

# Check if input is a directory or single file
if [ -d "$INPUT_DIR" ]; then
    # Directory - process all FASTQ files
    FASTQ_FILES=$(find "$INPUT_DIR" -name "*.fastq" -o -name "*.fastq.gz" -o -name "*.fq" -o -name "*.fq.gz")
    
    if [ -z "$FASTQ_FILES" ]; then
        echo "ERROR: No FASTQ files found in $INPUT_DIR"
        exit 1
    fi
    
    echo "Found FASTQ files:"
    echo "$FASTQ_FILES"
    echo ""
    
    # Run FastQC on all files
    echo "Running FastQC..."
    fastqc -o "$OUTPUT_DIR" -t 4 $FASTQ_FILES
    
elif [ -f "$INPUT_DIR" ]; then
    # Single file
    echo "Processing single file: $INPUT_DIR"
    fastqc -o "$OUTPUT_DIR" -t 4 "$INPUT_DIR"
else
    echo "ERROR: Input path does not exist: $INPUT_DIR"
    exit 1
fi

echo ""
echo "✓ FastQC analysis completed"
echo ""
echo "Quality reports saved to: $OUTPUT_DIR"
echo ""
echo "View HTML reports:"
echo "  firefox $OUTPUT_DIR/*.html"
echo "  # or"
echo "  open $OUTPUT_DIR/*.html"
echo ""
