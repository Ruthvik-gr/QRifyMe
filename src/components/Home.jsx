import React from "react";
import { NavBar } from "./NavBar";
import Card from "react-bootstrap/Card";
import "../Styles/homepage.css";
// import "bootstrap/dist/css/bootstrap.min.css";

export const Home = () => {
  return (
    <div className="app">
    <section className="bg"></section>

    <div className="container">
      <div className="Card1">
        <div className="Card1">
          <Card className="Card1">
            <Card.Img
              className="img"
              variant="top"
              src="\src\assets\invest.jpg"
            />
            <Card.Body>
              <Card.Title>Invest in renewable energy</Card.Title>
              <Card.Text>
                we unite investors with cutting-edge renewable energy projects.
                Explore project details, expected returns, and associated risks.
                Your investment not only yields profits but accelerates the
                shift to sustainable energy. Join us in powering
                a greener future!
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="Card2">
        <div className="Card2">
          <Card className="Card2">
            <Card.Img
              className="img"
              variant="top"
              src="\src\assets\marketplace.jpg"
              width="300"
              height="400"
            />
            <Card.Body>
              <Card.Title>Renewable Energy Marketplace</Card.Title>
              <Card.Text>
                your premier online destination bridging renewable energy
                producers and consumers. Explore a variety of clean energy
                options, easily select and agree on energy plans. Our
                transparent platform fosters efficient transactions, directly
                connecting suppliers with eco-conscious users. Power your life
                sustainably with us!
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="Card3">
        <div className="Card3">
          <Card className="Card3">
            <Card.Img
              className="img"
              variant="top"
              src="\src\assets\community.jpg"
              height="400"
              width="300"
            />
            <Card.Body>
              <Card.Title>Community Energy Sharing</Card.Title>
              <Card.Text>
                where communities come together to share excess renewable
                energy. Our web-based platform facilitates transparent energy
                transactions, fostering collaboration among members. Join us in
                building a sustainable future by harnessing the power of
                community energy sharing.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  </div>
  );
};



