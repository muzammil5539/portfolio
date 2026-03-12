import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Github, Linkedin } from 'lucide-react';

function ArticleHeader() {
  return (
    <header className="mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-4 tracking-tight">
        How I Learned to Stop Worrying and Love the Transformer: A Deep Dive into NLP History
      </h1>
      <div className="flex items-center text-slate-400 text-sm space-x-4 mb-6">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1.5" />
          <time dateTime="2024-03-12">March 12, 2024</time>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1.5" />
          <span>12 min read</span>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="px-2 py-1 bg-slate-800 rounded-full border border-slate-700 text-xs text-slate-300">NLP</span>
        <span className="px-2 py-1 bg-slate-800 rounded-full border border-slate-700 text-xs text-slate-300">History</span>
        <span className="px-2 py-1 bg-slate-800 rounded-full border border-slate-700 text-xs text-slate-300">Machine Learning</span>
      </div>
    </header>
  );
}

function Introduction() {
  return (
    <>
      <p className="lead text-xl text-slate-300 font-medium">
        Natural Language Processing (NLP) is the subfield of artificial intelligence focused on the interaction between computers and human language. Today, interacting with machines via text or voice feels entirely natural. But how did we get from hardcoded rules to machines that write poetry and pass the bar exam?
      </p>
      <p>
        In this post, we&apos;ll explore the foundational shifts in NLP—from early rule-based systems to the statistical revolution, the deep learning era, and finally, the Transformer architecture that powers today&apos;s LLMs. We&apos;ll also cover the <em>&quot;gotchas&quot;</em> that forced researchers to abandon previous paradigms.
      </p>
    </>
  );
}

function RuleBasedEra() {
  return (
    <>
      <h2 className="text-3xl font-bold mt-12 mb-6 text-emerald-400">1. The Rule-Based Era (1950s - 1980s)</h2>
      <p>
        In the early days of AI, researchers believed that language could be mapped out using exhaustive dictionaries and complex logical rules. This era was characterized by <strong>symbolic AI</strong>.
      </p>
      <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 my-8">
        <h3 className="text-xl font-semibold text-white mb-3 mt-0">The Georgetown-IBM Experiment (1954)</h3>
        <p className="mb-0 text-sm">
          One of the first milestones was a highly publicized demonstration of machine translation. An IBM 701 computer translated 60 carefully selected Russian sentences into English. It relied on a dictionary of 250 words and just six grammar rules. While heavily constrained, it sparked massive initial funding for NLP research.
        </p>
      </div>
      <h3 className="text-2xl font-semibold mt-8 mb-4">ELIZA and Symbolic AI (1966)</h3>
      <p>
        Created by Joseph Weizenbaum at MIT, <strong>ELIZA</strong> is widely considered the first chatterbot. Its most famous script, DOCTOR, simulated a Rogerian psychotherapist. ELIZA didn&apos;t &quot;understand&quot; anything. It relied entirely on pattern matching and substitution.
      </p>
      <div className="bg-red-900/20 border border-red-900/50 p-4 rounded-lg my-6">
        <h4 className="text-red-400 font-semibold mb-2">The Gotcha: The Brittleness of Rules</h4>
        <p className="text-sm text-slate-300 mb-0">
          Rule-based systems failed because human language is infinitely generative and highly ambiguous. You cannot write a grammar rule for every possible sentence or slang term. The system would break down the moment a user stepped outside the predefined boundaries.
        </p>
      </div>
    </>
  );
}

function StatisticalRevolution() {
  return (
    <>
      <h2 className="text-3xl font-bold mt-12 mb-6 text-blue-400">2. The Statistical Revolution (1990s - 2010s)</h2>
      <p>
        By the late 1980s, the field experienced a massive paradigm shift away from linguistics-based rules toward <strong>data-driven statistical models</strong>, fueled by increased computational power.
      </p>
      <h3 className="text-2xl font-semibold mt-8 mb-4">Hidden Markov Models (HMMs) and TF-IDF</h3>
      <p>
        Instead of asking &quot;what is the grammar rule here?&quot; researchers started asking &quot;what is the probability of this word appearing next?&quot;
      </p>
      <p>
        <strong>TF-IDF</strong> (Term Frequency-Inverse Document Frequency) became the standard for information retrieval. It works by evaluating how important a word is to a document within a massive corpus.
      </p>
      <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm my-4 border border-slate-700">
        <code className="text-pink-400">
          TF(t, d) = (Number of times term t appears in document d) / (Total words in d){'\n'}
          IDF(t, D) = log(Total number of documents D / Number of documents containing t){'\n'}
          TF-IDF = TF * IDF
        </code>
      </pre>
      <div className="bg-red-900/20 border border-red-900/50 p-4 rounded-lg my-6">
        <h4 className="text-red-400 font-semibold mb-2">The Gotcha: The Curse of Dimensionality</h4>
        <p className="text-sm text-slate-300 mb-0">
          Statistical methods treated words as isolated symbols (one-hot encoding). The vocabulary size equaled the number of dimensions, leading to massive, sparse matrices. Furthermore, these models had no understanding of semantic similarity—&quot;car&quot; and &quot;automobile&quot; were completely unrelated vectors.
        </p>
      </div>
    </>
  );
}

function DeepLearningEra() {
  return (
    <>
      <h2 className="text-3xl font-bold mt-12 mb-6 text-purple-400">3. The Deep Learning Era Begins (2010s)</h2>
      <p>
        To solve the sparsity problem, neural networks introduced dense vector representations.
      </p>
      <h3 className="text-2xl font-semibold mt-8 mb-4">Word2Vec (2013)</h3>
      <p>
        Developed by Tomas Mikolov, Word2Vec revolutionized NLP by training a shallow neural network to predict words based on context (CBOW) or predict context based on a word (Skip-gram).
      </p>
      <h3 className="text-2xl font-semibold mt-8 mb-4">Seq2Seq and LSTMs (2014)</h3>
      <p>
        For sequence generation like machine translation, researchers turned to Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM) networks. The Seq2Seq architecture used an Encoder to compress a sentence into a fixed-size &quot;context vector&quot; and a Decoder to generate the translation.
      </p>
      <div className="bg-red-900/20 border border-red-900/50 p-4 rounded-lg my-6">
        <h4 className="text-red-400 font-semibold mb-2">The Gotcha: The Information Bottleneck</h4>
        <p className="text-sm text-slate-300 mb-0">
          Compressing a long sentence into a single, fixed-size vector caused massive information loss. LSTMs also processed text sequentially, making them incredibly slow to train because they couldn&apos;t take advantage of parallel GPU processing.
        </p>
      </div>
    </>
  );
}

function TransformerEra() {
  return (
    <>
      <h2 className="text-3xl font-bold mt-12 mb-6 text-orange-400">4. The Transformer (2017 - Present)</h2>
      <p>
        In 2017, Google published <em>&quot;Attention Is All You Need,&quot;</em> introducing the <strong>Transformer</strong> architecture. It abandoned recurrence entirely, relying instead on <strong>Self-Attention</strong>.
      </p>
      <p>
        Self-attention allows the model to calculate the relevance of every word in a sentence to every other word, simultaneously. This eliminated the information bottleneck and allowed for massive parallelization across GPUs.
      </p>
      <ul className="space-y-2 list-disc pl-6 text-slate-300 my-4">
        <li><strong>BERT (2018):</strong> A bidirectional encoder model that revolutionized search intent.</li>
        <li><strong>GPT Series (2018+):</strong> Decoder-only autoregressive models that led to the Generative AI boom.</li>
      </ul>
    </>
  );
}

function Conclusion() {
  return (
    <>
      <hr className="border-slate-700 my-12" />
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">Conclusion & Key Takeaways</h2>
      <p>
        The history of NLP is a story of abandoning rigid assumptions in favor of scale and continuous representations. What started as 6 hardcoded grammar rules has evolved into models with trillions of parameters trained on the entire internet.
      </p>
      <p className="mb-8">
        If you are working on NLP today, the lesson is clear: leverage pre-trained continuous representations, and when in doubt, scale up your compute and data.
      </p>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center">
        <h3 className="text-xl font-bold text-white mb-2">Let&apos;s Connect!</h3>
        <p className="text-slate-300 mb-6 max-w-md">
          Did you find this deep dive helpful? I&apos;m currently looking for full-stack and AI engineering roles. Let&apos;s build something amazing together.
        </p>
        <div className="flex gap-4">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg hover:bg-slate-700 transition-colors border border-slate-700">
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default function HistoryOfNLP() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </Link>
      <article className="prose prose-invert prose-lg max-w-none prose-headings:text-slate-100 prose-a:text-blue-400 hover:prose-a:text-blue-300">
        <ArticleHeader />
        <Introduction />
        <RuleBasedEra />
        <StatisticalRevolution />
        <DeepLearningEra />
        <TransformerEra />
        <Conclusion />
      </article>
    </div>
  );
}