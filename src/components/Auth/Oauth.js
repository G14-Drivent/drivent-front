import { GoogleAuthProvider, getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { toast } from 'react-toastify';
import { app } from '../../services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { signIn } from '../../services/authApi';
import { signUp } from '../../services/userApi';
import styled from 'styled-components';

export default function Oauth({ name, image, color }) {
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const auth = getAuth(app);
  let email;
  let password;

  async function signInOauth() {
    let userData;
    let provider;
    if(name === 'Google') {
      provider = new GoogleAuthProvider();
    }
    if(name === 'Github') {
      provider = new GithubAuthProvider(); 
    }
    try{
      const signInOauth = await signInWithPopup(auth, provider);
      email = signInOauth.user.email;
      password = signInOauth.user.uid;
      userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    }catch(error) {
      try {
        await signUp(email, password);
        userData = await signIn(email, password);
        setUserData(userData);
        toast('Login realizado com sucesso!');
        navigate('/dashboard');
      }catch(error) {
        console.log(error);
        toast('Não foi possível fazer o login!');
      }
    }
  }

  return (
    <Oauthdiv type="submit" color={color} fullWidth onClick={signInOauth}>
      <Access>Sign in with {name}</Access>
      <Image src={image}/>
    </Oauthdiv> 
  );
}

const Oauthdiv = styled.button`
display:flex;
width:65%;
height:30px;
background-color: ${props => props.color};
box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
font-size: 0.875rem;
min-width: 64px;
box-sizing: border-box;
transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
font-weight: 500;
line-height: 1.75;
border-radius: 4px;
letter-spacing: 0.02857em;
text-transform: uppercase;
justify-content: center;
text-decoration: none;
align-items:center;
border: 0;
cursor: pointer;
margin-bottom: 5px;
`;

const Access = styled.p`
color:white;
`;

const Image = styled.img`
width:20px;
height:80%;
margin-left:10px;
`;
