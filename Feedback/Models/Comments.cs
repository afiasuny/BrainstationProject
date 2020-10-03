using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Feedback.Models
{
    public class Comments
    {
        [Key]
        public int CommentId { get; set; }
        public string Comment { get; set; }
        public int UserId { get; set; }
        public int PostId { get; set; }
        public DateTime CommentTime { get; set; }
    }
}