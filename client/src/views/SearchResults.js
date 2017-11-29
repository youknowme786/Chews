import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

// Card takes in props: title, local, startDate, endDate, location
import Card from "../components/Card";

export const SearchResults = props => {
  return (
    <Grid>
      <Row className="show-grid">
        {/* dynamically generate here */}
        {props.searchResults.length > 0
          ? props.searchResults.map((bite, i) => {
              return (
                <Col key={i} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    title={bite.restaurant}
                    local={bite.localId}
                    startDate={bite.startDateRange}
                    endDate={bite.endDateRange}
                    location={bite.city}
                  />
                </Col>
              );
            })
          : "No results"}

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
  );
};
