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

  async function signInOauth() {
    let userData;
    let provider;
    if(name === 'Google') {
      provider = new GoogleAuthProvider();
    }
    if(name === 'Github') {
      provider = new GithubAuthProvider();
    }
    const signInOauth = await signInWithPopup(auth, provider);
    const email = signInOauth.user.email;
    const password = signInOauth.user.uid;
    try{
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
        toast('Não foi possível fazer o login!');
      }
    }
  }

  return (
    <Oauthdiv type="submit" color={color} fullWidth onClick={signInOauth}>
      <Access>Acesse com o {name}</Access>
      <Image src={image}/>
    </Oauthdiv> 
  );
}

const Oauthdiv = styled.button`
display:flex;
width:100%;
background-color: ${props => props.color};
box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
padding: 6px 16px;
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
border: 0;
cursor: pointer;
margin-bottom: 5px;
`;

const Access = styled.p`
color:white;
`;

const Image = styled.img`
width:20px;
height:20px;
margin-left:10px;
`;
