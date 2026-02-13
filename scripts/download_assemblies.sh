#!/bin/bash

###############################################################################
# Download Assembled Genomes from NCBI for PRJNA897916
###############################################################################

set -e

echo "═══════════════════════════════════════════════════════"
echo "Downloading NCBI Assembled Genomes - PRJNA897916"
echo "═══════════════════════════════════════════════════════"
echo ""

OUTPUT_DIR="data/ncbi_assemblies/genomes"
mkdir -p "$OUTPUT_DIR"

# First, let's try to find assembly accessions linked to this BioProject
echo "Step 1: Searching for assemblies linked to PRJNA897916..."
echo ""

# Search for assemblies
curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=assembly&term=PRJNA897916&retmax=100&retmode=json" \
    > "$OUTPUT_DIR/assembly_search.json"

# Check if we found any assemblies
ASSEMBLY_COUNT=$(grep -o '"count":"[0-9]*"' "$OUTPUT_DIR/assembly_search.json" | grep -o '[0-9]*')
echo "Found $ASSEMBLY_COUNT assemblies"
echo ""

if [ "$ASSEMBLY_COUNT" -eq 0 ]; then
    echo "⚠️  No assembled genomes found in NCBI Assembly database"
    echo ""
    echo "This BioProject contains RAW READS only (SRA data)."
    echo "Assemblies must be generated from raw FASTQ files."
    echo ""
    echo "To get the data, you need to:"
    echo "1. Download raw reads using SRA Toolkit"
    echo "2. Assemble them using our pipeline"
    echo ""
    echo "See: data/ncbi_assemblies/README.md for instructions"
    exit 1
fi

# Extract assembly IDs
grep -o '"idlist":\[[^]]*\]' "$OUTPUT_DIR/assembly_search.json" | \
    grep -o '[0-9]\+' > "$OUTPUT_DIR/assembly_ids.txt"

echo "Assembly IDs found:"
head -5 "$OUTPUT_DIR/assembly_ids.txt"
echo "..."
echo ""

# Download assembly summaries
echo "Step 2: Fetching assembly metadata..."
ASSEMBLY_IDS=$(cat "$OUTPUT_DIR/assembly_ids.txt" | tr '\n' ',' | sed 's/,$//')

curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=assembly&id=$ASSEMBLY_IDS&retmode=json" \
    > "$OUTPUT_DIR/assembly_summaries.json"

echo "✓ Metadata downloaded"
echo ""

# Extract FTP paths (this is complex, will use a simpler approach)
echo "Step 3: Downloading first 3 assemblies..."
echo ""

# For demonstration, let's try to download using the assembly accessions
# This requires parsing the JSON which is complex in bash
echo "Note: Assembly download requires complex JSON parsing"
echo "Attempting simplified download..."
echo ""

