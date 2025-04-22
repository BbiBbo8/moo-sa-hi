import type { NextApiRequest, NextApiResponse } from 'next';
import createClient from '@/supabase/client';

interface CommentData {
    shelter_post_id?: number | null;
    daily_post_id?: number | null;
    user_id: string; 
    comments: string;
  }
  
  interface PostData {
    user_id: string; 
    title: string;
  }
  
  const createComment = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      const { shelter_post_id, daily_post_id, user_id, comments }: CommentData = req.body;
      let postId: number | null = null;
      let postType: 'shelter_post' | 'daily_post' | null = null;
      const commentData: Omit<CommentData, 'shelter_post_id' | 'daily_post_id'> & {
        shelter_post_id?: number | null;
        daily_post_id?: number | null;
      } = { user_id, comments };
  
      if (shelter_post_id) {
        postId = shelter_post_id;
        postType = 'shelter_post';
        commentData.shelter_post_id = shelter_post_id;
      } else if (daily_post_id) {
        postId = daily_post_id;
        postType = 'daily_post';
        commentData.daily_post_id = daily_post_id;
      } else {
        return res.status(400).json({ error: '게시글 ID가 누락되었습니다.' });
      }
  
      const supabase = createClient();
      const supabaseAdmin = createClient(); // 관리자 권한 클라이언트
  
      try {
        const { data: comment, error: commentError } = await supabase
          .from('comments')
          .insert(commentData)
          .select('id') // 새로 생성된 댓글의 ID를 가져옴
          .single();
  
        if (commentError) {
          return res.status(500).json({ error: commentError.message });
        }
  
        if (postId && postType && comment?.id) {
          let postResult: { data: PostData | null; error: any } = { data: null, error: null };
  
          if (postType === 'shelter_post') {
            postResult = await supabaseAdmin
              .from('shelter_post')
              .select('user_id, title')
              .eq('id', postId)
              .single();
          } else if (postType === 'daily_post') {
            postResult = await supabaseAdmin
              .from('daily_post')
              .select('user_id, title')
              .eq('id', postId)
              .single();
          }
  
          if (postResult.error) {
            console.error(`${postType} 게시글 정보 조회 실패:`, postResult.error);
          } else if (postResult.data?.user_id && postResult.data.user_id !== user_id) {
            const { error: notificationError } = await supabaseAdmin
              .from('notifications')
              .insert({
                user_id: postResult.data.user_id,
                type: 'new_comment',
                related_id: comment.id.toString(), // related_id가 string이므로 변환
                message: `'${postResult.data.title}'에 새로운 댓글이 달렸습니다.`,
              });
          
            if (notificationError) {
              console.error('알림 생성 실패:', notificationError);
            }
          } else {
            console.log('알림을 생성하지 않습니다 (게시글 조회 실패 또는 자신의 댓글).');
          }
        }
  
        return res.status(201).json(comment);
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
  
  export default createComment;