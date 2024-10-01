type SelectImageFromURLType = {
    imagePreview: string,
    setImagePreview: React.Dispatch<React.SetStateAction<string>>,
}
export const SelectImageFromURL = ({
    imagePreview,
    setImagePreview,
}: SelectImageFromURLType) => {
    return (
        <div className="select-image__from-url">
            <label htmlFor="image" className="select-image__from-url__label">URL</label>
            <input
                type="url"
                name="image"
                className="select-image__from-url__input"
                value={imagePreview}
                onChange={e => setImagePreview(e.target.value)}
            />
        </div>
    );
};