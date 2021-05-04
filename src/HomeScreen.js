import React, {useContext} from 'react';
import ViewPools from './ViewPools';
import ContentContext from './ContentContext';
import "./style.css";

function HomeScreen({}) {
    
    const [contentState, setContent] = useContext(ContentContext);
    
    return (
        <div >
            <button onClick={() => setContent('viewPools')}>View Pools</button>
               <br />
     <br />
      <br />
       <br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <footer class="footer">
        If you're an artist, this is the right place for you.<br />
        We help you find new artistry images designed by other artists.<br /> 
        Use this platform to find new Design ideas.<br />
        -----by Ashwin Selvendran, Malachi Dube, Dominik Klimczak, Anand Rao, Mithun Manivanan. 
        </footer>
        </div>
        
    )
}

export default HomeScreen;