

interface args {
    placeHolder: string,
    className?: string
};
function CustomInput({ placeHolder, className = "px-2" }: args) {
    return (
        <input type="text" className={"pt-1 h-9 border rounded-xl border-solid border-border text-center align-bottom " + className} placeholder={placeHolder} />
    );
}

export default CustomInput;