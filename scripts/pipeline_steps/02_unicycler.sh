#!/bin/bash

###############################################################################
# Step 2: Genome Assembly with Unicycler v0.4.8
# 
# From Materials & Methods Section 4.3:
# "assembled using Unicycler (version 0.4.8) with default parameters"
#
# Tool: Unicycler v0.4.8
# Purpose: De novo assembly of bacterial genomes from Illumina paired-end reads
# Parameters: Default
###############################################################################

set -e

# Usage information
if [ "$#" -lt 4 ]; then
    echo "Usage: $0 <read1.fastq> <read2.fastq> <output_dir> <sample_name>"
    echo ""
    echo "Arguments:"
    echo "  read1.fastq    Forward reads (R1)"
    echo "  read2.fastq    Reverse reads (R2)"
    echo "  output_dir     Output directory for assembly"
    echo "  sample_name    Sample identifier"
    echo ""
    echo "Example:"
    echo "  $0 sample_R1.fastq.gz sample_R2.fastq.gz results/assembly/ ISO_001"
    echo ""
    exit 1
fi

READ1=$1
READ2=$2
OUTPUT_DIR=$3
SAMPLE_NAME=$4

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "═══════════════════════════════════════════════════════"
echo "Step 2: Genome Assembly with Unicycler v0.4.8"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Sample: $SAMPLE_NAME"
echo "Read 1: $READ1"
echo "Read 2: $READ2"
echo "Output: $OUTPUT_DIR"
echo ""

# Check if Unicycler is installed
if ! command -v unicycler &> /dev/null; then
    echo "ERROR: Unicycler is not installed"
    echo ""
    echo "To install Unicycler:"
    echo "  Conda: conda install -c bioconda unicycler=0.4.8"
    echo "  From source: https://github.com/rrwick/Unicycler"
    echo ""
    exit 1
fi

# Get Unicycler version
UNICYCLER_VERSION=$(unicycler --version 2>&1 | grep -oP 'Unicycler v\K[0-9.]+' || echo "unknown")
echo "Unicycler version: $UNICYCLER_VERSION"
echo ""

# Check input files exist
if [ ! -f "$READ1" ]; then
    echo "ERROR: Read 1 file not found: $READ1"
    exit 1
fi

if [ ! -f "$READ2" ]; then
    echo "ERROR: Read 2 file not found: $READ2"
    exit 1
fi

# Run Unicycler with default parameters (as per paper)
echo "Running Unicycler assembly..."
echo ""

unicycler \
    -1 "$READ1" \
    -2 "$READ2" \
    -o "$OUTPUT_DIR/${SAMPLE_NAME}_assembly" \
    -t 4 \
    --verbosity 2

echo ""
echo "✓ Assembly completed"
echo ""

# Check if assembly was successful
ASSEMBLY_FILE="$OUTPUT_DIR/${SAMPLE_NAME}_assembly/assembly.fasta"

if [ -f "$ASSEMBLY_FILE" ]; then
    # Get assembly statistics
    echo "Assembly Statistics:"
    echo "────────────────────────────────────────────────────────"
    
    # Count contigs
    NUM_CONTIGS=$(grep -c "^>" "$ASSEMBLY_FILE")
    echo "Number of contigs: $NUM_CONTIGS"
    
    # Calculate total assembly size
    TOTAL_SIZE=$(grep -v "^>" "$ASSEMBLY_FILE" | tr -d '\n' | wc -c)
    echo "Total assembly size: $TOTAL_SIZE bp"
    
    # Get largest contig
    if command -v seqkit &> /dev/null; then
        LARGEST=$(seqkit stats "$ASSEMBLY_FILE" 2>/dev/null | tail -1 | awk '{print $7}')
        echo "Largest contig: $LARGEST bp"
    fi
    
    echo ""
    echo "Assembly file: $ASSEMBLY_FILE"
    echo "Assembly graph: $OUTPUT_DIR/${SAMPLE_NAME}_assembly/assembly.gfa"
    echo "Unicycler log: $OUTPUT_DIR/${SAMPLE_NAME}_assembly/unicycler.log"
    echo ""
else
    echo "ERROR: Assembly file not found. Assembly may have failed."
    exit 1
fi
