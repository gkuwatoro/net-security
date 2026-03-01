import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, Lock, AlertTriangle, Wifi, Smartphone, Mail, UserX, 
  Castle, ArrowRight, CheckCircle2, XCircle, RefreshCw, KeyRound, 
  Eye, ShieldAlert, ChevronRight, Monitor, Play, Award, Sparkles,
  Keyboard, FileText, MousePointer2, Home, BadgeCheck, Key,
  Server, Skull, Zap, Network, PhoneCall, Ticket, Route, FileQuestion,
  BookOpen
} from 'lucide-react';

// --- データ定義 ---

// 1. 学習パートの各ステップデータ（難易度UP・詳細解説追加）
const learningSteps = [
  {
    title: "人間の隙を突く",
    subtitle: "ソーシャルエンジニアリング",
    icon: UserX,
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    question: "あなたが所属する部活の連絡網（LINE等）で、顧問の先生から「至急、大会エントリー確認のため、各自の生徒ポータルIDとパスワードをこのフォームに入力しろ。期限は本日中」とURLが送られてきました。最も適切な行動はどれですか？",
    options: [
      { text: "顧問の先生からの指示であり、期限も迫っているため、速やかにフォームに入力する。", isCorrect: false },
      { text: "URLが学校の公式と少し違うことに気づいたため、そのグループチャット内で「このURLは本物ですか？」と先生に直接返信して確認する。", isCorrect: false },
      { text: "フォームには入力せず、先生に直接電話や対面で確認するか、学校の公式窓口に問い合わせる。", isCorrect: true }
    ],
    explanation: "【正解は3】\n一見、2番の「チャット内で確認する」も良さそうに見えますが、グループチャット自体（または先生のアカウント）が既に乗っ取られている場合、犯人が「本物だよ、早く入力して」と返信してくる可能性があります。",
    illustration: () => (
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 p-6 bg-white rounded-xl shadow-sm border border-orange-100 mt-4">
        <div className="text-center flex flex-col items-center">
          <Smartphone className="w-12 h-12 text-gray-700 mb-2" />
          <p className="text-sm font-bold text-gray-700">乗っ取られた先生</p>
          <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded mt-1 font-bold">犯人が操作中</span>
        </div>
        <div className="flex flex-col items-center px-4">
          <span className="text-xs text-red-500 font-bold mb-1">本物だよ！</span>
          <ArrowRight className="text-red-400 w-8 h-8 rotate-180 mb-1" />
          <span className="text-xs text-gray-500 mb-1">これ本物ですか？</span>
          <ArrowRight className="text-gray-400 w-8 h-8" />
        </div>
        <div className="text-center flex flex-col items-center">
          <Smartphone className="w-12 h-12 text-blue-500 mb-2" />
          <p className="text-sm font-bold text-gray-700">あなた</p>
        </div>
      </div>
    ),
    detailedExplanation: {
      title: "OOB（Out-of-Band：帯域外）通信の重要性",
      content: "標的の人間関係や状況を事前に入念に調べ上げ、極めて自然な文面で騙す手口を「スピアフィッシング」や「BEC（ビジネスメール詐欺）」と呼びます。\nこのような巧妙な攻撃を防ぐには、連絡を受けた手段（今回ならLINE等のチャット）とは「全く別の手段（電話や直接対面など）」で事実確認を行うことが重要です。これをセキュリティ用語で「OOB（帯域外）通信による検証」と呼びます。",
      illustration: () => (
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200 flex flex-col items-center">
           <div className="flex items-center space-x-6">
             <div className="flex flex-col items-center">
               <span className="text-xs font-bold text-red-500 mb-2">危険な確認（同じ経路）</span>
               <Smartphone className="w-10 h-10 text-red-400" />
               <ArrowRight className="w-6 h-6 text-red-400 my-2 rotate-90" />
               <Smartphone className="w-10 h-10 text-red-400" />
             </div>
             <div className="h-24 w-px bg-orange-300"></div>
             <div className="flex flex-col items-center">
               <span className="text-xs font-bold text-green-600 mb-2">安全な確認（OOB）</span>
               <Smartphone className="w-10 h-10 text-gray-500" />
               <PhoneCall className="w-6 h-6 text-green-500 my-2 animate-pulse" />
               <UserX className="w-10 h-10 text-green-500" />
             </div>
           </div>
           <p className="text-xs text-gray-600 mt-4 text-center">犯人はチャットは支配できても、先生の肉声や対面までは偽装できない。</p>
        </div>
      )
    }
  },
  {
    title: "入力する瞬間",
    subtitle: "キーロガー・覗き見",
    icon: KeyRound,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    question: "あなたは学校の図書室の共用パソコンで自分のWebメールを見る必要があります。二段階認証（スマホへのSMS通知）は設定済みです。この状況におけるセキュリティ上の最も論理的なリスクはどれですか？",
    options: [
      { text: "二段階認証があるため、万が一パスワードを盗まれてもスマホがない限り犯人はログインできず、安全に利用できる。", isCorrect: false },
      { text: "共用PCにマルウェアが仕掛けられている場合、ログイン後の「操作中の画面」そのものを乗っ取られ、メールを見られる危険がある。", isCorrect: true },
      { text: "共用PCで入力したパスワードは電源を切ればメモリから消去されるため、使用後に必ず再起動すればリスクは排除できる。", isCorrect: false }
    ],
    explanation: "【正解は2】\n二段階認証は「他の端末からの新規ログイン」を防ぐのには極めて有効ですが、今まさに使っている「そのパソコン自体」が悪意のあるプログラムに汚染されていれば、認証を突破した後の画面をそのまま盗み見られたり操作されたりしてしまいます。",
    illustration: () => (
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 p-6 bg-white rounded-xl shadow-sm border border-blue-100 mt-4">
        <div className="relative text-center flex flex-col items-center">
          <Monitor className="w-12 h-12 text-blue-600 mb-2 z-10" />
          <div className="absolute top-2 right-2 z-20"><ShieldCheck className="w-5 h-5 text-green-500 bg-white rounded-full"/></div>
          <p className="text-sm font-bold text-gray-700 mt-1">二段階認証クリア</p>
          
          <div className="absolute -bottom-4 bg-red-50 p-2 rounded-lg border border-red-300 shadow-md z-20 w-40">
            <div className="flex items-center justify-center text-[10px] text-red-600 font-bold mb-1">
              <Eye className="w-4 h-4 mr-1 animate-pulse" />
              <span>画面をそのまま転送中</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center mt-6 md:mt-0 px-4">
          <ArrowRight className="text-red-400 w-8 h-8" />
        </div>
        
        <div className="text-center flex flex-col items-center">
          <Monitor className="w-12 h-12 text-red-500 mb-2" />
          <p className="text-sm font-bold text-gray-700">犯人のモニター</p>
          <span className="text-[10px] font-bold text-red-600 mt-1">「そのまま見えちゃうね」</span>
        </div>
      </div>
    ),
    detailedExplanation: {
      title: "MitB攻撃とセッション・ハイジャック",
      content: "端末（エンドポイント）自体が汚染されている場合に行われる攻撃を「Man-in-the-Browser (MitB) 攻撃」と呼びます。ブラウザの通信内容を暗号化される前（または復号された後）に盗み見ます。\nまた、ログイン成功後に発行される「通行証（セッションCookie）」を盗み出す「セッション・ハイジャック」という手口もあります。通行証さえあれば、犯人はIDやパスワード、二段階認証すら不要で、あなたになりすましてアクセスできてしまいます。",
      illustration: () => (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
           <div className="bg-white p-3 rounded shadow border border-gray-200 flex flex-col items-center">
             <Ticket className="w-8 h-8 text-yellow-500 mb-1" />
             <span className="text-[10px] font-bold">セッションCookie</span>
             <span className="text-[8px] text-gray-500">(ログイン済みの証拠)</span>
           </div>
           <div className="flex flex-col items-center">
             <span className="text-xs font-bold text-red-500 mb-1">丸ごと盗む</span>
             <ArrowRight className="w-6 h-6 text-red-500" />
           </div>
           <div className="bg-white p-3 rounded shadow border border-red-200 flex flex-col items-center relative">
             <UserX className="w-8 h-8 text-red-500 mb-1" />
             <Ticket className="w-5 h-5 text-yellow-500 absolute top-1 right-1" />
             <span className="text-[10px] font-bold text-red-600">パスワードなしで侵入</span>
           </div>
        </div>
      )
    }
  },
  {
    title: "通信の途中",
    subtitle: "ネットワーク盗聴",
    icon: Wifi,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    question: "カフェの無料Wi-Fi（パスワードなし）に接続しました。アクセスするSNSのURLは「https://」と鍵マークがあり暗号化されています。この状態のセキュリティリスクについて、正しい認識はどれですか？",
    options: [
      { text: "HTTPSで暗号化されているため、通信内容も「どのサイトにアクセスしているか」も第三者には完全に分からなくなる。", isCorrect: false },
      { text: "通信内容（パスワード等）は守られるが、「どのWebサイトにアクセスしているか」という接続先の情報までは暗号化されず知られる可能性がある。", isCorrect: true },
      { text: "Wi-Fi自体にパスワードがないため、HTTPSの暗号化は無効化され、パスワードも通信内容もすべて第三者に筒抜けになる。", isCorrect: false }
    ],
    explanation: "【正解は2】\nHTTPS（TLS暗号化）は、送受信する「中身（ペイロード）」を強力に暗号化しますが、手紙の「宛名」にあたる情報（アクセス先のドメイン名やIPアドレスなど）までは暗号化されないことが多いのです。",
    illustration: () => (
      <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-purple-100 relative">
        <div className="flex justify-between w-full max-w-md items-center mb-4">
          <div className="text-center"><Smartphone className="w-10 h-10 text-gray-700 mx-auto"/></div>
          <div className="flex-1 relative mx-4">
            <div className="w-full border-t-4 border-green-400 rounded"></div>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 flex items-center rounded shadow">
               <span className="text-[10px] font-bold text-white mr-2">宛先: sns.example.com</span>
               <Lock className="w-3 h-3 text-green-400 mr-1"/>
               <span className="text-[10px] text-gray-400">********</span>
            </div>
          </div>
          <div className="text-center"><Server className="w-10 h-10 text-gray-700 mx-auto"/></div>
        </div>
        <div className="flex flex-col items-center text-red-500 mt-2 bg-red-50 p-2 rounded">
           <Eye className="w-5 h-5 mb-1" />
           <p className="text-[10px] font-bold">中身は見えないが「SNSを見ている」ことはバレる</p>
        </div>
      </div>
    ),
    detailedExplanation: {
      title: "暗号化通信の限界とメタデータ",
      content: "手紙に例えると、HTTPSは「絶対に開けられない封筒（暗号化）」です。しかし、郵便局員（ネットワーク管理者や盗聴者）が配達するためには、封筒の表に書かれた「宛名（メタデータ）」を読む必要があります。\n通信の世界では、IPアドレスや、TLS通信の初期段階で送られる「SNI（Server Name Indication）」という情報が平文（暗号化されていない状態）で流れるため、どのサーバーと通信しているかが漏れてしまいます。これを防ぐにはVPN（仮想プライベートネットワーク）等を利用して、通信経路全体をトンネリング（別の大きな封筒に入れる）する必要があります。",
      illustration: () => (
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 flex flex-col items-center">
           <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
             {/* 通常のHTTPS */}
             <div className="bg-white border-2 border-green-400 p-2 rounded flex items-center shadow">
               <span className="text-[10px] font-mono text-gray-600 mr-2 border-r pr-2">SNI: sns.com<br/>(平文)</span>
               <span className="text-[10px] font-mono text-green-600 bg-green-50 px-1 rounded"><Lock className="w-3 h-3 inline mr-1"/>暗号化データ</span>
             </div>
             
             <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />
             
             {/* VPNの場合 */}
             <div className="bg-slate-700 border-2 border-slate-800 p-3 rounded flex items-center shadow text-white">
               <span className="text-[10px] font-mono mr-2 border-r border-slate-500 pr-2">宛先: VPNサーバー</span>
               <div className="bg-slate-600 p-1 rounded border border-slate-500 border-dashed">
                 <span className="text-[10px] font-mono text-gray-300">SNIも中身も全て暗号化</span>
               </div>
             </div>
           </div>
        </div>
      )
    }
  },
  {
    title: "コンピュータの内部",
    subtitle: "マルウェア（ウイルス）",
    icon: Mail,
    color: "bg-red-500",
    lightColor: "bg-red-50",
    question: "友人から「昨日の写真アップしたよ！」とURLが送られ、電話で確認すると「確かに送った」とのこと。しかし、ダウンロードしたファイル名は「photo_2026.jpg.exe」でした。適切な判断はどれですか？",
    options: [
      { text: "本人が送ったと確認できたので安全だ。拡張子が .exe なのは写真を自己解凍して見やすくするツールだからだろう。", isCorrect: false },
      { text: "友人自身は安全と思って送っているが、友人のPCが感染しており、勝手にウイルス（.exe）を写真に偽装してばらまいている可能性が高いため開かない。", isCorrect: true },
      { text: "最近のスマホで撮影された高画質写真の標準フォーマットが .exe なので、そのまま開いて問題ない。", isCorrect: false }
    ],
    explanation: "【正解は2】\n送信者が間違いなく本人であっても、その本人のパソコンが既にマルウェアに感染しており、本人が意図せず（または騙されて）マルウェアを拡散させられているケースが多々あります。",
    illustration: () => (
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6 p-6 bg-white rounded-xl shadow-sm border border-red-100 mt-4">
        <div className="text-center flex flex-col items-center">
          <UserX className="w-12 h-12 text-orange-500 mb-2" />
          <p className="text-sm font-bold text-gray-700">友人（感染済み）</p>
          <span className="text-[10px] text-gray-500 mt-1">「写真送るね〜」</span>
        </div>
        
        <div className="flex flex-col items-center relative">
          <ArrowRight className="text-red-400 w-12 h-12" />
          <div className="absolute -top-6 bg-red-50 border border-red-200 p-1 rounded shadow-sm flex items-center">
             <FileQuestion className="w-4 h-4 text-red-500 mr-1" />
             <span className="text-[10px] font-mono font-bold text-red-700">photo.jpg.exe</span>
          </div>
        </div>

        <div className="w-full md:w-1/3 text-center relative flex flex-col items-center border-2 border-slate-700 rounded-lg p-4 bg-slate-50">
          <Monitor className="w-12 h-12 text-slate-700 mb-2" />
          <p className="text-xs font-bold text-slate-700">あなたのPC</p>
          <p className="text-[10px] text-red-600 font-bold mt-2">開くと感染拡大！</p>
        </div>
      </div>
    ),
    detailedExplanation: {
      title: "拡張子の偽装とサプライチェーン攻撃",
      content: "ファイル名の最後にある「.exe」などの文字列を「拡張子」と呼び、OSはこれでファイルの種類を判断します。「.jpg.exe」のような「二重拡張子」は、一見画像（.jpg）に見せかけて、実際は実行ファイル（.exe＝プログラム）を起動させる古典的かつ危険な偽装手口です。\nまた、知人のPCだけでなく、信頼している企業の正規ソフトウェアの更新プログラムにマルウェアが仕込まれる「サプライチェーン攻撃」も近年増加しています。「誰から来たか」だけを信用するのではなく、「ファイルや振る舞いそのもの」を検証するゼロトラストの考え方が必要です。",
      illustration: () => (
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 flex flex-col items-center">
           <div className="flex items-center space-x-2 text-lg md:text-xl font-mono bg-white px-4 py-2 border border-gray-300 rounded shadow-inner">
             <span className="text-gray-800">photo_2026</span>
             <span className="text-green-600 bg-green-50 px-1 border border-green-200 rounded">.jpg</span>
             <span className="text-red-600 bg-red-100 px-1 border border-red-300 rounded font-bold animate-pulse">.exe</span>
           </div>
           <p className="text-xs text-gray-600 mt-4 text-center max-w-sm">
             Windowsの初期設定では「登録されている拡張子を表示しない」ため、単に「photo_2026.jpg」と表示されてしまい、偽装に気づきにくいという罠があります。
           </p>
        </div>
      )
    }
  }
];

// ... (既存の questionPool はそのまま維持します)
const questionPool = [
  { q: "複数のサービスで同じパスワードを使い回すのはなぜ危険？", options: [{text: "覚えやすくて便利だから安全", isCorrect: false}, {text: "1つ漏れると芋づる式に全部乗っ取られるから", isCorrect: true}, {text: "パスワードが長くなりすぎるから", isCorrect: false}], explanation: "1箇所から漏れたパスワードを使って、犯人は他のサービスにも次々とログインを試みます。これを「パスワードリスト攻撃」と呼びます。" },
  { q: "カフェなどのパスワードがない無料Wi-Fiを利用する際、特に気をつけるべきことは？", options: [{text: "暗号化されていない（http://）サイトでのログインを避ける", isCorrect: true}, {text: "画面の明るさを下げて覗き見を防ぐ", isCorrect: false}, {text: "なるべく通信速度が速い席に座る", isCorrect: false}], explanation: "暗号化されていない通信は、同じWi-Fiに繋いでいる他人に丸見え（ネットワーク盗聴）になる危険があります。必ず「https://」のサイトを利用しましょう。" },
  { q: "パスワードを入力する際、後ろから他人に覗き見される手口を何と呼ぶ？", options: [{text: "キーロガー", isCorrect: false}, {text: "ショルダーハッキング", isCorrect: true}, {text: "ソーシャルエンジニアリング", isCorrect: false}], explanation: "肩（ショルダー）越しに覗き見する手口です。原始的ですが、スマホの画面などは簡単に覗き見されてしまうので要注意です。" },
  { q: "システムの穴ではなく、人間の心理的な隙やミスを突いて情報を盗み出す手口は？", options: [{text: "マルウェア", isCorrect: false}, {text: "ファイアウォール", isCorrect: false}, {text: "ソーシャルエンジニアリング", isCorrect: true}], explanation: "「親友になりすます」「緊急事態を装う」など、人間の親切心や焦りを利用してパスワードを聞き出す手口を指します。" },
  { q: "パソコンのキーボードで入力した内容をこっそり記録して盗み出す悪意のあるソフトは？", options: [{text: "キーロガー", isCorrect: true}, {text: "アンチウイルス", isCorrect: false}, {text: "ショルダーハッキング", isCorrect: false}], explanation: "ネットカフェなどの共用パソコンには、この「キーロガー」が仕掛けられている危険性があります。共用PCでのログインは極力避けましょう。" },
  { q: "セキュリティを高めるための「多要素認証（2段階認証）」とはどのようなもの？", options: [{text: "パスワードを2回連続で入力すること", isCorrect: false}, {text: "パスワードだけでなく、スマホのSMSに届くコードなども組み合わせて確認する仕組み", isCorrect: true}, {text: "パスワードをノートと手帳の2箇所にメモすること", isCorrect: false}], explanation: "「知っている情報（パスワード）」と「持っている情報（スマホに届くコード等）」を組み合わせることで、パスワードが漏れても不正ログインを防ぐ強力な仕組みです。" },
  { q: "「ファイアウォール」が主に防いでくれるものはどれ？", options: [{text: "外部からの不正なアクセスや攻撃", isCorrect: true}, {text: "自分が間違って送信したメール", isCorrect: false}, {text: "パソコンの物理的な故障", isCorrect: false}], explanation: "ファイアウォールは、インターネット（外部）と自分のパソコン（内部）の間にある「防火壁」として、外部からの怪しい通信をブロックしてくれます。" },
  { q: "友人から突然「このURL見て！」と怪しいリンクが送られてきた。どうする？", options: [{text: "とりあえずクリックして中身を確認する", isCorrect: false}, {text: "アカウントが乗っ取られている可能性があるので、開かずに本人に別の方法で確認する", isCorrect: true}, {text: "他の友人にもそのリンクを転送する", isCorrect: false}], explanation: "友人のアカウントが乗っ取られている（ソーシャルエンジニアリング）可能性があります。安易にリンクを開くとウイルスに感染する危険があります。" },
  { q: "自分から添付ファイルを開いてウイルス（スパイ）に感染した場合、ファイアウォールはどうなる？", options: [{text: "自動的にウイルスを外に追い出してくれる", isCorrect: false}, {text: "内側から外への通信は止められないことが多く、情報を外に送られてしまう危険がある", isCorrect: true}, {text: "インターネットへの接続を完全に遮断する", isCorrect: false}], explanation: "ファイアウォールは「外からの攻撃」には強いですが、自分が招き入れてしまったウイルスが「内から外へ」情報を送る通信には甘い（許可してしまう）ことが多いという死角があります。" },
  { q: "マルウェアに感染した大量のパソコンが操られ、一斉に特定のサーバーへ通信を送ってダウンさせる攻撃を何と呼ぶ？", options: [{text: "DDoS攻撃", isCorrect: true}, {text: "キーロガー", isCorrect: false}, {text: "パスワードリスト攻撃", isCorrect: false}], explanation: "「DDoS（ディードス）攻撃」と呼びます。マルウェアに感染すると、自分が被害者になるだけでなく、知らない間にこの攻撃の「加害者」になってしまう危険があります。" }
];

// --- 共通コンポーネント ---

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return (
    <div className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}>
      {children}
    </div>
  );
};

const Button = ({ children, onClick, variant = 'primary', className = "", disabled = false }) => {
  const baseStyle = "w-full py-4 px-6 rounded-xl font-bold transition-all duration-200 flex items-center justify-center text-lg";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95",
    secondary: "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 active:scale-95",
    success: "bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg active:scale-95",
    outline: "bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50 active:scale-95",
    disabled: "bg-gray-200 text-gray-400 cursor-not-allowed"
  };
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${disabled ? variants.disabled : variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// --- 画面コンポーネント ---

// 1. 導入画面
const IntroScreen = ({ onStart }) => (
  <FadeIn className="flex flex-col items-center justify-center text-center space-y-8 py-10">
    <div className="bg-blue-100 p-6 rounded-full inline-block">
      <ShieldCheck className="w-24 h-24 text-blue-600" />
    </div>
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
        あなたのパスワード、<br/><span className="text-red-500">本当に安全ですか？</span>
      </h1>
      <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
        ネットワークの世界では、見えないところで様々な脅威があなたの「IDとパスワード」を狙っています。<br/>
        パスワードは<strong>「どこで」「どうやって」</strong>盗まれるのか？<br/>
        4つのステージをクリアして、セキュリティの基礎を身につけましょう！
      </p>
    </div>
    <div className="w-full max-w-md pt-4">
      <Button onClick={onStart} variant="primary">
        <Play className="w-5 h-5 mr-2" /> 学習をスタートする
      </Button>
    </div>
  </FadeIn>
);

// 2. 学習ステップ（クイズ形式）画面
const LearningScreen = ({ stepData, stepIndex, totalSteps, onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false); // 詳細解説のトグル状態
  const Icon = stepData.icon;

  // ステップが変わったら状態をリセット
  useEffect(() => {
    setSelectedOption(null);
    setShowResult(false);
    setShowDetailed(false);
  }, [stepData]);

  const handleOptionClick = (index) => {
    if (showResult) return;
    setSelectedOption(index);
    setTimeout(() => setShowResult(true), 300); // 少し遅延させて結果表示
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-gray-400">STAGE {stepIndex + 1}/{totalSteps}</span>
          <div className="flex space-x-1">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`h-2 w-8 rounded-full ${i <= stepIndex ? 'bg-blue-600' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
      </div>

      <FadeIn>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-8">
          <div className={`${stepData.color} px-6 py-8 text-white text-center relative overflow-hidden`}>
            <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
               <Icon className="w-48 h-48" />
            </div>
            <Icon className="w-12 h-12 mx-auto mb-3 relative z-10" />
            <p className="text-sm font-semibold opacity-90 relative z-10">{stepData.title}</p>
            <h2 className="text-2xl font-bold relative z-10">{stepData.subtitle}</h2>
          </div>
          
          <div className="p-6 md:p-8 bg-gray-50">
            <div className="bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full w-max mb-4">状況推論問題</div>
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-start leading-relaxed">
              <span className="text-blue-500 mr-2 text-2xl leading-none">Q.</span>
              {stepData.question}
            </h3>
            
            <div className="space-y-3">
              {stepData.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const showStatus = showResult;
                
                let btnStyle = "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400";
                if (showStatus) {
                  if (opt.isCorrect) btnStyle = "bg-green-50 border-2 border-green-500 text-green-800";
                  else if (isSelected && !opt.isCorrect) btnStyle = "bg-red-50 border-2 border-red-400 text-red-700";
                  else btnStyle = "bg-white border-2 border-gray-100 text-gray-400 opacity-50";
                } else if (isSelected) {
                  btnStyle = "bg-blue-50 border-2 border-blue-500 text-blue-800";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-xl font-medium transition-all duration-300 flex justify-between items-start ${btnStyle} ${!showResult && 'hover:shadow-md'}`}
                  >
                    <span className="leading-relaxed flex-1 pr-4">{opt.text}</span>
                    {showStatus && opt.isCorrect && <CheckCircle2 className="text-green-500 w-6 h-6 flex-shrink-0 mt-1" />}
                    {showStatus && isSelected && !opt.isCorrect && <XCircle className="text-red-500 w-6 h-6 flex-shrink-0 mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </FadeIn>

      {showResult && (
        <FadeIn delay={100} className="mb-8 space-y-6">
          <div className={`p-6 md:p-8 rounded-2xl border-2 ${stepData.options[selectedOption].isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h4 className={`text-xl font-bold mb-4 flex items-center ${stepData.options[selectedOption].isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {stepData.options[selectedOption].isCorrect ? 
                <><CheckCircle2 className="mr-2" /> 正解！素晴らしい推論力です。</> : 
                <><AlertTriangle className="mr-2" /> 惜しい！罠に引っかかりました。</>}
            </h4>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
              {stepData.explanation}
            </div>
            
            {/* 図解コンポーネントの表示 */}
            <div className="mt-6">
              {stepData.illustration()}
            </div>
          </div>

          {/* 詳細解説トグルボタン */}
          {!showDetailed && (
             <div className="flex justify-center">
               <Button onClick={() => setShowDetailed(true)} variant="outline" className="max-w-md">
                 <BookOpen className="mr-2 w-5 h-5" /> 専門的な仕組みを詳しく学ぶ
               </Button>
             </div>
          )}

          {/* 詳細解説エリア */}
          {showDetailed && stepData.detailedExplanation && (
            <FadeIn delay={50}>
              <div className="bg-slate-800 text-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-700">
                <div className="flex items-center mb-6 border-b border-slate-600 pb-4">
                  <BookOpen className="text-blue-400 w-6 h-6 mr-3" />
                  <h3 className="text-xl font-bold tracking-wide">{stepData.detailedExplanation.title}</h3>
                </div>
                <div className="text-slate-300 leading-relaxed whitespace-pre-line mb-8 text-sm md:text-base">
                  {stepData.detailedExplanation.content}
                </div>
                {stepData.detailedExplanation.illustration && (
                  <div className="bg-slate-900 rounded-xl p-4">
                    {stepData.detailedExplanation.illustration()}
                  </div>
                )}
              </div>
            </FadeIn>
          )}
          
          <div className="pt-8 flex justify-center border-t border-gray-200">
            <Button onClick={onNext} variant="primary" className="max-w-md">
              次のステージへ <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </FadeIn>
      )}
    </div>
  );
};

// 3. 重要な警告：ファイアウォールの死角 画面
const FirewallScreen = ({ onNext }) => (
  // 既存のFirewallScreen実装はそのまま
  <FadeIn className="w-full max-w-4xl mx-auto py-8 text-center">
    <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-bold mb-6 flex items-center mx-auto w-max">
      <AlertTriangle className="w-4 h-4 mr-2" /> 重要なポイント
    </div>
    
    <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
      ファイアウォール（壁）の<span className="text-red-500">大きな死角</span>
    </h2>
    
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      「セキュリティソフトを入れているから安心！」と思っていませんか？<br/>実は、どんなに強固な壁にも<strong className="text-red-500">決定的な弱点</strong>があります。
    </p>

    {/* 城の比喩アニメーション図解 */}
    <div className="relative bg-gradient-to-b from-blue-50 to-white p-4 md:p-8 rounded-2xl shadow-lg border border-blue-100 overflow-hidden mb-10">
      
      {/* カスタムアニメーションの定義 */}
      <style>{`
        @keyframes sneakOutDesktop {
          0% { right: 15%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { right: 85%; opacity: 0; }
        }
        @keyframes sneakOutMobile {
          0% { bottom: 15%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { bottom: 85%; opacity: 0; }
        }
        @keyframes allowFlash {
          0%, 35% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          45%, 55% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
          65%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
        .sneak-out-anim {
          animation: sneakOutMobile 4s linear infinite;
        }
        @media (min-width: 768px) {
          .sneak-out-anim {
            animation: sneakOutDesktop 4s linear infinite;
            top: 55%; /* デスクトップ時はパソコンの下あたりから出るように */
          }
        }
      `}</style>

      {/* 壁をすり抜ける通信（マルウェア -> ハッカー）のアニメーション */}
      <div className="absolute inset-0 z-30 pointer-events-none">
         <div className="sneak-out-anim absolute flex items-center justify-center">
            {/* デスクトップ用（横向き） */}
            <div className="hidden md:flex items-center">
               <ArrowRight className="w-5 h-5 text-green-500 mr-2 rotate-180" />
               <span className="bg-white border-2 border-red-500 text-red-600 text-[10px] font-bold px-1 py-0.5 rounded shadow-md flex items-center mr-2">
                 <Lock className="w-3 h-3 mr-1"/> PASS
               </span>
               <span className="bg-green-100 border border-green-500 text-green-800 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow">
                 HTTP/HTTPS
               </span>
            </div>
            {/* モバイル用（縦向き：下から上へ） */}
            <div className="flex md:hidden flex-col items-center">
               <ArrowRight className="w-5 h-5 text-green-500 mb-1 -rotate-90" />
               <span className="bg-white border-2 border-red-500 text-red-600 text-[10px] font-bold px-1 py-0.5 rounded shadow-md flex items-center mb-1">
                 <Lock className="w-3 h-3 mr-1"/> PASS
               </span>
               <span className="bg-green-100 border border-green-500 text-green-800 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow">
                 HTTP/HTTPS
               </span>
            </div>
         </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center relative z-10 space-y-12 md:space-y-0">
        
        {/* 外側：悪者 */}
        <div className="w-full md:w-1/3 text-center flex flex-col items-center">
          <UserX className="w-16 h-16 text-red-600 mb-2" />
          <p className="font-bold text-red-700 text-lg">外部のハッカー</p>
          
          {/* 外からの攻撃アニメーション（SSH等） */}
          <div className="mt-4 flex flex-col items-center space-y-3 w-full max-w-[150px]">
            <div className="flex flex-col md:flex-row items-center md:justify-end w-full">
              <span className="bg-red-100 border border-red-500 text-red-700 text-[10px] font-mono font-bold px-1 rounded md:mr-2 mb-1 md:mb-0">
                SSH
              </span>
              <ArrowRight className="w-5 h-5 text-red-500 rotate-90 md:rotate-0 animate-[pulse_1.5s_ease-in-out_infinite]" />
            </div>
            <div className="flex flex-col md:flex-row items-center md:justify-end w-full">
              <span className="bg-red-100 border border-red-500 text-red-700 text-[10px] font-mono font-bold px-1 rounded md:mr-2 mb-1 md:mb-0">
                Telnet
              </span>
              <ArrowRight className="w-5 h-5 text-red-500 rotate-90 md:rotate-0 animate-[pulse_2s_ease-in-out_infinite_0.5s]" />
            </div>
          </div>
          <p className="text-xs text-red-500 mt-2 font-bold bg-red-50 px-2 py-1 rounded">外部からの不正侵入</p>
        </div>

        {/* 壁：ファイアウォール */}
        <div className="w-full md:w-1/4 flex flex-col items-center border-t-8 md:border-t-0 md:border-l-8 md:border-r-8 border-slate-700 bg-slate-600 text-white py-6 md:py-16 rounded-lg relative z-20 shadow-2xl">
          <ShieldAlert className="w-12 h-12 mb-2 text-yellow-400" />
          <span className="font-extrabold tracking-widest text-sm md:text-base">ファイアウォール</span>
          <span className="text-xs text-slate-300 mt-1">(強固な城壁)</span>
          
          {/* 弾かれる攻撃のエフェクト（ブロック） */}
          <div className="absolute -top-4 md:top-1/4 left-1/2 md:-left-8 transform -translate-x-1/2 md:translate-x-0 flex flex-col items-center md:items-start animate-bounce z-30">
            <span className="text-3xl">💥</span>
            <span className="bg-red-600 text-white text-[10px] font-bold px-1 rounded shadow hidden md:block mt-1">BLOCK</span>
          </div>
          <div className="absolute top-8 md:bottom-1/4 left-1/2 md:-left-8 transform -translate-x-1/2 md:translate-x-0 flex flex-col items-center md:items-start animate-[bounce_1s_infinite_0.5s] z-30">
            <span className="text-3xl">💥</span>
            <span className="bg-red-600 text-white text-[10px] font-bold px-1 rounded shadow hidden md:block mt-1">BLOCK</span>
          </div>
          {/* モバイル用ブロックテキスト */}
          <span className="bg-red-600 text-white text-[10px] font-bold px-1 rounded shadow md:hidden absolute -top-8 left-1/2 transform -translate-x-1/2">BLOCK</span>

          {/* 内部からの通信を許可するエフェクト */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-40 w-full animate-[allowFlash_4s_linear_infinite] pointer-events-none">
            <div className="bg-green-100 border-2 border-green-500 rounded-full py-1 px-3 shadow-[0_0_15px_rgba(34,197,94,0.6)] flex items-center bg-opacity-95">
               <CheckCircle2 className="w-4 h-4 text-green-600 mr-1" />
               <span className="text-green-700 font-extrabold text-xs md:text-sm whitespace-nowrap">ALLOW (通過許可)</span>
            </div>
          </div>
        </div>

        {/* 内側：パソコン */}
        <div className="w-full md:w-1/3 text-center relative flex flex-col items-center">
          <Castle className="w-20 h-20 text-indigo-600 mb-2" />
          <p className="font-bold text-indigo-800 text-lg">あなたのパソコン<br/><span className="text-sm font-normal">(城の内側)</span></p>
          
          {/* 招き入れられたスパイ（マルウェア） */}
          <div className="absolute -top-2 md:top-0 right-10 md:right-4 flex flex-col items-center z-10">
            <AlertTriangle className="w-8 h-8 text-yellow-500 animate-[bounce_1.5s_infinite]" />
            <span className="text-[10px] font-bold text-red-600 bg-white px-1 rounded shadow border border-red-200">スパイ侵入!</span>
          </div>

          <p className="text-[10px] text-red-600 font-bold mt-4 bg-red-50 px-2 py-1 rounded border border-red-100">
            マルウェアが内部から<br/>パスワードを送信
          </p>
        </div>

      </div>
      
      {/* 解説文 */}
      <div className="mt-8 text-left text-gray-700 bg-white p-6 rounded-xl shadow-inner border border-gray-100 text-base md:text-lg leading-relaxed relative z-40">
        <p className="mb-4">🛡️ <strong>外部からの直接の攻撃</strong>（SSHやTelnetなど、遠隔操作を狙うプロトコル）は、分厚い城壁（ファイアウォール）が不正な通信としてしっかりブロック（遮断）してくれます。</p>
        <p>⚠️ しかし、怪しいメールの添付ファイルから自ら<strong>「変装したスパイ（マルウェア）」を城の中に入れてしまう</strong>と状況が変わります。<br/><br/>
        城に入り込んだスパイは、盗んだパスワードを<strong>Webサイトを見るのと同じ通信手段（HTTP/HTTPS プロトコル）</strong>に紛れ込ませて外の悪者に送信します。<br/>
        ファイアウォールは「中から外へのWeb通信」は日常的なものとして許可してしまうため、このスパイの通信を遮断できずに素通りさせてしまうのです。
        </p>
      </div>
    </div>

    <div className="bg-red-50 text-red-800 p-6 rounded-xl border border-red-200 mb-10 max-w-2xl mx-auto font-bold text-lg relative z-40">
      結論：どんなに強い壁があっても、自分自身でスパイを招き入れてしまったら意味がない。<br/>
      <span className="text-red-600 text-xl">あなた自身の「気をつける力」が最大の防御です。</span>
    </div>

    <div className="flex justify-center relative z-40">
      <Button onClick={onNext} variant="primary" className="max-w-md">
        次へ：通信の暗号化とは？ <ChevronRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  </FadeIn>
);

// 4. 暗号化（HTTPとHTTPS）の画面
const EncryptionScreen = ({ onNext }) => (
  // 既存のEncryptionScreen実装はそのまま
  <FadeIn className="w-full max-w-4xl mx-auto py-8 text-center">
    <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold mb-6 flex items-center mx-auto w-max">
      <Lock className="w-4 h-4 mr-2" /> 重要な通信の守り方
    </div>
    
    <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
      「http」と「https」の<span className="text-blue-600">決定的な違い</span>
    </h2>
    
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      ファイアウォールを抜けた後、Webサイトまでの「通信の通り道」は安全でしょうか？<br/>
      データを保護する<strong>「暗号化」</strong>の仕組みを見てみましょう。
    </p>

    <style>{`
      @keyframes sendDataRight {
        0% { left: 5%; opacity: 0; }
        15% { opacity: 1; }
        85% { opacity: 1; }
        100% { left: 80%; opacity: 0; }
      }
      .send-data-anim {
        animation: sendDataRight 3.5s linear infinite;
      }
    `}</style>

    <div className="space-y-8 mb-10">
      {/* HTTP (危険) */}
      <div className="bg-red-50 p-6 md:p-8 rounded-2xl border border-red-200 shadow-sm relative overflow-hidden">
        <h3 className="text-xl font-bold text-red-700 mb-6 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 mr-2" /> HTTP （暗号化なし ＝ ハガキ）
        </h3>
        <div className="flex justify-between items-center relative z-10 max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <Smartphone className="w-12 h-12 text-slate-700 mb-2" />
            <span className="text-sm font-bold text-slate-700">あなた</span>
          </div>
          
          <div className="flex-1 mx-4 md:mx-8 relative h-16 flex items-center">
            <div className="w-full border-t-2 border-dashed border-red-400"></div>
            
            {/* 動くデータ */}
            <div className="absolute top-1/2 transform -translate-y-1/2 send-data-anim">
              <div className="bg-white border-2 border-red-400 text-red-600 text-xs font-bold px-3 py-1.5 rounded-md shadow-md flex items-center whitespace-nowrap">
                PASS: 1234
              </div>
            </div>
            
            {/* 盗聴する悪者 */}
            <div className="absolute top-0 right-1/4 flex flex-col items-center transform -translate-y-1/2">
              <Eye className="w-8 h-8 text-red-600 mb-1 animate-pulse" />
              <span className="text-[10px] text-red-700 font-bold bg-white px-2 py-0.5 rounded shadow border border-red-200 whitespace-nowrap">
                丸見え！
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <Monitor className="w-12 h-12 text-slate-700 mb-2" />
            <span className="text-sm font-bold text-slate-700">Webサイト</span>
          </div>
        </div>
      </div>

      {/* HTTPS (安全) */}
      <div className="bg-green-50 p-6 md:p-8 rounded-2xl border border-green-200 shadow-sm relative overflow-hidden">
        <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center justify-center">
          <Lock className="w-6 h-6 mr-2" /> HTTPS （暗号化あり ＝ 鍵付きの箱）
        </h3>
        <div className="flex justify-between items-center relative z-10 max-w-2xl mx-auto">
          <div className="flex flex-col items-center relative">
            <Smartphone className="w-12 h-12 text-slate-700 mb-2" />
            <span className="text-sm font-bold text-slate-700">あなた</span>
            <div className="absolute -bottom-4 bg-blue-100 px-2 py-1 rounded shadow-sm border border-blue-200 flex flex-col items-center whitespace-nowrap z-20">
               <span className="text-[10px] font-bold text-blue-800 flex items-center"><Lock className="w-3 h-3 mr-1"/>公開鍵でロック</span>
            </div>
          </div>
          
          <div className="flex-1 mx-4 md:mx-8 relative h-16 flex items-center">
            <div className="w-full border-t-4 border-solid border-green-400 rounded"></div>
            
            {/* 動くデータ（暗号化） */}
            <div className="absolute top-1/2 transform -translate-y-1/2 send-data-anim">
              <div className="bg-slate-800 border-2 border-slate-900 text-green-400 text-xs font-mono font-bold px-3 py-1.5 rounded-md shadow-md flex items-center whitespace-nowrap">
                <Lock className="w-3 h-3 mr-1 text-green-400"/> *#$&!%@
              </div>
            </div>
            
            {/* 盗聴する悪者 */}
            <div className="absolute top-0 right-1/4 flex flex-col items-center transform -translate-y-1/2">
              <UserX className="w-8 h-8 text-slate-400 mb-1" />
              <span className="text-[10px] text-slate-500 font-bold bg-white px-2 py-0.5 rounded shadow border border-slate-200 whitespace-nowrap">
                解読不能...
              </span>
            </div>
          </div>
          
          <div className="flex flex-col items-center relative">
            <Monitor className="w-12 h-12 text-slate-700 mb-2" />
            <span className="text-sm font-bold text-slate-700">Webサイト</span>
            <div className="absolute -bottom-4 bg-yellow-100 px-2 py-1 rounded shadow-sm border border-yellow-300 flex flex-col items-center whitespace-nowrap z-20">
               <span className="text-[10px] font-bold text-yellow-800 flex items-center"><Key className="w-3 h-3 mr-1"/>秘密鍵でオープン</span>
            </div>
            <div className="absolute top-0 -right-4 bg-green-100 p-1 rounded-full border border-green-300 shadow-sm">
              <BadgeCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="text-left text-gray-700 bg-white p-6 rounded-xl shadow-inner border border-gray-100 text-base md:text-lg leading-relaxed mb-10">
      <p className="mb-4">🔓 <strong>HTTP（暗号化なし）</strong>は、文字がそのままの状態で送られるため、途中で誰かに覗き見されるとパスワードが丸わかりになってしまいます。</p>
      <p className="mb-6">🔒 <strong>HTTPS（暗号化あり）</strong>は、通信内容が意味不明な文字列に変換されます。途中で覗き見されても、専用の「鍵」を持つ正規のWebサイトにしか元の文字に戻す（復号する）ことができません。</p>

      <div className="bg-blue-50 p-5 md:p-6 rounded-xl border border-blue-200 my-6 shadow-sm">
        <h4 className="font-bold text-blue-900 flex items-center mb-4 text-lg">
          <KeyRound className="w-6 h-6 mr-2 text-blue-600" /> 暗号化の「鍵」はどこから来るの？
        </h4>
        <p className="text-sm md:text-base text-gray-700 mb-4">
          実は、暗号化の鍵は<strong>通信の最初のタイミングでWebサイト側から</strong>送られてきています。これを「公開鍵暗号方式」と呼びます。
        </p>
        <ol className="list-decimal list-outside ml-5 space-y-3 text-sm md:text-base text-gray-700 font-medium">
          <li>
            <span className="text-blue-700 font-bold">身分証と鍵を受け取る：</span> まず、Webサイトからあなたのブラウザに、本物であることを証明する「デジタル証明書」と、誰でも使える<strong>「開けっ放しの南京錠（公開鍵）」</strong>が送られてきます。
          </li>
          <li>
            <span className="text-blue-700 font-bold">南京錠でロックする：</span> あなたのブラウザは、その南京錠を使ってパスワードなどのデータをカチャッと暗号化（ロック）して送ります。
          </li>
          <li>
            <span className="text-blue-700 font-bold">合鍵で開ける：</span> 一度ロックされたデータは、Webサイト側が厳重に保管している<strong>「自分だけの合鍵（秘密鍵）」</strong>でしか開ける（復号する）ことができません。
          </li>
        </ol>
      </div>

      <p className="text-center font-bold text-red-600 mt-6 bg-red-50 p-4 rounded-lg border border-red-100">
        ログインや個人情報を入力する際は、必ずブラウザのURLが <span className="text-blue-600">https://</span> で始まり、<span className="text-green-600">鍵マーク</span> がついていることを確認しましょう！
      </p>
    </div>

    <div className="flex justify-center">
      <Button onClick={onNext} variant="primary" className="max-w-md">
        次へ：知らない間に加害者に？ <ChevronRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  </FadeIn>
);

// 5. ボットネット・DDoS攻撃の画面
const BotnetScreen = ({ onNext }) => (
  // 既存のBotnetScreen実装はそのまま
  <FadeIn className="w-full max-w-4xl mx-auto py-8 text-center">
    <div className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-bold mb-6 flex items-center mx-auto w-max">
      <Network className="w-4 h-4 mr-2" /> 被害者から加害者へ
    </div>
    
    <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
      見えない脅威「<span className="text-purple-600">ボットネット</span>」とDDoS攻撃
    </h2>
    
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      マルウェアに感染する恐ろしさは、あなたの情報が盗まれるだけではありません。<br/>
      あなたが<strong>「知らない間に誰かを攻撃する加害者」</strong>になってしまう危険があるのです。
    </p>

    <style>{`
      @keyframes shootZap {
        0% { transform: translateX(0) scale(1); opacity: 0; }
        20% { opacity: 1; }
        80% { transform: translateX(80px) scale(1.2); opacity: 1; }
        100% { transform: translateX(100px) scale(0.5); opacity: 0; }
      }
      .zap-anim-1 { animation: shootZap 1.2s linear infinite; }
      .zap-anim-2 { animation: shootZap 1.5s linear infinite 0.3s; }
      .zap-anim-3 { animation: shootZap 1.3s linear infinite 0.6s; }
      .zap-anim-4 { animation: shootZap 1.4s linear infinite 0.2s; }
      .zap-anim-5 { animation: shootZap 1.1s linear infinite 0.5s; }
    `}</style>

    <div className="bg-white p-6 md:p-8 rounded-2xl border border-purple-200 shadow-md mb-10 overflow-hidden relative">
      <div className="flex flex-col md:flex-row justify-between items-center relative z-10 space-y-12 md:space-y-0">
        
        {/* 左：司令塔（悪者） */}
        <div className="w-full md:w-1/4 flex flex-col items-center">
          <UserX className="w-16 h-16 text-slate-800 mb-2" />
          <span className="text-sm font-bold text-slate-800 bg-slate-200 px-2 py-1 rounded">悪の司令塔</span>
          <span className="text-xs text-slate-500 mt-1">(C&Cサーバー)</span>
          <div className="mt-4 flex flex-col items-center animate-pulse text-purple-600 font-bold text-xs">
            <span>攻撃命令を送信</span>
            <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0 mt-1" />
          </div>
        </div>

        {/* 中央：ボットネット（操られるPC群） */}
        <div className="w-full md:w-1/3 flex flex-col items-center relative bg-purple-50 p-4 rounded-xl border border-purple-200">
          <span className="absolute -top-3 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow whitespace-nowrap">
            ボットネット (ゾンビPC群)
          </span>
          <div className="grid grid-cols-2 gap-4 mt-4 w-full place-items-center relative">
            <div className="flex flex-col items-center relative">
              <Monitor className="w-8 h-8 text-red-500" />
              <Skull className="w-3 h-3 text-white absolute top-1" />
              <span className="text-[8px] text-red-600 mt-1">感染PC</span>
            </div>
            <div className="flex flex-col items-center relative">
              <Monitor className="w-8 h-8 text-red-500" />
              <Skull className="w-3 h-3 text-white absolute top-1" />
              <span className="text-[8px] text-red-600 mt-1">感染PC</span>
            </div>
            
            {/* あなたのPC */}
            <div className="col-span-2 flex flex-col items-center relative my-2 transform scale-125 z-10">
              <Castle className="w-10 h-10 text-indigo-600 mb-1" />
              <div className="absolute top-0 right-0">
                 <AlertTriangle className="w-4 h-4 text-yellow-500 animate-bounce" />
              </div>
              <span className="text-[10px] font-bold text-indigo-800 bg-white px-1 border border-indigo-200 rounded whitespace-nowrap">あなたのPC</span>
            </div>

            <div className="flex flex-col items-center relative">
              <Monitor className="w-8 h-8 text-red-500" />
              <Skull className="w-3 h-3 text-white absolute top-1" />
              <span className="text-[8px] text-red-600 mt-1">感染PC</span>
            </div>
            <div className="flex flex-col items-center relative">
              <Monitor className="w-8 h-8 text-red-500" />
              <Skull className="w-3 h-3 text-white absolute top-1" />
              <span className="text-[8px] text-red-600 mt-1">感染PC</span>
            </div>
          </div>
        </div>

        {/* 攻撃の弾幕アニメーション */}
        <div className="hidden md:block w-1/4 h-32 relative">
          <div className="absolute top-[10%] left-0 zap-anim-1 text-red-500"><Zap className="w-6 h-6 fill-current" /></div>
          <div className="absolute top-[30%] left-0 zap-anim-2 text-red-500"><Zap className="w-8 h-8 fill-current" /></div>
          <div className="absolute top-[50%] left-0 zap-anim-3 text-red-600"><Zap className="w-6 h-6 fill-current" /></div>
          <div className="absolute top-[70%] left-0 zap-anim-4 text-orange-500"><Zap className="w-5 h-5 fill-current" /></div>
          <div className="absolute top-[90%] left-0 zap-anim-5 text-red-500"><Zap className="w-7 h-7 fill-current" /></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-red-600 bg-white px-1 rounded shadow z-10 whitespace-nowrap">
             一斉に大量通信！
          </div>
        </div>
        
        {/* モバイル用の下向き矢印 */}
        <div className="md:hidden flex flex-col items-center py-4">
           <Zap className="w-8 h-8 text-red-500 animate-pulse fill-current mb-1" />
           <span className="text-[10px] font-bold text-red-600 bg-white px-1 rounded shadow">一斉に大量通信！</span>
        </div>

        {/* 右：標的サーバー */}
        <div className="w-full md:w-1/4 flex flex-col items-center relative">
          <div className="relative">
            <Server className="w-16 h-16 text-slate-400" />
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce">💥</div>
            <div className="absolute bottom-2 -left-2 text-xl animate-[bounce_1s_infinite_0.5s]">🔥</div>
          </div>
          <span className="text-sm font-bold text-slate-700 mt-2 whitespace-nowrap">標的のWebサーバー</span>
          <span className="text-xs text-red-600 font-bold bg-red-100 px-2 py-1 rounded mt-2 border border-red-300">
            通信パンクでダウン！
          </span>
        </div>

      </div>
    </div>

    <div className="text-left text-gray-700 bg-white p-6 rounded-xl shadow-inner border border-gray-100 text-base md:text-lg leading-relaxed mb-10">
      <p className="mb-4">🧟 <strong>ボットネットとは：</strong><br/>悪者はマルウェアを使って世界中のパソコンを乗っ取り、遠隔操作できる軍団（ボットネット）を作ります。感染したパソコンは、持ち主の知らないところで操り人形（ゾンビ）のように動かされてしまいます。</p>
      
      <p className="mb-4">💥 <strong>DDoS（ディードス）攻撃：</strong><br/>悪者の司令塔から命令が下ると、何万台もの感染パソコンが<strong>一斉に特定のWebサイトや企業のサーバーへ大量の通信を送りつけます</strong>。標的となったサーバーは処理しきれずにパンクし、サービスが停止してしまいます。</p>
      
      <p className="font-bold text-purple-800 bg-purple-50 p-4 rounded-lg border border-purple-200">
        「自分には盗まれて困るような秘密の情報はないから大丈夫」と思って対策を怠ると、あなたのパソコンが<span className="text-red-600">犯罪の道具（加害者）として利用されてしまう</span>危険があることを覚えておきましょう。
      </p>
    </div>

    <div className="flex justify-center">
      <Button onClick={onNext} variant="success" className="max-w-md">
        <Award className="w-6 h-6 mr-2" /> 最終確認テストに挑戦！
      </Button>
    </div>
  </FadeIn>
);

// 6. チャレンジ問題画面
const ChallengeScreen = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // { qIndex, isCorrect, selectedOptionIndex }
  
  const currentQ = questions[currentIndex];

  const handleAnswer = (optionIndex, isCorrect) => {
    const newAnswers = [...answers, { qIndex: currentIndex, isCorrect, optionIndex }];
    setAnswers(newAnswers);
    
    // 短いディレイで次の問題へ（または結果画面へ）
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // テスト終了
        const score = newAnswers.filter(a => a.isCorrect).length;
        const mistakes = newAnswers
          .map((a, idx) => ({ ...a, question: questions[idx] }))
          .filter(a => !a.isCorrect);
        onComplete(score, questions.length, mistakes);
      }
    }, 600); // 選択したボタンの色が少し見えるように遅延
  };

  return (
    <FadeIn className="w-full max-w-2xl mx-auto py-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">最終確認テスト</h2>
      <p className="text-gray-500 mb-6">全問正解を目指そう！ ({currentIndex + 1} / {questions.length}問目)</p>
      
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 text-left">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-8">
          {currentQ.q}
        </h3>
        <div className="space-y-4">
          {currentQ.options.map((opt, idx) => {
            // 解答済みの場合は色を変える（クリック直後のフィードバック用）
            const currentAnswer = answers.find(a => a.qIndex === currentIndex);
            let btnClass = "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50";
            
            if (currentAnswer) {
              if (idx === currentAnswer.optionIndex) {
                btnClass = opt.isCorrect ? "bg-green-500 border-green-500 text-white" : "bg-red-500 border-red-500 text-white";
              } else {
                btnClass = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                disabled={!!currentAnswer}
                onClick={() => handleAnswer(idx, opt.isCorrect)}
                className={`w-full text-left p-4 rounded-xl font-medium transition-all duration-200 ${btnClass}`}
              >
                {opt.text}
              </button>
            )
          })}
        </div>
      </div>
    </FadeIn>
  );
};

// 7. 結果発表画面
const ResultScreen = ({ score, total, mistakes, onRetry, onRestart }) => {
  const isPerfect = score === total;

  return (
    <FadeIn className="w-full max-w-3xl mx-auto py-8 text-center">
      {isPerfect ? (
        <div className="mb-10 animate-[bounce_1s_ease-in-out_2]">
           <Award className="w-32 h-32 text-yellow-400 mx-auto drop-shadow-lg" />
           <h2 className="text-4xl font-extrabold text-green-600 mt-4 flex justify-center items-center">
             <Sparkles className="w-8 h-8 mr-2" /> 全問正解クリア！ <Sparkles className="w-8 h-8 ml-2" />
           </h2>
           <p className="text-xl text-gray-600 mt-4 font-bold">ネットワークセキュリティの基礎はバッチリです！</p>
        </div>
      ) : (
        <div className="mb-10">
           <AlertTriangle className="w-24 h-24 text-orange-400 mx-auto mb-4" />
           <h2 className="text-3xl font-bold text-gray-800">
             {total}問中 <span className="text-red-500 text-4xl">{score}</span> 問正解
           </h2>
           <p className="text-gray-600 mt-2">惜しい！間違えた問題の解説を確認して、もう一度挑戦しよう。</p>
        </div>
      )}

      {!isPerfect && mistakes.length > 0 && (
        <div className="text-left bg-white rounded-2xl shadow-md p-6 border border-gray-200 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">間違えた問題の復習</h3>
          <div className="space-y-6">
            {mistakes.map((m, i) => (
              <div key={i} className="bg-red-50 p-4 rounded-xl border border-red-100">
                <p className="font-bold text-gray-800 mb-2 text-sm md:text-base">Q. {m.question.q}</p>
                <div className="flex items-start mt-2">
                   <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                   <div>
                     <p className="text-sm text-green-800 font-bold mb-1">正解: {m.question.options.find(o => o.isCorrect).text}</p>
                     <p className="text-sm text-gray-700 bg-white p-2 rounded border border-green-100">{m.question.explanation}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto space-y-4 sm:space-y-0 sm:space-x-4 px-4">
        <Button onClick={onRetry} variant={isPerfect ? "secondary" : "primary"}>
          <RefreshCw className="w-5 h-5 mr-2" /> もう一度テスト
        </Button>
        <Button onClick={onRestart} variant={isPerfect ? "primary" : "secondary"}>
          <Home className="w-5 h-5 mr-2" /> 最初から学ぶ
        </Button>
      </div>
    </FadeIn>
  );
};

// --- メインアプリケーション ---

export default function App() {
  const [phase, setPhase] = useState('intro'); // 'intro', 'learning', 'firewall', 'encryption', 'botnet', 'challenge', 'result'
  const [learningIndex, setLearningIndex] = useState(0);
  
  // チャレンジ問題の状態
  const [challengeQuestions, setChallengeQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState([]);

  // 学習パートを次に進める
  const handleNextLearning = () => {
    if (learningIndex < learningSteps.length - 1) {
      setLearningIndex(learningIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPhase('firewall');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ファイアウォールの次へ（暗号化画面へ）
  const handleNextFirewall = () => {
    setPhase('encryption');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 暗号化画面の次へ（ボットネット画面へ）
  const handleNextEncryption = () => {
    setPhase('botnet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // チャレンジ問題（ランダム3問）を生成して開始
  const startChallenge = () => {
    // 浅いコピーを作成してシャッフル
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
    setChallengeQuestions(shuffled.slice(0, 3));
    setPhase('challenge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // チャレンジ終了時の処理
  const handleChallengeComplete = (finalScore, total, mistakedItems) => {
    setScore(finalScore);
    setMistakes(mistakedItems);
    setPhase('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 最初の画面に戻る処理
  const handleRestart = () => {
    setPhase('intro');
    setLearningIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // アプリ全体のヘッダー
  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center text-blue-700 font-bold text-lg">
          <ShieldCheck className="w-6 h-6 mr-2" />
          <span>情報Ⅰ セキュリティ道場 (Advanced)</span>
        </div>
        {phase === 'learning' && (
           <div className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
             学習中 {learningIndex + 1} / {learningSteps.length}
           </div>
        )}
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-800">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {phase === 'intro' && (
          <IntroScreen onStart={() => setPhase('learning')} />
        )}
        
        {phase === 'learning' && (
          <LearningScreen 
            stepData={learningSteps[learningIndex]} 
            stepIndex={learningIndex} 
            totalSteps={learningSteps.length}
            onNext={handleNextLearning} 
          />
        )}
        
        {phase === 'firewall' && (
          <FirewallScreen onNext={handleNextFirewall} />
        )}

        {phase === 'encryption' && (
          <EncryptionScreen onNext={handleNextEncryption} />
        )}

        {phase === 'botnet' && (
          <BotnetScreen onNext={startChallenge} />
        )}
        
        {phase === 'challenge' && (
          <ChallengeScreen 
            questions={challengeQuestions} 
            onComplete={handleChallengeComplete} 
          />
        )}
        
        {phase === 'result' && (
          <ResultScreen 
            score={score} 
            total={challengeQuestions.length} 
            mistakes={mistakes} 
            onRetry={startChallenge}
            onRestart={handleRestart}
          />
        )}
      </main>

      <footer className="py-6 text-center text-gray-400 text-sm">
        <p>© 高度ネットワークセキュリティ学習コンテンツ</p>
      </footer>
    </div>
  );
}