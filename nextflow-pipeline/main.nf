#!/usr/bin/env nextflow

/*
========================================================================================
    BioNXA UPEC Genomics Pipeline - Nextflow Implementation
========================================================================================
    Author: BioNXA Team
    Reference: Aljohani et al., Int J Mol Sci. 2023
    BioProject: PRJNA897916
    Description: Production-grade pipeline for UPEC genomic characterization
========================================================================================
*/

nextflow.enable.dsl = 2

// Pipeline information
log.info """\
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║         BioNXA UPEC Genomics Pipeline v1.0               ║
    ║         Nextflow-based Automated Analysis                ║
    ║                                                           ║
    ║         Reference: Aljohani et al., IJMS 2023            ║
    ║         BioProject: PRJNA897916                          ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
    
    Pipeline Configuration:
    ══════════════════════════════════════════════════════════
    Genomes          : ${params.genomes}
    Output directory : ${params.outdir}
    Max CPUs         : ${params.max_cpus}
    Max Memory       : ${params.max_memory}
    Max Time         : ${params.max_time}
    ══════════════════════════════════════════════════════════
    
    Workflow Steps:
    1. Prokka Annotation
    2. MLST Typing
    3. AMR Detection (Abricate + NCBI)
    4. Virulence Detection (VFDB)
    5. Results Aggregation
    6. Visualization & Reporting
    ══════════════════════════════════════════════════════════
    """
    .stripIndent()

/*
========================================================================================
    INCLUDE MODULES
========================================================================================
*/

include { PROKKA               } from './modules/prokka'
include { MLST                 } from './modules/mlst'
include { ABRICATE_AMR         } from './modules/abricate'
include { ABRICATE_VIRULENCE   } from './modules/abricate'
include { AGGREGATE_RESULTS    } from './modules/aggregation'
include { GENERATE_REPORT      } from './modules/reporting'

/*
========================================================================================
    WORKFLOW
========================================================================================
*/

workflow {
    // Create input channel from genome files
    genomes_ch = Channel
        .fromPath(params.genomes)
        .map { file -> 
            def sample_id = file.baseName.replaceAll('_contigs', '')
            tuple(sample_id, file)
        }
    
    // Log number of genomes found
    genomes_ch.count().view { count -> 
        "\n✓ Found ${count} genomes to process\n" 
    }
    
    // Step 1: Genome Annotation with Prokka
    PROKKA(genomes_ch)
    
    // Step 2: MLST Typing
    MLST(genomes_ch)
    
    // Step 3: AMR Detection
    ABRICATE_AMR(genomes_ch)
    
    // Step 4: Virulence Factor Detection
    ABRICATE_VIRULENCE(genomes_ch)
    
    // Step 5: Aggregate all results
    AGGREGATE_RESULTS(
        PROKKA.out.stats.collect(),
        MLST.out.tsv.collect(),
        ABRICATE_AMR.out.tsv.collect(),
        ABRICATE_VIRULENCE.out.tsv.collect()
    )
    
    // Step 6: Generate final report
    GENERATE_REPORT(
        AGGREGATE_RESULTS.out.summary
    )
}

workflow.onComplete {
    log.info """\
        ╔═══════════════════════════════════════════════════════════╗
        ║                                                           ║
        ║              Pipeline Execution Complete!                 ║
        ║                                                           ║
        ╚═══════════════════════════════════════════════════════════╝
        
        Status      : ${workflow.success ? '✓ SUCCESS' : '✗ FAILED'}
        Duration    : ${workflow.duration}
        Results     : ${params.outdir}
        Report      : ${params.outdir}/bionxa_report.html
        
        Summary Statistics:
        ══════════════════════════════════════════════════════════
        - Genomes analyzed: ${workflow.success ? 'All completed' : 'Some failed'}
        - MLST results: ${params.outdir}/mlst/
        - AMR results: ${params.outdir}/amr/
        - Virulence results: ${params.outdir}/virulence/
        - Annotations: ${params.outdir}/annotation/
        ══════════════════════════════════════════════════════════
        
        ${workflow.success ? 
          '✅ All analyses completed successfully!' : 
          '⚠️  Some processes failed. Check work/ directory for details.'
        }
        """
        .stripIndent()
}

workflow.onError {
    log.error """\
        ╔═══════════════════════════════════════════════════════════╗
        ║                                                           ║
        ║                  Pipeline Failed!                         ║
        ║                                                           ║
        ╚═══════════════════════════════════════════════════════════╝
        
        Error: ${workflow.errorMessage}
        
        Troubleshooting:
        - Check work/ directory for process logs
        - Verify input files exist
        - Ensure containers are available
        - Check resource limits in nextflow.config
        
        Use -resume flag to continue from last successful step:
          nextflow run main.nf -resume
        """
        .stripIndent()
}
