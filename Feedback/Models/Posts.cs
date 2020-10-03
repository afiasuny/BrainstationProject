using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Feedback.Models
{
    public class Posts
    {
        [Key]
        public int PostId { get; set; }
        public string Post { get; set; }
        public int UserId { get; set; }
        public DateTime PostTime { get; set; }
    }
}