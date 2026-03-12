"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HistoryOfNLP() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto text-ai-text">
        <Link href="/blog" className="inline-flex items-center text-ai-cyan hover:underline mb-8 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <header className="mb-12 border-b border-ai-charcoal pb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-ai-cyan to-ai-blue">
              Natural Language Processing and its History
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-ai-text-muted">
              <span>March 2024</span>
              <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan" />
              <span>10 min read</span>
              <span className="w-1.5 h-1.5 rounded-full bg-ai-cyan" />
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-ai-charcoal border border-ai-slate text-ai-cyan text-xs font-semibold">NLP</span>
                <span className="px-3 py-1 rounded-full bg-ai-charcoal border border-ai-slate text-ai-cyan text-xs font-semibold">History</span>
                <span className="px-3 py-1 rounded-full bg-ai-charcoal border border-ai-slate text-ai-cyan text-xs font-semibold">AI</span>
              </div>
            </div>
          </header>

          <section className="mb-12">
            <p className="text-xl leading-relaxed text-ai-text-muted mb-6">
              Natural Language Processing (NLP) is one of the most exciting fields in artificial intelligence today. It bridges the gap between human communication and computer understanding. From rudimentary rule-based systems to the highly sophisticated Large Language Models (LLMs) we see today, the journey of NLP is a fascinating tale of innovation and computational leaps. Let&apos;s travel back in time to explore how it all started.
            </p>
          </section>

          <section className="mb-12 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-ai-cyan to-ai-blue rounded-full"></div>
            <div className="pl-8">
              <h2 className="text-3xl font-bold mb-6 text-ai-cyan">1. The Dawn: Symbolic NLP (1950s - 1980s)</h2>
              <p className="mb-4">
                The history of NLP officially began in the 1950s. Alan Turing published his famous paper &quot;Computing Machinery and Intelligence&quot; (1950), which proposed what is now called the <strong>Turing Test</strong> as a criterion of intelligence.
              </p>
              <div className="bg-ai-charcoal/40 p-6 rounded-xl border border-ai-charcoal my-6">
                <h3 className="text-xl font-semibold text-ai-text mb-2">The Georgetown Experiment (1954)</h3>
                <p className="text-sm text-ai-text-muted">
                  This experiment involved fully automatic translation of more than sixty Russian sentences into English. The authors claimed that within three or five years, machine translation would be a solved problem. The real-world complexity of language proved them wrong.
                </p>
              </div>
              <p className="mb-4">
                In 1966, Joseph Weizenbaum developed <strong>ELIZA</strong>, an early natural language processing computer program created at MIT. ELIZA simulated conversation by using a &quot;pattern matching&quot; and substitution methodology that gave users an illusion of understanding on the part of the program, despite having no built-in framework for contextualizing events.
              </p>
              <p className="mb-4">
                During this period, systems were highly rigid. They relied on complex sets of hand-written rules and ontologies (like WordNet) to process text. It was effective in small, closed domains, but failed when exposed to the ambiguity and flexibility of real human language.
              </p>
            </div>
          </section>

          <section className="mb-12 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-ai-blue to-purple-500 rounded-full"></div>
            <div className="pl-8">
              <h2 className="text-3xl font-bold mb-6 text-purple-400">2. The Statistical Revolution (1990s - 2010s)</h2>
              <p className="mb-4">
                As computational power increased and large corpora of text became available (partially due to the advent of the World Wide Web), researchers realized that hand-crafting rules was not scalable. NLP underwent a &quot;statistical revolution.&quot;
              </p>
              <ul className="list-disc pl-5 mb-6 text-ai-text-muted space-y-2">
                <li><strong>Machine Learning Algorithms:</strong> Researchers began using machine learning algorithms like Decision Trees, Support Vector Machines (SVMs), and Naive Bayes to extract meaning from text.</li>
                <li><strong>Hidden Markov Models (HMMs):</strong> HMMs became heavily used for Part-of-Speech tagging and speech recognition.</li>
                <li><strong>N-gram models:</strong> Language modeling heavily relied on statistical properties of word sequences (n-grams).</li>
              </ul>
              <p className="mb-4">
                Instead of rigid rules, the system <em>learned</em> probabilities from data. A famous quote by Fred Jelinek perfectly encapsulates this era: <br/><br/>
                <blockquote className="border-l-4 border-ai-cyan pl-4 italic text-ai-text-muted">
                  &quot;Every time I fire a linguist, the performance of the speech recognizer goes up.&quot;
                </blockquote>
              </p>
            </div>
          </section>

          <section className="mb-12 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <div className="pl-8">
              <h2 className="text-3xl font-bold mb-6 text-pink-400">3. The Deep Learning Era: Word Embeddings (2010s)</h2>
              <p className="mb-4">
                Deep Learning brought the next massive leap. The core shift was from sparse representations (like one-hot encoding or Bag-of-Words) to dense, continuous vector representations.
              </p>
              <p className="mb-4">
                In 2013, Tomas Mikolov and his team at Google introduced <strong>Word2Vec</strong>. Word2Vec mapped words to a high-dimensional vector space such that words with similar meanings were placed close together. It famously captured semantic relationships, leading to equations like:
              </p>
              <div className="bg-ai-navy p-4 rounded-lg font-mono text-center text-ai-cyan mb-6 shadow-glow-cyan">
                King - Man + Woman ≈ Queen
              </div>
              <p className="mb-4">
                Shortly after, Recurrent Neural Networks (RNNs) and Long Short-Term Memory networks (LSTMs) became the standard for handling sequential text data, leading to breakthroughs in machine translation (e.g., Google&apos;s Neural Machine Translation system).
              </p>
            </div>
          </section>

          <section className="mb-12 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 to-amber-500 rounded-full"></div>
            <div className="pl-8">
              <h2 className="text-3xl font-bold mb-6 text-amber-400">4. Attention is All You Need: The Transformer (2017)</h2>
              <p className="mb-4">
                In 2017, a seminal paper by Google researchers titled <em>&quot;Attention Is All You Need&quot;</em> was published. This paper introduced the <strong>Transformer</strong> architecture.
              </p>
              <p className="mb-4">
                Prior to Transformers, models processed text sequentially (word by word), which was slow and struggled with long-range dependencies (forgetting earlier words in a long sentence). Transformers introduced the <strong>Self-Attention Mechanism</strong>, allowing the model to look at <em>all</em> words in a sentence simultaneously and weigh their importance relative to each other.
              </p>
              <p className="mb-4">
                This architecture was highly parallelizable (making it perfect for GPUs) and incredibly effective. It became the foundation for almost every modern LLM.
              </p>
            </div>
          </section>

          <section className="mb-12 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-ai-cyan rounded-full"></div>
            <div className="pl-8">
              <h2 className="text-3xl font-bold mb-6 text-amber-300">5. Modern Large Language Models (LLMs)</h2>
              <p className="mb-4">
                Transformers led to an explosion of Large Language Models.
              </p>
              <ul className="list-disc pl-5 mb-6 text-ai-text-muted space-y-4">
                <li><strong>BERT (Bidirectional Encoder Representations from Transformers):</strong> Released by Google in 2018, BERT read text bidirectionally (left-to-right and right-to-left simultaneously). It excelled at understanding the context of words in search queries.</li>
                <li><strong>GPT (Generative Pre-trained Transformer):</strong> Developed by OpenAI, GPT models are decoder-only transformers trained to predict the next word. From GPT-1 (117M parameters) to GPT-3 (175B parameters) and beyond (GPT-4), these models showed emergent capabilities like translation, coding, and reasoning simply by predicting the next token.</li>
                <li><strong>Open Source Revolution:</strong> Models like LLaMA (Meta), Mistral, and Falcon democratized access to highly capable models, proving that you don&apos;t need a massive closed-source model to achieve great performance.</li>
              </ul>
              <p className="mb-4">
                Today, NLP has moved from understanding text to multimodal capabilities (understanding text, audio, images, and video simultaneously), pushing the boundaries of what Artificial General Intelligence (AGI) might look like.
              </p>
            </div>
          </section>

          <section className="mt-16 pt-8 border-t border-ai-charcoal">
            <h3 className="text-2xl font-bold mb-4 text-ai-text">Resources and Further Reading</h3>
            <ul className="list-disc pl-5 text-ai-cyan space-y-2">
              <li>
                <a href="https://academic.oup.com/mind/article/LIX/236/433/986238" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Turing, A. M. (1950) - Computing Machinery and Intelligence
                </a>
              </li>
              <li>
                <a href="https://arxiv.org/abs/1301.3781" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Mikolov et al. (2013) - Efficient Estimation of Word Representations in Vector Space (Word2Vec)
                </a>
              </li>
              <li>
                <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Vaswani et al. (2017) - Attention Is All You Need
                </a>
              </li>
              <li>
                <a href="https://arxiv.org/abs/1810.04805" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Devlin et al. (2018) - BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding
                </a>
              </li>
            </ul>
          </section>
        </motion.article>
      </main>
      <Footer />
    </>
  );
}
