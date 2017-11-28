import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Container from "../components/Container";
import styled from "styled-components";

// Card takes in props: title, local, startDate, endDate, location
import Card from "../components/Card";

const ViewContainer = styled.div`
  margin-top: 5em;
`;

const Browse = () => {
  return (
    <ViewContainer>
      <Grid>
        <Row className="show-grid">
          {/* dynamically generate here */}

          <Col xs={12} sm={6} md={4} lg={3}>
            <Card
              title="Ippudo Ramen"
              local="Imran Kazmi"
              startDate="Nov 29"
              endDate="Dec 30"
              location="West Loop"
            />
          </Col>

          {/* to here */}

          <Col xs={12} sm={6} md={4} lg={3}>
            <Card
              title="Ippudo Ramen"
              local="Imran Kazmi"
              startDate="Nov 29"
              endDate="Dec 30"
              location="West Loop"
            />
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card
              title="Ippudo Ramen"
              local="Imran Kazmi"
              startDate="Nov 29"
              endDate="Dec 30"
              location="West Loop"
            />
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card
              title="Ippudo Ramen"
              local="Imran Kazmi"
              startDate="Nov 29"
              endDate="Dec 30"
              location="West Loop"
            />
          </Col>

          <Col xs={12} sm={6} md={4} lg={3}>
            <Card
              title="Ippudo Ramen"
              local="Imran Kazmi"
              startDate="Nov 29"
              endDate="Dec 30"
              location="West Loop"
            />
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card
              title="Ippudo Ramen"
              local="Imran Kazmi"
              startDate="Nov 29"
              endDate="Dec 30"
              location="West Loop"
            />
          </Col>
        </Row>
      </Grid>
    </ViewContainer>
  );
};

export default Browse;
