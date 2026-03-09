const Button = (props) => {
    const {type, size, text, icon} = props;

    return (
        <>
            <button className = "w-full px-4 py-2 m1 border border-[1] border-gray-300 rounded-md text-emerald-800 hover:border-gray-200 hover:bg-gray-100">{icon}{text}</button>
        </>
    );

}

export default Button;