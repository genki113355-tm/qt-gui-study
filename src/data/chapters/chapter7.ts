import { Chapter } from '../../types/curriculum';

export const chapter7: Chapter = {
  id: 7,
  slug: 'chapter-7',
  courseTrack: 'modern',
  title: '第7章：Linuxのソケット通信（UDP/TCP）をQtのイベントループでスマートに受ける',
  subtitle: 'ネットワークデータストリームの処理',
  badge: '第2部：マルチスレッド',
  description: '外部センサーやネットワーク機器からリアルタイムで送られてくるデータストリームを受信・処理する方法。',
  sections: [
    {
      id: 'sec7-1',
      title: '非同期ネットワーク通信（QUdpSocket）',
      explanationText: 'LinuxのネイティブなSocket API（`recvfrom`等）を使うと、データが来るまでスレッドがブロックされてしまいます。しかしQtの `QUdpSocket` はイベントループに統合されているため、データが到着した瞬間だけ `readyRead()` シグナルが発火し、効率的にデータを受信できます。'
    }
  ]
};
