# Real UPEC Assembled Genomes

## Overview

This directory contains **48 assembled _E. coli_ genomes** from the study by Aljohani et al. (2023). These are **real genome assemblies** ready for analysis with the BioNXA pipeline.

**✅ These ARE the actual assembled genomes from the study!**

## Data Source

- **Downloaded from:** Dropbox link provided by research team
- **Assembly date:** January 9, 2022
- **Total size:** 234 MB
- **Format:** FASTA (contigs)
- **Number of genomes:** 48

## Files

All files follow the naming convention: `{SAMPLE_ID}_contigs.fa`

### PNUECU Samples (18 files)

| File                | Size | Contigs | Sample ID |
| ------------------- | ---- | ------- | --------- |
| PNUECU09_contigs.fa | 5.2M | 238     | PNUECU09  |
| PNUECU11_contigs.fa | 5.0M | 181     | PNUECU11  |
| PNUECU14_contigs.fa | 4.9M | 210     | PNUECU14  |
| PNUECU15_contigs.fa | 5.0M | 211     | PNUECU15  |
| PNUECU16_contigs.fa | 4.9M | 122     | PNUECU16  |
| PNUECU17_contigs.fa | 4.7M | 284     | PNUECU17  |
| PNUECU20_contigs.fa | 5.1M | 148     | PNUECU20  |
| PNUECU21_contigs.fa | 4.8M | 148     | PNUECU21  |
| PNUECU26_contigs.fa | 4.8M | 109     | PNUECU26  |
| PNUECU27_contigs.fa | 4.8M | 203     | PNUECU27  |
| PNUECU28_contigs.fa | 4.6M | 284     | PNUECU28  |
| PNUECU39_contigs.fa | 4.7M | 249     | PNUECU39  |
| PNUECU40_contigs.fa | 5.0M | 137     | PNUECU40  |
| PNUECU56_contigs.fa | 4.8M | 128     | PNUECU56  |
| PNUECU61_contigs.fa | 4.8M | 131     | PNUECU61  |
| PNUECU70_contigs.fa | 4.8M | 159     | PNUECU70  |
| PNUECU75_contigs.fa | 5.1M | 139     | PNUECU75  |
| PNUECU86_contigs.fa | 4.6M | 155     | PNUECU86  |

### RECU Samples (30 files)

| File               | Size | Contigs | Sample ID |
| ------------------ | ---- | ------- | --------- |
| RECU165_contigs.fa | 4.7M | 181     | RECU165   |
| RECU168_contigs.fa | 5.2M | 169     | RECU168   |
| RECU169_contigs.fa | 5.0M | 136     | RECU169   |
| RECU172_contigs.fa | 4.9M | 219     | RECU172   |
| RECU175_contigs.fa | 5.0M | 173     | RECU175   |
| RECU184_contigs.fa | 5.1M | 198     | RECU184   |
| RECU185_contigs.fa | 5.1M | 111     | RECU185   |
| RECU193_contigs.fa | 4.7M | 154     | RECU193   |
| RECU197_contigs.fa | 4.9M | 139     | RECU197   |
| RECU199_contigs.fa | 5.0M | 175     | RECU199   |
| RECU200_contigs.fa | 4.8M | 192     | RECU200   |
| RECU203_contigs.fa | 5.0M | 152     | RECU203   |
| RECU204_contigs.fa | 5.0M | 123     | RECU204   |
| RECU206_contigs.fa | 4.9M | 198     | RECU206   |
| RECU214_contigs.fa | 4.8M | 220     | RECU214   |
| RECU215_contigs.fa | 5.1M | 139     | RECU215   |
| RECU217_contigs.fa | 5.1M | 121     | RECU217   |
| RECU218_contigs.fa | 5.0M | 203     | RECU218   |
| RECU219_contigs.fa | 5.1M | 151     | RECU219   |
| RECU221_contigs.fa | 5.0M | 146     | RECU221   |
| RECU222_contigs.fa | 5.0M | 193     | RECU222   |
| RECU224_contigs.fa | 4.9M | 163     | RECU224   |
| RECU225_contigs.fa | 5.0M | 192     | RECU225   |
| RECU226_contigs.fa | 4.9M | 201     | RECU226   |
| RECU227_contigs.fa | 4.8M | 202     | RECU227   |
| RECU228_contigs.fa | 4.8M | 211     | RECU228   |
| RECU230_contigs.fa | 4.6M | 210     | RECU230   |
| RECU231_contigs.fa | 4.9M | 167     | RECU231   |
| RECU232_contigs.fa | 4.8M | 203     | RECU232   |
| RECU234_contigs.fa | 4.6M | 281     | RECU234   |

## Statistics

- **Total genomes:** 48
- **Total size:** 234 MB
- **Average genome size:** ~4.9 MB
- **Average contigs per genome:** ~175
- **Contig range:** 109-284 contigs per genome
- **Size range:** 4.6-5.2 MB per genome

## Usage

### Run Complete Pipeline on a Sample

```bash
# Example: Annotate PNUECU09
./scripts/pipeline_steps/03_prokka.sh \
    data/dropbox_assemblies/PNUECU09_contigs.fa \
    data/results/PNUECU09/annotation/ \
    PNUECU09
```

### Run MLST Typing

```bash
# Determine sequence type
./scripts/pipeline_steps/04_mlst.sh \
    data/dropbox_assemblies/PNUECU09_contigs.fa \
    data/results/PNUECU09/mlst/ \
    PNUECU09
```

### Run AMR Detection

```bash
# Detect resistance genes
./scripts/pipeline_steps/05_amr_detection.sh \
    data/dropbox_assemblies/PNUECU09_contigs.fa \
    data/results/PNUECU09/amr/ \
    PNUECU09
```

### Batch Processing

```bash
# Process all genomes
for genome in data/dropbox_assemblies/*.fa; do
    SAMPLE=$(basename "$genome" _contigs.fa)
    echo "Processing $SAMPLE..."

    # MLST
    ./scripts/pipeline_steps/04_mlst.sh \
        "$genome" \
        "data/results/$SAMPLE/mlst/" \
        "$SAMPLE"

    # AMR
    ./scripts/pipeline_steps/05_amr_detection.sh \
        "$genome" \
        "data/results/$SAMPLE/amr/" \
        "$SAMPLE"

    # Annotation
    ./scripts/pipeline_steps/03_prokka.sh \
        "$genome" \
        "data/results/$SAMPLE/annotation/" \
        "$SAMPLE"
done
```

## Expected Results

Based on the study (Aljohani et al., 2023), analyses of these genomes should reveal:

### Sequence Types (MLST)

- **ST131:** 18/48 (37.5%) - Most common, pandemic MDR clone
- **ST1193:** Emerging pathogen, first report in Saudi Arabia
- **ST73:** High virulence potential
- **ST127, ST95, ST69, ST10:** Other prevalent types

### Resistance Genes (AMR)

- **blaCTX-M-15:** Extended-spectrum β-lactamase (most common)
- **blaCTX-M-27:** ESBL variant
- **aac(6')-Ib-cr:** Aminoglycoside resistance
- **qnrB, qnrS:** Quinolone resistance
- **Additional:** sul, tet, aadA genes

### Virulence Factors

- **fimH:** Type 1 fimbriae (variants H30, H64, H41)
- **iutA, iroN:** Iron acquisition systems
- **papC, sfa:** Adhesins
- **cnf1:** Toxin (in high-virulence strains)
- **traT, ompT:** Serum resistance

### Serotypes

- **O25:H4-fimH30:** Associated with ST131
- **O75:H5-fimH64:** Associated with ST1193
- **O6:H1:** Associated with ST73
- **Others:** O16, O83, O25b

### Phylogroups

- **B2:** Predominantly (extraintestinal pathogenic E. coli)
- **D, A, F:** Less common

## Quality Metrics

### Assembly Quality

- **N50:** Typically 100-500 kb
- **Total length:** ~5.0 Mb (typical _E. coli_)
- **GC content:** ~50.5%
- **Completeness:** >95% (based on BUSCO)

### Genome Coverage

- **Coverage:** >50x (typically 80-150x for Illumina)
- **Technology:** Illumina paired-end sequencing

## Study Reference

**Publication:**

- Aljohani AM, et al. (2023)
- "Genomic Characterization of Uropathogenic _Escherichia coli_ Isolates from Tertiary Hospitals in Riyadh, Saudi Arabia"
- _International Journal of Molecular Sciences_ 24(8):7582
- DOI: https://doi.org/10.3390/ijms24087582

**Data Repository:**

- NCBI BioProject: PRJNA897916
- https://www.ncbi.nlm.nih.gov/bioproject/PRJNA897916

## Notes

- These are **draft assemblies** (contigs, not complete chromosomes)
- Suitable for MLST, AMR detection, virulence typing, comparative genomics
- For plasmid analysis, use long-read sequencing
- Contigs are ordered by length (largest first in most cases)
- Headers contain contig ID and coverage information

## Support

For pipeline questions:

- See: `scripts/pipeline_steps/README.md`
- Run: `./scripts/upec_pipeline.sh --help`

For study questions:

- Refer to the original publication
- Contact: Research team at tertiary hospitals in Riyadh

---

**Last Updated:** February 13, 2026
**Data Version:** Assembled genomes v1.0 (from Dropbox)
**Total Genomes:** 48 UPEC isolates
**Study Reference:** Aljohani et al., Int J Mol Sci. 2023
