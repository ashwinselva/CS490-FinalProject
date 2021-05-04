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
            if (data.imageList.length){
                if(data.imageList[0].length){
                    setImageUrls(data.imageList[0])
                    setResultFound(true)
                }
                else{
                    setResultFound(false)
                }
            }
            else{
                setResultFound(false)
            }
            console.log(data);
        });
        
    }, []);
    
    return (
        <div>
            <button type="button" onClick={onBack}> Back To Homepage </button>
            {resultFound === true ? (
            <div>
                <h1> Displaying results for  {props.pageData} </h1>
                <div className='App-header' style={{width:'80vw', alignItems:'center'}}>
                <div className='App-header-row'>
                <div className='App-header' style={{width:'20%', height:'55vh'}}>
            </div>
            
            <div className='App-header' style={{width:'60%', overflow:'auto', height:'55vh'}}>
            <div style={{display:'flex', flexDirection:'row',  flexWrap:'wrap'}}>
                {
                    imageUrls.map(image => (
                        <img src={image} style={{width:'200px', height:'200px', borderRadius:'12px', objectFit:'cover'}}/>
                    ))
                }
            </div>
            </div>
            </div>
        </div>
            </div>
            ) : (
                <h1> No Results Found for {props.pageData} </h1>
            )}
        </div>
    )
}

export default SearchPage;