import React, { Component } from "react";
import API from "../util/API.js";
import { Grid, Row, Col } from "react-bootstrap";
// import {Link} from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/Container";
import CloseBtn from "../components/CloseBtn";
import styled from "styled-components";
import { Parallax } from "react-parallax";
import { OutlineModal } from "../components/boron/Boron";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import DatePicker from "material-ui/DatePicker";
// import TimePicker from "material-ui/TimePicker";

const DetailContainer = styled.div`
  overflow: hidden;
  margin: 2em;
`;

const Divider = styled.hr``;
const Spacer = styled.br``;

const contentStyle = {
  backgroundColor: "white",
  height: "100%",
  padding: "1em",
  textAlign: "center"
};

const ParallaxContent = styled.div`
  height: 21em;
  -webkit-box-shadow: inset 0px -45px 113px -44px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0px -45px 113px -44px rgba(0, 0, 0, 0.75);
  box-shadow: inset 0px -45px 113px -44px rgba(0, 0, 0, 0.75);
`;

export class BiteDetail extends Component {
  state = {
    biteId: "",
    localId: "",
    firstName: "",
    lastName: "",
    city: "",
    restaurant: "",
    startDateRange: "",
    endDateRange: "",
    selectedDate: "",
    selectedDateString: "",
    selectedTime: "3 pm"
  };

  componentWillMount() {
    API.getBiteDetail(this.props.match.params.biteId).then(res =>{
      const bite = res.data[0]
      console.log("bite from BiteDetail:", bite)
      this.setState({
        biteId: bite._id,
        firstName: bite.localId.firstName,
        lastName: bite.localId.lastName,
        restaurant: bite.restaurant,
        city: bite.city,
        localId: bite.localId,
        startDateRange: bite.startDateRange,
        endDateRange: bite.endDateRange
      });
    });
  }

  showModal = () => {
    this.refs.modal.show();
  };

  hideModal = () => {
    this.refs.modal.hide();
  };

  handleConfirmBite = event => {
    console.log("start handleConfirmBite()")
    event.preventDefault()

    const travelerId = localStorage.getItem("userId");

    if(travelerId === this.state.localId._id) {
      alert("You can't grab a bite with yourself!")
    } else {
      const biteId = this.state.biteId
      const biteDate = this.state.selectedDate

      console.log("travelerId:", travelerId);
      console.log("biteId:", biteId)
      console.log("biteDate:", biteDate)

      API.bookBite(travelerId, biteId, biteDate)
        .then(res => console.log("res from API.bookBite() in handleConfirmBite()", res))
        .then(() => console.log("end handleConfirmBite()"))
        .catch(err => console.error(err))

      alert(`Bite booked with ${this.state.firstName} ${this.state.lastName} at ${this.state.restaurant} on ${this.state.selectedDate}!`)
      this.hideModal()
    }
  }

  handleChangeSelectedDate = (event, date) => {
    this.setState({ selectedDate: date, selectedDateString: date.toString() });
  };

  disableOutOfRange = date => {
    return Date.parse(date) < Date.now();
  };

  render() {
    return <div>
        <OutlineModal ref="modal" contentStyle={contentStyle}>
          <CloseBtn onClick={this.hideModal} />
          <Container column>
            <h4>
              Want to grab a Bite with {this.state.firstName} {this.state.lastName} at {this.state.restaurant} on {this.state.selectedDateString} at {this.state.selectedTime}?
            </h4>
              
              <Button primary onClick={this.handleConfirmBite}>
                Sure!
              </Button>

            <Button onClick={this.hideModal}>No, thanks</Button>
          </Container>
        </OutlineModal>

        <Parallax bgImage="http://via.placeholder.com/1000x200" strength={300}>
          <ParallaxContent>
            <h1 style={{ position: "absolute", color: "white", left: "1em", bottom: "0.5em" }}>
              {this.state.restaurant}
            </h1>
          </ParallaxContent>
        </Parallax>

        <Grid>
          <DetailContainer>
            <Row>
              <Col xs={12} md={4}>
                <Spacer />
                <Spacer />
                <Spacer />
                {`Grab a Bite with ${this.state.firstName} ${this.state.lastName}`}
                <Divider />
                <i className="fa fa-calendar-o" aria-hidden="true" style={{ marginRight: "0.5em" }} />
                <MuiThemeProvider>
                  <DatePicker style={{ display: "inline-block", height: "1em" }} name="selectedDate" onChange={this.handleChangeSelectedDate} autoOk={false} floatingLabelText="Select a Date" shouldDisableDate={this.disableOutOfRange} disableYearSelection={false} />
                </MuiThemeProvider>

              </Col>
              <Col xs={12} md={4}>
                {
                  this.props.loggedIn ? (
                    <Button primary onClick={this.showModal}>
                      Request to Book
                    </Button>) :
                    (<Button primary onClick={this.showModal}>
                      Login to Book
                    </Button>)
                }
              </Col>
              <Col xs={12} md={4}>
                <i className="fa fa-map-marker" aria-hidden="true" style={{ marginRight: "0.5em" }} />
                {this.props.city}
                <Divider />
                <h4>(MAP HERE)</h4>
                <img alt="placeholder" src="http://via.placeholder.com/300x200" />
              </Col>
            </Row>
          </DetailContainer>
        </Grid>
      </div>;
  }
}
