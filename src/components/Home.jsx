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
                src="\src\assets\healthcare.jpeg"
              />
              <Card.Body>
                <Card.Title>Healthcare Documents</Card.Title>
                <Card.Text>
                  Your health information at your fingertips. Store medical records, prescriptions, and insurance details securely, ensuring you have access to important healthcare information whenever and wherever you need it, all accessible via QR code.
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
                src="\src\assets\automobile.jpeg"
                width="300"
                height="400"
              />
              <Card.Body>
                <Card.Title>Automobiles Documents</Card.Title>
                <Card.Text>
                  Keep track of your vehicles effortlessly. Store registration papers, maintenance records, and insurance documents securely, all accessible via QR code for easy retrieval whenever you need them.
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
                src="\src\assets\student.jpeg"
                height="400"
                width="300"
              />
              <Card.Body>
                <Card.Title>Student Documents</Card.Title>
                <Card.Text>
                  Manage and access your student records with ease, all accessible through a convenient QR code. From enrollment forms to academic transcripts, keep all your essential education documents organized in one place.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};



