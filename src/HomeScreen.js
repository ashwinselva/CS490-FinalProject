import React, {useContext} from 'react';
import Search from './Search';
import ViewPools from './ViewPools';
import ContentContext from './ContentContext';

function HomeScreen({}) {
    
    const [contentState, setContent] = useContext(ContentContext);
    
    return (
        <div>
            <Search />
            <button onClick={() => setContent('viewPools')}>View Pools</button>
        </div>
    )
}

export default HomeScreen;