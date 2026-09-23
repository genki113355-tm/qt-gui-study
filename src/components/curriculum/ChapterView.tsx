import React, { useState, useEffect, useMemo } from 'react';
import { Chapter, CodeHighlightTarget, CodeFile } from '../../types/curriculum';
import { DialogueBubble } from './DialogueBubble';
import { CodeViewer } from './CodeViewer';
import { ConceptDiagram } from './ConceptDiagram';
import { ParadigmComparisonView } from './ParadigmComparisonView';
import { ChapterVisualPreview } from './ChapterVisualPreview';


import { MemoryVisualizer } from './MemoryVisualizer';
import { VariableInspector } from './VariableInspector';
import { RichExplanation } from './RichExplanation';
import { UmlDiagramViewer } from './UmlDiagramViewer';
import { CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Lightbulb, HelpCircle, GitCommit, Copy, Check, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

import { ShareButtons } from '../common/ShareButtons';
import { GlossaryTooltip } from '../common/GlossaryTooltip';

type ViewMode = 'all' | 'learn' | 'code' | 'practice';

interface ChapterViewProps {
  chapter: Chapter;
  onNavigate: (slug: string) => void;
  onComplete: (id: number) => void;
  isCompleted: boolean;
}

export const ChapterView: React.FC<ChapterViewProps> = ({
  chapter,
  onNavigate,
  onComplete,
  isCompleted,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [codeHighlight, setCodeHighlight] = useState<CodeHighlightTarget | undefined>();
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [copiedClone, setCopiedClone] = useState(false);
  const [checkedPrereqs, setCheckedPrereqs] = useState<Record<string, boolean>>({});

  const handleCopyClone = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const togglePrereq = (idx: number) => {
    setCheckedPrereqs((prev) => ({
      ...prev,
      [`${chapter.id}-${idx}`]: !prev[`${chapter.id}-${idx}`],
    }));
  };

  // 章切り替え時に表示モードをデフォルト（すべて表示）にリセット
  useEffect(() => {
    setViewMode('all');
  }, [chapter.slug]);

  // この章に含まれるすべての教材コードファイルを抽出
  const allCodeFiles = useMemo(() => {
    const files: CodeFile[] = [];
    const seen = new Set<string>();

    chapter.sections.forEach((s) => {
      if (s.codeFiles) {
        s.codeFiles.forEach((f) => {
          if (!seen.has(f.filename)) {
            seen.add(f.filename);
            files.push(f);
          }
        });
      }
    });

    return files;
  }, [chapter]);

  const handleSelectOption = (questionId: string, optionIndex: number, correctIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanations((prev) => ({ ...prev, [questionId]: true }));

    if (optionIndex === correctIndex) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
      onComplete(chapter.id);
    }
  };

    const getTrackBadge = () => {
    return (
      <span className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border flex items-center gap-2 shadow-sm bg-cyan-950/80 text-cyan-300 border-cyan-500/40">
        <span className="w-2.5 h-2.5 rounded-full animate-ping inline-block bg-cyan-400" />
        {chapter.badge || 'Qt / C++'}
      </span>
    );
  };

    const getBorderColor = () => {
    return 'border-cyan-500/30';
  };

    const getGlowColor = () => {
    return 'bg-cyan-500/10';
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto py-6 sm:py-8 space-y-12">
      {/* 章ヘッダーバナー（司令室イラスト付き） */}
      <div className={`relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#0c121e] to-slate-950 p-4 sm:p-8 md:p-10 border shadow-2xl overflow-hidden ${getBorderColor()}`}>
        {/* 背景の淡いグロー */}
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${getGlowColor()}`} />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex-1 space-y-4">
            {/* メインタイトル */}
            <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tight leading-tight break-words sm:break-keep">
              {chapter.title}
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-cyan-300 font-medium leading-snug break-words sm:break-keep">
              {chapter.subtitle}
            </p>

            {/* パンくずリスト & シェアボタン（タイトルの下に配置） */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <nav aria-label="パンくずリスト" className="flex items-center gap-2 text-xs sm:text-sm font-mono flex-wrap">
                <button
                  onClick={() => onNavigate('top')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition shadow-sm"
                  title="トップページへ戻る"
                >
                  <span>🏠</span>
                  <span>TOP</span>
                </button>
                <span className="text-slate-600">/</span>
                {getTrackBadge()}
                <span className="text-xs sm:text-sm font-mono text-slate-300 font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700">
                  {chapter.badge}
                </span>
                {isCompleted && (
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold">
                    <CheckCircle className="w-4 h-4" />
                    <span>完了済み</span>
                  </span>
                )}
              </nav>

              <ShareButtons
                title={`${chapter.title} - ${chapter.subtitle} | シロクマQt×C++ラボ`}
                text={`Qt/QML×C++産業用GUI開発カリキュラム：${chapter.description.slice(0, 60)}...`}
                variant="compact"
              />
            </div>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 pt-2 leading-relaxed font-sans">
              {chapter.description}
            </p>
          </div>

          {/* 章のテーマに連動したリアルタイム動的HMIプレビュー */}
          <ChapterVisualPreview chapterId={chapter.id} slug={chapter.slug} />
        </div>
      </div>

      {/* 📦 この章の開始コード・GitHubスナップショット */}
      {chapter.githubSnapshot && (
        <div className="rounded-2xl bg-gradient-to-r from-slate-900/95 via-[#0c1424] to-slate-900/95 p-4 sm:p-5 border border-cyan-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base">📦</span>
              <span className="font-bold font-mono text-sm sm:text-base text-white">
                この章の開始コード（GitHubスナップショット）
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                タグ: {chapter.githubSnapshot.tagOrBranch}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              {chapter.githubSnapshot.description || 'Qt/QMLプロジェクトはファイル数が多いため、途中で動かなくなった場合はこのスナップショットから再開できます。'}
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0 flex-wrap">
            <a
              href={chapter.githubSnapshot.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-mono font-bold transition shadow-sm"
              aria-label="GitHubでこの章のソースコードを確認（新規タブで開く）"
            >
              <span>GitHubで見る</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => handleCopyClone(chapter.githubSnapshot!.cloneCommand)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-mono font-bold transition shadow-sm cursor-pointer"
              aria-label="Git cloneコマンドをクリップボードにコピー"
            >
              {copiedClone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">コピー完了！</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Cloneコマンド</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 📋 前提知識チェックリスト */}
      {chapter.prerequisites && chapter.prerequisites.length > 0 && (
        <div className="rounded-2xl bg-slate-900/60 p-4 sm:p-5 border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm">📋</span>
              <span className="font-bold font-mono text-xs sm:text-sm text-cyan-300">
                この章を始める前の前提知識チェック
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-850 px-2 py-0.5 rounded border border-slate-700">
              チェックを付けて理解度を確認
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
            {chapter.prerequisites.map((p, pIdx) => {
              const key = `${chapter.id}-${pIdx}`;
              const isChecked = !!checkedPrereqs[key];
              return (
                <label
                  key={pIdx}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition cursor-pointer select-none ${
                    isChecked
                      ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-100'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => togglePrereq(pIdx)}
                    className="mt-0.5 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 border-slate-700 bg-slate-900 cursor-pointer"
                    aria-label={p.term || p.title}
                  />
                  <div className="text-xs leading-relaxed flex-1">
                    <span className={isChecked ? 'line-through opacity-75' : ''}>
                      {p.term ? (
                        <>
                          <GlossaryTooltip termKey={p.term}>
                            <strong className="font-semibold text-cyan-300 hover:text-cyan-200 underline decoration-dotted underline-offset-2">
                              {p.term}
                            </strong>
                          </GlossaryTooltip>
                          {p.description ? <span className="text-slate-300">：{p.description}</span> : null}
                        </>
                      ) : (
                        p.title
                      )}
                    </span>
                    {p.labLink && (
                      <a
                        href={p.labLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="ml-2 inline-flex items-center gap-0.5 text-[11px] text-cyan-400 hover:text-cyan-300 underline font-mono"
                        aria-label={`${p.labLabel || '復習'}（別タブで開く）`}
                      >
                        <span>{p.labLabel || '復習する'}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 🧭 表示モード切替タブ（長大な縦スクロールを解消し、目的に応じて絞り込み） */}
      <div className="sticky top-18 z-30 -my-4 py-3 bg-[#090d16]/95 backdrop-blur-md border-y border-slate-800/80">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setViewMode('all')}
              aria-label="全てのコンテンツを表示"
              className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>📖 すべて表示</span>
            </button>

            <button
              onClick={() => setViewMode('learn')}
              aria-label="解説・設計のみを表示"
              className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'learn'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>📝 解説・設計</span>
              <span className="text-[10px] opacity-75">({chapter.sections.length}節)</span>
            </button>

            {allCodeFiles.length > 0 && (
              <button
                onClick={() => setViewMode('code')}
                aria-label="ソースコードのみを表示"
                className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'code'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>💻 コード</span>
                <span className="text-[10px] opacity-75">({allCodeFiles.length}ファイル)</span>
              </button>
            )}

            <button
              onClick={() => setViewMode('practice')}
              aria-label="演習・クイズのみを表示"
              className={`px-3 py-2 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'practice'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>🧪 演習・クイズ</span>
              {chapter.quiz && chapter.quiz.length > 0 && (
                <span className="text-[10px] opacity-75">(クイズ{chapter.quiz.length}問)</span>
              )}
            </button>
          </div>

          <div className="text-xs font-mono text-slate-400 hidden sm:flex items-center gap-2">
            <span>表示モード:</span>
            <span className="text-cyan-400 font-bold">
              {viewMode === 'all' && '全セクションを通読中'}
              {viewMode === 'learn' && '概念解説・UML設計図・メモリ図に集中'}
              {viewMode === 'code' && 'C++実装コードと差分のみ表示'}
              {viewMode === 'practice' && '理解度チェッククイズ・演習道場'}
            </span>
          </div>
        </div>
      </div>

      {/* 📐 この章のプログラムに対応する公式UML設計書 */}
      {(viewMode === 'all' || viewMode === 'learn') && chapter.umlDiagram && (
        <section>
          <UmlDiagramViewer
            data={chapter.umlDiagram}
            codeFiles={allCodeFiles}
            onJumpToEditor={(target) => setCodeHighlight(target)}
          />
        </section>
      )}

      {/* 各セクションの展開（practiceモード時は演習に特化するため非表示） */}
      {viewMode !== 'practice' && chapter.sections.map((section, _sIdx) => {
        // "1.1 タイトル" 形式の分解
        const titleMatch = section.title.match(/^(\d+\.\d+)\s*(.*)/);
        const sectionNum = titleMatch ? titleMatch[1] : null;
        const sectionTitle = titleMatch ? titleMatch[2] : section.title;

        // セクション中間判定（セクションが2つ以上ある場合は中間に時短PRを挿入）

        return (
          <React.Fragment key={section.id}>
            <section className="space-y-6 pt-12 pb-8 border-t border-slate-800/80">
            <div>
              <div className="flex items-center gap-3.5 flex-wrap">
                {sectionNum && (
                  <span className="px-3.5 py-1.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-mono font-bold text-sm sm:text-base shadow-sm">
                    {sectionNum}
                  </span>
                )}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {sectionTitle}
                </h2>
              </div>
              {/* セクションリード文（解説モードまたはすべて表示時） */}
              {(viewMode === 'all' || viewMode === 'learn') && section.leadText && (
                <p className="text-lg sm:text-xl text-slate-300 mt-4 leading-relaxed font-sans">
                  {section.leadText}
                </p>
              )}
            </div>

          {/* セクション前の会話 */}
          {(viewMode === 'all' || viewMode === 'learn') && section.dialogueBefore && section.dialogueBefore.length > 0 && (
            <div className="space-y-3.5 bg-slate-950/40 p-5 rounded-2xl border border-slate-900">
              {section.dialogueBefore.map((dialogue) => (
                <DialogueBubble key={dialogue.id} dialogue={dialogue} />
              ))}
            </div>
          )}

          {/* 概念解説テキスト（リッチマークダウンレンダラー） */}
          {(viewMode === 'all' || viewMode === 'learn') && section.explanationText && (
            <RichExplanation content={section.explanationText} />
          )}

          {/* C言語 vs C++ パラダイム対比 */}
          {(viewMode === 'all' || viewMode === 'learn') && section.paradigmComparison && (
            <ParadigmComparisonView data={section.paradigmComparison} />
          )}

          {/* スタック・ヒープ メモリ可視化 */}
          {(viewMode === 'all' || viewMode === 'learn') && section.memoryMap && (
            <MemoryVisualizer memoryMap={section.memoryMap} />
          )}

          {/* 変数・クラスメンバ一覧インスペクター（カード / 最適化テーブル） */}
          {(viewMode === 'all' || viewMode === 'learn') && section.variables && section.variables.length > 0 && (
            <VariableInspector variables={section.variables} />
          )}

          {/* 処理フロー（ステップバイステップ実況解説＆設計意図） */}
          {(viewMode === 'all' || viewMode === 'learn') && section.processSteps && section.processSteps.length > 0 && (
            <div className="space-y-4 my-6">
              <div className="flex items-center gap-2 text-sm font-mono font-bold text-emerald-400 px-1">
                <GitCommit className="w-5 h-5" />
                <span>1フレーム内の実行順序と設計の意図</span>
              </div>
              <div className="grid grid-cols-1 gap-3.5">
                {section.processSteps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2.5 flex-wrap">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-sm">
                          {step.stepNumber}
                        </span>
                        <h4 className="font-bold text-base sm:text-lg text-slate-100 font-sans">
                          {step.title}
                        </h4>
                      </div>
                      {step.codeSnippet && (
                        <code className="text-xs sm:text-sm font-mono px-2.5 py-1 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                          {step.codeSnippet}
                        </code>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed pl-10 font-sans">
                      {step.description}
                    </p>
                    
                    <div className="mt-3 pl-10 flex flex-col sm:flex-row gap-2.5 text-xs sm:text-sm font-mono">
                      <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/30 py-2 px-3 rounded-xl border border-emerald-500/20 flex-1">
                        <span className="text-slate-400 font-sans font-bold">動作効果:</span>
                        <span>{step.impact}</span>
                      </div>
                      {step.designIntent && (
                        <div className="flex items-center gap-2 text-cyan-300 bg-cyan-950/30 py-2 px-3 rounded-xl border border-cyan-500/20 flex-1">
                          <span className="text-slate-400 font-sans font-bold">設計意図:</span>
                          <span>{step.designIntent}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 概念図解 */}
          {(viewMode === 'all' || viewMode === 'learn') && section.diagramType && (
            <ConceptDiagram type={section.diagramType} />
          )}

          {/* セクション固有のUML設計書 */}
          {(viewMode === 'all' || viewMode === 'learn') && section.umlDiagram && (
            <UmlDiagramViewer
              data={section.umlDiagram}
              codeFiles={section.codeFiles && section.codeFiles.length > 0 ? section.codeFiles : allCodeFiles}
              onJumpToEditor={(target) => setCodeHighlight(target)}
            />
          )}

          {/* C++コードビューア（コードモードまたはすべて表示時） */}
          {(viewMode === 'all' || viewMode === 'code') && section.codeFiles && section.codeFiles.length > 0 && (
            <div className="my-6">
              <div className="text-sm font-mono text-slate-400 mb-2.5 flex items-center gap-2">
                <span className="text-cyan-400 font-bold">SOURCE CODE</span>
                <span>（タブをクリックしてファイルを切り替え・コピーできます。クラス図メンバと双方向連動）</span>
              </div>
              <CodeViewer files={section.codeFiles} targetHighlight={codeHighlight} />
            </div>
          )}

          {/* セクション後の会話 */}
          {(viewMode === 'all' || viewMode === 'learn') && section.dialogueAfter && section.dialogueAfter.length > 0 && (
            <div className="space-y-3.5 bg-slate-950/40 p-5 rounded-2xl border border-slate-900">
              {section.dialogueAfter.map((dialogue) => (
                <DialogueBubble key={dialogue.id} dialogue={dialogue} />
              ))}
            </div>
          )}

          {/* キーポイント・まとめ */}
          {(viewMode === 'all' || viewMode === 'learn') && section.takeaways && section.takeaways.length > 0 && (
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-4 my-6 flex flex-col sm:flex-row gap-6 items-start">
              <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full overflow-hidden shadow-lg border-2 border-cyan-400/80 shadow-cyan-900/60 ring-2 ring-cyan-500/20 bg-[#0a0f18]">
                  <img src="/images/characters/shirokuma_sensei.png" alt="シロクマ先生" className="w-full h-full object-cover scale-110" />
                </div>
              </div>
              <div className="flex-1 space-y-4 w-full">
                <h3 className="text-base sm:text-lg font-mono font-bold text-cyan-400 flex items-center gap-2.5">
                  <Lightbulb className="w-5 h-5" />
                  <span>シロクマ先生の重要ポイントまとめ</span>
                </h3>
                <div className={`grid grid-cols-1 gap-4 ${
                  section.takeaways.length === 1 ? 'md:grid-cols-1' :
                  section.takeaways.length === 2 ? 'md:grid-cols-2' :
                  'md:grid-cols-3'
                }`}>
                {section.takeaways.map((takeaway, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2"
                  >
                    <div className="text-sm sm:text-base font-bold text-slate-100">
                      {takeaway.title}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                      {takeaway.description}
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          )}
        </section>
        
      </React.Fragment>
    );
  })}


      {/* 理解度確認クイズ */}
      {(viewMode === 'all' || viewMode === 'practice') && chapter.quiz && chapter.quiz.length > 0 && (
        <section className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 p-6 sm:p-10 space-y-8 shadow-2xl my-8">
          <div className="flex items-center gap-3 text-cyan-400 font-mono font-bold text-xl sm:text-2xl border-b border-slate-800 pb-4">
            <HelpCircle className="w-7 h-7" />
            <span>理解度チェッククイズ</span>
          </div>

          {chapter.quiz.map((q) => {
            const selected = selectedAnswers[q.id];
            const isAnswered = selected !== undefined;
            const isCorrect = selected === q.correctIndex;

            return (
              <div key={q.id} className="space-y-4">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-relaxed">
                  {q.question}
                </p>

                <div className="space-y-3">
                  {q.options.map((option, optIdx) => {
                    const isOptionSelected = selected === optIdx;
                    let btnStyle = 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600';

                    if (isAnswered) {
                      if (optIdx === q.correctIndex) {
                        btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold shadow-md shadow-emerald-950/40';
                      } else if (isOptionSelected) {
                        btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                      } else {
                        btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => !isAnswered && handleSelectOption(q.id, optIdx, q.correctIndex)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 sm:p-5 rounded-2xl border text-base sm:text-lg transition-all duration-150 flex items-center justify-between gap-3 ${btnStyle}`}
                      >
                        <span className="leading-relaxed">{option}</span>
                        {isAnswered && optIdx === q.correctIndex && (
                          <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                        )}
                        {isAnswered && isOptionSelected && optIdx !== q.correctIndex && (
                          <AlertCircle className="w-6 h-6 text-rose-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 解説ボックス */}
                {showExplanations[q.id] && (
                  <div
                    className={`p-5 rounded-2xl border text-sm sm:text-base leading-relaxed font-sans ${
                      isCorrect
                        ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {isCorrect && (
                        <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-emerald-400 flex-shrink-0 shadow-lg">
                          <img
                            src="/images/characters_victory.png"
                            alt="ハイタッチ！"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="font-bold mb-1 flex items-center gap-2 text-base sm:text-lg">
                          {isCorrect ? '🎉 正解！シロクマ先生とハイタッチ！' : '❌ おしい！'}
                        </div>
                        <div className="text-slate-200 leading-relaxed">{q.explanation}</div>
                        {isCorrect && (
                          <div className="pt-2 flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-emerald-300 font-mono font-bold">正解成果をシェア:</span>
                            <ShareButtons
                              title={`【正解クリア！】シロクマQt×C++ラボ「${chapter.title}」のクイズを突破しました！`}
                              text={`シロクマ先生＆ペンギン生徒と一緒にQt/QMLリアルタイム計器ダッシュボード開発を修行中！`}
                              variant="compact"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* 記事シェアカード */}
      <ShareButtons
        title={`${chapter.title} - ${chapter.subtitle} | シロクマQt×C++ラボ`}
        text={`Qt/QMLとモダンC++で産業用GUI・60fps計器ダッシュボードを構築する実践カリキュラム！\n${chapter.description.slice(0, 80)}...`}
        variant="card"
      />

      {/* 4ラボ循環バトンタッチカード（最終章完了時） */}
      {!chapter.nextChapterSlug && (
        <div className="my-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-[#071328] border border-blue-500/40 flex flex-col md:flex-row items-center justify-between gap-5 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="space-y-2 text-center md:text-left relative z-10">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-blue-300 font-bold">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-950 border border-blue-500/40">NEXT STAGE 🌊</span>
              <span>シロクマ技術探検隊・第4ステージ</span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-white">
              Qt GUIを極めたら、次は【ソナー入門】で物理波形・FFTに挑む！
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              画面描画の次は信号処理の極限へ。Web Audio音響シミュレータ、FFT、LOFAR解析、絵本シアターで学ぶ水中音響の最高峰メディア。
            </p>
          </div>
          <a
            href="/sonar/"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-400 hover:to-sky-300 text-slate-950 font-black text-sm whitespace-nowrap shadow-xl hover:shadow-blue-500/25 transition transform hover:scale-105 active:scale-95 flex items-center gap-2 flex-shrink-0 relative z-10"
          >
            <span>ソナー入門へ進む</span>
            <span>➔</span>
          </a>
        </div>
      )}

      {/* 🔗 関連ラボでさらに深める（クロスリンク） */}
      {chapter.relatedLabs && chapter.relatedLabs.length > 0 && (
        <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 via-[#0a1120] to-slate-950 p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2">
              <span>🔗</span>
              <span>関連ラボでさらに深める（シロクマ技術エコシステム）</span>
            </h3>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/30">
              相乗効果
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            本章のテーマ（マルチスレッド、CMake、ソケット、テスト等）と深く連動する姉妹ラボのカリキュラムです。併せて学ぶことで実務実装力が何倍にも跳ね上がります。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {chapter.relatedLabs.map((lab, lIdx) => (
              <a
                key={lIdx}
                href={lab.url}
                className="group p-4 rounded-2xl bg-slate-950/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition shadow-sm flex items-start gap-3.5"
                aria-label={`${lab.labName}: ${lab.title} へ進む`}
              >
                <span className="text-2xl p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform shrink-0">
                  {lab.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      {lab.labName}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-850 text-slate-300 border border-slate-700">
                      {lab.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                    {lab.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {lab.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 mt-3" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 章ナビゲーションフッター */}
      <div className="pt-8 border-t border-slate-800 flex items-center justify-between gap-4 flex-wrap">
        {chapter.prevChapterSlug ? (
          <button
            onClick={() => onNavigate(chapter.prevChapterSlug!)}
            aria-label="前の章へ移動"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm sm:text-base font-mono font-bold transition border border-slate-700 active:scale-95 shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>前の章へ</span>
          </button>
        ) : (
          <button
            onClick={() => onNavigate('top')}
            aria-label="TOPページ（全体ロードマップ）へ移動"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm sm:text-base font-mono font-bold transition border border-slate-700 active:scale-95 shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>TOP（全体ロードマップ）へ</span>
          </button>
        )}

        {chapter.nextChapterSlug ? (
          <button
            onClick={() => onNavigate(chapter.nextChapterSlug!)}
            aria-label="次の章へ進む"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base font-mono transition shadow-xl active:scale-95 ml-auto text-slate-950 bg-cyan-500 hover:bg-cyan-400 shadow-cyan-500/30 cursor-pointer"
          >
            <span>次の章へ進む</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <div className="flex items-center gap-3 ml-auto flex-wrap">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs sm:text-sm font-mono font-bold">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>🎉 カリキュラム読破お疲れ様でした！実践に活かしましょう！</span>
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="ページ最上部へ戻る"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold font-mono text-xs sm:text-sm transition border border-slate-700 active:scale-95 ml-auto sm:ml-0 cursor-pointer"
            >
              <span>TOPへ戻る</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

