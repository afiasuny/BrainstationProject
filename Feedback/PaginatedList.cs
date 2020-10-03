using Feedback.ViewModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks; 

namespace Feedback
{
    public class PaginatedList<PostsViewModel>  
    {
        public int PageIndex { get;  set; }
        public int TotalPages { get;  set; }
        public int TotalRecords { get;  set; }

        public List<PostsViewModel> Data { get;  set; }
     

        public bool HasPreviousPage
        { get;set;
        }
        public bool HasNextPage
        {
            get;set;
        } 
         
    }
}
