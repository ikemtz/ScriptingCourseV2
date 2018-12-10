using CognitiveRelay.Models;
using System.Threading.Tasks;

namespace CognitiveRelay
{
    public interface IAzureCognitiveServiceProvider
    {
        Task<SentimentResponse> AnalyzeSentiment(Comment comment);
    }
}