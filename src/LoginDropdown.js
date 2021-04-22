import React, {useState} from 'react';

function LoginDropdown(props) {
    
    const [isLoginClicked,setLoginClicked]=useState(false);
    const [isNewUserClicked,setNewUserClicked]=useState(false);
    
    function changeLoginClick() {
        console.log("button clicked");
        setLoginClicked((prevLogin)=> {
            return !prevLogin;
        });
    }
    
    function changeNewUserClick() {
        console.log("button clicked");
        setNewUserClicked((prevLogin)=> {
            return !prevLogin;
        });
    }
  
    return (
        <div>
        <div>
            {isLoginClicked?(null):(<button onClick={() => changeLoginClick()}>Login</button>)}
            {isNewUserClicked?(null):(<button onClick={() => changeNewUserClick()}>New User</button>)}
            {isLoginClicked||isNewUserClicked?(
                <div>
                <br />
                <label>
                    Login-ID:
                    <input ref={props.usernameRef} type="text"/>
                </label>
                <br />
                <label>
                    Password
                    <input type="password" ref={props.inputRefPassword} />
                </label>
                <br />
                {isLoginClicked?(
                    <input type="submit" value="Submit" onClick={props.onLoginComplete} />
                ):(
                    <input type="submit" value="Submit" onClick={props.onNewUserComplete} />
                )}
                <br />
                </div>
            ):(null)
            }
        </div>
        </div>
    )
}

export default LoginDropdown;