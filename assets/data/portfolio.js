/*
	Single source of data for the one-page resume (index.html) and the
	project navigation on case-study pages.

	Content comes from professional_knowledge_base.md. Rules:
	- Never add facts, numbers or tools that are not in the knowledge base.
	- No employer names: every company is anonymized.
	- Dates use "YYYY-MM"; end: null means "Present".
*/
window.PORTFOLIO = {
	profile: {
		name: "Santiago Bruzza",
		role: "Senior Data Scientist · AI & ML Solutions",
		headline: "Data Scientist & Industrial Engineer",
		location: "Buenos Aires, Argentina (UTC−3)",
		modality: "Open to hybrid & remote",
		studying: "Specialization in Data Science, ITBA (expected 03/2027)",
		email: "bruzza.sb@gmail.com",
		phone: "+54 9 11 5975 9988",
		whatsapp: "https://wa.me/5491159759988",
		linkedin: "https://www.linkedin.com/in/santiago-bruzza/",
		github: "https://github.com/Bruzza-SB",
		url: "https://bruzza-sb.github.io/santiagobruzza.github.io/index.html"
	},

	categories: [
		{ id: "genai", label: "GenAI & Agents", color: "var(--c1)" },
		{ id: "ml", label: "Machine Learning & NLP", color: "var(--c2)" },
		{ id: "fullstack", label: "Full-stack apps", color: "var(--c5)" },
		{ id: "analytics", label: "Analytics, BI & Automation", color: "var(--c3)" },
		{ id: "optimization", label: "Optimization & Geospatial", color: "var(--c4)" }
	],

	experience: [
		{
			id: "telecom-sr",
			title: "Sr Data Scientist",
			org: "Telecom provider (Internet & TV)",
			focus: "AI & LLM projects",
			start: "2026-06", end: null,
			place: "Buenos Aires · Hybrid",
			industry: "Telecommunications · Call center operations",
			color: "var(--c1)",
			tagline: "Building generative-AI tools for internal users.",
			highlights: [
				{ h: "AI data support agent", d: "semantic layer over 4,000+ tables, in production" },
				{ h: "Catalog migration", d: "OpenAI API → Google Cloud (BigQuery, Vertex AI)" },
				{ h: "Analyst & Code Reviewer agents", d: "natural language → validated SQL; SQL/Python review" },
				{ h: "Call center RAG chatbot", d: "30+ training decks on Vertex AI" },
				{ h: "Internal chatbot", d: "LangChain, Ollama, LLaMA 3.2, Streamlit" }
			],
			summary: "Back at the telecom provider as Senior Data Scientist, building generative-AI solutions for internal users: an end-to-end AI data support agent with an AI-generated semantic layer (migrated from OpenAI to Google Cloud), LLM agents for self-service analytics and code review, and RAG chatbots for call center training and internal knowledge.",
			bullets: [
				"Built an end-to-end AI data support agent over 4,000+ tables: an AI-generated semantic layer (business definitions of tables and columns, relationships across the database, refresh frequency) feeding a production Next.js/TypeScript agent with prompt caching, tiered model routing, spend caps and prompt-injection filtering.",
				"Migrated the LLM-powered data catalog (4,000+ tables, 20,000+ columns) from the OpenAI API to Google Cloud Platform (BigQuery, Vertex AI) and evolved it into a production support agent for employee data discovery.",
				"Built internal AI agents used company-wide via VPN: a Data Analyst Agent (natural language → validated SQL → tables and charts) and a Code Reviewer Agent (detects errors, corrects and optimizes SQL/Python code).",
				"Built a RAG chatbot on Vertex AI over 30+ call center training decks (text, tables and images described with Gemini), giving agents conversational access to training content.",
				"Developed an internal AI chatbot with LangChain, Ollama, LLaMA 3.2 and Streamlit."
			],
			points: [{ t: "AI data support agent & semantic layer", p: "data-support-agent" }, { t: "Data catalog migration: OpenAI → GCP", p: "data-support-agent" }, { t: "Data Analyst agent", p: "data-analyst-agent" }, { t: "Code Reviewer agent", p: "code-reviewer" }, { t: "RAG chatbot for call center training", p: "call-center-rag" }, "Internal chatbot on LLaMA 3.2"],
			projects: ["data-support-agent", "data-analyst-agent", "code-reviewer", "call-center-rag"],
			extras: [],
			skills: ["Claude", "OpenAI API", "Gemini", "Vertex AI", "BigQuery", "RAG", "Next.js", "TypeScript", "LangChain", "Streamlit", "Prompt caching", "AI security"]
		},
		{
			id: "consultant",
			title: "Independent Data & AI Consultant",
			org: "Own practice · SMB clients",
			focus: "Founder",
			start: "2026-06", end: null,
			place: "Buenos Aires · Remote",
			industry: "Consulting · Hospitality · Legal services",
			color: "var(--c5)",
			tagline: "My own data & AI practice for small and mid-sized businesses.",
			highlights: [
				{ h: "Consultancy", d: "discovery, design, build, deploy and support" },
				{ h: "AI sales agent", d: "first-contact discovery and in-chat meeting booking" },
				{ h: "Restaurant P&L platform", d: "replaced a manual monthly Excel close" },
				{ h: "Notary quote calculator", d: "instant itemized quotes with PDF export" },
				{ h: "Delivery method", d: "4 phases, starting with a quantified diagnostic" }
			],
			summary: "My own data science and AI consulting practice, alongside my full-time role. I help small and mid-sized businesses that hit an \"analytics ceiling\" (manual processes, no dashboards, or stuck at descriptive reporting) move to AI- and data-driven operations without building an in-house data team. I also deliver projects as a freelancer.",
			bullets: [
				"Founded and run an independent data science & AI consultancy: client discovery and diagnostics, solution design, full-stack build, production deployment and support.",
				"Built and deployed a production AI sales & lead-qualification agent (Next.js, TypeScript, Claude Sonnet/Haiku) that runs first-contact discovery, stores structured notes in Postgres and books meetings in-chat. Hardened for public exposure (session-only auth, server-validated write-only tools, Cloudflare Turnstile, injection filter, rate limiting) with LLM cost controls (prompt caching, zero-token intake, tiered model routing, per-session token budgets, daily/monthly spend caps with an automatic kill switch).",
				"Built and deployed an internal P&L platform for a multi-brand restaurant group (Next.js/TypeScript, PostgreSQL, Vercel) that replaced a manual monthly Excel close with a one-click P&L per legal entity plus a consolidated view, integrating a MySQL ERP (six schemas), a POS API (daily GitHub Actions sync) and manual inputs.",
				"Built an internal notary fee & closing-cost quote calculator that replaced a manual Excel with instant itemized quotes, applying the notary association's fee methodology and taxes, with live official USD exchange-rate conversion, branded PDF export and role-based access.",
				"Designed a 4-phase delivery method (Discovery → Architecture → Build & Validate → Deploy & Iterate) that starts with a short diagnostic and quantifies the \"before\" state: time, error rates and costs."
			],
			points: ["Founded a data & AI consultancy", { t: "AI sales & lead-qualification agent", p: "ai-sales-agent" }, { t: "Restaurant group P&L platform", p: "restaurant-pnl" }, "Notary fee quote calculator"],
			projects: ["ai-sales-agent", "restaurant-pnl"],
			extras: [
				{ t: "Service catalog", d: "AI agents · Business intelligence · Process automation · Risk & fraud · Text & audio analytics · Image & video · Geographic data" }
			],
			skills: ["Claude API", "Next.js", "TypeScript", "PostgreSQL", "MySQL", "Drizzle ORM", "GitHub Actions", "Vercel", "RBAC", "Solution design"]
		},
		{
			id: "fintech",
			title: "Data Scientist",
			org: "Fintech · Corporate credit cards",
			focus: "Product & Operations",
			start: "2025-01", end: "2026-06",
			place: "Remote",
			industry: "Fintech · Credit risk · Collections",
			color: "var(--c2)",
			tagline: "Data science for Product and Operations at a corporate-card fintech.",
			highlights: [
				{ h: "Payment-date model", d: "predicts days to pay (MAE 1.86 days)" },
				{ h: "Collections automation", d: "daily overdue assignment via n8n and HubSpot" },
				{ h: "Unit-economics mart", d: "monthly P&L for 10,000 clients from 80+ sources" },
				{ h: "Merchant catalog", d: "3M names unified with embeddings and DBSCAN" },
				{ h: "Ad-hoc support", d: "analysis and automation for Product and Operations" }
			],
			summary: "Data Scientist at a fintech that issues corporate credit cards to businesses (companies spend during the month and receive a billing statement). I served the Product and Operations teams, and the Collections team used one of my automations.",
			bullets: [
				"Built a supervised ML model on two years of account statements that predicts how many days each business client takes to pay (MAE 1.86 days), with lag features and Bayesian hyperparameter tuning (Optuna) on Databricks, so the team can act early on likely late payers and defaulters.",
				"Automated the daily detection and assignment of overdue credit card accounts to Collections agents with n8n (HubSpot), cutting a multi-hour manual task to seconds.",
				"Built an automated client-level unit-economics pipeline (Databricks) that consolidates 80+ sources (POS transactions, costs, revenue, ROI) into a monthly P&L for each of 10,000 clients, replacing fragmented manual reporting.",
				"Unified 3M fragmented merchant names into a single merchant catalog using regex cleaning, Hugging Face embeddings, DBSCAN clustering and an n-gram naming algorithm, enabling true market-share analysis and merchant-restricted cards.",
				"Provided data solutions, ad-hoc analysis and process automation to the Product and Operations teams."
			],
			points: [{ t: "Payment-date prediction (MAE 1.86 days)", p: "payment-date" }, { t: "Collections assignment automation", p: "collections-automation" }, { t: "Client-level P&L mart (10,000 clients)", p: "unit-economics-mart" }, { t: "3M merchant names unified with NLP", p: "merchant-unifier" }],
			projects: ["payment-date", "collections-automation", "unit-economics-mart", "merchant-unifier"],
			extras: [],
			skills: ["Databricks", "Python", "SQL", "scikit-learn", "Optuna", "n8n", "HubSpot", "Hugging Face", "DBSCAN"]
		},
		{
			id: "telecom-ds",
			title: "Data Scientist",
			org: "Telecom provider (Internet & TV)",
			focus: "Machine learning projects",
			start: "2023-12", end: "2025-01",
			place: "Buenos Aires · Hybrid",
			industry: "Telecommunications · Call center operations",
			color: "var(--c3)",
			tagline: "ML and NLP on customer and operational data.",
			highlights: [
				{ h: "Call analytics", d: "Speech-to-Text, embeddings and clustering" },
				{ h: "Churn segmentation", d: "K-Means on ~200k high-risk customers per month" },
				{ h: "Geospatial attribution", d: "sales mapped to a door-to-door campaign" },
				{ h: "Survey comments", d: "NLP topics and sentiment, ~42k per month" },
				{ h: "Large-scale EDA", d: "PySpark over a 6M-customer database" }
			],
			summary: "Developed machine learning and NLP solutions on customer and operational data: churn-driver segmentation, customer-feedback topic and sentiment models, call center speech analytics, geospatial campaign attribution and large-scale exploratory analysis.",
			bullets: [
				"Built an end-to-end call analytics pipeline: GCP Speech-to-Text transcription, Transformer text embeddings and unsupervised clustering to discover call topics and evaluate agent performance across thousands of calls without manual review.",
				"Segmented high-churn-risk customers (~200k/month out of a 1.6M base) with K-Means into technical, commercial and mixed churn causes, enabling targeted retention actions.",
				"Attributed sales to a door-to-door acquisition campaign by building daily seller coverage areas from 100k+ geographic points (GeoPandas, 100 m buffers) and spatially joining ~30k geolocated sales within a 15-day window; delivered a Tableau dashboard used to decide whether to scale or stop the campaign.",
				"Automated the analysis of ~42k monthly survey comments with an NLP pipeline (NLTK, lemmatization, TF-IDF), K-Means topic clustering into 5 business-defined categories and sentiment scoring, joined to customer data for the Customer Intelligence team.",
				"Conducted exploratory data analysis with PySpark over a 6M-customer database."
			],
			points: [{ t: "Speech-to-text call analytics", p: "speech-to-text" }, { t: "Churn-driver segmentation (1.6M customers)", p: "churn-segmentation" }, { t: "Survey comments: topics & sentiment", p: "comments-sentiment" }, { t: "Geospatial campaign attribution", p: "geospatial" }, "EDA with PySpark (6M customers)"],
			projects: ["speech-to-text", "churn-segmentation", "comments-sentiment", "geospatial"],
			extras: [],
			skills: ["Python", "SQL", "PySpark", "scikit-learn", "K-Means", "NLTK", "GCP Speech-to-Text", "GeoPandas", "Tableau", "Presto"]
		},
		{
			id: "consulting-sr",
			title: "Data Science Sr. Analyst",
			org: "Global consulting firm · AI & analytics practice",
			focus: "Clients in the US, Canada & Argentina",
			start: "2022-11", end: "2023-12",
			place: "Buenos Aires · Hybrid",
			industry: "Consulting · CPG · Logistics & supply chain",
			color: "var(--c4)",
			tagline: "Data science projects for clients in the US, Canada and Argentina.",
			highlights: [
				{ h: "Network optimization", d: "clustering, routing and cost-to-serve for 8 DCs and 3,500 stores" },
				{ h: "What-if scenarios", d: "new and closed DCs, saving thousands of dollars" },
				{ h: "NLP classification", d: "multiclass text model" }
			],
			summary: "Delivered data science projects for consulting clients in the United States, Canada and Argentina, from supply chain optimization to NLP classification.",
			bullets: [
				"Optimized the distribution network of a Canadian food manufacturer (8 distribution centers, 3,500 stores): K-Means store clustering under truck distance/time constraints, OSRM driving-distance matrices, OR-Tools TSP routing and P&L-based cost-to-serve allocation, feeding a cost-minimization model and what-if scenarios (new and closed DCs) that saved thousands of dollars.",
				"Built a multiclass classification model using NLP techniques.",
				"Delivered data science projects for clients in the United States, Canada and Argentina."
			],
			points: [{ t: "Supply chain clustering & route optimization", p: "supply-chain" }, "Multiclass NLP classification", "Clients in the US, Canada & Argentina"],
			projects: ["supply-chain"],
			extras: [],
			skills: ["Python", "scikit-learn", "OR-Tools", "OSRM API", "K-Means", "NLP", "Pandas", "NumPy"]
		},
		{
			id: "consulting",
			title: "Data Science Analyst",
			org: "Global consulting firm · AI & analytics practice",
			focus: "BI & analytics",
			start: "2021-11", end: "2022-11",
			place: "Buenos Aires · Hybrid",
			industry: "Consulting · Business intelligence",
			color: "var(--c4)",
			tagline: "Started my data career in BI and SQL.",
			highlights: [
				{ h: "Dashboards", d: "Tableau, Power BI and Looker Studio" },
				{ h: "SQL", d: "complex queries on BigQuery" }
			],
			summary: "Started my data career building business dashboards and writing complex SQL for consulting clients on Google Cloud.",
			bullets: [
				"Built business dashboards in Tableau, Power BI and Looker Studio.",
				"Wrote complex SQL queries in Google Cloud Platform (BigQuery) environments."
			],
			points: ["Dashboards in Tableau, Power BI & Looker Studio", "Complex SQL on BigQuery"],
			projects: [],
			extras: [],
			skills: ["Tableau", "Power BI", "Looker Studio", "SQL", "BigQuery", "GCP"]
		},
		{
			id: "intern",
			title: "Drilling & Workover Intern – Upstream",
			org: "Energy company · Oil & gas",
			focus: "Part-time internship",
			start: "2021-05", end: "2021-12",
			place: "Argentina · Hybrid",
			industry: "Oil & gas (upstream)",
			color: "var(--muted)",
			tagline: "Where my professional experience starts.",
			highlights: [
				{ h: "Upstream drilling & workover", d: "part-time internship" },
				{ h: "Tools", d: "R and Power BI" }
			],
			summary: "Part-time internship in the upstream drilling & workover area, while finishing my Industrial Engineering degree. It is where my professional experience starts.",
			bullets: [
				"Part-time internship in upstream drilling & workover. Tools: R and Power BI."
			],
			points: ["Upstream drilling & workover", "R and Power BI"],
			projects: [],
			extras: [],
			skills: ["R", "Power BI"]
		}
	],

	projects: [
		{
			id: "data-support-agent",
			title: "AI Data Support Agent & Semantic Layer",
			page: "data_catalog.html",
			cats: ["genai"],
			exp: "telecom-sr",
			context: "Telecom · 2026",
			kpi: { v: "4,000+", l: "tables documented by AI · 20,000+ columns" },
			points: ["AI-generated semantic layer over BigQuery", "Find tables & definitions in plain language", "Prompt caching, model routing & spend caps"],
			tags: ["LLM agent", "Semantic layer", "RAG", "Vertex AI", "Next.js"]
		},
		{
			id: "ai-sales-agent",
			title: "AI Sales & Lead-Qualification Agent",
			page: "ai_sales_agent.html",
			cats: ["genai", "fullstack"],
			exp: "consultant",
			context: "Consulting · 2026",
			video: true,
			kpi: { v: "2-tier", l: "model routing with spend caps & kill switch" },
			points: ["Runs discovery & books meetings in-chat", "Hardened for public exposure", "Predictable LLM costs"],
			tags: ["Claude API", "Next.js", "TypeScript", "AI security", "Postgres"]
		},
		{
			id: "restaurant-pnl",
			title: "Restaurant Group P&L Platform",
			page: "restaurant_pnl_platform.html",
			cats: ["fullstack", "analytics"],
			exp: "consultant",
			context: "Hospitality · 2026",
			video: true,
			kpi: { v: "1-click", l: "P&L per legal entity + consolidated view" },
			points: ["Replaced a manual monthly Excel close", "ERP (6 schemas) + POS API + manual inputs", "Live KPIs & Excel export"],
			tags: ["Next.js", "PostgreSQL", "MySQL", "GitHub Actions", "Vercel"]
		},
		{
			id: "payment-date",
			title: "Payment-Date Prediction",
			page: "payment_date.html",
			cats: ["ml"],
			exp: "fintech",
			context: "Fintech · 2025–26",
			kpi: { v: "1.86 d", l: "mean absolute error" },
			points: ["Predicts days to pay each statement", "Lag features + Optuna tuning", "Act early on likely late payers"],
			tags: ["Regression", "Feature engineering", "Optuna", "Databricks"]
		},
		{
			id: "unit-economics-mart",
			title: "Client-Level P&L Data Mart",
			page: "unit_economics_mart.html",
			cats: ["analytics"],
			exp: "fintech",
			context: "Fintech · 2025–26",
			kpi: { v: "10,000", l: "client P&Ls per month from 80+ sources" },
			points: ["Monthly P&L per client", "POS, costs, revenue & ROI consolidated", "Replaced fragmented manual reporting"],
			tags: ["Databricks", "ETL", "SQL", "Unit economics"]
		},
		{
			id: "collections-automation",
			title: "Collections Assignment Automation",
			page: "collections_automation.html",
			cats: ["analytics"],
			exp: "fintech",
			context: "Fintech · 2025–26",
			kpi: { v: "Hours → s", l: "daily manual task automated" },
			points: ["Daily overdue-account detection", "Auto-assignment to agents in HubSpot"],
			tags: ["n8n", "HubSpot", "Process automation"]
		},
		{
			id: "merchant-unifier",
			title: "Merchant Name Unifier",
			page: "commerce_names.html",
			cats: ["ml"],
			exp: "fintech",
			context: "Fintech · 2025–26",
			kpi: { v: "3M", l: "merchant names unified" },
			points: ["Regex cleaning + Hugging Face embeddings", "DBSCAN clustering + n-gram naming", "Enables market-share analysis"],
			tags: ["NLP", "Embeddings", "DBSCAN", "Entity resolution"]
		},
		{
			id: "data-analyst-agent",
			title: "Data Analyst Agent",
			page: "data_analyst_agent.html",
			cats: ["genai"],
			exp: "telecom-sr",
			context: "Telecom · 2026",
			video: true,
			kpi: { v: "NL → SQL", l: "validated against the schema" },
			points: ["Ask questions in plain language", "Validated SQL → table + interactive chart", "Used company-wide via VPN"],
			tags: ["Text-to-SQL", "OpenAI API", "Streamlit", "Plotly"]
		},
		{
			id: "code-reviewer",
			title: "Code Reviewer Agent",
			page: "code_reviewer.html",
			cats: ["genai"],
			exp: "telecom-sr",
			context: "Telecom · 2026",
			video: true,
			kpi: { v: "SQL · Py", l: "reviewed, corrected & optimized" },
			points: ["Paste or upload SQL / Python", "Review comments + corrected, optimized code", "Used company-wide via VPN"],
			tags: ["LLM agent", "OpenAI API", "Streamlit"]
		},
		{
			id: "call-center-rag",
			title: "Call Center Training Chatbot (RAG)",
			page: "call_center_training_agent.html",
			cats: ["genai"],
			exp: "telecom-sr",
			context: "Telecom · 2026",
			kpi: { v: "30+", l: "training decks turned into one chatbot" },
			points: ["30+ training decks as a RAG corpus", "Images described with Gemini", "Conversational access for agents"],
			tags: ["RAG", "Vertex AI", "Gemini", "Multimodal"]
		},
		{
			id: "speech-to-text",
			title: "Speech-to-Text Call Analytics",
			page: "speech_to_text.html",
			cats: ["ml"],
			exp: "telecom-ds",
			context: "Telecom · 2023–25",
			kpi: { v: "1,000s", l: "calls analyzed without manual review" },
			points: ["GCP Speech-to-Text transcription", "Transformer embeddings + clustering", "Call topics & agent performance"],
			tags: ["Speech-to-text", "Embeddings", "Clustering", "GCP"]
		},
		{
			id: "churn-segmentation",
			title: "Churn-Driver Segmentation",
			page: "customer_segmentation.html",
			cats: ["ml"],
			exp: "telecom-ds",
			context: "Telecom · 2023–25",
			kpi: { v: "1.6M", l: "customer base · ~200k high-risk / month" },
			points: ["K-Means on high-churn-risk customers", "Technical, commercial & mixed causes", "Targeted retention actions"],
			tags: ["K-Means", "Quantile encoding", "Churn", "scikit-learn"]
		},
		{
			id: "comments-sentiment",
			title: "Customer Comments: Topics & Sentiment",
			page: "sentiment_analysis.html",
			cats: ["ml"],
			exp: "telecom-ds",
			context: "Telecom · 2023–25",
			kpi: { v: "~42k", l: "survey comments per month" },
			points: ["TF-IDF + K-Means topic clustering", "5 business categories + sentiment", "Joined to customer data"],
			tags: ["NLP", "TF-IDF", "K-Means", "Sentiment"]
		},
		{
			id: "geospatial",
			title: "Geospatial Campaign Attribution",
			page: "geospatial_analysis.html",
			cats: ["optimization", "analytics"],
			exp: "telecom-ds",
			context: "Telecom · 2024",
			kpi: { v: "100k+", l: "GPS points · ~30k sales attributed" },
			points: ["Daily seller coverage areas (100 m buffers)", "Spatial join with geolocated sales", "Tableau dashboard: scale or stop"],
			tags: ["GeoPandas", "Spatial join", "Tableau"]
		},
		{
			id: "supply-chain",
			title: "Supply Chain Clustering & Route Optimization",
			page: "optimization_model.html",
			cats: ["optimization", "ml"],
			exp: "consulting-sr",
			context: "Consulting · 2022–23",
			kpi: { v: "3,500", l: "stores · 8 distribution centers" },
			points: ["Store clustering under truck constraints", "OSRM distances + OR-Tools TSP routing", "Cost-to-serve & what-if scenarios"],
			tags: ["OR-Tools", "TSP", "OSRM", "K-Means"]
		}
	],

	/* Skills: lvl "prod" = used in professional work, "train" = course / training.
	   p = project ids that used the skill (drives the skill → project highlight). */
	skills: [
		{ group: "AI, LLMs & agents", color: "var(--c1)", items: [
			{ n: "LLM agents & chatbots", p: ["data-support-agent", "ai-sales-agent", "data-analyst-agent", "code-reviewer", "call-center-rag"] },
			{ n: "Claude API", p: ["ai-sales-agent"] },
			{ n: "OpenAI API", p: ["data-support-agent", "data-analyst-agent", "code-reviewer"] },
			{ n: "Gemini", p: ["call-center-rag"] },
			{ n: "Vertex AI", p: ["data-support-agent", "call-center-rag"] },
			{ n: "RAG", p: ["data-support-agent", "call-center-rag"] },
			{ n: "Text-to-SQL", p: ["data-analyst-agent"] },
			{ n: "Semantic layer", p: ["data-support-agent"] },
			{ n: "Prompt caching & tiered routing", p: ["data-support-agent", "ai-sales-agent"] },
			{ n: "AI security & guardrails", p: ["data-support-agent", "ai-sales-agent"] },
			{ n: "LangChain · Ollama · LLaMA", p: [] }
		]},
		{ group: "Machine learning & statistics", color: "var(--c2)", items: [
			{ n: "scikit-learn", p: ["payment-date", "churn-segmentation", "comments-sentiment", "supply-chain"] },
			{ n: "Supervised learning", p: ["payment-date"] },
			{ n: "Clustering (K-Means, DBSCAN)", p: ["churn-segmentation", "comments-sentiment", "speech-to-text", "merchant-unifier", "supply-chain"] },
			{ n: "Feature engineering", p: ["payment-date", "churn-segmentation"] },
			{ n: "Optuna (Bayesian HPO)", p: ["payment-date"] },
			{ n: "Operations research", p: ["supply-chain"] },
			{ n: "OR-Tools", p: ["supply-chain"] },
			{ n: "TensorFlow / Keras", lvl: "train", p: [] },
			{ n: "Deep learning", lvl: "train", p: [] }
		]},
		{ group: "NLP & text analytics", color: "var(--c2)", items: [
			{ n: "Embeddings (Hugging Face, Transformers)", p: ["merchant-unifier", "speech-to-text"] },
			{ n: "TF-IDF · NLTK", p: ["comments-sentiment"] },
			{ n: "Sentiment analysis", p: ["comments-sentiment"] },
			{ n: "Speech-to-text", p: ["speech-to-text"] },
			{ n: "Entity resolution", p: ["merchant-unifier"] },
			{ n: "Regex", p: ["merchant-unifier"] }
		]},
		{ group: "Programming & apps", color: "var(--c5)", items: [
			{ n: "Python", p: ["payment-date", "merchant-unifier", "data-analyst-agent", "code-reviewer", "call-center-rag", "speech-to-text", "churn-segmentation", "comments-sentiment", "geospatial", "supply-chain"] },
			{ n: "SQL", p: ["payment-date", "unit-economics-mart", "merchant-unifier", "data-analyst-agent", "churn-segmentation", "comments-sentiment", "geospatial"] },
			{ n: "PySpark", p: [] },
			{ n: "TypeScript", p: ["data-support-agent", "ai-sales-agent", "restaurant-pnl"] },
			{ n: "Next.js", p: ["data-support-agent", "ai-sales-agent", "restaurant-pnl"] },
			{ n: "Streamlit", p: ["data-analyst-agent", "code-reviewer"] },
			{ n: "Git · GitHub Actions", p: ["restaurant-pnl"] },
			{ n: "REST APIs", p: ["restaurant-pnl", "supply-chain", "data-analyst-agent"] },
			{ n: "Auth & RBAC", p: ["restaurant-pnl", "ai-sales-agent"] }
		]},
		{ group: "Data platforms & cloud", color: "var(--c3)", items: [
			{ n: "Databricks", p: ["payment-date", "unit-economics-mart"] },
			{ n: "Google Cloud (GCP)", p: ["data-support-agent", "speech-to-text", "call-center-rag"] },
			{ n: "BigQuery", p: ["data-support-agent"] },
			{ n: "PostgreSQL", p: ["ai-sales-agent", "restaurant-pnl"] },
			{ n: "MySQL", p: ["restaurant-pnl"] },
			{ n: "Presto", p: ["churn-segmentation", "comments-sentiment", "geospatial"] },
			{ n: "Hadoop", p: [] },
			{ n: "Vercel", p: ["restaurant-pnl"] },
			{ n: "ETL & data pipelines", p: ["unit-economics-mart", "restaurant-pnl"] }
		]},
		{ group: "Automation", color: "var(--c3)", items: [
			{ n: "n8n", p: ["collections-automation"] },
			{ n: "HubSpot", p: ["collections-automation"] },
			{ n: "Scheduled jobs", p: ["restaurant-pnl", "collections-automation"] }
		]},
		{ group: "BI & visualization", color: "var(--c4)", items: [
			{ n: "Tableau", p: ["geospatial"] },
			{ n: "Power BI", p: [] },
			{ n: "Looker Studio", p: [] },
			{ n: "Metabase", p: [] },
			{ n: "Plotly · Matplotlib · Seaborn", p: ["data-analyst-agent"] },
			{ n: "Pandas · NumPy", p: ["payment-date", "churn-segmentation", "comments-sentiment", "geospatial", "supply-chain"] },
			{ n: "KPI dashboards", p: ["restaurant-pnl", "geospatial"] }
		]},
		{ group: "Geospatial", color: "var(--c4)", items: [
			{ n: "GeoPandas", p: ["geospatial"] },
			{ n: "Spatial joins & buffers", p: ["geospatial"] },
			{ n: "OSRM API", p: ["supply-chain"] },
			{ n: "Route optimization (TSP)", p: ["supply-chain"] }
		]}
	],

	education: [
		{ title: "Specialization in Data Science", school: "Instituto Tecnológico de Buenos Aires (ITBA)", when: "05/2025 – Present", note: "Expected completion: 03/2027" },
		{ title: "Industrial Engineering", school: "Universidad de Buenos Aires (UBA)", when: "03/2016 – 03/2023", note: "Orientation in Statistics & Operations Research. Electives: Applied Statistics III, Operations Research III." }
	],

	certifications: [
		{ title: "Machine Learning with PySpark", org: "DataCamp", when: "11/2023", url: "https://www.datacamp.com/completed/statement-of-accomplishment/course/f58849cc5d9a7a3d12c1bb9a5c7908db0b06d3b9" },
		{ title: "Complete Machine Learning & Data Science Bootcamp", org: "Udemy · Zero To Mastery", when: "10/2022", url: "https://www.udemy.com/certificate/UC-695f0451-8725-41e2-9261-8aed3b5522c7/" },
		{ title: "The Complete Web Developer", org: "Zero To Mastery Academy", when: "2020" },
		{ title: "First Certificate in English (B2)", org: "Cambridge English" },
		{ title: "Goethe-Zertifikat A1 & A2", org: "Goethe-Institut" }
	],

	languages: [
		{ name: "Spanish", level: "Native", pct: 100 },
		{ name: "English", level: "Fluent", pct: 85 },
		{ name: "German", level: "Basic (A2)", pct: 30 }
	],

	industries: ["Telecommunications & call centers", "Fintech & credit cards", "Consulting", "CPG & supply chain", "Marketing & sales", "Hospitality", "Legal services", "Oil & gas"]
};
