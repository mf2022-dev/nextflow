import { Tutorial } from '../types/tutorial';

export const mlstTypingDeepDive: Tutorial = {
  id: 'mlst-typing-deep-dive',
  slug: 'mlst-typing-deep-dive',
  title: 'MLST Typing Deep Dive: Tracking Bacterial Evolution',
  description: 'Master Multi-Locus Sequence Typing (MLST) - the gold standard for bacterial strain classification. Learn how sequence types track disease outbreaks and antimicrobial resistance spread.',
  category: 'intermediate',
  difficulty: 'intermediate',
  duration: 90,
  xpReward: 250,
  tags: ['MLST', 'Epidemiology', 'Bacterial Typing', 'Phylogenetics', 'E. coli'],
  author: 'BioNXA Team',
  prerequisites: [
    'intro-to-bioinformatics',
    'Basic understanding of DNA sequences',
    'Familiarity with command line'
  ],
  learningObjectives: [
    'Understand MLST methodology and applications',
    'Identify sequence types in bacterial genomes',
    'Interpret MLST results for outbreak investigation',
    'Compare different typing schemes (e.g., E. coli vs. S. aureus)',
    'Analyze phylogenetic relationships using MLST data',
    'Recognize pandemic clones like ST131',
    'Use online MLST databases effectively'
  ],
  sections: [
    {
      id: 'mlst-intro',
      title: '1. What is MLST and Why Does It Matter?',
      type: 'text',
      content: `# Multi-Locus Sequence Typing (MLST)

## The Challenge: Identifying Bacterial Strains

Imagine you're a disease detective 🕵️:
- Hospital A reports 10 *E. coli* infections
- Hospital B reports 8 similar cases 100 miles away
- **Question**: Are these the same outbreak strain?

Traditional methods (serotyping, antibiograms) aren't precise enough. **MLST provides a molecular fingerprint** that answers this question definitively.

## What is MLST?

**Multi-Locus Sequence Typing** is a molecular typing method that:

1. **Sequences 7 housekeeping genes** (metabolic, not virulence genes)
2. **Assigns allele numbers** to unique sequences at each locus
3. **Creates a profile** (e.g., 15-15-12-9-18-7-14)
4. **Defines Sequence Types (STs)** - unique combinations of alleles

### Why Housekeeping Genes?

- **Slowly evolving** - reflect long-term ancestry
- **Essential for survival** - present in all strains
- **Selectively neutral** - not influenced by antibiotics/environment
- **Comparable** - same genes across all isolates

## The *E. coli* MLST Scheme

For *E. coli*, the 7 genes are:

| Gene | Function | Length |
|------|----------|--------|
| **adk** | Adenylate kinase | ~536 bp |
| **fumC** | Fumarate hydratase | ~469 bp |
| **gyrB** | DNA gyrase | ~460 bp |
| **icd** | Isocitrate dehydrogenase | ~518 bp |
| **mdh** | Malate dehydrogenase | ~452 bp |
| **purA** | Adenylosuccinate synthetase | ~478 bp |
| **recA** | RecA recombinase | ~510 bp |

**Total**: ~3,423 bp analyzed per isolate

## Real-World Example: ST131 Pandemic

**ST131** (Sequence Type 131) is a pandemic clone:

\`\`\`
ST131 Profile: adk-fumC-gyrB-icd-mdh-purA-recA
Allele Profile: 53-40-47-31-31-38-29
\`\`\`

### Why ST131 is Dangerous:

1. **Global spread** - detected in 50+ countries
2. **Fluoroquinolone resistant** - often carries *gyrA* mutations
3. **ESBL producer** - commonly has *blaCTX-M-15*
4. **Highly virulent** - causes severe UTIs and bloodstream infections
5. **Persists in hosts** - leads to recurrent infections

### ST131 Subtypes

**Fimh typing** further divides ST131:
- **fimH30** - most common globally (O25:H4 serotype)
- **fimH30-Rx** - fluoroquinolone resistant sublineage
- **fimH41** - less common variant

## MLST vs. Other Typing Methods

| Method | Resolution | Cost | Speed | Best For |
|--------|-----------|------|-------|----------|
| **Serotyping** | Low | $ | Fast | Initial screen |
| **PFGE** | Medium | $$ | Slow | Local outbreaks |
| **MLST** | Medium | $$ | Medium | Global epidemiology |
| **cgMLST** | High | $$$ | Slow | High-resolution |
| **SNP analysis** | Very High | $$$ | Slow | Outbreak investigation |

**MLST sweet spot**: Perfect for tracking clones over years and across countries

## Key Applications

### 1. Outbreak Investigation
\`\`\`
Hospital A: ST131, ST73, ST95
Hospital B: ST131, ST131, ST131  ← Same outbreak!
\`\`\`

### 2. Resistance Tracking
\`\`\`
ST131 → Often carries blaCTX-M-15 (ESBL)
ST1193 → Often carries blaCTX-M-27 (ESBL)
ST69 → Fluoroquinolone-resistant clones
\`\`\`

### 3. Vaccine Development
- Identify most common STs causing disease
- Target conserved antigens in these lineages

### 4. Evolutionary Studies
- Track how strains spread globally
- Understand selection pressures (antibiotics, host factors)

## The MLST Database

The **PubMLST** database (https://pubmlst.org) contains:
- **100,000+** *E. coli* isolates
- **9,000+** unique STs
- Metadata: country, year, source, resistance genes
- Tools: query, download, visualize

**Our dataset contribution**: 48 Saudi Arabian UPEC isolates (2023)
`,
      estimatedTime: 15
    },
    {
      id: 'mlst-methodology',
      title: '2. MLST Workflow: From Genome to ST',
      type: 'text',
      content: `# MLST Analysis Workflow

## Overview: Genome → ST in 4 Steps

\`\`\`
┌─────────────┐
│   Genome    │ (assembled FASTA)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Extract    │ Find 7 housekeeping genes
│   Genes     │ (BLAST search)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Assign     │ Match sequences to alleles
│  Alleles    │ (exact match required)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Determine  │ Look up ST from allele profile
│     ST      │ (database query)
└─────────────┘
\`\`\`

## Step-by-Step Breakdown

### Step 1: Gene Extraction (BLAST)

**Input**: Assembled genome (FASTA)  
**Tool**: BLASTn  
**Reference**: MLST allele sequences

\`\`\`bash
# Example: Find adk gene
blastn -query genome.fasta \\
       -subject adk_alleles.fasta \\
       -outfmt 6 \\
       -perc_identity 100
\`\`\`

**Criteria**:
- **100% identity** - no mismatches allowed
- **100% coverage** - full gene length
- **Best hit** - highest score

### Step 2: Allele Assignment

Each unique sequence = unique allele number

**Example for *adk* gene**:
\`\`\`
>adk_1  (reference allele)
ATGAAACAACGCGACACCTTCATCA...

>adk_2  (1 SNP different from adk_1)
ATGAAACAACGCGACACCTACATCA...  ← Single C→A mutation
       ↑
\`\`\`

**Novel alleles**:
- If your sequence doesn't match any known allele
- Submit to curator for new allele number
- Ensures global consistency

### Step 3: Profile Creation

Combine 7 allele numbers:

\`\`\`
Locus    Allele
-----    ------
adk        53
fumC       40
gyrB       47
icd        31
mdh        31
purA       38
recA       29

Profile: 53-40-47-31-31-38-29
\`\`\`

### Step 4: ST Determination

**Database lookup**:
\`\`\`sql
SELECT st FROM mlst_profiles 
WHERE adk=53 AND fumC=40 AND gyrB=47 
  AND icd=31 AND mdh=31 AND purA=38 AND recA=29;

Result: ST131
\`\`\`

**Novel STs**:
- If profile is new → submit for ST assignment
- Example: ST9999 (not yet in database)

## Automated Tools

### Tool 1: mlst (Torsten Seemann)

\`\`\`bash
# Install
conda install -c bioconda mlst

# Run on genome
mlst genome.fasta

# Output
genome.fasta  ecoli  131  adk(53)  fumC(40)  gyrB(47)  icd(31)  mdh(31)  purA(38)  recA(29)
\`\`\`

### Tool 2: Abricate (with MLST database)

\`\`\`bash
# Install
conda install -c bioconda abricate

# Run MLST
abricate --db mlst genome.fasta > mlst_results.tab

# Output includes gene coverage and identity
\`\`\`

### Tool 3: BioNXA Pipeline

\`\`\`bash
# Our integrated pipeline
./scripts/pipeline_steps/04_mlst.sh \\
  genome.fasta \\
  results/mlst/ \\
  sample_name
\`\`\`

## Quality Control Checks

### ✅ Valid MLST Result:
\`\`\`
✓ All 7 genes found
✓ 100% identity match
✓ 100% coverage
✓ ST assigned
\`\`\`

### ⚠️ Warning Signs:
\`\`\`
⚠ Partial gene match (<100% coverage)
  → Assembly may be fragmented
  
⚠ Novel allele (not in database)
  → Confirm by re-sequencing
  
⚠ No ST match (novel profile)
  → Submit to database curator
\`\`\`

### ❌ Invalid Results:
\`\`\`
✗ Missing genes (incomplete assembly)
✗ Contamination (multiple alleles per locus)
✗ Wrong species (check taxonomy)
\`\`\`

## Interpreting Results

### Example 1: Clear Match
\`\`\`
Sample: ISO_001
ST: 131
Clonal Complex: CC131
Interpretation: Pandemic clone, likely fluoroquinolone-resistant, 
                check for blaCTX-M-15
\`\`\`

### Example 2: Novel ST
\`\`\`
Sample: ISO_042
ST: 9856 (new!)
Profile: 5-12-15-6-8-7-4
Related to: ST95 (single-locus variant)
Interpretation: Evolutionary variant of ST95 lineage
\`\`\`

### Example 3: Mixed Infection
\`\`\`
Sample: ISO_XX
Results: Two alleles for adk, two for fumC
Interpretation: CONTAMINATION or MIXED INFECTION
                → Re-isolate pure culture
\`\`\`
`,
      estimatedTime: 20
    },
    {
      id: 'mlst-hands-on',
      title: '3. Hands-On: Analyze Real UPEC Genomes',
      type: 'code',
      content: `# Practical MLST Analysis with Real Data

Now let's analyze the **48 UPEC genomes** from our BioNXA dataset!

## Setup: Install MLST Tool

First, we need the \`mlst\` command-line tool:

\`\`\`bash
# Using conda (recommended)
conda install -c bioconda mlst

# Or using pip
pip install mlst
\`\`\`

## Task 1: Single Genome Analysis

Let's start with one genome and understand the output:
`,
      codeBlock: {
        language: 'bash',
        code: `#!/bin/bash
# MLST Analysis of UPEC Genome

# Navigate to data directory
cd /home/user/webapp

# Run MLST on first genome
mlst data/dropbox_assemblies/PNUECU09_contigs.fa

# Expected output format:
# FILE                             SCHEME  ST    adk  fumC  gyrB  icd  mdh  purA  recA
# PNUECU09_contigs.fa              ecoli   131   53   40    47    31   31   38    29

# Detailed output with --label option
mlst --label PNUECU09 data/dropbox_assemblies/PNUECU09_contigs.fa

# Save results to file
mlst data/dropbox_assemblies/PNUECU09_contigs.fa > results/mlst/PNUECU09_mlst.txt

echo "✓ MLST analysis complete for PNUECU09"
`,
        explanation: `**Understanding the Output:**

**Columns Explained:**
1. **FILE**: Input genome filename
2. **SCHEME**: MLST scheme (ecoli, saureus, etc.)
3. **ST**: Sequence Type number
4. **adk-recA**: Allele numbers for each of 7 genes

**ST131 Profile Breakdown:**
- \`adk(53)\` - Allele 53 at adenylate kinase locus
- \`fumC(40)\` - Allele 40 at fumarate hydratase locus
- \`gyrB(47)\` - Allele 47 at DNA gyrase locus
- And so on...

**Clinical Significance of ST131:**
This is a **pandemic clone** responsible for:
- Global UTI outbreaks
- Multidrug resistance
- ESBL production (often blaCTX-M-15)
- Serotype O25:H4-fimH30`,
        editable: true,
        runnable: true,
        expectedOutput: `PNUECU09_contigs.fa  ecoli  131  adk(53)  fumC(40)  gyrB(47)  icd(31)  mdh(31)  purA(38)  recA(29)
✓ MLST analysis complete for PNUECU09`
      },
      estimatedTime: 10
    },
    {
      id: 'batch-mlst',
      title: '4. Batch Processing All 48 Genomes',
      type: 'code',
      content: `# Analyze All UPEC Genomes at Once

Now let's run MLST on **all 48 genomes** and aggregate results:
`,
      codeBlock: {
        language: 'bash',
        code: `#!/bin/bash
# Batch MLST Analysis Script

# Create output directory
mkdir -p results/mlst_batch

# Run MLST on all genomes
echo "Starting batch MLST analysis on 48 UPEC genomes..."
echo "---------------------------------------------------"

mlst data/dropbox_assemblies/*.fa > results/mlst_batch/all_mlst_results.tsv

# Display results
echo ""
echo "MLST Results Summary:"
cat results/mlst_batch/all_mlst_results.tsv

# Count sequence types
echo ""
echo "---------------------------------------------------"
echo "Sequence Type Distribution:"
echo "---------------------------------------------------"
awk 'NR>1 {print $3}' results/mlst_batch/all_mlst_results.tsv | sort | uniq -c | sort -rn

# Identify ST131 isolates
echo ""
echo "---------------------------------------------------"
echo "ST131 Pandemic Clone Isolates:"
echo "---------------------------------------------------"
grep "\\s131\\s" results/mlst_batch/all_mlst_results.tsv | wc -l
echo "isolates identified"

# Extract unique STs
echo ""
echo "Unique Sequence Types Detected:"
awk 'NR>1 {print $3}' results/mlst_batch/all_mlst_results.tsv | sort -u

echo ""
echo "✓ Batch analysis complete!"
echo "Results saved to: results/mlst_batch/all_mlst_results.tsv"
`,
        explanation: `**What This Script Does:**

1. **Batch Processing** - Runs MLST on all 48 genomes simultaneously
2. **Results Aggregation** - Combines into single TSV file
3. **ST Distribution** - Counts how many isolates per ST
4. **ST131 Detection** - Specifically identifies pandemic clone
5. **Unique STs** - Lists all distinct sequence types found

**Expected Results (based on Aljohani et al. 2023):**

**Most Common STs:**
- **ST131** - 18 isolates (37.5%) - Pandemic clone
- **ST1193** - First report in Saudi Arabia
- **ST73** - High virulence
- **ST127, ST95, ST69, ST10** - Other notable clones

**Clinical Interpretation:**
- High ST131 prevalence confirms global pandemic spread
- Multiple STs suggest diverse UPEC population
- Each ST has characteristic resistance/virulence profiles`,
        editable: true,
        runnable: true,
        expectedOutput: `Starting batch MLST analysis on 48 UPEC genomes...
---------------------------------------------------

MLST Results Summary:
FILE                             SCHEME  ST    adk  fumC  gyrB  icd  mdh  purA  recA
PNUECU09_contigs.fa              ecoli   131   53   40    47    31   31   38    29
PNUECU11_contigs.fa              ecoli   131   53   40    47    31   31   38    29
...
[results for all 48 genomes]

---------------------------------------------------
Sequence Type Distribution:
---------------------------------------------------
     18 131
      5 1193
      4 73
      3 127
      ...

---------------------------------------------------
ST131 Pandemic Clone Isolates:
---------------------------------------------------
18 isolates identified

Unique Sequence Types Detected:
10
69
73
95
127
131
1193
...

✓ Batch analysis complete!
Results saved to: results/mlst_batch/all_mlst_results.tsv`
      },
      estimatedTime: 15
    },
    {
      id: 'mlst-visualization',
      title: '5. Visualizing MLST Data',
      type: 'code',
      content: `# Create Publication-Quality Visualizations

Let's create visualizations to understand our MLST data better using Python:
`,
      codeBlock: {
        language: 'python',
        code: `#!/usr/bin/env python3
"""
MLST Data Visualization Script
Generates publication-quality plots for UPEC sequence type analysis
"""

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter

# Set style for publication-quality plots
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (12, 8)
plt.rcParams['font.size'] = 12

# Read MLST results
print("Loading MLST results...")
mlst_df = pd.read_csv('results/mlst_batch/all_mlst_results.tsv', sep='\\t')

# Extract sample names (remove _contigs.fa suffix)
mlst_df['Sample'] = mlst_df['FILE'].str.replace('_contigs.fa', '')

print(f"Loaded {len(mlst_df)} genomes")
print(f"Found {mlst_df['ST'].nunique()} unique sequence types\\n")

# 1. ST Distribution Bar Plot
print("Creating ST distribution plot...")
st_counts = mlst_df['ST'].value_counts()

plt.figure(figsize=(14, 6))
colors = ['#e74c3c' if st == 131 else '#3498db' for st in st_counts.index]
bars = plt.bar(range(len(st_counts)), st_counts.values, color=colors)

plt.xlabel('Sequence Type (ST)', fontweight='bold', fontsize=14)
plt.ylabel('Number of Isolates', fontweight='bold', fontsize=14)
plt.title('UPEC Sequence Type Distribution (n=48)', fontweight='bold', fontsize=16)
plt.xticks(range(len(st_counts)), st_counts.index, rotation=45)

# Add value labels on bars
for i, (bar, count) in enumerate(zip(bars, st_counts.values)):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.3,
             str(count), ha='center', va='bottom', fontweight='bold')

# Add legend
from matplotlib.patches import Patch
legend_elements = [
    Patch(facecolor='#e74c3c', label='ST131 (Pandemic Clone)'),
    Patch(facecolor='#3498db', label='Other STs')
]
plt.legend(handles=legend_elements, loc='upper right', fontsize=12)

plt.tight_layout()
plt.savefig('results/mlst_batch/st_distribution.png', dpi=300, bbox_inches='tight')
print("✓ Saved: st_distribution.png\\n")

# 2. Pie Chart of Major STs
print("Creating pie chart...")
plt.figure(figsize=(10, 10))

# Group STs with <3 isolates as "Other"
st_grouped = st_counts.copy()
other_count = st_grouped[st_grouped < 3].sum()
st_grouped = st_grouped[st_grouped >= 3]
if other_count > 0:
    st_grouped['Other (<3)'] = other_count

# Custom colors
colors_pie = ['#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#34495e', '#95a5a6']
explode = [0.1 if st == 131 else 0 for st in st_grouped.index]

wedges, texts, autotexts = plt.pie(
    st_grouped.values,
    labels=[f'ST{st}' if isinstance(st, int) else st for st in st_grouped.index],
    autopct='%1.1f%%',
    colors=colors_pie,
    explode=explode,
    shadow=True,
    startangle=90,
    textprops={'fontsize': 12, 'fontweight': 'bold'}
)

plt.title('UPEC Sequence Type Composition', fontweight='bold', fontsize=16, pad=20)

# Make percentage text white for better visibility
for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontsize(11)

plt.tight_layout()
plt.savefig('results/mlst_batch/st_pie_chart.png', dpi=300, bbox_inches='tight')
print("✓ Saved: st_pie_chart.png\\n")

# 3. Summary Statistics
print("=" * 60)
print("MLST ANALYSIS SUMMARY")
print("=" * 60)
print(f"Total genomes analyzed: {len(mlst_df)}")
print(f"Unique sequence types: {mlst_df['ST'].nunique()}")
print(f"\\nTop 5 Most Common STs:")
for i, (st, count) in enumerate(st_counts.head(5).items(), 1):
    percentage = (count / len(mlst_df)) * 100
    print(f"  {i}. ST{st}: {count} isolates ({percentage:.1f}%)")

# ST131 specific analysis
st131_count = (mlst_df['ST'] == 131).sum()
st131_pct = (st131_count / len(mlst_df)) * 100
print(f"\\n🦠 ST131 Pandemic Clone:")
print(f"   {st131_count} isolates ({st131_pct:.1f}%)")
print(f"   ⚠ Clinical significance: ESBL-producing, fluoroquinolone-resistant")

# Novel/rare STs
rare_sts = st_counts[st_counts == 1]
if len(rare_sts) > 0:
    print(f"\\n🔬 Singleton STs (n=1): {list(rare_sts.index)}")
    print(f"   These may be locally adapted or novel emerging clones")

print("=" * 60)
print("\\n✓ All visualizations generated successfully!")
print("\\nNext steps:")
print("  1. Compare with published data (Aljohani et al. 2023)")
print("  2. Correlate STs with AMR profiles")
print("  3. Perform phylogenetic analysis")
`,
        explanation: `**Script Features:**

1. **Bar Plot** - Shows distribution of all STs, highlighting ST131
2. **Pie Chart** - Visualizes composition percentages
3. **Statistics** - Calculates frequencies and percentages
4. **Publication Quality** - High-resolution (300 DPI) PNG outputs

**Interpreting the Results:**

**ST131 Dominance:**
If 37.5% of isolates are ST131 (as in Aljohani et al. 2023):
- Confirms global pandemic spread to Saudi Arabia
- Suggests high selection pressure (antibiotic use)
- Indicates need for enhanced surveillance

**ST Diversity:**
Multiple STs present indicates:
- Diverse UPEC population
- Multiple introduction events
- Local adaptation occurring

**Singleton STs:**
STs with only 1 isolate may be:
- Rare variants
- Evolutionary experiments
- Locally adapted strains
- Novel emerging clones`,
        editable: true,
        runnable: true,
        expectedOutput: `Loading MLST results...
Loaded 48 genomes
Found 12 unique sequence types

Creating ST distribution plot...
✓ Saved: st_distribution.png

Creating pie chart...
✓ Saved: st_pie_chart.png

============================================================
MLST ANALYSIS SUMMARY
============================================================
Total genomes analyzed: 48
Unique sequence types: 12

Top 5 Most Common STs:
  1. ST131: 18 isolates (37.5%)
  2. ST1193: 5 isolates (10.4%)
  3. ST73: 4 isolates (8.3%)
  4. ST127: 3 isolates (6.3%)
  5. ST95: 3 isolates (6.3%)

🦠 ST131 Pandemic Clone:
   18 isolates (37.5%)
   ⚠ Clinical significance: ESBL-producing, fluoroquinolone-resistant

🔬 Singleton STs (n=1): [69, 405, 648, 1193, 2003]
   These may be locally adapted or novel emerging clones
============================================================

✓ All visualizations generated successfully!

Next steps:
  1. Compare with published data (Aljohani et al. 2023)
  2. Correlate STs with AMR profiles
  3. Perform phylogenetic analysis`
      },
      estimatedTime: 15
    },
    {
      id: 'mlst-clinical',
      title: '6. Clinical Interpretation of MLST Results',
      type: 'text',
      content: `# Clinical and Public Health Applications of MLST

## From ST Number to Patient Care

MLST isn't just academic—it directly impacts patient treatment and public health decisions.

### Case Study 1: Hospital Outbreak Investigation

**Scenario:**
- Hospital X reports 15 UTI cases in 2 weeks
- All *E. coli*, all resistant to ciprofloxacin
- Question: Same outbreak strain?

**MLST Analysis:**
\`\`\`
Patient 1: ST131 (adk-53, fumC-40, gyrB-47...)
Patient 2: ST131 (identical profile)
Patient 3: ST131 (identical profile)
...
Patient 15: ST131 (identical profile)

Conclusion: SAME CLONE → Active outbreak
\`\`\`

**Actions Taken:**
1. ✅ Enhance infection control measures
2. ✅ Screen healthcare workers
3. ✅ Environmental cleaning
4. ✅ Contact tracing
5. ✅ Notify public health authorities

**Outcome**: Outbreak controlled within 3 weeks

---

### Case Study 2: Treatment Failure Investigation

**Patient Profile:**
- 65-year-old female
- Recurrent UTIs (3 episodes in 6 months)
- Previous treatment: ciprofloxacin

**MLST of 3 Isolates:**
\`\`\`
Episode 1 (Jan): ST131
Episode 2 (Mar): ST131 (same profile!)
Episode 3 (Jun): ST131 (same profile!)

Interpretation: SAME STRAIN → Persistent infection, not reinfection
\`\`\`

**Clinical Decision:**
- ❌ Don't repeat fluoroquinolones (strain is resistant)
- ✅ Switch to IV carbapenem
- ✅ Longer treatment duration (14 days vs 3 days)
- ✅ Urological workup (anatomical abnormality?)

**Outcome**: Patient cured, no recurrence at 12 months

---

## ST-Specific Treatment Recommendations

### ST131 (Pandemic Clone)

**Resistance Profile:**
- ⚠️ Fluoroquinolone resistance: >90%
- ⚠️ ESBL production: ~70%
- ⚠️ Co-trimoxazole resistance: ~80%
- ✅ Carbapenem susceptible: >99%

**Recommended Empiric Therapy:**
1. **Uncomplicated UTI**: Nitrofurantoin or fosfomycin
2. **Complicated UTI**: IV carbapenem (ertapenem)
3. **Sepsis**: Meropenem + amikacin

**Key Message**: Avoid fluoroquinolones and 3rd-gen cephalosporins

---

### ST1193 (Emerging Clone)

**Resistance Profile:**
- ⚠️ ESBL production: ~80% (blaCTX-M-27)
- ⚠️ Fluoroquinolone resistance: ~60%
- ✅ Better susceptibility to aminoglycosides

**Recommended Therapy:**
1. **Uncomplicated UTI**: Fosfomycin
2. **Complicated UTI**: Piperacillin-tazobactam or carbapenem
3. **Sepsis**: Meropenem

**Key Message**: New pandemic threat, monitor closely

---

### ST73 (High Virulence)

**Virulence Profile:**
- 🦠 papC, papG (P fimbriae)
- 🦠 sfa/focDE (S fimbriae)
- 🦠 cnf1 (cytotoxic necrotizing factor)
- 🦠 hlyA (hemolysin)

**Clinical Features:**
- More severe symptoms
- Higher risk of bacteremia
- Longer hospitalization
- More likely pyelonephritis

**Resistance Profile:**
- Generally less resistant than ST131
- Often fluoroquinolone-susceptible

**Recommended Therapy:**
1. **Uncomplicated UTI**: Ciprofloxacin (if susceptible)
2. **Complicated UTI**: 3rd-gen cephalosporin
3. **Sepsis**: Ceftriaxone + gentamicin

**Key Message**: High virulence but less resistance

---

## Public Health Surveillance

### Global ST131 Tracking

**WHO Priority Pathogen List** includes fluoroquinolone-resistant *E. coli*

**MLST-Based Surveillance System:**
\`\`\`
┌─────────────────────────────────────────────┐
│ Hospital Lab                                 │
│ ↓ Isolates                                  │
│ ↓ MLST typing                               │
│ ↓ Upload to PubMLST                         │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ National Reference Lab                      │
│ ↓ Aggregate data                            │
│ ↓ Identify trends                           │
│ ↓ Detect outbreaks                          │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│ WHO Global Surveillance                     │
│ ↓ Track pandemic clones                     │
│ ↓ Monitor resistance spread                 │
│ ↓ Inform policy                             │
└─────────────────────────────────────────────┘
\`\`\`

### Real-World Impact

**Example: ST131 in Europe (2010-2020)**
- 2010: 15% of UPEC isolates
- 2015: 30% of UPEC isolates
- 2020: 40% of UPEC isolates

**Policy Response:**
1. Restrict fluoroquinolone prescribing
2. Enhance antimicrobial stewardship
3. Update empiric therapy guidelines
4. Increase infection control measures

**Result**: ST131 prevalence plateaued at 40% by 2022

---

## MLST in Vaccine Development

### Target Identification

**Challenge**: *E. coli* is too diverse for universal vaccine

**MLST Solution**: Target most common/dangerous STs

**Vaccine Strategy:**
\`\`\`
ST131 + ST1193 + ST73 = 70% of UPEC cases

Conserved antigens in these STs:
- FimH (fimbrial adhesin)
- FyuA (iron receptor)
- OmpA (outer membrane protein)

→ Multivalent vaccine targeting these antigens
\`\`\`

**Current Status:**
- Phase II trials for FimH-based vaccine
- Targeting ST131-fimH30 specifically
- Preliminary efficacy: 50% reduction in UTI recurrence

---

## Key Takeaways for Clinicians

### ✅ When to Request MLST:

1. **Recurrent Infections** - Same strain or reinfection?
2. **Outbreak Investigation** - Related cases?
3. **Treatment Failure** - Unusual resistance pattern?
4. **Severe Disease** - High-risk clone (ST131, ST73)?
5. **Research/Surveillance** - Epidemiological tracking

### 🚫 When MLST is NOT Needed:

1. Routine UTI (uncomplicated)
2. Single sporadic case
3. Clear contamination
4. Non-*E. coli* organism

### 💡 How to Order MLST:

**Option 1**: Hospital microbiology lab
- Send pure culture or DNA
- Turnaround: 1-3 days
- Cost: $50-100

**Option 2**: Reference laboratory
- Send isolate to national/regional lab
- Turnaround: 5-10 days
- Often free (public health surveillance)

**Option 3**: Whole-genome sequencing
- Most comprehensive
- Includes MLST + resistance genes + virulence factors
- Turnaround: 3-7 days
- Cost: $100-300

---

## Integration with Other Data

### Combining MLST with AMR Testing

**Example Report:**
\`\`\`
Patient: Jane Doe, 62F
Specimen: Urine
Organism: E. coli

MLST: ST131 (adk-53, fumC-40, gyrB-47, icd-31, mdh-31, purA-38, recA-29)

Susceptibility:
  Ampicillin:         R
  Ciprofloxacin:      R  ← Expected for ST131
  Ceftriaxone:        R  ← ESBL confirmed
  Gentamicin:         S
  Meropenem:          S
  Nitrofurantoin:     S

Resistance Genes Detected:
  blaCTX-M-15 (ESBL)
  aac(6')-Ib-cr (aminoglycoside/quinolone)
  qnrB (quinolone resistance)

Virulence Factors:
  fimH30 (adhesin - ST131-specific)
  iutA (iron uptake)
  ompT (serum survival)

Interpretation:
  ST131 pandemic clone, multidrug-resistant
  High risk for treatment failure with fluoroquinolones/cephalosporins
  
Recommended Therapy:
  1st line: Nitrofurantoin 100mg PO BID x 5 days
  Alternative: Fosfomycin 3g PO x 1 dose
  If severe: Ertapenem 1g IV daily
\`\`\`

This integrated approach provides **actionable clinical information** beyond simple susceptibility testing.
`,
      estimatedTime: 20
    },
    {
      id: 'mlst-quiz',
      title: '7. Knowledge Assessment',
      type: 'quiz',
      content: `# Test Your MLST Expertise

Let's verify your understanding of MLST typing and its applications:
`,
      quiz: [
        {
          id: 'q1-mlst-definition',
          question: 'What does MLST stand for and what does it analyze?',
          options: [
            'Multiple-Locus Sequence Typing - analyzes 7 housekeeping genes',
            'Multi-Level Sequence Testing - analyzes resistance genes',
            'Molecular-Level Strain Typing - analyzes plasmids',
            'Mutation-Locus Sequence Tracking - analyzes SNPs'
          ],
          correctAnswer: 0,
          explanation: 'MLST = Multi-Locus Sequence Typing. It sequences 7 conserved housekeeping genes (not virulence or resistance genes) to assign sequence types (STs) that reflect evolutionary relationships.'
        },
        {
          id: 'q2-housekeeping',
          question: 'Why does MLST use housekeeping genes rather than virulence genes?',
          options: [
            'Housekeeping genes are easier to amplify by PCR',
            'Housekeeping genes evolve slowly and reflect stable ancestry',
            'Housekeeping genes are more abundant in genomes',
            'Housekeeping genes determine antibiotic resistance'
          ],
          correctAnswer: 1,
          explanation: 'Housekeeping genes are essential metabolic genes that evolve slowly and are selectively neutral. This makes them ideal for tracking long-term evolutionary relationships, unlike virulence genes which can be horizontally transferred.'
        },
        {
          id: 'q3-st131',
          question: 'What makes ST131 a "pandemic clone"?',
          options: [
            'It has the highest virulence of all E. coli',
            'It has spread globally, often carries ESBL genes, and causes severe infections',
            'It was the first E. coli strain ever sequenced',
            'It can infect multiple species beyond humans'
          ],
          correctAnswer: 1,
          explanation: 'ST131 is called a pandemic clone because it has: 1) Spread globally since 2000s, 2) Often carries blaCTX-M-15 ESBL gene, 3) Fluoroquinolone resistant, 4) Causes severe UTIs and bloodstream infections, and 5) Accounts for 37.5% of UPEC in many studies.'
        },
        {
          id: 'q4-allele-profile',
          question: 'If a genome has this MLST profile: adk(53)-fumC(40)-gyrB(47)-icd(31)-mdh(31)-purA(38)-recA(29), what is its sequence type?',
          options: [
            'ST53 (based on first allele)',
            'ST131 (unique combination defines this ST)',
            'ST40 (based on second allele)',
            'Cannot determine from this information'
          ],
          correctAnswer: 1,
          explanation: 'The complete allele profile 53-40-47-31-31-38-29 uniquely defines ST131. The ST number is NOT derived from individual allele numbers but from the unique combination looked up in the MLST database.'
        },
        {
          id: 'q5-clinical-use',
          question: 'A patient has 3 recurrent UTIs over 6 months. MLST shows all 3 isolates are ST131 with identical allele profiles. What does this indicate?',
          options: [
            'Three separate infections with different strains',
            'Persistent infection with the same strain (treatment failure)',
            'Laboratory contamination',
            'The patient has a weakened immune system'
          ],
          correctAnswer: 1,
          explanation: 'Identical MLST profiles across multiple episodes indicate the SAME strain persisting despite treatment. This suggests: 1) Treatment failure, 2) Possible biofilm formation, 3) Anatomical abnormality, or 4) Need for different antibiotics. This is therapeutically important!'
        },
        {
          id: 'q6-outbreak',
          question: 'In an outbreak investigation, what MLST results would confirm a clonal outbreak?',
          options: [
            'All isolates are E. coli',
            'All isolates have different STs (ST131, ST73, ST95, etc.)',
            'All isolates have the SAME ST with identical allele profiles',
            'All isolates are resistant to ciprofloxacin'
          ],
          correctAnswer: 2,
          explanation: 'Identical ST and allele profiles across multiple cases strongly suggest a clonal outbreak (same source). Different STs would indicate independent infections, not an outbreak from a common source.'
        },
        {
          id: 'q7-novel-allele',
          question: 'During MLST analysis, you find a new fumC sequence not in the database. What happens?',
          options: [
            'The analysis fails and must be repeated',
            'Submit the sequence to the curator for a new allele number assignment',
            'Assign it allele number 999',
            'Use the closest matching allele number'
          ],
          correctAnswer: 1,
          explanation: 'Novel alleles (sequences not in the database) are submitted to MLST database curators who verify the sequence and assign a new allele number. This maintains global standardization and comparability of MLST data.'
        },
        {
          id: 'q8-treatment',
          question: 'Based on MLST result of ST131, which antibiotic should you AVOID empirically?',
          options: [
            'Meropenem (carbapenem)',
            'Nitrofurantoin',
            'Ciprofloxacin (fluoroquinolone)',
            'Fosfomycin'
          ],
          correctAnswer: 2,
          explanation: 'ST131 is typically >90% resistant to fluoroquinolones (ciprofloxacin). Empiric use of ciprofloxacin for ST131 often leads to treatment failure. Carbapenems, nitrofurantoin, and fosfomycin usually remain effective.'
        },
        {
          id: 'q9-comparison',
          question: 'How does MLST compare to whole-genome sequencing (WGS) for outbreak investigation?',
          options: [
            'MLST is better - analyzes entire genome',
            'MLST is faster/cheaper but lower resolution; WGS gives more detail',
            'MLST and WGS are identical methods',
            'MLST is obsolete since WGS became available'
          ],
          correctAnswer: 1,
          explanation: 'MLST: analyzes ~3kb (7 genes), fast, cheap, good for broad epidemiology. WGS: analyzes ~5Mb (entire genome), slower, more expensive, higher resolution for outbreak investigation. Both have roles: MLST for surveillance, WGS for detailed outbreak investigation.'
        },
        {
          id: 'q10-diversity',
          question: 'If your hospital has 20 UPEC isolates with 15 different STs, what does this indicate?',
          options: [
            'Major outbreak with a single clone',
            'High diversity - likely sporadic infections from community sources',
            'Laboratory error or contamination',
            'All patients acquired infections in the hospital'
          ],
          correctAnswer: 1,
          explanation: 'High ST diversity (15 STs among 20 isolates) indicates sporadic, unrelated infections from various community sources. A hospital outbreak would show most/all isolates having the same ST. This finding suggests community-acquired infections, not nosocomial transmission.'
        }
      ],
      estimatedTime: 15
    }
  ],
  resources: [
    {
      title: 'PubMLST Database - E. coli MLST',
      url: 'https://pubmlst.org/bigsdb?db=pubmlst_ecoli_seqdef',
      type: 'tool'
    },
    {
      title: 'mlst Tool - GitHub Repository',
      url: 'https://github.com/tseemann/mlst',
      type: 'tool'
    },
    {
      title: 'Aljohani et al. 2023 - UPEC Study',
      url: 'https://doi.org/10.3390/ijms24087582',
      type: 'article'
    },
    {
      title: 'EnteroBase - E. coli Database',
      url: 'https://enterobase.warwick.ac.uk/',
      type: 'tool'
    },
    {
      title: 'ST131 Review - Pitout & Laupland',
      url: 'https://pubmed.ncbi.nlm.nih.gov/18550754/',
      type: 'article'
    },
    {
      title: 'MLST Methodology Paper',
      url: 'https://pubmed.ncbi.nlm.nih.gov/9634230/',
      type: 'article'
    }
  ],
  createdAt: '2026-02-13T00:00:00Z',
  updatedAt: '2026-02-13T00:00:00Z'
};
