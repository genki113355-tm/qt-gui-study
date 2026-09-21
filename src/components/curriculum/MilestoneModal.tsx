import React, { useState } from 'react';
import { X, Award, CheckCircle2, Share2, Sparkles, Shield, ChevronRight, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QT_CHAPTERS } from '../../data/chapters';

interface MilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedChapters: number[];
}

interface Milestone {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  trackName: string;
  total: number;
  completedCount: number;
  isUnlocked: boolean;
  skills: string[];
  shareMessage: string;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  isOpen,
  onClose,
  completedChapters,
}) => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('シロクマ研究生');

  if (!isOpen) return null;

  const totalCount = completedChapters.length;
  const isAllUnlocked = totalCount >= QT_CHAPTERS.length;

  const milestones: Milestone[] = [
    {
      id: 'qt-master',
      title: '👑 Qt GUIダッシュボード開発 完全制覇',
      shortTitle: '全カリキュラム修了証',
      icon: '👑',
      trackName: `全${QT_CHAPTERS.length}章完全制覇`,
      total: QT_CHAPTERS.length,
      completedCount: totalCount > QT_CHAPTERS.length ? QT_CHAPTERS.length : totalCount,
      isUnlocked: isAllUnlocked,
      skills: [
        'QMLとC++のシームレスな統合設計',
        'リアルタイム描画とマルチスレッド非同期処理',
        'CMakeとLinux環境でのネイティブアプリケーション構築',
      ],
      shareMessage: `🏆 【シロクマQt×C++ラボ】公式修了証を獲得しました！\nLinuxでのリアルタイム計器ダッシュボード開発カリキュラムを全章制覇しました！\n\n#cpp #Qt #シロクマQtラボ #プログラミング学習`
    }
  ];

  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999
    };
    function fire(particleRatio: number, opts: any) {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const selectedMilestone = milestones.find(m => m.id === selectedMilestoneId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-slate-950/80">
      <div 
        className="bg-[#0b1120] border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <Award className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">学習マイルストーン修了証</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-8 overflow-y-auto">
          {!selectedMilestone ? (
            <div className="space-y-8">
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-slate-300 font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>カリキュラム進捗</span>
                    <span className="text-cyan-300">{totalCount} / {QT_CHAPTERS.length} 章完了</span>
                  </span>
                  <span className="text-cyan-400 font-bold font-mono">
                    {Math.round((totalCount / QT_CHAPTERS.length) * 100)}% 達成
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-500 rounded-full"
                    style={{ width: `${(totalCount / QT_CHAPTERS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {milestones.map((m) => (
                  <div 
                    key={m.id}
                    className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                      m.isUnlocked 
                        ? 'bg-slate-900/80 border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] cursor-pointer group' 
                        : 'bg-slate-950/50 border-slate-800 opacity-70 grayscale'
                    }`}
                    onClick={() => {
                      if (m.isUnlocked) {
                        setSelectedMilestoneId(m.id);
                        setTimeout(triggerConfetti, 100);
                      }
                    }}
                  >
                    {!m.isUnlocked && (
                      <div className="absolute top-4 right-4">
                        <Lock className="w-5 h-5 text-slate-500" />
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                      <div className={`text-5xl sm:text-6xl p-4 rounded-2xl flex-shrink-0 ${
                        m.isUnlocked ? 'bg-slate-950 shadow-inner border border-slate-800' : 'bg-slate-900'
                      }`}>
                        {m.icon}
                      </div>
                      
                      <div className="flex-1 text-center sm:text-left space-y-3">
                        <div>
                          <div className="text-xs font-bold text-slate-400 mb-1">{m.trackName}</div>
                          <h3 className="text-xl sm:text-2xl font-black text-slate-100">{m.shortTitle}</h3>
                        </div>
                        
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                          <div className="w-32 h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                            <div 
                              className={`h-full rounded-full ${m.isUnlocked ? 'bg-cyan-500' : 'bg-slate-600'}`}
                              style={{ width: `${(m.completedCount / m.total) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-400">
                            {m.completedCount}/{m.total}
                          </span>
                        </div>
                      </div>

                      {m.isUnlocked && (
                        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors ml-auto self-center">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={() => setSelectedMilestoneId(null)}
                className="text-slate-400 hover:text-white font-bold text-sm flex items-center gap-2 mb-4"
              >
                <span>← マイルストーン一覧に戻る</span>
              </button>

              <div id="certificate-card" className="bg-gradient-to-br from-[#0f172a] to-[#020617] border-2 border-cyan-500/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.1)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="text-6xl sm:text-8xl mb-2 drop-shadow-2xl">{selectedMilestone.icon}</div>
                  
                  <div className="space-y-2">
                    <div className="text-cyan-400 font-black tracking-widest text-sm sm:text-base uppercase">Official Certificate</div>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                      {selectedMilestone.title}
                    </h3>
                  </div>

                  <div className="py-6 w-full max-w-md">
                    <div className="text-slate-400 font-bold mb-2 text-sm">授与対象者</div>
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-slate-950/50 border-b-2 border-cyan-500/50 text-center text-2xl sm:text-3xl font-black text-white p-2 focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="あなたの名前"
                    />
                  </div>

                  <div className="w-full max-w-lg bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-left">
                    <div className="text-slate-400 text-xs font-bold mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      獲得したコアスキル
                    </div>
                    <ul className="space-y-2.5">
                      {selectedMilestone.skills.map((skill, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-200 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 w-full flex justify-between items-end border-t border-slate-800/60">
                    <div className="text-left">
                      <div className="text-slate-500 font-bold text-xs">発行元</div>
                      <div className="text-slate-300 font-black font-mono">シロクマQt×C++ラボ</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-500 font-bold text-xs">認定日</div>
                      <div className="text-slate-300 font-black font-mono">{new Date().toLocaleDateString('ja-JP')}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedMilestone.shareMessage)}&url=${encodeURIComponent('https://shirokuma-qt-cpp.jp')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-bold py-4 rounded-xl transition shadow-lg active:scale-95"
                >
                  <Share2 className="w-5 h-5" />
                  <span>X (Twitter) で成果をシェア</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

