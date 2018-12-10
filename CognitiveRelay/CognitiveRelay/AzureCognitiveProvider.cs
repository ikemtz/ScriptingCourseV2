using CognitiveRelay.Models;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Threading.Tasks;

namespace CognitiveRelay
{
    public class AzureCognitiveServiceProvider : IAzureCognitiveServiceProvider
    {
        private readonly string _apiUrl;
        private readonly string _apiKey;
        public AzureCognitiveServiceProvider(IConfiguration config)
        {
            _apiUrl = config.GetValue<string>("sentimentApi:url");
            _apiKey = config.GetValue<string>("sentimentApi:key");
        }

        public async Task<SentimentResponse> AnalyzeSentiment(Comment comment)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", _apiKey);
            var httpResponse = await client.PostAsJsonAsync<SentimentRequest>(
                _apiUrl,
                comment.ToSentimentRequest());
            return await httpResponse.Content.ReadAsAsync<SentimentResponse>();
        }
    }
}
