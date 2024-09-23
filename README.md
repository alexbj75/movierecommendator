# movierecommendator
Take an input movie name, used OpenAI to give two movie recommendations

docker build -t movie-recommender .

docker run -e OPENAIKEY="your openai key" -p 3000:3000 movie-recommender
