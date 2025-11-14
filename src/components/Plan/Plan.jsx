import React from "react";
import "./Plan.css";


export const ClockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5674 7.78296V15.566L20.7561 18.1603" stroke="white" stroke-width="2.59434" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.5684 28.5376C22.7324 28.5376 28.5401 22.73 28.5401 15.5659C28.5401 8.40187 22.7324 2.59424 15.5684 2.59424C8.40431 2.59424 2.59668 8.40187 2.59668 15.5659C2.59668 22.73 8.40431 28.5376 15.5684 28.5376Z" stroke="white" stroke-width="2.59434" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

export const WelcomeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.7571 27.2408V24.6464C20.7571 23.2703 20.2104 21.9506 19.2373 20.9775C18.2643 20.0044 16.9445 19.4578 15.5684 19.4578H7.78536C6.40924 19.4578 5.08948 20.0044 4.11641 20.9775C3.14334 21.9506 2.59668 23.2703 2.59668 24.6464V27.2408" stroke="white" stroke-width="2.59434" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20.7549 4.05762C21.8675 4.34607 22.8529 4.99581 23.5564 5.90487C24.2598 6.81392 24.6415 7.93082 24.6415 9.08026C24.6415 10.2297 24.2598 11.3466 23.5564 12.2556C22.8529 13.1647 21.8675 13.8144 20.7549 14.1029" stroke="white" stroke-width="2.59434" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28.538 27.2404V24.646C28.5371 23.4964 28.1545 22.3796 27.4501 21.471C26.7458 20.5623 25.7596 19.9134 24.6465 19.626" stroke="white" stroke-width="2.59434" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.676 14.269C14.5416 14.269 16.8647 11.9459 16.8647 9.08028C16.8647 6.21465 14.5416 3.8916 11.676 3.8916C8.81036 3.8916 6.4873 6.21465 6.4873 9.08028C6.4873 11.9459 8.81036 14.269 11.676 14.269Z" stroke="white" stroke-width="2.59434" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

export const ContactIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M28.5401 9.08032L16.8772 16.5092C16.4814 16.7391 16.0319 16.8602 15.5742 16.8602C15.1165 16.8602 14.667 16.7391 14.2712 16.5092L2.59668 9.08032" stroke="white" stroke-width="2.59434" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M25.9457 5.18823H5.19102C3.75821 5.18823 2.59668 6.34976 2.59668 7.78257V23.3486C2.59668 24.7814 3.75821 25.943 5.19102 25.943H25.9457C27.3785 25.943 28.5401 24.7814 28.5401 23.3486V7.78257C28.5401 6.34976 27.3785 5.18823 25.9457 5.18823Z" stroke="white" stroke-width="2.59434" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

export default function Plan() {
  return (
    <div className="plan-section">
      <div className="plan-container">
        {/* Header above both columns */}
        <h1 className="plan-title">Plan Your Visit.</h1>

        {/* Two columns */}
        <div className="plan-columns">
          {/* Left column - Image with quote overlay */}
          <div className="plan-left">
            <div className="image-container">
              <div className="quote-overlay">
                <p className="quote-text">"Come as you are"</p>
                <p className="quote-subtext">
                  No matter where you are in your faith journey, you belong here.
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="plan-right">
            <div className="content-section">
              <h2 className="section-title">WHAT TO EXPECT</h2>
              
              <div className="info-item">
                <div className="icon-circle">
                  <ClockIcon />
                </div>
                <div className="info-content">
                  <h3 className="info-title">Service Times</h3>
                  <p className="info-text">Sunday Service at 1:30 PM</p>
                  <p className="info-text">Fellowship begins at 12:45 PM</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-circle">
                  <WelcomeIcon />
                </div>
                <div className="info-content">
                  <h3 className="info-title">Welcoming Team</h3>
                  <p className="info-text">
                    Our team will greet you and help you feel at home at our welcoming table.
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-circle">
                  <ContactIcon />
                </div>
                <div className="info-content">
                  <h3 className="info-title">Contact</h3>
                  <p className="info-text">Yubin Choi - Welcoming Team</p>
                </div>
              </div>

              <button className="notify-button">Let Us Know You're Coming</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}