import { Post, Posts } from "@/types";
import { useScroll } from "./useScroll";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface Props {
    list: Posts,
    renderComponent: ({ item }: { item: Post }) => React.JSX.Element,
}

const Carousel = (({ list, renderComponent }: Props) => {

    const { ref, scrollLeft, scrollRight, indicatorRef } = useScroll();

    return (
        <>
            <div className="carousel">
                <button className="carousel__button carousel__button--left"
                    onClick={scrollLeft}>
                    <IconChevronLeft size={30} stroke={3} />
                </button>

                <ul ref={ref} className="carousel__list">
                    {
                        list.map(item => {
                            return (
                                <li className="carousel__list__item" key={item.id}>
                                    {renderComponent({ item })}
                                </li>
                            );
                        })
                    }
                </ul>
                <button className="carousel__button carousel__button--right"
                    onClick={scrollRight}>
                    <IconChevronRight size={30} stroke={3} />
                </button>
            </div>
            <div className="scroll-indicator" ref={indicatorRef}></div>
        </>
    );
});

export default Carousel;