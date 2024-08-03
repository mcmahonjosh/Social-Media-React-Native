import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { SignedInStack, SignedOutStack } from './navigation';

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth(); // Get the auth instance

  useEffect(() => {
    // Set up the onAuthStateChanged listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
