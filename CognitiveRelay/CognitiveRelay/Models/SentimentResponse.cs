using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CognitiveRelay.Models
{
    public class SentimentResponse
    {
        [JsonProperty("documents")]
        public ResponseDocument[] Documents { get; set; }

        [JsonProperty("errors")]
        public Error[] Errors { get; set; }
    }

    public partial class ResponseDocument
    {
        [JsonProperty("score")]
        public double Score { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }
    }

    public partial class Error
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
