using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Security.Authentication;
using System.Threading.Tasks;

namespace CognitiveRelay
{
    public class DataAccess : IDataAccess
    {
        private readonly MongoClient _client;
        private readonly IMongoDatabase _db;
        private readonly IMongoCollection<Comment> _collection;
        public DataAccess(IConfiguration config)
        {
            var connectionString = config.GetValue<string>("dbConnection");
            var settings = MongoClientSettings.FromUrl(
              new MongoUrl(connectionString)
            );
            settings.SslSettings =
              new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };
            _client = new MongoClient(settings);
            _db = _client.GetDatabase("valencia");
            _collection = _db.GetCollection<Comment>("comments");
        }

        public async Task<IEnumerable<Comment>> GetCommentsAsync()
        {
            return await _collection.Find(new BsonDocument()).Sort("{ CreatedOn: 1 }").Limit(20).ToListAsync();
        }
        public Task AddCommentAsync(Comment comment)
        {
            return _collection.InsertOneAsync(comment);
        }

        public Task<Comment> GetCommentByHashAsync(string hash)
        {
            return _collection.Find(new BsonDocument("Hash", hash)).FirstOrDefaultAsync();
        }

        public Task UpdateCommentAsync(Comment comment)
        {
            return _collection.ReplaceOneAsync(t => t.Hash == comment.Hash, comment);
        }
    }
}
