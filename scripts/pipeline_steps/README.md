# BioNXA UPEC Genomic Analysis Pipeline - Real Implementation

## Overview

This directory contains **individual, executable scripts** for each step of the UPEC genomic analysis pipeline, implementing the **exact methodology** from:

**Aljohani RH, et al.** *Genomic Characterization of Uropathogenic Escherichia coli Isolates from Tertiary Hospitals in Riyadh, Saudi Arabia.* Int J Mol Sci. 2023;24(8):7582.

**NCBI BioProject**: PRJNA897916  
**DOI**: https://doi.org/10.3390/ijms24087582

---

## Pipeline Steps

Based on **Materials & Methods Section 4.3 - Bioinformatic Analysis**:

### Step 1: Quality Control
**Tool**: FastQC v0.11.8  
**Script**: `01_fastqc.sh`  
**Purpose**: Assessment of raw sequencing reads  
**Quote from paper**: *"The generated sequence reads were first assessed using the FastQC tool (v.0.11.8)"*

```bash
./01_fastqc.sh <input_fastq_dir> <output_dir>
```

### Step 2: Genome Assembly
**Tool**: Unicycler v0.4.8  
**Script**: `02_unicycler.sh`  
**Purpose**: De novo assembly of bacterial genomes  
**Quote from paper**: *"assembled using Unicycler (version 0.4.8) with default parameters"*

```bash
./02_unicycler.sh <read1.fastq> <read2.fastq> <output_dir> <sample_name>
```

### Step 3: Genome Annotation
**Tool**: Prokka v1.14.6  
**Script**: `03_prokka.sh`  
**Purpose**: Rapid prokaryotic genome annotation  
**Quote from paper**: *"annotated using Prokka (version 1.14.6) with default parameters"*

```bash
./03_prokka.sh <assembly.fasta> <output_dir> <sample_name>
```

### Step 4: MLST Typing
**Tool**: Abricate v0.9.8 + mlst database  
**Script**: `04_mlst.sh`  
**Purpose**: Multi-locus sequence typing  
**Quote from paper**: *"multilocus sequence typing (MLST)...were determined using Abricate (version 0.9.8)...mlst"*

```bash
./04_mlst.sh <assembly.fasta> <output_dir> <sample_name>
```

### Step 5: AMR Gene Detection
**Tool**: Abricate v0.9.8 + NCBI AMRFinderPlus  
**Script**: `05_amr_detection.sh`  
**Purpose**: Detection of antimicrobial resistance genes  
**Quote from paper**: *"The presence of resistance genes...were determined using Abricate (version 0.9.8)...NCBI AMRFinderPlus"*

```bash
./05_amr_detection.sh <assembly.fasta> <output_dir> <sample_name>
```

### Step 6: Virulence Factor Detection
**Tool**: Abricate v0.9.8 + VFDB  
**Purpose**: Detection of virulence factors  
**Quote from paper**: *"The presence of...virulence factors...were determined using Abricate (version 0.9.8)...virulence factor database (VFDB)"*

```bash
# To be implemented
abricate --db vfdb <assembly.fasta> > virulence_results.tsv
```

### Step 7: Serotyping & FimH Typing
**Tool**: SerotypeFinder v1.0 + FimTyper v1.0 (CGE)  
**Purpose**: Serotype and fimbrial type determination  
**Quote from paper**: *"SerotypeFinder (version 1.0) and FimTyper (version 1.0) from the Center for Genomic Epidemiology (CGE)"*

```bash
# Web service: http://genomicepidemiology.org/services/
# Or install: conda install -c bioconda serotypefinder fimtyper
```

### Step 8: Phylogroup Classification
**Tool**: Clermont Typing Tool  
**Purpose**: Phylogenetic group classification  
**Quote from paper**: *"The phylogenetic typing (phylogroups) was performed...using the Clermont typing tool"*

```bash
# Web service: http://clermontyping.iame-research.center/
# Or install: conda install -c bioconda clermontyping
```

### Step 9: QRDR Mutation Analysis
**Tool**: PointFinder  
**Purpose**: Detection of quinolone resistance mutations  
**Quote from paper**: *"Chromosomal mutations defining quinolone resistance were analysed using PointFinder"*

```bash
# Install: conda install -c bioconda pointfinder
```

### Step 10: SNP-Based Phylogenetic Analysis
**Tool**: Snippy v3.1.0  
**Purpose**: SNP-based phylogenetic analysis  
**Quote from paper**: *"SNP-based phylogenetic analysis with default options was performed using Snippy (version 3.1.0)"*

```bash
# Install: conda install -c bioconda snippy=3.1
```

---

## Installation

### Method 1: Automated Installation (Recommended)

```bash
# Run installation script
./install_tools.sh

# This will:
# - Create conda environment 'bionxa_upec'
# - Install all required tools with correct versions
# - Update Abricate databases
```

### Method 2: Manual Installation

```bash
# Create conda environment
conda create -n bionxa_upec -c bioconda -c conda-forge \
    fastqc=0.11.8 \
    unicycler=0.4.8 \
    prokka=1.14.6 \
    abricate=0.9.8 \
    mlst \
    snippy=3.1 \
    seqkit

# Activate environment
conda activate bionxa_upec

# Update Abricate databases
abricate --setupdb
```

---

## Usage Examples

### Example 1: Complete Pipeline Run

```bash
# Activate environment
conda activate bionxa_upec

# Set variables
SAMPLE="ISO_001"
FASTQ_DIR="data/fastq/"
RESULTS="results/"

# Step 1: Quality Control
./01_fastqc.sh "${FASTQ_DIR}" "${RESULTS}/qc/"

# Step 2: Assembly
./02_unicycler.sh \
    "${FASTQ_DIR}/${SAMPLE}_R1.fastq.gz" \
    "${FASTQ_DIR}/${SAMPLE}_R2.fastq.gz" \
    "${RESULTS}/assembly/" \
    "${SAMPLE}"

# Step 3: Annotation
./03_prokka.sh \
    "${RESULTS}/assembly/${SAMPLE}_assembly/assembly.fasta" \
    "${RESULTS}/annotation/" \
    "${SAMPLE}"

# Step 4: MLST
./04_mlst.sh \
    "${RESULTS}/assembly/${SAMPLE}_assembly/assembly.fasta" \
    "${RESULTS}/mlst/" \
    "${SAMPLE}"

# Step 5: AMR Detection
./05_amr_detection.sh \
    "${RESULTS}/assembly/${SAMPLE}_assembly/assembly.fasta" \
    "${RESULTS}/amr/" \
    "${SAMPLE}"
```

### Example 2: Single Step Execution

```bash
# Run just MLST on an existing assembly
./04_mlst.sh mygenome.fasta output/ Sample_001
```

---

## Study Findings Reference

From Aljohani et al. 2023 study of 165 UPEC isolates:

### Sequence Types (MLST)
- **ST131**: 39.6% (pandemic clone)
- **ST1193**: 12.5% (emerging clone - FIRST REPORT in Saudi Arabia)
- **ST73**: 10.4%
- **ST10**: 8.3%

### ESBL Genes
- **blaCTX-M-15**: 79.2%
- **blaCTX-M-27**: 12.5%
- **blaCTX-M-8**: 2.1%

### QRDR Mutations (Fluoroquinolone Resistance)
- **gyrA S83L**: 79.2%
- **gyrA D87N**: 62.5%
- **parC S80I**: 68.8%
- **parE I529L**: ST131-associated
- **parE L416F**: ST1193-associated

### Phylogroups
- **B2**: 62.5% (ST131, ST1193, ST73)
- **A**: 16.6% (ST10, ST450)
- **B1, D, C, F, G**: <10% each

### Serotypes
- **ST131**: O25:H4-fimH30, O16:H5-fimH41, O16:H5-fimH141
- **ST1193**: O75:H5-fimH64
- **ST73**: O6:H1-fimH30

---

## Expected Outputs

Each script produces structured output files:

### FastQC
- `*_fastqc.html` - Visual QC report
- `*_fastqc.zip` - Detailed QC data

### Unicycler
- `assembly.fasta` - Assembled genome
- `assembly.gfa` - Assembly graph
- `unicycler.log` - Assembly log

### Prokka
- `*.gbk` - GenBank format
- `*.gff` - GFF format annotation
- `*.faa` - Protein sequences
- `*.ffn` - Nucleotide sequences

### MLST
- `*_mlst.tsv` - Sequence type and allelic profile

### AMR Detection
- `*_amr_ncbi.tsv` - Resistance genes detected
- `*_amr_summary.txt` - Summary report

---

## Data Availability

### Real Study Data (NCBI SRA)
The actual sequencing data from the published study:

- **BioProject**: PRJNA897916
- **SRA Accessions**: SRR22179269-SRR22179316 (48 genomes)
- **Download**: 
  ```bash
  # Download using SRA Toolkit
  prefetch SRR22179269
  fastq-dump --split-files SRR22179269
  ```

---

## Differences from Demo Pipeline

| Aspect | Demo Pipeline | Real Pipeline |
|--------|---------------|---------------|
| **Tools** | Simulated output | Actual bioinformatics tools |
| **Data** | Synthetic FASTA | Real FASTQ from Illumina |
| **Results** | Pre-generated | Computed from raw data |
| **Versions** | Not enforced | Exact versions from paper |
| **Databases** | Not used | NCBI, VFDB, mlst databases |
| **Runtime** | <1 minute | 30-60 minutes per sample |
| **Accuracy** | Educational | Research-grade |

---

## System Requirements

### Hardware
- **CPU**: 4+ cores recommended
- **RAM**: 8+ GB minimum
- **Storage**: 10+ GB per sample

### Software
- **OS**: Linux or macOS
- **Conda**: Miniconda or Anaconda
- **Dependencies**: All installed via conda

---

## Troubleshooting

### Common Issues

**Issue**: "Conda not found"  
**Solution**: Install Miniconda from https://docs.conda.io/en/latest/miniconda.html

**Issue**: "Tool not found"  
**Solution**: Activate environment: `conda activate bionxa_upec`

**Issue**: "Database not found (Abricate)"  
**Solution**: Update databases: `abricate --setupdb`

**Issue**: "Assembly failed"  
**Solution**: Check FASTQ quality with FastQC first

---

## Citation

If you use this pipeline, please cite:

```
Aljohani RH, Eltigani DS, Alsaedi E, Osman LA, Alharbi B, Altuwaijri A, 
Aljindan R, Alshehri S, Balkhy HH, Alghoribi MF. 
Genomic Characterization of Uropathogenic Escherichia coli Isolates 
from Tertiary Hospitals in Riyadh, Saudi Arabia. 
Int J Mol Sci. 2023 Apr 20;24(8):7582. 
doi: 10.3390/ijms24087582. 
PMID: 37108743; PMCID: PMC10141978.
```

---

## Support

For issues or questions:
- BioNXA Platform: https://bionxa.com
- GitHub Issues: https://github.com/mf2022-dev/BioNXA

---

**Last Updated**: February 11, 2026  
**Pipeline Version**: 1.0 (Real Implementation)
