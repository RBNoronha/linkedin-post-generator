import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import CustomButton from "@/components/CustomButton";
import { Ranking } from "@/components/Ranking";
import { rank } from "@/lib/linkedin-algorithm";
import { Toaster, toast } from "react-hot-toast";
import LoadingDots from "@/components/LoadingDots";
import DropDown, { VibeType } from "@/components/DropDown";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Popup from "@/components/Popup";
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
  const [vibe, setVibe] = useState<VibeType>("Historia");
  const [showPopup, setShowPopup] = useState(false);
  const [isCustomPrompt, setIsCustomPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [tab, setTab] = useState("ideas"); // Default to "vibe" tab
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
    let prompt;
    switch (vibe) {
      case "Historia":
        prompt = `Gerar 10 ideias de postagens com base nos tópicos em ${post}. Se a pessoa selecionar essa ${vibe}, certifique-se de que as ideias geradas sejam para postagens no formato de histórias.
        Deve haver um espaço entre cada ideia, e cada ideia deve começar em uma nova linha. A história deve ser escrita a partir da perspectiva da pessoa.`;
        break;
      case "Nitida":
        prompt = `Gerar 10 ideias de postagens com base nos tópicos em ${post}. Se a pessoa selecionar essa ${vibe}, certifique-se de que as ideias geradas sejam para postagens no formato de listas curtas.
        Deve haver um espaço entre cada ideia, e cada ideia deve começar em uma nova linha. A história deve ser escrita a partir da perspectiva da pessoa.`;
        break;
      case "Lista":
        prompt = `Gerar 10 ideias de postagens com base nos tópicos em ${post}. Se a pessoa selecionar essa ${vibe}, certifique-se de que as ideias geradas sejam para postagens no formato de listas, como "10 coisas para fazer" ou "50 maneiras de melhorar".
        Deve haver um espaço entre cada ideia, e cada ideia deve começar em uma nova linha. A história deve ser escrita a partir da perspectiva da pessoa.`;
        break;
      case "Opinião impopular":
        prompt = `Gerar 10 ideias de postagens com base nos tópicos em ${post}. Se a pessoa selecionar essa ${vibe}, certifique-se de que as ideias geradas sejam para postagens que apresentem opiniões contraditórias ou impopulares.
        Deve haver um espaço entre cada ideia, e cada ideia deve começar em uma nova linha. A história deve ser escrita a partir da perspectiva da pessoa.`;
        break;
      case "Estudo de caso":
        prompt = `Gerar 10 ideias de postagens com base nos tópicos em ${post}. Se a pessoa selecionar essa ${vibe}, certifique-se de que as ideias geradas sejam para postagens no formato de estudos de caso.
        Deve haver um espaço entre cada ideia, e cada ideia deve começar em uma nova linha. A história deve ser escrita a partir da perspectiva da pessoa.`;
        break;
      default:
        prompt = `Prompt padrão para gerar ideias`;
        break;
    }
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
        <title>LinkedIn Post Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="👩‍💼" />
        <meta
          name="description"
          content="Veja como suas postagens se saem no algoritmo do LinkedIn e gere postagens melhores com a IA."
        />
        <meta property="og:site_name" content="#1 Post Generator 🚀" />
        <meta
          property="og:description"
          content="Veja como suas postagens se saem no algoritmo do LinkedIn e gere postagens melhores com a IA."
        />
        <meta property="og:title" content="LinkedIn Post Generator com IA" />
        <meta name="linkedin:card" content="summary_large_image" />
        <meta name="linkedin:title" content="LinkedIn Post Generator" />
        <meta
          name="linkedin:description"
          content="Veja como suas postagens se saem no algoritmo do LinkedIn e gere postagens melhores com a IA."
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
                </a>
              </div>

              <h1 className="text-6xl text-center font-bold pb-1 text-slate-900  ">
                Gerador de Postagens para o LinkedIn 🚀
              </h1>
              <p className="mt-3 mb-10 text-center">
                Gere ideias incríveis de postagens e faça muitas postagens.
                Hora de se tornar viral. <br />
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

                  <div className="w-full mx-auto pt-6 ">
                    <div className="w-full">
                      <textarea
                        maxLength={2000}
                        onChange={(e) => setPost(e.target.value)}
                        placeholder="Digite ou copie o tópico sobre o qual você planeja escrever postagens"
                        className="text-black w-full h-24 p-2 text-s bg-white border border-gray-300 rounded-md shadow-inner md:h-240"
                      />
                    </div>
                  </div>

                  <div className="flex mb-3 items-center space-x-3"></div>
                  <div className="block">
                    <DropDown vibe={vibe} setVibe={setVibe} />
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
                      {!loading && `Gerar lista de ideias`}
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
                          Suas Ideias Geradas
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
                            toast("Ideias copiadas para a área de transferência", {
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
