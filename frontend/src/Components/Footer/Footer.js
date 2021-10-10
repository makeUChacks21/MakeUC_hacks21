//src = images/'';
import React from 'react';
import Twitter from '../../images/twitter_logo.svg';
import Google from '../../images/google_logo.svg';
import Facebook from '../../images/facebook_logo.svg';
function Footer() {
  return(
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright"> 2021 COPYRIGHT© </p>

        <div className="footer__elements">
          <div className="footer__links_image">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="footer__link">
              <img src={Facebook} alt="facebook icon" className="footer__social_icon" />
            </a>
            <a
              href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwjl_5qf4r7zAhX6mHIEHcsgDx4QFnoECAIQAQ&url=https%3A%2F%2Faccounts.google.com%2Fservicelogin&usg=AOvVaw3M3O0nhjYsjuPis7PHKofd"
              target="_blank"
              rel="noreferrer"
              className="footer__link">
              <img src={Google} alt="google icon" className="footer__social_icon" />
            </a>
            <a
              href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwiImKzI4r7zAhUFq3IEHUAABD4QFnoECAgQAQ&url=https%3A%2F%2Ftwitter.com%2Flogin%3Flang%3Den&usg=AOvVaw0AMmJgcv8ZiZA73A_ttoE9"
              target="_blank"
              rel="noreferrer"
              className="footer__link">
              <img src={Twitter} alt="twitter icon" className="footer__social_icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;