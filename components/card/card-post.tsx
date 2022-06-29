interface Props {
    className?: string;
    title?: string;
    excerpt?: string;
    category: string;
    date?: string;
}

const CardPost = ({className = '', title, excerpt, category, date = ''}: Props) => {
    return (
        <div
            className={`w-full h-full md:w-[260px] ${className}`}
        >
            <h3 className="text-3xl">{title}</h3>
            <p>{excerpt}</p>
            <div>
                <p>{category}</p>
                <p>{date}</p>
            </div>
        </div>
    );
};

export default CardPost;
