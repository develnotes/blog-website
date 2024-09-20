export const Loader = ({ loading }: { loading: boolean }) => {

    if (!loading) {
        return null;
    }

    return (
        <div className="loading">
            <div className="loading__content">
                <div className="loading__content__wrapper">
                    <div className="loader"></div>
                </div>
            </div>
        </div>
    );
}