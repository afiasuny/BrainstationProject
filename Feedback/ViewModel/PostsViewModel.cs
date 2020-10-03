using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Feedback.ViewModel
{
    public class PostsViewModel
    {
        public string Post { get; set; }
        public string User { get; set; }
        public DateTime  DateTime { get; set; }
        public int  Like { get; set; }
        public int  Dislike { get; set; }
        public int CommentCount { get; set; }
        public string Comment { get; set; }
        public bool IsPost { get; set; }

    }
}