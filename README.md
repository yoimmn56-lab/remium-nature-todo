# Premium TODO - Nature & VisionOS Aesthetic

このプロジェクトは、**「実用性」**と**「洗練された美学」**を両立させた、ローカルファイル同期型のTODOアプリケーションです。
AppleのVisionOSからインスピレーションを得た「フロストガラス（透かし）」のエフェクトと、AIによる自然風景の背景が特徴です。

## 🌟 特徴

- **Premium UI**: 
  - VisionOSスタイルの白・水色基調のフロストガラス。
  - モダンな極細フォント（Outfit & Inter）による抜け感のあるデザイン。
  - 自然（雪山と湖）をテーマにした静かな背景画像。
- **モバイル最適化（レスポンシブ）**:
  - PCだけでなくスマホでも快適に操作できるレスポンシブデザイン。
  - タップしやすい大きなボタンとチェックボックスを採用。
- **ローカルファイル同期**:
  - `todo.md` ファイルと直接連動。ブラウザでの変更がリアルタイムにMarkdownファイルへ反映されます。
- **洗練された入力体験**:
  - 入力欄と「＋」ボタンが一体化した、ミニマルで使いやすいコンポーネント。
- **コンパクト設計**:
  - スクロールを最小限に抑え、一画面で全てのタスクを把握できるサイズ感。

## 🛠 使用技術

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Deployment**: Vercel (Vercel CLI)
- **Others**: Google Fonts (Outfit, Inter), Markdown (File Storage)

## 🚀 公開URL

[https://app-henna-eta-15.vercel.app](https://app-henna-eta-15.vercel.app)

> [!IMPORTANT]
> **永続化についての注意**: 現在のバージョンは静的ファイルへの書き込みを使用しているため、Vercel上のサーバーが再起動すると追加したタスクはリセットされます（初期状態の `todo.md` に戻ります）。

## 💻 セットアップ方法 (ローカル開発)

1. **ディレクトリへ移動**:
   ```zsh
   cd /Users/sawadasaori/.gemini/antigravity/scratch/todo_practice/app
   ```

2. **依存関係のインストール**:
   ```zsh
   npm install
   ```

3. **サーバー起動**:
   ```zsh
   node server.js
   ```

4. **デプロイ (Vercel)**:
   ```zsh
   npx vercel --prod
   ```

## 📁 ファイル構成

- `/public/index.html`: Webアプリの構造。
- `/public/style.css`: デザインの心臓部（Glassmorphism & Responsive）。
- `/public/script.js`: タスク追加・更新・削除のロジック。
- `server.js`: Node.js Expressサーバー。`todo.md`のパースと書き込みを担当。
- `todo.md`: 実際のタスクデータ（サーバーと同じ階層に統合されました）。
- `vercel.json`: Vercelデプロイ設定ファイル。
