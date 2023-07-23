import { Dispatch, SetStateAction } from "react";

interface PropsNote {
  note: string;
  setNote: Dispatch<SetStateAction<string>>;
}

const Note = ({ note, setNote }: PropsNote) => {
  return (
    <>
      <div className="w-full">
        <textarea
          maxLength={10000}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Adicione sua própria descrição personalizada de acordo com a qual o post para o LinkedIn deve ser gerado"
          className="text-black w-full h-24 p-2 text-s bg-white border border-gray-300 rounded-md shadow-inner md:h-240"
        />
      </div>
      <div className="flex items-center mt-1 text-xs text-gray-700"></div>
      <div className="flex mb-1 items-center space-x-3"></div>
    </>
  );
};

export default Note;
