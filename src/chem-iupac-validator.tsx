import { useState, useCallback } from "react";

const COMPOUNDS = [
  { formula: "[Co(NH₃)₆]³⁺", full: "[Co(NH₃)₆]Cl₃" },
  { formula: "[CoCl₂(NH₃)₄]⁺", full: "[CoCl₂(NH₃)₄]Cl" },
  { formula: "[Cr(NH₃)₃(H₂O)₃]³⁺", full: "[Cr(NH₃)₃(H₂O)₃]Cl₃" },
  { formula: "[Pt(NH₃)₂Cl₂]⁰", full: "[Pt(NH₃)₂Cl₂]" },
  { formula: "[Ni(CO)₄]⁰", full: "[Ni(CO)₄]" },
  { formula: "[Cu(NH₃)₄]²⁺", full: "[Cu(NH₃)₄]SO₄" },
  { formula: "[Fe(H₂O)₆]³⁺", full: "[Fe(H₂O)₆]Cl₃" },
  { formula: "[Co(en)₃]³⁺", full: "[Co(en)₃]Cl₃" },
  { formula: "[Fe(CN)₆]³⁻", full: "K₃[Fe(CN)₆]" },
  { formula: "[Fe(CN)₆]⁴⁻", full: "K₄[Fe(CN)₆]" },
  { formula: "[PdCl₄]²⁻", full: "K₂[PdCl₄]" },
  { formula: "[NiCl₄]²⁻", full: "K₂[NiCl₄]" },
  { formula: "[ZnCl₄]²⁻", full: "Na₂[ZnCl₄]" },
  { formula: "[Ag(CN)₂]⁻", full: "K[Ag(CN)₂]" },
  { formula: "[CrCl₃(NH₃)₃]⁰", full: "[CrCl₃(NH₃)₃]" },
  { formula: "[Cr(en)₂Cl₂]⁺", full: "[Cr(en)₂Cl₂]Cl" },
  { formula: "[PtCl₄(NH₃)₂]⁰", full: "[PtCl₄(NH₃)₂]" },
  { formula: "[Co(NO₂)₃(NH₃)₃]⁰", full: "[Co(NO₂)₃(NH₃)₃]" },
  { formula: "[Cr(C₂O₄)₃]³⁻", full: "K₃[Cr(C₂O₄)₃]" },
  { formula: "[Ag(NH₃)₂]⁺", full: "[Ag(NH₃)₂]Cl" },
  { formula: "[CoF₆]³⁻", full: "Na₃[CoF₆]" },
  { formula: "[CoCl(NH₃)₅]²⁺", full: "[CoCl(NH₃)₅]Cl₂" },
  { formula: "[Fe(CN)₂(en)₂]⁰", full: "[Fe(CN)₂(en)₂]" },
  { formula: "[Mn(H₂O)₆]²⁺", full: "[Mn(H₂O)₆]SO₄" },
  { formula: "[Cr(H₂O)₄Cl₂]⁺", full: "[Cr(H₂O)₄Cl₂]Cl" },
  { formula: "[CuCl₄]²⁻", full: "K₂[CuCl₄]" },
  { formula: "[Pd(NH₃)₄]²⁺", full: "[Pd(NH₃)₄]Cl₂" },
  { formula: "[Fe(CN)₅(NO)]²⁻", full: "Na₂[Fe(CN)₅(NO)]" },
  { formula: "[Ti(H₂O)₆]³⁺", full: "[Ti(H₂O)₆]Cl₃" },
  // Two coordination spheres
  { formula: "[Co(NH₃)₆]³⁺ [Cr(CN)₆]³⁻", full: "[Co(NH₃)₆][Cr(CN)₆]" },
  { formula: "[Cr(NH₃)₆]³⁺ [Co(CN)₆]³⁻", full: "[Cr(NH₃)₆][Co(CN)₆]" },
  { formula: "[Pt(NH₃)₄]²⁺ [CuCl₄]²⁻", full: "[Pt(NH₃)₄][CuCl₄]" },
  { formula: "[Co(NH₃)₆]³⁺ [Cr(C₂O₄)₃]³⁻", full: "[Co(NH₃)₆][Cr(C₂O₄)₃]" },
  { formula: "[Cu(NH₃)₄]²⁺ [PtCl₄]²⁻", full: "[Cu(NH₃)₄][PtCl₄]" },
  { formula: "[Ni(NH₃)₆]²⁺ [NiCl₄]²⁻", full: "[Ni(NH₃)₆][NiCl₄]" },
  { formula: "[Pt(NH₃)₄]²⁺ [PtCl₄]²⁻", full: "[Pt(NH₃)₄][PtCl₄]" },
  { formula: "[Co(en)₃]³⁺ [Cr(C₂O₄)₃]³⁻", full: "[Co(en)₃][Cr(C₂O₄)₃]" },
  { formula: "[Cr(NH₃)₆]³⁺ [Fe(CN)₆]³⁻", full: "[Cr(NH₃)₆][Fe(CN)₆]" },
  { formula: "[Co(NH₃)₅Cl]²⁺ [Cr(CN)₆]³⁻", full: "[Co(NH₃)₅Cl]₂[Cr(CN)₆]" },  
  // More single coordination sphere compounds
  { formula: "[Cr(en)₃]³⁺", full: "[Cr(en)₃]Cl₃" },
  { formula: "[Co(C₂O₄)₃]³⁻", full: "K₃[Co(C₂O₄)₃]" },
  { formula: "[Pt(NH₃)₄Cl₂]²⁺", full: "[Pt(NH₃)₄Cl₂]Cl₂" },
  { formula: "[Fe(H₂O)₅(NO)]²⁺", full: "[Fe(H₂O)₅(NO)]SO₄" },
  { formula: "[Cr(NH₃)₄Cl₂]⁺", full: "[Cr(NH₃)₄Cl₂]Cl" },
  { formula: "[Co(NH₃)₄(H₂O)Cl]²⁺", full: "[Co(NH₃)₄(H₂O)Cl]Cl₂" },
  { formula: "[Ni(CN)₄]²⁻", full: "K₂[Ni(CN)₄]" },
  { formula: "[Zn(NH₃)₄]²⁺", full: "[Zn(NH₃)₄]Cl₂" },
  { formula: "[Co(NH₃)₄CO₃]⁺", full: "[Co(NH₃)₄CO₃]Cl" },
  { formula: "[Pt(py)₄]²⁺", full: "[Pt(py)₄]Cl₂" },
  { formula: "[Ir(NH₃)₄Cl₂]⁺", full: "[Ir(NH₃)₄Cl₂]Cl" },
];

const getRandom = (exclude = null) => {
  let filtered = exclude !== null ? COMPOUNDS.filter((_, i) => i !== exclude) : COMPOUNDS;
  let idx = COMPOUNDS.indexOf(filtered[Math.floor(Math.random() * filtered.length)]);
  return idx;
};

export default function App() {
  const [idx, setIdx] = useState(() => getRandom());
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [showHint, setShowHint] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [attempted, setAttempted] = useState({});

  const verify = useCallback(async () => {
    if (!answer.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are a CBSE Class 12 Chemistry expert. The student was shown this coordination compound formula: ${COMPOUNDS[idx].formula} (full salt: ${COMPOUNDS[idx].full})

They answered the IUPAC name as: "${answer.trim()}"

IMPORTANT EVALUATION RULES:
1. First, determine the correct IUPAC name yourself.
2. Then compare the student's answer against it.
3. Be LENIENT with: capitalization, hyphens vs spaces, minor spelling variations, "chloro" vs "chlorido" (both acceptable), bracket styles, spacing around parentheses.
4. Mark "correct": true if the student's answer conveys the same correct name, even with minor formatting differences.
5. Mark "correct": false ONLY if there is a genuine naming error (wrong ligand name, wrong metal, wrong oxidation state, wrong order, wrong suffix).
6. CRITICAL: Your "correct" field MUST be consistent with your "explanation". If your explanation says the answer is correct or essentially correct, then "correct" MUST be true.

For compounds with two coordination spheres, the cation is named first, then the anion.

Respond ONLY with a JSON object, no markdown, no backticks:
{"correct": true/false, "correctName": "the correct IUPAC name", "explanation": "brief 1-2 sentence explanation of naming rules applied or what went wrong"}`,
            },
          ],
        }),
      });
      const data = await res.json();
      const text = data.content.map((c) => c.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setAttempted((a) => ({ ...a, [idx]: parsed.correct ? "correct" : "wrong" }));
      setStats((s) => ({
        correct: s.correct + (parsed.correct ? 1 : 0),
        total: s.total + 1,
      }));
    } catch (e) {
      setResult({ correct: false, correctName: "—", explanation: "Something went wrong verifying. Try again." });
    }
    setLoading(false);
  }, [answer, idx]);

  const next = () => {
    setIdx(getRandom(idx));
    setAnswer("");
    setResult(null);
    setShowHint(false);
  };

  const goTo = (i) => {
    setIdx(i);
    setAnswer("");
    setResult(null);
    setShowHint(false);
    setShowNav(false);
  };

  const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", display: "flex", justifyContent: "center", padding: "40px 16px" }}>
      <div style={{ maxWidth: 540, width: "100%" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 600, color: "#111", margin: 0 }}>Coordination Compounds</h1>
              <p style={{ color: "#666", fontSize: 14, margin: "4px 0 0" }}>IUPAC Naming Practice — CBSE +2</p>
            </div>
            <button
              onClick={() => setShowNav(!showNav)}
              style={{
                background: showNav ? "#111" : "#fff",
                color: showNav ? "#fff" : "#111",
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Q {idx + 1}/{COMPOUNDS.length} ▾
            </button>
          </div>
        </div>

        {showNav && (
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, padding: 16, marginBottom: 16, maxHeight: 260, overflowY: "auto" }}>
            <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#999", margin: "0 0 12px" }}>
              Select a compound ({Object.keys(attempted).length}/{COMPOUNDS.length} attempted)
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 6 }}>
              {COMPOUNDS.map((c, i) => {
                const status = attempted[i];
                const isActive = i === idx;
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "8px 10px",
                      fontSize: 12,
                      fontFamily: "Georgia, serif",
                      background: isActive ? "#f0f0f0" : "transparent",
                      border: isActive ? "1px solid #ccc" : "1px solid transparent",
                      borderRadius: 6,
                      cursor: "pointer",
                      textAlign: "left",
                      color: "#333",
                    }}
                  >
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                      background: status === "correct" ? "#16a34a" : status === "wrong" ? "#dc2626" : "#ddd",
                    }} />
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {i + 1}. {c.formula}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {stats.total > 0 && (
          <div style={{ display: "flex", gap: 24, marginBottom: 24, fontSize: 13, color: "#555" }}>
            <span>Score: <strong style={{ color: "#111" }}>{stats.correct}/{stats.total}</strong></span>
            <span>Accuracy: <strong style={{ color: pct >= 70 ? "#16a34a" : pct >= 40 ? "#ca8a04" : "#dc2626" }}>{pct}%</strong></span>
          </div>
        )}

        <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, padding: 32, marginBottom: 16 }}>
          <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "#999", margin: "0 0 12px" }}>Name this compound</p>
          <p style={{ fontSize: 28, fontWeight: 500, color: "#111", margin: 0, fontFamily: "Georgia, serif", letterSpacing: 0.5 }}>
            {COMPOUNDS[idx].formula}
          </p>
          <p style={{ fontSize: 13, color: "#999", margin: "8px 0 0" }}>
            Full salt: {COMPOUNDS[idx].full}
          </p>
        </div>

        {!showHint && !result && (
          <button onClick={() => setShowHint(true)} style={{ background: "none", border: "none", color: "#888", fontSize: 13, cursor: "pointer", padding: "0 0 16px", textDecoration: "underline", textUnderlineOffset: 3 }}>
            Need a hint?
          </button>
        )}

        {showHint && !result && (
          <div style={{ background: "#f5f5f0", border: "1px solid #e5e5dc", borderRadius: 8, padding: 16, marginBottom: 16, fontSize: 13, color: "#555", lineHeight: 1.6 }}>
            <strong style={{ color: "#444" }}>Naming rules:</strong> Name cation before anion. For the complex ion — list ligands alphabetically (anionic with -ido suffix, neutral: ammine, aqua, carbonyl), then metal with oxidation state in Roman numerals. If the complex is anionic, metal gets -ate suffix.
          </div>
        )}

        <div style={{ marginTop: 8 }}>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && !result && verify()}
            placeholder="Type the IUPAC name..."
            disabled={!!result}
            style={{
              width: "100%",
              padding: "14px 16px",
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: 8,
              outline: "none",
              boxSizing: "border-box",
              background: result ? "#f9f9f9" : "#fff",
              color: "#111",
            }}
          />

          {!result ? (
            <button
              onClick={verify}
              disabled={loading || !answer.trim()}
              style={{
                marginTop: 12,
                width: "100%",
                padding: "12px",
                fontSize: 15,
                fontWeight: 500,
                background: loading || !answer.trim() ? "#e5e5e5" : "#111",
                color: loading || !answer.trim() ? "#999" : "#fff",
                border: "none",
                borderRadius: 8,
                cursor: loading || !answer.trim() ? "default" : "pointer",
              }}
            >
              {loading ? "Verifying..." : "Check Answer"}
            </button>
          ) : (
            <div style={{ marginTop: 16 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
                fontSize: 16,
                fontWeight: 600,
                color: result.correct ? "#16a34a" : "#dc2626",
              }}>
                <span style={{ fontSize: 20 }}>{result.correct ? "✓" : "✗"}</span>
                {result.correct ? "Correct!" : "Not quite"}
              </div>

              {!result.correct && (
                <div style={{ marginBottom: 12 }}>
                  <p style={{ fontSize: 12, color: "#999", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.5 }}>Correct name</p>
                  <p style={{ fontSize: 15, color: "#111", margin: 0, fontWeight: 500 }}>{result.correctName}</p>
                </div>
              )}

              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, margin: "0 0 16px" }}>{result.explanation}</p>

              <button
                onClick={next}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: 15,
                  fontWeight: 500,
                  background: "#111",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Next Compound →
              </button>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#bbb", marginTop: 32 }}>Press Enter to submit • AI-verified answers</p>
      </div>
    </div>
  );
}
