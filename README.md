# Santiago Bruzza · Portfolio

An interactive one-page resume with case-study pages for each project.

Live: https://bruzza-sb.github.io/santiagobruzza.github.io/index.html

- Plain HTML, CSS and JavaScript. No build step and no dependencies apart from Google Fonts.
- It works on GitHub Pages and when you open `index.html` straight from disk.
- All content comes from `../professional_knowledge_base.md`.
- Employer names are anonymized on purpose.

## Structure

| Path | What it is |
|---|---|
| `index.html` | The one-page resume: hero, KPIs, career timeline, experience drawer, projects, skills, education, contact |
| `assets/data/portfolio.js` | **Single source of data** for the index: profile, KPIs, experience, projects, skills, education |
| `assets/js/app.js` | Renders the index from the data file. Also handles the drawer (`#exp/<id>` deep links), filters, skill highlighting, and prev/next links on case-study pages |
| `assets/js/charts.js` | Small SVG chart helpers (`bars`, `columns`, `donut`, `scatter`, `funnel`), mounted with `data-chart='{…}'` |
| `assets/css/site.css` | All styles: design tokens (dark mode only) plus index and case-study components |
| `*.html` (other) | One case-study page per project. All use the same template |
| `images/`, `videos/` | Media used by the pages |

## Adding a project

1. Copy an existing case-study page (e.g. `payment_date.html`). Set `data-project="<id>"` on `<body>`, then edit the hero, KPIs and sections.
2. Add the project to `projects` in `assets/data/portfolio.js` (id, page, cats, exp, kpi, summary, tags).
3. List its id in the matching `experience[].projects` entry and in the `p` array of every skill it used.

## Rules for charts

- Real figures only, taken from the knowledge base.
- Synthetic data (`"gen": …`) is allowed only inside a figure with the **"Illustrative · not real data"** badge.
