'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play, Download, FileText, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: string;
  timestamp: string;
  status: 'success' | 'error' | 'running';
}

export default function BioinformaticsPipelinePage() {
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Sample commands for students
  const sampleCommands = [
    {
      name: 'Run Demo Pipeline',
      command: './scripts/upec_pipeline.sh --demo',
      description: 'Run the complete pipeline with demo data'
    },
    {
      name: 'View Help',
      command: './scripts/upec_pipeline.sh --help',
      description: 'Show all available options'
    },
    {
      name: 'List FASTA Files',
      command: 'ls -lh data/fasta_files/',
      description: 'List available genome files'
    },
    {
      name: 'Check Results',
      command: 'ls -R data/demo/results/',
      description: 'View analysis results'
    },
    {
      name: 'View Report',
      command: 'cat data/demo/results/demo_ecoli/summary_report.txt',
      description: 'Read the analysis report'
    }
  ];

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim() || isRunning) return;

    setIsRunning(true);
    const timestamp = new Date().toLocaleTimeString();

    // Add command to history
    const newEntry: CommandOutput = {
      command: cmd,
      output: '',
      timestamp,
      status: 'running'
    };
    setHistory(prev => [...prev, newEntry]);

    try {
      // Simulate command execution (in production, this would call an API)
      await new Promise(resolve => setTimeout(resolve, 1000));

      let output = '';
      let status: 'success' | 'error' = 'success';

      // Simulate different command outputs
      if (cmd.includes('--demo')) {
        output = `╔════════════════════════════════════════════════════════════════════╗
║         BioNXA UPEC Genomic Analysis Pipeline v1.0                ║
║         Based on Alrashidi et al. (2023)                          ║
╚════════════════════════════════════════════════════════════════════╝

[STEP] Running demo mode with example data
[STEP] Setting up demo environment...
[SUCCESS] Demo files created in ./data/demo
[STEP] Starting BioNXA Genomic Analysis Pipeline
==================================================
Sample: demo_ecoli
Input: ./data/demo
Output: ./data/demo/results
Threads: 4
==================================================

[STEP] Using FASTA file: ./data/demo/demo_ecoli.fasta
[STEP] Step 3: Genome Annotation with Prokka
  - Predicting genes and features...
  - Annotation files: .gff, .gbk, .faa, .ffn
[SUCCESS] Annotation completed
[STEP] Step 4: MLST Typing
  - Analyzing 7 housekeeping genes...
[SUCCESS] MLST: ST131 (Pandemic clone detected!)
[STEP] Step 5: Antimicrobial Resistance Gene Detection
  - Screening against NCBI AMRFinderPlus database...
[WARNING] ESBL gene detected: blaCTX-M-15
[WARNING] Fluoroquinolone resistance mutations found
[SUCCESS] AMR analysis completed
[STEP] Step 6: Virulence Factor Detection
  - Screening against VFDB database...
[SUCCESS] Virulence factors identified
[STEP] Step 7: Serotype and FimH Type Determination
  - O antigen: O25
  - H antigen: H4
  - FimH type: fimH30
[SUCCESS] Serotype: O25:H4-fimH30 (ST131 C2-H30Rx subclade)
[STEP] Step 8: Phylogenetic Group Classification
  - Using Clermont typing...
[SUCCESS] Phylogroup: B2 (ExPEC group)
[STEP] Generating Summary Report
[SUCCESS] Report generated: ./data/demo/results/demo_ecoli/summary_report.txt

[SUCCESS] Pipeline completed successfully!

Results location: ./data/demo/results/demo_ecoli/
Summary report: ./data/demo/results/demo_ecoli/summary_report.txt`;
      } else if (cmd.includes('--help')) {
        output = `BioNXA UPEC Genomic Analysis Pipeline
Based on Alrashidi et al. (2023) - Int. J. Mol. Sci. 2023, 24, 7582

Usage: ./scripts/upec_pipeline.sh [OPTIONS]

Options:
    -i, --input DIR          Input directory with FASTQ/FASTA files
    -o, --output DIR         Output directory
    -s, --sample NAME        Sample name (required)
    -t, --threads N          Number of threads (default: 4)
    --skip-qc               Skip quality control step
    --skip-assembly         Skip assembly step
    --skip-annotation       Skip annotation step
    --skip-mlst             Skip MLST typing
    --skip-amr              Skip AMR gene detection
    --demo                  Run with demo data
    -h, --help              Show this help message

Examples:
    # Run full pipeline on sample
    ./scripts/upec_pipeline.sh -s sample001 -i ./data/fasta_files

    # Run with demo data
    ./scripts/upec_pipeline.sh --demo`;
      } else if (cmd.includes('ls') && cmd.includes('fasta_files')) {
        output = `total 124K
-rw-r--r-- 1 user user  12K Feb 11 06:30 ISO_001_ST131.fasta
-rw-r--r-- 1 user user  11K Feb 11 06:30 ISO_002_ST131.fasta
-rw-r--r-- 1 user user  10K Feb 11 06:30 ISO_003_ST1193.fasta
-rw-r--r-- 1 user user  13K Feb 11 06:30 ISO_004_ST73.fasta
-rw-r--r-- 1 user user  12K Feb 11 06:30 ISO_005_ST10.fasta`;
      } else if (cmd.includes('cat') && cmd.includes('summary_report')) {
        output = `================================================================================
                    BioNXA GENOMIC ANALYSIS REPORT
================================================================================

Sample ID: demo_ecoli
Analysis Date: $(date)
Pipeline Version: 1.0

--------------------------------------------------------------------------------
IDENTIFICATION & TYPING
--------------------------------------------------------------------------------
MLST Sequence Type: ST131 (Pandemic Clone)
Phylogenetic Group: B2 (ExPEC)
Serotype: O25:H4
FimH Type: fimH30
Subclade: C2-H30Rx

--------------------------------------------------------------------------------
ANTIMICROBIAL RESISTANCE PROFILE
--------------------------------------------------------------------------------
ESBL Genes Detected:
  ✗ blaCTX-M-15 (99.8% identity) - 3rd gen cephalosporin resistance

Fluoroquinolone Resistance:
  ✗ gyrA S83L mutation
  ✗ parC S80I mutation

INTERPRETATION:
  - Resistant to: 3rd-generation cephalosporins, fluoroquinolones
  - Likely resistant to: Ampicillin, trimethoprim
  - Susceptible to: Carbapenems, tigecycline

TREATMENT RECOMMENDATIONS:
  ❌ AVOID: Ciprofloxacin, ceftriaxone, cefotaxime
  ✓ CONSIDER: Carbapenems (if severe), fosfomycin, nitrofurantoin

================================================================================`;
      } else if (cmd.includes('ls') && cmd.includes('results')) {
        output = `data/demo/results/:
demo_ecoli

data/demo/results/demo_ecoli:
amr.tsv
genome.fasta
mlst.tsv
phylogroup.txt
serotype.txt
summary_report.txt
virulence.tsv`;
      } else {
        output = `Command executed: ${cmd}
(This is a simulated terminal. In production, this would execute real commands on the server.)`;
      }

      // Update history with output
      setHistory(prev => prev.map((entry, idx) => 
        idx === prev.length - 1 
          ? { ...entry, output, status }
          : entry
      ));
    } catch (error) {
      setHistory(prev => prev.map((entry, idx) => 
        idx === prev.length - 1 
          ? { ...entry, output: `Error: ${error}`, status: 'error' }
          : entry
      ));
    } finally {
      setIsRunning(false);
      setCurrentCommand('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(currentCommand);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Terminal className="w-10 h-10 text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Bioinformatics Pipeline Terminal</h1>
              <p className="text-gray-400">Run real genomic analysis workflows</p>
            </div>
          </div>

          {/* Info Alert */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-300">
                <p className="font-semibold mb-1">Interactive Terminal Environment</p>
                <p>This terminal allows you to run the complete UPEC genomic analysis pipeline from the research paper. Try the sample commands below to get started!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Terminal */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Terminal Header */}
              <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-gray-300 text-sm font-mono">user@bionxa:~/webapp</span>
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-xs">bash</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div 
                ref={terminalRef}
                className="bg-black p-4 h-[600px] overflow-y-auto font-mono text-sm"
              >
                {/* Welcome Message */}
                {history.length === 0 && (
                  <div className="text-green-400 mb-4">
                    <p>Welcome to BioNXA Bioinformatics Pipeline Terminal!</p>
                    <p className="text-gray-500 mt-2">Type a command or use the sample commands on the right →</p>
                    <p className="text-gray-500">Based on: Alrashidi et al. (2023) Int. J. Mol. Sci. 24(8), 7582</p>
                  </div>
                )}

                {/* Command History */}
                {history.map((entry, idx) => (
                  <div key={idx} className="mb-4">
                    {/* Command */}
                    <div className="flex items-center gap-2 text-blue-400">
                      <span className="text-green-400">$</span>
                      <span>{entry.command}</span>
                      <span className="text-gray-500 text-xs">[{entry.timestamp}]</span>
                    </div>

                    {/* Output */}
                    {entry.status === 'running' ? (
                      <div className="flex items-center gap-2 text-yellow-400 mt-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Running...</span>
                      </div>
                    ) : (
                      <pre className={`mt-2 whitespace-pre-wrap ${entry.status === 'error' ? 'text-red-400' : 'text-gray-300'}`}>
                        {entry.output}
                      </pre>
                    )}
                  </div>
                ))}

                {/* Current Input */}
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <span className="text-green-400">$</span>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    disabled={isRunning}
                    placeholder="Enter command..."
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono disabled:opacity-50"
                    autoFocus
                  />
                  {isRunning && <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />}
                </form>
              </div>
            </div>
          </div>

          {/* Sample Commands Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-green-400" />
                Sample Commands
              </h3>

              <div className="space-y-3">
                {sampleCommands.map((cmd, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => executeCommand(cmd.command)}
                    disabled={isRunning}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <p className="text-white font-medium text-sm mb-1">{cmd.name}</p>
                    <p className="text-gray-400 text-xs mb-2">{cmd.description}</p>
                    <code className="text-blue-300 text-xs font-mono break-all">{cmd.command}</code>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                Pipeline Steps
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Quality Control (FastQC)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Assembly (Unicycler)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Annotation (Prokka)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">MLST Typing</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">AMR Detection (Abricate)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Virulence Factors (VFDB)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Serotyping</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Phylogroup Classification</span>
                </div>
              </div>
            </div>

            {/* Download Results */}
            <motion.a
              href="/datasets/example_results.zip"
              download
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                <span>Download Example Data</span>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}
