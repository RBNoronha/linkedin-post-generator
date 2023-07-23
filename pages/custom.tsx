import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Note } from "@/components/Note";
import { Post } from "@/components/Post";
import { Ranking } from "@/components/Ranking";
import { rank } from "@/lib/linkedin-algorithm";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";
import DropDown, { VibeType } from "@/components/DropDown";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Link from "next/link";
import Popup from "@/components/Popup";
import CustomButton from "@/components/CustomButton";

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
  const [note, setNote] = useState<string>("");
  const [media, setMedia] = useState<boolean>(false);
  const [vibe, setVibe] = useState<VibeType>("Historia");
  const [showPopup, setShowPopup] = useState(false);
  const [isCustomPrompt, setIsCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [tab, setTab] = useState("custom");

  const handleButtonClick = () => {
    setTimeout(() => {
      setShowPopup(true);
    }, 3000);
  };

  // const [hasVideo, setHasVideo] = useState<boolean>(false);
  // const [hasCarousel, setHasCarousel] = useState<boolean>(false);

  useEffect(() => {
    const rankResponse = rank(post, media);
    setRanking(rankResponse);
  }, [post, media]);

  // Prompt para otimização da postagem

  const handlePrompt = () => {
    // Verifique se tanto "post" como "note" possuem valores antes de prosseguir
    if (!post || !note) {
      return; // Ou trate esse caso de forma diferente, com base em suas necessidades
    }

    // Agora você pode usar ambas as variáveis para construir seu prompt
    const prompt = `Gere uma nova postagem seguindo estas regras ${note}, e com base no tópico aqui ${post}. Você é um LinkedinGPT, um grande modelo de linguagem que gera postagens virais para o LinkedIn.

  - A postagem deve estar relacionada ao que foi inicialmente inserido.`;

    return prompt;
  };

  // Função para enviar a postagem para o OpenAI e obter a resposta
  const optimizePost = async (e: any) => {
    e.preventDefault();
    setOptimizedPost("");
    setLoading(true);
    const prompt = handlePrompt();

    // Mostrar o pop-up imediatamente antes da chamada à API
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

    // Estes dados são um ReadableStream
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
        <title>Gerador de Postagens para o LinkedIn</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="👩‍💼" />
        <meta
          name="description"
          content="Aumente o alcance das suas postagens no LinkedIn usando o nosso gerador impulsionado por inteligência artificial. Teste o desempenho da postagem em relação ao algoritmo do LinkedIn e melhore o engajamento."
        />
        <meta property="og:site_name" content="#1 Gerador de Postagens 🚀" />
        <meta
          property="og:description"
          content="Veja como sua postagem se sai em relação ao algoritmo do LinkedIn e gere postagens melhores com a IA."
        />
        <meta
          property="og:title"
          content="Gerador de Postagens para o LinkedIn com IA"
        />
        <meta name="linkedin:card" content="summary_large_image" />
        <meta name="linkedin:title" content="Gerador de Postagens para o LinkedIn" />
        <meta
          name="linkedin:description"
          content="Aumente o alcance das suas postagens no LinkedIn usando o nosso gerador impulsionado por inteligência artificial. Teste o desempenho da postagem em relação ao algoritmo do LinkedIn e melhore o engajamento."
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

        <section className="py-10 lg:py-20 ">
          {/* bg-[url('/image1.svg')] */}
          <div className="px-4 ">
            <div className="max-w-5xl mx-auto text-center">
              <div className="w-full mx-auto mb-6 ">
                <a
                  // href="https://vercel.fyi/roomGPT"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-gray-700 rounded-lg py-2 px-4 text-gray-400 text-sm mb-8 transition duration-300 ease-in-out"
                >
                  40.000 postagens incríveis geradas 💫
                  {/* {" "}
                  <span className="text-blue-600">Vercel</span> */}
                </a>
              </div>

              <h1 className="text-6xl text-center font-bold pb-1 text-slate-900  ">
                Gerador de Postagens para o LinkedIn 🚀
              </h1>
              <p className="mt-3 mb-10 text-center">
                Veja como sua postagem se sai e gere uma melhor com a IA.
                Hora de se tornar viral. <br />
              </p>

              {/* <div className="mt-4 mb-4 flex justify-center space-x-4">
                  <Link href="/index/twitter">
                    <button className="bg-blue-400 text-white flex items-center space-x-2 p-2 rounded">
                      <FaTwitter />
                      <span>Twitter</span>
                    </button>
                  </Link>

                  <Link href="/index/linkedin">
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
                </div> */}

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

                  <div className="w-full mx-auto pt-6 ">
                    <div className="w-full">
                      <textarea
                        maxLength={7000}
                        onChange={(e) => setPost(e.target.value)}
                        placeholder="Digite ou copie sua postagem ou ideia aqui."
                        className="text-black w-full h-48 p-2 text-s bg-white border border-gray-300 rounded-md shadow-inner md:h-240"
                      />
                    </div>
                    <Note note={note} setNote={setNote} />
                  </div>

                  <div className="">
                    <button
                      disabled={loading}
                      onClick={(e) => {
                        optimizePost(e);
                        handleButtonClick();
                      }}
                      className="bg-blue-700 font-medium rounded-md w-full text-white px-4 py-2 hover:bg-blue-600 disabled:bg-blue-800"
                    >
                      {loading && <LoadingDots color="white" style="large" />}
                      {!loading && `Gerar nova postagem `}
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
