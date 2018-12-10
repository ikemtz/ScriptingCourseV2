using CognitiveRelay.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;

namespace CognitiveRelay
{
    public class Comment
    {
        [BsonId]
        [JsonIgnore]
        public ObjectId _id { get; set; }
        public string Language { get; set; }
        public string Text { get; set; }
        public double? Score { get; set; }

        public SentimentRequest ToSentimentRequest()
        {
            return new SentimentRequest()
            {
                Documents = new[] { new RequestDocument() {
                Id = 1,
                Language = Language,
                Text = Text} }
            };
        }

        public DateTime? CreatedOn { get; set; }
        [JsonIgnore]
        public string Hash { get; set; }
    }
}
