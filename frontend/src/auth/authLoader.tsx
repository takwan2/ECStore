import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import { redirect } from 'react-router-dom';

export async function currentAuthenticatedUser() {
  try {
    const { username, userId, signInDetails } = await getCurrentUser();
    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails}`);
  } catch (err) {
    console.log(err);
    return redirect ("/login");
  }
  return null;
}

export async function currentAuthenticatedAdminUser() {
  try {
    const { tokens } = await fetchAuthSession({ forceRefresh: true });
    if(!tokens) {
      return redirect("/login");
    }
    console.log(tokens);
    console.log("user belongs to following groups: " + tokens.accessToken.payload["cognito:groups"])
    const group = tokens.accessToken.payload["cognito:groups"];
    if(!group || group != "Admin") {
      return redirect("/login");
    }
  } catch (err) {
    console.log(err);
    return redirect ("/login");
  }
  return null;
}