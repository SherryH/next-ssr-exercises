import React from 'react';

import Interview from './Interview';
import './styles.css';
import Side from './Side';

// Hydration mismatch error happens because Client and Server can be different when loaded
// here this happens if on Client isDesktop is true, then the <Interview/> will not be loaded like on Server

// My approach: initially, isDesktop is always false
// then when mounted, compute isDesktop
// => Actually, it was because the Server component was rendered inside a Client component!!!
// => Make this page.js a Server Component to include the Server interview.js works!
// => NO, actually it does not work..
// => use CSS to control mediaQuery to avoid the issue!!

function InterviewExercise() {
  // Oh no I am breaking the Rule of Hooks! if setting let isDesktop = false;
  // const [isDesktop, setIsDesktop] = React.useState(false);

  // React.useEffect(() => {
  //   //ERROR: We can't use a hook inisde useEffect!!!
  //   const isNewDesktop = useMediaQuery({
  //     query: '(min-width: 500px)',
  //   });
  //   setIsDesktop(isNewDesktop);
  // }, []);

  return (
    <main>
      <Interview />
      <Side />
    </main>
  );
}

export default InterviewExercise;
