import os
import re

dst_path = r"C:\Users\ziu12\Documents\Qt-study\src\components\layout\Footer.tsx"

with open(dst_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 姉妹メディア・相互リンク の部分全体をシックなデザインに書き換える
old_section_pattern = r'\{/\* 姉妹メディア・相互リンク \*/\}[\s\S]*?\{/\* 運営体制・技術監修 \*/\}'

new_section = """{/* 姉妹メディア・相互リンク */}
          <div className="pt-5 pb-4 max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* リンク1: シロクマC++ラボ */}
            <a
              href="https://shirokuma-auto-cpp.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#0f1522] hover:bg-[#131b2c] border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] text-left"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#0a0f18] border border-slate-700/50 flex items-center justify-center text-cyan-500 flex-shrink-0 group-hover:text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[10px] tracking-wider font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50">
                      SISTER SITE
                    </span>
                  </div>
                  <span className="font-bold text-slate-200 group-hover:text-cyan-300 transition text-sm font-sans truncate block">
                    シロクマC++ラボ
                  </span>
                  <p className="text-[11px] text-slate-500 font-sans mt-0.5 truncate">
                    数理アルゴリズム自動評価
                  </p>
                </div>
              </div>
            </a>

            {/* リンク2: 水中音響・ソナー */}
            <a
              href="https://sonar-guide.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#0f1522] hover:bg-[#131b2c] border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] text-left"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#0a0f18] border border-slate-700/50 flex items-center justify-center text-cyan-500 flex-shrink-0 group-hover:text-cyan-400 group-hover:border-cyan-500/50 transition-colors">
                  <Waves className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[10px] tracking-wider font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50">
                      SISTER SITE
                    </span>
                  </div>
                  <span className="font-bold text-slate-200 group-hover:text-cyan-300 transition text-sm font-sans truncate block">
                    水中音響・ソナー入門
                  </span>
                  <p className="text-[11px] text-slate-500 font-sans mt-0.5 truncate">
                    音波と数理で迫るソナー工学
                  </p>
                </div>
              </div>
            </a>

          </div>

          {/* 運営体制・技術監修 */}"""

content = re.sub(old_section_pattern, new_section, content)

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated footer links design")
