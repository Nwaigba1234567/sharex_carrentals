import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-signup">
        <h3>Sign up for our newsletter</h3>
        <form action="#">
          <input type="email" placeholder="Your email address" />
          <button>Send</button>
        </form>
      </div>
      <div className="footer-info">
        <p className="footer-text">All rights reserved &copy; 2024</p>
        <p className='footer-text'>Developed by Kate Nwaigba</p>
        <h3 className='footer-text'>Email: <a className='footer-text' href="mailto:iamkatty3@gmail.com">iamkatty3@gmail.com</a></h3>
        <h3 className='github-text'>Github: <a className='footer-text' href="https://github.com/Nwaigba1234567" target="_blank" rel="noopener noreferrer">Nwaigba1234567</a></h3>
      </div>
    </div>
  </footer>

//     <div className='footer-container'>
//     <div className="footer-info">
//         <p className="footer-text">All rights reserved &copy; 2024</p>
//         <p className='footer-text'>Developed by Kate Nwaigba</p>
//         <div className='contact'>
//             <h3 className='footer-text'>Email: <a className='footer-text' href="mailto:iamkatty3@gmail.com">iamkatty3@gmail.com</a></h3>
//             <h3 className='github-text'>Github: <a className='footer-text' href="https://github.com/Nwaigba1234567" target="_blank" rel="noopener noreferrer">Nwaigba1234567</a></h3>
           
//         </div>
//     </div>
// </div>
  )
}

export default Footer