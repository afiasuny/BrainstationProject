using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Feedback.Data
{
    public class FeedbackDbContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, please use data migrations.
        // For more information refer to the documentation:
        // http://msdn.microsoft.com/en-us/data/jj591621.aspx
    
        public FeedbackDbContext() : base("name=FeedbackDbContext")
        {
        }
         
        public System.Data.Entity.DbSet<Feedback.Models.Posts> Posts { get; set; }
        public System.Data.Entity.DbSet<Feedback.Models.Users> Users { get; set; }
        public System.Data.Entity.DbSet<Feedback.Models.Comments> Comments { get; set; }
        public System.Data.Entity.DbSet<Feedback.Models.Likes> Likes { get; set; }
    }
}
