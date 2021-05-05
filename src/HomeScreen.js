import React, {useContext} from 'react';
import ViewPools from './ViewPools';
import ContentContext from './ContentContext';
import "./style.css";

function HomeScreen({}) {
    
    const [contentState, setContent] = useContext(ContentContext);
    
    return (
        <div className='App-header' style={{textAlign:'center', backgroundColor:'white', justifyContent:'center', alignContent:'center', width:'100%'}}>
            
        <div class="footer" style={{textAlign:'center', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%'}}>
        <div style={{display:'block',textAlign:'center', width:'100%'}}>
        Welcome to Arachne!
        </div>
        <div style={{display:'block',textAlign:'center', width:'100%'}} >
        To get started, log in to make your first pool or see what others have made under View All Pools
        </div>
        <div style={{display:'block',textAlign:'center', width:'100%'}} >
        -----by Ashwin Selvendran, Malachi Dube, Dominik Klimczak, Anand Rao, Mithun Manivanan. 
        </div>
        </div>
        </div>
        
    )
}

export default HomeScreen;