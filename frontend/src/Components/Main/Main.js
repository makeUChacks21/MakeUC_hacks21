import React from 'react';
// import Header from '../Header/Header';
import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Main.css';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <main className="content">
      {/* <Header email={props.isLoggedIn ? currentUser.email : ""} link={'/'} linkText={props.isLoggedIn ? "Log out" : ""} onClick={props.handleSignOut} /> */}

      <section className="content__header">
        <h2 className="content__title">
          {props.budgetPage ? 'Saved Resources' : 'Ressources'}
        </h2>
        <div>
          <h3 className="">
            {props.budgetPage ? 'Manage Budget' : 'Create Budget'}
          </h3>
          <button aria-label="add-card-button" className="add-button" onClick={props.handleAddCardBtn}>
            {props.budgetPage ? '-' : '+'}
          </button>
        </div>
      </section>

      { props.isLoggedIn
        ? <section className="main">

          </section>
        : null
      }

      {/* <section className="elements">
        <ul className="elements__list">
          {
            props.cards.map((card, id) =>
              <Card
                key={id}
                card={card}
                alt={card.alt}
                src={card.src}
                title={card.title}
                likes={card.likes}
                owner={card.owner}
                onCardClick={() => props.handleCardClick(card)}
                onDeleteClick={(card) => props.handleCardDelete(card)}
                onLikeClick={(card) => props.handleCardLike(card)}
              />
            )
          }
        </ul>
      </section> */}
    </main>
  )
}


export default Main;

