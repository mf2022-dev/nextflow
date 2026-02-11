# BioNXA FASTA Files

This directory contains genome assembly files for UPEC isolates from the Aljohani et al. (2023) study.

## Available Samples

### ISO_001_ST131.fasta
- **Species:** *Escherichia coli*
- **Sequence Type:** ST131
- **Serotype:** O25:H4-fimH30
- **Phylogroup:** B2
- **Clinical Significance:** Pandemic clone, globally disseminated multidrug-resistant lineage
- **Resistance Profile:**
  - ESBL producer (blaCTX-M-15)
  - Fluoroquinolone resistant (gyrA S83L, parC S80I mutations)
  - Aminoglycoside resistant
  - TMP-SMX resistant

### ISO_003_ST1193.fasta
- **Species:** *Escherichia coli*
- **Sequence Type:** ST1193
- **Serotype:** O75:H5-fimH64
- **Phylogroup:** B2
- **Clinical Significance:** Emerging pandemic clone (FIRST REPORT in Saudi Arabia)
- **Resistance Profile:**
  - ESBL producer (blaCTX-M-15)
  - Fluoroquinolone resistant (QRDR mutations)
  - Rapidly spreading globally

## Pipeline Usage

### Run analysis on a specific sample:
```bash
./scripts/upec_pipeline.sh -s ISO_001_ST131 -i ./data/fasta_files -o ./data/results
```

### Run demo mode:
```bash
./scripts/upec_pipeline.sh --demo
```

### View help:
```bash
./scripts/upec_pipeline.sh --help
```

## Analysis Pipeline

The pipeline implements the exact methodology from the research paper:

1. **Quality Control** - FastQC v0.11.8
2. **Genome Assembly** - Unicycler v0.4.8
3. **Genome Annotation** - Prokka v1.14.6
4. **MLST Typing** - Abricate v0.9.8 + mlst database
5. **AMR Detection** - Abricate + NCBI AMRFinderPlus
6. **Virulence Factors** - Abricate + VFDB
7. **Serotyping** - SerotypeFinder v1.0 + FimTyper v1.0
8. **Phylogroup Classification** - Clermont Typing Tool

## Citation

Aljohani RH, Eltigani DS, Alsaedi E, Osman LA, Alharbi B, Altuwaijri A, Aljindan R, Alshehri S, Balkhy HH, Alghoribi MF. 
Genomic Characterization of Uropathogenic Escherichia coli Isolates from Tertiary Hospitals in Riyadh, Saudi Arabia. 
Int J Mol Sci. 2023 Apr 20;24(8):7582. doi: 10.3390/ijms24087582. PMID: 37108743; PMCID: PMC10141978.

## Data Availability

- **NCBI BioProject:** PRJNA897916
- **SRA Accessions:** SRR22179269-SRR22179316
- **Publication:** https://doi.org/10.3390/ijms24087582
