export const TitleInput = ({ title, setTitle }: { title: string, setTitle: React.Dispatch<React.SetStateAction<string>> }) => {

    return (
        <input
            type="text"
            name="title"
            className="title-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => {
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            }}
        />
    );
}