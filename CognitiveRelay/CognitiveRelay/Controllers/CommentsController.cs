using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CognitiveRelay.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IDataAccess _dataAccess;
        private readonly IAzureCognitiveServiceProvider _cogProvider;
        public CommentsController(IDataAccess dataAccess, IAzureCognitiveServiceProvider cogProvider)
        {
            _dataAccess = dataAccess;
            _cogProvider = cogProvider;
        }

        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> Get()
        {
            return Ok(await _dataAccess.GetCommentsAsync());
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Comment value)
        {
            var algorithm = SHA256.Create();
            var bytehash = algorithm.ComputeHash(Encoding.UTF8.GetBytes(value.Text));
            var hash = Convert.ToBase64String(bytehash);
            var comment = await _dataAccess.GetCommentByHashAsync(hash);
            if (comment == null)
            {
                var resp = await _cogProvider.AnalyzeSentiment(value);
                if (resp.Errors != null && resp.Errors.Length > 0)
                {
                    return BadRequest(resp.Errors);
                }
                await _dataAccess.AddCommentAsync(comment = new Comment
                {
                    CreatedOn = DateTime.UtcNow,
                    Language = value.Language,
                    Hash = hash,
                    Score = (resp.Documents.FirstOrDefault()?.Score).GetValueOrDefault(),
                    Text = value.Text
                });
            }
            else
            {

                comment.CreatedOn = DateTime.UtcNow;
                await _dataAccess.UpdateCommentAsync(comment);
            }

            return Ok(new { comment.Score });
        }
    }
}
