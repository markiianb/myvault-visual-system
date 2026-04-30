// MyVault AI Privacy Guide — v2 editorial-first build
// Source: 50-Website/Resource-Library/Ai Privacy guide/how-to-use-ai-without-giving-up-your-data-v2.md
// Built on myvault-editorial.typ primitives.
//
// No mandatory pages. Cover only ceremonial; imprint moves to back cover.
// Section transitions are inline in body flow. Stat pages, pull-page,
// and divider() are explicit "earn-the-breath" choices, not defaults.

#import "../../renderers/typst/myvault-editorial.typ": *

#show: editorial-doc.with(title: "How to use AI without giving up your data")

// ============================================================
// Cover — Vault Teal solid, lockup top-left, big PT Serif title bottom-left
// ============================================================
#cover(
  title: "How to use AI without giving up your data",
  subtitle: "A practical guide to the settings, rights, and decisions that keep your data yours.",
  author: "By Markos Symeonides",
  surface: "teal",
  title-size: 64pt,
)

// ============================================================
// Main flow — TOC + all 10 sections + sources, all in one auto-paginating stream
// ============================================================

#flow(running-header: "How to use AI without giving up your data")[

  #toc-block(entries: (
    (title: "Why AI privacy matters right now", page: "03"),
    (title: "Where your data goes when AI processes it", page: "06"),
    (title: "Google, Apple, Samsung — three approaches", page: "09"),
    (title: "Tradeoffs behind AI convenience", page: "10"),
    (title: "Privacy-preserving AI", page: "12"),
    (title: "How to audit your AI exposure in 30 minutes", page: "13"),
    (title: "Your rights under new AI privacy laws", page: "15"),
    (title: "10 questions to ask before trusting any app", page: "16"),
    (title: "Taking control", page: "16"),
    (title: "FAQ", page: "17"),
    (title: "Sources", page: "18"),
  ))

  #pagebreak()

  // ============================================================
  // Section 1 — Why AI privacy matters (with hero opener)
  // ============================================================

  #section-opener(
    number: "Section one",
    title: "Why AI privacy matters right now",
    epigraph: "More than half of Americans use AI every week. Only one in twenty actually trusts it. If you're not comfortable with it yet, you're in the majority.",
    surface: "teal",
  )

  #subhead("You're already an AI user")

  According to a Gallup study in late 2024, 99% of Americans used an AI-enabled product in the past week. Nearly two-thirds of them — 64% — had no idea they were doing it.

  AI already runs inside apps you use every day. Your weather forecast, your GPS navigation, your email inbox, search results you scroll through. How your phone sorts photos by faces, places, and dates. Fraud detection that flags suspicious charges on your credit card.

  You didn't opt into any of it. It showed up. And now it's part of how your phone, email, and apps work. So the question isn't whether you're an AI user — you are. The question is whether you're using it on your terms.

  #hero-stats(
    header: "Adoption is universal. Trust is not.",
    items: (
      (value: "99%", label: "of Americans used an AI product last week.", source: "Gallup, 2024."),
      (value: "5%", label: "say they trust AI \"a lot.\"", source: "YouGov, 2025."),
      (value: "82%", label: "abandoned a brand over data concerns.", source: "Capgemini, 2025."),
    ),
    surface: "off-white",
  )

  #subhead("People aren't only skeptical, they're leaving")

  57% of U.S. adults interact with AI several times a week, according to Pew Research Center. But only 5% trust AI "a lot." A KPMG / University of Melbourne study of 48,000 people across 47 countries found only 46% willing to trust AI systems. People aren't just expressing opinions. They're acting on them.

  82% of consumers say companies losing control of personal data inside AI systems is a serious problem, with 43% calling it "very serious." 81% believe the information collected by AI companies will be used in ways people never agreed to. And 82% have abandoned a brand in the past 12 months over concerns about how their personal data was being used.

  #pull-page("Four out of five consumers walked away from brands that mishandled their data in the past year. They're leaving, switching, and choosing companies that respect their privacy.")

  #subhead("What this guide will give you")

  We're not going to tell you to stop using AI. That would mean giving up tools that make life easier. But we will give you three things.

  Clarity — what happens to your data when AI processes it, where it goes, who can see it, and how long it stays. Comparison — how the platforms you already use (Google, Apple, and Samsung) handle your privacy differently. Control — specific settings to review, questions to ask, and steps to take today so the AI in your life works for you.

  You don't need to be an expert or give up the tools you use every day. Knowing what's happening and what you can control puts you back in charge. This guide shows you how.

  #takeaways(items: (
    [Adoption is universal — 99% of Americans used AI last week, mostly without knowing it.],
    [Trust is rare — only 5% trust AI "a lot," and 82% have already left a brand over data.],
    [The lever you have is settings — every section of this guide is a setting you control.],
  ))

  // ============================================================
  // Section 2 — Where your data goes
  // ============================================================

  #chapter("Where your data goes when AI processes it",
    subtitle: "When you type a question into ChatGPT, ask Siri for a recipe, or let Google summarize your emails — where does your data actually go? Four models, four very different answers.",
    number: "Section two",
  )

  #model-grid(
    intro: "Every AI tool fits one of these four. Knowing which one matters more than knowing the model name.",
    items: (
      (
        label: "Model 1",
        title: "Cloud processing",
        body: "Your data goes to remote servers. Used by ChatGPT, Gemini, Perplexity. Lives on someone else's servers for months or years; may be reviewed by humans or used to train future AI. Even with opt-out, ChatGPT keeps conversations 30 days.",
      ),
      (
        label: "Model 2",
        title: "On-device processing",
        body: "AI runs directly on your device using a Neural Processing Unit. Nothing leaves your hands. Used by Apple Intelligence, Samsung Galaxy AI, Google Pixel. Smaller models — but the capability gap is closing fast. 970M AI-chip phones shipped in 2025.",
      ),
      (
        label: "Model 3",
        title: "Zero-trust architecture",
        body: "Encrypted with keys only you hold. The service stores or processes data without ever being able to read it. Used by Proton Mail, Signal, and Proton's Scribe and Lumo AI. Even if the company is hacked or subpoenaed, your data stays encrypted.",
      ),
      (
        label: "Model 4",
        title: "Self-hosted models",
        body: "Open-source models — Qwen, Llama, DeepSeek — run on your own infrastructure. Nothing sent to the model creator. No training pipeline. No reviewer. The same model in the cloud has the privacy of any cloud service; on your hardware, none of those risks apply.",
      ),
    ),
  )

  Once your data is incorporated into model training, it becomes permanent. Unlike deleting a social media post, there is no undo button. Your conversation patterns, writing style, and personal details become part of the model's weights, and there's no way to remove them. This applies specifically to cloud-hosted AI services. If you run an open-source model on your own infrastructure, there is no training pipeline — the model runs as-is, and your data stays with you.

  #data-grid(
    header: "How long AI companies keep your data",
    intro: "The retention windows are not equivalent across services.",
    rows: (
      (service: "ChatGPT (with opt-out)", value: "30 days", notes: "Conversations retained for safety review."),
      (service: "ChatGPT (no opt-out)", value: "Indefinite", notes: "May train future models; humans may review."),
      (service: "Google Gemini", value: "Up to 18 months", notes: "Some retained up to 3 years for human review."),
      (service: "Apple Intelligence (PCC)", value: "Deleted after processing", notes: "Encrypted end-to-end; physically can't persist."),
      (service: "Apple Intelligence (on-device)", value: "Stays on device", notes: "Never leaves your hardware."),
      (service: "Self-hosted (Qwen, Llama)", value: "Stays with you", notes: "No training pipeline; nothing to retain."),
      (service: "Proton (Scribe, Lumo)", value: "Encrypted; not readable", notes: "Zero-trust — Proton itself can't access."),
    ),
  )

  #stat-page(
    "82%",
    headline: "abandoned a brand over data concerns in the past year",
    paragraph: [Eighty-two percent of consumers walked away from a brand in the past twelve months because of how their personal data was being used. People aren't expressing opinions. They're leaving.],
    source: "Capgemini Research Institute, 2025.",
  )

  // ============================================================
  // Section 3 — Google vs Apple vs Samsung
  // ============================================================

  #chapter("Google, Apple, Samsung — three approaches",
    subtitle: "All three companies are racing to put AI into everything you do. They handle your privacy very differently. The difference is bigger than the marketing suggests.",
    number: "Section three",
  )

  #compare-cols(
    header: "Three platforms, three default postures",
    intro: "Same product category. Three different defaults. The settings are not equivalent.",
    items: (
      (title: "Google", body: "Personal Intelligence (Jan 2026) connects to Gmail, Photos, Search history, YouTube. All processing in the cloud. Conversations stored up to 18 months — some retained up to 3 years for human review. Google's privacy page warns: \"Please don't enter confidential information that you wouldn't want a reviewer to see.\""),
      (title: "Apple", body: "Apple Intelligence runs on-device first, falls back to Private Cloud Compute for complex tasks. Encrypted end-to-end, deleted after processing. Settled \$95M in 2025 over Siri recordings. When routed to ChatGPT, OpenAI's policies apply."),
      (title: "Samsung", body: "Galaxy AI is hybrid: on-device features on Gemini Nano, cloud features on Google's servers. Strongest move: a single toggle at Settings → Advanced Intelligence → \"Process data only on device.\""),
    ),
  )

  #subhead("Settings to check right now")

  Google / Android users (5 minutes). Visit myactivity.google.com and review what Google has stored. Check whether "Gemini Apps Activity" is toggled on — it's on by default. Open Gmail Settings → Data Privacy → turn off Smart Features in BOTH locations, since both are switched on independently.

  iPhone users (5 minutes). Open Settings → Apple Intelligence & Siri and review what's enabled. Apple Intelligence can re-enable itself after iOS updates, so check after every single one. Confirm whether ChatGPT integration is active — it's a separate privacy domain entirely.

  Samsung Galaxy users (2 minutes). Settings → Advanced Intelligence → Toggle "Process data only on device."

  Three platforms. Three different toggles. Same product category. The settings posture you accept is the privacy posture you get.

  // ============================================================
  // Section 4 — Tradeoffs
  // ============================================================

  #chapter("Tradeoffs behind AI convenience",
    subtitle: "Every AI convenience involves a privacy tradeoff. Whether you know the terms is the part worth paying attention to.",
    number: "Section four",
  )

  #subhead("AI photo search")

  When you search for "beach vacation" or "birthday cake" in your photos, AI made that possible by analyzing every photo in your library. Faces, locations, objects, text, activities. With Google Photos, analysis happens in Google's cloud and your photos are not end-to-end encrypted. With Apple Photos, analysis happens on your device and photos never leave your phone for AI processing. The average smartphone user has about 2,795 photos.

  #subhead("AI email summarization")

  When Gmail or Outlook summarizes your email, the AI reads the full content. Financial statements, medical communications, legal correspondence, personal messages. Gmail's Smart Features are on by default. You have to disable them in two separate locations or one stays active.

  #subhead("AI writing assistants")

  Grammarly sends every keystroke to external servers for analysis. A 2026 privacy analysis ranked it among the most potentially privacy-damaging popular browser extensions. ChatGPT now shows ads matched to your conversation topics, with personalisation switched on automatically. All six major AI chatbot cloud services use chat data for training unless you opt out.

  #subhead("AI financial tools")

  When you connect a budgeting app to your bank through Plaid, your financial behavior feeds back to your bank through Plaid's "Bank Intelligence" product. Your bank is learning about you through the app you downloaded to learn about your bank. Only about 10% of consumers are "very willing" to share financial data with AI tools.

  #subhead("Voice assistants and health queries")

  A 2025 peer-reviewed study from Northeastern University found "radically different approaches to profiling users" across Siri, Google Assistant, and Alexa. 77% of respondents said they'd use voice assistants more if privacy protections were stronger.

  Only about 10% of consumers are willing to share health data with AI tools. Yet HIPAA doesn't cover most consumer AI. Your ChatGPT health questions have zero legal protection. That symptom checker conversation? Completely unprotected.

  #pull-page("Before using any AI feature, ask yourself: would I hand this information to a stranger on the street? If the answer is no, check where the AI runs — and whether your data is used to train it.")

  // ============================================================
  // Section 5 — Privacy-preserving AI
  // ============================================================

  #chapter("Privacy-preserving AI",
    subtitle: "The technology to protect your data already exists. Much of it is already running on your phone. The question is whether the products you use have chosen to use it.",
    number: "Section five",
  )

  #subhead("Self-hosted open-source models")

  Qwen, Llama, DeepSeek, and Mistral can be downloaded from repositories like Hugging Face and run on your own infrastructure. AI capability without sending data to the model creator. Increasingly practical via AWS Bedrock, Azure ML, or local hardware. Qwen 2.5 rivals proprietary models in capability while staying fully open-source.

  #subhead("Federated learning")

  The AI model travels to each device, learns from local data, and shares only the lessons — never the data itself. Picture a teacher who visits every student's home, observes their study habits, then writes a general guide without taking notes about any specific student. Google's Gboard improved next-word prediction by 24% this way, without ever collecting a single text message.

  #subhead("Local document search")

  AI that indexes and searches your personal documents entirely on your device. Ask it a question, and it finds the answer in your files without uploading anything anywhere. Germany's data protection authority ruled in October 2025 that this approach has a "significant positive impact on privacy compliance."

  What had to run in the cloud yesterday can run on your phone tomorrow. The performance gap is closing every year.

  #subhead("What to look for when choosing AI tools")

  Does it process on-device first? If yes, the heavy lifting happens where your data already lives. If it uses AI models, are they self-hosted or run within trusted infrastructure? If it uses the cloud, is the processing encrypted? Does it use your data to train models — and is opt-out the default? Is the architecture independently verified? Privacy claims that haven't been audited are marketing, not engineering.

  // ============================================================
  // Section 6 — Audit
  // ============================================================

  #chapter("How to audit your AI exposure in 30 minutes",
    subtitle: "Six audits. Roughly 30 minutes total. People usually find 15 to 25 AI features they didn't know about.",
    number: "Section six",
  )

  #audit-block(
    number: "1 of 6",
    title: "Your phone",
    time-estimate: "7 minutes",
    steps: (
      [iPhone — Settings → Apple Intelligence & Siri. Review all enabled features. Apple Intelligence can re-enable itself after iOS updates, so check after every single one.],
      [iPhone — Settings → Privacy & Security → Analytics & Improvements. See what's being shared with Apple.],
      [iPhone — Settings → Apps → Photos → Enhanced Visual Search. Check if enabled (it's switched on by default).],
      [Android — Settings → Google → Manage Your Google Account → Data & Privacy. Check Web & App Activity, Location History, YouTube History — all of which feed AI.],
      [Android — Gemini Memory builds a persistent profile of you and has been switched on by default since late 2025.],
    ),
  )

  #audit-block(
    number: "2 of 6",
    title: "Your email",
    time-estimate: "5 minutes",
    steps: (
      [Gmail — Settings → Data Privacy → "Smart features and personalization." Turn off in BOTH locations since both are switched on by default.],
      [Outlook — Settings → General → Privacy and Data → Review Copilot data access. Model training is on by default for personal accounts.],
      [Both — review which third-party AI assistants have inbox access. Revoke anything you don't actively use.],
    ),
  )

  #audit-block(
    number: "3 of 6",
    title: "Your cloud storage",
    time-estimate: "5 minutes",
    steps: (
      [Google Drive — AI can analyze document contents for search and suggestions, none of it end-to-end encrypted.],
      [Dropbox — AI-powered search and summarization features are expanding. Check Settings → AI Features.],
      [iCloud — Apple's on-device approach means less cloud AI analysis. Enable Advanced Data Protection for end-to-end encryption.],
    ),
  )

  #audit-block(
    number: "4 of 6",
    title: "Your AI chatbots",
    time-estimate: "5 minutes",
    steps: (
      [ChatGPT — Settings → Data Controls → "Improve the model for everyone." Toggle off. Also check Settings → Ad Personalization.],
      [Claude — Settings → explicit training choice with clear opt-in or opt-out and retention terms.],
      [Gemini — Turn off "Keep Activity" to prevent human review.],
      [Meta AI — Requires submitting a formal objection form; there's no simple toggle for US users.],
      [Self-hosted models (Qwen, Llama, DeepSeek, Mistral) — no audit needed. Your data never leaves your infrastructure.],
    ),
  )

  #audit-block(
    number: "5 of 6",
    title: "Your financial apps",
    time-estimate: "3 minutes",
    steps: (
      [Check which apps connect to your bank through Plaid or similar services.],
      [Review whether your budgeting app shares insights back to your bank — Plaid's "Bank Intelligence" is opt-out, not opt-in.],
      [If you haven't opened a financial app in three months, delete it. It may still be collecting data.],
    ),
  )

  #audit-block(
    number: "6 of 6",
    title: "Your voice assistants",
    time-estimate: "3 minutes",
    steps: (
      [Siri — Settings → Apple Intelligence & Siri → review "Listen for" settings and toggle off "Improve Siri & Dictation."],
      [Google Assistant — Review voice history at myactivity.google.com and set auto-delete to 3 months.],
      [Alexa — Alexa app → Settings → Alexa Privacy → Review Voice History and enable auto-deletion.],
    ),
  )

  Count the number of AI features you found active across all six areas. People usually find 15 to 25 they didn't know about. That number is your starting point. Set a calendar reminder to repeat this audit quarterly — AI settings change frequently, sometimes silently after updates.

  #takeaways(items: (
    [Most people find 15 to 25 active AI features they didn't know about — that's the baseline.],
    [Defaults change after every OS update. The audit is recurring, not one-time.],
    [The 30 minutes you spend here is the highest-leverage privacy work you can do this month.],
  ))

  // ============================================================
  // Section 7 — Your rights under new AI laws
  // ============================================================

  #chapter("Your rights under new AI privacy laws",
    subtitle: "Governments worldwide are passing laws to protect your data from AI misuse. Where you live determines how much protection you actually have.",
    number: "Section seven",
  )

  #subhead("European Union — the global standard")

  The EU AI Act, the world's first AI law, is in effect. Bans social scoring, untargeted facial recognition, and workplace emotion detection. Right to know when AI makes a decision about you, to request human review, and to contest automated decisions. Even if you're in the US, this applies indirectly — EU rules cover any service used by EU residents, and Google, Apple, and Microsoft all offer stronger privacy defaults to EU users than to Americans.

  #subhead("California — leading the US")

  SB 942 (AI Transparency Act, January 2026): large AI providers must offer free content detection tools and label AI-generated content. AB 2013 (Training Data Transparency, January 2026): AI developers must disclose what training data they used. ADMT Regulations (coming 2027): you'll have the right to opt out of AI-based "significant decisions" about your finances, housing, education, employment, or healthcare.

  #subhead("Colorado, Texas, federal")

  Colorado (June 2026): notification required when AI makes a decision adverse to your interests. Texas (January 2026): you must be told when you're interacting with AI. \$1.4B Meta facial recognition settlement; \$1.4B Google privacy settlement.

  No federal AI privacy law as of February 2026 — Biden's AI Executive Order was revoked on day one of the Trump administration. The FTC position: "There is no AI exemption from existing consumer protection law." 80% of Americans support AI regulation, even if it slows innovation.

  #subhead("What you can do regardless of where you live")

  Exercise opt-out rights. Request your data under CCPA or GDPR. Appeal AI decisions — if denied insurance, credit, or a job, ask whether AI was involved. File complaints with your state AG, the FTC, or your data protection authority. Document AI interactions for high-stakes decisions about health, finance, or insurance.

  // ============================================================
  // Section 8 — 10 questions
  // ============================================================

  #chapter("10 questions to ask before trusting any app",
    subtitle: "You can't audit every AI tool you'll ever use. But you can ask the right questions. These ten work for any app, any service, any AI feature — today and five years from now.",
    number: "Section eight",
  )

  #list-block(kind: "numbered", items: (
    [Where is my data processed — on my device, self-hosted, or in the cloud?],
    [Is my data used to train AI models? Is opt-out clear and reversible?],
    [Can I actually delete my data? "Delete" doesn't always mean what you think.],
    [Can humans read my conversations? Silence on this is not reassuring.],
    [Who else gets access — third parties, advertisers, partners?],
    [What happens if the company is hacked? End-to-end encryption or zero-trust?],
    [Does the company make money from my data? If free, you're often the product.],
    [Can I use the service without the AI features? Mandatory AI is a tell.],
    [How transparent is the company? Independent audits? Plain-language policy?],
    [Track record on data — clean enforcement record, no significant breaches?],
  ))

  Score each tool zero to ten across the questions. Below five deserves a second look. Below three deserves an alternative.

  // ============================================================
  // Section 9 — Taking control
  // ============================================================

  #chapter("Taking control",
    subtitle: "Perfect privacy in 2026 is impossible. Informed privacy — knowing what's happening and choosing what you're comfortable with — is absolutely within reach. Three levels of action.",
    number: "Section nine",
  )

  #subhead("Level 1 — The 15-minute fix (today)")

  Run through the phone audit. Disable AI training on your most-used chatbot — ChatGPT, Gemini, or Claude. Turn off Gmail Smart Features in both toggles. Check whether Apple Intelligence re-enabled itself after the last iOS update. Bookmark this guide for reference.

  #subhead("Level 2 — The weekend project (1–2 hours)")

  Complete the full 30-minute audit across all six areas — phone, email, cloud storage, chatbots, financial apps, voice assistants. Apply the 10-question framework to your five most-used AI tools. Request your data from one major service. Set a quarterly calendar reminder.

  #subhead("Level 3 — The ongoing practice")

  Subscribe to privacy-focused news (EFF, Proton blog, IAPP). Evaluate new AI tools before adopting them using the 10 questions. Choose products built on zero-trust architecture, on-device processing, or self-hosted open-source models. Stay informed — 1,208 AI-related bills were introduced across all 50 US states in 2025 alone.

  AI is going to get more personal, more embedded, and more capable. Every setting reviewed, every question asked, and every tool evaluated moves the line.

  // ============================================================
  // Section 10 — FAQ
  // ============================================================

  #chapter("FAQ",
    subtitle: "Short answers, with pointers back to the relevant section.",
    number: "Section ten",
  )

  #faq-block(pairs: (
    (q: "How does AI protect privacy?",
     a: "On-device processing keeps data on your phone. Confidential computing encrypts data even during cloud processing. Federated learning lets AI improve without seeing individual data. Zero-trust architecture encrypts your data with keys only you hold. Self-hosted open-source models let organizations run powerful AI entirely within their own infrastructure."),
    (q: "How does generative AI handle privacy and data security?",
     a: "Depends entirely on the provider and how the model is deployed. Cloud-based services like ChatGPT and Google Gemini process your data on remote servers. On-device approaches like Apple Intelligence keep most processing local. Privacy-first services like Proton encrypt data so even the provider can't read it. Open-source models can be self-hosted — meaning your data never reaches the model creator."),
    (q: "What about open-source AI — are they more private?",
     a: "Depends on how you use them. If you use their cloud apps (chat.deepseek.com, meta.ai), your data is processed on their servers like any cloud service. But if you download the model and run it on your own hardware or through a trusted cloud provider, your data never leaves your control. The model itself doesn't phone home."),
    (q: "How can I protect my data from AI?",
     a: "Start with the 30-minute audit in Section 6. Then apply the 10-question framework from Section 8 to any new AI tool. Quick wins: disable AI training on your chatbots, turn off Gmail's Smart Features (both toggles), check your phone's AI settings after every update."),
    (q: "Does ChatGPT save my data?",
     a: "Yes. If you haven't opted out, conversations may be stored indefinitely and used to train future models. Even after opting out, conversations are retained for 30 days. As of February 2026, ChatGPT also shows ads matched to your conversation topics with personalisation switched on by default."),
    (q: "Is AI safe to use?",
     a: "Yes — with informed choices. AI delivers benefits like better search, smarter organization, helpful writing assistance, and fraud detection. The risk is using AI tools without understanding what happens to your data. Choosing tools that respect your privacy by design makes all the difference."),
  ))

  // ============================================================
  // Sources — fresh page for clean reference reading
  // ============================================================

  #pagebreak()

  #sources-block(sources: (
    [Gallup, AI usage study, late 2024.],
    [Pew Research Center, AI interaction frequency, US adults.],
    [YouGov, AI trust survey, US.],
    [KPMG / University of Melbourne, "Trust in AI," 48,000 people across 47 countries.],
    [Capgemini Research Institute, "Why consumers love generative AI."],
    [Pew Research Center, "AI in everyday life."],
    [Salesforce, "Connected Customer," 2024 — brand-abandonment statistic.],
    [OpenAI, ChatGPT data retention policy (Terms of Use).],
    [OpenAI, advertising rollout, February 9, 2026.],
    [Google, Personal Intelligence launch announcement, January 2026.],
    [Google, Gemini Apps Activity policy.],
    [In re: Apple Voice Assistant Class Action, 2025 — settlement.],
    [Lockdown Privacy, Siri data transmission analysis.],
    [DataReportal, average smartphone photo count, 2024.],
    [Mozilla Foundation, "Privacy Not Included" — browser extensions, 2026.],
    [Stanford HAI, AI Index Report 2026 — chatbot training defaults.],
    [Plaid, "Bank Intelligence" product documentation.],
    [Capgemini Research Institute — financial / health data sharing willingness.],
    [Northeastern University, voice assistant profiling study, 2025.],
    [Pew Research Center — voice assistant trust survey.],
    [European Union, AI Act, Regulation (EU) 2024/1689.],
    [California, SB 942 — AI Transparency Act (2026).],
    [California, AB 2013 — Training Data Transparency (2026).],
    [California Privacy Protection Agency — ADMT Regulations (2027).],
    [Colorado AI Act, SB24-205 (June 2026).],
    [Texas State Attorney General — Meta facial recognition settlement.],
    [Texas State Attorney General — Google privacy settlement.],
    [Trump administration — AI Executive Order revocation, Jan 2025.],
    [FTC, Operation AI Comply enforcement summary.],
    [Pew Research Center — AI regulation support.],
    [National Conference of State Legislatures — 2025 AI bill tracker.],
  ))

]

// ============================================================
// Back cover — closing message + URL + imprint footer
// (replaces the standalone Copyright page entirely)
// ============================================================

#back-cover(
  closing: "A quiet place to hold the pieces of your life — private by design, yours by architecture.",
  url: "myvaultai.com",
  imprint: "© MyVault 2026 · First edition, February 2026 · Published by MyVault, myvaultai.com · Typeset in PT Serif and Lato · MyVault Resource Library · Private by design, zero trust by architecture",
  surface: "teal",
)
