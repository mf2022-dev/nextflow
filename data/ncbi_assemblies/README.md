# NCBI Real Data Download Instructions

## Study Information

- **Publication:** Aljohani et al., _Int J Mol Sci._ 2023
- **DOI:** https://doi.org/10.3390/ijms24087582
- **BioProject:** PRJNA897916
- **SRA Accessions:** SRR22179269 - SRR22179316 (48 isolates)
- **Study:** Genomic Characterization of Uropathogenic _Escherichia coli_ from Saudi Arabia

## Download Options

### Option 1: Using NCBI SRA Toolkit (Recommended)

#### 1.1 Install SRA Toolkit

```bash
# Using Conda (recommended)
conda install -c bioconda sra-tools

# Or on Ubuntu/Debian
sudo apt-get install sra-toolkit

# Or on macOS
brew install sra-tools
```

#### 1.2 Configure SRA Toolkit

```bash
vdb-config --interactive
```

#### 1.3 Download Sample Data

Download first 3 samples for testing:

```bash
# Download SRR22179269 (ISO_001 - ST131)
prefetch SRR22179269
fasterq-dump SRR22179269 --split-files -O data/ncbi_assemblies/

# Download SRR22179270 (ISO_002 - ST1193)
prefetch SRR22179270
fasterq-dump SRR22179270 --split-files -O data/ncbi_assemblies/

# Download SRR22179271 (ISO_003 - ST73)
prefetch SRR22179271
fasterq-dump SRR22179271 --split-files -O data/ncbi_assemblies/
```

This will create paired-end FASTQ files:

- `SRR22179269_1.fastq` and `SRR22179269_2.fastq`
- `SRR22179270_1.fastq` and `SRR22179270_2.fastq`
- `SRR22179271_1.fastq` and `SRR22179271_2.fastq`

#### 1.4 Run Pipeline on Downloaded Data

```bash
# Run the full pipeline on downloaded reads
./scripts/upec_pipeline.sh \
    -1 data/ncbi_assemblies/SRR22179269_1.fastq \
    -2 data/ncbi_assemblies/SRR22179269_2.fastq \
    -o data/results/ISO_001_ST131 \
    -s ISO_001
```

### Option 2: Using NCBI Datasets CLI

#### 2.1 Install NCBI Datasets

```bash
# Using Conda
conda install -c conda-forge ncbi-datasets-cli

# Or download directly
# https://www.ncbi.nlm.nih.gov/datasets/docs/v2/download-and-install/
```

#### 2.2 Search for Assemblies

```bash
datasets summary genome accession PRJNA897916 > bioproject_summary.json
```

#### 2.3 Download Assemblies

If assemblies are available (they may not be for raw sequencing projects):

```bash
datasets download genome accession PRJNA897916 \
    --include genome,gff3,protein \
    --filename prjna897916_assemblies.zip

unzip prjna897916_assemblies.zip
```

### Option 3: Manual Download from NCBI Website

#### 3.1 Access BioProject

1. Visit: https://www.ncbi.nlm.nih.gov/bioproject/PRJNA897916
2. Click on "SRA Experiments" link
3. Select samples you want to download

#### 3.2 Download Individual Samples

For each sample:

1. Click on the SRR accession number (e.g., SRR22179269)
2. Click "Send to:" → "File" → "RunInfo"
3. Download FASTQ using the "Data Access" tab

## Sample Mapping

Based on the paper's Supplementary Table S1:

| Sample ID | SRA Accession | Sequence Type | Serotype | Phylogroup | Clinical Source |
| --------- | ------------- | ------------- | -------- | ---------- | --------------- |
| ISO_001   | SRR22179269   | ST131         | O25:H4   | B2         | Urine           |
| ISO_002   | SRR22179270   | ST1193        | O75:H5   | B2         | Urine           |
| ISO_003   | SRR22179271   | ST73          | O6:H1    | B2         | Urine           |
| ...       | ...           | ...           | ...      | ...        | ...             |
| ISO_048   | SRR22179316   | ST127         | O6:H31   | B2         | Urine           |

## Expected Data Size

- **Per sample (FASTQ):** ~500-800 MB (paired-end Illumina reads)
- **Total for 48 samples:** ~24-40 GB
- **Assembly per sample:** ~5 MB (assembled genome)

## Running the Pipeline

After downloading FASTQ files, run the complete pipeline:

```bash
# Install tools first
./scripts/install_tools.sh

# Activate conda environment
conda activate bionxa_upec

# Run pipeline on a sample
./scripts/upec_pipeline.sh \
    -1 data/ncbi_assemblies/SRR22179269_1.fastq \
    -2 data/ncbi_assemblies/SRR22179269_2.fastq \
    -o data/results/ISO_001 \
    -s ISO_001
```

Or run individual steps:

```bash
# Step 1: Quality Control
./scripts/pipeline_steps/01_fastqc.sh \
    data/ncbi_assemblies/ \
    data/results/ISO_001/qc/

# Step 2: Assembly
./scripts/pipeline_steps/02_unicycler.sh \
    data/ncbi_assemblies/SRR22179269_1.fastq \
    data/ncbi_assemblies/SRR22179269_2.fastq \
    data/results/ISO_001/assembly/ \
    ISO_001

# Step 3: Annotation
./scripts/pipeline_steps/03_prokka.sh \
    data/results/ISO_001/assembly/ISO_001_assembly/assembly.fasta \
    data/results/ISO_001/annotation/ \
    ISO_001

# Step 4: MLST
./scripts/pipeline_steps/04_mlst.sh \
    data/results/ISO_001/assembly/ISO_001_assembly/assembly.fasta \
    data/results/ISO_001/mlst/ \
    ISO_001

# Step 5: AMR Detection
./scripts/pipeline_steps/05_amr_detection.sh \
    data/results/ISO_001/assembly/ISO_001_assembly/assembly.fasta \
    data/results/ISO_001/amr/ \
    ISO_001
```

## Troubleshooting

### SRA Toolkit Issues

If `prefetch` fails:

```bash
# Clear cache
vdb-config --restore-defaults

# Try direct download
wget https://sra-pub-run-odp.s3.amazonaws.com/sra/SRR22179269/SRR22179269
```

### Disk Space

Ensure you have sufficient disk space:

```bash
df -h .
# Need at least 50 GB free for full dataset
```

### Memory Requirements

- **FastQC:** 2 GB RAM
- **Unicycler:** 8-16 GB RAM
- **Prokka:** 4 GB RAM

## Expected Results

After running the pipeline on real data, you should obtain results matching Table 1 in the paper:

- **ST131 isolates:** 18/48 (37.5%) - Most common
- **ST1193 isolates:** First report in Saudi Arabia
- **ST73 isolates:** High virulence potential
- **Resistance genes:** blaCTX-M-15, blaCTX-M-27
- **Serotypes:** O25:H4-fimH30, O75:H5-fimH64
- **Phylogroup:** Predominantly B2 (ExPEC)

## References

1. **Paper:** Aljohani et al. (2023) _Int J Mol Sci_ 24(8):7582
2. **BioProject:** https://www.ncbi.nlm.nih.gov/bioproject/PRJNA897916
3. **SRA Toolkit:** https://github.com/ncbi/sra-tools
4. **NCBI Datasets:** https://www.ncbi.nlm.nih.gov/datasets/

## Need Help?

- Check script usage: `./scripts/upec_pipeline.sh --help`
- View demo mode: `./scripts/upec_pipeline.sh --demo`
- Report issues: GitHub repository issues page
