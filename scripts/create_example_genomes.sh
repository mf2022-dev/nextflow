#!/bin/bash

###############################################################################
# Create Example E. coli Genomes Based on Reference Sequences
# Using actual E. coli reference genomes from NCBI
###############################################################################

set -e

echo "═══════════════════════════════════════════════════════"
echo "Downloading Reference E. coli Genomes"
echo "═══════════════════════════════════════════════════════"
echo ""

OUTPUT_DIR="data/reference_genomes"
mkdir -p "$OUTPUT_DIR"

echo "These are REFERENCE genomes that represent the sequence types"
echo "found in the UPEC study (ST131, ST1193, ST73)"
echo ""

# Download E. coli ST131 reference (EC958 strain)
echo "1. Downloading E. coli ST131 reference (strain EC958)..."
echo "   - Pandemic clone O25b:H4-ST131"
echo "   - GenBank: HG941718.1"
curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=HG941718.1&rettype=fasta&retmode=text" \
    > "$OUTPUT_DIR/EC958_ST131_reference.fasta"

if [ -s "$OUTPUT_DIR/EC958_ST131_reference.fasta" ]; then
    SIZE=$(wc -c < "$OUTPUT_DIR/EC958_ST131_reference.fasta")
    echo "   ✓ Downloaded: $SIZE bytes"
else
    echo "   ✗ Download failed"
fi
echo ""

# Download E. coli CFT073 (common UPEC reference)
echo "2. Downloading E. coli CFT073 reference (UPEC strain)..."
echo "   - Classic UPEC strain"
echo "   - GenBank: AE014075.1"
curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=AE014075.1&rettype=fasta&retmode=text" \
    > "$OUTPUT_DIR/CFT073_UPEC_reference.fasta"

if [ -s "$OUTPUT_DIR/CFT073_UPEC_reference.fasta" ]; then
    SIZE=$(wc -c < "$OUTPUT_DIR/CFT073_UPEC_reference.fasta")
    echo "   ✓ Downloaded: $SIZE bytes"
else
    echo "   ✗ Download failed"
fi
echo ""

# Download E. coli UTI89 (another UPEC strain)
echo "3. Downloading E. coli UTI89 reference (UPEC strain)..."
echo "   - ST95 UPEC strain"
echo "   - GenBank: CP000243.1"
curl -s "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=CP000243.1&rettype=fasta&retmode=text" \
    > "$OUTPUT_DIR/UTI89_UPEC_reference.fasta"

if [ -s "$OUTPUT_DIR/UTI89_UPEC_reference.fasta" ]; then
    SIZE=$(wc -c < "$OUTPUT_DIR/UTI89_UPEC_reference.fasta")
    echo "   ✓ Downloaded: $SIZE bytes"
else
    echo "   ✗ Download failed"
fi
echo ""

echo "═══════════════════════════════════════════════════════"
echo "Download Summary"
echo "═══════════════════════════════════════════════════════"
echo ""

# Count successful downloads
SUCCESS=0
for file in "$OUTPUT_DIR"/*.fasta; do
    if [ -s "$file" ]; then
        ((SUCCESS++))
        FILENAME=$(basename "$file")
        SIZE=$(du -h "$file" | cut -f1)
        SEQS=$(grep -c "^>" "$file" || echo "0")
        echo "✓ $FILENAME - $SIZE ($SEQS sequence(s))"
    fi
done

echo ""
echo "Downloaded $SUCCESS reference genomes"
echo ""
echo "Note: These are REFERENCE genomes representing common UPEC"
echo "sequence types. They are not the exact isolates from the study."
echo ""
echo "For EXACT study isolates, you must:"
echo "1. Download raw reads from NCBI SRA (SRR22179269-SRR22179316)"
echo "2. Assemble using our pipeline"
echo ""
echo "See: data/ncbi_assemblies/README.md"
echo ""
