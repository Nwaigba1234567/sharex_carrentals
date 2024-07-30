
export const About = () => {
    return (
        <div className="about-page">
          <div className="about-bigdiv">
            <div className="about-intro">
              <h1 className="welcome-text">
                Welcome to <strong>Sharex Car Rental</strong>, your 
                home away from home !
              </h1>
              <article>
                <h2 className="para-text">
                  At <strong>ShareX Car Rental</strong>, we believe to offer you an authentic car for your  convenience!.
                </h2>
                <img
                  src="https://img.sixt.com/3200/7344fa9e-c3d1-4e2e-bdfb-86bc9c29df4e.jpg"
                  alt="Cars for you occassion"
                />
              </article>
            </div>
    
            <div className="about-mission">
              <h3>Our Mission:</h3>
              <article>
                <img src="https://www.sixt.com/fileadmin2/files/global/sideview/user_upload/fleet/png/752x500/mg-4-5d-white-2022.png" />
                <p className="para-text">
                  At <strong>ShareX Car rental</strong>, our mission is to
                  connect our clients in booking nice cars in the country of thier choice
                  and to connect them to the prospective home owners for booking.
                </p>
              </article>
            </div>
            <div className="about-work">
              <h3>How It Works:</h3>
              <ol>
                <li className="para-text">
                  <strong>Signup:</strong>
                  <br /> Signup on our websites and navigate through our pages
                  then search or select your desired cars. For now we are only available 
                  in two countries which Germany and USA
                </li>
                <li className="para-text">
                  <strong>Submit :</strong>
                  <br /> Submit your applications so that we can get back to you after making a booking
                  on our booking page.
                </li>
                <li className="para-text">
                  <strong>Booking :</strong>
                  <br /> Once you find your desired homes, make your booking to vacation to your desired
                  location.
                </li>
              </ol>
            </div>
            
              <h2 className="thanks-text">
                Thank you for choosing <strong>ShareX Cars rental</strong> and trusting us to provide you best services.
              </h2>
            </div>
          </div>
        // </div>
      );
}