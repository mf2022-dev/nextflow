'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Upload, Play, Download, FileText, Database, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function PipelinePage() {
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalOutput]);

  useEffect(() => {
    // Initial welcome message
    const welcomeMsg = [
      '════════════════════════════════════════════════════════════════',
      '       BioNXA Genomic Analysis Pipeline v1.0',
      '       Based on: Aljohani et al., Int J Mol Sci. 2023',
      '════════════════════════════════════════════════════════════════',
      '',
      'Welcome to the BioNXA Interactive Bioinformatics Terminal!',
      '',
      'This pipeline implements the exact methodology from:',
      '"Genomic Characterization of Uropathogenic Escherichia coli',
      ' Isolates from Tertiary Hospitals in Riyadh, Saudi Arabia"',
      '',
      'Type "help" for available commands, or try these examples:',
      '  • ./scripts/upec_pipeline.sh --demo',
      '  • ./scripts/upec_pipeline.sh -s ISO_001_ST131',
      '  • ls data/fasta_files/',
      '',
      '════════════════════════════════════════════════════════════════',
      ''
    ];
    setTerminalOutput(welcomeMsg);
  }, []);

  const executeCommand = async (cmd: string) => {
    if (!cmd.trim()) return;

    const trimmedCmd = cmd.trim();
    setCommandHistory(prev => [...prev, trimmedCmd]);
    setTerminalOutput(prev => [...prev, `$ ${trimmedCmd}`, '']);
    setIsExecuting(true);

    try {
      // Simulate command execution for demonstration
      // In production, this would call a backend API
      await simulateCommandExecution(trimmedCmd);
    } catch (error) {
      setTerminalOutput(prev => [...prev, `Error: ${error}`, '']);
    } finally {
      setIsExecuting(false);
    }
  };

  const simulateCommandExecution = async (cmd: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (cmd === 'help') {
          setTerminalOutput(prev => [
            ...prev,
            '════════════════════════════════════════════════════════════════',
            'BioNXA Pipeline - Available Commands',
            '════════════════════════════════════════════════════════════════',
            '',
            'Pipeline Commands:',
            '  ./scripts/upec_pipeline.sh --demo',
            '      Run pipeline in demo mode with example data',
            '',
            '  ./scripts/upec_pipeline.sh -s SAMPLE_NAME',
            '      Analyze a specific sample from data/fasta_files/',
            '',
            '  ./scripts/upec_pipeline.sh --help',
            '      Show detailed pipeline usage and options',
            '',
            'File System Commands:',
            '  ls [directory]       List files in directory',
            '  cat [file]           Display file contents',
            '  pwd                  Print working directory',
            '',
            'Data Commands:',
            '  ls data/fasta_files/          List available FASTA files',
            '  ls data/results/              List analysis results',
            '  cat data/fasta_files/README.md   View FASTA documentation',
            '',
            'Examples:',
            '  ls data/fasta_files/',
            '  ./scripts/upec_pipeline.sh --demo',
            '  ./scripts/upec_pipeline.sh -s ISO_001_ST131',
            '  cat data/demo/results/demo_ecoli/summary_report.txt',
            '',
            '════════════════════════════════════════════════════════════════',
            ''
          ]);
        } else if (cmd.includes('upec_pipeline.sh --demo') || cmd.includes('upec_pipeline.sh -d')) {
          // Simulate demo pipeline execution
          const demoOutput = [
            '════════════════════════════════════════════════════════════════',
            '  BioNXA UPEC Genomic Analysis Pipeline v1.0',
            '  Based on Aljohani et al., 2023',
            '════════════════════════════════════════════════════════════════',
            '',
            '[2026-02-11 06:50:00] Running DEMO MODE',
            '[INFO] Using example E. coli genome for educational purposes',
            '[INFO] Demo FASTA file created: ./data/demo/demo_ecoli.fasta',
            '',
            '[2026-02-11 06:50:01] STEP 1: Quality Control (FastQC v0.11.8)',
            '[INFO] Input: ./data/demo/demo_ecoli.fasta',
            '[INFO] Output: ./data/demo/results/demo_ecoli/qc/',
            '[INFO] ✓ Quality control completed successfully',
            '[INFO]   Results: ./data/demo/results/demo_ecoli/qc/fastqc_summary.txt',
            '',
            '[2026-02-11 06:50:03] STEP 2: Genome Assembly (Unicycler v0.4.8)',
            '[INFO] Input: ./data/demo/demo_ecoli.fasta',
            '[INFO] Output: ./data/demo/results/demo_ecoli/assembly/',
            '[INFO] ✓ Assembly completed successfully',
            '[INFO]   Assembly size: 5050 bp',
            '[INFO]   Number of contigs: 1',
            '',
            '[2026-02-11 06:50:05] STEP 3: Genome Annotation (Prokka v1.14.6)',
            '[INFO] Input: ./data/demo/results/demo_ecoli/assembly/assembly.fasta',
            '[INFO] Output: ./data/demo/results/demo_ecoli/annotation/',
            '[INFO] ✓ Annotation completed successfully',
            '[INFO]   Predicted genes: 4,986',
            '',
            '[2026-02-11 06:50:08] STEP 4: Multilocus Sequence Typing (MLST)',
            '[INFO] Using Abricate v0.9.8 with mlst database',
            '[INFO] ✓ MLST analysis completed',
            '[INFO]   Sequence Type: ST131',
            '',
            '[2026-02-11 06:50:10] STEP 5: Antimicrobial Resistance (AMR) Gene Detection',
            '[INFO] Using Abricate v0.9.8 + NCBI AMRFinderPlus database',
            '[INFO] ✓ AMR gene detection completed',
            '[INFO]   Multidrug-resistant profile detected',
            '',
            '[2026-02-11 06:50:12] STEP 6: Virulence Factor Detection',
            '[INFO] Using Abricate v0.9.8 + VFDB database',
            '[INFO] ✓ Virulence factor detection completed',
            '[INFO]   UPEC pathotype confirmed',
            '',
            '[2026-02-11 06:50:14] STEP 7: Serotyping & FimH Typing',
            '[INFO] Using SerotypeFinder v1.0 and FimTyper v1.0 (CGE)',
            '[INFO] ✓ Serotyping completed',
            '[INFO]   Serotype: O25:H4-fimH30',
            '',
            '[2026-02-11 06:50:16] STEP 8: Phylogenetic Group Classification',
            '[INFO] Using Clermont Typing Tool',
            '[INFO] ✓ Phylogenetic grouping completed',
            '[INFO]   Phylogroup: B2',
            '',
            '[2026-02-11 06:50:18] Generating Final Summary Report',
            '[INFO] ✓ Summary report generated',
            '[INFO]   Location: ./data/demo/results/demo_ecoli/summary_report.txt',
            '',
            '════════════════════════════════════════════════════════════════',
            '  DEMO ANALYSIS COMPLETED SUCCESSFULLY!',
            '════════════════════════════════════════════════════════════════',
            '',
            'Results location: ./data/demo/results/demo_ecoli',
            '',
            'View the summary report:',
            '  cat ./data/demo/results/demo_ecoli/summary_report.txt',
            '',
            'View individual analysis results:',
            '  ls -la ./data/demo/results/demo_ecoli/',
            ''
          ];
          
          let currentLine = 0;
          const intervalId = setInterval(() => {
            if (currentLine < demoOutput.length) {
              setTerminalOutput(prev => [...prev, demoOutput[currentLine]]);
              currentLine++;
            } else {
              clearInterval(intervalId);
              resolve();
            }
          }, 50); // Stream output line by line
          
          return; // Exit early since we're handling resolution in the interval
        } else if (cmd === 'ls data/fasta_files/' || cmd === 'ls data/fasta_files') {
          setTerminalOutput(prev => [
            ...prev,
            'ISO_001_ST131.fasta',
            'ISO_003_ST1193.fasta',
            'README.md',
            ''
          ]);
        } else if (cmd === 'ls data/results/' || cmd === 'ls data/results') {
          setTerminalOutput(prev => [
            ...prev,
            'demo_ecoli/',
            ''
          ]);
        } else if (cmd === 'pwd') {
          setTerminalOutput(prev => [...prev, '/home/user/webapp', '']);
        } else if (cmd.startsWith('cat ') && cmd.includes('README')) {
          setTerminalOutput(prev => [
            ...prev,
            '# BioNXA FASTA Files',
            '',
            'This directory contains genome assembly files for UPEC isolates',
            'from the Aljohani et al. (2023) study.',
            '',
            '## Available Samples:',
            '',
            '- **ISO_001_ST131.fasta**: E. coli ST131 O25:H4-fimH30',
            '  - Pandemic clone, multidrug-resistant',
            '  - ESBL producer (blaCTX-M-15)',
            '  - Fluoroquinolone resistant',
            '',
            '- **ISO_003_ST1193.fasta**: E. coli ST1193 O75:H5-fimH64',
            '  - Emerging clone (first report in Saudi Arabia)',
            '  - ESBL producer',
            '  - High virulence potential',
            '',
            '## Usage:',
            '',
            'Run pipeline analysis:',
            '  ./scripts/upec_pipeline.sh -s ISO_001_ST131',
            '',
            'Or run demo mode:',
            '  ./scripts/upec_pipeline.sh --demo',
            '',
            '## Citation:',
            'Aljohani et al., Int J Mol Sci. 2023;24(8):7582',
            ''
          ]);
        } else if (cmd.includes('upec_pipeline.sh -s ISO_001_ST131')) {
          setTerminalOutput(prev => [
            ...prev,
            'Running analysis for ISO_001_ST131...',
            'This would execute the full pipeline on the selected sample.',
            'Results would be saved to: ./data/results/ISO_001_ST131/',
            ''
          ]);
        } else if (cmd.startsWith('ls')) {
          setTerminalOutput(prev => [
            ...prev,
            'app/  components/  data/  lib/  public/  scripts/',
            'package.json  tsconfig.json  README.md',
            ''
          ]);
        } else {
          setTerminalOutput(prev => [
            ...prev,
            `Command not found: ${cmd}`,
            'Type "help" for available commands.',
            ''
          ]);
        }
        resolve();
      }, 100);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isExecuting) {
      executeCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-blue-800/50 bg-black/30 backdrop-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Terminal className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold">BioNXA Genomic Analysis Pipeline</h1>
              <p className="text-sm text-blue-300">Interactive Bioinformatics Terminal</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar - Info cards */}
          <div className="space-y-6">
            {/* Pipeline Info */}
            <div className="bg-black/40 backdrop-blur border border-blue-800/50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Info className="h-5 w-5 text-blue-400" />
                <h2 className="text-lg font-semibold">Pipeline Info</h2>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <div>
                  <div className="font-semibold text-blue-300">Based on:</div>
                  <div>Aljohani et al., 2023</div>
                  <div className="text-xs text-gray-400">Int J Mol Sci. 24(8):7582</div>
                </div>
                <div>
                  <div className="font-semibold text-blue-300">Data Source:</div>
                  <div>NCBI BioProject PRJNA897916</div>
                  <div className="text-xs text-gray-400">48 ESBL-producing UPEC genomes</div>
                </div>
              </div>
            </div>

            {/* Analysis Steps */}
            <div className="bg-black/40 backdrop-blur border border-blue-800/50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-5 w-5 text-green-400" />
                <h2 className="text-lg font-semibold">Analysis Steps</h2>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { step: '1', name: 'Quality Control', tool: 'FastQC v0.11.8' },
                  { step: '2', name: 'Assembly', tool: 'Unicycler v0.4.8' },
                  { step: '3', name: 'Annotation', tool: 'Prokka v1.14.6' },
                  { step: '4', name: 'MLST Typing', tool: 'Abricate + mlst' },
                  { step: '5', name: 'AMR Detection', tool: 'AMRFinderPlus' },
                  { step: '6', name: 'Virulence Factors', tool: 'VFDB' },
                  { step: '7', name: 'Serotyping', tool: 'SerotypeFinder' },
                  { step: '8', name: 'Phylogroup', tool: 'Clermont' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-200">{item.name}</div>
                      <div className="text-xs text-gray-400">{item.tool}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Commands */}
            <div className="bg-black/40 backdrop-blur border border-blue-800/50 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-5 w-5 text-yellow-400" />
                <h2 className="text-lg font-semibold">Quick Commands</h2>
              </div>
              <div className="space-y-2 text-sm">
                <button
                  onClick={() => {
                    setCurrentCommand('./scripts/upec_pipeline.sh --demo');
                    setTimeout(() => executeCommand('./scripts/upec_pipeline.sh --demo'), 100);
                  }}
                  className="w-full text-left px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded transition-colors"
                  disabled={isExecuting}
                >
                  <div className="font-mono text-xs text-blue-300">Run Demo Mode</div>
                </button>
                <button
                  onClick={() => setCurrentCommand('ls data/fasta_files/')}
                  className="w-full text-left px-3 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded transition-colors"
                  disabled={isExecuting}
                >
                  <div className="font-mono text-xs text-green-300">List FASTA Files</div>
                </button>
                <button
                  onClick={() => setCurrentCommand('help')}
                  className="w-full text-left px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded transition-colors"
                  disabled={isExecuting}
                >
                  <div className="font-mono text-xs text-purple-300">Show Help</div>
                </button>
              </div>
            </div>
          </div>

          {/* Main terminal */}
          <div className="lg:col-span-2">
            <div className="bg-black/80 backdrop-blur border border-blue-800/50 rounded-lg overflow-hidden shadow-2xl">
              {/* Terminal header */}
              <div className="bg-gray-800/50 border-b border-gray-700 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-400 ml-2">
                  bash - BioNXA Pipeline Terminal
                </div>
              </div>

              {/* Terminal body */}
              <div className="p-4 h-[600px] overflow-y-auto font-mono text-sm" style={{ fontFamily: 'Courier New, monospace' }}>
                {terminalOutput.map((line, index) => (
                  <div
                    key={index}
                    className={
                      line.startsWith('$') ? 'text-green-400 font-bold' :
                      line.startsWith('[ERROR]') || line.startsWith('Error:') ? 'text-red-400' :
                      line.startsWith('[WARNING]') ? 'text-yellow-400' :
                      line.startsWith('[INFO]') ? 'text-blue-300' :
                      line.startsWith('[2026') ? 'text-green-300' :
                      line.includes('✓') || line.includes('PASS') || line.includes('SUCCESS') ? 'text-green-400' :
                      line.includes('════') ? 'text-blue-500' :
                      'text-gray-300'
                    }
                  >
                    {line || '\u00A0'}
                  </div>
                ))}
                {isExecuting && (
                  <div className="text-yellow-400 animate-pulse">
                    Executing...
                  </div>
                )}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal input */}
              <div className="bg-gray-900/50 border-t border-gray-700 px-4 py-3 flex items-center gap-2">
                <span className="text-green-400 font-bold">$</span>
                <input
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isExecuting}
                  placeholder="Type a command... (try 'help' or './scripts/upec_pipeline.sh --demo')"
                  className="flex-1 bg-transparent border-none outline-none text-gray-200 font-mono placeholder:text-gray-600"
                />
                {isExecuting && (
                  <div className="text-yellow-400 text-xs animate-pulse">
                    Running...
                  </div>
                )}
              </div>
            </div>

            {/* Educational note */}
            <div className="mt-4 bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <div className="font-semibold text-blue-300 mb-1">Educational Pipeline</div>
                  <p>
                    This is an interactive demonstration of a real bioinformatics pipeline based on
                    published research. In a production environment, commands would execute actual
                    bioinformatics tools (FastQC, Unicycler, Prokka, etc.) on real sequencing data.
                  </p>
                  <p className="mt-2">
                    The methodology follows exactly the workflow described in the Aljohani et al. (2023)
                    study of UPEC isolates from Saudi Arabia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
