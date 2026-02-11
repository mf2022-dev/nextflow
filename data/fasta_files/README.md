# BioNXA FASTA Files

This directory contains example FASTA files for the bioinformatics pipeline.

## Available Samples:

- **ISO_001_ST131.fasta**: E. coli ST131 (Pandemic clone) with blaCTX-M-15
- **ISO_003_ST1193.fasta**: E. coli ST1193 (Emerging clone) 

## Running the Pipeline:

```bash
# Run with a specific sample
./scripts/upec_pipeline.sh -s ISO_001_ST131 -i ./data/fasta_files -o ./data/results

# Run demo mode
./scripts/upec_pipeline.sh --demo
```

## Based on Research:
Alrashidi et al. (2023) "Genomic Characterization of Uropathogenic Escherichia coli"
Int. J. Mol. Sci. 2023, 24(8), 7582
