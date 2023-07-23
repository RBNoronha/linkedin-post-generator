import { Dispatch, SetStateAction } from "react";

interface PostProps {
  post: string;
  setPost: Dispatch<SetStateAction<string>>;
  media: boolean;
  setMedia: Dispatch<SetStateAction<boolean>>;
}

const Post = ({ post, setPost, media, setMedia }: PostProps) => {
  return (
    <>
      <div className="w-full">
        <textarea
          maxLength={10000}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Digite seu post ou ideia aqui. Marque a caixa se você tiver uma imagem ou vídeo para obter a classificação correta."
          className="text-black w-full h-56 p-2 text-s bg-white border border-gray-300 rounded-md shadow-inner md:h-240"
        />
      </div>
      <div className="flex items-center mt-1 text-xs text-gray-700">
        <input
          type="checkbox"
          id="media"
          name="media"
          className="form-checkbox h-4 w-4 text-blue-600"
          checked={media}
          onChange={(e) => setMedia(e.target.checked)}
        />
        <label htmlFor="media" className="ml-2">
          Imagem / Carousel / Vídeo
        </label>
      </div>
      <div className="flex items-center space-x-3"></div>
    </>
  );
};

export default Post;
