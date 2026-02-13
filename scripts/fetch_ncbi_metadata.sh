#!/bin/bash

###############################################################################
# Fetch NCBI BioProject Metadata for PRJNA897916
###############################################################################

set -e

echo "Fetching metadata for BioProject PRJNA897916..."
echo ""

OUTPUT_DIR="data/ncbi_assemblies"
mkdir -p "$OUTPUT_DIR"

# Fetch BioProject information
echo "1. Fetching BioProject information..."
curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=bioproject&term=PRJNA897916" \
    > "$OUTPUT_DIR/bioproject_search.xml"

# Fetch SRA run information
echo "2. Fetching SRA run information..."
curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=sra&term=PRJNA897916" \
    > "$OUTPUT_DIR/sra_search.xml"

# Get list of SRA accessions
echo "3. Extracting SRA accession numbers..."
curl -s "https://www.ncbi.nlm.nih.gov/Traces/sdl/2/retrieve?acc=PRJNA897916&format=json" \
    > "$OUTPUT_DIR/sra_metadata.json"

echo ""
echo "✓ Metadata fetched"
echo ""
echo "Files created:"
ls -lh "$OUTPUT_DIR"/*.xml "$OUTPUT_DIR"/*.json 2>/dev/null || echo "No files created"
echo ""

# Try to extract SRA IDs from JSON
if [ -f "$OUTPUT_DIR/sra_metadata.json" ]; then
    echo "SRA Accessions found:"
    grep -oP '"acc":"SRR\d+"' "$OUTPUT_DIR/sra_metadata.json" | cut -d'"' -f4 | head -10
    echo "..."
    echo ""
fi

echo "To download assemblies, you need:"
echo "  1. NCBI Datasets CLI: conda install -c conda-forge ncbi-datasets-cli"
echo "  2. Or SRA Toolkit: conda install -c bioconda sra-tools"
echo ""
