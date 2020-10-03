using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Feedback.Models
{
    public class Likes
    {
        [Key]
        public int LikeId { get; set; }
        public bool IsLike { get; set; }
        public int CommentId { get; set; } 
    }
}