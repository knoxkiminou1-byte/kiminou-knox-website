import { useEffect, useRef, useState } from "react";

const SENTENCES = [
  "Kiminou Knox is an author and poet. Bay Area raised.",
  "He is the author of ten books.",
  "No ghost writers. No shortcuts.",
  "Basketball player. 6 feet, 7 inches. Multi-sport.",
  "Host of KimYaps. He talks so you don't have to stay quiet.",
  "This is a portrait of someone who started before he was ready. That's the only way to start.",
];

const FULL_TEXT = SENTENCES.join(" ");

const KEYCAPS = ["B", "I", "O", "G", "R", "A", "P", "H", "Y"];

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export default function TypewriterArchaeology() {
  const [text, setText] = useState("");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const soundEnabledRef = useRef(false);
  const cancelledRef = useRef(false);

  // Enable click sound after first interaction
  useEffect(() => {
    const enable = () => {
      soundEnabledRef.current = true;
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctx && !audioCtxRef.current) audioCtxRef.current = new Ctx();
      window.removeEventListener("pointerdown", enable);
      window.removeEventListener("keydown", enable);
    };
    window.addEventListener("pointerdown", enable, { once: true });
    window.addEventListener("keydown", enable, { once: true });
    return () => {
      window.removeEventListener("pointerdown", enable);
      window.removeEventListener("keydown", enable);
    };
  }, []);

  const click = () => {
    const ctx = audioCtxRef.current;
    if (!ctx || !soundEnabledRef.current) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 800;
    gain.gain.value = 0.03;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    osc.start(now);
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.008);
    osc.stop(now + 0.012);
  };

  useEffect(() => {
    cancelledRef.current = false;
    let current = "";
    let glitchesLeft = Math.max(2, Math.floor(FULL_TEXT.length * 0.02));
    let backspacesLeft = SENTENCES.length * 3;

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    const run = async () => {
      for (let i = 0; i < FULL_TEXT.length; i++) {
        if (cancelledRef.current) return;
        const ch = FULL_TEXT[i];

        // occasional mid-word backspace correction
        if (backspacesLeft > 0 && ch !== " " && current.length > 4 && Math.random() < 0.02) {
          backspacesLeft--;
          const erase = Math.floor(rand(2, 4));
          for (let e = 0; e < erase && current.length > 0; e++) {
            current = current.slice(0, -1);
            setText(current);
            await sleep(rand(40, 80));
            if (cancelledRef.current) return;
          }
        }

        // "stuck key" — render a block glyph briefly, then correct
        if (glitchesLeft > 0 && /[a-zA-Z]/.test(ch) && Math.random() < 0.02) {
          glitchesLeft--;
          setText(current + "▓");
          click();
          await sleep(rand(60, 120));
          if (cancelledRef.current) return;
        }

        current += ch;
        setText(current);
        click();

        if (/[.,!?]/.test(ch)) {
          await sleep(rand(200, 400));
        } else if (ch === " ") {
          await sleep(rand(80, 120));
        } else {
          await sleep(rand(45, 90));
        }
      }
    };

    run();
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0a0804] py-24">
      {/* noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.4) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />
      {/* DRAFT watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="rotate-[-15deg] font-serif text-8xl uppercase tracking-widest text-white opacity-[0.04]">
          Draft
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-10">
        {/* keycap header */}
        <div className="mb-10 flex flex-wrap gap-1.5">
          {KEYCAPS.map((k, i) => (
            <span
              key={i}
              className="inline-flex h-8 w-8 items-center justify-center border border-white/10 bg-white/5 font-mono text-xs text-white/40"
            >
              {k}
            </span>
          ))}
        </div>

        <div className="border border-white/8 bg-black/30 p-8 md:p-12">
          <p className="min-h-[160px] whitespace-pre-wrap font-mono text-base leading-relaxed text-white/75">
            {text}
            <span className="ml-0.5 inline-block animate-pulse text-amber-400">|</span>
          </p>
        </div>
      </div>
    </section>
  );
}
