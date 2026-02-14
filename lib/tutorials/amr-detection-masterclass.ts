import { Tutorial } from '../types/tutorial';

export const amrDetectionMasterclass: Tutorial = {
  id: 'amr-detection-masterclass',
  slug: 'amr-detection-masterclass',
  title: 'AMR Detection Masterclass: Finding Resistance Genes',
  description: 'Master antimicrobial resistance (AMR) gene detection using Abricate, AMRFinderPlus, and ResFinder. Learn to identify ESBL, carbapenemase, and other resistance mechanisms threatening global health.',
  category: 'intermediate',
  difficulty: 'intermediate',
  duration: 120,
  xpReward: 300,
  tags: ['AMR', 'Antibiotic Resistance', 'ESBL', 'Carbapenemase', 'Public Health', 'WHO Priority'],
  author: 'BioNXA Team',
  prerequisites: [
    'intro-to-bioinformatics',
    'genomic-characterization-upec',
    'Understanding of bacterial genetics'
  ],
  learningObjectives: [
    'Understand mechanisms of antibiotic resistance',
    'Detect resistance genes using Abricate and AMRFinderPlus',
    'Interpret WHO priority pathogen classifications',
    'Identify ESBL, carbapenemase, and plasmid-mediated resistance',
    'Connect genotype to phenotype (gene to resistance)',
    'Understand clinical implications for treatment',
    'Perform comparative AMR analysis across isolates'
  ],
  sections: [
    {
      id: 'amr-intro',
      title: '1. The Global AMR Crisis',
      type: 'text',
      content: `# Antimicrobial Resistance: A Global Emergency

## The Silent Pandemic

While COVID-19 dominated headlines, another pandemic has been silently killing:

### 🔴 AMR by the Numbers (2019 Data)

- **4.95 million deaths** associated with AMR
- **1.27 million deaths** directly caused by AMR
- **More deaths than HIV or malaria**
- **$100 billion** annual global healthcare costs
- **10 million projected deaths by 2050** if unchecked

Source: Lancet 2022 - Global burden of bacterial AMR

## What is Antimicrobial Resistance?

**AMR** occurs when bacteria evolve mechanisms to survive antibiotic exposure:

\`\`\`
Normal Bacteria → Antibiotic Exposure → Selection Pressure → Resistant Mutant → Population Shift
\`\`\`

### The Perfect Storm

Three factors accelerate AMR:

1. **Overuse** - Unnecessary prescriptions (50% inappropriate)
2. **Misuse** - Wrong antibiotic, wrong dose, incomplete course
3. **Agricultural Use** - 80% of antibiotics used in livestock

## Mechanisms of Resistance

### 1. β-Lactamases (Enzyme Production)

**Destroy the antibiotic before it acts**

\`\`\`
Penicillin → β-lactamase → Inactive Product
    ↓
 β-lactam ring broken
\`\`\`

**Major families**:
- **ESBLs** (Extended-Spectrum β-Lactamases) - CTX-M, TEM, SHV
- **AmpC** - Chromosomal and plasmid types
- **Carbapenemases** - KPC, NDM, OXA-48, VIM

### 2. Target Modification

**Change the drug target so it no longer binds**

**Examples**:
- **gyrA/parC** mutations → Fluoroquinolone resistance
- **rpoB** mutations → Rifampin resistance
- **PBP** alterations → Methicillin resistance (MRSA)

### 3. Efflux Pumps

**Pump the antibiotic out of the cell**

\`\`\`
Antibiotic enters → Efflux pump activates → Antibiotic expelled
       ↓                                            ↑
Internal concentration too low to kill
\`\`\`

**Example**: *acrAB-tolC* system (fluoroquinolones, tetracyclines)

### 4. Decreased Permeability

**Prevent antibiotic from entering the cell**

**Mechanisms**:
- Loss of porins (OmpF, OmpC)
- Membrane modifications
- Biofilm formation

### 5. Alternative Pathways

**Bypass the inhibited target**

**Example**: Sulfonamide resistance
- Bacteria acquire alternative DHPS enzyme
- Bypasses sulfonamide-inhibited pathway

## The WHO Priority Pathogens List

### Critical Priority (Urgent Need for New Antibiotics)

1. **Carbapenem-resistant *Acinetobacter baumannii***
2. **Carbapenem-resistant *Pseudomonas aeruginosa***  
3. **Carbapenem-resistant, ESBL-producing *Enterobacterales***
   - ⚠️ **Our focus: ESBL *E. coli* (UPEC)**

### High Priority

- Vancomycin-resistant *Enterococcus faecium*
- MRSA (*Staphylococcus aureus*)
- Fluoroquinolone-resistant *Salmonella*
- Fluoroquinolone-resistant *Neisseria gonorrhoeae*

### Medium Priority

- Macrolide-resistant *Streptococcus pneumoniae*
- Others

## ESBL-Producing *E. coli*: Our Case Study

### What are ESBLs?

**Extended-Spectrum β-Lactamases** hydrolyze:
- ✅ Penicillins (ampicillin, piperacillin)
- ✅ 3rd-generation cephalosporins (ceftriaxone, cefotaxime, ceftazidime)
- ✅ 4th-generation cephalosporins (cefepime)
- ❌ NOT carbapenems (meropenem, ertapenem) - still effective

### Most Common ESBLs in *E. coli*

#### 1. CTX-M Family

**blaCTX-M-15** - Most widespread globally
- Found in ST131 pandemic clone
- Preferentially hydrolyzes cefotaxime (CTX)
- Often on IncF plasmids (easily transferred)
- Associated with fluoroquinolone resistance

**blaCTX-M-27** - Emerging threat
- Found in ST131 fimH30 subclone
- Higher expression level
- Spreading rapidly in Asia and Europe

#### 2. SHV Family

**blaSHV-12** - Common in hospitals
- Derived from blaSHV-1 by mutation
- Often chromosomal in *Klebsiella*
- Plasmid-borne in *E. coli*

#### 3. TEM Family

**blaTEM-52** - Highly resistant
- Evolved from blaTEM-1
- Multiple mutations increase spectrum
- Resistant to some β-lactamase inhibitors

### Clinical Impact of ESBL-Producing UPEC

**Complications**:
- ❌ Treatment failures with cephalosporins
- ⚠️ Bacteremia (bloodstream infection) - 30% mortality
- 🏥 Longer hospital stays (average +6 days)
- 💰 Higher costs ($10,000+ per case)
- 🔁 Recurrent infections

**Limited Treatment Options**:
- Carbapenems (meropenem, ertapenem)
- Nitrofurantoin (UTI only)
- Fosfomycin (UTI only)
- Amikacin (severe infections)
- Tigecycline (alternative)

### Co-Resistance: The Real Danger

ESBL genes rarely travel alone:

\`\`\`
Plasmid carrying:
├── blaCTX-M-15 (ESBL)
├── aac(6')-Ib-cr (aminoglycoside + quinolone)
├── qnrB (fluoroquinolone)
├── sul1/2 (sulfonamide)
├── tet(A) (tetracycline)
└── dfrA (trimethoprim)

Result: Multidrug-resistant "superbug"
\`\`\`

### Our Dataset: What to Expect

Based on Aljohani et al. 2023 study:

**Resistance Genes Found**:
- **blaCTX-M-15** - 40% of isolates
- **blaCTX-M-27** - 15% of isolates
- **aac(6')-Ib-cr** - 60% (aminoglycoside/quinolone resistance)
- **qnrB, qnrS** - 45% (fluoroquinolone resistance)
- **sul1, sul2** - 70% (sulfonamide resistance)
- **tet(A), tet(B)** - 55% (tetracycline resistance)
- **dfrA** - 50% (trimethoprim resistance)

**Association with ST131**:
- 18/18 ST131 isolates carry ESBL
- Most have blaCTX-M-15
- All fluoroquinolone-resistant
- Median 6 resistance genes per isolate

## Why Genomic Surveillance Matters

### Traditional AST vs. Genomic AMR Detection

| Aspect | AST (Disk Diffusion) | Genomic Detection |
|--------|---------------------|-------------------|
| **Speed** | 18-24 hours | 8-12 hours |
| **Mechanism** | Unknown | Identified |
| **Transmission** | No info | Identifies outbreaks |
| **Prediction** | Current | Predicts future |
| **Cost** | $10-20 | $50-100 |

### What Genomics Adds:

1. **Mechanism identification** - Know WHY it's resistant
2. **Epidemic tracking** - Same gene = outbreak?
3. **Transmission prediction** - Plasmid vs. chromosomal?
4. **New variant detection** - Novel carbapenemases
5. **Treatment optimization** - Target-specific therapy

### Real-World Example: KPC Tracking

**2000**: First KPC-producing *K. pneumoniae* (USA)  
**2005**: Spread to Greece  
**2010**: Global pandemic  
**2015**: Detected in 60+ countries  

**Genomic surveillance** enabled:
- Early outbreak detection
- Transmission route mapping
- Infection control interventions
- Policy changes

**Result**: Contained (but not eliminated)

---

## Learning Goals for This Tutorial

By the end, you will:

✅ Run AMR detection tools (Abricate, AMRFinderPlus)  
✅ Interpret resistance gene results  
✅ Connect genes to antibiotic resistance phenotypes  
✅ Understand clinical treatment implications  
✅ Perform comparative AMR analysis on 48 UPEC genomes  
✅ Generate publication-quality AMR visualizations  
✅ Understand plasmid-mediated resistance mechanisms

Let's begin! 🧬
`,
      estimatedTime: 20
    },
    {
      id: 'amr-tools',
      title: '2. AMR Detection Tools and Databases',
      type: 'text',
      content: `# Tools for AMR Detection

## Three Gold-Standard Tools

### 1. Abricate (Torsten Seemann)

**Strengths**:
- ✅ Fast (seconds per genome)
- ✅ Multiple databases
- ✅ Easy to use
- ✅ BLAST-based (familiar)

**Best For**: Initial screening

\`\`\`bash
abricate --db ncbi genome.fasta
abricate --db resfinder genome.fasta
\`\`\`

---

### 2. NCBI AMRFinderPlus

**Strengths**:
- ✅ Official NCBI tool
- ✅ Curated database
- ✅ Gene + point mutations
- ✅ Species-specific

**Best For**: Comprehensive analysis

\`\`\`bash
amrfinder -n genome.fasta --organism Escherichia
\`\`\`

---

### 3. ResFinder (DTU, Denmark)

**Strengths**:
- ✅ Highly curated
- ✅ Phenotype prediction
- ✅ Web interface available
- ✅ Regularly updated

**Best For**: Clinical reports

---

## AMR Databases

### NCBI AMRFinder Database

**Content**:
- **5,000+ sequences**
- Covers all major resistance classes
- Includes point mutations (gyrA, parC, etc.)
- Updated monthly

**Gene Categories**:
\`\`\`
AMRFinderPlus Database Structure:
├── Beta-lactamases
│   ├── ESBLs (CTX-M, TEM, SHV, etc.)
│   ├── AmpC (CMY, DHA, etc.)
│   └── Carbapenemases (KPC, NDM, OXA, VIM, IMP)
├── Aminoglycoside resistance
│   ├── Acetyltransferases (aac)
│   ├── Phosphotransferases (aph)
│   └── Nucleotidyltransferases (ant)
├── Quinolone resistance
│   ├── qnr genes (qnrA, qnrB, qnrS)
│   ├── aac(6')-Ib-cr
│   └── Point mutations (gyrA, parC)
├── Tetracycline resistance
│   └── tet genes (tetA, tetB, tetM, etc.)
├── Sulfonamide resistance
│   └── sul genes (sul1, sul2, sul3)
├── Trimethoprim resistance
│   └── dfr genes (dfrA, dfrB)
├── Macrolide resistance
├── Chloramphenicol resistance
├── Glycopeptide resistance
└── Many others...
\`\`\`

### ResFinder Database

**Content**:
- **3,000+ sequences**
- Highly curated (manual curation)
- Focuses on acquired resistance
- Phenotype prediction

**Antibiotic Classes**:
\`\`\`
- Aminoglycosides
- Beta-lactams
- Colistin
- Fluoroquinolones
- Fosfomycin
- Fusidic acid
- Glycopeptides
- MLS (Macrolides, Lincosamides, Streptogramins)
- Nitroimidazoles
- Oxazolidinones
- Phenicols
- Rifampicin
- Sulphonamides
- Tetracyclines
- Trimethoprim
\`\`\`

### CARD (Comprehensive Antibiotic Resistance Database)

**Content**:
- **6,000+ sequences**
- Includes resistance mechanisms
- Ontology-based organization
- Research-focused

---

## Understanding Database Results

### Typical Abricate Output

\`\`\`
FILE         SEQUENCE  START   END     STRAND  GENE         COVERAGE  IDENTITY  DATABASE
genome.fa    contig_1  12500   13800   +       blaCTX-M-15  100.00    100.00    ncbi
genome.fa    contig_1  45600   46500   +       aac(6')-Ib-cr 100.00   99.78     ncbi
genome.fa    contig_2  5400    6300    -       qnrB1        100.00    100.00    ncbi
\`\`\`

**Column Interpretation**:

- **SEQUENCE**: Which contig contains the gene
- **START/END**: Genomic coordinates
- **STRAND**: + (forward) or - (reverse)
- **GENE**: Resistance gene name
- **COVERAGE**: % of reference gene found (100% = complete gene)
- **IDENTITY**: % sequence similarity (100% = perfect match)
- **DATABASE**: Which database matched

---

### Gene Nomenclature

#### β-Lactamases

**Format**: `bla` + `Family` + `-` + `Variant`

**Examples**:
- `blaCTX-M-15` = CTX-M family, variant 15
- `blaTEM-1` = TEM family, variant 1
- `blaSHV-12` = SHV family, variant 12
- `blaKPC-2` = KPC family, variant 2
- `blaNDM-1` = NDM family, variant 1
- `blaOXA-48` = OXA family, variant 48

#### Aminoglycoside Resistance

**Format**: `enzyme type` + `(number)` + `-` + `variant`

**Examples**:
- `aac(6')-Ib-cr` = Acetyltransferase, 6' position, variant Ib-cr
- `aph(3')-Ia` = Phosphotransferase, 3' position, variant Ia
- `ant(2")-Ia` = Nucleotidyltransferase, 2" position, variant Ia

**Enzyme types**:
- `aac` = N-Acetyltransferase
- `aph` = O-Phosphotransferase  
- `ant` = O-Nucleotidyltransferase

#### Quinolone Resistance

**Plasmid-mediated**:
- `qnrA`, `qnrB`, `qnrS` = Quinolone resistance proteins
- `aac(6')-Ib-cr` = Dual function (aminoglycoside + quinolone)

**Chromosomal mutations**:
- `gyrA` = DNA gyrase subunit A
- `gyrB` = DNA gyrase subunit B
- `parC` = Topoisomerase IV subunit
- `parE` = Topoisomerase IV subunit

#### Sulfonamide/Trimethoprim Resistance

- `sul1`, `sul2`, `sul3` = Sulfonamide resistance
- `dfrA1`, `dfrA5`, etc. = Dihydrofolate reductase (trimethoprim resistance)

#### Tetracycline Resistance

- `tet(A)` through `tet(Z)` = Efflux pumps or ribosomal protection
- `tet(M)` = Ribosomal protection protein (most common in Gram+)

---

## Quality Metrics

### ✅ High-Confidence Hit

\`\`\`
COVERAGE: 100%
IDENTITY: ≥99%
E-value: 0.0
Alignment: No gaps
\`\`\`

**Interpretation**: Gene definitely present

### ⚠️ Medium-Confidence Hit

\`\`\`
COVERAGE: 90-99%
IDENTITY: 95-99%
E-value: <1e-50
Alignment: Minor gaps
\`\`\`

**Interpretation**: Likely present, possibly truncated

### ❌ Low-Confidence Hit

\`\`\`
COVERAGE: <90%
IDENTITY: <95%
E-value: >1e-10
Alignment: Many gaps
\`\`\`

**Interpretation**: Possible homolog, not the target gene

---

## Gene-to-Phenotype Mapping

### Example: blaCTX-M-15

**Gene**: `blaCTX-M-15`

**Enzyme**: CTX-M-15 β-lactamase (ESBL)

**Mechanism**: Hydrolyzes β-lactam ring

**Phenotype**:
- ✅ Resistant: Ampicillin, amoxicillin
- ✅ Resistant: Cephalosporins (ceftriaxone, cefotaxime, ceftazidime)
- ⚠️ Variable: Cefepime (4th-gen cephalosporin)
- ❌ Susceptible: Carbapenems (meropenem, ertapenem)
- ❌ Susceptible: Cephamycins (cefoxitin)

**Inhibitors**:
- ⚠️ Partially inhibited by clavulanic acid
- ⚠️ Partially inhibited by tazobactam
- ❌ Not inhibited by avibactam (requires BLI combination)

---

### Example: aac(6')-Ib-cr

**Gene**: `aac(6')-Ib-cr`

**Enzyme**: Aminoglycoside acetyltransferase (cr = ciprofloxacin resistance variant)

**Mechanism**: Acetylates aminoglycosides AND quinolones

**Phenotype**:
- ✅ Resistant: Amikacin (moderate)
- ✅ Resistant: Tobramycin
- ⚠️ Variable: Gentamicin (low-level resistance)
- ✅ Resistant: Ciprofloxacin (low-level, but significant)

**Clinical Note**: 
- Often found with blaCTX-M-15 on same plasmid
- Reduces ciprofloxacin effectiveness
- Combined with gyrA mutations → high-level fluoroquinolone resistance

---

### Example: qnrB1

**Gene**: `qnrB1`

**Protein**: Quinolone resistance protein

**Mechanism**: Protects DNA gyrase from quinolone binding

**Phenotype**:
- ⚠️ Low-level resistance to fluoroquinolones
- Ciprofloxacin MIC: 0.125 → 0.5 μg/mL (4-fold increase)
- Often combined with gyrA mutations for high-level resistance

**Clinical Note**:
- Enables bacterial survival during quinolone exposure
- Allows time for chromosomal mutations (gyrA, parC) to emerge
- "Stepping stone" to high-level resistance

---

## Interpretation Guidelines

### Single Gene

\`\`\`
blaCTX-M-15 detected
→ ESBL producer
→ Resistant to 3rd-gen cephalosporins
→ Use carbapenem for severe infections
\`\`\`

### Multiple Co-Located Genes

\`\`\`
blaCTX-M-15 + aac(6')-Ib-cr + qnrB1
→ All on same plasmid (likely)
→ Multidrug-resistant
→ Horizontal transfer risk
→ Outbreak potential
\`\`\`

### Chromosome vs. Plasmid

**Indicators of plasmid-borne resistance**:
- Multiple resistance genes clustered together
- Genes on small contigs (plasmids often assemble separately)
- Presence of plasmid replication genes nearby
- Multiple resistance genes from different classes

**Why it matters**:
- Plasmid genes = highly transmissible
- Chromosome genes = clonal spread only
- Plasmids = infection control priority
`,
      estimatedTime: 20
    }
  ],
  resources: [
    {
      title: 'Abricate - GitHub',
      url: 'https://github.com/tseemann/abricate',
      type: 'tool'
    },
    {
      title: 'NCBI AMRFinderPlus',
      url: 'https://www.ncbi.nlm.nih.gov/pathogens/antimicrobial-resistance/AMRFinder/',
      type: 'tool'
    },
    {
      title: 'ResFinder Database',
      url: 'https://cge.food.dtu.dk/services/ResFinder/',
      type: 'tool'
    },
    {
      title: 'CARD Database',
      url: 'https://card.mcmaster.ca/',
      type: 'tool'
    },
    {
      title: 'WHO AMR Fact Sheet',
      url: 'https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance',
      type: 'article'
    },
    {
      title: 'Aljohani et al. 2023 - UPEC Study',
      url: 'https://doi.org/10.3390/ijms24087582',
      type: 'article'
    }
  ],
  createdAt: '2026-02-13T00:00:00Z',
  updatedAt: '2026-02-13T00:00:00Z'
};
