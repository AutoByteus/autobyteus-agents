# STORM Source Notes

These notes record the source basis used to design the AutoByteus STORM Team.
They are not a copy of Stanford STORM; they summarize the public STORM concepts that map cleanly into team-local agent roles.

## Primary Sources

- Stanford STORM research page: <https://storm-project.stanford.edu/research/storm/>
- Stanford OVAL STORM GitHub repository: <https://github.com/stanford-oval/storm>
- STORM paper on arXiv: <https://arxiv.org/abs/2402.14207>

## Core STORM Definition

STORM stands for **Synthesis of Topic Outlines through Retrieval and Multi-perspective Question Asking**.
The original Stanford system focuses on generating grounded, organized, Wikipedia-like long-form articles from scratch.
Its key insight is that article generation should not start immediately: the system first performs a pre-writing stage that researches the topic, asks better questions, gathers references, and synthesizes an outline.

## Publicly Described Pipeline

The public STORM description breaks work into two broad stages:

1. **Pre-writing stage**
   - collect references from a large corpus such as the Internet;
   - discover diverse perspectives related to the topic;
   - ask questions from those perspectives;
   - simulate conversations between a writer and a retrieval-grounded topic expert;
   - synthesize curated knowledge into an outline.

2. **Writing stage**
   - use the outline and collected references to generate a full-length cited article;
   - polish the article for presentation and reduce duplicate or weakly connected material.

The GitHub README describes the customizable STORM engine as four modules:

1. **Knowledge Curation Module** — collects broad information about the topic.
2. **Outline Generation Module** — organizes collected information into a hierarchical outline.
3. **Article Generation Module** — populates the outline with collected information.
4. **Article Polishing Module** — refines and enhances the written article for presentation.

## Mapping To AutoByteus Team Roles

The AutoByteus team uses real team-local agents rather than one monolithic runner:

| Stanford STORM concept | AutoByteus STORM Team role |
| --- | --- |
| Topic setup and run configuration | `topic_research_coordinator` |
| Discover diverse perspectives | `perspective_miner` |
| Perspective-guided question asking and simulated expert conversations | `expert_interviewer` |
| Curate collected knowledge into an outline | `outline_architect` |
| Generate a cited article from outline and references | `cited_article_writer` |
| Polish article and verify citation/source quality | `article_polisher_verifier` |

## Important Quality Lessons

The Stanford project emphasizes that STORM-style output is useful for the pre-writing stage, but not automatically publication-ready.
The research page also highlights failure modes found by expert feedback, including source bias transfer and over-association of unrelated facts.
Those lessons are reflected in this team's verification rules:

- do not use search snippets as final evidence;
- keep claims close to citations;
- detect weak associations and red herrings;
- explicitly record sparse evidence, source conflicts, and uncertainty;
- route unsupported claims back to the role that owns the missing evidence or synthesis error.

## Evaluation Context

The STORM paper reports evaluation against FreshWiki, a dataset of recent high-quality Wikipedia articles, and uses outline assessments to evaluate pre-writing quality.
The public GitHub README also points to FreshWiki and WildSeek datasets for research use.
This team does not vendor those datasets; it preserves the workflow concepts and can be validated on separately supplied topics or local corpora.
