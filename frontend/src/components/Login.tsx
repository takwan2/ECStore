import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui';
import React, { useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { useNavigate } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';
I18n.putVocabularies(translations);
I18n.setLanguage('ja');

const userpoolId = import.meta.env.VITE_REACT_APP_AUTH_USER_POOL_ID;
const userpoolClientId = import.meta.env.VITE_REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID;

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: userpoolClientId,
      userPoolId: userpoolId,
    }
  }
});

const formFields = {
  signUp: {
    username: {
      order: 1
    },
    email: {
      order:2,
      isRequired: true
    },
    password: {
      order: 3
    },
    confirm_password: {
      order: 4
    }
  },
 }

function Login() {
  const { authStatus } = useAuthenticator(context => [context.authStatus]);
  const navigate = useNavigate();

  async function currentSession() {
    try {
      const { tokens } = await fetchAuthSession({ forceRefresh: true });
      // console.log(tokens);
      if(tokens) {
        console.log("user belongs to following groups: " + tokens.accessToken.payload["cognito:groups"])
        const group = tokens.accessToken.payload["cognito:groups"];
        if(group && group == "Admin") {
          navigate("/admin/product");
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if(authStatus == 'authenticated') {
      currentSession()
    }
  },[authStatus])

  return (
    <Authenticator formFields={formFields}>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user ? user.username : "ユーザー名を取得できませんでした。"}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default Login;