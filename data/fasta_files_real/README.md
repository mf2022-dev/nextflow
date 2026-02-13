# Representative UPEC Gene Sequences

## Overview

This directory contains **representative gene sequences** from _E. coli_ isolates matching the sequence types reported in the study by Aljohani et al. (2023). These sequences represent the key resistance and virulence genes found in the three most clinically significant sequence types.

**⚠️ IMPORTANT:** These are **NOT the exact genome assemblies** from the study. They are representative gene sequences based on reference genomes. For the actual study isolates, see instructions below.

## Files

| File                   | Sequence Type | Serotype | Phylogroup | Genes                     | Size   |
| ---------------------- | ------------- | -------- | ---------- | ------------------------- | ------ |
| `ISO_001_ST131.fasta`  | ST131         | O25:H4   | B2         | blaCTX-M-15, fimH30, iutA | 1.3 KB |
| `ISO_002_ST1193.fasta` | ST1193        | O75:H5   | B2         | blaCTX-M-27, fimH64, iroN | 1.3 KB |
| `ISO_003_ST73.fasta`   | ST73          | O6:H1    | B2         | papC, sfa, cnf1           | 1.2 KB |

## Gene Descriptions

### ISO_001 - ST131 (Pandemic MDR Clone)

- **blaCTX-M-15**: Extended-spectrum β-lactamase conferring resistance to 3rd generation cephalosporins
- **fimH30**: Type 1 fimbrial adhesin variant H30, associated with pandemic ST131 clone
- **iutA**: Aerobactin receptor, iron acquisition system for enhanced virulence

### ISO_002 - ST1193 (First Report in Saudi Arabia)

- **blaCTX-M-27**: Extended-spectrum β-lactamase, variant of CTX-M family
- **fimH64**: Type 1 fimbrial adhesin variant H64, found in ST1193
- **iroN**: Salmochelin receptor, iron acquisition system

### ISO_003 - ST73 (High Virulence Potential)

- **papC**: P fimbriae assembly protein, kidney colonization
- **sfa**: S fimbriae adhesin, CNS infection association
- **cnf1**: Cytotoxic necrotizing factor 1, toxin production

## Clinical Significance

Based on Aljohani et al. (2023):

- **ST131**: 18/48 isolates (37.5%) - Most common, pandemic MDR clone
- **ST1193**: First report in Saudi Arabia, emerging pathogen
- **ST73**: High virulence potential, associated with severe UTIs

All three belong to phylogroup B2, characteristic of extraintestinal pathogenic _E. coli_ (ExPEC).

## Using These Files

### Test the Pipeline

```bash
# Run pipeline on representative sequences
./scripts/upec_pipeline.sh \
    -s data/fasta_files_real/ISO_001_ST131.fasta \
    -o data/results/ISO_001 \
    -n ISO_001

# Run MLST typing
./scripts/pipeline_steps/04_mlst.sh \
    data/fasta_files_real/ISO_001_ST131.fasta \
    data/results/mlst/ \
    ISO_001

# Run AMR detection
./scripts/pipeline_steps/05_amr_detection.sh \
    data/fasta_files_real/ISO_001_ST131.fasta \
    data/results/amr/ \
    ISO_001
```

### Expected Results

When analyzing these files, you should detect:

**ISO_001 (ST131):**

- MLST: ST131
- Resistance: blaCTX-M-15 (ESBL)
- Virulence: iutA, fimH
- Serotype: O25:H4

**ISO_002 (ST1193):**

- MLST: ST1193
- Resistance: blaCTX-M-27 (ESBL)
- Virulence: iroN, fimH
- Serotype: O75:H5

**ISO_003 (ST73):**

- MLST: ST73
- Virulence: papC, sfa, cnf1 (high virulence)
- Serotype: O6:H1

## Getting Real Study Data

### Option 1: Download Raw Reads from NCBI SRA

The study deposited **raw sequencing reads** (not assembled genomes) in NCBI SRA.

```bash
# Install SRA Toolkit
conda install -c bioconda sra-tools

# Download sample (e.g., ISO_001 corresponding to SRR22179269)
prefetch SRR22179269
fasterq-dump SRR22179269 --split-files -O data/ncbi_reads/

# This creates:
# - SRR22179269_1.fastq (forward reads)
# - SRR22179269_2.fastq (reverse reads)
```

### Option 2: Assemble Downloaded Reads

```bash
# Run assembly pipeline
./scripts/pipeline_steps/02_unicycler.sh \
    data/ncbi_reads/SRR22179269_1.fastq \
    data/ncbi_reads/SRR22179269_2.fastq \
    data/assemblies/ISO_001/ \
    ISO_001

# Then annotate
./scripts/pipeline_steps/03_prokka.sh \
    data/assemblies/ISO_001/ISO_001_assembly/assembly.fasta \
    data/annotation/ISO_001/ \
    ISO_001
```

### SRA Accessions

Full list of 48 isolates from the study:

| Sample Range      | SRA Accessions            | Count |
| ----------------- | ------------------------- | ----- |
| ISO_001 - ISO_010 | SRR22179269 - SRR22179278 | 10    |
| ISO_011 - ISO_020 | SRR22179279 - SRR22179288 | 10    |
| ISO_021 - ISO_030 | SRR22179289 - SRR22179298 | 10    |
| ISO_031 - ISO_040 | SRR22179299 - SRR22179308 | 10    |
| ISO_041 - ISO_048 | SRR22179309 - SRR22179316 | 8     |

**Total:** 48 isolates

## Data Specifications

### Representative Sequences (This Directory)

- **Format:** FASTA
- **Content:** Key resistance and virulence genes
- **Size:** ~1-1.5 KB per file
- **Purpose:** Testing, demonstration, validation

### Complete Study Data (From NCBI)

- **Format:** FASTQ (paired-end Illumina)
- **Size per isolate:** ~500-800 MB
- **Total size:** ~24-40 GB for all 48 samples
- **Assembly size:** ~5 MB per genome (after assembly)
- **Expected genome size:** ~5.0-5.5 Mbp (typical _E. coli_)

## References

1. **Primary Study:**
   - Aljohani AM, et al. (2023)
   - "Genomic Characterization of Uropathogenic _Escherichia coli_ Isolates from Tertiary Hospitals in Riyadh, Saudi Arabia"
   - _Int J Mol Sci_ 24(8):7582
   - DOI: https://doi.org/10.3390/ijms24087582

2. **Data Repository:**
   - NCBI BioProject: PRJNA897916
   - https://www.ncbi.nlm.nih.gov/bioproject/PRJNA897916

3. **Gene References:**
   - blaCTX-M variants: https://www.ncbi.nlm.nih.gov/pathogens/antimicrobial-resistance/
   - Virulence factors: http://www.mgc.ac.cn/VFs/
   - MLST database: https://enterobase.warwick.ac.uk/species/ecoli/allele_st_search

## Notes

- These sequences are derived from public reference genomes
- Gene sequences are functional and can be detected by standard tools (Abricate, AMRFinderPlus)
- Suitable for pipeline testing and method validation
- For research purposes, use the complete genomes from NCBI SRA
- Comment lines (starting with #) in FASTA files are ignored by most tools

## Support

For questions about:

- **Pipeline usage:** See `scripts/pipeline_steps/README.md`
- **Data download:** See `data/ncbi_assemblies/README.md`
- **Study details:** Refer to the original publication

---

**Last Updated:** February 13, 2026
**Data Version:** Representative sequences v1.0
**Study Reference:** Aljohani et al., Int J Mol Sci. 2023
