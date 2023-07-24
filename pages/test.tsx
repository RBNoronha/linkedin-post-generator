import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Post } from "@/components/Post";
import { Input } from "@/components/Input";
import { Ranking } from "@/components/Ranking";
import { rank } from "@/lib/linkedin-algorithm";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";
import DropDown, { VibeType } from "@/components/DropDown";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaDev,
  FaFacebook,
  FaReddit,
} from "react-icons/fa";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [optimizedPost, setOptimizedPost] = useState<string>("");
  const [ranking, setRanking] = useState<RankResponse>({
    score: 0,
    validations: [],
  });
  const [post, setPost] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [media, setMedia] = useState<boolean>(false);
  const [vibe, setVibe] = useState<VibeType>("Story");

  useEffect(() => {
    const rankResponse = rank(post, media);
    setRanking(rankResponse);
  }, [post, media]);

  // Prompt para otimizar o post

  const handlePrompt = () => {
    let prompt;
    switch (vibe) {
      case "Historia":
        prompt = `Gere uma postagem usando este prompt, baseado em ${post}. Você é um modelo de linguagem chamado LinkedinGPT que gera postagens virais para o LinkedIn. Você recebe um prompt de uma postagem e deve gerar uma postagem que tem mais chances de ser curtida e compartilhada do que a postagem original.
O algoritmo do LinkedIn contém estímulos e desestímulos com base no que você está escrevendo. Estímulos positivos são:

- Em cada postagem, adicione emojis.
- Máximo de 200 caracteres por frase.
- Inicie cada frase em uma nova linha e adicione números nas duas primeiras linhas.
- Adicione 3 hashtags, sendo duas genéricas e uma muito específica (no final). As hashtags devem estar relacionadas ao tema da postagem.
- Adicione uma pergunta ao final da postagem para iniciar uma discussão, antes das hashtags.
- As duas primeiras linhas devem ser cativantes.
- Não adicione links - links não são bons.
- Se a postagem copiada no campo conter alguns números, mantenha-os iguais.

Adicione uma ideia sobre qual imagem ou visual pode ser adicionado ao final da postagem (este texto não é contado como parte da postagem)
${post}
---
O comprimento da postagem gerada deve ser entre 800-1200 caracteres
---
Deve haver um espaço entre cada linha
---
Mantenha todas as menções de pessoas no texto
---
Inicie a primeira linha com algo como: Eu fiz algo, Em ano, Eu faço, Cansado de, Às vezes é apenas, Um caminho em direção a, Porque isso não é, Eu tenho lutado, (mude o início dependendo do contexto)
---
Adicione emojis, se possível.
---
Deve ser uma história.`;
        break;
      case "Nitida":
        prompt = `Você é um modelo de linguagem chamado LinkedinGPT que gera postagens virais para o LinkedIn.

Sua tarefa é gerar uma nova postagem sobre um tópico fornecido em ${post}. Esta postagem deve seguir o estilo e o formato observados nas postagens de exemplo contidas em ${input}. No entanto, o conteúdo ou tópicos específicos dessas postagens de exemplo não devem ser refletidos em suas postagens geradas.

Ao analisar o ${input}, preste atenção ao estilo de escrita da pessoa e à estrutura de suas postagens. Identifique e imite os padrões de espaçamento entre as linhas, uso de emojis, incorporação de perguntas e outras escolhas estilísticas. Além disso, considere o comprimento médio das postagens.

Ao criar uma nova postagem, certifique-se de que ela gire em torno do tópico fornecido em ${post}, mantendo o estilo e formato observados no ${input}. Crie uma postagem que ressoe com o mesmo público e ofereça conteúdo novo e envolvente sobre o novo tópico.
`;

        break;
      case "Lista":
        prompt = `Gere uma postagem que provavelmente será curtida e compartilhada no LinkedIn, com base em ${post}. Sua postagem deve seguir estas condições:

O comprimento da postagem não deve exceder cem caracteres.
Cada frase deve ter no máximo duas palavras.
A postagem é uma lista de coisas.
A primeira frase deve começar com um dos seguintes: Existem 2 tipos de, 1 grande erro a evitar, Quando você..., evite..., 5 dicas rápidas..., A maioria das empresas..., Se você não planeja... (substitua os pontos suspensos por um número).
Se a postagem copiada contiver números, mantenha-os iguais.
As próximas frases devem ser geradas e não devem incluir números.`;

        break;
      case "Opinião impopular":
        prompt = `Gere uma postagem usando este prompt, baseado em ${post}. Você é um modelo de linguagem chamado LinkedinGPT que gera postagens virais para o LinkedIn. Você recebe um prompt de uma postagem e deve gerar uma postagem que tem mais chances de ser curtida e compartilhada do que a postagem original.
O algoritmo do LinkedIn contém estímulos e desestímulos com base no que você está escrevendo. Se a pessoa selecionar este ${vibe}, certifique-se de que a postagem gerada siga estas condições e crie uma opinião impopular sobre o tópico:
- O comprimento da postagem deve ser inferior a 200 caracteres.
- A postagem não deve conter mais do que 3 frases.
- A primeira frase deve começar com: Opinião impopular:
---
Deve haver um espaço entre cada linha.`;
        break;
      case "Estudo de caso":
        prompt = `Gere uma postagem usando este prompt, baseado em ${post}. Você é um modelo de linguagem chamado LinkedinGPT que gera postagens virais para o LinkedIn. Você recebe um prompt de uma postagem e deve gerar uma postagem que tem mais chances de ser curtida e compartilhada do que a postagem original.
O algoritmo do LinkedIn contém estímulos e desestímulos com base no que você está escrevendo. Se a pessoa selecionar este ${vibe}, certifique-se de que a postagem gerada siga estas condições e seja completa, rigorosa e relacionada ao tópico digitado:
- A postagem deve estar relacionada ao que foi inicialmente inserido
- O comprimento da postagem não deve exceder 1000 caracteres.
- Cada frase não deve ter mais do que 200 caracteres.
- A primeira frase da postagem deve começar com algo semelhante a um desses textos: Dica profissional, Esses experimentos simples, Aqui está uma das minhas maiores aprendizagens deste ano, Dentro de, Ser ... não significa, No início deste ano, Isso pode ser o mais quente (usar palavras semelhantes)
- Se a postagem copiada contiver números, mantenha-os iguais.
- As próximas frases devem ser geradas e conter uma lista, uma lista rigorosa, sendo que cada item da lista começa com um emoji
---
Forneça a ideia de gráficos, imagens ou esquemas que podem enriquecer essas postagens de estudo de caso no final entre parênteses
---
Deve haver um espaço entre cada linha.`;
        break;
      default:
        prompt = `Prompt padrão para otimização de postagem`;
        break;
    }
    return prompt;
  };

  // Função para enviar a postagem para a OpenAI e obter a resposta
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handlePrompt();
    const response = await fetch("/api/optimize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Os dados são um ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      const formattedChunk = chunkValue.replace(/\n/g, "<br>");
      setOptimizedPost((prev) => prev + formattedChunk);
    }
    setLoading(false);
  };
  return (
    <>
      <Head>
        <title>Gerador de Postagens para LinkedIn</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="👩‍💼" />
        <meta
          name="description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com a IA."
        />
        <meta property="og:site_name" content="linkedin-booster.vercel.app" />
        <meta
          property="og:description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com a IA."
        />
        <meta property="og:title" content="Gerador de Postagens para LinkedIn com IA" />
        <meta name="linkedin:card" content="summary_large_image" />
        <meta name="linkedin:title" content="Gerador de Postagens para LinkedIn" />
        <meta
          name="linkedin:description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com a IA."
        />
        <meta
          property="og:image"
          content="https://postgenerator.app/cover.png"
        />
        <meta
          name="linked:image"
          content="https://postgenerator.app/cover.png"
        />
      </Head>

      <main>
        <nav className="bg-black text-white ">
          <div className="px-5">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center h-16 ">
                <div className="flex items-center text-base ">
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/renanbesserra/"
                    rel="noreferrer"
                    className="text-white flex max-w-fit items-center justify-center space-x-2 text-xl"
                  >
                    <p>👩‍💼</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <section className="py-10 lg:py-20 ">
          <div className="px-4">
            <div className="max-w-5xl mx-auto">
              <div className="w-full mx-auto">
                <h1 className="text-6xl text-center font-bold pb-1 text-slate-900">
                  Gerador de Postagens Definitivo 🚀
                </h1>
                <p className="mt-3 mb-10 text-center">
                  Veja como sua postagem se sai e gere uma melhor com IA.
                  Hora de viralizar. <br />
                </p>

                <div className="mt-4 mb-4 flex justify-center space-x-4">
                  <Link href="/index/twitter">
                    <button className="bg-blue-400 text-white flex items-center space-x-2 p-2 rounded">
                      <FaTwitter />
                      <span>Twitter</span>
                    </button>
                  </Link>

                  <Link href="/linkedin">
                    <button className="bg-blue-700 text-white flex items-center space-x-2 p-2 rounded">
                      <FaLinkedin />
                      <span>LinkedIn</span>
                    </button>
                  </Link>
                  <Link href="/index/instagram">
                    <button className="bg-pink-500 text-white flex items-center space-x-2 p-2 rounded">
                      <FaInstagram />
                      <span>Instagram</span>
                    </button>
                  </Link>
                  <Link href="/index/devto">
                    <button className="bg-black text-white flex items-center space-x-2 p-2 rounded">
                      <FaDev />
                      <span>Dev.to</span>
                    </button>
                  </Link>
                  <Link href="/index/facebook">
                    <button className="bg-blue-600 text-white flex items-center space-x-2 p-2 rounded">
                      <FaFacebook />
                      <span>Facebook</span>
                    </button>
                  </Link>
                  <Link href="/index/reddit">
                    <button className="bg-orange-500 text-white flex items-center space-x-2 p-2 rounded">
                      <FaReddit />
                      <span>Reddit</span>
                    </button>
                  </Link>
                </div>

                <div className="flex flex-col md:flex-row w-full md:space-x-20">
                  <div className="flex md:w-1/2 flex-col">
                    {/* <h2 className="text-xl font-bold">Your Ranking</h2> */}
                    {/* <div className="pt-1">
                      <Ranking ranking={ranking} />
                    </div> */}

                    <div className="w-full my-1 mx-auto">
                      <Input input={input} setInput={setInput} />
                    </div>

                    <div className="w-full my-1 mx-auto">
                      <Post post={post} setPost={setPost} />
                    </div>

                    <div className="flex mb-5 items-center space-x-3"></div>
                    <div className="block">
                      <DropDown vibe={vibe} setVibe={setVibe} />
                    </div>
                    <div className="my-4">
                      <button
                        disabled={loading}
                        onClick={(e) => optimizePost(e)}
                        className="bg-black font-medium rounded-md w-full text-white px-4 py-2 hover:bg-blue-600 disabled:bg-blue-800"
                      >
                        {loading && <LoadingDots color="white" style="large" />}
                        {!loading && `Gerar nova postagem`}
                      </button>
                    </div>
                  </div>
                  <div className="flex md:w-1/2 md:flex-col">
                    <Toaster
                      position="top-right"
                      reverseOrder={false}
                      toastOptions={{ duration: 2000 }}
                    />
                    {optimizedPost && (
                      <div className="my-1">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-300">
                          <h2 className="text-xl font-bold">
                            Sua Postagem Gerada
                          </h2>
                        </div>
                        <div className="max-w-2xl my-4 mx-auto">
                          <div
                            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.write([
                                new ClipboardItem({
                                  "text/html": new Blob([optimizedPost], {
                                    type: "text/html",
                                  }),
                                }),
                              ]);
                              toast("Postagem copiada para a área de transferência", {
                                icon: "📋",
                              });
                            }}
                            key={optimizedPost}
                          >
                            <p
                              className="text-black-700"
                              dangerouslySetInnerHTML={{
                                __html: optimizedPost,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="max-w-5xl mx-auto">
          <Footer />
        </div>
      </main>
    </>
  );
}
