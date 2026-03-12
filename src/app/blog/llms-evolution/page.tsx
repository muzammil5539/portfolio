import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Github, Linkedin } from 'lucide-react';

function ArticleHeader() {
  return (
    <header className="mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 tracking-tight">
        The Anatomy of LLMs: From Attention to Mixture of Experts
      </h1>
      <div className="flex items-center text-slate-400 text-sm space-x-4 mb-6">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1.5" />
          <time dateTime="2024-03-12">March 12, 2024</time>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1.5" />
          <span>15 min read</span>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="px-2 py-1 bg-slate-800 rounded-full border border-slate-700 text-xs text-slate-300">LLMs</span>
        <span className="px-2 py-1 bg-slate-800 rounded-full border border-slate-700 text-xs text-slate-300">Architecture</span>
        <span className="px-2 py-1 bg-slate-800 rounded-full border border-slate-700 text-xs text-slate-300">Deep Learning</span>
      </div>
    </header>
  );
}

function Introduction() {
  return (
    <>
      <p className="lead text-xl text-slate-300 font-medium">
        Large Language Models (LLMs) have taken the world by storm. But beneath the chat interfaces lies a fascinating evolution of mathematical and engineering breakthroughs. How do these massive networks actually work?
      </p>
      <p>
        In this post, we&apos;ll peel back the layers of modern LLMs. We&apos;ll explore the foundational mathematics of Self-Attention, the divergence between architectures like BERT and GPT, and the cutting-edge optimization techniques like Mixture of Experts (MoE) and KV Caching that make inference possible.
      </p>
    </>
  );
}

function TransformerMath() {
  return (
    <>
      <h2 className="text-3xl font-bold mt-12 mb-6 text-blue-400">1. The Core: Self-Attention</h2>
      <p>
        The Transformer architecture, introduced in 2017, relies entirely on the self-attention mechanism. Instead of processing tokens sequentially, the model computes three vectors for each token: <strong>Query (Q)</strong>, <strong>Key (K)</strong>, and <strong>Value (V)</strong>.
      </p>
      <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm my-4 border border-slate-700">
        <code className="text-pink-400">
          Attention(Q, K, V) = softmax( (Q * K^T) / √d_k ) * V
        </code>
      </pre>
      <p>
        The dot product of Query and Key determines how much &quot;attention&quot; the current token should pay to other tokens in the sequence. Dividing by the square root of the dimension (<code>√d_k</code>) prevents the gradients from vanishing during softmax.
      </p>
      <div className="bg-red-900/20 border border-red-900/50 p-4 rounded-lg my-6">
        <h4 className="text-red-400 font-semibold mb-2">The Gotcha: Quadratic Complexity</h4>
        <p className="text-sm text-slate-300 mb-0">
          The memory and compute required for self-attention scale quadratically with the sequence length (O(N²)). This is why earlier models struggled with long context windows, requiring engineering feats like FlashAttention to overcome the memory bottlenecks.
        </p>
      </div>
    </>
  );
}

function EncoderVsDecoder() {
  return (
    <>
      <h2 className="text-3xl font-bold mt-12 mb-6 text-purple-400">2. The Architectural Divergence</h2>
      <p>
        Following the original Transformer, the research community split into two primary camps:
      </p>
      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold text-emerald-400 mt-0 mb-3">Encoder-Only (BERT)</h3>
          <p className="text-sm mb-0">
            Models like BERT use bidirectional attention, meaning they look at context from both the left and the right simultaneously. This makes them exceptional at understanding language context, text classification, and search retrieval, but poor at generating text.
          </p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold text-blue-400 mt-0 mb-3">Decoder-Only (GPT)</h3>
          <p className="text-sm mb-0">
            Models like the GPT series use masked self-attention. They can only look at previous tokens (left-to-right). This autoregressive nature makes them perfect for text generation and next-token prediction, which ultimately paved the way for modern chatbots.
          </p>
        </div>
      </div>
    </>
  );
}

function ModernInnovations() {
  return (
    <>
      <h2 className="text-3xl font-bold mt-12 mb-6 text-orange-400">3. Scaling Up: Modern Innovations</h2>
      <p>
        To scale from millions to trillions of parameters, several key innovations were required:
      </p>
      <h3 className="text-2xl font-semibold mt-8 mb-4">Rotary Position Embeddings (RoPE)</h3>
      <p>
        Unlike original absolute positional encodings, RoPE injects relative positional information directly into the Q and K vectors at every layer. This allows models to extrapolate to sequence lengths longer than they were trained on.
      </p>
      <h3 className="text-2xl font-semibold mt-8 mb-4">Mixture of Experts (MoE)</h3>
      <p>
        Dense models activate every parameter for every token. MoE models (like Mixtral 8x7B) use a router network to send a token to only 1 or 2 &quot;expert&quot; sub-networks. This drastically reduces the compute required per token while maintaining a massive overall parameter count.
      </p>
    </>
  );
}

function EfficiencyTechniques() {
  return (
    <>
      <h2 className="text-3xl font-bold mt-12 mb-6 text-emerald-400">4. Efficiency at Inference</h2>
      <h3 className="text-2xl font-semibold mt-8 mb-4">KV Caching</h3>
      <p>
        During autoregressive generation, recomputing the Key and Value vectors for previous tokens is redundant. KV Caching stores these vectors in memory, drastically speeding up generation, though it requires significant VRAM.
      </p>
      <h3 className="text-2xl font-semibold mt-8 mb-4">Mixed Precision & Quantization</h3>
      <p>
        Training and running models in 32-bit floating point (FP32) uses immense memory. Modern workflows use <strong>Mixed Precision Training</strong> (using FP16 or BF16 for activations/gradients) to double training speed. At inference, techniques like INT4 or INT8 Quantization compress models to run on consumer hardware with minimal performance degradation.
      </p>
      <h3 className="text-2xl font-semibold mt-8 mb-4">Knowledge Distillation</h3>
      <p>
        To create smaller, efficient models, researchers train a &quot;student&quot; model to mimic the probability distributions (logits) of a massive &quot;teacher&quot; model, effectively transferring the teacher&apos;s generalized knowledge into a much smaller footprint.
      </p>
    </>
  );
}

function Conclusion() {
  return (
    <>
      <hr className="border-slate-700 my-12" />
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Conclusion & Key Takeaways</h2>
      <p>
        The evolution of LLMs is a testament to the power of scaling laws combined with relentless engineering optimization. From the elegance of self-attention to the efficiency of MoE and KV Caching, every bottleneck has spurred a new innovation.
      </p>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center text-center mt-8">
        <h3 className="text-xl font-bold text-white mb-2">Let&apos;s Connect!</h3>
        <p className="text-slate-300 mb-6 max-w-md">
          Interested in LLM architecture, performance optimization, or full-stack engineering? Let&apos;s connect and build something impactful.
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

export default function LLMsEvolution() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </Link>
      <article className="prose prose-invert prose-lg max-w-none prose-headings:text-slate-100 prose-a:text-emerald-400 hover:prose-a:text-emerald-300">
        <ArticleHeader />
        <Introduction />
        <TransformerMath />
        <EncoderVsDecoder />
        <ModernInnovations />
        <EfficiencyTechniques />
        <Conclusion />
      </article>
    </div>
  );
}