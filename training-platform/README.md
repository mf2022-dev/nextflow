# Nextflow Training Platform

An interactive web-based training platform for learning Nextflow and bioinformatics workflow development.

## 🚀 Features

- **Interactive Tutorials**: Step-by-step lessons covering Nextflow basics to advanced topics
- **Code Playground**: Practice writing Nextflow workflows with an integrated code editor
- **Bioinformatics Examples**: Real-world examples including RNA-seq, variant calling, and QC pipelines
- **Progress Tracking**: Monitor your learning journey and complete challenges
- **Curated Resources**: Access to documentation, videos, and community resources
- **Modern UI**: Built with Next.js, React, and Tailwind CSS

## 📚 Learning Paths

### 1. Nextflow Basics
- Introduction to Nextflow
- Processes and Tasks
- Channels and Data Flow
- Channel Operators

### 2. Bioinformatics Workflows
- Quality Control Pipelines
- RNA-seq Analysis
- Variant Calling Workflows

### 3. Advanced Topics
- Container Management (Docker, Singularity)
- Cloud Deployment (AWS, Azure, GCP)
- Performance Optimization

### 4. Real-World Projects
- Production-ready pipeline development
- nf-core standards and best practices

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

- [Nextflow Official Docs](https://nextflow.io/docs/latest/)
- [nf-core](https://nf-co.re/) - Community pipelines
- [Nextflow Patterns](https://nextflow-io.github.io/patterns/)
- [Nextflow Community Forum](https://community.seqera.io)

## 📄 License

This project is open source and available under the Apache 2.0 License.

## 🌟 Acknowledgments

Built with inspiration from the amazing Nextflow community and the need for accessible bioinformatics training resources.

---

**Start your journey to mastering Nextflow and building amazing bioinformatics pipelines!** 🧬
