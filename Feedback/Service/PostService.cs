using Feedback.Data;
using Feedback.Models;
using Feedback.ViewModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Feedback.Service
{
    public class PostService
    {
        private FeedbackDbContext db = new FeedbackDbContext();
        public PaginatedList<PostsViewModel> GetPost(string postText, int pageIndex)
        {
            var pageSize = 10;
            var posts = new List<Posts>();
            if (!string.IsNullOrEmpty(postText))
            {
                posts = db.Posts.Where(a => a.Post.ToLower().Contains(postText.ToLower())).ToList();
            }
            else
            {
                posts = db.Posts.ToList();
            }

            var postsViewModelList = new List<PostsViewModel>();
            foreach (Posts post in posts)
            {
                PostsViewModel postsView = new PostsViewModel();
                postsView.IsPost = true;
                postsView.Post = post.Post;
                postsView.DateTime = post.PostTime;
                if (db.Users.FirstOrDefault(a => a.UserId == post.UserId) != null)
                {
                    postsView.User = db.Users.FirstOrDefault(a => a.UserId == post.UserId).UserName;
                }

                var comments = db.Comments.Where(a => a.PostId == post.PostId).ToList();
                postsView.CommentCount = comments.Count();

                postsViewModelList.Add(postsView);
                foreach (Comments comment in comments)
                {
                    postsView = new PostsViewModel();
                    postsView.Comment = comment.Comment;
                    postsView.IsPost = false;
                    postsView.DateTime = comment.CommentTime;
                    if (db.Users.FirstOrDefault(a => a.UserId == comment.UserId) != null)
                    {
                        postsView.User = db.Users.FirstOrDefault(a => a.UserId == comment.UserId).UserName;
                    }
                    postsView.Like = db.Likes.Where(a => a.IsLike == true).Count();
                    postsView.Dislike = db.Likes.Where(a => a.IsLike == false).Count();
                    postsViewModelList.Add(postsView);
                }
            }

            PaginatedList<PostsViewModel> allpost = new PaginatedList<PostsViewModel>();
            allpost.PageIndex = pageIndex;
            allpost.TotalPages = (int)Math.Ceiling(postsViewModelList.Count() / (double)pageSize);
            allpost.TotalRecords = postsViewModelList.Count();
            allpost.Data = postsViewModelList.GetRange(pageIndex-1*10,10);
            allpost.HasNextPage = (allpost.PageIndex > 1);
            allpost.HasPreviousPage = (allpost.PageIndex < allpost.TotalPages);
            allpost.Data = postsViewModelList;

            return allpost;
        }
    }
}