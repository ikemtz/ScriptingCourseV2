using Newtonsoft.Json;

namespace CognitiveRelay.Models
{
    public class SentimentRequest
    {
        [JsonProperty("documents")]
        public RequestDocument[] Documents { get; set; }
    }

    public partial class RequestDocument
    {
        [JsonProperty("language")]
        public string Language { get; set; }

        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }
    }
}
