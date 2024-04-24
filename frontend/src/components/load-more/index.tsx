
interface args{
    loadMore: boolean,
    getMoreData: () => void,
}

function LoadMore({loadMore, getMoreData}: args) {
    
 
    if (loadMore)
        return
    return (
        <div className="flex w-full justify-center">
            <button className="mt-2 text-text-gray text-xs col-span-3" onClick={getMoreData}>
                Cargar más
            </button>
        </div>
    );
}

export default LoadMore;