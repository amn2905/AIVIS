import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { TableContainer, TableHeader, TableHead, TableRow, TableCell } from '../../components/ui/Table';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { OperationsApiClient } from '../../services/operationsApiClient';
import { CaseComment, CaseVersionHistory } from '../../types/operations';
import { MessageSquare, Send, History, Share2, User } from 'lucide-react';

export const TeamCollaborationPage: React.FC = () => {
  const [comments, setComments] = useState<CaseComment[]>([]);
  const [history, setHistory] = useState<CaseVersionHistory[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    OperationsApiClient.getComments().then(setComments);
    OperationsApiClient.getVersionHistory().then(setHistory);
  }, []);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    const post = await OperationsApiClient.postComment(newComment);
    setComments(prev => [...prev, post]);
    setNewComment('');
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-brand-600" />
          Real-Time Team Collaboration & Version History
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          Live investigation comments, @mentions, case sharing permissions, and version audit trail
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comments Feed Column */}
        <Card className="lg:col-span-2 space-y-4">
          <CardHeader>
            <CardTitle>Case Discussion Feed & @Mentions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Input comment box */}
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type comment or @mention (e.g. @alex.vance)..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="text-xs"
              />
              <Button variant="primary" size="sm" onClick={handlePostComment} icon={<Send className="w-3.5 h-3.5" />}>
                Post
              </Button>
            </div>

            <div className="space-y-3 pt-2">
              {comments.map(c => (
                <div key={c.id} className="p-3.5 bg-slate-50 border rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={c.authorAvatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                      <span className="font-bold text-xs text-slate-900">{c.authorName}</span>
                      <span className="text-[10px] text-slate-500 font-mono">({c.authorRole})</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{c.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed font-sans">{c.commentText}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Version History Audit Log Column */}
        <Card className="space-y-4">
          <CardHeader>
            <CardTitle>
              <History className="w-4 h-4 text-brand-600" />
              Version History Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 font-mono text-xs">
            {history.map(h => (
              <div key={h.versionId} className="p-3 bg-slate-50 border rounded-lg space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-brand-700">{h.versionId}</span>
                  <span className="text-[10px] text-slate-400">{new Date(h.timestamp).toLocaleTimeString()}</span>
                </div>
                <p className="text-slate-800 font-sans">{h.changeSummary}</p>
                <span className="text-[10px] text-slate-500 block">Actor: {h.actorName}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
