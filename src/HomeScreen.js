import React, {useContext} from 'react';
import ViewPools from './ViewPools';
import ContentContext from './ContentContext';

function HomeScreen({}) {
    
    const [contentState, setContent] = useContext(ContentContext);
    
    return (
        <div>
            <button onClick={() => setContent('viewPools')}>View Pools</button>
        </div>
    )
}

export default HomeScreen;