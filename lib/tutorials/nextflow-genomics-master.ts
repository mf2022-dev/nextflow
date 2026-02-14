import { Tutorial } from '../types/tutorial';

export const nextflowGenomicsMaster: Tutorial = {
  id: 'nextflow-genomics-master',
  slug: 'nextflow-genomics-master',
  title: 'Master Class: Nextflow Genomics Pipeline for UPEC Analysis',
  description: 'Advanced tutorial combining Nextflow workflow automation with real UPEC genomic data analysis. Learn production-grade bioinformatics pipeline development, from raw data to publication-ready results.',
  category: 'advanced',
  difficulty: 'advanced',
  duration: 180, // 3 hours
  xpReward: 500,
  prerequisites: [
    'genomic-characterization-upec',
    'intro-to-bioinformatics',
    'Basic command line proficiency',
    'Understanding of Docker/containers',
    'Familiarity with genome assembly concepts'
  ],
  learningObjectives: [
    'Design and implement production-grade Nextflow pipelines',
    'Analyze 48 real UPEC genomes using automated workflows',
    'Integrate multiple bioinformatics tools (FastQC, Unicycler, Prokka, MLST, Abricate)',
    'Generate publication-ready results and visualizations',
    'Apply best practices for reproducible computational biology',
    'Understand pandemic clone ST131 genomic characteristics',
    'Perform comparative genomics and phylogenetic analysis'
  ],
  sections: [
    {
      id: 'introduction',
      title: '1. Introduction to Production Genomics Pipelines',
      content: `
# Master Class: Nextflow Genomics Pipeline for UPEC Analysis

## Welcome to State-of-the-Art Bioinformatics! 🧬

You're about to embark on a **professional-level journey** analyzing **48 real uropathogenic *E. coli* (UPEC) genomes** from Saudi Arabian hospitals. This isn't just a tutorial—it's the **exact workflow** used in published research.

### What Makes This Tutorial State-of-the-Art?

#### 🔬 **Real Research Data**
- **48 assembled genomes** from Aljohani et al. (2023) *Int J Mol Sci*
- Published in peer-reviewed journal (Impact Factor: 5.6)
- NCBI BioProject: PRJNA897916
- Real clinical isolates from tertiary hospitals

#### 🚀 **Production-Grade Tools**
- **Nextflow** - Industry-standard workflow manager
- **Docker/Singularity** - Containerized reproducibility
- **nf-core standards** - Best practices from Genomics England
- **Cloud-ready** - Scalable from laptop to HPC clusters

#### 📊 **Complete Analysis Pipeline**
1. **Quality Control** → FastQC v0.11.8
2. **Assembly** → Unicycler v0.4.8
3. **Annotation** → Prokka v1.14.6
4. **MLST Typing** → Abricate v0.9.8
5. **AMR Detection** → NCBI AMRFinderPlus
6. **Virulence Profiling** → VFDB
7. **Serotyping** → SerotypeFinder
8. **Phylogenetic Analysis** → Clermont Typing

### The Scientific Context

#### 🦠 UPEC: A Global Health Threat

**Uropathogenic *E. coli*** causes:
- **150 million UTIs annually** worldwide
- **25-40% antibiotic resistance** rates
- **$2.5 billion** healthcare costs (USA alone)
- **Increasing multidrug resistance** - major WHO concern

#### 🌍 The ST131 Pandemic

**Sequence Type 131 (ST131)** is a **pandemic clone**:
- Spread globally since 2000s
- **Serotype O25:H4-fimH30**
- Carries **blaCTX-M-15** ESBL gene
- **37.5% of our dataset** (18/48 isolates)
- Associated with severe infections and treatment failure

### What You'll Learn

By the end of this masterclass, you'll be able to:

✅ **Build Nextflow pipelines** from scratch  
✅ **Analyze genomic data** at publication quality  
✅ **Identify pandemic clones** and resistance mechanisms  
✅ **Generate publication figures** and statistical reports  
✅ **Deploy pipelines** to HPC clusters and cloud platforms  
✅ **Understand clinical implications** of genomic findings

### Real-World Applications

This workflow is used by:
- 🏥 **Clinical microbiology labs** - Outbreak investigation
- 🔬 **Research institutions** - Comparative genomics
- 🏛️ **Public health agencies** - Surveillance programs
- 💊 **Pharma companies** - Drug target identification

### Tutorial Structure

**Part 1: Pipeline Design** (30 min)
- Nextflow basics and DSL2 syntax
- Process definition and channels
- Configuration and profiles

**Part 2: Quality & Assembly** (45 min)
- FastQC quality metrics
- De novo assembly with Unicycler
- Assembly quality assessment

**Part 3: Annotation & Typing** (45 min)
- Prokka genome annotation
- MLST sequence typing
- AMR gene detection

**Part 4: Advanced Analysis** (80 min)
- Comparative genomics
- Phylogenetic trees
- Statistical analysis
- Publication-ready figures

---

**💡 Pro Tip**: This tutorial uses **real data** - the analyses take real time to run. We'll use smaller datasets for practice, then scale to the full 48 genomes.

**🎯 Learning Goal**: By the end, you'll have a complete, reproducible pipeline ready for your own research!

Let's begin! 🚀
      `,
      codeExamples: []
    },
    {
      id: 'nextflow-basics',
      title: '2. Nextflow Fundamentals & Pipeline Architecture',
      content: `
# Part 1: Nextflow Fundamentals & Pipeline Architecture

## Why Nextflow for Genomics?

### The Problem with Traditional Scripts

**Traditional bash pipeline:**
\`\`\`bash
# ❌ Problems:
# - No parallelization
# - No error recovery
# - Not portable
# - Hard to scale
# - No reproducibility

for sample in *.fastq; do
    fastqc $sample
    spades.py -1 ${sample}_1.fq -2 ${sample}_2.fq -o assembly/
    prokka assembly/contigs.fasta --outdir annotation/
done
\`\`\`

**Problems:**
- Runs sequentially (slow!)
- No automatic retry on failure
- Hardcoded paths
- No resource management
- Difficult to debug

### The Nextflow Solution

**Nextflow advantages:**
✅ **Parallel execution** - Process 48 genomes simultaneously  
✅ **Automatic retries** - Handle transient failures  
✅ **Containerization** - Docker/Singularity support  
✅ **Cloud-ready** - AWS, GCP, Azure, HPC  
✅ **Resumable** - Continue from where it failed  
✅ **Portable** - Same code, any platform  

## Nextflow DSL2 Syntax

### Basic Concepts

#### 1. **Processes** - Computational tasks
\`\`\`nextflow
process FASTQC {
    container 'biocontainers/fastqc:v0.11.8'
    
    input:
    tuple val(sample_id), path(reads)
    
    output:
    path "fastqc_${sample_id}_logs", emit: logs
    
    script:
    """
    mkdir fastqc_${sample_id}_logs
    fastqc -o fastqc_${sample_id}_logs -f fastq -q ${reads}
    """
}
\`\`\`

#### 2. **Channels** - Data flow
\`\`\`nextflow
// Create channel from genome files
genomes_ch = Channel
    .fromPath('data/dropbox_assemblies/*.fa')
    .map { file -> tuple(file.baseName, file) }

// genomes_ch emits: ['PNUECU09', '/path/to/PNUECU09_contigs.fa']
\`\`\`

#### 3. **Workflows** - Connect processes
\`\`\`nextflow
workflow UPEC_ANALYSIS {
    take:
    genomes
    
    main:
    PROKKA(genomes)
    MLST(genomes)
    ABRICATE_AMR(genomes)
    
    emit:
    annotation = PROKKA.out
    mlst = MLST.out
    amr = ABRICATE_AMR.out
}
\`\`\`

## Our Pipeline Architecture

### High-Level Design

\`\`\`
INPUT: 48 UPEC genomes (.fa files)
    ↓
    ├─→ PROKKA_ANNOTATION ─────────→ Gene predictions
    ├─→ MLST_TYPING ───────────────→ Sequence types (ST131, ST1193, etc.)
    ├─→ ABRICATE_AMR ──────────────→ Resistance genes
    ├─→ ABRICATE_VIRULENCE ────────→ Virulence factors
    ├─→ SEROTYPING ────────────────→ O:H antigens
    ├─→ PHYLOGROUP ────────────────→ Clermont typing
    ↓
AGGREGATION: Combine all results
    ↓
VISUALIZATION: Generate plots and reports
    ↓
OUTPUT: Publication-ready results
\`\`\`

### Data Flow Diagram

\`\`\`
[48 Genomes] 
    ↓
[Input Channel]
    ↓
    ├─→ [Process 1: Annotation] → [annotations/]
    ├─→ [Process 2: MLST] ──────→ [mlst_results.tsv]
    ├─→ [Process 3: AMR] ───────→ [amr_genes.tsv]
    ├─→ [Process 4: Virulence] ─→ [virulence.tsv]
    ↓
[Collect Results]
    ↓
[Analyze & Visualize]
    ↓
[Final Report: summary.html]
\`\`\`

### Directory Structure

\`\`\`
bionxa-pipeline/
├── main.nf                    # Main pipeline script
├── nextflow.config            # Configuration file
├── modules/
│   ├── prokka.nf             # Annotation module
│   ├── mlst.nf               # MLST module
│   ├── abricate.nf           # AMR/virulence module
│   └── aggregation.nf        # Results collection
├── bin/
│   ├── parse_mlst.py         # Helper scripts
│   ├── plot_results.R        # Visualization
│   └── generate_report.py    # HTML report
├── data/
│   └── dropbox_assemblies/   # 48 real genomes
├── results/                   # Output directory
└── work/                      # Nextflow working dir
\`\`\`

## Configuration Management

### nextflow.config

\`\`\`nextflow
// Pipeline parameters
params {
    // Input/Output
    genomes = "data/dropbox_assemblies/*.fa"
    outdir = "results"
    
    // Resources
    max_cpus = 16
    max_memory = 64.GB
    max_time = 24.h
    
    // Tool options
    prokka_kingdom = "Bacteria"
    prokka_genus = "Escherichia"
    mlst_scheme = "ecoli"
}

// Process defaults
process {
    container = 'ubuntu:20.04'
    cpus = 2
    memory = 4.GB
    time = 2.h
    
    errorStrategy = 'retry'
    maxRetries = 3
}

// Profiles for different environments
profiles {
    standard {
        process.executor = 'local'
    }
    
    cluster {
        process.executor = 'slurm'
        process.queue = 'batch'
    }
    
    cloud {
        process.executor = 'awsbatch'
        aws.region = 'us-east-1'
    }
    
    docker {
        docker.enabled = true
    }
    
    singularity {
        singularity.enabled = true
        singularity.autoMounts = true
    }
}
\`\`\`

### Why This Matters

🎯 **Reproducibility**: Same results on any platform  
🚀 **Scalability**: Easy switch from laptop to cluster  
🔧 **Flexibility**: Adjust resources per process  
📦 **Portability**: Share pipeline with collaborators  

---

**Next**: We'll build our first Nextflow process for genome annotation!
      `,
      codeExamples: [
        {
          title: 'Create Basic Nextflow Pipeline',
          language: 'nextflow',
          code: `#!/usr/bin/env nextflow

nextflow.enable.dsl = 2

// Pipeline info
log.info """
    ╔═══════════════════════════════════════════════════╗
    ║   BioNXA UPEC Genomics Pipeline v1.0             ║
    ║   Nextflow-based automated analysis              ║
    ╚═══════════════════════════════════════════════════╝
    
    Genomes    : ${params.genomes}
    Output dir : ${params.outdir}
    Max CPUs   : ${params.max_cpus}
    Max Memory : ${params.max_memory}
    """
    .stripIndent()

// Create input channel
genomes_ch = Channel
    .fromPath(params.genomes)
    .map { file -> 
        def sample_id = file.baseName.replaceAll('_contigs', '')
        tuple(sample_id, file)
    }

// Print found genomes
genomes_ch.view { sample_id, file -> 
    "Found genome: $sample_id -> ${file.name}" 
}

workflow {
    log.info "Pipeline started!"
    log.info "Ready to process ${genomes_ch.count().val} genomes"
}`,
          explanation: 'Basic Nextflow pipeline structure with input channel creation and logging'
        }
      ]
    },
    {
      id: 'annotation-module',
      title: '3. Genome Annotation with Prokka',
      content: `
# Part 2: Genome Annotation with Prokka

## Understanding Genome Annotation

### What is Genome Annotation?

**Genome annotation** identifies:
- 🧬 **Genes** - Protein-coding sequences
- 📝 **Features** - tRNA, rRNA, regulatory regions
- 🏷️ **Functions** - What each gene does
- 📊 **Statistics** - Gene count, density, GC content

### Why Prokka?

**Prokka** (Rapid Prokaryotic Genome Annotation):
- ⚡ **Fast** - Annotates bacterial genome in ~10 minutes
- 🎯 **Accurate** - Uses curated databases (UniProt, Pfam)
- 📦 **Complete** - Outputs 15+ file formats
- 🔧 **Customizable** - Genus/species specific

### Expected Output

For each genome, Prokka produces:
- **\`.gff\`** - Gene feature format (positions, functions)
- **\`.gbk\`** - GenBank format (submissionready)
- **\`.faa\`** - Protein sequences
- **\`.ffn\`** - Gene nucleotide sequences
- **\`.tsv\`** - Summary statistics

## Building the Prokka Module

### Process Definition

\`\`\`nextflow
process PROKKA {
    tag "$sample_id"
    label 'process_medium'
    container 'staphb/prokka:1.14.6'
    publishDir "${params.outdir}/annotation", mode: 'copy'
    
    input:
    tuple val(sample_id), path(genome)
    
    output:
    tuple val(sample_id), path("${sample_id}"), emit: annotation
    path "${sample_id}/${sample_id}.txt", emit: stats
    path "${sample_id}/${sample_id}.gff", emit: gff
    
    script:
    """
    prokka \\
        --outdir ${sample_id} \\
        --prefix ${sample_id} \\
        --kingdom ${params.prokka_kingdom} \\
        --genus ${params.prokka_genus} \\
        --species coli \\
        --strain ${sample_id} \\
        --cpus ${task.cpus} \\
        --force \\
        ${genome}
    
    # Log annotation statistics
    echo "=== Annotation Stats for ${sample_id} ===" >> ${sample_id}.log
    cat ${sample_id}/${sample_id}.txt >> ${sample_id}.log
    """
}
\`\`\`

### Key Components Explained

#### 1. **Tag** - Process tracking
\`\`\`nextflow
tag "$sample_id"  // Shows "PROKKA (PNUECU09)" in logs
\`\`\`

#### 2. **Label** - Resource profile
\`\`\`nextflow
label 'process_medium'  // 4 CPUs, 8GB RAM (defined in config)
\`\`\`

#### 3. **Container** - Docker image
\`\`\`nextflow
container 'staphb/prokka:1.14.6'  // Exact version for reproducibility
\`\`\`

#### 4. **PublishDir** - Save results
\`\`\`nextflow
publishDir "${params.outdir}/annotation", mode: 'copy'
\`\`\`

#### 5. **Named Outputs** - Multiple outputs
\`\`\`nextflow
emit: annotation  // Full directory
emit: stats       // Statistics file
emit: gff         // GFF file only
\`\`\`

## Workflow Integration

### Connect to Main Workflow

\`\`\`nextflow
include { PROKKA } from './modules/prokka'

workflow {
    // Input channel
    genomes_ch = Channel
        .fromPath(params.genomes)
        .map { file -> tuple(file.baseName.replaceAll('_contigs', ''), file) }
    
    // Run annotation
    PROKKA(genomes_ch)
    
    // View results
    PROKKA.out.stats.view { file -> 
        "Annotation complete: ${file}"
    }
}
\`\`\`

## Parsing Annotation Results

### Extract Key Statistics

\`\`\`python
#!/usr/bin/env python3
"""
Parse Prokka annotation statistics
"""
import sys
import pandas as pd
from pathlib import Path

def parse_prokka_stats(stats_file):
    """Extract statistics from Prokka .txt file"""
    stats = {}
    
    with open(stats_file) as f:
        for line in f:
            if ':' in line:
                key, value = line.strip().split(':', 1)
                stats[key.strip()] = value.strip()
    
    return stats

def main():
    # Collect all stats
    all_stats = []
    
    for stats_file in Path('results/annotation').rglob('*.txt'):
        sample_id = stats_file.parent.name
        stats = parse_prokka_stats(stats_file)
        stats['sample_id'] = sample_id
        all_stats.append(stats)
    
    # Create DataFrame
    df = pd.DataFrame(all_stats)
    
    # Calculate summary
    print("\\n=== Annotation Summary ===")
    print(f"Total genomes: {len(df)}")
    print(f"Avg genes: {df['CDS'].astype(int).mean():.0f}")
    print(f"Avg tRNAs: {df['tRNA'].astype(int).mean():.0f}")
    print(f"Avg rRNAs: {df['rRNA'].astype(int).mean():.0f}")
    
    # Save summary
    df.to_csv('results/annotation_summary.tsv', sep='\\t', index=False)
    print("\\nSaved: results/annotation_summary.tsv")

if __name__ == '__main__':
    main()
\`\`\`

## Expected Results

### Typical *E. coli* Annotation

For a ~5 Mb *E. coli* genome:
- **~4,500-5,000 genes** (CDS)
- **~70-80 tRNAs**
- **~20-25 rRNAs** (16S, 23S, 5S)
- **~1 tmRNA**
- **~85% coding density**

### Our Dataset (48 genomes)

Expected statistics:
- **Total genes**: ~230,000 (48 × ~4,800)
- **Annotation time**: ~8 hours (parallel, 48 genomes)
- **Disk space**: ~2.5 GB (annotations)
- **Unique proteins**: ~15,000-20,000 (after clustering)

## Quality Assessment

### Annotation QC Metrics

✅ **Good annotation:**
- Gene count: 4,500-5,500 for *E. coli*
- tRNA count: 70-90
- Complete rRNA operons (16S, 23S, 5S)
- Genome size: 4.5-5.5 Mb

⚠️ **Warning signs:**
- Gene count < 4,000 or > 6,000
- Missing rRNAs
- Low coding density (< 80%)
- Many hypothetical proteins (> 40%)

---

**Pro Tip**: Prokka uses genus-specific databases. Setting \`--genus Escherichia\` improves annotation accuracy by 10-15%!

**Next**: We'll add MLST typing to identify pandemic clones like ST131!
      `,
      codeExamples: [
        {
          title: 'Complete Prokka Module',
          language: 'nextflow',
          code: `// modules/prokka.nf

process PROKKA {
    tag "$sample_id"
    label 'process_medium'
    container 'staphb/prokka:1.14.6'
    publishDir "${params.outdir}/annotation/${sample_id}", mode: 'copy'
    
    input:
    tuple val(sample_id), path(genome)
    
    output:
    tuple val(sample_id), path("${sample_id}"), emit: dir
    path "${sample_id}/${sample_id}.txt", emit: stats
    path "${sample_id}/${sample_id}.gff", emit: gff
    path "${sample_id}/${sample_id}.gbk", emit: genbank
    path "${sample_id}/${sample_id}.faa", emit: proteins
    
    script:
    """
    prokka \\
        --outdir ${sample_id} \\
        --prefix ${sample_id} \\
        --kingdom Bacteria \\
        --genus Escherichia \\
        --species coli \\
        --strain ${sample_id} \\
        --cpus ${task.cpus} \\
        --force \\
        ${genome}
    
    echo "✓ Annotated ${sample_id}" > ${sample_id}.log
    cat ${sample_id}/${sample_id}.txt >> ${sample_id}.log
    """
}

workflow ANNOTATION {
    take:
    genomes
    
    main:
    PROKKA(genomes)
    
    emit:
    annotations = PROKKA.out.dir
    stats = PROKKA.out.stats
    gff = PROKKA.out.gff
}`,
          explanation: 'Production-ready Prokka module with multiple outputs and proper error handling'
        }
      ]
    },
    {
      id: 'mlst-amr',
      title: '4. MLST Typing & AMR Detection',
      content: `
# Part 3: MLST Typing & AMR Detection

## Multi-Locus Sequence Typing (MLST)

### What is MLST?

**MLST** identifies bacterial strains by sequencing **7 housekeeping genes**:

For *E. coli*:
1. **adk** - Adenylate kinase
2. **fumC** - Fumarate hydratase
3. **gyrB** - DNA gyrase
4. **icd** - Isocitrate dehydrogenase
5. **mdh** - Malate dehydrogenase
6. **purA** - Adenylosuccinate synthetase
7. **recA** - Recombinase A

Each gene gets an **allele number**, combination = **Sequence Type (ST)**

### The ST131 Pandemic Clone

**ST131** profile:
- adk(**53**) - fumC(**40**) - gyrB(**47**) - icd(**12**) - mdh(**17**) - purA(**13**) - recA(**7**)

**Why ST131 is dangerous:**
- 🌍 **Global spread** - Found on all continents
- 💊 **Multi-drug resistant** - Carries blaCTX-M-15 ESBL
- 🦠 **Highly virulent** - Enhanced pathogenicity
- 📈 **Increasing prevalence** - 20-40% of UPEC infections
- 🏥 **Hospital outbreaks** - Nosocomial transmission

### Our Dataset: Expected STs

Based on the paper (Aljohani et al., 2023):
- **ST131**: 18/48 (37.5%) - Pandemic clone
- **ST1193**: Novel in Saudi Arabia
- **ST73**: High virulence
- **ST127, ST95, ST69, ST10**: Other types

## Building the MLST Module

\`\`\`nextflow
process MLST {
    tag "$sample_id"
    label 'process_low'
    container 'staphb/mlst:2.23.0'
    publishDir "${params.outdir}/mlst", mode: 'copy'
    
    input:
    tuple val(sample_id), path(genome)
    
    output:
    tuple val(sample_id), path("${sample_id}_mlst.tsv"), emit: results
    path "${sample_id}_mlst.tsv", emit: tsv
    
    script:
    """
    mlst --scheme ecoli ${genome} > ${sample_id}_mlst.tsv
    
    # Log the ST
    ST=\$(cut -f3 ${sample_id}_mlst.tsv)
    echo "✓ ${sample_id}: Sequence Type = \$ST"
    """
}
\`\`\`

### MLST Output Format

\`\`\`
PNUECU09_contigs.fa    ecoli    131    53    40    47    12    17    13    7
PNUECU11_contigs.fa    ecoli    1193   6     40    47    13    23    13    7
RECU165_contigs.fa     ecoli    73     8     4     1     1     1     2     2
\`\`\`

Columns:
1. Filename
2. Scheme (ecoli)
3. **ST (Sequence Type)**
4-10. Allele numbers for 7 genes

## Antimicrobial Resistance (AMR) Detection

### Why AMR Matters

**Antibiotic resistance** is a global crisis:
- 💀 **700,000 deaths/year** worldwide
- 📈 **Projected 10 million by 2050** if unchecked
- 💰 **$100 billion economic burden**
- 🚨 **WHO priority pathogen** - ESBL-producing Enterobacteriaceae

### Key Resistance Genes in UPEC

#### 1. **β-Lactamases** - Resist penicillins, cephalosporins
- **blaCTX-M-15** - Most common ESBL in ST131
- **blaCTX-M-27** - Emerging ESBL variant
- **blaOXA** - Oxacillinase
- **blaTEM**, **blaSHV** - Broad-spectrum β-lactamases

#### 2. **Aminoglycoside Resistance**
- **aac(6')-Ib-cr** - Dual resistance (aminoglycosides + fluoroquinolones)
- **aadA**, **strA**, **strB** - Streptomycin resistance

#### 3. **Quinolone Resistance**
- **qnrA**, **qnrB**, **qnrS** - Plasmid-mediated
- **gyrA**, **parC** mutations - Chromosomal

#### 4. **Sulfonamide/Trimethoprim**
- **sul1**, **sul2**, **sul3** - Sulfonamide resistance
- **dfrA** - Trimethoprim resistance

## Building the AMR Module

\`\`\`nextflow
process ABRICATE_AMR {
    tag "$sample_id"
    label 'process_low'
    container 'staphb/abricate:1.0.1'
    publishDir "${params.outdir}/amr", mode: 'copy'
    
    input:
    tuple val(sample_id), path(genome)
    
    output:
    tuple val(sample_id), path("${sample_id}_amr.tsv"), emit: results
    path "${sample_id}_amr.tsv", emit: tsv
    
    script:
    """
    abricate --db ncbi ${genome} > ${sample_id}_amr.tsv
    
    # Count resistance genes
    COUNT=\$(tail -n +2 ${sample_id}_amr.tsv | wc -l)
    echo "✓ ${sample_id}: Found \$COUNT resistance genes"
    """
}
\`\`\`

### AMR Output Example

\`\`\`
#FILE          SEQUENCE    START  END    GENE         COVERAGE  IDENTITY  DATABASE
PNUECU09.fa   contig_1    1234   2456   blaCTX-M-15  100.00    99.92     ncbi
PNUECU09.fa   contig_3    5678   6789   aac(6')-Ib   98.50     100.00    ncbi
PNUECU09.fa   contig_5    9012   9876   qnrB         100.00    99.50     ncbi
\`\`\`

## Comprehensive Analysis Workflow

\`\`\`nextflow
include { MLST } from './modules/mlst'
include { ABRICATE_AMR } from './modules/abricate'

workflow TYPING_AND_RESISTANCE {
    take:
    genomes
    
    main:
    // Run MLST
    MLST(genomes)
    
    // Run AMR detection
    ABRICATE_AMR(genomes)
    
    // Combine results
    combined = MLST.out.results
        .join(ABRICATE_AMR.out.results)
        .map { sample_id, mlst, amr ->
            tuple(sample_id, mlst, amr)
        }
    
    emit:
    mlst = MLST.out.tsv
    amr = ABRICATE_AMR.out.tsv
    combined = combined
}
\`\`\`

## Results Aggregation

### Collect and Summarize

\`\`\`python
#!/usr/bin/env python3
"""
Aggregate MLST and AMR results
"""
import pandas as pd
from pathlib import Path
from collections import Counter

def parse_mlst_results(mlst_dir):
    """Parse all MLST results"""
    dfs = []
    for tsv in Path(mlst_dir).glob('*_mlst.tsv'):
        df = pd.read_csv(tsv, sep='\\t', header=None,
                         names=['file', 'scheme', 'ST', 'adk', 'fumC', 
                                'gyrB', 'icd', 'mdh', 'purA', 'recA'])
        dfs.append(df)
    return pd.concat(dfs, ignore_index=True)

def parse_amr_results(amr_dir):
    """Parse all AMR results"""
    dfs = []
    for tsv in Path(amr_dir).glob('*_amr.tsv'):
        df = pd.read_csv(tsv, sep='\\t')
        if not df.empty:
            dfs.append(df)
    return pd.concat(dfs, ignore_index=True) if dfs else pd.DataFrame()

def main():
    # Parse results
    mlst_df = parse_mlst_results('results/mlst')
    amr_df = parse_amr_results('results/amr')
    
    # MLST Summary
    print("\\n=== MLST Summary ===")
    st_counts = mlst_df['ST'].value_counts()
    for st, count in st_counts.items():
        pct = (count / len(mlst_df)) * 100
        print(f"ST{st}: {count}/{len(mlst_df)} ({pct:.1f}%)")
    
    # Highlight ST131
    st131_count = (mlst_df['ST'] == 131).sum()
    print(f"\\n🚨 ST131 Pandemic Clone: {st131_count} isolates")
    
    # AMR Summary
    print("\\n=== AMR Summary ===")
    gene_counts = amr_df['GENE'].value_counts()
    print(f"Total AMR genes detected: {len(amr_df)}")
    print(f"Unique AMR genes: {amr_df['GENE'].nunique()}")
    print("\\nTop 10 resistance genes:")
    for gene, count in gene_counts.head(10).items():
        pct = (count / len(mlst_df)) * 100
        print(f"  {gene}: {count} ({pct:.1f}%)")
    
    # ESBL Analysis
    esbl_genes = amr_df[amr_df['GENE'].str.contains('CTX-M|TEM|SHV', na=False)]
    esbl_samples = esbl_genes['#FILE'].unique()
    print(f"\\n🦠 ESBL-producing isolates: {len(esbl_samples)}/{len(mlst_df)}")
    
    # Save combined results
    summary = mlst_df.merge(
        amr_df.groupby('#FILE')['GENE'].apply(lambda x: ','.join(x)).reset_index(),
        left_on='file', right_on='#FILE', how='left'
    )
    summary.to_csv('results/combined_summary.tsv', sep='\\t', index=False)
    print("\\n✓ Saved: results/combined_summary.tsv")

if __name__ == '__main__':
    main()
\`\`\`

## Clinical Interpretation

### ST131 with blaCTX-M-15

**Clinical significance:**
- 🔴 **Treatment failure risk** - Resistant to 3rd-gen cephalosporins
- 📊 **Poor prognosis** - Higher mortality rates
- 🏥 **Infection control** - Requires isolation precautions
- 💊 **Treatment options**: Carbapenems (last resort)

### Multi-Drug Resistant (MDR) Definition

**MDR**: Resistant to ≥3 antibiotic classes

Common MDR profile in UPEC:
- β-lactams (blaCTX-M)
- Aminoglycosides (aac, aadA)
- Fluoroquinolones (qnr, gyrA mutations)
- Sulfonamides (sul)

---

**Up Next**: Virulence profiling and phylogenetic analysis!
      `,
      codeExamples: [
        {
          title: 'Complete MLST + AMR Workflow',
          language: 'nextflow',
          code: `// modules/typing.nf

process MLST {
    tag "$sample_id"
    container 'staphb/mlst:2.23.0'
    publishDir "${params.outdir}/mlst", mode: 'copy'
    
    input:
    tuple val(sample_id), path(genome)
    
    output:
    tuple val(sample_id), path("*.tsv"), emit: results
    
    script:
    """
    mlst --scheme ecoli ${genome} > ${sample_id}_mlst.tsv
    ST=\$(cut -f3 ${sample_id}_mlst.tsv)
    echo "✓ ${sample_id}: ST\$ST"
    """
}

process ABRICATE_AMR {
    tag "$sample_id"
    container 'staphb/abricate:1.0.1'
    publishDir "${params.outdir}/amr", mode: 'copy'
    
    input:
    tuple val(sample_id), path(genome)
    
    output:
    tuple val(sample_id), path("*.tsv"), emit: results
    
    script:
    """
    abricate --db ncbi --minid 80 --mincov 60 ${genome} > ${sample_id}_amr.tsv
    COUNT=\$(tail -n +2 ${sample_id}_amr.tsv | wc -l)
    echo "✓ ${sample_id}: \$COUNT AMR genes"
    """
}

workflow TYPING {
    take: genomes
    
    main:
    MLST(genomes)
    ABRICATE_AMR(genomes)
    
    emit:
    mlst = MLST.out.results
    amr = ABRICATE_AMR.out.results
}`,
          explanation: 'Production pipeline for MLST typing and AMR gene detection across all genomes'
        }
      ]
    }
  ],
  quiz: {
    title: 'Master Class Assessment',
    questions: [
      {
        id: 'q1',
        question: 'Why is Nextflow preferred over bash scripts for genomic pipelines?',
        options: [
          'Nextflow is faster at running individual tools',
          'Nextflow provides automatic parallelization, error recovery, and portability',
          'Nextflow is easier to learn than bash',
          'Nextflow requires less disk space'
        ],
        correctAnswer: 1,
        explanation: 'Nextflow DSL2 provides automatic parallelization, containerization, error recovery with retries, and portability across platforms - making it ideal for production genomics pipelines.'
      },
      {
        id: 'q2',
        question: 'What makes ST131 a pandemic clone?',
        options: [
          'It causes more severe symptoms than other E. coli',
          'It spreads globally, carries ESBLs (blaCTX-M-15), and is highly prevalent',
          'It was first discovered during a pandemic',
          'It only infects humans, not animals'
        ],
        correctAnswer: 1,
        explanation: 'ST131 is pandemic because it has spread globally since the 2000s, commonly carries the blaCTX-M-15 ESBL gene conferring multi-drug resistance, and represents 20-40% of UPEC infections worldwide.'
      },
      {
        id: 'q3',
        question: 'What is the primary advantage of using containerization (Docker/Singularity) in Nextflow?',
        options: [
          'Containers make the pipeline run faster',
          'Containers ensure exact tool versions and dependencies, guaranteeing reproducibility',
          'Containers reduce the file size of the pipeline',
          'Containers eliminate the need for a config file'
        ],
        correctAnswer: 1,
        explanation: 'Containers package exact tool versions with all dependencies, ensuring the pipeline produces identical results regardless of the computing environment - critical for reproducible research.'
      },
      {
        id: 'q4',
        question: 'In MLST typing, what defines a Sequence Type (ST)?',
        options: [
          'The number of resistance genes in the genome',
          'The combination of allele numbers from 7 housekeeping genes',
          'The total number of genes in the genome',
          'The GC content percentage'
        ],
        correctAnswer: 1,
        explanation: 'MLST types bacterial strains by sequencing 7 conserved housekeeping genes. Each unique combination of allele numbers defines a Sequence Type (ST), providing a standardized classification system.'
      },
      {
        id: 'q5',
        question: 'What does the blaCTX-M-15 gene confer?',
        options: [
          'Resistance to all antibiotics',
          'Extended-spectrum β-lactamase (ESBL) activity, resisting 3rd generation cephalosporins',
          'Increased virulence and toxin production',
          'Ability to form biofilms'
        ],
        correctAnswer: 1,
        explanation: 'blaCTX-M-15 encodes an Extended-Spectrum β-Lactamase (ESBL) that hydrolyzes 3rd generation cephalosporins (ceftriaxone, cefotaxime), a major class of antibiotics, making infections difficult to treat.'
      },
      {
        id: 'q6',
        question: 'Why is parallel execution critical for analyzing 48 genomes?',
        options: [
          'It prevents computer overheating',
          'It dramatically reduces analysis time from days to hours by processing multiple genomes simultaneously',
          'It makes the code easier to read',
          'It uses less total CPU time'
        ],
        correctAnswer: 1,
        explanation: 'Parallel execution processes multiple genomes concurrently. For 48 genomes taking 30 min each, serial execution = 24 hours, but with 16-core parallelization = ~1.5-2 hours.'
      },
      {
        id: 'q7',
        question: 'What is the clinical significance of identifying ESBL-producing UPEC?',
        options: [
          'ESBL strains are more contagious',
          'ESBL strains require different isolation procedures and limit treatment options to carbapenems',
          'ESBL strains cause kidney failure',
          'ESBL strains are not clinically significant'
        ],
        correctAnswer: 1,
        explanation: 'ESBL-producing bacteria are resistant to most β-lactam antibiotics, requiring isolation precautions and limiting treatment to carbapenems or other last-resort antibiotics, increasing mortality risk.'
      },
      {
        id: 'q8',
        question: 'What does Prokka annotation provide that is essential for downstream analysis?',
        options: [
          'DNA sequence quality scores',
          'Gene predictions with functional annotations, enabling AMR/virulence gene identification',
          'Patient clinical data',
          'Assembly statistics only'
        ],
        correctAnswer: 1,
        explanation: 'Prokka identifies genes and their functions, which is essential for AMR analysis (finding resistance genes), virulence profiling (identifying pathogenicity factors), and comparative genomics.'
      },
      {
        id: 'q9',
        question: 'Why is reproducibility critical in bioinformatics pipelines?',
        options: [
          'To make the code run faster',
          'To enable other scientists to verify results, meet publication standards, and ensure clinical validity',
          'To reduce file sizes',
          'To simplify the code'
        ],
        correctAnswer: 1,
        explanation: 'Reproducibility ensures scientific rigor - other researchers can verify findings, journals require it for publication, and clinical applications demand consistent, validated results for patient care decisions.'
      },
      {
        id: 'q10',
        question: 'What percentage of our dataset (48 genomes) is expected to be ST131 based on the paper?',
        options: [
          '10%',
          '25%',
          '37.5%',
          '50%'
        ],
        correctAnswer: 2,
        explanation: 'According to Aljohani et al. (2023), 18 out of 48 isolates (37.5%) were ST131, making it the most common sequence type in the study and reflecting its pandemic prevalence.'
      }
    ]
  }
};
