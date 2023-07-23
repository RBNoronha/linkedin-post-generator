import { Dispatch, SetStateAction } from "react";

interface PropsInput {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
}

const Input = ({ input, setInput }: PropsInput) => {
  return (
    <>
      <div className="w-full">
        <textarea
          maxLength={10000}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Adicione um post existente que você tenha escrito antes, para que fique claro em qual formato você está escrevendo e possa escrever da mesma maneira"
          className="text-black w-full h-32 p-2 text-s bg-white border border-gray-300 rounded-md shadow-inner md:h-240"
        />
      </div>
      <div className="flex items-center mt-1 text-xs text-gray-700"></div>
      <div className="flex mb-1 items-center space-x-3"></div>
    </>
  );
};

export default Input;
