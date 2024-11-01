import { useQuill } from "@/quill/context/QuillContext";

export const Stats = () => {

    const { stats } = useQuill();

    return (
        <div className="stats">
            <span>words: {stats.words}; </span>
            <span>characters: {stats.characters}</span>
        </div>
    );
};
