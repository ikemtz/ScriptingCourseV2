using System.Threading.Tasks;
using CognitiveRelay.Models;

namespace CognitiveRelay
{
    public interface IAzureCognitiveServiceProvider
    {
        Task<SentimentResponse> AnalyzeSentiment(Comment comment);
    }
}