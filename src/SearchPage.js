import React,{useContext,useEffect,useState} from 'react';
import Search from './Search';
import ContentContext from './ContentContext';
import SocketContext from './SocketContext';
import ImageList from './ImageList';


function SearchPage(props) {
    
    const [page, setPage] = useContext(ContentContext)
    const socket = useContext(SocketContext)
    const [imageUrls, setImageUrls] = useState([])
    const [resultFound, setResultFound] = useState(false)

    function onBack(){
        setPage("home")
    }
    useEffect(() => {
        socket.on('search results', (data) => {
            setImageUrls(data.imageList[0])
            if (data.imageList.length === 0){
                setResultFound(false)
            }
            else{
                setResultFound(true)
            }
            console.log(data);
        });
        
    }, []);
    
    return (
        <div>
            <Search />
            <button type="button" onClick={onBack}> Back To Homepage </button>
            {resultFound === true ? (
            <div>
                <h1> Displaying results for  {props.pageData} </h1>
                <ImageList imageList={imageUrls} />
            </div>
            ) : (
                <h1> No Results Found </h1>
            )}
        </div>
    )
}

export default SearchPage;