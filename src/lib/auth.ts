// Complete auth stub for demo
export const getCurrentUser = () => {
  return {
    id: 'demo-user',
    email: 'demo@wearejobpilot.com',
    name: 'Demo User'
  };
};

export const getUserProfile = () => {
  return {
    id: 'demo-user',
    email: 'demo@wearejobpilot.com',
    name: 'Demo User',
    role: 'candidate'
  };
};

export const signIn = async (email: string, password: string) => {
  console.log('Sign in:', email);
  return { success: true, user: getCurrentUser() };
};

export const signUp = async (email: string, password: string, name: string) => {
  console.log('Sign up:', email, name);
  return { success: true, user: getCurrentUser() };
};

export const signOut = async () => {
  console.log('Sign out');
  return { success: true };
};

export const requireAuth = () => {
  return true; // Always authenticated in demo
};