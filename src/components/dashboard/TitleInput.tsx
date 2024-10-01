export const TitleInput = ({
    title,
    setTitle,
    editMode,
    onBlur,
}: {
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    editMode?: boolean,
    onBlur?: () => void,
}) => {

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
            disabled={editMode}
            onBlur={onBlur}
        />
    );
}