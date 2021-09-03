module.exports = {
    data: {
        partition_file: "-p",
        sequence_type: {
            auto_detect: "", 
            dna: "--seqtype DNA",
            protein: "--seqtype AA",
            binary: "--seqtype BIN",
            morphology: "--seqtype MORPH",
            dna_to_aa_translated_sequences: "--seqtype NT2AA",
            codon: "--seqtype CODON",
            codon_options: [
                "--st CODON1",
                "--st CODON2",
                "--st CODON3",
                "--st CODON4",
                "--st CODON5",
                "--st CODON6",
                "--st CODON7",
                "--st CODON8",
                "--st CODON9",
                "--st CODON10",
                "--st CODON11",
                "--st CODON12",
                "--st CODON13",
                "--st CODON14",
                "--st CODON15",
                "--st CODON16",
                "--st CODON17",
                "--st CODON18",
                "--st CODON19",
                "--st CODON20",
                "--st CODON21",
                "--st CODON22",
                "--st CODON23",
                "--st CODON24",
                "--st CONDON25"
            ]
        },
        partition_type: {
            separate_gene_trees: "-S",
            edge_proportional: "-p",
            edge_equal: "-q",
            edge_unlinked: "-Q"
        }
    },
    model: {
        substitution_model: "-m MFP" /*pending*/,
        rate_heterogeneity_across_sites: {
            allow_proportion_of_invariable_sites: "+I",
            rate_categories: "G+"/*pending*/
        },

    }
}