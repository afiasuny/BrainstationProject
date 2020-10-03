using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Feedback.Data;
using Feedback.Models;
using Feedback.ViewModel;
using Newtonsoft.Json;

namespace Feedback.Controllers
{
    public class aa : Controller
    {
        private FeedbackDbContext db = new FeedbackDbContext();

        [HttpGet]
        public ActionResult Index()
        {
            var posts = db.Posts.ToList();
            return View(db.Posts.ToList());
        }

        [HttpGet]
        public string GetPost()
        {
            //var posts = db.Posts.ToList();
            //var postsViewModelList = new List<PostsViewModel>();
            //foreach (Posts post in posts)
            //{
            //    PostsViewModel postsView = new PostsViewModel();
            //    postsView.IsPost = true;
            //    postsView.Post = post.Post;
            //    postsView.DateTime = post.PostTime;
            //    if (db.Users.FirstOrDefault(a => a.UserId == post.UserId) != null)
            //    {
            //        postsView.User = db.Users.FirstOrDefault(a => a.UserId == post.UserId).UserName;
            //    }

            //    var comments = db.Comments.Where(a => a.PostId == post.PostId).ToList();
            //    postsView.CommentCount = comments.Count();

            //    postsViewModelList.Add(postsView);
            //    foreach (Comments comment in comments)
            //    {
            //        postsView = new PostsViewModel();
            //        postsView.Comment = comment.Comment;
            //        postsView.IsPost = false;
            //        postsView.DateTime = comment.CommentTime;
            //        if (db.Users.FirstOrDefault(a => a.UserId == comment.UserId) != null)
            //        {
            //            postsView.User = db.Users.FirstOrDefault(a => a.UserId == comment.UserId).UserName;
            //        }
            //        postsView.Like = db.Likes.Where(a => a.IsLike == true).Count();
            //        postsView.Dislike = db.Likes.Where(a => a.IsLike == false).Count();
            //        postsViewModelList.Add(postsView);
            //    }
            //}
            //string result = JsonConvert.SerializeObject(postsViewModelList);
            return "";
        }

    }
}
