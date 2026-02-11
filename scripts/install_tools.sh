#!/bin/bash

###############################################################################
# BioNXA UPEC Pipeline - Installation Script
# 
# This script installs all required bioinformatics tools for the pipeline
# based on the exact methodology from Aljohani et al., Int J Mol Sci. 2023
###############################################################################

set -e

echo "═══════════════════════════════════════════════════════════════"
echo "BioNXA UPEC Pipeline - Tool Installation"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Check if conda is installed
if ! command -v conda &> /dev/null; then
    echo "ERROR: Conda is not installed"
    echo ""
    echo "Please install Miniconda or Anaconda first:"
    echo "  https://docs.conda.io/en/latest/miniconda.html"
    echo ""
    exit 1
fi

echo "Found conda: $(which conda)"
echo "Conda version: $(conda --version)"
echo ""

# Create conda environment
ENV_NAME="bionxa_upec"

echo "Creating conda environment: $ENV_NAME"
echo ""

# Check if environment already exists
if conda env list | grep -q "^$ENV_NAME "; then
    echo "Environment '$ENV_NAME' already exists."
    read -p "Do you want to remove and recreate it? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        conda env remove -n $ENV_NAME -y
    else
        echo "Skipping environment creation."
        echo ""
        echo "To activate existing environment:"
        echo "  conda activate $ENV_NAME"
        exit 0
    fi
fi

# Create environment and install tools
echo "Installing bioinformatics tools..."
echo "This may take 10-15 minutes..."
echo ""

conda create -n $ENV_NAME -y \
    -c bioconda \
    -c conda-forge \
    fastqc=0.11.8 \
    unicycler=0.4.8 \
    prokka=1.14.6 \
    abricate=0.9.8 \
    mlst \
    snippy=3.1 \
    seqkit \
    python=3.8

echo ""
echo "✓ Tools installed successfully!"
echo ""

# Activate environment and update Abricate databases
echo "Updating Abricate databases..."
eval "$(conda shell.bash hook)"
conda activate $ENV_NAME

abricate --setupdb

echo ""
echo "✓ Abricate databases updated"
echo ""

# Print installation summary
echo "═══════════════════════════════════════════════════════════════"
echo "INSTALLATION COMPLETE"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "Installed tools:"
echo "  ✓ FastQC v0.11.8"
echo "  ✓ Unicycler v0.4.8"
echo "  ✓ Prokka v1.14.6"
echo "  ✓ Abricate v0.9.8 (with NCBI, VFDB, mlst databases)"
echo "  ✓ mlst"
echo "  ✓ Snippy v3.1"
echo "  ✓ SeqKit (helper tool)"
echo ""
echo "To activate the environment:"
echo "  conda activate $ENV_NAME"
echo ""
echo "To test the installation:"
echo "  conda activate $ENV_NAME"
echo "  fastqc --version"
echo "  unicycler --version"
echo "  prokka --version"
echo "  abricate --version"
echo "  mlst --version"
echo ""
echo "Next steps:"
echo "  1. Activate environment: conda activate $ENV_NAME"
echo "  2. Run pipeline: ./scripts/upec_pipeline.sh --demo"
echo ""
echo "═══════════════════════════════════════════════════════════════"
