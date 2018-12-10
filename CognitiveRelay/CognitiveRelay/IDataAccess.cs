using System.Collections.Generic;
using System.Threading.Tasks;

namespace CognitiveRelay
{
    public interface IDataAccess
    {
        Task AddCommentAsync(Comment comment);
        Task<IEnumerable<Comment>> GetCommentsAsync();
        Task<Comment> GetCommentByHashAsync(string hash);
        Task UpdateCommentAsync(Comment comment);
    }
}