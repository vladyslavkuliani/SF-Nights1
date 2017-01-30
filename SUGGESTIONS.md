- When I click on Login at your splash page without actual user data it crashes the server.  Do some error handling.

- After I create a user via signup, it's not user friendly to make them login again. Just send them to their profile.

- Your splash page looks completely different from the inside of your site.

- Your Clubs around me view gets really off when you make the browser not full size.

- Using JQuery with React is not ideal, since you're mostly using it for just the AJAX call and it's mixing two separate libraries. Consider using Axios instead, which is basically a standalone AJAX module.

- At your home page a runoff infinite loop of get requests to /position is executed.  Clubs around me takes a delay to appear the the loop begins. Drill down into your components to identify the culprit.

I'm glad you took on the challenge to code the MERN stack. You only had a little over a week to build this so I would recommend a complete refactor.  I can tell that you tried a lot of different approaches, some successful, some not as much.  

I may or may not have sent this to you, but check it out. It follows a lot of great patterns for MERN. [MERN Stack tutorial](https://medium.com/@bryantheastronaut/react-getting-started-the-mern-stack-tutorial-feat-es6-de1a2886be50#.lglk4zood)
