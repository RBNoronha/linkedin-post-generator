import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef, SetStateAction } from "react";
import { Post } from "@/components/Post";
import { Ranking } from "@/components/Ranking";
import { rank } from "@/lib/linkedin-algorithm";
import { Input } from "@/components/Input";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";
import DropDown, { VibeType } from "@/components/DropDown";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Link from "next/link";
import CustomButton from "@/components/CustomButton";
import Popup from "@/components/Popup";
import { useSession } from "next-auth/react";
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
  const [media, setMedia] = useState<boolean>(false);
  const [vibe, setVibe] = useState<VibeType>("História");
  const [showPopup, setShowPopup] = useState(false);
  const [isCustomPrompt, setIsCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [input, setInput] = useState<string>("");
  const [tab, setTab] = useState("template"); // Default to "vibe" tab
  const { data: session, status } = useSession();
  const clickCount = useRef(0);

  const handleButtonClick = () => {
    clickCount.current += 1; // Increment clickCount on each click
    if (status !== "authenticated" && clickCount.current >= 3) {
      setTimeout(() => {
        setShowPopup(true);
      }, 3000);
    }
  };

  useEffect(() => {
    const rankResponse = rank(post, media);
    setRanking(rankResponse);
  }, [post, media]);

  const handlePrompt = () => {
    if (!post || !input) {
      return; // Ou tratar esse caso de forma diferente, conforme suas necessidades
    }

    const prompt = `Você é um LinkedinGPT, um modelo de linguagem avançado que gera postagens virais para o Linkedin.

Sua tarefa é gerar uma nova postagem para um tópico fornecido em ${post}. Esta postagem deve seguir o estilo e formato observados nas postagens de exemplo contidas em ${input}. No entanto, o conteúdo ou tópicos específicos dessas postagens de exemplo não devem ser refletidos em suas postagens geradas.

Ao analisar o ${input}, preste atenção ao estilo de escrita da pessoa e à estrutura de suas postagens. Identifique e imite os padrões de espaçamento entre linhas, uso de emojis, incorporação de perguntas e outras escolhas estilísticas. Além disso, considere o comprimento médio das postagens.

Ao criar uma nova postagem, garanta que ela esteja centrada no tópico fornecido em ${post}, mantendo o estilo e formato observados no ${input}. Crie uma postagem que ressoe com o mesmo público e ofereça conteúdo novo e envolvente sobre o novo tópico.`;

    return prompt;
  };

  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handlePrompt();

    handleButtonClick();

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
        <title>Gerador de Postagem Linkedin</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="👩‍💼" />
        <meta
          name="description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com IA."
        />
        <meta property="og:site_name" content="#1 Post Generator 🚀" />
        <meta
          property="og:description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com IA."
        />
        <meta property="og:title" content="LinkedIn Post Generator com IA" />
        <meta name="linkedin:card" content="summary_large_image" />
        <meta name="linkedin:title" content="Gerador de Postagens do LinkedIn" />
        <meta
          name="linkedin:description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere uma postagem melhor com IA."
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
        <Nav />

        <section className="py-10 lg:py-20">
          <div className="px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="w-full mx-auto mb-6">
                <a
                  // href="https://vercel.fyi/roomGPT"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-gray-700 rounded-lg py-2 px-4 text-gray-400 text-sm mb-8 transition duration-300 ease-in-out"
                >
                  40.000 postagens incríveis geradas 💫
                </a>
              </div>

              <h1 className="text-6xl text-center font-bold pb-1 text-slate-900">
                Gerador de Postagens do LinkedIn 🚀
              </h1>
              <p className="mt-3 mb-10 text-center">
                Veja como sua postagem se sai e gere uma melhor com IA.
                É hora de viralizar. <br />
              </p>

              <div className="flex flex-col md:flex-row w-full md:space-x-20">
                <div className="flex md:w-1/2 flex-col">
                  <div className="flex space-x-1">
                    <CustomButton currentTab={tab} />
                    <style jsx>{`
                      button:hover .tooltip-text {
                        display: block;
                      }
                    `}</style>
                  </div>

                  <div className="w-full my-1 mx-auto pt-6">
                    <Input input={input} setInput={setInput} />
                  </div>

                  <div className="w-full my-1 mx-auto">
                    <Post
                      post={post}
                      setPost={setPost}
                      media={false}
                      setMedia={function (
                        value: SetStateAction<boolean>
                      ): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  </div>

                  <div className="my-4">
                    <button
                      disabled={loading}
                      onClick={(e) => {
                        optimizePost(e);
                        handleButtonClick();
                      }}
                      className="bg-blue-700 font-medium rounded-md w-full text-white px-4 py-2 hover:bg-blue-600 disabled:bg-blue-800"
                    >
                      {loading && <LoadingDots color="white" style="large" />}
                      {!loading && `Gerar nova postagem`}
                    </button>

                    <Popup show={showPopup} setShowPopup={setShowPopup} />
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
                            className="text-black-700 text-left"
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
        </section>
        <div className="max-w-5xl mx-auto">
          <Footer />
        </div>
      </main>
    </>
  );
}
