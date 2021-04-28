import React,{useContext,useEffect,useState} from 'react';
import Search from './Search';
import ContentContext from './ContentContext';
import SocketContext from './SocketContext';
import ImageList from './ImageList';


function SearchPage(props) {
    
    const [page, setPage] = useContext(ContentContext)
    const socket = useContext(SocketContext)
    const [imageUrls, setImageUrls] = useState([])

    function onBack(){
        setPage("home")
    }
    useEffect(() => {
        socket.on('search results', (data) => {
            setImageUrls(data.imageList)
            console.log(data);
        });
        
    }, []);
    
    return (
        <div>
            <Search />
            <button type="button" onClick={onBack}> Back To Homepage </button>
            <h1> Displaying results for  {props.pageData}</h1>
            <ImageList imageList={imageUrls} />
        </div>
    )
}

export default SearchPage;