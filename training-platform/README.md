# BioNXA Learning Platform

An interactive web-based training platform for bioinformatics, biotechnology, and AI-driven computational biology.

## 🚀 Features

- **Interactive Tutorials**: Step-by-step lessons covering Nextflow basics to advanced topics
- **Code Playground**: Practice writing Nextflow workflows with an integrated code editor
- **Bioinformatics Examples**: Real-world examples including RNA-seq, variant calling, and QC pipelines
- **Progress Tracking**: Monitor your learning journey and complete challenges
- **Curated Resources**: Access to documentation, videos, and community resources
- **Modern UI**: Built with Next.js, React, and Tailwind CSS

## 📚 Learning Paths

### 1. Bioinformatics Fundamentals
- Introduction to Computational Biology
- Data Processing Pipelines
- Genomic Data Analysis
- Workflow Automation

### 2. Biotechnology Applications
- Quality Control & Data Processing
- RNA-seq & Gene Expression Analysis
- Variant Calling & Genomic Analysis
- Protein Structure Prediction

### 3. AI & Machine Learning
- Deep Learning for Genomics
- Predictive Modeling in Biology
- Cloud-based Bioinformatics (AWS, Azure, GCP)
- High-Performance Computing

### 4. Real-World Projects
- Production-ready workflow development
- Industry standards and best practices
- Research & Clinical Applications

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor (VS Code editor)
- **Icons**: Lucide React
- **Markdown**: Marked for content rendering

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
training-platform/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── tutorials/           # Tutorial pages
│   │   ├── page.tsx        # Tutorial list
│   │   └── [category]/[id]/ # Dynamic tutorial routes
│   ├── playground/          # Interactive code editor
│   │   └── page.tsx
│   └── resources/           # Learning resources
│       └── page.tsx
├── components/              # Reusable React components
├── lib/                     # Utility functions
├── data/                    # Tutorial content and data
├── public/                  # Static assets
└── package.json
```

## 🎯 Key Features

### Interactive Code Playground
- Monaco Editor with syntax highlighting for Groovy/Nextflow
- Multiple example workflows (Hello World, QC, RNA-seq)
- Simulated workflow execution with output display
- Save and download functionality

### Structured Tutorials
- Progressive learning path from basics to advanced
- Interactive code examples in each lesson
- Lesson progress tracking
- Difficulty levels (Beginner, Intermediate, Advanced)

### Comprehensive Resources
- Official documentation links
- Community forums and Slack channels
- Video tutorials and conference talks
- nf-core pipeline collections
- Bioinformatics topic guides

## 🚀 Getting Started

1. **Start with Basics**: Begin with "Introduction to Nextflow" tutorial
2. **Practice in Playground**: Test your knowledge with interactive examples
3. **Build Workflows**: Follow bioinformatics tutorials to build real pipelines
4. **Explore Resources**: Access additional learning materials and community

## 📝 Adding New Tutorials

To add new tutorial content:

1. Edit `app/tutorials/[category]/[id]/page.tsx`
2. Add content to the `tutorialContent` object
3. Include markdown content and code examples
4. Update the tutorial list in `app/tutorials/page.tsx`

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Add new tutorials and examples
- Improve existing content
- Fix bugs and typos
- Enhance UI/UX
- Add new features

## 📖 Related Resources

- [NCBI Resources](https://www.ncbi.nlm.nih.gov/)
- [Bioconductor](https://www.bioconductor.org/) - Bioinformatics software
- [Galaxy Project](https://galaxyproject.org/) - Workflow platform
- [BioStars](https://www.biostars.org/) - Bioinformatics community

## 📄 License

This project is open source and available under the Apache 2.0 License.

## 🌟 Acknowledgments

Built to advance bioinformatics and biotechnology education in Saudi Arabia and the global scientific community.

---

**Start your journey to mastering bioinformatics, biotechnology, and AI-driven computational biology!** 🧬🔬
