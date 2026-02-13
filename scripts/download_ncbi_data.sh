#!/bin/bash

###############################################################################
# Download Real UPEC Assemblies from NCBI BioProject PRJNA897916
#
# Reference: Aljohani et al., Int J Mol Sci. 2023
# BioProject: PRJNA897916
# SRA Accessions: SRR22179269-SRR22179316 (48 isolates)
###############################################################################

set -e

echo "═══════════════════════════════════════════════════════"
echo "NCBI Data Download - UPEC Genomic Study"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Reference: Aljohani et al., Int J Mol Sci. 2023"
echo "BioProject: PRJNA897916"
echo "SRA Accessions: SRR22179269-SRR22179316"
echo ""

# Create output directory
OUTPUT_DIR="data/ncbi_assemblies"
mkdir -p "$OUTPUT_DIR"

echo "Output directory: $OUTPUT_DIR"
echo ""

# Check if SRA Toolkit is installed
if ! command -v prefetch &> /dev/null && ! command -v fasterq-dump &> /dev/null; then
    echo "⚠️  SRA Toolkit not installed"
    echo ""
    echo "To install SRA Toolkit:"
    echo "  Conda: conda install -c bioconda sra-tools"
    echo "  Ubuntu: sudo apt-get install sra-toolkit"
    echo "  macOS: brew install sra-tools"
    echo ""
    echo "After installation, configure SRA Toolkit:"
    echo "  vdb-config --interactive"
    echo ""
    exit 1
fi

echo "✓ SRA Toolkit found"
echo ""

# Check if datasets tool is available (for direct assembly download)
if command -v datasets &> /dev/null; then
    echo "✓ NCBI Datasets tool found"
    echo ""
    echo "Downloading assemblies from BioProject PRJNA897916..."
    echo ""
    
    # Download all assemblies from the BioProject
    datasets download genome accession --inputfile <(echo "PRJNA897916") \
        --include genome,gff3,protein,cds,rna \
        --filename "$OUTPUT_DIR/prjna897916_assemblies.zip"
    
    if [ -f "$OUTPUT_DIR/prjna897916_assemblies.zip" ]; then
        echo "✓ Downloaded assemblies"
        echo ""
        echo "Extracting..."
        cd "$OUTPUT_DIR"
        unzip -q prjna897916_assemblies.zip
        cd -
        echo "✓ Extraction complete"
    fi
else
    echo "⚠️  NCBI Datasets tool not found"
    echo ""
    echo "Option 1: Install NCBI Datasets"
    echo "  Conda: conda install -c conda-forge ncbi-datasets-cli"
    echo "  Direct: https://www.ncbi.nlm.nih.gov/datasets/docs/v2/download-and-install/"
    echo ""
    echo "Option 2: Download SRA reads and assemble locally"
    echo ""
    
    # Alternative: Download raw reads from SRA
    echo "Attempting to download raw reads from SRA..."
    echo ""
    
    # Sample SRA accessions (first 3 for testing)
    SRA_IDS=("SRR22179269" "SRR22179270" "SRR22179271")
    
    for SRA_ID in "${SRA_IDS[@]}"; do
        echo "Downloading $SRA_ID..."
        
        # Prefetch the data
        prefetch "$SRA_ID" -O "$OUTPUT_DIR"
        
        # Convert to FASTQ
        if [ -d "$OUTPUT_DIR/$SRA_ID" ]; then
            echo "Converting $SRA_ID to FASTQ..."
            fasterq-dump "$OUTPUT_DIR/$SRA_ID/$SRA_ID.sra" \
                -O "$OUTPUT_DIR" \
                -e 4 \
                --split-files
            
            echo "✓ $SRA_ID downloaded and converted"
            echo ""
        fi
    done
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "Download Summary"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "Output directory: $OUTPUT_DIR"
echo ""

# List downloaded files
if [ -d "$OUTPUT_DIR" ]; then
    FILE_COUNT=$(find "$OUTPUT_DIR" -type f | wc -l)
    echo "Files downloaded: $FILE_COUNT"
    echo ""
    
    if [ $FILE_COUNT -gt 0 ]; then
        echo "Downloaded files:"
        ls -lh "$OUTPUT_DIR" | head -20
        echo ""
        
        echo "✓ Download complete!"
        echo ""
        echo "Next steps:"
        echo "1. If you downloaded FASTQ files, run the assembly pipeline:"
        echo "   ./scripts/pipeline_steps/02_unicycler.sh <R1.fastq> <R2.fastq> <output> <sample>"
        echo ""
        echo "2. If you downloaded assemblies, run annotation:"
        echo "   ./scripts/pipeline_steps/03_prokka.sh <assembly.fasta> <output> <sample>"
        echo ""
    else
        echo "⚠️  No files downloaded"
        echo ""
        echo "Please install required tools and try again."
    fi
else
    echo "⚠️  Output directory not created"
fi

echo ""
echo "For more information:"
echo "  BioProject: https://www.ncbi.nlm.nih.gov/bioproject/PRJNA897916"
echo "  Paper: https://doi.org/10.3390/ijms24087582"
echo ""
