// const Loading = (props) => {
//     return (
//       <div className={props.className}>
//       <div
//         className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neutral-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
//         role="status"
//       >
//         <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
//           Loading...
//         </span>
//       </div>
//       </div>
//     );
//   };
//   export default Loading;

type args = {
    className?: string,
    style?: object
};

function Loading({ className = "", style = {} }: args) {
    return (
        <div className={className} style={style}>
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-loading border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
            >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                </span>
            </div>
        </div>
    );
}

export default Loading;