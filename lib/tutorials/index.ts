import { Tutorial } from '@/lib/types/tutorial';
import { genomicCharacterizationUPEC } from './genomic-upec';

export const introToBioinformatics: Tutorial = {
  id: 'intro-to-bioinformatics',
  title: 'Introduction to Bioinformatics',
  slug: 'intro-to-bioinformatics',
  description: 'Learn the fundamentals of bioinformatics, including DNA structure, sequence analysis, and basic computational tools.',
  difficulty: 'beginner',
  category: 'Fundamentals',
  tags: ['DNA', 'Basics', 'Getting Started', 'Biology'],
  author: 'BioNXA Team',
  duration: 30,
  xpReward: 100,
  prerequisites: [],
  learningObjectives: [
    'Understand what bioinformatics is and why it matters',
    'Learn the structure of DNA and how it encodes information',
    'Analyze a simple DNA sequence using Python',
    'Calculate GC content of a DNA sequence',
    'Understand basic sequence analysis concepts'
  ],
  sections: [
    {
      id: 'section-1',
      title: 'What is Bioinformatics?',
      type: 'text',
      content: `# What is Bioinformatics?

**Bioinformatics** is the science of using computers to understand biological data. It sits at the intersection of biology, computer science, and statistics.

## Why Bioinformatics Matters

In the age of genomics, we're generating massive amounts of biological data:
- The human genome contains **3 billion base pairs**
- A single sequencing run can generate **terabytes of data**
- Understanding this data requires computational tools

## Real-World Applications

Bioinformatics is used in:
- 🧬 **Drug Discovery**: Finding new medicines by analyzing protein structures
- 🦠 **Disease Research**: Identifying genetic causes of diseases
- 🌾 **Agriculture**: Developing better crops through genetic analysis
- 🧪 **Personalized Medicine**: Tailoring treatments to individual genetics
- 🔬 **Evolutionary Biology**: Understanding how species evolved

## The Central Dogma

At the heart of bioinformatics is the **Central Dogma of Molecular Biology**:

\`\`\`
DNA → RNA → Protein
\`\`\`

This flow of genetic information is what we analyze computationally.`,
      estimatedTime: 5
    },
    {
      id: 'section-2',
      title: 'DNA: The Language of Life',
      type: 'text',
      content: `# DNA: The Language of Life

## Structure of DNA

DNA (Deoxyribonucleic Acid) is made up of four building blocks called **nucleotides**:

- **A** - Adenine
- **T** - Thymine
- **C** - Cytosine
- **G** - Guanine

## Base Pairing Rules

DNA forms a double helix where bases pair specifically:
- **A** pairs with **T**
- **C** pairs with **G**

This is called **complementary base pairing**.

## Example DNA Sequence

\`\`\`
5' - ATCGATCGATCG - 3'
3' - TAGCTAGCTAGC - 5'
\`\`\`

## What Does DNA Code For?

DNA sequences contain:
- **Genes**: Instructions for making proteins
- **Regulatory regions**: Control when genes are active
- **Non-coding regions**: Functions still being discovered

## A Simple Analogy

Think of DNA as a recipe book:
- The **alphabet** is A, T, C, G
- **Words** are codons (3 letters)
- **Sentences** are genes
- The **book** is the genome`,
      estimatedTime: 7
    },
    {
      id: 'section-3',
      title: 'Your First DNA Analysis',
      type: 'code',
      content: `# Let's Analyze DNA with Python!

Now it's time to get hands-on. We'll write a simple Python program to analyze a DNA sequence.

## Task: Count the Bases

Given a DNA sequence, let's count how many of each base (A, T, C, G) it contains.`,
      codeBlock: {
        language: 'python',
        code: `# DNA Sequence Analysis
def count_bases(dna_sequence):
    """
    Count the occurrence of each base in a DNA sequence
    
    Args:
        dna_sequence: String containing DNA sequence (A, T, C, G)
    
    Returns:
        Dictionary with counts of each base
    """
    # Initialize counters
    bases = {'A': 0, 'T': 0, 'C': 0, 'G': 0}
    
    # Count each base
    for base in dna_sequence.upper():
        if base in bases:
            bases[base] += 1
    
    return bases

# Example DNA sequence
my_sequence = "ATCGATCGATCG"

# Count the bases
result = count_bases(my_sequence)

# Display results
print("DNA Sequence:", my_sequence)
print("\\nBase Counts:")
for base, count in result.items():
    print(f"  {base}: {count}")

# Calculate total length
total = sum(result.values())
print(f"\\nTotal length: {total} base pairs")`,
        explanation: `**What this code does:**

1. **Function Definition**: We define \`count_bases()\` that takes a DNA sequence
2. **Initialize Counters**: Create a dictionary to store counts for each base
3. **Count Loop**: Go through each character in the sequence and count it
4. **Return Results**: Give back the counts as a dictionary

**Try modifying it:**
- Change \`my_sequence\` to analyze different DNA
- Add error handling for invalid bases
- Calculate percentages of each base`,
        editable: true,
        runnable: true,
        expectedOutput: `DNA Sequence: ATCGATCGATCG

Base Counts:
  A: 3
  T: 3
  C: 3
  G: 3

Total length: 12 base pairs`
      },
      estimatedTime: 10
    },
    {
      id: 'section-4',
      title: 'GC Content: An Important Metric',
      type: 'interactive',
      content: `# GC Content Analysis

## What is GC Content?

**GC content** is the percentage of bases that are either G or C in a DNA sequence.

## Why Does It Matter?

GC content tells us:
- **Stability**: G-C bonds are stronger than A-T bonds
- **Gene density**: Gene-rich regions often have higher GC content
- **Species characteristics**: Different organisms have different GC content ranges

## Formula

\`\`\`
GC Content (%) = (G + C) / (A + T + C + G) × 100
\`\`\`

## Example Calculation

For the sequence **ATCGATCGATCG**:
- G count: 3
- C count: 3
- Total bases: 12
- GC Content: (3 + 3) / 12 × 100 = **50%**

## Typical GC Content Ranges

- **Human genome**: ~41%
- **E. coli**: ~51%
- **Some bacteria**: 25-75%`,
      estimatedTime: 5
    },
    {
      id: 'section-5',
      title: 'Interactive Exercise: Calculate GC Content',
      type: 'code',
      content: `# Now You Try: Calculate GC Content

Complete the function below to calculate GC content of a DNA sequence.`,
      codeBlock: {
        language: 'python',
        code: `def calculate_gc_content(dna_sequence):
    """
    Calculate the GC content percentage of a DNA sequence
    
    Args:
        dna_sequence: String containing DNA sequence
    
    Returns:
        Float representing GC content as a percentage
    """
    # TODO: Your code here
    # Hint: Count G and C, divide by total length, multiply by 100
    
    pass  # Remove this and add your code

# Test your function
test_sequences = [
    "ATCGATCGATCG",
    "GGGGCCCC",
    "AAATTTAAA"
]

for seq in test_sequences:
    gc = calculate_gc_content(seq)
    print(f"Sequence: {seq}")
    print(f"GC Content: {gc:.2f}%")
    print()`,
        explanation: `**Your Task:**

1. Count how many G's are in the sequence
2. Count how many C's are in the sequence
3. Calculate total length of the sequence
4. Use the formula: (G + C) / Total × 100

**Solution Hint:**
\`\`\`python
g_count = dna_sequence.upper().count('G')
c_count = dna_sequence.upper().count('C')
total = len(dna_sequence)
return (g_count + c_count) / total * 100
\`\`\``,
        editable: true,
        runnable: true,
        expectedOutput: `Sequence: ATCGATCGATCG
GC Content: 50.00%

Sequence: GGGGCCCC
GC Content: 100.00%

Sequence: AAATTTAAA
GC Content: 0.00%`
      },
      estimatedTime: 8
    },
    {
      id: 'section-6',
      title: 'Knowledge Check',
      type: 'quiz',
      content: `# Test Your Understanding

Let's check what you've learned!`,
      quiz: [
        {
          id: 'q1',
          question: 'What are the four nucleotide bases in DNA?',
          options: [
            'A, T, C, G',
            'A, U, C, G',
            'A, T, X, Y',
            'A, B, C, D'
          ],
          correctAnswer: 0,
          explanation: 'DNA contains Adenine (A), Thymine (T), Cytosine (C), and Guanine (G). RNA uses Uracil (U) instead of Thymine.'
        },
        {
          id: 'q2',
          question: 'Which bases pair together in DNA?',
          options: [
            'A with C, T with G',
            'A with T, C with G',
            'A with G, C with T',
            'All bases pair with each other'
          ],
          correctAnswer: 1,
          explanation: 'A (Adenine) pairs with T (Thymine), and C (Cytosine) pairs with G (Guanine). This is called complementary base pairing.'
        },
        {
          id: 'q3',
          question: 'What does GC content measure?',
          options: [
            'The length of a DNA sequence',
            'The percentage of G and C bases in DNA',
            'The number of genes in DNA',
            'The speed of DNA replication'
          ],
          correctAnswer: 1,
          explanation: 'GC content is the percentage of bases that are either Guanine (G) or Cytosine (C) in a DNA sequence. It\'s an important characteristic of genomes.'
        },
        {
          id: 'q4',
          question: 'If a DNA sequence is "ATCG", what is its GC content?',
          options: [
            '25%',
            '50%',
            '75%',
            '100%'
          ],
          correctAnswer: 1,
          explanation: 'The sequence has 1 C and 1 G out of 4 total bases. GC content = (1+1)/4 × 100 = 50%.'
        },
        {
          id: 'q5',
          question: 'What is bioinformatics?',
          options: [
            'The study of computer hardware',
            'Using computers to analyze biological data',
            'The biology of information systems',
            'Creating biological computers'
          ],
          correctAnswer: 1,
          explanation: 'Bioinformatics is the application of computational tools and techniques to analyze and interpret biological data, especially large-scale genomic data.'
        }
      ],
      estimatedTime: 5
    }
  ],
  resources: [
    {
      title: 'NCBI - National Center for Biotechnology Information',
      url: 'https://www.ncbi.nlm.nih.gov/',
      type: 'tool'
    },
    {
      title: 'Biopython Documentation',
      url: 'https://biopython.org/',
      type: 'documentation'
    },
    {
      title: 'Rosalind - Bioinformatics Problems',
      url: 'http://rosalind.info/',
      type: 'tool'
    },
    {
      title: 'DNA Learning Center - DNA Structure',
      url: 'https://www.dnalc.org/',
      type: 'article'
    }
  ],
  createdAt: '2026-02-07T00:00:00Z',
  updatedAt: '2026-02-07T00:00:00Z'
};

// Export all tutorials
export const tutorials = [
  introToBioinformatics,
  genomicCharacterizationUPEC
];

// Helper to get tutorial by slug
export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return tutorials.find(t => t.slug === slug);
}

// Helper to get tutorials by difficulty
export function getTutorialsByDifficulty(difficulty: string): Tutorial[] {
  return tutorials.filter(t => t.difficulty === difficulty);
}

// Helper to get tutorials by category
export function getTutorialsByCategory(category: string): Tutorial[] {
  return tutorials.filter(t => t.category === category);
}
