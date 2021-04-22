import React from 'react';
import Search from './Search';
import ViewPools from './ViewPools';

function HomeScreen({
    username,
}) {
    
    return (
        <div>
            <Search />
            <ViewPools username={username}/>
        </div>
    )
}

export default HomeScreen;